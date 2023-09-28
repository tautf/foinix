"use server";

import prisma from "@/app/shared/prisma";
import cache from "@/app/shared/cache";
import type { ProductType } from "@prisma/client";

/**
 * Retrieves all product types from the database
 * @returns All product types in the database
 */
export async function getProductTypes(
  forceUpdate = false
): Promise<ProductType[]> {
  if (cache.has("product-types") && !forceUpdate) {
    const cached = cache.get<ProductType[]>("product-types")!;
    return cached;
  } else {
    const types = await prisma.productType.findMany();
    cache.set<ProductType[]>("product-types", types, 86400);
    return types;
  }
}

/**
 * Retrieves a product type from the database with the given id
 * @param id Id of the product type to retrieve
 * @returns Product type with the given id
 */
export async function getProductTypeById(id: number): Promise<ProductType> {
  if (cache.has(`product-type-${id}`)) {
    return cache.get<ProductType>(`product-type-${id}`)!;
  } else {
    const type = await prisma.productType.findUnique({ where: { id } });
    cache.set(`product-type-${id}`, type, 86400);
    return type!;
  }
}
