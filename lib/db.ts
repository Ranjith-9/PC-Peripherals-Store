import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as any;

export const db = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}

// import { PrismaClient } from "@prisma/client";

// const globalForPrisma = globalThis as unknown as {
//   prisma: PrismaClient | undefined;
// };

// export const db =
//   globalForPrisma.prisma ??
//   new PrismaClient({
//     log: ["query", "error", "warn"],
//   });

// if (process.env.NODE_ENV !== "production") {
//   globalForPrisma.prisma = db;
// }
