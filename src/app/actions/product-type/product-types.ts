'use server';

import prisma from '@/app/shared/prisma';
import { cache } from 'react';

import type { ProductType } from '@prisma/client';

/**
 * Retrieves all product types from the database
 * @returns All product types in the database
 */
export const getProductTypes = cache(async (): Promise<ProductType[]> => {
    const types = await prisma.productType.findMany({
        orderBy: { id: 'asc' },
    });
    return types;
});

/**
 * Retrieves a product type from the database with the given id
 * @param id Id of the product type to retrieve
 * @returns Product type with the given id
 */
export const getProductTypeById = cache(
    async (id: number): Promise<ProductType> => {
        const type = await prisma.productType.findUnique({ where: { id } });
        return type!;
    },
);
