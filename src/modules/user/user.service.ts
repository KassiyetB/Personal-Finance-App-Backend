import { prisma } from "#/lib/prisma.js";
import bcrypt from "bcrypt";
import type { CreateUserInput } from "./user.schema.js";

export async function createUser(
    userData: CreateUserInput
) {
    const existingUser = await prisma.user.findUnique({
        where: {
        email: userData.email,
        },
    });

    if (existingUser) {
        throw new Error('User already exists');
    }

    const passwordHash = await bcrypt.hash(userData.password, 12);

    return prisma.user.create({
        data: {
            email: userData.email,
            password: passwordHash,
        },
        select: {
            id: true,
            email: true,
            createdAt: true,
            updatedAt: true,
        }
    });
}