"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import type { ProductType } from "@prisma/client";

import { Button } from "@nextui-org/button";

import { PlusCircleIcon } from "@heroicons/react/24/outline";

import { addProduct } from "@/app/actions/products/products";

import AddModal from "./AddModal";

type Props = {
  productTypes: ProductType[];
};

export default function AddProduct({ productTypes }: Props) {
  const [showModel, setShowModel] = useState(false);

  const toggleShowModel = () => {
    setShowModel(!showModel);
  };

  const router = useRouter();

  const addProductFunc = async (formData: FormData) => {
    try {
      const id = await addProduct(formData);
      if (id) {
        router.push(`/products/${id}`);
      } else {
        alert("Something went wrong");
      }
    } catch (err: any) {
      console.log(err);
      for (const error of err.errors) {
        alert(error.message);
      }
    }
  };

  return (
    <>
      <Button
        onClick={toggleShowModel}
        className="bg-gradient-to-r from-indigo-500 to-indigo-700 text-black lg:px-12 px-6 transition ease-in hover:scale-110"
        variant="shadow"
        startContent={<PlusCircleIcon className="h-5 w-5" />}
      >
        {window.innerWidth > 1024 ? "Add" : ""}
      </Button>
      <AddModal
        showModal={showModel}
        addProduct={addProductFunc}
        productTypes={productTypes}
        closeModal={toggleShowModel}
      />
    </>
  );
}
