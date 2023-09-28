import Link from "next/link";

import { Button } from "@nextui-org/button";
import DashboardCard from "./components/dashboard-card";

export type ICard = {
  header: string;
  bgColor: string;
  buttonText?: string;
  buttonHref?: string;
};

export default function Home() {
  const cards: ICard[] = [
    {
      header: "To replace ASAP",
      bgColor: "bg-red-500",
    },
  ];

  return (
    <>
      <Link href="/products">
        <Button>Products</Button>
      </Link>

      <div className="mx-80 my-20">
        <p className="text-5xl font-extrabold">Dashboard</p>

        {cards.map((card) => (
          <DashboardCard key={card.header} card={card} />
        ))}
      </div>
    </>
  );
}
