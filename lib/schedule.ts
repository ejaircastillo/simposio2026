// lib/schedule.ts

export const schedule = [
  {
    date: "Jueves 9 de Abril",
    events: [
      { time: "14:45", title: "Acreditaciones", type: "logistics" },
      { 
        time: "15:00", 
        title: "Palabras de Apertura", 
        speakers: ["Ricardo Gil Lavedra", "Diana Cohen Agrest", "José Console", "María Jimena Molina"],
        type: "main"
      },
      {
        time: "15:20",
        title: "Panel I: Políticas públicas en la atención a víctimas",
        speakers: ["María de la Luz Lima Malvido"],
        moderator: "Mariana Romano",
        type: "panel"
      },
      {
        time: "16:05",
        title: "Panel II: La víctima y el nuevo proceso penal",
        speakers: ["Francisco Castex", "José Console"],
        moderator: "Gustavo Topic",
        type: "panel"
      },
      {
        time: "16:35",
        title: "Panel III: Una mirada científica del derecho y de la victimología",
        speakers: ["Daniel Roggero", "Noelia Juarez"],
        moderator: "Mariana Romano",
        type: "panel"
      },
      {
        time: "17:15",
        title: "Panel IV: Trabajo de campo y Ley de Datos Genéticos",
        speakers: ["Karina Massa", "Raquel Slotolow", "Guillermo Bargna"],
        moderator: "Mariana Romano",
        description: "Testimonios de familiares y análisis de la Ley 27.759.",
        type: "panel"
      },
      {
        time: "18:00",
        title: "Panel V: La figura del defensor de víctima (Panamá)",
        speakers: ["Darío Solís"],
        moderator: "Gustavo Topic",
        type: "panel"
      }
    ]
  },
  {
    date: "Viernes 10 de Abril",
    events: [
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
        title: "Panel II: Ministerio Público y política criminal",
        speakers: ["Germán Garavano", "Martín Casares"],
        moderator: "Gustavo Topic",
        type: "panel"
      },
      {
        time: "16:15",
        title: "Panel III: Juicio en ausencia, imprescriptibilidad y ejecución",
        speakers: ["Franco Fiumara (Video)", "Fernando Soto", "Marcelo Peluzzi"],
        moderator: "Gustavo Topic",
        type: "panel"
      },
      {
        time: "17:10",
        title: "Panel IV: Abolicionismo penal",
        speakers: ["Francisco Javier Pascua", "María Jimena Molina"],
        moderator: "Mariana Romano",
        type: "panel"
      },
      {
        time: "17:40",
        title: "Panel V: Críticas a la criminología crítica",
        speakers: ["Marcelo Aebi"],
        moderator: "Mariana Romano",
        type: "highlight"
      },
      { time: "18:25", title: "Entrega de Distinciones y Cierre", type: "ceremony" }
    ]
  }
];