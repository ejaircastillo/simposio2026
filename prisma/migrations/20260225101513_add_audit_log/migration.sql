-- CreateTable
CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL,
    "accion" TEXT NOT NULL,
    "inscritoId" TEXT NOT NULL,
    "inscritoNombre" TEXT NOT NULL,
    "detalle" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);
