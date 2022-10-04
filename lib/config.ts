import { PrismaClient } from '@prisma/client';

const env = {
    prisma: new PrismaClient(),
    AUTH_SECRET: process.env.AUTH_SECRET || "70812b699e021454f977ef6a575ef5105e885af009c664f4e5a874fc3f064a72",
    DATABASE_URL: process.env.DATABASE_URL || "postgresql://postgres:postgres@localhost:5432/postgres?schema=public"
}

export default env;
