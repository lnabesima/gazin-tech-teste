import { PrismaClient } from '@prisma/client';
import * as process from 'node:process';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding basic data into the database...');

  const junior = await prisma.levels.upsert({
    where: {
      nivel: 'Junior',
    },
    update: {},
    create: {
      nivel: 'Junior',
    },
  });

  const pleno = await prisma.levels.upsert({
    where: {
      nivel: 'Pleno',
    },
    update: {},
    create: {
      nivel: 'Pleno',
    },
  });

  const senior = await prisma.levels.upsert({
    where: {
      nivel: 'Senior',
    },
    update: {},
    create: {
      nivel: 'Senior',
    },
  });

  await prisma.developer.upsert({
    where: {
      id: 1,
    },
    update: {},
    create: {
      nome: 'Teste Testerson',
      sexo: 'M',
      dataNascimento: new Date('1989-10-14'),
      hobby: 'Nadar ',
      nivel: {
        connect: {
          id: junior.id,
          nivel: junior.nivel
        }
      },
    },
  });

  console.log('Basic data seeded into the database');
}

main().catch(e => {
  console.error('Error while seeding database', e);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
});
