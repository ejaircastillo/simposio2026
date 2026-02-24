-- AlterTable
ALTER TABLE "Inscrito" ADD COLUMN     "esAbogado" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "institucion" TEXT,
ADD COLUMN     "jurisdiccionMatricula" TEXT,
ADD COLUMN     "numeroMatricula" TEXT,
ADD COLUMN     "otraJurisdiccion" TEXT,
ADD COLUMN     "profesion" TEXT;
