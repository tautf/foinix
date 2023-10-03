import React from "react";

import type { ICard } from "../page";

type Props = {
  card: ICard;
  className: string;
};
export default function DashboardCard({ card, className }: Props) {
  return (
    <div
      className={`${className} block lg:m-3 m-2 w-56 h-56 ${card.bgColor} rounded-2xl shadow-lg relative hover:scale-105 transition ease-in`}
    >
      <h1 className="ml-5 mt-5 text-xl font-extrabold">{card.header}</h1>
      <p className="mx-5 lg:text-md text-sm">{card.subHeader}</p>
      <h2 className="p-2 lg:text-3xl text-xl font-extrabold absolute bottom-1 right-1 hover:scale-110 transition ease-in">
        {card.text}
      </h2>
    </div>
  );
}
