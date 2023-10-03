"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ZodError, z } from "zod";
import type { ProductType } from "@prisma/client";

import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";

import {
  ArrowDownTrayIcon,
  CurrencyEuroIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";

import { addProduct } from "@/app/actions/products/products";

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
    const productSchema = z.object({
      name: z
        .string()
        .min(5, { message: "Product name must be at least 5 characters long" }),
      description: z.string().nullable(),
      price: z.number().min(1, { message: "Price must be greater than 0" }),
      renewalDate: z.date(),
      productTypeId: z
        .number()
        .int({ message: "Please select a product type" }),
    });

    try {
      const product = productSchema.parse({
        name: formData.get("product-name") as string,
        description: formData.get("product-description") as string,
        price: Number(formData.get("product-price") as string),
        renewalDate: new Date(formData.get("product-renewal-date") as string),
        productTypeId: Number(formData.get("product-type") as string),
      });

      const id = await addProduct(product);
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

  const formattedDate = () => {
    const currentDate = new Date();
    currentDate.setFullYear(currentDate.getFullYear() + 5);
    return currentDate.toISOString().slice(0, 10);
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

      <Modal
        isOpen={showModel}
        onClose={toggleShowModel}
        backdrop="blur"
        size="2xl"
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1 text-indigo-300">
            Add new Product
          </ModalHeader>
          <ModalBody>
            <form action={addProductFunc}>
              <Input
                className="my-5"
                isRequired
                type="text"
                name="product-name"
                label="Product name"
                defaultValue="HOTSV001"
                minLength={5}
              />
              <Input
                className="my-5"
                type="text"
                name="product-description"
                label="Description"
              />
              <div className="flex my-5">
                <Input
                  isRequired
                  className="w-1/2 mr-2"
                  type="number"
                  name="product-price"
                  label="Price"
                  endContent={<CurrencyEuroIcon className="h-5 w-5" />}
                />
                <Input
                  isRequired
                  min={1}
                  className="w-1/2 h-auto"
                  type="date"
                  defaultValue={formattedDate()}
                  name="product-renewal-date"
                  label="Renewal date"
                />
              </div>
              <Select
                isRequired
                name="product-type"
                label="Select produdct type"
                className="w-1/2"
              >
                {productTypes.map((type) => (
                  <SelectItem key={type.id} value={type.id}>
                    {type.name}
                  </SelectItem>
                ))}
              </Select>
              <Button
                type="submit"
                className="bg-indigo-300 text-black float-right"
                startContent={<ArrowDownTrayIcon className="h5- w-5" />}
              ></Button>
            </form>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
