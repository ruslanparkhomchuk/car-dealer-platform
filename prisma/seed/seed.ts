import { PrismaClient } from "@prisma/client";
import { seedImages } from "./images.seed";
import { seedClassifieds } from "./classifieds.seed";
import { seedAdmin } from "./admin.seed";
import { seedCustomers } from "./customers.seed";

const prisma = new PrismaClient();

async function Seed() {
	// await prisma.$executeRaw`TRUNCATE TABLE "makes" RESTART IDENTITY CASCADE`;
	// await prisma.$executeRaw`TRUNCATE TABLE "classifieds" RESTART IDENTITY CASCADE`;
	// await prisma.$executeRaw`TRUNCATE TABLE "images" RESTART IDENTITY CASCADE`;
	// await seedTaxonomy(prisma)
	// await seedClassifieds(prisma);
	// await seedImages(prisma);
	// await seedAdmin(prisma);
	await seedCustomers(prisma);
}

Seed()
	.catch((e) => {
		throw e;
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
