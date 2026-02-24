-- CreateTable
CREATE TABLE "Inscrito" (
    "id" TEXT NOT NULL,
    "dni" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "attended" BOOLEAN NOT NULL DEFAULT false,
    "hash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Inscrito_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Inscrito_dni_key" ON "Inscrito"("dni");

-- CreateIndex
CREATE UNIQUE INDEX "Inscrito_email_key" ON "Inscrito"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Inscrito_hash_key" ON "Inscrito"("hash");
