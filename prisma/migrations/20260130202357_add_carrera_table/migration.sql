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

-- AddForeignKey
ALTER TABLE "EstudianteCarrera" ADD CONSTRAINT "EstudianteCarrera_numero_identificacion_fkey" FOREIGN KEY ("numero_identificacion") REFERENCES "estudiantes"("numero_identificacion") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EstudianteCarrera" ADD CONSTRAINT "EstudianteCarrera_id_carrera_fkey" FOREIGN KEY ("id_carrera") REFERENCES "carrera"("id_carrera") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carrera" ADD CONSTRAINT "carrera_id_universidad_fkey" FOREIGN KEY ("id_universidad") REFERENCES "universidad"("id_universidad") ON DELETE RESTRICT ON UPDATE CASCADE;
