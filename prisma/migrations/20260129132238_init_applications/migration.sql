-- CreateTable
CREATE TABLE "organizaciones" (
    "id_organizacion" TEXT NOT NULL,
    "nit" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
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

-- CreateIndex
CREATE UNIQUE INDEX "organizaciones_nit_key" ON "organizaciones"("nit");

-- CreateIndex
CREATE UNIQUE INDEX "postulaciones_id_num_id_oferta_key" ON "postulaciones"("id_num", "id_oferta");

-- AddForeignKey
ALTER TABLE "ofertas_laborales" ADD CONSTRAINT "ofertas_laborales_id_organizacion_fkey" FOREIGN KEY ("id_organizacion") REFERENCES "organizaciones"("id_organizacion") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "postulaciones" ADD CONSTRAINT "postulaciones_id_num_fkey" FOREIGN KEY ("id_num") REFERENCES "estudiantes"("numero_identificacion") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "postulaciones" ADD CONSTRAINT "postulaciones_id_oferta_fkey" FOREIGN KEY ("id_oferta") REFERENCES "ofertas_laborales"("id_oferta") ON DELETE RESTRICT ON UPDATE CASCADE;
