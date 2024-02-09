import Link from 'next/link';

import { Button } from '@nextui-org/button';
import DashboardCard from '../components/controlling-dashboard-card';
import styles from '../shared.module.css';

import {
    getToReplaceAndInvestInCurrentQuarter,
    getToReplaceAndInvestInNextQuarter,
    getToReplaceAndInvestInCurrentBusinessYear,
    getToReplaceAndInvestInNextBusinessYear,
    getReplacedProductsInCurrentBusinessYear,
} from '@/app/actions/products/products';

export type ICard = {
    header: string;
    subHeader: string;
    bgColor: string;
    text: string;
};

export const revalidate = 3600;

export default async function Home() {
    const { replacedProductsCurrentYear, sumReplacedCurrentYear } =
        await getReplacedProductsInCurrentBusinessYear();
    const { productsCurrentQuarter, sumCurrentQuarter } =
        await getToReplaceAndInvestInCurrentQuarter();
    const { productsNextQuarter, sumNextQuarter } =
        await getToReplaceAndInvestInNextQuarter();
    const { productsCurrentYear, sumCurrentYear } =
        await getToReplaceAndInvestInCurrentBusinessYear();
    const { productsNextYear, sumNextYear } =
        await getToReplaceAndInvestInNextBusinessYear();

    const cards: ICard[] = [
        {
            header: 'Investiert',
            subHeader: 'Investiert im aktuellen Geschäftsjahr',
            bgColor: 'bg-gradient-to-r from-indigo-500 to-indigo-600',
            text: `${sumReplacedCurrentYear}€`,
        },
        {
            header: 'Aktuelles Quartal',
            subHeader: 'Investitionsbedarf im aktuellen Quartal',
            bgColor:
                sumCurrentQuarter < 5000
                    ? 'bg-gradient-to-r from-indigo-500 to-indigo-600'
                    : sumCurrentQuarter < 10000
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600'
                      : 'bg-gradient-to-r from-red-500 to-red-600',
            text: `${sumCurrentQuarter}€`,
        },
        {
            header: 'Nächstes Quartal',
            subHeader: 'Investitionsbedarf im nächsten Quartal',
            bgColor:
                sumNextQuarter < 5000
                    ? 'bg-gradient-to-r from-indigo-500 to-indigo-600'
                    : sumNextQuarter < 10000
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600'
                      : 'bg-gradient-to-r from-red-500 to-red-600',
            text: `${sumNextQuarter}€`,
        },
        {
            header: 'Aktuelles Geschäftsjahr',
            subHeader: 'Investitionsbedarf im aktuellen Quartal',
            bgColor:
                sumCurrentYear < 5000
                    ? 'bg-gradient-to-r from-indigo-500 to-indigo-600'
                    : sumCurrentYear < 10000
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600'
                      : 'bg-gradient-to-r from-red-500 to-red-600',
            text: `${sumCurrentYear}€`,
        },
        {
            header: 'Nächstes Geschäftsjahr',
            subHeader: 'Investitionsbedarf im nächsten Geschäftsjahr',
            bgColor:
                sumNextYear < 5000
                    ? 'bg-gradient-to-r from-indigo-500 to-indigo-600'
                    : sumNextYear < 10000
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600'
                      : 'bg-gradient-to-r from-red-500 to-red-600',
            text: `${sumNextYear}€`,
        },
    ];

    return (
        <div className="mx-auto m-10 xl:mt-32 max-w-screen-xl">
            <div className="mx-5">
                <p className="lg:text-6xl text-4xl font-extrabold text-indigo-700">
                    Controlling Dashboard
                </p>
                <br />
                <p className="text-md">
                    Übersicht der Kosten der IT-Abteilung der H-O-T nach
                    verschiedenen Zeithorizonten.
                </p>
            </div>

            <br />
            <div
                className={`flex justify-between mx-2 lg:flex-cols-3 flex-cols-3`}
            >
                {cards.map((card, i) => (
                    <DashboardCard
                        key={card.header}
                        card={card}
                        className={`${i >= 3 && 'hidden lg:block'}`}
                    />
                ))}
            </div>
        </div>
    );
}
