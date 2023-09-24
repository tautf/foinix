import React from "react";
import Link from "next/link";

import { getProductById } from "@/app/actions/products/products";

export default async function Product(params: { params: { id: string } }) {
  const product = await getProductById(Number(params.params["id"]));
  return (
    <div className="md:container mx-auto py-40">
      <h1 className="text-4xl text-ingigo-200">Product Works</h1>
      <p>{product.name}</p>

      <Link href="/">Back home</Link>
    </div>
  );
}
