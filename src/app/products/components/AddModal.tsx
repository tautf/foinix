import React from "react";

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
} from "@heroicons/react/24/outline";

import { getDatePlus5Years } from "@/app/shared/functions";

type Props = {
  showModal: boolean;
  addProduct: (form: FormData) => void;
  closeModal: () => void;
  productTypes: ProductType[];
};

export default function AddModal({
  showModal,
  addProduct,
  closeModal,
  productTypes,
}: Props) {
  return (
    <Modal isOpen={showModal} onClose={closeModal} backdrop="blur" size="2xl">
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1 text-indigo-300">
          Add new Product
        </ModalHeader>
        <ModalBody>
          <form action={addProduct}>
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
                defaultValue={getDatePlus5Years()}
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
  );
}
