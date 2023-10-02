import React from "react";
import Link from "next/link";

import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Button } from "@nextui-org/button";

import {
  ServerStackIcon,
  HomeIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";

import { getProductById } from "@/app/actions/products/products";

export default async function Product(params: { params: { id: string } }) {
  const product = await getProductById(Number(params.params["id"]));
  return (
    <div className="md:container mx-auto px-40 py-40">
      <Link href="/">
        <Button
          className="bg-indigo-700 text-black float-right px-12 py-2 my-10"
          startContent={<HomeIcon className="w-5 h-5" />}
        >
          Back home
        </Button>
      </Link>

      <Card className="w-full">
        <CardHeader className="flex gap-3">
          <ServerStackIcon className="w-7 h-7" />
          <div className="flex flex-col">
            <p className="text-lg font-bold text-indigo-300">{product.name}</p>
            {product.description && (
              <p className="text-small text-default-500">
                {product.description}
              </p>
            )}
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <p>Make beautiful websites regardless of your design experience.</p>
        </CardBody>
        <Divider />
        <CardFooter>
          <Button
            className="bg-indigo-300 text-black px-12"
            startContent={<ArrowPathIcon className="w-5 h-5" />}
          >
            Update
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
