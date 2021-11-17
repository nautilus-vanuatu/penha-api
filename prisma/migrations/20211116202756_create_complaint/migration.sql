-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ATIVO', 'INATIVO', 'RESOLVIDO');

-- CreateEnum
CREATE TYPE "ComplaintType" AS ENUM ('ESGOTO', 'LIXO', 'SEGURANCA', 'VANDALISMO');

-- CreateTable
CREATE TABLE "Complaint" (
    "id" SERIAL NOT NULL,
    "type" "ComplaintType" NOT NULL DEFAULT E'ESGOTO',
    "latitude" TEXT NOT NULL,
    "longitude" TEXT NOT NULL,
    "desc" TEXT,
    "status" "Status" NOT NULL DEFAULT E'ATIVO',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Complaint_pkey" PRIMARY KEY ("id")
);
