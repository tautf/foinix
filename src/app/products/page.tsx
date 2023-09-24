import React from "react";
import Link from "next/link";

import { Product } from "@prisma/client";
import { getProducts } from "@/app/lib/products/products.actions";

export default async function Products() {
  const products = await getProducts();
  return (
    <div>
      <h1>Products works!</h1>
      <ul>
        {products.map((product: Product) => (
          <li key={product.id}>
            <Link href={`/products/${product.id}`}>{product.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
