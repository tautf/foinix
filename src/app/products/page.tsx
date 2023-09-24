import React from "react";
import Link from "next/link";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

import { Product } from "@prisma/client";
import { getProducts } from "@/app/actions/products/products";

export default async function Products() {
  const products = await getProducts();
  return (
    <div className=" my-40 mx-80">
      <button className="bg-indigo-300 text-black rounded-md px-12 py-2 text-md inline-flex float-right">
        <PlusCircleIcon className="h-5 w-5 my-auto mx-2" />
        Add Product
      </button>
      <h1>Products works!</h1>
      {
        <ul>
          {products.map((product: Product) => (
            <li key={product.id}>
              <Link href={`/products/${product.id}`}>{product.name}</Link>
            </li>
          ))}
        </ul>
      }
    </div>
  );
}
