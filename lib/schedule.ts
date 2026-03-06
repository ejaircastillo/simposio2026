// lib/schedule.ts

export const schedule = [
  {
    date: "Jueves 9 de Abril",
    events: [
      { time: "14:30", title: "Acreditaciones", type: "logistics" },
      {
        time: "15:00",
        title: "Palabras de Apertura",
        speakers: ["Ricardo Gil Lavedra", "Diana Cohen Agrest", "José Console", "María Jimena Molina"],
        type: "main"
      },
      {
        time: "15:20",
        title: "Panel I: Políticas públicas en la atención y en la asistencia a las víctimas",
        speakers: ["María de la Luz Lima Malvido"],
        moderator: "Mariana Romano",
        type: "panel"
      },
      {
        time: "16:05",
        title: "Panel II: La víctima y el derecho penal",
        speakers: ["Francisco Castex", "José Console"],
        moderator: "Gustavo Topic",
        type: "panel"
      },
      {
        time: "16:35",
        title: "Panel III: La víctima y la ciencia",
        speakers: ["Daniel Roggero", "Noelia Marelyn Juarez"],
        moderator: "Mariana Romano",
        type: "panel"
      },
      { time: "17:05", title: "Coffee Break", type: "logistics" },
      {
        time: "17:15",
        title: "Panel IV: Trabajo de campo y Ley de Datos Genéticos",
        speakers: ["Raquel Slotolow", "Guillermo Bargna"],
        moderator: "Mariana Romano",
        description: "Testimonios de familiares y análisis de la Ley 27.759.",
        type: "panel"
      },
      {
        time: "17:45",
        title: "Panel V: La figura del defensor de víctima (Panamá)",
        speakers: ["Darío Solís"],
        moderator: "Gustavo Topic",
        type: "panel"
      },
      { time: "18:30", title: "Entrega de Distinciones y Cierre de la Jornada", type: "ceremony" },
      { time: "19:00", title: "Cierre de la Jornada", type: "logistics" }
    ]
  },
  {
    date: "Viernes 10 de Abril",
    events: [
      { time: "14:30", title: "Acreditaciones", type: "logistics" },
      {
        time: "14:50",
        title: "Palabras de Apertura",
        speakers: ["Francisco Quintana"],
        type: "main"
      },
      {
        time: "15:00",
        title: "Panel I: Los derechos de las víctimas",
        speakers: ["Irvin Waller"],
        moderator: "Mariana Romano",
        description: "Ponencia central sobre principios fundamentales de justicia.",
        type: "highlight"
      },
      {
        time: "15:45",
        title: "Panel II: La víctima, el Ministerio Público y la política criminal",
        speakers: ["Germán Garavano", "Martín Casares"],
        moderator: "Gustavo Topic",
        type: "panel"
      },
      {
        time: "16:15",
        title: "Panel III: El juicio en ausencia y la imprescriptibilidad de los delitos contra la vida",
        speakers: ["Franco Fiumara (Video)", "Fernando Soto"],
        moderator: "Gustavo Topic",
        type: "panel"
      },
      {
        time: "16:45",
        title: "Panel IV: La víctima en la etapa de ejecución",
        speakers: ["Marcelo Peluzzi"],
        moderator: "Gustavo Topic",
        type: "panel"
      },
      { time: "17:00", title: "Coffee Break", type: "logistics" },
      {
        time: "17:10",
        title: "Panel V: Abolicionismo penal. En contra del dogma imperante",
        speakers: ["Francisco Javier Pascua", "María Jimena Molina"],
        moderator: "Mariana Romano",
        type: "panel"
      },
      {
        time: "17:40",
        title: "Panel VI: Críticas a la criminología crítica",
        speakers: ["Marcelo Aebi"],
        moderator: "Mariana Romano",
        type: "highlight"
      },
      { time: "18:25", title: "Lectura y firma de la Declaración de Buenos Aires, entrega de distinciones y cierre", type: "ceremony" },
      { time: "19:00", title: "Cierre de la Jornada", type: "logistics" }
    ]
  }
];