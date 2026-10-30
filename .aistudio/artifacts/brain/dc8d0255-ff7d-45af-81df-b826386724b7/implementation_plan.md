# Plan de Integración: Sincronización Automática con Google Sheets y Google Drive

Plan integral para crear automáticamente una hoja de cálculo institucional en Google Drive y mantener sincronizados en tiempo real todos los datos de registro, caracterización poblacional, respuestas por pregunta y calificaciones de los aprendices durante la inducción SENA.

---

### Decisiones Críticas y Aprobación del Usuario

> [!IMPORTANT]
> Para conectar Google Drive y Google Sheets con la aplicación, se requerirá habilitar los permisos de Google Workspace mediante la ventana oficial de Google OAuth. Esto permitirá a la aplicación crear la hoja de cálculo en Drive y escribir los registros sin comprometer contraseñas ni requerir configuración manual de credenciales complejas por parte del usuario.

- **Cuenta de almacenamiento**: La hoja de cálculo se creará en la unidad de Google Drive del instructor / coordinador que autorice la conexión (o en la cuenta del usuario autenticado).
- **Estructura de la Hoja de Cálculo**: Se creará una hoja con formato profesional institucional SENA conteniendo dos pestañas vinculadas:
  1. `Aprendices_Consolidado`: Datos sociodemográficos completos, fecha/hora de registro, estado de inducción, puntaje global y estado de aprobación.
  2. `Respuestas_Detalle_En_Vivo`: Registro fila por fila de cada pregunta respondida en tiempo real (ID de aprendiz, número de pregunta, respuesta seleccionada, si fue correcta, puntaje obtenido y marca de tiempo).
- **Frecuencia de sincronización**: 
  - **Evento 1 (Registro)**: Al diligenciar el formulario de aprendiz (datos sociodemográficos y correo `@soy.sena.edu.co`).
  - **Evento 2 (En tiempo real)**: Conforme el aprendiz responde cada pregunta de la evaluación (con mecanismo de cola y reintentos ante fallas de red).
  - **Evento 3 (Cierre de Evaluación)**: Al finalizar la prueba, registrando puntaje definitivo, porcentaje, tiempo invertido y hash de constancia.

---

## 1. Visión General y Concepto Central

- **Qué hace**: Automatiza la recolección de datos de la inducción SENA enviando instantáneamente toda la actividad del aprendiz a una hoja de cálculo en Google Sheets alojada en Google Drive, con actualización en vivo por pregunta y reporte consolidado.
- **Audiencia objetivo**: Instructores, coordinadores académicos y personal de Bienestar al Aprendiz del Centro de Formación SENA, así como aprendices que requieren que su progreso quede respaldado institucionalmente.
- **Valor agregado**: Elimina la necesidad de exportar manualmente archivos CSV; el instructor puede ver en tiempo real en Google Drive cómo se van llenando las filas a medida que los aprendices interactúan con la plataforma, facilitando analítica académica inmediata y auditoría de asistencia.

---

## 2. Experiencia de Usuario y Diseño

- **Flujo del Instructor / Administrador**:
  1. En el encabezado y en el Panel del Instructor, se dispondrá de un botón institucional: **"Conectar con Google Drive / Sheets"**.
  2. Al autorizar, la aplicación verifica si ya existe la hoja oficial en Drive (`Induccion_SENA_Ficha_[NumeroFicha]`). Si no existe, la crea con encabezados estilizados institucionales (verde SENA `#39A900`).
  3. El panel muestra un indicador visual en vivo: **"Sincronizado con Google Drive"**, junto con un enlace directo para **"Abrir Hoja de Cálculo en Google Drive"**.
  4. Dispone de un botón para forzar sincronización manual o reintentar registros encolados.

- **Flujo del Aprendiz**:
  1. El aprendiz ingresa y diligencia su registro inicial (nombres, documento, móvil, caracterización poblacional, ciudad, estrato, correo `@soy.sena.edu.co`).
  2. En segundo plano, la app envía estos datos a la hoja de Google Sheets. Un indicador discreto y no invasivo en la interfaz muestra: *"Datos sincronizados en la nube"*.
  3. Al avanzar por las preguntas de la evaluación, cada respuesta confirmada se envía de inmediato al renglón correspondiente en la hoja `Respuestas_Detalle_En_Vivo`.
  4. Al concluir la evaluación, se actualiza la pestaña `Aprendices_Consolidado` con el resultado final, estado de aprobación y código de verificación de la constancia.

- **Diseño Visual e Indicadores**:
  - Badge de estado de sincronización: Verde pulsante para *Sincronizado*, Amarillo para *Guardando en Google Sheets...*, y Azul con icono de Google Drive para abrir el archivo directo.
  - Gestión de conectividad: Si el aprendiz pierde conexión a internet temporalmente, las respuestas se guardan en una cola local (`IndexedDB / localStorage`) y se sincronizan en bloque al restablecer la red.

---

## 3. Decisiones de Producto y Consideraciones Técnicas

- **Alcance de Permisos (OAuth Least Privilege)**:
  - Se utilizarán los scopes específicos `https://www.googleapis.com/auth/spreadsheets` y `https://www.googleapis.com/auth/drive.file`.
  - El permiso `drive.file` garantiza acceso únicamente a los archivos creados por esta aplicación en Google Drive, cumpliendo con las mejores prácticas de privacidad y seguridad sin solicitar acceso a todos los archivos personales del usuario.
- **Cliente Directo vs. Servidor**:
  - Utilizaremos llamadas directas autenticadas a la API REST v4 de Google Sheets (`https://sheets.googleapis.com/v4/spreadsheets`) utilizando el Bearer Token emitido por Firebase Auth / Google OAuth.
  - Esto garantiza latencia ultra baja, funcionamiento seguro en el entorno web y cero almacenamiento de credenciales estáticas o secretos en el cliente.
- **Mecanismo Anti-Bloqueo de Cuota**:
  - Para evitar límites de tasa de peticiones (rate limiting) de Google Sheets API (60 solicitudes por minuto por usuario), se implementa un despachador en lotes con `debounce` (cola de transmisión de 1.5 a 2 segundos) que agrupa respuestas si se producen rápidamente.

---

## 4. Arquitectura del Sistema y Flujo de Datos

```
┌─────────────────────────────────────────────────────────────────┐
│                       APLICACIÓN WEB SENA                       │
│                                                                 │
│  ┌────────────────────────┐         ┌────────────────────────┐  │
│  │   Registro Aprendiz    │         │  Evaluación Dinámica   │  │
│  │  (Datos Sociodemog.)   │         │ (Respuestas en Vivo)   │  │
│  └───────────┬────────────┘         └───────────┬────────────┘  │
│              │                                  │               │
│              ▼                                  ▼               │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │        Servicio de Sincronización (SheetsSyncEngine)     │   │
│   │   - Gestión de Cola de Envío (Batch Queue)              │   │
│   │   - Caché de Estado y Respaldo Local (IndexedDB/Storage)│   │
│   │   - Verificación de Conexión y Reintentos Automáticos   │   │
│   └──────────────────────────┬──────────────────────────────┘   │
└──────────────────────────────┼──────────────────────────────────┘
                               │ Google Sheets API v4 (Bearer Auth)
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                     GOOGLE DRIVE & SHEETS                       │
│                                                                 │
│  Archivo: "Induccion_SENA_Resultados_Ficha_[XXX]"               │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │ Pestaña 1: "Aprendices_Consolidado"                       │  │
│  │ [Documento | Nombres | Tel | Población | Estrato | Nota]  │  │
│  ├───────────────────────────────────────────────────────────┤  │
│  │ Pestaña 2: "Respuestas_Detalle_En_Vivo"                   │  │
│  │ [Marca Temp | Documento | Pregunta | Respuesta | Correcto]│  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

### Esquema Detallado de Columnas en Google Sheets

1. **Pestaña `Aprendices_Consolidado`**:
   - `Marca Temporal`: Fecha y hora de registro.
   - `Tipo Documento`: CC, TI, CE, PPT, PAS.
   - `Número Documento`: Identificación.
   - `Nombres y Apellidos`: Nombre completo del aprendiz.
   - `Teléfono Celular`: Móvil de contacto.
   - `Correo SoySENA`: Correo `@soy.sena.edu.co`.
   - `Caracterización Poblacional`: Víctima, Indígena, General, etc.
   - `Ciudad`: Municipio de residencia.
   - `Estrato`: 1 a 6 o Rural.
   - `Ficha Formación`: Número de ficha.
   - `Programa`: Programa académico.
   - `Estado Evaluación`: No iniciada / En progreso / Aprobado / Requiere Refuerzo.
   - `Puntaje Obtenido`: Calificación sobre 100 puntos.
   - `Preguntas Acertadas`: Ej. 18 / 20.
   - `Código Verificación QR`: Hash único de constancia.

2. **Pestaña `Respuestas_Detalle_En_Vivo`**:
   - `Marca Temporal`: Timestamp exacto de la respuesta.
   - `Número Documento`: Identificador del aprendiz.
   - `Nombre Aprendiz`: Nombre para rápida lectura del instructor.
   - `Módulo Temático`: Inducción, Ética, Reglamento, etc.
   - `Número Pregunta`: ID de la pregunta.
   - `Enunciado Resumido`: Texto breve de la pregunta.
   - `Opción Seleccionada`: Letra y texto respondido.
   - `¿Es Correcta?`: SÍ / NO.
   - `Puntaje Asignado`: Puntos sumados en el reactivo.

---

## 5. Fases de Ejecución Tras la Aprobación

1. **Paso 1: Configuración de Google OAuth**:
   - Solicitar los permisos oficiales de Google Drive y Google Sheets mediante la herramienta de aprovisionamiento de OAuth (`set_up_oauth`).
2. **Paso 2: Motor de Integración (`GoogleSheetsService`)**:
   - Implementar el cliente para crear la hoja de cálculo con estilos institucionales SENA, fórmulas de resumen y pestañas de detalle.
   - Desarrollar la cola de sincronización en tiempo real con control de latencia y reintentos automáticos.
3. **Paso 3: Conexión con Componentes de la Interfaz**:
   - Integrar la llamada de sincronización en el modal de registro del aprendiz.
   - Integrar la llamada inmediata en cada respuesta del componente `InteractiveEvaluation`.
   - Añadir en el `InstructorDashboard` el botón para conectar con Drive, el visualizador de la hoja de cálculo y el estado de sincronización en vivo.
4. **Paso 4: Verificación y Pruebas**:
   - Validar la persistencia sin conexión, la creación exitosa del archivo en Drive y la verificación de compilación sin errores.
