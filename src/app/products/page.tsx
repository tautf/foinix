import React from "react";

// Actions
import {
  getProducts,
  getProductsByTypesFilter,
} from "@/app/actions/products/products";
import { getProductTypes } from "@/app/actions/product-type/product-types";

// Components
import AddProduct from "./components/AddProduct";
import FilterButtons from "./components/FilterButtons";
import ProductItem from "./components/ProductItem";
import BackHomeButton from "./components/BackHomeButton";

// Types
import type { Product } from "@prisma/client";

export default async function Products({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  let products = await getProducts();
  const productTypes = await getProductTypes();

  if (searchParams["types"]) {
    const params = String(searchParams["types"]).split(",");
    products = await getProductsByTypesFilter(
      productTypes.filter(
        (type) => params.indexOf(type.name.toLowerCase()) !== -1
      )
    );
  }

  return (
    <div className="mx-auto m-10 mt-20 max-w-screen-lg">
      <div className="flex justify-between mx-5 mb-20 items-center">
        <h1 className="text-4xl text-indigo-700 font-bold">Products</h1>
        <div className="flex items-center space-x-2">
          <BackHomeButton />
          <AddProduct productTypes={productTypes}></AddProduct>
        </div>
      </div>

      {productTypes.length > 1 && (
        <FilterButtons productTypes={productTypes}></FilterButtons>
      )}

      <div className="m-5">
        {products.map((product: Product) => (
          <ProductItem key={product.id} product={product} />
        ))}
        {products.length === 0 && <h2>No products found!</h2>}
      </div>
    </div>
  );
}
