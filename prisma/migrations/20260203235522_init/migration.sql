-- CreateTable
CREATE TABLE "estudiantes" (
    "numero_identificacion" TEXT NOT NULL,
    "tipo_identificacion" TEXT NOT NULL,
    "nombres" TEXT NOT NULL,
    "apellidos" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "celular" TEXT,
    "ciudad" TEXT,
    "estado" BOOLEAN NOT NULL DEFAULT true,
    "fecha_registro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "estudiantes_pkey" PRIMARY KEY ("numero_identificacion")
);

-- CreateTable
CREATE TABLE "organizaciones" (
    "id_organizacion" TEXT NOT NULL,
    "nit" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "sector" TEXT,
    "descripcion" TEXT,
    "logo_url" TEXT,
    "ubicacion" TEXT,
    "estado" TEXT,
    "fecha_registro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "organizaciones_pkey" PRIMARY KEY ("id_organizacion")
);

-- CreateTable
CREATE TABLE "ofertas_laborales" (
    "id_oferta" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT,
    "requisitos" TEXT,
    "tipo_contrato" TEXT,
    "ubicacion" TEXT,
    "salario" DECIMAL(65,30),
    "fecha_publicacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_cierre" TIMESTAMP(3),
    "estado" TEXT,
    "id_organizacion" TEXT NOT NULL,

    CONSTRAINT "ofertas_laborales_pkey" PRIMARY KEY ("id_oferta")
);

-- CreateTable
CREATE TABLE "postulaciones" (
    "id_postulacion" SERIAL NOT NULL,
    "fecha_postulacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "estado" TEXT NOT NULL,
    "id_num" TEXT NOT NULL,
    "id_oferta" INTEGER NOT NULL,

    CONSTRAINT "postulaciones_pkey" PRIMARY KEY ("id_postulacion")
);

-- CreateTable
CREATE TABLE "EstudianteCarrera" (
    "numero_identificacion" TEXT NOT NULL,
    "id_carrera" INTEGER NOT NULL,
    "estado" VARCHAR(20) NOT NULL,
    "semestre_actual" INTEGER NOT NULL,
    "fecha_inicio" TIMESTAMP(3) NOT NULL,
    "fecha_fin" TIMESTAMP(3),

    CONSTRAINT "EstudianteCarrera_pkey" PRIMARY KEY ("numero_identificacion","id_carrera")
);

-- CreateTable
CREATE TABLE "carrera" (
    "id_carrera" SERIAL NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "nivel" VARCHAR(50) NOT NULL,
    "id_universidad" INTEGER NOT NULL,
    "estado" VARCHAR(20) NOT NULL,

    CONSTRAINT "carrera_pkey" PRIMARY KEY ("id_carrera")
);

-- CreateTable
CREATE TABLE "universidad" (
    "id_universidad" SERIAL NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "ciudad" VARCHAR(50) NOT NULL,
    "pais" VARCHAR(50) NOT NULL,
    "estado" VARCHAR(20) NOT NULL,

    CONSTRAINT "universidad_pkey" PRIMARY KEY ("id_universidad")
);

-- CreateIndex
CREATE UNIQUE INDEX "estudiantes_email_key" ON "estudiantes"("email");

-- CreateIndex
CREATE UNIQUE INDEX "organizaciones_nit_key" ON "organizaciones"("nit");

-- CreateIndex
CREATE UNIQUE INDEX "organizaciones_email_key" ON "organizaciones"("email");

-- CreateIndex
CREATE UNIQUE INDEX "postulaciones_id_num_id_oferta_key" ON "postulaciones"("id_num", "id_oferta");

-- AddForeignKey
ALTER TABLE "ofertas_laborales" ADD CONSTRAINT "ofertas_laborales_id_organizacion_fkey" FOREIGN KEY ("id_organizacion") REFERENCES "organizaciones"("id_organizacion") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "postulaciones" ADD CONSTRAINT "postulaciones_id_num_fkey" FOREIGN KEY ("id_num") REFERENCES "estudiantes"("numero_identificacion") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "postulaciones" ADD CONSTRAINT "postulaciones_id_oferta_fkey" FOREIGN KEY ("id_oferta") REFERENCES "ofertas_laborales"("id_oferta") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EstudianteCarrera" ADD CONSTRAINT "EstudianteCarrera_numero_identificacion_fkey" FOREIGN KEY ("numero_identificacion") REFERENCES "estudiantes"("numero_identificacion") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EstudianteCarrera" ADD CONSTRAINT "EstudianteCarrera_id_carrera_fkey" FOREIGN KEY ("id_carrera") REFERENCES "carrera"("id_carrera") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carrera" ADD CONSTRAINT "carrera_id_universidad_fkey" FOREIGN KEY ("id_universidad") REFERENCES "universidad"("id_universidad") ON DELETE RESTRICT ON UPDATE CASCADE;
