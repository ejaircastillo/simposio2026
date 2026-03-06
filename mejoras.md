# Mejoras pendientes: Schedule vs. Programa oficial

Análisis comparativo entre `lib/schedule.ts` (web actual) y `programa_simposio.md` (programa oficial).

---

## JUEVES 9 — Diferencias

| # | Detalle | Programa oficial | Web actual |
|---|---|---|---|
| 1 | Acreditaciones | **14:30 hs** | **14:45 hs** ❌ |
| 2 | Panel I título | "Políticas públicas en la atención **y en la asistencia** a las víctimas" | "Políticas públicas en la atención a víctimas" ❌ |
| 3 | Panel II título | "La víctima y **el derecho penal**" | "La víctima y **el nuevo proceso penal**" ❌ |
| 4 | Panel III título | "**La víctima y la ciencia**" | "Una mirada científica del derecho y de la victimología" ❌ |
| 5 | Coffee Break | **17:05 hs** — Coffee Break (10 min) | No existe ❌ |
| 6 | Panel V horario | **17:45 hs** | **18:00 hs** ❌ |
| 7 | Distinciones Jueves | **18:30 hs** — Entrega de distinciones (Hilda Marchiori, Lima Malvido, Yanina Kogan, Console) | No existe ❌ |
| 8 | Cierre de jornada | **19:00 hs** | No existe ❌ |

---

## VIERNES 10 — Diferencias

| # | Detalle | Programa oficial | Web actual |
|---|---|---|---|
| 9 | Acreditaciones Viernes | **14:30 hs** | No existe ❌ |
| 10 | Palabras de apertura Viernes | **14:50 hs** — Francisco Quintana | No existe ❌ |
| 11 | Panel II título | "La víctima, el Ministerio Público y la política criminal" | "Ministerio Público y política criminal" ❌ |
| 12 | Panel III título | "El juicio en ausencia **y la imprescriptibilidad de los delitos contra la vida**" | "Juicio en ausencia, imprescriptibilidad **y ejecución**" ❌ |
| 13 | Panel IV Viernes | **16:45 hs** — "La víctima en la etapa de ejecución" — Marcelo Peluzzi (panel propio) | Peluzzi mezclado dentro del Panel III ❌ |
| 14 | Coffee Break Viernes | **17:00 hs** | No existe ❌ |
| 15 | Panel Abolicionismo título | "Abolicionismo penal. **En contra del dogma imperante**" | "Abolicionismo penal" ❌ |
| 16 | Cierre Viernes | **18:25 hs** — "Lectura y firma de la Declaración de Buenos Aires, entrega de distinciones" (Waller, Aebi) | Solo "Entrega de Distinciones y Cierre" ❌ |
| 17 | Cierre de jornada Viernes | **19:00 hs** | No existe ❌ |

---

## Impacto en oradores

### Sin impacto — horario correcto ✅
- Irvin Waller → 15:00 Viernes
- Marcelo Aebi → 17:40 Viernes
- María de la Luz Lima Malvido → 15:20 Jueves
- Francisco Castex + José Console → 16:05 Jueves
- Daniel Roggero + Noelia Juarez → 16:35 Jueves
- Raquel Slotolow + Guillermo Bargna → 17:15 Jueves
- Germán Garavano + Martín Casares → 15:45 Viernes
- Francisco Javier Pascua + María Jimena Molina → 17:10 Viernes
- Mariana Romano (moderadora)
- Gustavo Topic (moderador)

### Con impacto ⚠️
| Orador | Problema |
|---|---|
| **Darío Solís** | Panel aparece a las 18:00 en la web, debería ser **17:45** |
| **Franco Fiumara + Fernando Soto** | Panel III Viernes: título incorrecto y Fiumara mezclado con Peluzzi |
| **Marcelo Peluzzi** | Actualmente en el mismo panel que Fiumara y Soto. Necesita **panel propio a las 16:45** — "La víctima en la etapa de ejecución" |

### Personas nuevas — no están en la web ❌
| Persona | Contexto | En speakers.ts |
|---|---|---|
| **Francisco Quintana** | Palabras de Apertura Viernes 14:50 | No |
| **Hilda Marchiori** | Distinciones Jueves 18:30 | No |
| **Yanina Kogan** | Distinciones Jueves 18:30 (en representación de Fundación Taeda) | No |

> **Pendiente de consulta con el equipo:** ¿Agregar a Quintana, Marchiori y Kogan como oradores en `speakers.ts` o solo mencionarlos en el schedule?

---

## Archivos a modificar

- `lib/schedule.ts` → Todos los cambios de horarios, títulos y estructura
- `lib/speakers.ts` → Posibles altas de Quintana, Marchiori, Kogan (pendiente decisión)
- `public/Oradores/` → Imágenes de los nuevos oradores si se agregan
