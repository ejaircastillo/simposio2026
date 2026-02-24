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
    bio: "Doctor en Criminología y Derecho (Cambridge). Autor de la Declaración sobre los principios fundamentales de justicia para las víctimas (ONU, 1985). Profesor en la Universidad de Ottawa.",
    image: "/Oradores/waller.webp",
    objectPosition: "center 15%",
    highlight: true
  },
  {
    id: "marcelo-aebi",
    name: "Marcelo Aebi",
    title: "Secretario General de la Sociedad Europea de Criminología",
    bio: "Catedrático de Criminología en la Universidad de Lausana (Suiza). Responsable de las Estadísticas Penales Anuales del Consejo de Europa (SPACE).",
    image: "/Oradores/aebi.webp",
    objectPosition: "center 2%",
    highlight: true
  },
  {
    id: "diana-cohen-agrest",
    name: "Diana Cohen Agrest",
    title: "Presidenta de Usina de Justicia",
    bio: "Doctora en Filosofía (UBA) y Magíster de Bioética (Monash University). Premio Konex de Platino en Ética. Autora de 'Ausencia perpetua' e 'Inseguridad y trampas de la (in)justicia'.",
    image: "/Oradores/Diana_hd.webp",
    objectPosition: "object-center",
    highlight: false
  },
  {
    id: "ricardo-gil-lavedra",
    name: "Ricardo Gil Lavedra",
    title: "Presidente del CPACF",
    bio: "Ex Juez de la Cámara Federal (Juicio a las Juntas). Ex Ministro de Justicia y Derechos Humanos de la Nación. Juez ad-hoc de la Corte Interamericana de Derechos Humanos.",
    image: "/Oradores/Ricardo-Gil-lavedra.webp",
    highlight: false
  },
  {
    id: "maria-luz-lima-malvido",
    name: "María de la Luz Lima Malvido",
    title: "Fundadora Sociedad Mexicana de Victimología",
    bio: "Doctora Magna Cum Laude en Derecho (UNAM). Negociadora de Rehenes certificada por el FBI. Ex fiscal y ex diputada en México.",
    image: "/Oradores/malvido.webp",
    objectPosition: "center 8%",
    highlight: true
  },
  {
    id: "german-garavano",
    name: "Germán Garavano",
    title: "Ex Ministro de Justicia y DDHH",
    bio: "Abogado y consultor. Ex Fiscal General y Consejero del Consejo de la Magistratura de CABA. Miembro del Consejo Directivo del CEJA (OEA).",
    image: "/Oradores/Garavano.webp",
    objectPosition: "center -15%",
    highlight: false
  },
  {
    id: "franco-fiumara",
    name: "Franco Fiumara",
    title: "Juez Tribunal Oral Criminal",
    bio: "Doctor en Ciencias Jurídicas y Políticas. Becario de Yad Vashem (Israel) y Profesor benemérito de la Universidad Aldo Moro de Bari (Italia).",
    image: "/Oradores/fiumara.webp",
    highlight: false
  },
  {
    id: "dario-solis",
    name: "Darío Solís",
    title: "Defensor de Víctimas (Panamá)",
    bio: "Abogado especializado en victimología y DDHH. Colaborador del Instituto Vasco de Criminología y Expertise France.",
    image: "/Oradores/Dario Solis.webp",
    objectPosition: "object-top",
    highlight: true
  },
  {
    id: "mariana-romano",
    name: "Mariana Romano",
    title: "Moderadora",
    bio: "Experta en victimología y derechos humanos.",
    image: "/Oradores/romano.webp",
    objectPosition: "center",
    imageScale: "contain",
    highlight: false
  },
  {
    id: "jose-console",
    name: "José Console",
    title: "Panelista",
    bio: "Especialista en derecho penal y proceso penal.",
    image: "/Oradores/console.webp",
    highlight: false
  },
  {
    id: "maria-jimena-molina",
    name: "María Jimena Molina",
    title: "Panelista",
    bio: "Investigadora en criminología y victimología.",
    image: "/Oradores/jimena_1.webp",
    objectPosition: "object-top",
    highlight: false
  },
  {
    id: "gustavo-topic",
    name: "Gustavo Topic",
    title: "Moderador",
    bio: "Experto en derecho penal y política criminal.",
    image: null,
    highlight: false
  },
  {
    id: "francisco-castex",
    name: "Francisco Castex",
    title: "Panelista",
    bio: "Especialista en derecho procesal penal.",
    image: "/Oradores/castex.webp",
    highlight: false
  },
  {
    id: "daniel-roggero",
    name: "Daniel Roggero",
    title: "Panelista",
    bio: "Investigador en derecho penal y criminología.",
    image: "/Oradores/roggero.webp",
    highlight: false
  },
  {
    id: "noelia-juarez",
    name: "Noelia Juarez",
    title: "Panelista",
    bio: "Especialista en victimología y DDHH.",
    image: "/Oradores/juarez.webp",
    highlight: false
  },
  {
    id: "karina-massa",
    name: "Karina Massa",
    title: "Panelista",
    bio: "Experta en trabajo de campo y genética forense.",
    image: null,
    highlight: false
  },
  {
    id: "raquel-slotolow",
    name: "Raquel Slotolow",
    title: "Panelista",
    bio: "Especialista en análisis de datos genéticos.",
    image: "/Oradores/slotolow.webp",
    objectPosition: "object-top",
    highlight: false
  },
  {
    id: "guillermo-bargna",
    name: "Guillermo Bargna",
    title: "Panelista",
    bio: "Experto en Ley de Datos Genéticos.",
    image: "/Oradores/bargna.webp",
    objectPosition: "top center",
    highlight: false
  },
  {
    id: "fernando-soto",
    name: "Fernando Soto",
    title: "Panelista",
    bio: "Especialista en derecho penal.",
    image: "/Oradores/soto.webp",
    objectPosition: "object-top",
    highlight: false
  },
  {
    id: "marcelo-peluzzi",
    name: "Marcelo Peluzzi",
    title: "Panelista",
    bio: "Experto en ejecución de penas.",
    image: "/Oradores/peluzzi.webp",
    highlight: false
  },
  {
    id: "francisco-javier-pascua",
    name: "Francisco Javier Pascua",
    title: "Panelista",
    bio: "Investigador en abolicionismo penal.",
    image: "/Oradores/pascua.webp",
    highlight: false
  },
  {
    id: "martin-casares",
    name: "Martín Casares",
    title: "Panelista",
    bio: "Especialista en ministerio público.",
    image: "/Oradores/casares.webp",
    highlight: false
  }
];