"use server";

import prisma from "@/app/shared/prisma";
import { Product } from "@prisma/client";

export async function getProducts(): Promise<Product[]> {
  const products = await prisma.product.findMany();
  return products;
}

export async function getProductById(id: number): Promise<Product> {
  const product = await prisma.product.findUnique({ where: { id } });
  return product!;
}
