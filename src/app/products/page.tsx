import React from "react";
import Link from "next/link";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { Button } from "@nextui-org/button";

import { Product } from "@prisma/client";

import { getProducts } from "@/app/actions/products/products";
import ProductItem from "./components/ProductItem";

export default async function Products() {
  const products = await getProducts();
  products.sort((a, b) => b.createdAt - a.createdAt);
  return (
    <div className="my-40 mx-80">
      <div className="flex justify-between mb-20">
        <h1 className="text-4xl text-indigo-500 font-bold">Product overview</h1>
        <Link href="/products/add">
          <Button
            className="bg-gradient-to-r from-indigo-400 to-indigo-500 text-black px-12 transition ease-in hover:scale-110"
            variant="shadow"
            startContent={<PlusCircleIcon className="h-5 w-5" />}
          >
            Add
          </Button>
        </Link>
      </div>

      <div className="m-5">
        {products.map((product: Product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
