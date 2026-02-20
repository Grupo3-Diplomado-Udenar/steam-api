import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Seeding database...');

    // Limpiar datos existentes (opcional, pero útil para evitar duplicados en desarrollo)
    // await prisma.estudianteCarrera.deleteMany();
    // await prisma.carrera.deleteMany();
    // await prisma.universidad.deleteMany();

    // Como no tengo deleteMany o upsert fácil sin unique constraints en nombres,
    // simplemente crearé si no existen o dejaré que falle si hay unique constraints (no las hay en nombre).
    // Para evitar duplicados masivos, mejor comprobar antes o usar upsert si fuera posible.
    // Dado que es un seed inicial, asumiremos base limpia o duplicación aceptable por ahora, 
    // pero lo haré más robusto comprobando si existe.

    const universities = [
        {
            nombre: 'Universidad de Nariño',
            ciudad: 'Pasto',
            pais: 'Colombia',
            estado: 'ACTIVO',
            carreras: [
                { nombre: 'Ingeniería de Sistemas', nivel: 'Pregrado', estado: 'ACTIVO' },
                { nombre: 'Ingeniería Electrónica', nivel: 'Pregrado', estado: 'ACTIVO' },
                { nombre: 'Derecho', nivel: 'Pregrado', estado: 'ACTIVO' },
                { nombre: 'Medicina', nivel: 'Pregrado', estado: 'ACTIVO' },
            ],
        },
        {
            nombre: 'Universidad Mariana',
            ciudad: 'Pasto',
            pais: 'Colombia',
            estado: 'ACTIVO',
            carreras: [
                { nombre: 'Ingeniería de Sistemas', nivel: 'Pregrado', estado: 'ACTIVO' },
                { nombre: 'Psicología', nivel: 'Pregrado', estado: 'ACTIVO' },
                { nombre: 'Enfermería', nivel: 'Pregrado', estado: 'ACTIVO' },
                { nombre: 'Contaduría Pública', nivel: 'Pregrado', estado: 'ACTIVO' },
            ],
        },
        {
            nombre: 'Institución Universitaria CESMAG',
            ciudad: 'Pasto',
            pais: 'Colombia',
            estado: 'ACTIVO',
            carreras: [
                { nombre: 'Ingeniería de Sistemas', nivel: 'Pregrado', estado: 'ACTIVO' },
                { nombre: 'Arquitectura', nivel: 'Pregrado', estado: 'ACTIVO' },
                { nombre: 'Diseño Gráfico', nivel: 'Pregrado', estado: 'ACTIVO' },
                { nombre: 'Derecho', nivel: 'Pregrado', estado: 'ACTIVO' },
            ],
        },
        {
            nombre: 'UNAD',
            ciudad: 'Pasto',
            pais: 'Colombia',
            estado: 'ACTIVO',
            carreras: [
                { nombre: 'Ingeniería de Sistemas', nivel: 'Pregrado', estado: 'ACTIVO' },
                { nombre: 'Administración de Empresas', nivel: 'Pregrado', estado: 'ACTIVO' },
                { nombre: 'Psicología', nivel: 'Pregrado', estado: 'ACTIVO' },
            ],
        },
        {
            nombre: 'Universidad Cooperativa de Colombia',
            ciudad: 'Pasto',
            pais: 'Colombia',
            estado: 'ACTIVO',
            carreras: [
                { nombre: 'Ingeniería Industrial', nivel: 'Pregrado', estado: 'ACTIVO' },
                { nombre: 'Odontología', nivel: 'Pregrado', estado: 'ACTIVO' },
                { nombre: 'Derecho', nivel: 'Pregrado', estado: 'ACTIVO' },
            ],
        },
    ];

    for (const u of universities) {
        const existing = await prisma.universidad.findFirst({
            where: { nombre: u.nombre }
        });

        if (!existing) {
            console.log(`Creating ${u.nombre}...`);
            await prisma.universidad.create({
                data: {
                    nombre: u.nombre,
                    ciudad: u.ciudad,
                    pais: u.pais,
                    estado: u.estado,
                    carreras: {
                        create: u.carreras
                    }
                }
            });
        } else {
            console.log(`Updating ${u.nombre}...`);
            // Opcional: Agregar carreras que falten
            for (const c of u.carreras) {
                const existingCareer = await prisma.carrera.findFirst({
                    where: {
                        nombre: c.nombre,
                        id_universidad: existing.id_universidad
                    }
                });
                if (!existingCareer) {
                    await prisma.carrera.create({
                        data: {
                            nombre: c.nombre,
                            nivel: c.nivel,
                            estado: c.estado,
                            id_universidad: existing.id_universidad
                        }
                    });
                }
            }
        }
    }

    console.log('✅ Seeding completed.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
