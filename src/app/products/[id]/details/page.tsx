import AddProductButtonDetail from "@/components/products/AddProductButtonDetail";
import ReviewCard from "@/components/products/ReviewCard";
import ReviewForm from "@/components/products/ReviewForm";
import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";
import Image from "next/image";
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Product | Handcrafted Haven",
  description: "SEO Title",
  keywords: ["Product page"],
};

async function getProduct(id: string) {
  const product = await prisma.product.findUnique({
    where: {
      id: parseInt(id, 10), // Ensuring id is converted to a number
    },
    include: {
      artisan: true,
      category: true,
      reviews: true,
    },
  });
  return product;
}

const toSnakeCase = (str: string) => {
  return str.toLowerCase().replace(/\s+/g, '_');
};

export default async function OrderPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await getProduct(params.id);

  if (!product) {
    return {
      notFound: true,
    };
  }

  const categorySlug = toSnakeCase(product.category.slug);
  const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum nisi velit, sodales nec purus in, tempor fringilla sapien. Sed vestibulum orci vitae nunc egestas ullamcorper. Duis tortor nisl, malesuada rhoncus ultricies non, venenatis ac augue. Morbi faucibus dolor semper orci maximus tempor. Nulla est nulla, vestibulum ut porta eu, volutpat eu lacus. Proin facilisis varius condimentum. Sed gravida finibus quam, sit amet vulputate mi."

  return (
    <div className="bg-gray-200 p-10 text-black min-h-screen">
      <div className="container mx-auto px-4 lg:px-20">
        <div className="flex flex-col lg:flex-row items-start">
          <div className="w-full lg:w-1/2 lg:pr-10 mb-10 lg:mb-0">
            <div className="relative w-full h-200">
              <Image
                width={400}
                height={500}
                layout="responsive"
                objectFit="cover"
                src={`/products/${product.image}.jpg`}
                alt={`${product.name} product image`}
                className="rounded-lg"
              />
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col">
              <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
              <p className="text-lg mb-4">{product.description ?? 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'}</p>
              <div className="flex justify-center mb-10">
                <p className="mt-5 font-black text-6xl text-amber-500">${product.price}</p>
              </div>
              <AddProductButtonDetail product={product} />
              <div className="flex flex-col lg:flex-row mt-8">
                <div className="w-full lg:w-1/2">
                  <h2 className="text-lg font-bold text-gray-700 mb-1">Category</h2>
                  <h2 className="text-lg mb-4">{product.category.name}</h2>
                  <h2 className="text-lg font-bold text-gray-700 mb-1">Artisan</h2>
                  <div className="relative w-full h-32 lg:w-32 lg:h-32 mb-4 lg:mb-0">
                    <Image
                      src={`/sellers/${product.artisan.image}`}
                      alt={product.artisan.name}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-lg"
                    />
                  </div>
                  <h2 className="text-lg mb-4">{product.artisan.name}</h2>
                </div>
                <div className="w-full lg:w-1/2">
                  <h2 className="text-lg font-bold text-gray-700 mb-1">Reviews</h2>
                  <ReviewForm productId={parseInt(params.id)} />
                  <br />
                  {product.reviews.length > 0 ? (
                    product.reviews.map((review) => (
                      <ReviewCard key={review.id} review={review} />
                    ))
                  ) : (
                    <p>No reviews yet.</p>
                  )}
                </div>
              </div>
              <button
                type="button"
                className="w-32 mt-5 p-3 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 uppercase"
              >
                <Link href={`/products`}>
                  Return
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}