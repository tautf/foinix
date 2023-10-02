import React from "react";
import Link from "next/link";

import { Product } from "@prisma/client";
import { Card, CardHeader } from "@nextui-org/card";
import { ServerIcon } from "@heroicons/react/24/outline";

import styles from "../../shared.module.css";

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
        className={`w-full my-3 cursor-pointer bg-gradient-to-r hover:from-indigo-400 hover:to-indigo-500 transition ease-in hover:scale-105 ${
          (getTTL(product.renewalDate) < 0 && `${styles.alerts_border}`) ||
          (getTTL(product.renewalDate) < 30 &&
            "border-2 border-red-400 border-opacity-50") ||
          (getTTL(product.renewalDate) < 90 &&
            "border-2 border-amber-400 border-opacity-50")
        }`}
      >
        <div className="flex justify-between">
          <CardHeader className="flex gap-3">
            <ServerIcon className="w-5 h-5" />
            {product.name}
            <p
              className={`absolute top-3 right-4 ${
                (getTTL(product.renewalDate) < 0 && "font-bold text-red-400") ||
                (getTTL(product.renewalDate) < 30 && "text-red-400") ||
                (getTTL(product.renewalDate) < 90 && "text-amber-400")
              }`}
            >
              TTL: {getTTL(product.renewalDate)}
            </p>
          </CardHeader>
        </div>

        <div className="ml-5 px-5 pb-2"></div>
        {product.description && (
          <div className="ml-5 px-5 pb-2">
            <p className="opacity-40">{product.description}</p>
          </div>
        )}
      </Card>
    </Link>
  );
}
