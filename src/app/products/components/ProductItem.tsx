import React from "react";
import Link from "next/link";

import { Card, CardHeader } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { ArrowRightCircleIcon, ServerIcon } from "@heroicons/react/24/outline";

import { Product } from "@prisma/client";

export default function ProductItem({ product }: { product: Product }) {
  const getTTL = (date: Date) => {
    const now = new Date();
    const diff = date.getTime() - now.getTime();
    const ttlInDays = Math.floor(diff / (1000 * 3600 * 24));
    return ttlInDays;
  };

  return (
    <Link href={`/products/${product.id}`}>
      <Card
        className={`w-full my-3 cursor-pointer bg-gradient-to-r hover:from-indigo-800 hover:to-slate-800 transition ease-in hover:scale-105 ${
          getTTL(product.renewalDate) < 100 &&
          "border-2 border-red-500 border-opacity-50"
        }`}
      >
        <div className="flex justify-between">
          <CardHeader className="flex gap-3 w-9/12">
            <ServerIcon className="w-5 h-5" />
            {product.name}
          </CardHeader>
        </div>

        <div className="ml-5 px-5 pb-2">
          <p className="opacity-40">TTL: {getTTL(product.renewalDate)}</p>
        </div>
        {product.description && (
          <div className="ml-5 px-5 pb-2">
            <p className="opacity-40">{product.description}</p>
          </div>
        )}
      </Card>
    </Link>
  );
}
