import { getAccessToken } from './googleAuth';
import { ApprenticeProfile, ApprenticeResult, Question } from '../data/senaData';

const SPREADSHEET_TITLE = 'SENA Inducción - Registro y Respuestas Aprendices (Acuerdo 009 de 2024)';
const SPREADSHEET_ID_KEY = 'sena_sync_spreadsheet_id';
const PENDING_SYNC_QUEUE_KEY = 'sena_sync_pending_queue';

export interface SyncStatus {
  state: 'idle' | 'syncing' | 'synced' | 'error' | 'disconnected';
  lastSyncTime: Date | null;
  pendingCount: number;
  message?: string;
  spreadsheetUrl?: string;
  spreadsheetId?: string;
}

type SyncListener = (status: SyncStatus) => void;
const syncListeners = new Set<SyncListener>();

let currentStatus: SyncStatus = {
  state: 'idle',
  lastSyncTime: null,
  pendingCount: 0,
  spreadsheetId: typeof window !== 'undefined' ? localStorage.getItem(SPREADSHEET_ID_KEY) || undefined : undefined
};

export const addSyncListener = (cb: SyncListener) => {
  syncListeners.add(cb);
  cb(currentStatus);
  return () => {
    syncListeners.delete(cb);
  };
};

const updateStatus = (partial: Partial<SyncStatus>) => {
  currentStatus = { ...currentStatus, ...partial };
  if (currentStatus.spreadsheetId) {
    currentStatus.spreadsheetUrl = `https://docs.google.com/spreadsheets/d/${currentStatus.spreadsheetId}/edit`;
  }
  syncListeners.forEach(cb => {
    try {
      cb(currentStatus);
    } catch (e) {
      console.error('Error in sync listener:', e);
    }
  });
};

// Returns stored or active spreadsheet ID
export const getActiveSpreadsheetId = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(SPREADSHEET_ID_KEY);
  }
  return null;
};

export const getSpreadsheetUrl = (): string | null => {
  const id = getActiveSpreadsheetId();
  return id ? `https://docs.google.com/spreadsheets/d/${id}/edit` : null;
};

/**
 * Searches for an existing induction spreadsheet or creates a new one in Google Drive.
 */
export const getOrCreateInductionSpreadsheet = async (token?: string): Promise<string> => {
  const accessToken = token || (await getAccessToken());
  if (!accessToken) {
    throw new Error('No hay sesión de Google activa para acceder a Google Drive');
  }

  // 1. Check if ID in localStorage is valid
  const savedId = getActiveSpreadsheetId();
  if (savedId) {
    try {
      const checkRes = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${savedId}?fields=spreadsheetId,properties.title`, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      if (checkRes.ok) {
        updateStatus({ spreadsheetId: savedId, state: 'synced' });
        return savedId;
      }
    } catch {
      // Fall through to search in Drive
    }
  }

  // 2. Search Google Drive for existing file
  try {
    const q = encodeURIComponent(`name = '${SPREADSHEET_TITLE}' and mimeType = 'application/vnd.google-apps.spreadsheet' and trashed = false`);
    const searchRes = await fetch(`https://www.googleapis.com/drive/v3/files?q=${q}&fields=files(id,name,webViewLink)`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    });

    if (searchRes.ok) {
      const searchData = await searchRes.json();
      if (searchData.files && searchData.files.length > 0) {
        const foundId = searchData.files[0].id;
        localStorage.setItem(SPREADSHEET_ID_KEY, foundId);
        updateStatus({ spreadsheetId: foundId, state: 'synced' });
        return foundId;
      }
    }
  } catch (err) {
    console.warn('Error al buscar hoja existente en Google Drive, creando nueva:', err);
  }

  // 3. Create a brand new formatted Google Spreadsheet with 2 tabs
  updateStatus({ state: 'syncing', message: 'Creando hoja de cálculo en Google Drive...' });

  const createBody = {
    properties: {
      title: SPREADSHEET_TITLE
    },
    sheets: [
      {
        properties: {
          title: 'Aprendices_Consolidado',
          gridProperties: {
            frozenRowCount: 1
          }
        }
      },
      {
        properties: {
          title: 'Respuestas_Detalle_En_Vivo',
          gridProperties: {
            frozenRowCount: 1
          }
        }
      }
    ]
  };

  const createRes = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(createBody)
  });

  if (!createRes.ok) {
    const errorText = await createRes.text();
    throw new Error(`Error al crear hoja en Google Sheets: ${createRes.status} ${errorText}`);
  }

  const createdData = await createRes.json();
  const newSpreadsheetId = createdData.spreadsheetId;
  localStorage.setItem(SPREADSHEET_ID_KEY, newSpreadsheetId);

  // Initialize Headers with official SENA styling
  const headersConsolidado = [
    'Marca Temporal',
    'Tipo Doc',
    'No. Documento',
    'Nombres y Apellidos',
    'Celular Móvil',
    'Correo SoySENA',
    'Caracterización Poblacional',
    'Ciudad de Residencia',
    'Estrato Socioeconómico',
    'Ficha Formación',
    'Programa de Formación',
    'Centro de Formación',
    'Estado Proceso',
    'Puntaje Evaluación (%)',
    'Aprobado (S/N)',
    'Respuestas Correctas',
    'Código Verificación QR'
  ];

  const headersDetalle = [
    'Marca Temporal',
    'No. Documento',
    'Nombre Aprendiz',
    'Ficha',
    'Módulo / Categoría',
    'No. Pregunta',
    'Enunciado Pregunta',
    'Opción Marcada',
    '¿Es Correcta?',
    'Puntos Asignados'
  ];

  await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${newSpreadsheetId}/values:batchUpdate`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      valueInputOption: 'USER_ENTERED',
      data: [
        {
          range: 'Aprendices_Consolidado!A1:Q1',
          values: [headersConsolidado]
        },
        {
          range: 'Respuestas_Detalle_En_Vivo!A1:J1',
          values: [headersDetalle]
        }
      ]
    })
  });

  // Apply styling (dark header background #00324D, bold text)
  try {
    const sheetIds = createdData.sheets.map((s: any) => s.properties.sheetId);
    const requests = sheetIds.map((sheetId: number) => ({
      repeatCell: {
        range: {
          sheetId: sheetId,
          startRowIndex: 0,
          endRowIndex: 1
        },
        cell: {
          userEnteredFormat: {
            backgroundColor: { red: 0.0, green: 0.20, blue: 0.30 }, // #00324D SENA Navy
            textFormat: {
              foregroundColor: { red: 1.0, green: 1.0, blue: 1.0 },
              bold: true,
              fontSize: 10
            },
            horizontalAlignment: 'CENTER'
          }
        },
        fields: 'userEnteredFormat(backgroundColor,textFormat,horizontalAlignment)'
      }
    }));

    await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${newSpreadsheetId}:batchUpdate`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ requests })
    });
  } catch (styleErr) {
    console.warn('No se pudo aplicar estilo opcional a los encabezados:', styleErr);
  }

  updateStatus({
    spreadsheetId: newSpreadsheetId,
    state: 'synced',
    lastSyncTime: new Date(),
    message: 'Hoja creada y configurada con éxito en Google Drive'
  });

  return newSpreadsheetId;
};

// Appends an apprentice registration row to 'Aprendices_Consolidado'
export const syncApprenticeRegistration = async (
  profile: ApprenticeProfile,
  status: string = 'REGISTRADO / EN EVALUACIÓN'
): Promise<void> => {
  const now = new Date().toLocaleString('es-CO');
  const row = [
    now,
    profile.documentType || 'CC',
    profile.documentNumber,
    profile.fullName,
    profile.mobile || '',
    profile.emailSoySena || '',
    profile.populationCharacterization || 'General',
    profile.city || '',
    profile.stratum || '',
    profile.trainingCard || '',
    profile.program || '',
    profile.center || 'SENA',
    status,
    'Pendiente',
    'Pendiente',
    '0',
    `SENA-${profile.trainingCard}-${profile.documentNumber}`
  ];

  queueRowForSync('Aprendices_Consolidado', row);
};

// Appends an answer in real-time as the apprentice responds
export const syncAnswerInRealTime = async (data: {
  profile: ApprenticeProfile;
  question: Question;
  selectedOptionIndex: number;
  questionIndex: number;
  totalQuestions: number;
}): Promise<void> => {
  const { profile, question, selectedOptionIndex, questionIndex } = data;
  const isCorrect = selectedOptionIndex === question.correctAnswer;
  const selectedOptionText = question.options[selectedOptionIndex] || 'Sin respuesta';
  const now = new Date().toLocaleString('es-CO');

  const row = [
    now,
    profile.documentNumber,
    profile.fullName,
    profile.trainingCard,
    question.category.toUpperCase(),
    `Pregunta ${questionIndex + 1}`,
    question.question.length > 90 ? question.question.substring(0, 87) + '...' : question.question,
    selectedOptionText,
    isCorrect ? 'SÍ (Correcta)' : 'NO (Incorrecta)',
    isCorrect ? 100 / (data.totalQuestions || 10) : 0
  ];

  queueRowForSync('Respuestas_Detalle_En_Vivo', row);
};

// Appends or finalizes evaluation result in 'Aprendices_Consolidado'
export const syncEvaluationCompletion = async (
  result: ApprenticeResult
): Promise<void> => {
  const now = new Date().toLocaleString('es-CO');
  const correctCount = result.answers.filter(a => a.isCorrect).length;
  const row = [
    now,
    result.documentType || 'CC',
    result.documentNumber,
    result.fullName,
    result.mobile || '',
    result.emailSoySena || '',
    result.populationCharacterization || 'General',
    result.city || '',
    result.stratum || '',
    result.trainingCard || '',
    result.program || '',
    result.center || 'SENA',
    result.passed ? 'COMPLETADO - APROBADO' : 'COMPLETADO - NO APROBADO',
    `${result.score}%`,
    result.passed ? 'SÍ' : 'NO',
    `${correctCount}/${result.answers.length}`,
    `SENA-CERT-${result.trainingCard}-${result.documentNumber}`
  ];

  queueRowForSync('Aprendices_Consolidado', row, true);
};

// Internal Sync Queue with Batching and Debouncing
interface QueuedRow {
  sheetName: 'Aprendices_Consolidado' | 'Respuestas_Detalle_En_Vivo';
  values: (string | number)[];
  timestamp: number;
}

let syncTimeout: any = null;

const queueRowForSync = (
  sheetName: 'Aprendices_Consolidado' | 'Respuestas_Detalle_En_Vivo',
  values: (string | number)[],
  flushImmediately: boolean = false
) => {
  // Read queue from localStorage
  const queueJson = localStorage.getItem(PENDING_SYNC_QUEUE_KEY);
  let queue: QueuedRow[] = [];
  try {
    if (queueJson) queue = JSON.parse(queueJson);
  } catch {
    queue = [];
  }

  queue.push({ sheetName, values, timestamp: Date.now() });
  localStorage.setItem(PENDING_SYNC_QUEUE_KEY, JSON.stringify(queue));

  updateStatus({ pendingCount: queue.length, state: 'syncing', message: 'Sincronizando con Google Drive...' });

  if (flushImmediately) {
    if (syncTimeout) clearTimeout(syncTimeout);
    flushSyncQueue();
  } else {
    if (syncTimeout) clearTimeout(syncTimeout);
    syncTimeout = setTimeout(() => {
      flushSyncQueue();
    }, 1500); // 1.5s debounce to respect Google API quotas
  }
};

export const flushSyncQueue = async (): Promise<boolean> => {
  const queueJson = localStorage.getItem(PENDING_SYNC_QUEUE_KEY);
  if (!queueJson) {
    updateStatus({ state: 'idle', pendingCount: 0 });
    return true;
  }

  let queue: QueuedRow[] = [];
  try {
    queue = JSON.parse(queueJson);
  } catch {
    queue = [];
  }

  if (queue.length === 0) {
    updateStatus({ state: 'idle', pendingCount: 0 });
    return true;
  }

  const accessToken = await getAccessToken();
  if (!accessToken) {
    updateStatus({
      state: 'disconnected',
      pendingCount: queue.length,
      message: 'Pendiente de conexión con Google para sincronizar'
    });
    return false;
  }

  try {
    updateStatus({ state: 'syncing', message: 'Enviando respuestas a Google Sheets...' });
    const spreadsheetId = await getOrCreateInductionSpreadsheet(accessToken);

    // Group rows by target sheet
    const consolidadoRows = queue.filter(q => q.sheetName === 'Aprendices_Consolidado').map(q => q.values);
    const detalleRows = queue.filter(q => q.sheetName === 'Respuestas_Detalle_En_Vivo').map(q => q.values);

    // Append to Aprendices_Consolidado if any
    if (consolidadoRows.length > 0) {
      const res = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Aprendices_Consolidado!A:Q:append?valueInputOption=USER_ENTERED`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ values: consolidadoRows })
        }
      );
      if (!res.ok) throw new Error(`Error en Aprendices_Consolidado: ${res.statusText}`);
    }

    // Append to Respuestas_Detalle_En_Vivo if any
    if (detalleRows.length > 0) {
      const res = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Respuestas_Detalle_En_Vivo!A:J:append?valueInputOption=USER_ENTERED`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ values: detalleRows })
        }
      );
      if (!res.ok) throw new Error(`Error en Respuestas_Detalle_En_Vivo: ${res.statusText}`);
    }

    // Successfully flushed
    localStorage.removeItem(PENDING_SYNC_QUEUE_KEY);
    updateStatus({
      state: 'synced',
      lastSyncTime: new Date(),
      pendingCount: 0,
      message: 'Todas las respuestas se han sincronizado con Google Drive y Sheets'
    });
    return true;
  } catch (err: any) {
    console.error('Error al sincronizar con Google Sheets:', err);
    updateStatus({
      state: 'error',
      pendingCount: queue.length,
      message: err.message || 'Error de sincronización con Google'
    });
    return false;
  }
};

/**
 * Creates a new spreadsheet and switches to it. Requires user confirmation if overwriting.
 */
export const resetAndCreateFreshSpreadsheet = async (): Promise<string> => {
  const confirmed = window.confirm(
    '¿Deseas crear una nueva hoja de cálculo en tu Google Drive para registrar las respuestas de inducción? La hoja anterior se conservará intacta en tu Google Drive.'
  );
  if (!confirmed) {
    throw new Error('Operación cancelada por el usuario');
  }

  localStorage.removeItem(SPREADSHEET_ID_KEY);
  return await getOrCreateInductionSpreadsheet();
};
