"use client";

import React from "react";
import { addProduct } from "@/app/actions/products/products";

export default function AddProduct() {
  const addProductFunc = (event: FormData) => {
    console.log(event);
  };

  return (
    <div className="grid-cols-2 p-10">
      AddProduct
      <form action={addProductFunc} className="flex-auto p-10">
        <input type="text" placeholder="name" />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}
