import React from "react";
import dayjs from "dayjs";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";

import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";

import type { Product } from "@prisma/client";

type Props = {
  product: Product;
  showModal: boolean;
  renewProduct: (form: FormData) => void;
  closeModal: () => void;
};

export default function RenewModal({
  product,
  renewProduct,
  showModal,
  closeModal,
}: Props) {
  return (
    <Modal isOpen={showModal} onClose={closeModal} backdrop="blur" size="2xl">
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1 text-indigo-300">
          Please choose a new renewal date
        </ModalHeader>
        <ModalBody>
          <form action={renewProduct}>
            <Input
              isRequired
              min={1}
              className="w-1/2 h-auto"
              type="date"
              defaultValue={dayjs(product.renewalDate).format("YYYY-MM-DD")}
              name="product-renewal-date"
              label="Renewal date"
            />
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
