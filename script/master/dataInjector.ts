import { PrismaClient } from "@prisma/client";
import { seedStuff } from "./helper/seeder";

import {
  processorSeed,
  motherboardSeed,
  graphicsCardSeed,
  ramSeed,
  computerStorageSeed,
  cabinetSeed,
  cpuCoolerSeed,
  powerSupplySeed,
} from "@/DataSeed/master/component";

const prisma = new PrismaClient();

const subCatData = [
  {
    name: "processor",
    data: processorSeed,
    id: "cmsfzy21q000012dnnnxgo2lp",
  },
  {
    name: "motherboard",
    data: motherboardSeed,
    id: "cmsfzy21q000112dnrsndfb1b",
  },
  {
    name: "graphics-card",
    data: graphicsCardSeed,
    id: "cmsfzy21q000212dnqpxxtysw",
  },
  {
    name: "ram",
    data: ramSeed,
    id: "cmsfzy21q000312dnyv65s813",
  },
  {
    name: "computer-storage",
    data: computerStorageSeed,
    id: "cmsfzy21q000412dnfrni33r1",
  },
  {
    name: "cabinet",
    data: cabinetSeed,
    id: "cmsfzy21q000512dnv118e9vi",
  },
  {
    name: "cpu-cooler",
    data: cpuCoolerSeed,
    id: "cmsfzy21q000612dn7dad1ajj",
  },
  {
    name: "power-supply",
    data: powerSupplySeed,
    id: "cmsfzy21q000712dnd8vk0rme",
  },
];

async function main() {
  try {
    await prisma.$transaction(
      async (tx) => {
        for (const subCat of subCatData) {
          console.log(`Starting ${subCat.name}...`);

          await seedStuff(tx, subCat.id, subCat.data, subCat.name);

          console.log(`Finished ${subCat.name}`);
        }
      },
      {
        maxWait: 10000,
        timeout: 600000,
      },
    );

    console.log("All seeding completed successfully");
  } catch (error) {
    console.error("Seeding failed. Everything was rolled back.");
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
