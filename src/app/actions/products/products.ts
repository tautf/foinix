"use server";

import prisma from "@/app/shared/prisma";
import cache from "@/app/shared/cache";
import type { Product, ProductType } from "@prisma/client";

/**
 * Retrieves all products from the database
 * @returns All products in the database
 */
export async function getProducts(forceUpdate = false): Promise<Product[]> {
  if (cache.has("products") && !forceUpdate) {
    const cached = cache.get<Product[]>("products")!;
    return cached;
  } else {
    const products = await prisma.product.findMany({
      orderBy: { renewalDate: "asc" },
    });
    cache.set<Product[]>("products", products, 86400);
    return products;
  }
}

export async function getProductsByTypesFilter(
  types: ProductType[]
): Promise<Product[]> {
  const products = await prisma.product.findMany({
    where: {
      productTypeId: {
        in: types.map((productType) => productType.id),
      },
    },
    orderBy: { renewalDate: "asc" },
  });

  return products;
}

/**
 * Retrieves a product from the database with the given id
 * @param id Id of the product to retrieve
 * @returns Product with the given id
 */
export async function getProductById(id: number): Promise<Product> {
  if (cache.has(`product-${id}`)) {
    return cache.get<Product>(`product-${id}`)!;
  } else {
    const product = await prisma.product.findUnique({ where: { id } });
    cache.set(`product-${id}`, product, 86400);
    return product!;
  }
}

/**
 * Creates a new product in the database and returns its id
 * @param productToAdd Product to create in the database
 * @returns Id of the newly created product
 */
export async function addProduct(productToAdd: any): Promise<number> {
  const newProduct = await prisma.product.create({
    data: productToAdd,
  });
  cache.set(`product-${newProduct.id}`, newProduct, 86400);
  await getProducts(true);
  return newProduct.id;
}

/**
 * Retrieves the top 5 products that need to be replaced
 * @returns top 5 products that need to be replaced
 */
export async function getToReplaceTop5(): Promise<Product[]> {
  const products = await prisma.product.findMany({
    orderBy: { renewalDate: "asc" },
    take: 5,
  });

  return products;
}

/**
 * Retrieves all products that need to be replaced
 * @returns Amount of products that need to be replaced
 */
export async function getRenewalDateDueProducts(): Promise<number> {
  const products = await prisma.product.findMany({
    where: {
      renewalDate: {
        lte: new Date(),
      },
    },
  });

  return products.length;
}

/**
 * Retrieves all products that need to be replaced in the next 30 days
 * @returns All products that need to be replaced in the next 30 days
 */
export async function getToReplaceAndInvestIn30Days(): Promise<{
  products30: Product[];
  sum30: number;
}> {
  const products = await prisma.product.findMany({
    where: {
      renewalDate: {
        gte: new Date(),
        lte: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000),
      },
    },
  });

  return {
    products30: products,
    sum30: products.reduce((acc, product) => acc + product.price, 0),
  };
}

/**
 * Retrieves all products that need to be replaced in the next 90 days
 * @returns All products that need to be replaced in the next 90 days
 */
export async function getToReplaceAndInvestIn90Days(): Promise<{
  products90: Product[];
  sum90: number;
}> {
  const products = await prisma.product.findMany({
    where: {
      renewalDate: {
        gte: new Date(),
        lte: new Date(new Date().getTime() + 90 * 24 * 60 * 60 * 1000),
      },
    },
  });

  return {
    products90: products,
    sum90: products.reduce((acc, product) => acc + product.price, 0),
  };
}
