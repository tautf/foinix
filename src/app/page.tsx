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
      subHeader: "Due to replace",
      bgColor:
        toRenew === 0
          ? "bg-gradient-to-r from-indigo-500 to-indigo-600"
          : toRenew > 2
          ? `bg-gradient-to-r from-red-700 to-red-800 ${styles.alerts_bg}`
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
      subHeader: "To replace in the next 90 days (inc.  TR30)",
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
      subHeader: "To invest in the next 90 days (inc. TI30)",
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
    <div className="mx-auto m-10 xl:mt-32 max-w-screen-lg">
      <div className="flex justify-between mx-2">
        <p className="lg:text-6xl text-4xl font-extrabold text-indigo-700">
          Dashboard
        </p>
        <Link href="/products">
          <Button className="lg:px-10 px-6 mt-2">Products</Button>
        </Link>
      </div>

      <br />
      <div className={`flex justify-between lg:flex-cols-5 flex-cols-3`}>
        {cards.map((card, i) => (
          <DashboardCard
            key={card.header}
            card={card}
            className={`${i >= 3 && "hidden lg:block"}`}
          />
        ))}
      </div>
      <hr className="opacity-20"></hr>
      <div className="m-5">
        <h2>NEXT5TR</h2>
        {toReplaceTop5.map((product: Product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
