"use server";

import prisma from "@/app/shared/prisma";
import cache from "@/app/shared/cache";
import { Product } from "@prisma/client";

/**
 * Retrieves all products from the database
 * @returns All products in the database
 */
export async function getProducts(): Promise<Product[]> {
  const start = performance.now();
  if (cache.has("products")) {
    const end = performance.now();
    const cached = cache.get<Product[]>("products")!;
    console.log(`Retrieved products from cache in ${end - start}ms`);
    return cached;
  } else {
    const products = await prisma.product.findMany();
    cache.set<Product[]>("products", products);
    const end = performance.now();
    console.log(`Retrieved products from database in ${end - start}ms`);
    return products;
  }
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
    cache.set(`product-${id}`, product);
    return product!;
  }
}

/**
 * Creates a new product in the database and returns its id
 * @param productToAdd Product to create in the database
 * @returns Id of the newly created product
 */
export async function addProduct(productToAdd: Product): Promise<number> {
  const newProduct = await prisma.product.create({
    data: productToAdd,
    select: { id: true },
  });
  cache.set(`product-${newProduct.id}`, newProduct);
  return newProduct.id;
}
