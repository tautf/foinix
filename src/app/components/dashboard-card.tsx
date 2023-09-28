import React from "react";
import type { ICard } from "../page";

type Props = {
  card: ICard;
};
export default function DashboardCard({ card }: Props) {
  return (
    <div
      className={`m-5 w-60 h-60 ${card.bgColor} rounded-2xl shadow shadow-lg`}
    >
      <h1 className="p-4 text-4xl font-extrabold">{card.header}</h1>
    </div>
  );
}
