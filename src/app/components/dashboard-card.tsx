import React from "react";

import type { ICard } from "../page";

type Props = {
  card: ICard;
};
export default function DashboardCard({ card }: Props) {
  return (
    <div
      className={`flex justify-between m-5 w-56 h-56 ${card.bgColor} rounded-2xl shadow-lg relative hover:scale-105 transition ease-in`}
    >
      <h1 className="p-5 text-xl font-extrabold  mb-2 mr-2">{card.header}</h1>
      <p className="absolute mt-12 m-5">{card.subHeader}</p>
      <h2 className="hidden sm:block p-5 text-3xl font-extrabold absolute bottom-2 right-2 hover:scale-110 transition ease-in">
        {card.text}
      </h2>
    </div>
  );
}
