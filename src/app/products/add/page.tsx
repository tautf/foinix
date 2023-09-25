"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";

import {
  ArrowDownTrayIcon,
  CurrencyEuroIcon,
} from "@heroicons/react/24/outline";

import { addProduct } from "@/app/actions/products/products";

export default function AddProduct() {
  const router = useRouter();
  const addProductFunc = async (formData: FormData) => {
    const productName = z
      .string()
      .min(5)
      .parse(formData.get("product-name") as string);
    const description = z
      .string()
      .nullable()
      .parse(formData.get("product-description") as string);
    const price = z
      .number()
      .min(1)
      .parse(Number(formData.get("product-price") as string));
    console.log(formData.get("product-renewal-date") as string);
    const renewalDate = z
      .string()
      .parse(formData.get("product-renewal-date") as string);

    const id = await addProduct({
      name: productName,
      description,
      price,
      renewalDate: new Date(renewalDate),
      productTypeId: 1,
    });
    if (id) {
      router.push(`/products/${id}`);
    } else {
      alert("Something went wrong");
    }
  };

  const formattedDate = () => {
    const currentDate = new Date();
    currentDate.setFullYear(currentDate.getFullYear() + 5);
    return currentDate.toISOString().slice(0, 10);
  };

  return (
    <Modal isOpen={true} backdrop="blur" size="2xl">
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
                className="w-1/2 h-auto"
                type="date"
                defaultValue={formattedDate()}
                name="product-renewal-date"
                label="Renewal date"
              />
            </div>
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
  );
}
