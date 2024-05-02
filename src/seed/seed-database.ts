import { initialData } from "./seed";

import prisma from "../lib/prisma";

async function main() {
  console.log("Seeding database...\n\n");

  //  1. Borrar todos los registros
  // await Promise.all([
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  // ]);

  const { categories, products } = initialData;
  const categoriesData = categories.map((category) => ({ name: category }));

  await prisma.category.createMany({ data: categoriesData });

  const categoriesDB = await prisma.category.findMany();

  const categoriesMap = categoriesDB.reduce((map, category) => {
    map[category.name.toLowerCase()] = category.id;
    return map;
  }, {} as Record<string, string>);

  products.forEach(async (product) => {
    const { type, images, ...productData } = product;

    const productDB = await prisma.product.create({
      data: {
        ...productData,
        categoryId: categoriesMap[type],
      },
    });

    const imagesData = images.map((image) => ({
      productId: productDB.id,
      url: image,
    }));

    await prisma.productImage.createMany({ data: imagesData });
  });
  console.log("Finished seeding database.");
}

(() => {
  if (process.env.NODE_ENV === "production") return;
  main();
})();
