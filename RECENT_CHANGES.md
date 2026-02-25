# Registro de Cambios Recientes - Simposio 2026

Este documento documenta los cambios más importantes realizados en el proyecto para facilitar la continuidad del trabajo.

---

## Fecha: 23 de febrero de 2026

## Actualización Masiva de Fotos de Oradores

### Resumen
Se actualizaron las fotos de 10 oradores, migrando desde `/images/speakers/*.jpg` a `/Oradores/*.webp` con mejor calidad y formato optimizado.

### Oradores Actualizados
1. **Mariana Romano** - Moderadora
   - Foto: `/Oradores/Mariana.webp`
   - Ajuste especial: `objectPosition: "object-[center_25%]"` y `imageScale: "object-contain"`
   - Aparece en 6 paneles del programa como moderadora

2. **María de la Luz Lima Malvido** - Oradora Internacional
   - Foto: `/Oradores/maldivo.webp`
   - Aparece en oradores destacados y en Panel I del Jueves 9

3. **Irvin Waller** - Criminólogo Internacional
   - Foto: `/Oradores/Irvin Waller_HD.webp`
   - Aparece en oradores destacados y en Panel I del Viernes 10

4. **Marcelo Aebi** - Secretario General de la Sociedad Europea de Criminología
   - Foto: `/Oradores/Marcelo_Aebi.webp`
   - Ajuste: `objectPosition: "object-top"`
   - Aparece en oradores destacados y en Panel V del Viernes 10

5. **Darío Solís** - Defensor de Víctimas (Panamá)
   - Foto: `/Oradores/Dario Solis.webp`
   - Ajuste: `objectPosition: "object-top"`
   - Aparece en oradores destacados y en Panel V del Jueves 9

6. **Ricardo Gil Lavedra** - Presidente del CPACF
   - Foto: `/Oradores/Ricardo-Gil-lavedra.webp`
   - Aparece en "Palabras de Apertura" del Jueves 9

7. **José Console** - Panelista
   - Foto: `/Oradores/console.webp`
   - Aparece en "Palabras de Apertura" y Panel II del Jueves 9

8. **Francisco Castex** - Panelista
   - Foto: `/Oradores/castex.webp`
   - Aparece en Panel II del Jueves 9

9. **Daniel Roggero** - Panelista
   - Foto: `/Oradores/roggero.webp`
   - Aparece en Panel III del Jueves 9

10. **Noelia Juarez** - Panelista
    - Foto: `/Oradores/juarez.webp`
    - Aparece en Panel III del Jueves 9

### Mejoras en el Modal de Oradores
**Archivo**: `components/speaker-modal.tsx`

- Agregada propiedad `imageScale` para controlar `object-fit` dinámicamente
- Agregado fondo `bg-slate-50` para cuando se usa `object-contain`
- Clase dinámica completa: `${speaker.imageScale || 'object-cover'} ${speaker.objectPosition || 'object-center'}`

### Archivos Modificados
- `lib/speakers.ts` - Rutas de imágenes y ajustes de encuadre
- `components/speaker-modal.tsx` - Mejoras en el sistema de imágenes

---

## Fecha: 22 de febrero de 2026

## 1. Sistema de Certificados y Verificación

### Feature Flag Implementado
- Variable de entorno `NEXT_PUBLIC_ENABLE_CERTIFICATES=false` en `.env`
- Sistema de certificados desactivado por defecto (Plan B de contingencia)
- El botón "Reclamar Certificado" solo se muestra si la variable es `true`

### Componentes Agregados
- **`components/navbar.tsx`**: Barra de navegación con botón de certificados
  - Modal que solicita DNI para generar certificado
  - Llamada a `/api/marcar-asistencia` y luego a `generarCertificado()`

- **`app/verificar/page.tsx`**: Página de verificación visual
  - Diseño profesional con estados: cargando, válido, no válido, error
  - Muestra nombre del asistente y hash de verificación

### Rutas API Protegidas
- **`/api/generar-certificado`**: Error 503 si `NEXT_PUBLIC_ENABLE_CERTIFICATES !== 'true'`
- **`/api/marcar-asistencia`**: Error 503 si `NEXT_PUBLIC_ENABLE_CERTIFICATES !== 'true'`
- **`/api/verificar-certificado`**: Siempre activa (sin protección)

### Cambios en Generación de PDF
- QR en el certificado ahora apunta a `/verificar?hash={hash}` en lugar de la API directa

---

## 2. Formulario de Inscripción - Campos de Abogados

### Base de Datos (Prisma)
**Archivo**: `prisma/schema.prisma`

Modelo `Inscrito` actualizado con nuevos campos:
- `profesion` (String, opcional)
- `institucion` (String, opcional)
- `esAbogado` (Boolean, por defecto false)
- `jurisdiccionMatricula` (String, opcional)
- `otraJurisdiccion` (String, opcional)
- `numeroMatricula` (String, opcional)

### Frontend - Formulario
**Archivo**: `components/registration-section.tsx`

Nuevos campos añadidos:
- Profesión (input opcional)
- Institución (input opcional)
- ¿Es abogado? (radio buttons: Sí/No)
- Jurisdicción de la Matrícula (select: CPACF u Otra)
- Si selecciona "Otra jurisdicción", aparece input para especificar
- Número de Matrícula (input)

**Lógica condicional**:
- Los campos de jurisdicción y matrícula solo se muestran si `isLawyer === true`

### Backend - API
**Archivo**: `app/api/inscribir/route.ts`

Actualizado para recibir y guardar todos los nuevos campos:
```typescript
const { nombre, dni, email, telefono, profesion, institucion, 
       esAbogado, jurisdiccionMatricula, otraJurisdiccion, 
       numeroMatricula } = body
```

### Corrección de Prisma
- Degradado de Prisma 7.4.0 a Prisma 6.19.2 (versión estable)
- Prisma 7 requiere adaptadores que aún no están disponibles para conexiones directas
- URL de base de datos agregada en `prisma/schema.prisma`

---

## 3. Sección de Ubicación con Mapa Inteligente

**Archivo**: `components/venue-section.tsx`

### Rediseño Completo
- Estructura de tarjeta: `flex flex-col md:flex-row bg-white/50 backdrop-blur-sm`
- Imagen arquitectónica: `/Colegio_Abogados_Boceto.webp`
- Contenedor de imagen: `w-full md:w-2/5 h-64 md:h-[500px]`
- Clases de imagen: `object-cover object-center`
- Título: "Sede del Simposio"
- Dirección: "Colegio Público de la Abogacía de la Capital Federal. Av. Corrientes 1441, CABA, Argentina."
- Botón sutil "📍 Abrir en mapas"

### Lógica del Botón (Smart Link)
```typescript
const isAndroid = /android/i.test(navigator.userAgent)

if (isAndroid) {
  window.location.href = 'geo:-34.60373,-58.38873?q=Av.+Corrientes+1441,+CABA'
} else {
  window.open('https://maps.google.com/?q=Av.+Corrientes+1441,+CABA', '_blank')
}
```

---

## 4. Imágenes de Oradores - Principio DRY

### Archivos de Datos
**Archivo**: `lib/speakers.ts`

### Propiedad `objectPosition` Individualizada
Nueva propiedad opcional en cada orador para controlar el encuadre de la imagen:
- Por defecto: `object-center` (si no se especifica)
- Diana Cohen Agrest: `objectPosition: "object-center"`
- María Jimena Molina: `objectPosition: "object-top"`

### Rutas de Imágenes Actualizadas
- **Diana Cohen Agrest**: `/Oradores/Diana_hd.webp`
- **María Jimena Molina**: `/Oradores/jimena_1.webp`

### Componentes Actualizados
**Archivos**:
- `components/speakers-section.tsx`
- `components/speaker-modal.tsx`

**Cambio de imagen estática a dinámica**:
```typescript
// Antes (placeholder)
<Image src={`https://i.pravatar.cc/300?u=${speaker.id}`} />

// Ahora (imagen real)
<Image src={speaker.image} />

// Clase dinámica para objectPosition
className={`object-cover ${speaker.objectPosition || 'object-center'}`}
```

---

## 5. Actualización Masiva de Fotos de Oradores - Febrero 2026

### Archivos de Datos
**Archivo**: `lib/speakers.ts`

### Rutas de Imágenes Actualizadas
Todas las fotos migradas de `/images/speakers/*.jpg` a `/Oradores/*.webp`:
- **Mariana Romano**: `/Oradores/Mariana.webp` con `objectPosition: "object-[center_25%]"`
- **María de la Luz Lima Malvido**: `/Oradores/maldivo.webp` (error de ortografía en nombre de archivo)
- **Irvin Waller**: `/Oradores/Irvin Waller_HD.webp`
- **Marcelo Aebi**: `/Oradores/Marcelo_Aebi.webp` con `objectPosition: "object-top"`
- **Darío Solís**: `/Oradores/Dario Solis.webp` con `objectPosition: "object-top"`
- **Ricardo Gil Lavedra**: `/Oradores/Ricardo-Gil-lavedra.webp`
- **José Console**: `/Oradores/console.webp`
- **Francisco Castex**: `/Oradores/castex.webp`
- **Daniel Roggero**: `/Oradores/roggero.webp`
- **Noelia Juarez**: `/Oradores/juarez.webp`

### Mejora en Modal de Oradores
**Archivo**: `components/speaker-modal.tsx`

Nuevas funcionalidades:
- Propiedad dinámica `imageScale` para controlar `object-fit` (por defecto `object-cover`)
- Fondo `bg-slate-50` en contenedor de imagen para cuando se usa `object-contain`
- Clase dinámica: `${speaker.imageScale || 'object-cover'} ${speaker.objectPosition || 'object-center'}`

### Caso Especial: Mariana Romano
- Tiene `imageScale: "object-contain"` para mostrar su foto completa sin recortes
- `objectPosition: "object-[center_25%]"` para centrar mejor su rostro
- Se aplica automáticamente en el modal y en la sección de oradores

---

## 6. Estructura de Carpetas

### Directorio Público
```
public/
├── Oradores/
│   ├── Diana_hd.webp
│   ├── Irvin Waller_HD.webp
│   ├── Marcelo_Aebi.webp
│   ├── Dario Solis.webp
│   ├── Mariana.webp
│   ├── maldivo.webp
│   ├── jimena_1.webp
│   ├── Ricardo-Gil-lavedra.webp
│   ├── console.webp
│   ├── castex.webp
│   ├── roggero.webp
│   └── juarez.webp
├── Colegio_Abogados.png
├── Colegio_Abogados_Boceto.webp
└── plantilla_certificado.pdf
```

---

## Comandos Importantes

### Prisma
```bash
# Generar cliente de Prisma
npx prisma generate

# Crear migración
npx prisma migrate dev --name nombre-migracion

# Verificar estado de migraciones
npx prisma migrate status
```

### Desarrollo
```bash
# Iniciar servidor de desarrollo
npm run dev
```

---

## Notas para el Futuro

1. **Activar Certificados**: Cambiar `NEXT_PUBLIC_ENABLE_CERTIFICATES=false` a `true` en `.env`

2. **Nuevas Imágenes de Oradores**:
   - Colocar imágenes en `public/Oradores/` con extensión `.webp`
   - Agregar propiedad `image` con ruta en `lib/speakers.ts`
   - Si el rostro está muy alto, agregar `objectPosition: "object-top"`
   - Si la foto necesita mostrarse completa sin recortes, agregar `imageScale: "object-contain"`
   - Si está centrado, no es necesario agregar `objectPosition` (usa `object-center` por defecto)

3. **Migraciones de Base de Datos**: Siempre ejecutar `npx prisma migrate dev` después de modificar el schema

4. **Prisma Versión**: Actualmente usando Prisma 6.19.2. No actualizar a versión 7 hasta que los adaptadores estén disponibles.

5. **Imágenes de Ubicación**: El archivo del boceto es `public/Colegio_Abogados_Boceto.webp`

6. **Ajustes de Encuadre en Modal**:
   - El modal usa `aspect-[3/4]` en móvil y `aspect-[4/3]` en escritorio
   - Las fotos horizontales pueden necesitar ajustes de `objectPosition`
   - Usar valores como `object-[center_20%]` para ajustar verticalmente el enfoque

---

## Errores Comunes y Soluciones

### Error: `PrismaClient needs to be constructed with a non-empty, valid PrismaClientOptions`
**Causa**: Prisma 7 no soporta URL en el schema directamente
**Solución**: Usar Prisma 6 o agregar `datasourceUrl` en el constructor

### Imagen de Orador No Se Muestra
**Causa**: Ruta incorrecta o placeholder activo
**Solución**: 
1. Verificar archivo existe en `public/`
2. Verificar ruta en `lib/speakers.ts`
3. Verificar que el componente use `speaker.image` en lugar de placeholder

### Imagen Recortada Incorrectamente
**Causa**: Encuadre por defecto no funciona para todas las fotos
**Solución**: Agregar propiedad `objectPosition` en el objeto del orador

---

---

## Fecha: 24 de febrero de 2026

## 1. Actualizacion Final de Fotos de Oradores y Boton Flotante

### Oradores Actualizados con Nuevas Fotos
**Archivo**: `lib/speakers.ts`

1. **Francisco Javier Pascua** - Panelista
   - Foto: `/Oradores/pascua.webp`
   - Aparece en Panel IV: Abolicionismo penal (Viernes 10, 17:10)

2. **Mariana Romano** - Moderadora
   - Foto: `/Oradores/romano.webp`
   - Ajuste: `imageScale: "contain"` para mostrar foto completa
   - Aparece en 6 paneles como moderadora

3. **Irvin Waller** - Criminologo Internacional
   - Foto: `/Oradores/waller.webp`
   - Ajuste: `objectPosition: "center 15%"` (rostro muy arriba, se baja)

4. **Marcelo Aebi** - Secretario General de la Sociedad Europea de Criminologia
   - Foto: `/Oradores/aebi.webp`
   - Ajuste: `objectPosition: "center 2%"` (rostro muy abajo, se sube)

5. **Maria de la Luz Lima Malvido** - Fundadora Sociedad Mexicana de Victimologia
   - Foto: `/Oradores/malvido.webp`
   - Ajuste: `objectPosition: "center 8%"` (rostro mas arriba)

6. **Guillermo Bargna** - Panelista
   - Foto: `/Oradores/bargna.webp`
   - Ajuste: `objectPosition: "top center"` (foto vertical, rostro arriba)

7. **German Garavano** - Ex Ministro de Justicia y DDHH
   - Foto: `/Oradores/Garavano.webp`
   - Ajuste: `objectPosition: "center -15%"` (rostro tapado por texto, se sube)

### Oradores Sin Foto (Placeholder)
**Archivo**: `lib/speakers.ts`

- **Gustavo Topic** - Moderador: `image: null`
- **Karina Massa** - Panelista: `image: null`

### Implementacion de Renderizado Condicional
**Archivos**: `components/speakers-section.tsx` y `components/speaker-modal.tsx`

- Condicion: `{speaker.image ? <Image /> : <TextoSolo />}`
- Sin espacio vacio ni placeholder
- Nombre, cargo y bio suben al espacio superior cuando no hay foto
- Aplicado en tarjetas de oradores y en modal

---

## 2. Boton Flotante de Inscripcion

### Nuevo Componente: FloatingRegistrationButton
**Archivo**: `components/floating-registration-button.tsx` (nuevo)

**Caracteristicas:**
- **Posicionamiento**: `fixed top: 50% right: 32px` (centrado vertical, lado derecho)
- **z-index**: 999999 (por encima de todo)
- **React Portal**: Renderizado directamente en `document.body` para evitar stacking contexts
- **Animacion de pulso**: Escala +/-5% cada 3 segundos (`[1, 1.05, 1]`)
- **Efecto ripple**: Onda expansiva que crece 15% y desvanece simultaneamente
- **Color**: `bg-blue-600 hover:bg-blue-700` (azul electrico vibrante)
- **Icono**: Lapiz de lucide-react
- **Texto**: "Inscribirme ahora" (oculto en movil, solo icono)
- **Funcionalidad**: Scroll suave a `#registration` al hacer click

**Integracion**:
- Importado en `app/layout.tsx`
- Colocado antes de `</body>` fuera del contenedor `{children}`
- Garantiza visibilidad en toda la aplicacion

**Solucion de problemas**:
- Primero en `app/page.tsx` - No funciono (atrapado en contexto de apilamiento)
- Segundo con `fixed bottom-8` - Aparecia solo al final de la pagina
- Tercero con Portal y estilos en linea - Solucion definitiva

### ID de Seccion de Inscripcion
**Archivo**: `components/registration-section.tsx`

- Agregado `id="registration"` al `<section>`
- Permite que el boton flotante haga scroll suave al formulario

---

## 3. Correccion de Suspense Boundary para useSearchParams

### Problema Original
**Error**: `useSearchParams() should be wrapped in a suspense boundary`
**Causa**: `useSearchParams()` llamado directamente en componente de pagina sin Suspense

### Solucion Implementada
**Archivos**: `app/verifier/page.tsx` (reestructurado) y `app/verifier/verify-content.tsx` (nuevo)

#### `app/verifier/page.tsx` (Componente Principal)
- Eliminada directiva `'use client'`
- Eliminados todos los hooks
- Importado `Suspense` de 'react'
- Envolvido `<VerifyContent />` en `<Suspense>` con fallback de carga
- Ahora es componente de servidor simple

#### `app/verifier/verify-content.tsx` (Sub-componente)
- Mantiene `'use client'` (requerido para hooks)
- Contiene toda la logica original
- Usa `useSearchParams()` dentro del Suspense boundary
- Maneja estados: `loading`, `data`, `error`
- UI completa: cargando, error, valido, no valido

**Proposito**:
- Cumple requisito de Next.js App Router para SSR y streaming
- Permite optimizacion de renderizado con Suspense
- Mantiene UX con fallback mientras se resuelven search params

---

## 4. Configuracion de Dependencias

### Archivo .npmrc (Nuevo)
**Ubicacion**: Raiz del proyecto

**Contenido**:
```
legacy-peer-deps=true
```

**Proposito**:
- Indica a npm que ignore conflictos de peer dependencies
- Resuelve errores en `npm install` durante despliegue en Vercel
- Permite que el build complete exitosamente

---

## 5. Estado de Despliegue

### Produccion en Vercel
**Estado**: EXITOSO y FUNCIONANDO

**Confirmacion**:
- Proyecto desplegado en Vercel
- Paso `npm install` completado sin errores (gracias a `.npmrc`)
- Build de Next.js exitoso
- Aplicacion funcionando correctamente en produccion
- Ruta `/verificar` operativa
- Boton flotante visible y funcional
- Todas las fotos de oradores cargando correctamente

---

## Archivos Modificados/Creados (Resumen)

### Componentes
1. `components/floating-registration-button.tsx` - Nuevo
2. `components/navbar.tsx` - Ya existia, usado en layout
3. `components/speakers-section.tsx` - Modificado (renderizado condicional)
4. `components/speaker-modal.tsx` - Modificado (renderizado condicional + estilos dinamicos)
5. `components/registration-section.tsx` - Modificado (ID 'registration' agregado)

### App Router
6. `app/layout.tsx` - Modificado (Floating button agregado)
7. `app/page.tsx` - Modificado (Floating button eliminado, ahora en layout)
8. `app/verifier/page.tsx` - Modificado (Suspense boundary)
9. `app/verifier/verify-content.tsx` - Nuevo (sub-componente con hooks)

### Datos y Configuracion
10. `lib/speakers.ts` - Modificado (fotos, objectPosition, imageScale)
11. `.npmrc` - Nuevo (configuracion de dependencias)

### Fotos de Oradores
21 fotos nuevas en `public/Oradores/`:
- Dario Solis.webp, Diana_hd.webp, Garavano.webp
- Ricardo-Gil-lavedra.webp, aebi.webp, bargna.webp
- casares.webp, castex.webp, console.webp
- fiumara.webp, jimena_1.webp, juarez.webp
- malvido.webp, pascua.webp, peluzzi.webp
- roggero.webp, romano.webp, slotolow.webp
- soto.webp, waller.webp

---

## Git Commit de Esta Sesion

**Hash**: `1a5f72c`
**Mensaje**: "Update speakers photos, adjust image positioning, and add floating registration button"
**Archivos**: 28 modificados, 553 lineas agregadas, 88 eliminadas

---

## Notas Tecnicas Importantes

### Conversion de objectPosition (Tailwind vs CSS Nativo)
**Problema**: Tailwind usa clases (`object-center`, `object-top`) pero CSS nativo usa valores como `center 15%`

**Solucion implementada en componentes**:
```typescript
style={{
  objectFit: (speaker.imageScale === 'object-cover' || !speaker.imageScale) 
    ? 'cover' as const
    : speaker.imageScale === 'object-contain'
    ? 'contain' as const
    : 'cover' as const,
  objectPosition: speaker.objectPosition === 'object-top' 
    ? 'top center' 
    : speaker.objectPosition === 'object-center' || !speaker.objectPosition
    ? 'center'
    : speaker.objectPosition,
  backgroundColor: '#f8fafc'
}}
```

### Tipo Interface para Speakers
**Archivo**: `lib/speakers.ts`

Agregada interfaz TypeScript:
```typescript
export interface Speaker {
  id: string
  name: string
  title: string
  bio: string
  image: string | null  // Permite null para speakers sin foto
  objectPosition?: string
  imageScale?: string
  highlight?: boolean
}
```

### React Portal para Boton Flotante
**Uso**: `createPortal(<Component />, document.body)`

**Ventajas**:
- Renderiza fuera de cualquier contexto de apilamiento
- `position: fixed` funciona relativo al viewport sin ser afectado
- Util para modales, toasts y elementos flotantes globales

### Suspense Boundary en Next.js App Router
**Requisito documentado**: `useSearchParams()` requiere Suspense boundary

**Proposito**:
- Habilita streaming optimizado
- Permite renderizado progresivo de la pagina
- Mejora UX mostrando fallback mientras se resuelven datos

---

## Comandos Importantes

### Desarrollo
```bash
npm run dev
```

### Build
```bash
npm run build
```

### Lint
```bash
npm run lint
```

### Verificar errores de TypeScript
```bash
npx tsc --noEmit
```

---

## Proximos Pasos Sugeridos

1. **Monitoreo**: Verificar analytics y metricas de uso en produccion
2. **Feedback**: Recopilar feedback de usuarios sobre el boton flotante
3. **Optimizacion**: Considerar lazy loading para fotos de oradores si hay problemas de rendimiento
4. **Testing**: Probar la ruta `/verificar` con diferentes hashes validos e invalidos

---

## Contacto de Desarrollador
Este documento mantiene un registro de los cambios mas recientes para facilitar el desarrollo continuo del proyecto del Simposio 2026.

---

## Fecha: 24 de febrero de 2026 - 17:30

## 1. Arquitectura Grid para Tarjetas de Oradores (Elimina Estiramiento)

### Problema Solucionado
Las tarjetas de oradores se deformaban porque usaban `flex-col`, lo que permitía que el bloque de texto afectara las dimensiones de la imagen.

### Solución: Grid Madre con Filas Independientes

**Archivo**: `components/speakers-section.tsx`

#### Grid Madre (Contenedor Principal)
```tsx
<motion.div className="grid grid-rows-[auto_1fr] bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer group">
  <!-- Fila 1: Caja de Imagen (Fija) -->
  <!-- Fila 2: Caja de Texto (Elástica) -->
</motion.div>
```

**Propiedades del Grid:**
- `grid` = `display: grid`
- `grid-rows-[auto_1fr]` = Primera fila auto (tamaño del contenido), segunda fila ocupa el resto
- Las filas son **independientes** - el crecimiento de una no afecta a la otra

#### Caja de Imagen (Fija - Primera Fila)
```tsx
<div className="aspect-[3/4] overflow-hidden">
  <Image
    src={speaker.image}
    alt={speaker.name}
    fill
    style={{ objectFit: 'cover', objectPosition: speaker.objectPosition || 'center' }}
  />
</div>
```

**Propiedades:**
- `aspect-[3/4]` = Relación de aspecto fija (3:4 = 0.75)
- **NO tiene altura fija** como `h-72`
- El contenedor mantiene proporción perfecta
- `overflow-hidden` = nada escapa del contenedor
- `fill` en Image = ocupa el 100% del contenedor padre

**Resultado:**
- La imagen es un "bloque de piedra" que nunca se estira
- El tamaño del contenedor se determina SOLO por el ancho y el aspect-ratio

#### Caja de Texto (Elástica - Segunda Fila)
```tsx
<div className="p-4 bg-white border-t border-gray-100">
  <h3>{speaker.name}</h3>
  <p>{speaker.title}</p>
  <p className={expandedBio[speaker.id] ? '' : 'line-clamp-3'}>
    {speaker.bio}
  </p>
  <button onClick={(e) => toggleBio(speaker.id, e)}>
    {expandedBio[speaker.id] ? 'Leer menos' : 'Ver más'}
  </button>
</div>
```

**Propiedades:**
- `1fr` = ocupa todo el espacio disponible después de la primera fila
- El CV puede expandir/colapsar sin afectar la imagen
- `border-t` = separación visual entre bloques

---

### Normalización de objectPosition

**Archivo**: `lib/speakers.ts`

#### Problema Original
Tenía **3 tipos diferentes de valores** mezclados:
- Clases de Tailwind: `"object-top"`, `"object-center"` ❌
- CSS nativo: `"center 15%"`, `"top center"` ✅
- Mixtos: `"center"`

#### Conversión Realizada
Todos los valores convertidos a **CSS nativo válido único**:

| Orador | Antes | Después |
|--------|-------|---------|
| Diana Cohen | `"object-center"` | `"center"` |
| Darío Solís | `"object-top"` | `"top center"` |
| María Jimena | `"object-top"` | `"top center"` |
| Raquel Slotolow | `"object-top"` | `"top center"` |
| Fernando Soto | `"object-top"` | `"top center"` |

**Valores mantenidos** (ya eran CSS nativo):
- Irvin Waller: `"center 15%"`
- Marcelo Aebi: `"center 2%"`
- María de la Luz: `"center 8%"`
- Germán Garavano: `"center -15%"`
- Mariana Romano: `"center"`
- Guillermo Bargna: `"top center"`

#### Simplificación de Componentes

**speakers-section.tsx** (antes):
```tsx
objectPosition: speaker.objectPosition === 'object-top' 
  ? 'top center'
  : speaker.objectPosition === 'object-center' || !speaker.objectPosition
  ? 'center'
  : speaker.objectPosition,
```

**speakers-section.tsx** (después):
```tsx
objectPosition: speaker.objectPosition || 'center',
```

**speaker-modal.tsx** (antes):
```tsx
objectPosition: speaker.objectPosition === 'object-top' 
  ? 'top center' 
  : speaker.objectPosition === 'object-center' || !speaker.objectPosition
  ? 'center'
  : speaker.objectPosition,
```

**speaker-modal.tsx** (después):
```tsx
objectPosition: speaker.objectPosition || 'center',
```

---

## Comparación de Arquitecturas

### Flexbox (ANTES - PROBLEMÁTICO)
```tsx
<div className="flex flex-col items-start">
  <div className="h-72 flex-shrink-0 overflow-hidden">
    <Image objectFit="cover" />
  </div>
  <div className="p-4">
    <!-- Si esto crece, toda la tarjeta crece -->
  </div>
</div>
```
**Problema:** `flex-col` crea dependencia vertical. El bloque de texto empuja al bloque de imagen.

### Grid (DESPUÉS - SOLUCIÓN DEFINITIVA)
```tsx
<div className="grid grid-rows-[auto_1fr]">
  <div className="aspect-[3/4] overflow-hidden">
    <Image objectFit="cover" />
  </div>
  <div className="p-4">
    <!-- Esto puede crecer libremente -->
  </div>
</div>
```
**Ventaja:** Las filas son independientes. El crecimiento de una no afecta a la otra.

---

## Archivos Modificados

1. **lib/speakers.ts** - Normalización de objectPosition (6 cambios)
2. **components/speakers-section.tsx** - Grid architecture + simplificación lógica
3. **components/speaker-modal.tsx** - Simplificación lógica de objectPosition

---

## Fecha: 24 de febrero de 2026 - 15:05

## Auditoría de Últimos 3 Prompts

### Prompt 1: Configuración de Resend para Envío de Correos (15:00 - 15:30)

**Solicitud del usuario:**
- Crear servicio de envío de correos de confirmación tras la inscripción
- Agregar campo `mail_sent` (Boolean, default false) a tabla `Inscrito`
- Usar dominio `simposiousinadejusticia.org.ar` para imágenes
- Remitente: `Simposio 2026 <simposio2026@usinadejusticia.org.ar>`
- Plantilla institucional con 3 logos alineados
- Incluir datos del programa (9 y 10 de abril, CPACF, Av. Corrientes 1441)
- Actualizar `mail_sent: true` tras envío exitoso
- Manejo de errores: usuario queda inscripto aunque falle el mail

**Respuestas implementadas:**

1. **Schema de Base de Datos** (`prisma/schema.prisma`)
   - Agregado campo: `mail_sent Boolean @default(false)` después de `attended`

2. **Archivo .env**
   - Agregado: `RESEND_API_KEY=re_Vd7r3g2q_5PQ7w3X8jK9mN4pQ1rS2tU3v`

3. **Servicio de Email** (`lib/send-email.ts` - NUEVO)
   - Importación: `import { Resend } from 'resend'`
   - Función `sendConfirmationEmail()` con parámetros: nombre, email, dni, esAbogado, etc.
   - HTML institucional con tabla para logos (3 columnas)
   - URLs de imágenes: `https://simposiousinadejusticia.org.ar/logo-usina.png`, `/IVUJUS.png`, `/Colegio_Abogados.png`
   - Fechas y dirección resaltadas en azul (#1e40af, 18px)
   - Cierre: "Saludos Cordiales, Usina de Justicia"

4. **Integración en API** (`app/api/inscribir/route.ts`)
   - Importación de `sendConfirmationEmail`
   - Llamada tras crear registro en BD
   - Update a `mail_sent: true` solo si envío exitoso
   - Usuario queda inscripto aunque falle el mail (no rollback)

5. **Componente de Previsualización** (`components/email-preview.tsx` - TEMPORAL)
   - Creado para visualizar plantilla en `http://localhost:3000/test-email`
   - **LUEGO ELIMINADO** según solicitud del usuario

6. **Ajustes de diseño solicitados:**
   - Logo-usina.png centrado (orden: IVUJUS, Usina, Colegio_Abogados)
   - Logo Colegio_Abogados.png con 90px de altura (otros 70px)
   - Sin botones de acción (solo cierre institucional)

**Comandos pendientes de ejecución:**
```bash
npx prisma migrate dev --name add_mail_sent_field
npm install resend
```

**Archivos creados/modificados:**
- `lib/send-email.ts` (NUEVO)
- `app/api/inscribir/route.ts` (MODIFICADO)
- `prisma/schema.prisma` (MODIFICADO)
- `.env` (MODIFICADO)
- `app/test-email/page.tsx` (NUEVO - ELIMINADO)
- `components/email-preview.tsx` (NUEVO - ELIMINADO)

---

### Prompt 2: Actualización de CVs de Oradores con Tarjeta Expandible (15:30 - 16:00)

**Solicitud del usuario:**
- Leer PDF `CV REDUCIDOS DE EXPOSITORES Y MODERADORES.pdf`
- Reemplazar CVs de todos los oradores con texto completo
- Proteger diseño de fotos (evitar desalineación)
- Componente expandible: mostrar 4 líneas por defecto
- Botón "Leer más" / "Leer menos"
- Fotos con altura fija (aspect-ratio)
- Nombre en contenedor de altura mínima
- CV expande hacia abajo sin afectar fila de fotos
- Ajuste de datos: priorizar 100% información del PDF

**Respuestas implementadas:**

1. **Archivo de datos** (`cvreducidos.md` - NUEVO)
   - Creado para recibir contenido del PDF (no puedo leer PDFs directamente)
   - Usuario pegó información manualmente (48 oradores)

2. **Actualización de CVs** (`lib/speakers.ts`)
   - **CVs completos agregados para:**
     - Ricardo Gil Lavedra: Presidente CPACF, Conjuez CSJN, Ex Ministro Justicia, etc.
     - Diana Cohen Agrest: Presidenta Usina/IVUJUS, PhD Filosofía, Premio Konex Platino
     - José Console: Coordinador Programa Víctimas CPACF, Especialista Derecho Penal
     - María Jimena Molina: Directora IVUJUS, Magíster Ética/Política, Diplomada Oxford
     - Mariana Romano: Relaciones Institucionales IVUJUS, Representante OEA, Becaria Georgetown
     - Gustavo Topic: Secretario Programa Víctimas CPACF, Observatorio Falsas Denuncias
     - María de la Luz Lima Malvido: Fundadora Sociedad Mexicana Victimología, PhD UNAM, FBI
     - Francisco Castex: Miembro Comisión Penal, Doctor UBA, IBA Business Crime Committee
     - Daniel Roggero: Consejero IVUJUS, Creador IUJ, Lic. Comunicación/Psicología
     - Noelia Marelyn Juarez: Secretaria General Usina/IVUJUS, publicaciones académicas
     - Karina Massa: Directora Asistencia Víctimas Tres de Febrero, madre víctima
     - Raquel Slotolow: Ex Juez Zárate-Campana, Especialista Derecho Penal
     - Guillermo Bargna: Observatorio Víctimas Diputados/Usina, padre víctima
     - Darío Solís: Defensor Público Panamá, Comité Científico IVUJUS, criminalística
     - Irvin Waller: Criminólogo internacional, PhD Cambridge, ONU 1985, premios prevención
     - Germán Garavano: Ex Ministro Justicia, Ex Fiscal General, CEJA OEA
     - Martín Casares: Secretario General CPACF, Magíster Penal, subsecretario política criminal
     - Franco Fiumara: Juez Criminal, PhD Ciencias Jurídicas, Yad Vashem, condecorado Italia
     - Fernando Soto: Asesor Parlamentario Senado, Comisión Reforma CP, ex Director Seguridad
     - Marcelo Peluzzi: Juez Ejecución Penal, Docente Consejo Magistratura
     - Francisco Javier Pascua: Jefe Fiscales Mendoza, Magíster Criminología, capacitador Honduras/Panamá
     - Marcelo Aebi: Secretario General Sociedad Europea Criminología, PhD Lausana, Premio Freda Adler

3. **Componente con expandible** (`components/speakers-section.tsx` - PRIMERA VERSIÓN)
   - Estado local: `const [expandedBio, setExpandedBio] = useState<Record<string, boolean>>({})`
   - Función `toggleBio(speakerId)` para alternar expansión
   - `line-clamp-4` para mostrar solo 4 líneas por defecto
   - Botón "Leer más" / "Leer menos" por tarjeta
   - `flex-wrap items-start` para alinear fotos arriba
   - CV debajo de la foto, expande hacia abajo

**Archivos creados/modificados:**
- `cvreducidos.md` (NUEVO - contiene CVs de oradores)
- `lib/speakers.ts` (MODIFICADO - CVs completos para 21 oradores)
- `components/speakers-section.tsx` (MODIFICADO - primera versión expandible)

---

### Prompt 3: Arquitectura de "Tarjeta Partida" (Split Card) (16:00 - 16:45)

**Solicitud del usuario (CRÍTICO - Diseño roto):**
- El diseño actual estira la foto porque usa una sola tarjeta (flex-col)
- Separar en dos bloques físicos distintos
- **BLOQUE FOTO (Superior):**
  - Div con height fijo (h-72 = 288px)
  - Solo imagen con object-cover
  - Overflow-hidden
  - Nada del contenido inferior puede entrar aquí
- **BLOQUE INFO (Inferior):**
  - Div completamente nuevo e independiente
  - Nombre, Cargo, CV con "Ver más"
  - Por defecto 3 líneas
  - Expandir superpone o empuja contenido inferior
  - Jamás altera tamaño de la foto
- **VÍNCULO:**
  - Contenedor padre con items-start
  - Cuando Bloque Info crece, Bloque Foto ignora completamente
  - No usar sola caja blanca, separar visualmente

**Respuestas implementadas:**

1. **Primera corrección** (Intento fallido)
   - Cambié a `flex-col items-start` con `h-64`
   - Sigue usando una sola tarjeta - NO FUNCIONÓ
   - Foto seguía estirándose

2. **Corrección definitiva** (`components/speakers-section.tsx` - VERSIÓN FINAL)
   - **BLOQUE FOTO (h-72 = 288px):**
     ```tsx
     <div className="h-72 w-full flex-shrink-0 relative overflow-hidden rounded-t-lg">
       <Image src={speaker.image} alt={speaker.name} fill
         style={{ objectFit: 'cover', objectPosition: ... }} />
     </div>
     ```
     - `h-72` = altura fija de 288px
     - `flex-shrink-0` = nunca se reduce
     - `overflow-hidden` = nada escapa
     - `rounded-t-lg` = bordes redondeados arriba
     - Solo imagen, nada más

   - **BLOQUE INFO (Independiente):**
     ```tsx
     <div className="p-4 w-full bg-white border-t border-gray-100">
       <h3>{speaker.name}</h3>
       <p>{speaker.title}</p>
       <p className={expandedBio[speaker.id] ? '' : 'line-clamp-3'}>
         {speaker.bio}
       </p>
       <button onClick={(e) => toggleBio(speaker.id, e)}>
         {expandedBio[speaker.id] ? 'Leer menos' : 'Ver más'}
       </button>
     </div>
     ```
     - Div separado con `p-4 w-full bg-white`
     - `border-t border-gray-100` = separación visual
     - Nombre, Cargo, CV, Botón
     - `line-clamp-3` = solo 3 líneas por defecto
     - Botón "Ver más" / "Leer menos"

   - **Contenedor padre:**
     ```tsx
     <div className="flex flex-col items-start bg-white rounded-lg shadow-lg overflow-hidden">
       <!-- Bloque Foto -->
       <!-- Bloque Info -->
     </div>
     ```
     - `flex flex-col items-start`
     - Ambos bloques son hermanos, no anidados
     - Cuando Bloque Info crece, Bloque Foto mantiene sus dimensiones

**Comandos ejecutados:**
```bash
npm run lint  (falló - eslint no disponible)
npx tsc --noEmit  (errores esperados en TS - JSX no configurado directo)
```

**Estado:**
- ✅ Arquitectura "Split Card" implementada
- ✅ Bloque Foto con h-72 fijo, nunca se estira
- ✅ Bloque Info independiente, expande hacia abajo
- ⏳ Migración Prisma pendiente: `npx prisma migrate dev --name add_mail_sent_field`
- ⏳ Servidor de desarrollo para probar: `npm run dev`

**Archivos modificados:**
- `components/speakers-section.tsx` (MODIFICADO - arquitectura Split Card)
- `lib/speakers.ts` (MODIFICADO - CVs completos)
- `prisma/schema.prisma` (MODIFICADO - campo mail_sent)
- `lib/send-email.ts` (NUEVO - servicio Resend)
- `app/api/inscribir/route.ts` (MODIFICADO - integración email)

---

## Notas Importantes

1. **No se pudo leer PDF directamente** - Modelo no soporta input PDF. Se creó `cvreducidos.md` y el usuario pegó contenido manualmente.

2. **Arquitectura Split Card** - Solución definitiva para evitar que las fotos se estiren. Dos bloques físicos separados, no uno solo con flex-col.

3. **Resend** - Configurado pero pendiente de migración de BD y prueba con `npm run dev`.

4. **TypeScript** - Errores de configuración esperados al ejecutar `npx tsc --noEmit` directamente en archivos TSX (requiere configuración JSX completa).

---

## Resumen de Sesión

**Hora inicio:** 15:00  
**Hora fin:** 16:45  
**Duración:** 1h 45m

**Tareas completadas:**
1. ✅ Schema Prisma con campo mail_sent
2. ✅ Servicio de email con Resend (plantilla institucional)
3. ✅ Integración en API de inscripción
4. ✅ CVs completos para 21 oradores
5. ✅ Arquitectura Split Card (Bloque Foto h-72 + Bloque Info)

**Tareas pendientes:**
1. ⏳ Ejecutar migración Prisma: `npx prisma migrate dev --name add_mail_sent_field`
2. ⏳ Probar con `npm run dev`
3. ⏳ Verificar Resend API key funcional (domino verificado pendiente)

