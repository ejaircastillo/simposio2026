// lib/speakers.ts

export interface Speaker {
  id: string
  name: string
  title: string
  bio: string
  image: string | null
  objectPosition?: string
  imageScale?: string
  highlight?: boolean
}

export const speakers: Speaker[] = [
  {
    id: "irvin-waller",
    name: "Irvin Waller",
    title: "Criminólogo Internacional",
    bio: "Criminólogo internacional. Miembro del Comité Científico del Instituto de Victimología de Usina de Justicia (IVUJUS). Doctor en Criminología y en Derecho (Universidad de Cambridge). Profesor de Criminología (Universidad de Otawa). Asesor de ministros de justicia y de organizaciones internacionales. Autor de varios libros. Ha sido uno de los autores de 'Declaración sobre los principios fundamentales de justicia para las víctimas de delitos y del abuso de poder' (ONU. 1985). Ha recibido numerosos premios por sus contribuciones a la prevención del delito y los derechos de las víctimas.",
    image: "/Oradores/waller.webp",
    objectPosition: "center 15%",
    highlight: true
  },
  {
    id: "marcelo-aebi",
    name: "Marcelo Aebi",
    title: "Secretario General de la Sociedad Europea de Criminología",
    bio: "Secretario General de la Sociedad Europea de Criminología. Ph.D. Catedrático de Criminología en la Facultad de Ciencias Penales de la Universidad de Lausana (Suiza). Miembro del Comité Científico del Instituto de Victimología de Usina de Justicia (IVUJUS). Ha sido distinguido con el Premio Freda Adler de la American Society of Criminology (2025). Sus principales temas de investigación incluyen la criminología comparada, las prisiones, la libertad condicional, la metodología, la delincuencia juvenil, las drogas, y los estudios de victimización y autodeclaración de delincuencia. Es autor y coautor de más de 150 publicaciones científicas en inglés, francés, español, catalán, italiano, macedonio, turco y alemán.",
    image: "/Oradores/aebi.webp",
    objectPosition: "center 2%",
    highlight: true
  },
  {
    id: "diana-cohen-agrest",
    name: "Diana Cohen Agrest",
    title: "Presidenta de Usina de Justicia",
    bio: "Presidenta de la Asociación Civil Usina de Justicia y Directora Honoraria del Instituto de Victimología de Usina de Justicia (IVUJUS). Doctora en Filosofía (UBA) y Magíster de Bioética (Monash University). Profesora universitaria. Autora de una decena de ensayos sobre filosofía y ética. Ha recibido el premio Konex de Platino en Ética (2016).",
    image: "/Oradores/Diana_hd.webp",
    objectPosition: "center",
    highlight: false
  },
  {
    id: "ricardo-gil-lavedra",
    name: "Ricardo Gil Lavedra",
    title: "Presidente del CPACF",
    bio: "Presidente del Colegio Público de la Abogacía de la Capital Federal (CPACF). Ha sido Conjuez de la Corte Suprema de Justicia de la Nación. Presidente del Consejo Consultivo y Coordinador General del Programa Justicia 2020. Ex Ministro de Justicia y Derechos Humanos de la Nación. Juez ad-hoc de la Corte Interamericana de Derechos Humanos. Presidente del Consejo Consultivo de Justicia del Gobierno de la Ciudad de Buenos Aires. Vicepresidente del Comité contra la Tortura de las Naciones Unidas.",
    image: "/Oradores/Ricardo-Gil-lavedra.webp",
    highlight: false
  },
  {
    id: "maria-luz-lima-malvido",
    name: "María de la Luz Lima Malvido",
    title: "Fundadora Sociedad Mexicana de Victimología",
    bio: "Fundadora de la Sociedad Mexicana de Criminología y Presidenta Honoraria de la Sociedad Mexicana de Victimología. Miembro de la Academia Mexicana de Ciencias Penales. Especialista en Ciencias Penales. Doctora Magna Cum Laude en Derecho (UNAM). Certificada en estudios de Terrorismo (SAU) y en Negociación de Rehenes del FBI. Profesora universitaria e investigadora. Ex fiscal y ex diputada. Autora del libro Políticas públicas en la atención a víctimas. Una propuesta metodológica (INACIPE. 2017).",
    image: "/Oradores/malvido.webp",
    objectPosition: "center 8%",
    highlight: true
  },
  {
    id: "german-garavano",
    name: "Germán Garavano",
    title: "Ex Ministro de Justicia y DDHH",
    bio: "Ex Ministro de Justicia y Derechos Humanos de la Nación. Ex Fiscal general. Ha sido Consejero del Consejo de la Magistratura y Juez de la Ciudad de Buenos Aires. También ha sido miembro del Consejo Directivo del Centro de Estudios de Justicia para las Américas (CEJA), organismo dependiente de la OEA. Escribió decenas de artículos y libros sobre justicia.",
    image: "/Oradores/Garavano.webp",
    objectPosition: "center -15%",
    highlight: false
  },
  {
    id: "franco-fiumara",
    name: "Franco Fiumara",
    title: "Juez Tribunal Oral Criminal",
    bio: "Juez en lo Criminal. Miembro de Usina de Justicia. Doctor en Ciencias Jurídicas y en Ciencias Políticas. Magister en Derecho y Relaciones Internacionales. Becario y profesor invitado de Yad Vashem (Israel). Condecorado como Ufficiale della Ordine della Stella d`Italia. Profesor benemérito de la Universidad Aldo Moro de Bari, Italia. Consejero ad Honorem de la Facultad Interamericana de Litigación A.C. (Universidad Barra Interamericana de Abogados-México). Ciudadano y huésped ilustre de varias ciudades argentinas. Becario del programa Personnalité d´ avenir (Francia). Profesor de grado y posgrado. Investigador. Autor de numerosas publicaciones académicas.",
    image: "/Oradores/fiumara.webp",
    highlight: false
  },
  {
    id: "dario-solis",
    name: "Darío Solís",
    title: "Defensor de Víctimas (Panamá)",
    bio: "Defensor de víctimas. Miembro del Comité Científico del Instituto de Victimología de Usina de Justicia (IVUJUS). Conferencista internacional. Posee una amplia experiencia en litigación y asesoría empresarial e institucional. Es miembro de la Sociedad Vasca de Victimología y tiene certificación habilitante de la Escuela Judicial de Panamá para Operadores del Sistema Penal Acusatorio. Doctor cum laude en derechos humanos, poderes públicos y Unión Europea (Universidad del País Vasco)",
    image: "/Oradores/Dario Solis.webp",
    objectPosition: "top center",
    highlight: true
  },
  {
    id: "mariana-romano",
    name: "Mariana Romano",
    title: "Moderadora",
    bio: "Responsable del área de Relaciones Institucionales del Instituto de Victimología de Usina de Justicia (IVUJUS) y Representante ante la OEA de la Asociación Civil Argentina Usina de Justicia. Diplomada en Derechos Humanos (UA), Ciberdelincuencia y Evidencia Digital (UA y CEU) e Inclusión Social (OEA). Se desempeña en la Justicia Nacional en lo Criminal y Correccional de la República Argentina. Asesora ad honorem del Comisionado para el Monitoreo y Combate del Antisemitismo de la OEA. Directora de la Comisión de Relaciones Internacionales de la AAJRA. Becaria del programa Young Lawyers for the Rule of Law in the Americas 2025 (Georgetown University, EE. UU.). Becaria FURP.",
    image: "/Oradores/romano.webp",
    objectPosition: "center",
    imageScale: "contain",
    highlight: false
  },
  {
    id: "jose-console",
    name: "José Console",
    title: "Panelista",
    bio: "Coordinador del Programa de Derechos y Garantías de las Víctimas de Delito y Subdirector del Instituto de Derecho Procesal Penal del Colegio Público de la Abogacía de la Capital Federal (CPACF). Consejero del Colegio Público de la Abogacía de la Capital Federal. Especialista en Derecho Penal (UCA).",
    image: "/Oradores/console.webp",
    highlight: false
  },
  {
    id: "maria-jimena-molina",
    name: "María Jimena Molina",
    title: "Panelista",
    bio: "Directora del Instituto de Victimología de Usina de Justicia (IVUJUS). Auxiliar Letrada Relatora de la Fiscalía del Tribunal de Casación de la Provincia de Buenos Aires. Magíster en ética, Filosofía Política y Antropología (TECH. España). Especialista en Derecho Penal (UNLP). Diplomada en Libertad de Expresión y Seguridad de Periodistas (Instituto Bonavero de Derechos Humanos, Universidad de Oxford. UNESCO). Diplomada en Liderazgo (Marconi International University). Autora y co-compiladora del libro Nuevos paradigmas para la justicia penal. Hacia una era con perspectiva de víctima (TAEDA. 2025).",
    image: "/Oradores/jimena_1.webp",
    objectPosition: "top center",
    highlight: false
  },
  {
    id: "gustavo-topic",
    name: "Gustavo Topic",
    title: "Moderador",
    bio: "Secretario del Programa de Víctimas de Delitos dependiente de la Secretaria General del Colegio Público de la Abogacía de la Capital Federal (CPACF). Secretario de la comisión de Defensa del Colegio Público de Abogados CABA. Relator designado por el CPACF por ante la Inspección General de Justicia dependiente del Ministerio de Justicia de la Nación. Miembro Fundador del Observatorio de Víctimas de Falsas Denuncias de Delitos contra la integridad Sexual.",
    image: "/Oradores/topic.webp",
    highlight: false
  },
  {
    id: "francisco-javier-pascua",
    name: "Francisco Javier Pascua",
    title: "Panelista",
    bio: "Jefe de Unidades Fiscales de Investigación y de Juicio Oral (Mendoza). Fundador y Director del Grupo Diálogo y Debate. Miembro de Usina de Justicia. Magíster en Criminología (UDA). Profesor de grado y de posgrado. Capacitador del área de Capacitación penal, procesal y de litigación oral del Ministerio Público Fiscal de la provincia de Mendoza. Capacitador de Fiscales de la República de Honduras, del Instituto Superior de Formación de Fiscales del Ministerio Público de la Panamá y de la Procuraduría General de la Nación de Panamá. Autor de numerosas obras académicas y de relevancia.",
    image: "/Oradores/pascua.webp",
    highlight: false
  },
  {
    id: "daniel-roggero",
    name: "Daniel Roggero",
    title: "Panelista",
    bio: "Consejero académico del Instituto de Victimología de Usina de Justicia (IVUJUS). Creador del Índice Legislativo de Usina de Justicia (IUJ). Licenciado en Comunicación Social (USAL) y en Psicología Social (UAJFK). Profesor de Ciencia Política (UCES). Director de la Revista IIDOS. Autor del Manual de Derechos Humanos y Garantías de las Personas Víctimas de Delito.",
    image: "/Oradores/roggero.webp",
    highlight: false
  },
  {
    id: "noelia-juarez",
    name: "Noelia Marelyn Juarez",
    title: "Secretaria General de Usina de Justicia",
    bio: "Secretaria General de Usina de Justicia y del Instituto de Victimología (IVUJUS). Capacitada en derecho constitucional y administrativo. Autora de publicaciones académicas y periodísticas en materia penal.",
    image: "/Oradores/juarez.webp",
    objectPosition: "center",
    highlight: false
  },
  {
    id: "karina-massa",
    name: "Karina Massa",
    title: "Panelista",
    bio: "Directora de Asistencia a Víctimas del Municipio de Tres de Febrero. Diplomada en Gestión de la Conflictividad y Promoción de la Seguridad Ciudadana (Juan Vucetich. 2024). Madre de Matías Gandolfo, asesinado en el año 2014.",
    image: "/Oradores/massa.webp",
    highlight: false
  },
  {
    id: "raquel-slotolow",
    name: "Raquel Slotolow",
    title: "Panelista",
    bio: "Ex Juez en lo Correccional del Departamento Judicial Zárate- Campana. Especialista en en Derecho Penal (USAL). Miembro de Usina de Justicia.",
    image: "/Oradores/slotolow.webp",
    objectPosition: "top center",
    highlight: false
  },
  {
    id: "guillermo-bargna",
    name: "Guillermo Bargna",
    title: "Panelista",
    bio: "Miembro del Observatorio de Víctimas de la Honorable Cámara de Diputados de la Nación y de Usina de Justicia. También ha sido miembro del Observatorio de Víctimas en el Ministerio de Justicia y Derechos Humanos de la Nación. Ha participado como familiar de víctima en capacitaciones, debates parlamentarios, diversos programas televisivos y radiales, y notas en la prensa escrita. Padre de Soledad Bargna, asesinada en el año 2009.",
    image: "/Oradores/bargna.webp",
    objectPosition: "top center",
    highlight: false
  },
  {
    id: "fernando-soto",
    name: "Fernando Soto",
    title: "Panelista",
    bio: "Asesor Parlamentario del Senado de la Nación. Integrante de la Comisión de Reforma del Código Penal de la Nación. Miembro de Usina de Justicia. Fue Director Nacional de Proyectos, Evaluación de Normas y Cooperación Legislativa del Ministerio Seguridad de la Nación. Ex Director Nacional de Normativa y Enlace Judicial del Ministerio de Seguridad de la Nación.",
    image: "/Oradores/soto.webp",
    objectPosition: "top center",
    highlight: false
  },
  {
    id: "martin-casares",
    name: "Martín Casares",
    title: "Panelista",
    bio: "Secretario General del Colegio Público de la Abogacía de Capital Federal (CPACF). Consultor en política criminal y justicia penal. Magíster en Derecho Penal. Ha sido Subsecretario de Política Criminal del Ministerio de Justicia y Derechos Humanos de la Nación. Fue becario del 'Programa Interamericano de Formación de Capacitadores para la Reforma Procesal Penal' del Centro de Estudios de Justicia para las Américas (CEJA), organismo dependiente de la OEA. Ha coordinado los equipos de justicia y planes de la Fundación Pensar.",
    image: "/Oradores/casares.webp",
    objectPosition: "center 5%",
    highlight: false
  },
  {
    id: "marcelo-peluzzi",
    name: "Marcelo Peluzzi",
    title: "Panelista",
    bio: "Juez Nacional de Ejecución Penal. Docente de la Escuela Judicial del Consejo de la Magistratura de la Nación.",
    image: "/Oradores/peluzzi.webp",
    highlight: false
  },
  {
    id: "francisco-castex",
    name: "Francisco Castex",
    title: "Panelista",
    bio: "Miembro de la Comisión de Derecho Penal del Colegio de Abogados de la Ciudad de Buenos Aires. Doctor en Derecho (UBA). Profesor de grado y posgrado (UBA, UCEMA). Autor de numerosos artículos, destacándose en Responsabilidad penal de las personas jurídicas y compliance.",
    image: "/Oradores/castex.webp",
    objectPosition: "center",
    highlight: false
  }
];