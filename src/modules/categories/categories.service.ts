import { prisma } from "#/lib/prisma.js";

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