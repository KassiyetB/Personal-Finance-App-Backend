import { prisma } from "#/lib/prisma.js";
import type { CreateCategoryInput } from "./categories.schema.js";

export async function getCategories(
  userId: string,
) {

  return prisma.category.findMany({
    where: {
      userId,
    },

    orderBy: {
      name: "desc",
    }
  });
}

export async function createCategory(
  data: CreateCategoryInput
) {
  const existingCategory = await prisma.category.findFirst({
    where: {
      userId: data.userId,
      name: data.name,
    },
  });

  if (existingCategory) {
    throw new Error('Category with this name already exists');
  }
  
  return prisma.category.create({
    data: {
      userId: data.userId,
      name: data.name,
    },
  });
}