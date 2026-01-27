-- CreateTable
CREATE TABLE "estudiantes" (
    "numero_identificacion" TEXT NOT NULL,
    "tipo_identificacion" TEXT NOT NULL,
    "nombres" TEXT NOT NULL,
    "apellidos" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "celular" TEXT NOT NULL,
    "ciudad" TEXT NOT NULL,
    "estado" BOOLEAN NOT NULL DEFAULT true,
    "fecha_registro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "estudiantes_pkey" PRIMARY KEY ("numero_identificacion")
);

-- CreateIndex
CREATE UNIQUE INDEX "estudiantes_email_key" ON "estudiantes"("email");
