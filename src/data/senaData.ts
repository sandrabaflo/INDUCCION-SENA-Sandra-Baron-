export interface Question {
  id: string;
  category: 'identidad' | 'derechos' | 'deberes' | 'tramites' | 'faltas' | 'comite' | 'ruta' | 'reglamento';
  categoryLabel: string;
  question: string;
  context?: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface ApprenticeProfile {
  fullName: string;
  documentType: 'CC' | 'TI' | 'CE' | 'PPT' | 'PAS';
  documentNumber: string;
  mobile: string;
  populationCharacterization: string;
  city: string;
  stratum: string;
  emailSoySena: string;
  trainingCard: string;
  program: string;
  center?: string;
}

export const DOCUMENT_TYPES = [
  { value: 'CC', label: 'Cédula de Ciudadanía (C.C.)' },
  { value: 'TI', label: 'Tarjeta de Identidad (T.I.)' },
  { value: 'CE', label: 'Cédula de Extranjería (C.E.)' },
  { value: 'PPT', label: 'Permiso por Protección Temporal (PPT)' },
  { value: 'PAS', label: 'Pasaporte (PAS)' }
];

export const POPULATION_CHARACTERIZATIONS = [
  'Ninguna / Población General',
  'Víctima del Conflicto Armado',
  'Población Indígena',
  'Comunidades Negras, Afrocolombianas, Raizales y Palenqueras',
  'Persona con Discapacidad',
  'Población Campesina y Rural',
  'Mujer Cabeza de Familia',
  'Jóvenes en Condición de Vulnerabilidad',
  'Población LGBTIQ+',
  'Pueblo Rrom / Gitano',
  'Adulto Mayor',
  'Migrante / Retornado'
];

export const STRATA_OPTIONS = [
  'Estrato 1 (Bajo - Bajo)',
  'Estrato 2 (Bajo)',
  'Estrato 3 (Medio - Bajo)',
  'Estrato 4 (Medio)',
  'Estrato 5 (Medio - Alto)',
  'Estrato 6 (Alto)',
  'Zona Rural / Sin Estratificación'
];

export interface ApprenticeResult {
  id: string;
  fullName: string;
  documentType?: string;
  documentNumber: string;
  mobile?: string;
  populationCharacterization?: string;
  city?: string;
  stratum?: string;
  emailSoySena?: string;
  trainingCard: string; // Ficha
  program: string;
  center: string;
  score: number; // 0 to 100
  passed: boolean;
  date: string;
  answers: { questionId: string; selectedOption: number; isCorrect: boolean }[];
  categoryBreakdown: {
    identidad: number;
    derechos: number;
    deberes: number;
    reglamento: number;
    ruta: number;
    tramites?: number;
    comite?: number;
  };
}

export const SENA_VALUES = [
  {
    name: 'Respeto',
    icon: 'HeartHandshake',
    description: 'Reconocer el valor intrínseco de cada persona, sus opiniones, diversidad y derechos en todo ambiente de formación.',
    dailyApplication: 'Escuchar activamente a los compañeros e instructores sin discriminar por género, etnia, creencias o capacidades.'
  },
  {
    name: 'Libre Pensamiento',
    icon: 'Lightbulb',
    description: 'Fomentar la deliberación autónoma, el espíritu crítico y la expresión creativa constructiva.',
    dailyApplication: 'Participar con argumentos en debates técnicos y proponer soluciones innovadoras a los problemas comunitarios.'
  },
  {
    name: 'Dignidad Humana',
    icon: 'UserCheck',
    description: 'Garantizar que todo individuo sea tratado como un fin en sí mismo, salvaguardando su integridad física y moral.',
    dailyApplication: 'Promover un ambiente libre de acoso, matoneo o tratos denigrantes dentro y fuera de las aulas.'
  },
  {
    name: 'Solidaridad',
    icon: 'Users',
    description: 'Disposición fraterna para apoyar a quien lo necesita, colaborando en metas comunes de aprendizaje y sociedad.',
    dailyApplication: 'Hacer tutoría entre pares para ayudar a aprendices que presenten dificultades en el desarrollo de sus guías.'
  },
  {
    name: 'Justicia y Equidad',
    icon: 'Scale',
    description: 'Obrar con imparcialidad dando a cada quien lo que le corresponde según sus méritos y el debido proceso.',
    dailyApplication: 'Cumplir los criterios de evaluación transparentes acordados en las rúbricas y respetar los turnos de participación.'
  },
  {
    name: 'Honestidad',
    icon: 'ShieldCheck',
    description: 'Actuar con coherencia, veracidad y transparencia en cada acción formativa y laboral.',
    dailyApplication: 'Citar fuentes adecuadamente, no recurrir al plagio en evidencias y reportar daños en herramientas con sinceridad.'
  },
  {
    name: 'Responsabilidad',
    icon: 'CheckCircle2',
    description: 'Asumir conscientemente los compromisos adquiridos y las consecuencias de las propias acciones u omisiones.',
    dailyApplication: 'Llegar puntualmente a las sesiones y entregar las evidencias de aprendizaje en las fechas concertadas en el cronograma.'
  }
];

export const SENA_SYMBOLS = {
  escudo: {
    title: 'El Escudo del SENA',
    description: 'Refleja los tres sectores de la economía nacional en los cuales el SENA aporta formación para el trabajo:',
    elements: [
      {
        sector: 'Sector Primario y Agropecuario',
        symbol: 'El piñón y la caduceo/planta',
        meaning: 'Representa el campo colombiano, la producción agrícola, pecuaria y el aprovechamiento sostenible de los recursos biológicos.'
      },
      {
        sector: 'Sector Secundario e Industria',
        symbol: 'La rueda dentada / Piñón industrial',
        meaning: 'Simboliza la fuerza industrial, la manufactura, la construcción, la metalmecánica y el progreso tecnológico del país.'
      },
      {
        sector: 'Sector Terciario y Servicios',
        symbol: 'El caduceo / Comercio y administración',
        meaning: 'Evidencia las actividades comerciales, financieras, de turismo, hotelería, logística, salud y servicios digitales.'
      }
    ]
  },
  bandera: {
    title: 'La Bandera del SENA',
    description: 'De color blanco puro que simboliza la paz, la tranquilidad, la rectitud y la esperanza que la formación brinda al pueblo colombiano. En su centro porta el escudo institucional del SENA en color verde.'
  },
  logosimbolo: {
    title: 'El Logo-Símbolo',
    description: 'Diseñado en los años 70. Representa gráficamente los dos senderos de la vida y el ser humano:',
    elements: [
      {
        name: 'El sendero de la vida',
        meaning: 'Las dos franjas laterales representan los caminos y oportunidades que el aprendiz recorre.'
      },
      {
        name: 'El ser humano proyectándose',
        meaning: 'La figura central con brazos y cabeza extendida simboliza al aprendiz que avanza con autonomía hacia el futuro y la realización profesional.'
      }
    ]
  },
  himno: {
    title: 'Himno del SENA',
    author: 'Letra: Luis Alfredo Osorio · Música: Daniel Marlez',
    coro: 'Estudiantes del SENA ¡adelante! / por Colombia luchad con amor / con el ánimo noble y radiante / transformemos el mundo en mejor.',
    estrofas: [
      {
        numero: 'I',
        texto: 'De la patria el futuro destino, / en las manos del joven está, / el trabajo es seguro camino, / que el progreso a Colombia dará.'
      },
      {
        numero: 'II',
        texto: 'En la forja del SENA se forman, / hombres libres que saben triunfar, / con la ciencia y la técnica aprenden, / el país a la cima elevar.'
      },
      {
        numero: 'III',
        texto: 'Hoy la patria nos llama al trabajo, / con esfuerzo, tenacidad y fe, / no habrá fuerza que doble el coraje, / de quien sabe servir y crecer.'
      }
    ]
  }
};

export const SENA_RIGHTS = [
  {
    id: 'd1',
    title: 'Formación Profesional Integral de Calidad',
    article: 'Art. 7, Numeral 1',
    description: 'Recibir una formación acorde al programa matriculado, con instructores competentes, recursos pedagógicos y tecnologías pertinentes.',
    practicalCase: 'El aprendiz tiene derecho a que el instructor desarrolle las guías de aprendizaje y retroalimente oportunamente las evidencias.'
  },
  {
    id: 'd2',
    title: 'Carné Institucional',
    article: 'Art. 7, Numeral 2',
    description: 'Obtener oportunamente el documento de identificación institucional que lo acredita como aprendiz activo durante su formación.',
    practicalCase: 'Permite el ingreso a cualquier sede SENA del país, acceso a bibliotecas, préstamos de equipos y convenios de transporte.'
  },
  {
    id: 'd3',
    title: 'Uso de Ambientes, Equipos y Bibliotecas',
    article: 'Art. 7, Numeral 3',
    description: 'Hacer uso adecuado de talleres, laboratorios, aulas de cómputo, campos de práctica y colecciones bibliográficas físicas y digitales.',
    practicalCase: 'Acceder a las bases de datos de investigación del Sistema de Bibliotecas SENA y utilizar maquinaria especializada en horas formativas.'
  },
  {
    id: 'd4',
    title: 'Bienestar al Aprendiz y Apoyos',
    article: 'Art. 7, Numeral 4',
    description: 'Participar en los programas de salud, cultura, recreación, deportes, orientación psicosocial y postularse a apoyos de sostenimiento (FIC, alimentación, monitorías).',
    practicalCase: 'Postularse a convocatorias de apoyos socioeconómicos si cumple con los requisitos de estrato y rendimiento académico.'
  },
  {
    id: 'd5',
    title: 'Elegir y Ser Elegido (Representación)',
    article: 'Art. 7, Numeral 5',
    description: 'Participar democráticamente en la elección de voceros de ficha, representantes de centro y comités de aprendices.',
    practicalCase: 'Postularse como vocero de la ficha para ser el canal de comunicación constructivo entre los aprendices y el equipo de instructores.'
  },
  {
    id: 'd6',
    title: 'Debido Proceso y Derecho a la Defensa',
    article: 'Art. 7, Numeral 6',
    description: 'Ser escuchado en descargos, aportar pruebas y presentar recursos de reposición ante cualquier procedimiento académico o disciplinario.',
    practicalCase: 'Si es citado a Comité de Evaluación y Seguimiento, debe ser notificado previamente con los motivos y tiene derecho a exponer sus justificaciones.'
  },
  {
    id: 'd7',
    title: 'Reconocimiento de Etapa Productiva',
    article: 'Art. 7, Numeral 7',
    description: 'Recibir asesoría y aval de la institución para desarrollar la etapa productiva en cualquiera de las modalidades autorizadas por el reglamento.',
    practicalCase: 'Acceso a la plataforma Caprendizaje y Agencia Pública de Empleo para celebrar contrato de aprendizaje con empresa patrocinadora.'
  }
];

export const SENA_DUTIES = [
  {
    id: 'db1',
    title: 'Porte Visible del Carné',
    article: 'Art. 8, Numeral 1',
    description: 'Portar el carné en lugar visible durante toda la permanencia en las instalaciones del SENA o en actividades externas representativas.',
    consequence: 'No portarlo genera llamado de atención y restricción de acceso por protocolos de seguridad de la sede.'
  },
  {
    id: 'db2',
    title: 'Seguridad y Salud en el Trabajo (SST / EPP)',
    article: 'Art. 8, Numeral 2',
    description: 'Utilizar obligatoriamente la dotación, uniformes y Elementos de Protección Personal (EPP) según el ambiente técnico (gafas, botas, cofia, etc.).',
    consequence: 'Ingresar a talleres sin EPP es considerado falta grave por poner en riesgo inminente la integridad física propia y colectiva.'
  },
  {
    id: 'db3',
    title: 'Asistencia y Puntualidad',
    article: 'Art. 8, Numeral 3',
    description: 'Cumplir con el horario concertado en sesiones presenciales o virtuales y justificar inasistencias dentro de los 3 días hábiles siguientes.',
    consequence: '3 días consecutivos de inasistencia sin justificación válida configuran causal de deserción de la formación.'
  },
  {
    id: 'db4',
    title: 'Cuidado de Bienes y Equipos',
    article: 'Art. 8, Numeral 4',
    description: 'Velar por la conservación y buen uso de los equipos, herramientas, software, muebles e instalaciones del Centro.',
    consequence: 'El deterioro intencional acarrea reposición del bien y sanción disciplinaria conforme al reglamento.'
  },
  {
    id: 'db5',
    title: 'Honestidad Intelectual y Académica',
    article: 'Art. 8, Numeral 5',
    description: 'Elaborar personalmente las evidencias asignadas, respetar los derechos de autor y evitar prácticas de fraude, copia o suplantación.',
    consequence: 'El plagio de proyectos o evidencias constituye falta disciplinaria grave con apertura de comité.'
  },
  {
    id: 'db6',
    title: 'Convivencia y Respeto Mutuo',
    article: 'Art. 8, Numeral 6',
    description: 'Tratar con cortesía, dignidad y respeto a todos los miembros de la comunidad educativa (instructores, aprendices, administrativos y vigilancia).',
    consequence: 'Agresiones verbales o físicas son tipificadas como faltas gravísimas que pueden causar cancelación inmediata de matrícula.'
  }
];

export const PRACTICAL_CASES = [
  {
    id: 'case-1',
    title: 'Incapacidad médica durante la formación',
    situation: 'Carlos sufrió una gastroenteritis aguda y el médico de su EPS le otorgó 4 días de incapacidad médica.',
    question: '¿Cuál es el procedimiento correcto que Carlos debe seguir según el reglamento del SENA?',
    correctAction: 'Debe presentar la certificación de la EPS al instructor y coordinación académica dentro de los 3 días hábiles siguientes al reintegro.',
    wrongAction: 'Quedarse en casa sin avisar y esperar al final del trimestre para justificarlo verbalmente con el instructor.',
    tip: 'Las incapacidades emitidas por EPS o medicina legal justifican la inasistencia formalmente y permiten acordar un plan para ponerse al día.'
  },
  {
    id: 'case-2',
    title: 'Pérdida o extravío del carné institucional',
    situation: 'Mariana olvidó su bolso en el transporte público perdiendo su carné del SENA.',
    question: '¿Qué debe hacer para ingresar legalmente al centro de formación?',
    correctAction: 'Tramitar el denuncio de pérdida en la página de la Policía Nacional y solicitar el duplicado en la oficina de Administración Educativa del Centro.',
    wrongAction: 'Pedirle el carné prestado a un compañero de otra ficha para ingresar simulando ser él.',
    tip: 'Prestar o utilizar el carné de otra persona es considerado suplantación y constituye falta disciplinaria gravísima.'
  },
  {
    id: 'case-3',
    title: 'Plagio en una evidencia de aprendizaje',
    situation: 'Andrés copió textualmente un proyecto de software de un repositorio sin dar crédito y lo presentó como evidencia individual.',
    question: '¿Qué consecuencia jurídica y formativa acarrea esta acción?',
    correctAction: 'Evaluación "No Aprobado" en la evidencia, apertura de expediente para Comité de Evaluación y formulación de plan de mejoramiento con sanción.',
    wrongAction: 'Ninguna consecuencia si el instructor no se da cuenta de inmediato.',
    tip: 'El SENA promueve la ética profesional. Todo código, texto o diseño tomado de terceros debe ser referenciado conforme a normas internacionales.'
  }
];

// ==========================================
// ACUERDO 009 DE 2024 - REGLAMENTO DEL APRENDIZ
// ==========================================

export interface AcademicProcedure {
  id: string;
  stage: 'ingreso' | 'permanencia' | 'novedades' | 'reingreso' | 'certificacion';
  title: string;
  subtitle: string;
  normativeBasis: string;
  description: string;
  requirements: string[];
  deadlines: string;
  procedureSteps: string[];
  consequencesOrBenefits: string;
  interactiveTip: string;
}

export const SENA_TRAMITES_009: AcademicProcedure[] = [
  {
    id: 'tramite-ingreso',
    stage: 'ingreso',
    title: 'Proceso de Ingreso y Formalización',
    subtitle: 'Convocatoria, Selección, Matrícula y Compromiso Institucional',
    normativeBasis: 'Acuerdo 009 de 2024 · Capítulo de Ingreso y Matrícula',
    description: 'El ingreso es el acto formal y voluntario mediante el cual el aspirante admitido adquiere la calidad de Aprendiz SENA, comprometiéndose a acatar los principios éticos, deberes y reglamentos de la comunidad formativa.',
    requirements: [
      'Haber superado exitosamente las fases de selección y prueba diagnóstica en SofiaPlus / Zajuna.',
      'Aportar documento de identidad original y copia legible vigente.',
      'Certificados académicos mínimos requeridos por el nivel de formación (Bachiller, básica secundaria o primaria).',
      'Certificado de afiliación vigente al Sistema General de Seguridad Social en Salud (EPS o régimen subsidiado Sisbén).',
      'Suscripción del Acta de Compromiso del Aprendiz SENA y autorización de tratamiento de datos personales.'
    ],
    deadlines: 'Dentro de los calendarios oficiales fijados en el cronograma de la convocatoria nacional de formación.',
    procedureSteps: [
      '1. Notificación de selección y llamado a asentar matrícula.',
      '2. Cargue y validación de documentos soporte en SofiaPlus / Administración Educativa.',
      '3. Asignación oficial del número de Ficha de Caracterización.',
      '4. Jornada de Inducción Institucional obligatoria (intensidad reglamentaria de 40 horas).',
      '5. Expedición y activación del Carné Institucional (físico o digital).'
    ],
    consequencesOrBenefits: 'Otorga de pleno derecho la condición jurídica de Aprendiz SENA, acceso a los ambientes de aprendizaje, póliza de accidentes estudiantiles y programas de Bienestar.',
    interactiveTip: 'La inducción es de carácter obligatorio. No asistir a la inducción sin causa justificada impide formalizar la matrícula y puede generar la cancelación del cupo.'
  },
  {
    id: 'tramite-permanencia',
    stage: 'permanencia',
    title: 'Proceso de Permanencia en la Formación',
    subtitle: 'Asistencia, Participación Activa, Evaluación y Acompañamiento',
    normativeBasis: 'Acuerdo 009 de 2024 · Capítulo de Permanencia y Seguimiento Formativo',
    description: 'Es el período en el cual el aprendiz desarrolla integralmente las competencias del programa a través de la ejecución de guías de aprendizaje, proyectos formativos y actividades sincrónicas/asincrónicas.',
    requirements: [
      'Asistir puntualmente a las sesiones presenciales o virtuales programadas en el horario de la ficha.',
      'Ingresar activamente a la plataforma LMS Zajuna para consultar materiales y radicar evidencias.',
      'Presentar oportunamente las evidencias de conocimiento, desempeño y producto en las fechas concertadas.',
      'Portar adecuadamente el carné institucional y los Elementos de Protección Personal (EPP) en talleres.',
      'Participar en las evaluaciones trimestrales de avance y comités de seguimiento de la ficha.'
    ],
    deadlines: 'Continuo durante la totalidad del ciclo lectivo y productivo según la duración del programa.',
    procedureSteps: [
      '1. Concertación del plan de trabajo pedagógico con los instructores al inicio de cada trimestre.',
      '2. Ejecución de guías de aprendizaje y actividades interdisciplinarias.',
      '3. Retroalimentación formativa y calificación de evidencias (A = Aprobado, D = Deficiente/No aprobado).',
      '4. En caso de dificultades académicas: concertación inmediata de Plan de Mejoramiento Académico (máximo 30 días).',
      '5. Registro de juicios evaluativos en SofiaPlus.'
    ],
    consequencesOrBenefits: 'Garantiza el progreso formativo continuo, el acceso a apoyos de sostenimiento (FIC, monitorías, transporte) y el derecho a postularse a etapa productiva.',
    interactiveTip: 'Si obtienes una calificación "D" en un resultado de aprendizaje, tienes derecho a solicitar inmediatamente un Plan de Mejoramiento para superar la dificultad antes del cierre del trimestre.'
  },
  {
    id: 'novedad-traslado',
    stage: 'novedades',
    title: 'Novedad de Traslado',
    subtitle: 'Cambio de Centro de Formación, de Jornada o de Programa',
    normativeBasis: 'Acuerdo 009 de 2024 · Capítulo de Trámites y Novedades Académicas',
    description: 'Solicitud formal mediante la cual el aprendiz solicita continuar su proceso formativo en otra sede, jornada o en un programa del mismo nivel de formación con afinidad curricular.',
    requirements: [
      'Haber cursado y aprobado como mínimo el primer trimestre de la etapa lectiva.',
      'Estar a paz y salvo académico y administrativo en el Centro de formación de origen.',
      'Causal debidamente justificada (cambio de domicilio/ciudad demostrable, razones laborales o fuerza mayor).',
      'Disponibilidad de cupo en la ficha receptora y compatibilidad en el diseño curricular.',
      'No tener sanciones disciplinarias vigentes.'
    ],
    deadlines: 'Radicar la solicitud en SofiaPlus con mínimo diez (10) días hábiles antes de finalizar el trimestre en curso.',
    procedureSteps: [
      '1. Solicitud escrita o virtual a través del aplicativo SofiaPlus con soportes adjuntos.',
      '2. Concepto pedagógico de los instructores y verificación de paz y salvo.',
      '3. Consulta de disponibilidad de cupo en el Centro o Ficha receptora.',
      '4. Estudio de homologación o reconocimiento de aprendizajes previos.',
      '5. Aprobación por los Subdirectores de Centro y registro de la novedad en el sistema.'
    ],
    consequencesOrBenefits: 'Permite la continuidad formativa sin perder los resultados de aprendizaje ya aprobados, facilitando la movilidad geográfica o laboral.',
    interactiveTip: 'El traslado no es automático: depende estrictamente de que exista un cupo libre en la ficha del programa y sede a la que deseas llegar.'
  },
  {
    id: 'novedad-aplazamiento',
    stage: 'novedades',
    title: 'Novedad de Aplazamiento',
    subtitle: 'Suspensión Temporal Justificada del Proceso Formativo',
    normativeBasis: 'Acuerdo 009 de 2024 · Capítulo de Novedades Académicas',
    description: 'Es la suspensión temporal del proceso de formación que solicita el aprendiz por causas justificadas, conservando su derecho a solicitar reingreso posterior.',
    requirements: [
      'Causales válidas: Incapacidad médica prolongada, calamidad doméstica demostrada, servicio militar obligatorio, maternidad/paternidad o motivos laborales imprevistos.',
      'Aportar documentos y evidencias que certifiquen fehacientemente la causal invocada.',
      'Estar al día con las entregas académicas hasta la fecha de solicitud del aplazamiento.',
      'No haber superado el límite reglamentario de aplazamientos.'
    ],
    deadlines: 'Plazo máximo de seis (6) meses. Prorrogable excepcionalmente en caso de servicio militar o incapacidad médica certificada.',
    procedureSteps: [
      '1. Radicación formal de la solicitud a través del módulo de aprendices de SofiaPlus.',
      '2. Anexar soportes idóneos (certificados de EPS, constancia militar o laboral).',
      '3. Revisión por Coordinación Académica y verificación del estado formativo.',
      '4. Emisión de acto administrativo que concede el aplazamiento con fecha exacta de vencimiento.',
      '5. Notificación formal al aprendiz con instrucciones para el futuro reingreso.'
    ],
    consequencesOrBenefits: 'Congela el cupo y los resultados aprobados sin incurrir en deserción, permitiendo atender situaciones personales urgentes.',
    interactiveTip: '¡Atención al calendario! Si vencen los 6 meses de aplazamiento y no radicas la solicitud de reingreso con 1 mes de antelación, se configurará la declaratoria de deserción.'
  },
  {
    id: 'novedad-desercion',
    stage: 'novedades',
    title: 'Novedad de Deserción',
    subtitle: 'Abandono del Proceso Formativo y Causal de Pérdida de Cupo',
    normativeBasis: 'Acuerdo 009 de 2024 · Régimen de Deserción y Pérdida de Cupo',
    description: 'Configuración reglamentaria del abandono injustificado de la formación en cualquiera de sus etapas, conllevando a la declaratoria formal de vacancia del cupo.',
    requirements: [
      'Causales taxativas según Acuerdo 009 de 2024:',
      '• Acumular tres (3) días hábiles consecutivos de inasistencia no justificada a las actividades formativas presenciales o virtuales.',
      '• No presentarse a las actividades de etapa productiva dentro del término fijado tras culminar la etapa lectiva.',
      '• No radicar solicitud de reingreso al expirar el término de aplazamiento autorizado.'
    ],
    deadlines: 'Notificación inmediata por parte del Centro; el aprendiz cuenta con cinco (5) días hábiles para justificar.',
    procedureSteps: [
      '1. Reporte del instructor de la ficha por inasistencia injustificada de 3 días consecutivos.',
      '2. Comunicación y citación formal enviada al correo del aprendiz solicitando justificaciones (plazo: 5 días hábiles).',
      '3. Si el aprendiz justifica válidamente con soportes médicos/fuerza mayor: se reintegra y concierta plan.',
      '4. Si no responde o la justificación no es válida: el Subdirector expide la Resolución de Declaratoria de Deserción.',
      '5. Cancelación definitiva del registro de matrícula y liberación del cupo.'
    ],
    consequencesOrBenefits: 'Pérdida de la condición de aprendiz y sanción administrativa de seis (6) meses sin poder inscribirse en programas de formación titulada del SENA.',
    interactiveTip: 'Si tienes una emergencia familiar o de salud, comunícate inmediatamente con tu instructor vocero. Tres días continuos sin aviso activan automáticamente el proceso de deserción.'
  },
  {
    id: 'novedad-retiro-voluntario',
    stage: 'novedades',
    title: 'Novedad de Retiro Voluntario',
    subtitle: 'Renuncia Expresa e Indeclinable a la Formación',
    normativeBasis: 'Acuerdo 009 de 2024 · Capítulo de Trámites y Novedades',
    description: 'Manifestación libre, consciente y escrita del aprendiz solicitando la cancelación voluntaria de su matrícula en el programa.',
    requirements: [
      'Solicitud radicada personalmente por el aprendiz a través del portal SofiaPlus.',
      'Breve exposición de motivos que fundamentan la decisión.',
      'Entrega de paz y salvo de herramientas, carné, biblioteca y equipos institucionales.'
    ],
    deadlines: 'Puede solicitarse en cualquier momento del ciclo formativo antes de la culminación del programa.',
    procedureSteps: [
      '1. Diligenciamiento de la solicitud de Retiro Voluntario en SofiaPlus.',
      '2. Notificación a Coordinación Académica y verificación de entrega de bienes.',
      '3. Aplicación de la novedad en el sistema y emisión de la constancia de retiro.',
      '4. Notificación formal del periodo de sanción administrativa reglamentaria.'
    ],
    consequencesOrBenefits: 'El retiro voluntario genera una sanción de seis (6) meses calendario durante los cuales el usuario no podrá inscribirse en programas de formación titulada.',
    interactiveTip: 'Antes de solicitar un retiro voluntario, evalúa si tu caso clasifica para un aplazamiento (hasta 6 meses) o un traslado de jornada. ¡No renuncies a tu formación si puedes pausarla legalmente!'
  },
  {
    id: 'tramite-reingreso',
    stage: 'reingreso',
    title: 'Proceso de Reingreso',
    subtitle: 'Reincorporación a la Formación tras Aplazamiento Autorizado',
    normativeBasis: 'Acuerdo 009 de 2024 · Capítulo de Reingresos y Homologaciones',
    description: 'Procedimiento mediante el cual el aprendiz que suspendió legalmente sus estudios por aplazamiento solicita retomar su proceso formativo en el Centro de Formación.',
    requirements: [
      'Contar con acto administrativo de aplazamiento debidamente otorgado y vigente.',
      'Radicar la solicitud formal con la anticipación reglamentaria establecida.',
      'Existencia del programa de formación o disponibilidad de una ficha afín en el Centro.',
      'Disponibilidad de cupo físico o virtual en el ambiente formativo.',
      'Si el programa tuvo cambio de diseño curricular: aceptación del plan de homologación o complementación.'
    ],
    deadlines: 'Radicación formal obligatoria con mínimo un (1) mes de anticipación al inicio del trimestre lectivo al que aspira ingresar.',
    procedureSteps: [
      '1. Registro de la solicitud de reingreso en SofiaPlus antes de vencer el aplazamiento.',
      '2. Coordinación Académica valida la vigencia del aplazamiento y la disponibilidad de cupo en la ficha correspondiente.',
      '3. Análisis de correspondencia curricular por parte del equipo de instructores.',
      '4. Expedición de la resolución de reingreso y reactivación de la matrícula en estado "En Formación".',
      '5. Convocatoria al aprendiz para reintegrarse a sus ambientes de aprendizaje.'
    ],
    consequencesOrBenefits: 'Permite culminar exitosamente la titulación profesional reconociendo el 100% de las competencias ya aprobadas.',
    interactiveTip: 'Si radicas el reingreso fuera del plazo de 1 mes previo o después de vencido el aplazamiento, el sistema declarará la deserción y perderás el cupo.'
  },
  {
    id: 'tramite-certificacion',
    stage: 'certificacion',
    title: 'Proceso de Certificación Oficial',
    subtitle: 'Culminación Exitosa, Paz y Salvo Integral y Titulación Profesional',
    normativeBasis: 'Acuerdo 009 de 2024 · Capítulo de Certificación y Grados',
    description: 'Fase culminante donde el SENA acredita formalmente que el aprendiz ha adquirido las competencias laborales y humanas requeridas por el perfil de egreso.',
    requirements: [
      'Aprobación total (100%) de los resultados de aprendizaje de la Etapa Lectiva en SofiaPlus.',
      'Aprobación formal de la Etapa Productiva mediante bitácoras al día y formato 023 de evaluación final suscrito por el ente coformador y el instructor de seguimiento.',
      'Paz y Salvo Integral SENA que certifique no tener deudas en: Biblioteca, Almacén/Talleres, Bienestar al Aprendiz y Coordinación Académica.',
      'Copia actualizada del documento de identidad vigente.',
      'Registro actualizado de la hoja de vida en la Agencia Pública de Empleo (APE SENA).'
    ],
    deadlines: 'El Centro cuenta con un plazo reglamentario para expedir el certificado una vez radicado el paz y salvo completo.',
    procedureSteps: [
      '1. Cierre y emisión del juicio "Aprobado" en Etapa Productiva por el instructor asignado.',
      '2. Generación y validación del Paz y Salvo Electrónico en SofiaPlus.',
      '3. Verificación de identidad y archivo documental por Administración Educativa.',
      '4. Emisión de la Resolución de Certificación y generación del Acta de Grado oficial.',
      '5. Expedición digital del Certificado de Aptitud Profesional / Título con código de verificación QR y firma digital.'
    ],
    consequencesOrBenefits: 'Otorga el título técnico, tecnólogo o certificado de formación profesional con plena validez nacional e internacional y reconocimiento del sector productivo.',
    interactiveTip: 'Los certificados del SENA son 100% gratuitos y se descargan en cualquier momento desde el portal de certificados institucionales con código seguro de verificación QR.'
  }
];

// ==========================================
// RÉGIMEN DE FALTAS - ACUERDO 009 DE 2024
// ==========================================

export interface DisciplinaryFault {
  id: string;
  type: 'academica' | 'disciplinaria';
  gravity: 'leve' | 'grave' | 'gravisima';
  name: string;
  normativeArticle: string;
  description: string;
  realExample: string;
  applicableMeasure: string;
}

export const SENA_REGIMEN_FALTAS_009: DisciplinaryFault[] = [
  {
    id: 'fault-acad-leve',
    type: 'academica',
    gravity: 'leve',
    name: 'Incumplimiento injustificado en entrega puntual de evidencias',
    normativeArticle: 'Acuerdo 009 de 2024 · Faltas Académicas Leves',
    description: 'No entregar las evidencias de aprendizaje o informes de taller en las fechas concertadas sin mediar justa causa comprobada.',
    realExample: 'El aprendiz no sube la actividad del taller al LMS en la fecha acordada por descuido personal, sin aviso previo.',
    applicableMeasure: 'Llamado de atención verbal y concertación de fecha perentoria para la entrega de la evidencia.'
  },
  {
    id: 'fault-acad-grave',
    type: 'academica',
    gravity: 'grave',
    name: 'Reiterado bajo rendimiento y desacato a planes de mejoramiento',
    normativeArticle: 'Acuerdo 009 de 2024 · Faltas Académicas Graves',
    description: 'No cumplir con las actividades concertadas en el Plan de Mejoramiento Académico dentro del término de 30 días, o acumular resultados no aprobados de manera reincidente.',
    realExample: 'Un aprendiz al que se le concertó un plan de mejoramiento para superar dos competencias técnicas ignora las tutorías y no presenta el producto.',
    applicableMeasure: 'Remisión formal a Comité de Evaluación y Seguimiento; recomendación de Llamado de Atención Escrito o Condicionamiento de Matrícula.'
  },
  {
    id: 'fault-acad-gravisima',
    type: 'academica',
    gravity: 'gravisima',
    name: 'Plagio, fraude, suplantación o falsedad en evidencias o pruebas',
    normativeArticle: 'Acuerdo 009 de 2024 · Faltas Académicas Gravísimas',
    description: 'Presentar como propio el trabajo intelectual de otros, alterar documentos evaluativos, suplantar la identidad en evaluaciones o usar IA sin autorización ni citación con fines de engaño académico.',
    realExample: 'Copiar textualmente un proyecto de grado o pagar a un tercero para que resuelva las pruebas técnicas en la plataforma.',
    applicableMeasure: 'Comité de Evaluación y Seguimiento inmediato; recomendación de Cancelación de Matrícula e inhabilidad de 1 a 3 años.'
  },
  {
    id: 'fault-disc-leve',
    type: 'disciplinaria',
    gravity: 'leve',
    name: 'Incumplimiento de normas de presentación, orden o puntualidad en ambientes',
    normativeArticle: 'Acuerdo 009 de 2024 · Faltas Disciplinarias Leves',
    description: 'Llegar reiteradamente tarde a clase, descuidar la limpieza del puesto de trabajo, o no portar el carné en lugar visible.',
    realExample: 'Un aprendiz ingresa 20 minutos tarde de manera recurrente y deja residuos de comida sobre los teclados de la sala de cómputo.',
    applicableMeasure: 'Llamado de atención verbal reflexivo y compromiso de aseo y puntualidad.'
  },
  {
    id: 'fault-disc-grave',
    type: 'disciplinaria',
    gravity: 'grave',
    name: 'Incumplimiento grave de normas de SST o daño culposo a bienes institucionales',
    normativeArticle: 'Acuerdo 009 de 2024 · Faltas Disciplinarias Graves',
    description: 'Operar maquinaria especializada sin los Elementos de Protección Personal (EPP), manipular instalaciones eléctricas sin autorización o causar deterioro en herramientas por imprudencia.',
    realExample: 'Encender un torno industrial sin gafas de protección ni calzado de seguridad, poniendo en riesgo la integridad propia y de los compañeros.',
    applicableMeasure: 'Suspensión preventiva del uso del taller, Plan de Mejoramiento Disciplinario en SST y llamado de atención por escrito.'
  },
  {
    id: 'fault-disc-gravisima',
    type: 'disciplinaria',
    gravity: 'gravisima',
    name: 'Agresión física, porte de armas, consumo/porte de drogas o acoso',
    normativeArticle: 'Acuerdo 009 de 2024 · Faltas Disciplinarias Gravísimas',
    description: 'Cometer actos de violencia física, verbal o psicológica, acoso sexual, portar armas de fuego o cortopunzantes, o ingresar/consumir/distribuir sustancias psicoactivas o alcohol en instalaciones SENA.',
    realExample: 'Iniciar una riña física en la cafetería del Centro portando un arma blanca o consumir licor dentro del ambiente de formación.',
    applicableMeasure: 'Comité Disciplinario urgente; expulsión inmediata de la sede, Cancelación definitiva de Matrícula e inhabilidad de hasta 3 años.'
  }
];

// ==========================================
// MEDIDAS FORMATIVAS Y DISCIPLINARIAS
// ==========================================

export interface InstitutionalMeasure {
  id: string;
  category: 'formativa' | 'disciplinaria';
  title: string;
  subtitle: string;
  authority: string;
  characteristics: string[];
  durationOrImpact: string;
  proceduralRights: string;
}

export const SENA_MEDIDAS_009: InstitutionalMeasure[] = [
  {
    id: 'medida-verbal',
    category: 'formativa',
    title: 'Llamado de Atención Verbal Reflexivo',
    subtitle: 'Intervención Pedagógica Preventiva de Diálogo Formativo',
    authority: 'Cualquier instructor del equipo ejecutor o funcionario de formación',
    characteristics: [
      'Se aplica de forma inmediata ante conductas leves.',
      'Consiste en un diálogo pedagógico para reconvenir la conducta y reflexionar sobre el impacto en el grupo.',
      'NO constituye sanción disciplinaria ni se registra como antecedente negativo en la hoja de vida.',
      'Busca el compromiso voluntario de cambio del aprendiz.'
    ],
    durationOrImpact: 'Inmediata; no genera anotación disciplinaria en SofiaPlus.',
    proceduralRights: 'El aprendiz tiene derecho a ser escuchado con respeto y concertar la mejora de su comportamiento.'
  },
  {
    id: 'medida-plan-academico',
    category: 'formativa',
    title: 'Plan de Mejoramiento Académico',
    subtitle: 'Estrategia Pedagógica para Alcanzar Competencias Pendientes',
    authority: 'Instructor del área técnica o transversal concertado con el aprendiz',
    characteristics: [
      'Documento escrito donde se formulan actividades complementarias de aprendizaje.',
      'Se definen metas de logro claras, evidencias específicas a entregar y fechas de revisión.',
      'Acompañamiento docente y tutorías para nivelar los conocimientos deficientes.',
      'NO es una sanción: es un derecho pedagógico del aprendiz para recuperar aprendizajes no superados.'
    ],
    durationOrImpact: 'Plazo reglamentario máximo de hasta treinta (30) días calendario para su cumplimiento.',
    proceduralRights: 'El aprendiz debe recibir retroalimentación oportuna sobre las nuevas evidencias entregadas.'
  },
  {
    id: 'medida-plan-disciplinario',
    category: 'formativa',
    title: 'Plan de Mejoramiento Disciplinario',
    subtitle: 'Acuerdo Formativo de Convivencia y Acciones Comunitarias',
    authority: 'Equipo ejecutor de la formación o Coordinador Académico',
    characteristics: [
      'Compromiso formal firmado por el aprendiz para corregir actitudes o faltas leves de convivencia.',
      'Puede incluir acciones formativas reflexivas (ensayos pedagógicos, exposiciones sobre valores, apoyo en bibliotecas o campañas de SST).',
      'Fomenta la reparación comunitaria y la ética profesional.',
      'Evita que la situación escale a un Comité de Evaluación y Seguimiento.'
    ],
    durationOrImpact: 'Periodo de seguimiento acordado (generalmente de 15 a 30 días).',
    proceduralRights: 'Las actividades asignadas deben ser proporcionales, dignas y orientadas a la formación del ser.'
  },
  {
    id: 'medida-escrito',
    category: 'disciplinaria',
    title: 'Llamado de Atención por Escrito',
    subtitle: 'Sanción Disciplinaria Formal con Copia a la Hoja de Vida',
    authority: 'Subdirector del Centro de Formación (previa recomendación del Comité)',
    characteristics: [
      'Constituye la primera sanción disciplinaria formal del catálogo reglamentario.',
      'Se impone cuando las medidas formativas previas no tuvieron efecto o ante faltas graves.',
      'Se expide mediante acto administrativo motivado y se anexa al expediente del aprendiz en SofiaPlus.',
      'El aprendiz queda advertido de que la reincidencia acarreará condicionamiento o cancelación.'
    ],
    durationOrImpact: 'Anotación formal en la hoja de vida institucional del aprendiz durante toda la permanencia en el SENA.',
    proceduralRights: 'Derecho a citación con pliego de cargos con 5 días hábiles previos, audiencia de descargos y recurso de reposición.'
  },
  {
    id: 'medida-condicionamiento',
    category: 'disciplinaria',
    title: 'Condicionamiento de Matrícula',
    subtitle: 'Estado de Observación Disciplinaria Estricta',
    authority: 'Subdirector de Centro de Formación (previo debido proceso en Comité)',
    characteristics: [
      'Pone en estado de advertencia máxima la continuidad del aprendiz en la institución.',
      'Genera la suspensión temporal de beneficios y estímulos (apoyos de sostenimiento, monitorías o auxilios de alimentación).',
      'Obliga a suscribir un acta estricta de compromisos académicos y comportamentales.',
      'Cualquier incumplimiento posterior deriva de forma inmediata en la Cancelación de Matrícula.'
    ],
    durationOrImpact: 'Vigencia de hasta por el período que determine el Comité (trimestral o durante el resto de la formación).',
    proceduralRights: 'Evaluación periódica y levantamiento del condicionamiento si el aprendiz demuestra un cambio ejemplar.'
  },
  {
    id: 'medida-cancelacion',
    category: 'disciplinaria',
    title: 'Cancelación de Matrícula',
    subtitle: 'Máxima Sanción: Pérdida Definitiva del Cupo e Inhabilidad Nacional',
    authority: 'Subdirector de Centro de Formación mediante Resolución Motivada',
    characteristics: [
      'Pérdida total e irrevocable de la calidad de Aprendiz SENA.',
      'Se aplica por faltas gravísimas o por incumplimiento reiterado de condicionamientos de matrícula.',
      'Conlleva la desvinculación inmediata de todos los ambientes de aprendizaje y plataformas institucionales.',
      'Inhabilidad formal para inscribirse en programas de formación del SENA en todo el territorio nacional.'
    ],
    durationOrImpact: 'Inhabilidad en SofiaPlus por un período de seis (6) meses hasta tres (3) años según la gravedad de la falta.',
    proceduralRights: 'Garantía plena de doble instancia y derecho a presentar Recurso de Reposición dentro de los 5 días hábiles siguientes.'
  }
];

// ==========================================
// COMITÉ DE EVALUACIÓN Y SEGUIMIENTO - 009/2024
// ==========================================

export interface CommitteeMember {
  role: string;
  institutionalTitle: string;
  voteType: 'Voz y Voto' | 'Voz y sin Voto' | 'Derecho a la Defensa';
  function: string;
}

export const SENA_COMITE_MIEMBROS: CommitteeMember[] = [
  {
    role: 'Presidencia / Dirección',
    institutionalTitle: 'Subdirector del Centro de Formación (o su delegado)',
    voteType: 'Voz y Voto',
    function: 'Preside o delega la sesión, vela por las garantías procesales y expedirá posteriormente la resolución administrativa final.'
  },
  {
    role: 'Gestión Pedagógica',
    institutionalTitle: 'Coordinador Académico o de Formación',
    voteType: 'Voz y Voto',
    function: 'Expone el historial evaluativo, juicios de resultados de aprendizaje y antecedentes de planes de mejoramiento del caso.'
  },
  {
    role: 'Coordinación Misional',
    institutionalTitle: 'Coordinador de Formación Profesional Integral',
    voteType: 'Voz y Voto',
    function: 'Asegura la coherencia de las recomendaciones con las políticas educativas institucionales del SENA.'
  },
  {
    role: 'Equipo Docente',
    institutionalTitle: 'Instructor Vocero de la Ficha o Instructor Técnico del Resultado',
    voteType: 'Voz y Voto',
    function: 'Presenta el informe técnico de los hechos, las evidencias del rendimiento del aprendiz y el concepto formativo.'
  },
  {
    role: 'Voz Estudiantil',
    institutionalTitle: 'Representante de los Aprendices del Centro',
    voteType: 'Voz y Voto',
    function: 'Garantiza la mirada de la comunidad estudiantil, el respeto a los derechos humanos y la equidad en el juicio.'
  },
  {
    role: 'Acompañamiento Psicosocial',
    institutionalTitle: 'Profesional de Bienestar al Aprendiz',
    voteType: 'Voz y sin Voto',
    function: 'Emite concepto orientador sobre la situación psicosocial, socioeconómica o de vulnerabilidad del aprendiz para orientar el sentido pedagógico.'
  },
  {
    role: 'Parte Citada / Imputada',
    institutionalTitle: 'El Aprendiz SENA involucrado',
    voteType: 'Derecho a la Defensa',
    function: 'Comparece a la audiencia, es escuchado en versión libre, rinde descargos, aporta pruebas documentales o testimonios y ejerce su defensa.'
  }
];

export interface CommitteeStep {
  stepNumber: number;
  phaseName: string;
  normativeTime: string;
  description: string;
  keyActions: string[];
}

export const SENA_COMITE_FASES: CommitteeStep[] = [
  {
    stepNumber: 1,
    phaseName: 'Informe y Remisión Motivada',
    normativeTime: 'Inmediato tras ocurrir el hecho o detectarse el bajo rendimiento',
    description: 'El instructor, funcionario o miembro de la comunidad radica el informe detallado con descripción clara de fechas, circunstancias y evidencias físicas o digitales.',
    keyActions: [
      'Radicación del formato oficial de queja o bajo rendimiento académico.',
      'Anexo de evidencias (capturas de pantalla, actas de inasistencia, testimonios o evidencias evaluadas con D).',
      'Revisión previa por la Coordinación Académica.'
    ]
  },
  {
    stepNumber: 2,
    phaseName: 'Citación Oficial al Aprendiz',
    normativeTime: 'Mínimo cinco (5) días hábiles de anticipación a la audiencia',
    description: 'Notificación formal enviada al correo electrónico institucional del aprendiz y a su representante legal si es menor de edad, garantizando el tiempo para preparar la defensa.',
    keyActions: [
      'Envío de comunicación oficial firmada con fecha, hora y lugar o enlace virtual.',
      'Copia íntegra del informe de queja y de todas las pruebas que obran en su contra.',
      'Indicación explícita del derecho a comparecer, presentar descargos por escrito u oralmente y allegar pruebas.'
    ]
  },
  {
    stepNumber: 3,
    phaseName: 'Audiencia de Descargos',
    normativeTime: 'Día y hora señalados en la citación',
    description: 'Sesión oficial del Comité con quórum deliberatorio, donde se expone el caso y se escucha con plenas garantías al aprendiz.',
    keyActions: [
      'Verificación de quórum de los integrantes reglamentarios.',
      'Lectura de los cargos y las pruebas que fundamentan la citación.',
      'Uso de la palabra por el aprendiz para exponer sus descargos y controvertir los hechos.',
      'Preguntas orientadoras y conceptuación del profesional de Bienestar al Aprendiz.'
    ]
  },
  {
    stepNumber: 4,
    phaseName: 'Deliberación y Acta de Recomendación',
    normativeTime: 'Inmediatamente posterior a la audiencia',
    description: 'Los miembros con voto deliberan a puerta cerrada y redactan el Acta Oficial con la recomendación fundamentada.',
    keyActions: [
      'Análisis de gravedad de la falta, atenuantes (confesión, intencionalidad de enmienda) y agravantes.',
      'Votación nominal de los miembros del comité.',
      'Elaboración del Acta Oficial suscrita por todos los integrantes presentes.',
      'Remisión del expediente completo al despacho del Subdirector de Centro.'
    ]
  },
  {
    stepNumber: 5,
    phaseName: 'Resolución de Subdirección',
    normativeTime: 'Dentro de los términos legales establecidos por el Acuerdo 009',
    description: 'El Subdirector de Centro expide el Acto Administrativo formal (Resolución motivada), acogiendo o motivando apartarse de la recomendación.',
    keyActions: [
      'Estudio del expediente y emisión de la Resolución en derecho.',
      'Determinación de la exoneración, medida formativa o sanción disciplinaria aplicable.',
      'Notificación personal o por correo electrónico al aprendiz con texto completo del acto.'
    ]
  },
  {
    stepNumber: 6,
    phaseName: 'Recurso de Reposición',
    normativeTime: 'Dentro de los cinco (5) días hábiles siguientes a la notificación',
    description: 'Derecho del aprendiz a controvertir y solicitar la reconsideración de la sanción impuesta ante el mismo Subdirector de Centro.',
    keyActions: [
      'Radicación de memorial de reposición con los argumentos de hecho y derecho.',
      'El Subdirector resuelve el recurso en término de ley, confirmando, modificando o revocando la sanción.',
      'Queda en firme el acto administrativo y se registra en SofiaPlus.'
    ]
  }
];

export const INITIAL_QUESTIONS: Question[] = [
  {
    id: 'q1',
    category: 'identidad',
    categoryLabel: 'Identidad Institucional',
    question: '¿Quién fue el ilustre fundador del SENA en el año 1957 mediante el Decreto Ley 118?',
    context: 'El SENA nació fruto de una iniciativa compartida entre trabajadores, empleadores y el Estado colombiano.',
    options: [
      'Rodolfo Martínez Tono',
      'Gabriel García Márquez',
      'Carlos Lleras Restrepo',
      'Alberto Lleras Camargo'
    ],
    correctAnswer: 0,
    explanation: 'El economista cartagenero Rodolfo Martínez Tono concibió y lideró la creación del SENA en 1957 con el apoyo de la OIT, fundando una institución para la capacitación técnica y social de Colombia.'
  },
  {
    id: 'q2',
    category: 'identidad',
    categoryLabel: 'Símbolos SENA',
    question: 'En el escudo institucional del SENA, ¿qué representa la rueda dentada o piñón?',
    context: 'El escudo resume los tres sectores de la actividad productiva nacional.',
    options: [
      'El sector primario y agropecuario del campo',
      'El sector secundario, la industria y la metalmecánica',
      'El sector terciario de comercio y servicios',
      'El transporte terrestre y ferroviario'
    ],
    correctAnswer: 1,
    explanation: 'La rueda dentada o piñón simboliza el sector de la industria, la construcción y la transformación manufacturera, pilares del avance productivo.'
  },
  {
    id: 'q3',
    category: 'identidad',
    categoryLabel: 'Símbolos SENA',
    question: '¿Cuál es el significado del Logo-Símbolo del SENA (la figura con extremidades y líneas paralelas)?',
    options: [
      'Un árbol de café floreciendo en la cordillera',
      'El ser humano proyectándose en los senderos de superación personal y laboral',
      'Un atleta cruzando una meta deportiva',
      'Un edificio de aulas tecnológicas'
    ],
    correctAnswer: 1,
    explanation: 'El logo-símbolo representa al aprendiz (el ser humano integral) erguido y proyectándose hacia el futuro sobre los senderos que le brinda la formación profesional.'
  },
  {
    id: 'q4',
    category: 'derechos',
    categoryLabel: 'Derechos del Aprendiz',
    question: '¿Cuál de los siguientes es un DERECHO fundamental consagrado en el Reglamento del Aprendiz SENA?',
    options: [
      'Recibir inducción completa, formación profesional integral de calidad y retroalimentación oportuna de evidencias',
      'Faltar a clases sin justificación hasta por un mes',
      'Vender productos comerciales dentro de los talleres sin autorización',
      'Negarse a usar los elementos de protección personal si le resultan incómodos'
    ],
    correctAnswer: 0,
    explanation: 'Recibir una formación profesional integral de calidad, con instructores competentes, ambientes dignos y retroalimentación de sus evaluaciones es el derecho eje de todo aprendiz.'
  },
  {
    id: 'q5',
    category: 'deberes',
    categoryLabel: 'Deberes del Aprendiz',
    question: 'Si un aprendiz presenta una inasistencia a sus sesiones de formación por causa de fuerza mayor o salud, ¿cuántos días hábiles tiene para presentar su justificación formal?',
    options: [
      'Hasta el final del trimestre formativo',
      'Dentro de los 3 días hábiles siguientes al hecho',
      '15 días calendario posteriores',
      'No es necesario justificar si avisa por WhatsApp a un amigo'
    ],
    correctAnswer: 1,
    explanation: 'El Reglamento establece un plazo perentorio de tres (3) días hábiles siguientes a la inasistencia para radicar los soportes (incapacidad EPS o calamidad demostrable) ante el instructor o coordinación.'
  },
  {
    id: 'q6',
    category: 'deberes',
    categoryLabel: 'Deberes del Aprendiz',
    question: '¿Cuántos días consecutivos de inasistencia no justificada configuran causal de DESERCIÓN en el proceso formativo?',
    options: [
      '1 día de inasistencia',
      '3 días consecutivos sin justificación válida',
      '30 días consecutivos',
      '10 días con aviso telefónico'
    ],
    correctAnswer: 1,
    explanation: 'Tres (3) días hábiles consecutivos de inasistencia injustificada dan inicio formal al trámite de deserción con notificación al aprendiz para que presente descargos.'
  },
  {
    id: 'q7',
    category: 'reglamento',
    categoryLabel: 'Régimen Disciplinario',
    question: '¿Qué tipo de falta se configura si un aprendiz presta su carné institucional a otra persona para que ingrese a las instalaciones del SENA?',
    options: [
      'Falta leve que se resuelve con una charla informal',
      'Falta gravísima por suplantación y vulneración de la seguridad institucional',
      'Una falta pedagógica voluntaria sin registro',
      'No es considerado falta si la otra persona es familiar'
    ],
    correctAnswer: 1,
    explanation: 'El carné es personal e intransferible. Facilitarlo para suplantación de identidad vulnera la seguridad del Centro y constituye una falta gravísima sujeta a Comité Disciplinario.'
  },
  {
    id: 'q8',
    category: 'reglamento',
    categoryLabel: 'Debido Proceso',
    question: 'En caso de una presunta falta disciplinaria, ¿cuál es el órgano encargado de analizar el caso y emitir recomendaciones sancionatorias?',
    options: [
      'El Comité de Evaluación y Seguimiento del Centro de Formación',
      'El representante de la empresa patrocinadora',
      'El celador de la portería principal',
      'El grupo de compañeros de la ficha'
    ],
    correctAnswer: 0,
    explanation: 'El Comité de Evaluación y Seguimiento convoca al aprendiz, analiza las pruebas, escucha sus descargos y recomienda al Subdirector de Centro la medida formativa o sancionatoria correspondiente.'
  },
  {
    id: 'q9',
    category: 'ruta',
    categoryLabel: 'Ruta Formativa',
    question: '¿Cuáles son las dos grandes etapas que componen la formación titulada en el SENA?',
    options: [
      'Etapa Teórica y Etapa de Vacaciones',
      'Etapa Lectiva y Etapa Productiva',
      'Etapa Escolar y Etapa Universitaria',
      'Etapa de Inducción y Etapa de Grado únicamente'
    ],
    correctAnswer: 1,
    explanation: 'La Formación Profesional Integral del SENA se estructura en dos fases complementarias: la Etapa Lectiva (apropiación teórico-práctica en ambientes de aprendizaje) y la Etapa Productiva (aplicación en el entorno laboral real).'
  },
  {
    id: 'q10',
    category: 'ruta',
    categoryLabel: 'Ruta Formativa',
    question: '¿Cuál de las siguientes es una modalidad válida y reconocida para desarrollar la Etapa Productiva?',
    options: [
      'Contrato de Aprendizaje, Vínculo Laboral, Proyecto Productivo o Pasantía',
      'Trabajo informal sin ningún convenio ni registro',
      'Ver tutoriales en redes sociales sin acompañamiento',
      'Trabajar en una empresa sin que el Centro de Formación esté informado'
    ],
    correctAnswer: 0,
    explanation: 'Las modalidades avaladas por el SENA incluyen Contrato de Aprendizaje, Vínculo Laboral, Pasantías, Proyectos Productivos SENA Emprende Rural/TecnoParque, y Monitorías en Centros.'
  },
  {
    id: 'q11',
    category: 'ruta',
    categoryLabel: 'Plataformas SENA',
    question: '¿Cuál es el sistema oficial del SENA para la gestión de matrículas, certificados, hojas de vida académica y consultas de novedades?',
    options: [
      'Sofia Plus (Sistema Optimizado para la Formación Integral)',
      'Instagram SENA',
      'Google Classroom libre',
      'WhatsApp Web SENA'
    ],
    correctAnswer: 0,
    explanation: 'Sofia Plus (y los ecosistemas digitales vinculados como Zajuna LMS) constituye la plataforma transaccional oficial de registro, evaluación y certificación del aprendiz SENA.'
  },
  {
    id: 'q12',
    category: 'identidad',
    categoryLabel: 'Valores Institucionales',
    question: 'Cuando un aprendiz cita correctamente a los autores de una investigación y entrega trabajos de su propia autoría, ¿qué valor institucional está aplicando?',
    options: [
      'Honestidad y Responsabilidad',
      'Libre albedrío sin reglas',
      'Solidaridad ciega',
      'Comodidad'
    ],
    correctAnswer: 0,
    explanation: 'La honestidad intelectual y la responsabilidad son valores clave para evitar el fraude y fortalecer el rigor ético y profesional que caracteriza al egresado SENA.'
  },
  {
    id: 'q13',
    category: 'tramites',
    categoryLabel: 'Reglamento Acuerdo 009 de 2024',
    question: '¿Cuál es el acuerdo vigente expedido por el Consejo Directivo Nacional que rige los derechos, deberes y trámites del Aprendiz SENA?',
    context: 'Normativa institucional actualizada adoptada por el SENA a nivel nacional.',
    options: [
      'Acuerdo 009 de 2024',
      'Decreto 1072 de 2015',
      'Ley 100 de 1993',
      'Resolución 1000 de 2000'
    ],
    correctAnswer: 0,
    explanation: 'El Acuerdo 009 de 2024 es el acto administrativo expedido por el Consejo Directivo Nacional del SENA que adopta el nuevo Reglamento del Aprendiz, modernizando los trámites de ingreso, permanencia, novedades y debido proceso.'
  },
  {
    id: 'q14',
    category: 'tramites',
    categoryLabel: 'Novedades · Aplazamiento',
    question: 'Conforme al Acuerdo 009 de 2024, ¿cuál es el tiempo máximo autorizado para la suspensión temporal de la formación mediante aplazamiento?',
    options: [
      'Hasta por un período máximo de seis (6) meses prorrogables en casos de fuerza mayor o servicio militar',
      'Dos (2) semanas improrrogables',
      'Hasta por cinco (5) años consecutivos sin aviso',
      'El tiempo que el aprendiz desee sin límite'
    ],
    correctAnswer: 0,
    explanation: 'El aplazamiento es la suspensión temporal del proceso formativo y se otorga hasta por un término máximo de seis (6) meses, el cual solo puede prorrogarse por fuerza mayor comprobada, servicio militar o maternidad.'
  },
  {
    id: 'q15',
    category: 'tramites',
    categoryLabel: 'Trámites · Reingreso',
    question: 'Para que un aprendiz que tuvo aplazamiento autorizado pueda retomar sus estudios, ¿con cuánta anticipación debe radicar formalmente su solicitud de reingreso?',
    options: [
      'El mismo día que inician las clases sin aviso',
      'Con un mínimo de un (1) mes de anticipación a la fecha de inicio del periodo académico',
      'Un año después de haber vencido el aplazamiento',
      'No es necesario solicitarlo, el sistema lo matricula solo'
    ],
    correctAnswer: 1,
    explanation: 'El Acuerdo 009 de 2024 estipula que el reingreso debe solicitarse formalmente por SofiaPlus con al menos un (1) mes de antelación al inicio del trimestre para verificar disponibilidad de cupo y correspondencia curricular.'
  },
  {
    id: 'q16',
    category: 'tramites',
    categoryLabel: 'Novedades · Deserción',
    question: '¿Cuándo se configura formalmente la causal de deserción por inasistencia según el Acuerdo 009 de 2024?',
    options: [
      'Al faltar a una sola clase de inducción',
      'Cuando el aprendiz acumula tres (3) días hábiles consecutivos de inasistencia injustificada',
      'Al llegar 10 minutos tarde un viernes',
      'Únicamente si el aprendiz envía una carta de despedida'
    ],
    correctAnswer: 1,
    explanation: 'Tres (3) días hábiles continuos de inasistencia no justificada activan la notificación de deserción. El aprendiz dispone de cinco (5) días hábiles para presentar sus descargos y soportes antes de emitir la resolución.'
  },
  {
    id: 'q17',
    category: 'tramites',
    categoryLabel: 'Novedades · Retiro Voluntario',
    question: 'Si un aprendiz solicita libremente su Retiro Voluntario de la formación titulada, ¿cuál es la consecuencia administrativa que aplica el reglamento?',
    options: [
      'Una sanción de seis (6) meses sin poder inscribirse en programas de formación titulada del SENA',
      'Una multa económica en dinero',
      'Pérdida de la ciudadanía colombiana',
      'Ninguna, puede volver a inscribirse al día siguiente'
    ],
    correctAnswer: 0,
    explanation: 'El Retiro Voluntario genera una sanción administrativa de seis (6) meses en el sistema SofiaPlus, periodo durante el cual el usuario no puede registrarse en convocatorias de formación titulada.'
  },
  {
    id: 'q18',
    category: 'faltas',
    categoryLabel: 'Medidas Formativas vs Disciplinarias',
    question: '¿Cuál es la diferencia fundamental entre una Medida Formativa y una Medida Disciplinaria en el Acuerdo 009 de 2024?',
    options: [
      'Las medidas formativas son preventivas y pedagógicas (no constituyen sanción), mientras que las medidas disciplinarias son sanciones formales impuestas por el Subdirector',
      'No existe ninguna diferencia, ambas son castigos severos',
      'Las formativas las impone la Policía y las disciplinarias los compañeros',
      'Las formativas conllevan cárcel y las disciplinarias tareas escolares'
    ],
    correctAnswer: 0,
    explanation: 'Las medidas formativas (llamado verbal, planes de mejoramiento de hasta 30 días) buscan fortalecer el aprendizaje sin dejar antecedentes sancionatorios. Las medidas disciplinarias (llamado escrito, condicionamiento y cancelación) son sanciones formales.'
  },
  {
    id: 'q19',
    category: 'comite',
    categoryLabel: 'Comité de Evaluación · Debido Proceso',
    question: 'Para garantizar el debido proceso, ¿con cuántos días hábiles de anticipación mínima debe ser citado el aprendiz a la audiencia del Comité de Evaluación y Seguimiento?',
    options: [
      'El mismo día dos horas antes',
      'Con un mínimo de cinco (5) días hábiles de anticipación, con copia de cargos y pruebas',
      'Con un mes de anticipación por edicto público',
      'No se le debe avisar para que sea sorpresa'
    ],
    correctAnswer: 1,
    explanation: 'El debido proceso exige que el aprendiz reciba la citación formal con mínimo cinco (5) días hábiles de antelación, adjuntando todas las pruebas y cargos para que pueda preparar sus descargos y ejercer su derecho a la defensa.'
  },
  {
    id: 'q20',
    category: 'comite',
    categoryLabel: 'Debido Proceso · Recursos',
    question: 'Una vez notificada la Resolución sancionatoria expedida por el Subdirector de Centro, ¿qué recurso legal procede y en qué término?',
    options: [
      'Recurso de Reposición dentro de los cinco (5) días hábiles siguientes a la notificación',
      'Demanda directa en juzgado dentro de las 24 horas',
      'Queja verbal al celador de turno',
      'No procede ningún recurso, la decisión es inapelable de inmediato'
    ],
    correctAnswer: 0,
    explanation: 'Contra la resolución del Subdirector de Centro procede el Recurso de Reposición, el cual debe interponerse por escrito dentro de los cinco (5) días hábiles siguientes a la notificación personal para que la autoridad reconsidere o aclare la decisión.'
  }
];

export const MOCK_APPRENTICE_RESULTS: ApprenticeResult[] = [
  {
    id: 'app-001',
    fullName: 'Valentina Restrepo Gómez',
    documentType: 'CC',
    documentNumber: '1020485912',
    mobile: '3104567890',
    populationCharacterization: 'Mujer Cabeza de Familia',
    city: 'Medellín',
    stratum: 'Estrato 2 (Bajo)',
    emailSoySena: 'valentina.restrepo@soy.sena.edu.co',
    trainingCard: '2824910',
    program: 'Análisis y Desarrollo de Software (ADSO)',
    center: 'Centro de Servicios y Gestión Empresarial',
    score: 92,
    passed: true,
    date: '2026-10-24 09:15',
    answers: [],
    categoryBreakdown: {
      identidad: 100,
      derechos: 100,
      deberes: 85,
      reglamento: 90,
      ruta: 95
    }
  },
  {
    id: 'app-002',
    fullName: 'Julián Camilo Pardo Rojas',
    documentType: 'CC',
    documentNumber: '1098234871',
    mobile: '3157891234',
    populationCharacterization: 'Ninguna / Población General',
    city: 'Bogotá D.C.',
    stratum: 'Estrato 3 (Medio - Bajo)',
    emailSoySena: 'julian.pardo@soy.sena.edu.co',
    trainingCard: '2824910',
    program: 'Análisis y Desarrollo de Software (ADSO)',
    center: 'Centro de Servicios y Gestión Empresarial',
    score: 83,
    passed: true,
    date: '2026-10-25 14:30',
    answers: [],
    categoryBreakdown: {
      identidad: 80,
      derechos: 85,
      deberes: 80,
      reglamento: 85,
      ruta: 90
    }
  },
  {
    id: 'app-003',
    fullName: 'Diana Marcela Morales',
    documentType: 'TI',
    documentNumber: '1032891244',
    mobile: '3206549871',
    populationCharacterization: 'Jóvenes en Condición de Vulnerabilidad',
    city: 'Cali',
    stratum: 'Estrato 1 (Bajo - Bajo)',
    emailSoySena: 'diana.morales@soy.sena.edu.co',
    trainingCard: '2824910',
    program: 'Análisis y Desarrollo de Software (ADSO)',
    center: 'Centro de Servicios y Gestión Empresarial',
    score: 58,
    passed: false,
    date: '2026-10-25 16:45',
    answers: [],
    categoryBreakdown: {
      identidad: 70,
      derechos: 50,
      deberes: 45,
      reglamento: 60,
      ruta: 65
    }
  },
  {
    id: 'app-004',
    fullName: 'Mateo Alejandro Benítez',
    documentType: 'CC',
    documentNumber: '1152908123',
    mobile: '3012345678',
    populationCharacterization: 'Población Campesina y Rural',
    city: 'Pereira',
    stratum: 'Zona Rural / Sin Estratificación',
    emailSoySena: 'mateo.benitez@soy.sena.edu.co',
    trainingCard: '2758120',
    program: 'Gestión Empresarial y Talento Humano',
    center: 'Centro de Comercio y Servicios',
    score: 95,
    passed: true,
    date: '2026-10-26 10:20',
    answers: [],
    categoryBreakdown: {
      identidad: 100,
      derechos: 95,
      deberes: 90,
      reglamento: 95,
      ruta: 100
    }
  },
  {
    id: 'app-005',
    fullName: 'Camila Andrea Ospina',
    documentType: 'CC',
    documentNumber: '1017849201',
    mobile: '3189876543',
    populationCharacterization: 'Comunidades Negras, Afrocolombianas, Raizales y Palenqueras',
    city: 'Barranquilla',
    stratum: 'Estrato 2 (Bajo)',
    emailSoySena: 'camila.ospina@soy.sena.edu.co',
    trainingCard: '2758120',
    program: 'Gestión Empresarial y Talento Humano',
    center: 'Centro de Comercio y Servicios',
    score: 75,
    passed: true,
    date: '2026-10-26 11:50',
    answers: [],
    categoryBreakdown: {
      identidad: 80,
      derechos: 70,
      deberes: 75,
      reglamento: 70,
      ruta: 80
    }
  }
];
