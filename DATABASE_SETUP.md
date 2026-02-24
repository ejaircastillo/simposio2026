# Configuración de Base de Datos (Prisma + Neon)

## 1. Configurar Neon PostgreSQL

1. Ve a [neon.tech](https://neon.tech) y crea una cuenta gratuita
2. Crea un nuevo proyecto PostgreSQL
3. Copia la cadena de conexión

## 2. Configurar Variable de Entorno

En el archivo `.env`, reemplaza `DATABASE_URL` con tu URL de Neon:

```
DATABASE_URL="postgresql://user:password@ep-neon-host.aws.neon.tech/neondb?sslmode=require"
```

## 3. Generar Cliente de Prisma

```bash
npm run prisma:generate
```

## 4. Ejecutar Migraciones

```bash
npm run prisma:migrate
```

Esto creará la tabla `Inscrito` con los campos:
- `id` (UUID, primary key)
- `dni` (string, unique)
- `nombre` (string)
- `email` (string, unique)
- `attended` (boolean, default false)
- `hash` (string, unique)
- `createdAt` (datetime)
- `updatedAt` (datetime)

## 5. (Opcional) Abrir Prisma Studio

```bash
npm run prisma:studio
```

## API Routes Disponibles

- `GET /api/grid-prueba` - Genera un PDF con cuadrícula para encontrar coordenadas
- `POST /api/generar-certificado` - Genera certificado con el nombre proporcionado

## Certificados

Para generar certificados desde el frontend:

```typescript
import { generarCertificado, generarGrid } from '@/lib/certificado'

// Generar grid de prueba
await generarGrid()

// Generar certificado
await generarCertificado('Juan Pérez')
```

⚠️ **Importante**: Coloca el archivo `plantilla_certificado.pdf` en la carpeta `public/` antes de usar las funciones de generación de certificados.
