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

## Contacto de Desarrollador
Este documento mantiene un registro de los cambios más recientes para facilitar el desarrollo continuo del proyecto del Simposio 2026.
