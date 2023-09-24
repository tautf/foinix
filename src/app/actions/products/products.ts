"use server";

import prisma from "@/app/shared/prisma";
import { Product } from "@prisma/client";

/**
 * Retrieves all products from the database
 * @returns All products in the database
 */
export async function getProducts(): Promise<Product[]> {
  const products = await prisma.product.findMany();
  return products;
}

/**
 * Retrieves a product from the database with the given id
 * @param id Id of the product to retrieve
 * @returns Product with the given id
 */
export async function getProductById(id: number): Promise<Product> {
  const product = await prisma.product.findUnique({ where: { id } });
  return product!;
}

/**
 * Creates a new product in the database and returns its id
 * @param productToAdd Product to create in the database
 * @returns Id of the newly created product
 */
export async function addProduct(productToAdd: Product): Promise<number> {
  const newProductId = await prisma.product.create({
    data: productToAdd,
    select: { id: true },
  });
  return newProductId.id;
}
