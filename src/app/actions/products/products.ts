'use server';

import prisma from '@/app/shared/prisma';

import { cache } from 'react';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import dayjs from 'dayjs';

import type { Product, ProductType } from '@prisma/client';
/**
 * Retrieves all products from the database
 * @returns All products in the database
 */
export const getProducts = cache(async (): Promise<Product[]> => {
    const products = await prisma.product.findMany({
        orderBy: [
            {
                replacedById: { sort: 'asc', nulls: 'first' },
            },
            {
                renewalDate: 'asc',
            },
        ],
    });
    return products;
});

export const getProductsByTypesFilter = cache(
    async (types: ProductType[]): Promise<Product[]> => {
        const products = await prisma.product.findMany({
            where: {
                productTypeId: {
                    in: types.map((productType) => productType.id),
                },
            },
            orderBy: [
                { replacedById: { sort: 'asc', nulls: 'first' } },
                { renewalDate: 'asc' },
            ],
        });

        return products;
    },
);

/**
 * Retrieves a product from the database with the given id
 * @param id Id of the product to retrieve
 * @returns Product with the given id
 */
export const getProductById = cache(async (id: number): Promise<Product> => {
    const product = await prisma.product.findUnique({ where: { id } });
    return product!;
});

/**
 * Creates a new product in the database and returns its id
 * @param productToAdd Product to create in the database
 * @returns Id of the newly created product
 */
export const addProduct = cache(async (form: FormData): Promise<number> => {
    try {
        const product = createProductObject(form);
        product.createdAt = dayjs().toDate();
        const newProduct = await prisma.product.create({
            data: product,
        });
        revalidatePath('/');
        revalidatePath('/products');
        return newProduct.id;
    } catch (err) {
        console.log(err);
        throw err;
    }
});

/**
 * Updates a product in the database and returns its id
 * @param productToUpdate Product to update in the database
 */
export const updateProduct = cache(
    async (productToUpdate: any): Promise<void> => {
        productToUpdate.updatedAt = dayjs().toDate();
        productToUpdate.renewedAt = dayjs().toDate();
        await prisma.product.update({
            where: { id: productToUpdate.id },
            data: productToUpdate,
        });
        revalidatePath('/');
        revalidatePath('/products');
        revalidatePath(`/products/${productToUpdate.id}`);
        return;
    },
);

export const replaceProduct = cache(
    async (id: number, newProductId: number): Promise<void> => {
        await prisma.product.update({
            where: { id },
            data: {
                replacedById: newProductId,
                replacedAt: dayjs().toDate(),
            },
        });
        revalidatePath('/');
        revalidatePath('/products');
        revalidatePath(`/products/${id}`);
    },
);

export const deleteProduct = cache(async (id: number): Promise<void> => {
    await prisma.product.delete({ where: { id } });
    revalidatePath('/');
    revalidatePath('/products');
});

/**
 * Retrieves the top 5 products that need to be replaced
 * @returns top 5 products that need to be replaced
 */
export const getToReplaceTop5 = cache(async (): Promise<Product[]> => {
    const products = await prisma.product.findMany({
        where: {
            replacedById: null,
        },
        orderBy: { renewalDate: 'asc' },
        take: 5,
    });

    return products;
});

/**
 * Retrieves all products that need to be replaced
 * @returns Amount of products that need to be replaced
 */
export const getRenewalDateDueProducts = cache(async (): Promise<number> => {
    const products = await prisma.product.findMany({
        where: {
            renewalDate: {
                lte: new Date(),
            },
            replacedById: null,
        },
    });

    return products.length;
});

/**
 * Retrieves all products that need to be replaced in the next 30 days
 * @returns All products that need to be replaced in the next 30 days
 */
export const getToReplaceAndInvestIn30Days = cache(
    async (): Promise<{
        products30: Product[];
        sum30: number;
    }> => {
        const products = await prisma.product.findMany({
            where: {
                renewalDate: {
                    gte: new Date(),
                    lte: new Date(
                        new Date().getTime() + 30 * 24 * 60 * 60 * 1000,
                    ),
                },
                replacedById: null,
            },
        });

        return {
            products30: products,
            sum30: products.reduce((acc, product) => acc + product.price, 0),
        };
    },
);

/**
 * Retrieves all products that need to be replaced in the next 90 days
 * @returns All products that need to be replaced in the next 90 days
 */
export const getToReplaceAndInvestIn90Days = cache(
    async (): Promise<{
        products90: Product[];
        sum90: number;
    }> => {
        const products = await prisma.product.findMany({
            where: {
                renewalDate: {
                    gte: new Date(),
                    lte: new Date(
                        new Date().getTime() + 90 * 24 * 60 * 60 * 1000,
                    ),
                },
                replacedById: null,
            },
        });

        return {
            products90: products,
            sum90: products.reduce((acc, product) => acc + product.price, 0),
        };
    },
);

export const getToReplaceAndInvestInCurrentQuarter = cache(
    async (): Promise<{
        productsCurrentQuarter: Product[];
        sumCurrentQuarter: number;
    }> => {
        const startOfYear =
            dayjs().month() >= 9
                ? dayjs().month(9).startOf('month')
                : dayjs().subtract(1, 'year').month(9).startOf('month');
        const endOfYear =
            dayjs().month() >= 9
                ? dayjs().add(1, 'year').month(8).endOf('month')
                : dayjs().month(8).endOf('month');

        const products = await prisma.product.findMany({
            where: {
                replacedById: {
                    not: null,
                },
                replacedAt: {
                    gte: startOfYear.toDate(),
                    lte: endOfYear.toDate(),
                },
            },
        });

        return {
            productsCurrentQuarter: products,
            sumCurrentQuarter: products.reduce(
                (acc, product) => acc + product.price,
                0,
            ),
        };
    },
);

export const getToReplaceAndInvestInNextQuarter = cache(
    async (): Promise<{
        productsNextQuarter: Product[];
        sumNextQuarter: number;
    }> => {
        const products = await prisma.product.findMany({
            where: {
                renewalDate: {
                    gte: new Date(
                        new Date().getFullYear(),
                        new Date().getMonth() + 3,
                        new Date().getDate(),
                    ),
                    lte: new Date(
                        new Date().getFullYear(),
                        new Date().getMonth() + 6,
                        new Date().getDate(),
                    ),
                },
                replacedById: null,
            },
        });

        return {
            productsNextQuarter: products,
            sumNextQuarter: products.reduce(
                (acc, product) => acc + product.price,
                0,
            ),
        };
    },
);

export const getToReplaceAndInvestInCurrentBusinessYear = cache(
    async (): Promise<{
        productsCurrentYear: Product[];
        sumCurrentYear: number;
    }> => {
        const startOfYear =
            dayjs().month() >= 9
                ? dayjs().month(9).startOf('month')
                : dayjs().subtract(1, 'year').month(9).startOf('month');
        const endOfYear =
            dayjs().month() >= 9
                ? dayjs().add(1, 'year').month(8).endOf('month')
                : dayjs().month(8).endOf('month');

        const products = await prisma.product.findMany({
            where: {
                renewalDate: {
                    gte: startOfYear.toDate(),
                    lte: endOfYear.toDate(),
                },
                replacedById: null,
            },
        });

        return {
            productsCurrentYear: products,
            sumCurrentYear: products.reduce(
                (acc, product) => acc + product.price,
                0,
            ),
        };
    },
);

export const getToReplaceAndInvestInNextBusinessYear = cache(
    async (): Promise<{
        productsNextYear: Product[];
        sumNextYear: number;
    }> => {
        const startOfNextYear =
            dayjs().month() >= 9
                ? dayjs().add(1, 'year').month(9).startOf('month')
                : dayjs().month(9).startOf('month');
        const endOfNextYear =
            dayjs().month() >= 9
                ? dayjs().add(2, 'year').month(8).endOf('month')
                : dayjs().add(1, 'year').month(8).endOf('month');

        const products = await prisma.product.findMany({
            where: {
                renewalDate: {
                    gte: startOfNextYear.toDate(),
                    lte: endOfNextYear.toDate(),
                },
                replacedById: null,
            },
        });

        return {
            productsNextYear: products,
            sumNextYear: products.reduce(
                (acc, product) => acc + product.price,
                0,
            ),
        };
    },
);

export const getReplacedProductsInCurrentBusinessYear = cache(
    async (): Promise<{
        replacedProductsCurrentYear: Product[];
        sumReplacedCurrentYear: number;
    }> => {
        const startOfYear =
            dayjs().month() >= 9
                ? dayjs().month(9).startOf('month')
                : dayjs().subtract(1, 'year').month(9).startOf('month');
        const endOfYear =
            dayjs().month() >= 9
                ? dayjs().add(1, 'year').month(8).endOf('month')
                : dayjs().month(8).endOf('month');

        const products = await prisma.product.findMany({
            where: {
                replacedById: {
                    not: null,
                },
                replacedAt: {
                    gte: startOfYear.toDate(),
                    lte: endOfYear.toDate(),
                },
                OR: [
                    {
                        renewedAt: {
                            gte: startOfYear.toDate(),
                            lte: endOfYear.toDate(),
                        },
                    },
                ],
            },
        });

        return {
            replacedProductsCurrentYear: products,
            sumReplacedCurrentYear: products.reduce(
                (acc, product) => acc + product.price,
                0,
            ),
        };
    },
);

const createProductObject = (formData: FormData): any => {
    const productSchema = z.object({
        name: z.string().min(5, {
            message: 'Product name must be at least 5 characters long',
        }),
        description: z.string().nullable(),
        cmdb_link: z.string().nullable(),
        price: z.number().min(1, { message: 'Price must be greater than 0' }),
        renewalDate: z.date(),
        productTypeId: z
            .number()
            .int({ message: 'Please select a product type' }),
    });

    const product = productSchema.parse({
        name: formData.get('product-name') as string,
        description: formData.get('product-description') as string,
        cmdb_link: formData.get('cmdb_link') as string,
        price: Number(formData.get('product-price') as string),
        renewalDate: new Date(formData.get('product-renewal-date') as string),
        productTypeId: Number(formData.get('product-type') as string),
    });
    return product;
};
