import { PrismaClient } from "@prisma/client";
import { categories } from "./data/categories";
import { products } from "./data/products";
import { artisans} from "./data/artisans";
import { reviews} from "./data/reviews";
import { users } from './data/users';

const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.category.createMany({
      data: categories,
    });
    await prisma.artisan.createMany({
      data: artisans,
    });
    await prisma.product.createMany({
      data: products,
    });
    await prisma.review.createMany({
      data: reviews,
    });
    await prisma.user.createMany({
      data: users,
    });
  } catch (error) {
    console.log(error);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
    process.exit(1);
  });

// npx prisma db seed