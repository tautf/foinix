import Link from "next/link";

import { Button } from "@nextui-org/button";
import DashboardCard from "./components/dashboard-card";
import styles from "./shared.module.css";

import {
  getToReplaceTop5,
  getRenewalDateDueProducts,
  getToReplaceAndInvestIn30Days,
  getToReplaceAndInvestIn90Days,
} from "@/app/actions/products/products";
import type { Product } from "@prisma/client";
import ProductItem from "@/app/products/components/ProductItem";

export type ICard = {
  header: string;
  subHeader: string;
  bgColor: string;
  text: string;
};

export default async function Home() {
  const toReplaceTop5 = await getToReplaceTop5();
  const { products30, sum30 } = await getToReplaceAndInvestIn30Days();
  const { products90, sum90 } = await getToReplaceAndInvestIn90Days();
  const toRenew = await getRenewalDateDueProducts();
  const cards: ICard[] = [
    {
      header: "DUE",
      subHeader: "Due to renew",
      bgColor:
        toRenew === 0
          ? "bg-gradient-to-r from-indigo-500 to-indigo-600"
          : "bg-gradient-to-r from-red-500 to-red-600",
      text: String(toRenew),
    },
    {
      header: "TR30",
      subHeader: "To replace in the next 30 days",
      bgColor:
        products30.length < 5
          ? "bg-gradient-to-r from-indigo-500 to-indigo-600"
          : products30.length <= 3
          ? "bg-gradient-to-r from-amber-500 to-amber-600"
          : "bg-gradient-to-r from-red-500 to-red-600",
      text: String(products30.length),
    },
    {
      header: "TI30",
      subHeader: "To invest in the next 30 days",
      bgColor:
        sum30 < 5000
          ? "bg-gradient-to-r from-indigo-500 to-indigo-600"
          : sum30 < 10000
          ? "bg-gradient-to-r from-amber-500 to-amber-600"
          : "bg-gradient-to-r from-red-500 to-red-600",
      text: `${sum30}€`,
    },
    {
      header: "TR90",
      subHeader: "To replace in the next 90 days",
      bgColor:
        products90.length < 15
          ? "bg-gradient-to-r from-indigo-500 to-indigo-600"
          : products90.length <= 12
          ? "bg-gradient-to-r from-amber-500 to-amber-600"
          : "bg-gradient-to-r from-red-500 to-red-600",
      text: String(products90.length),
    },
    {
      header: "TI90",
      subHeader: "To invest in the next 90 days",
      bgColor:
        sum30 < 15000
          ? "bg-gradient-to-r from-indigo-500 to-indigo-600"
          : sum30 < 30000
          ? "bg-gradient-to-r from-amber-500 to-amber-600"
          : "bg-gradient-to-r from-red-500 to-red-600",
      text: `${sum90}€`,
    },
  ];

  return (
    <>
      <div className="mx-96 px-20 my-40">
        <div className="flex justify-between">
          <p className="-ml-5 text-6xl font-extrabold text-indigo-700">
            Dashboard
          </p>
          <Link href="/products">
            <Button className="px-10 mt-2">Products</Button>
          </Link>
        </div>

        <br />
        <h2 className="-ml-3">Quick view</h2>
        <div className={`flex justify-between flex-cols-${cards.length}`}>
          {cards.map((card) => (
            <DashboardCard key={card.header} card={card} />
          ))}
        </div>
        <div className="m-5">
          <h2 className="-ml-3">Upcoming 5 products</h2>
          {toReplaceTop5.map((product: Product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
}
