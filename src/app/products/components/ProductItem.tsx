import React from 'react';
import Link from 'next/link';

import { Product } from '@prisma/client';
import { Card, CardHeader } from '@nextui-org/card';
import {
    ArrowPathIcon,
    CommandLineIcon,
    CpuChipIcon,
    ComputerDesktopIcon,
    DevicePhoneMobileIcon,
    ServerIcon,
    WrenchIcon,
} from '@heroicons/react/24/outline';

import sharedStyles from '../../shared.module.css';
import styles from './ProductItem.module.css';

export default function ProductItem({ product }: { product: Product }) {
    const getTTL = (date: Date) => {
        const now = new Date();
        const diff = date.getTime() - now.getTime();
        const ttlInDays = Math.floor(diff / (1000 * 3600 * 24));
        return ttlInDays;
    };

    const getTypeIcon = (typeId: number) => {
        switch (typeId) {
            case 1:
                return <ComputerDesktopIcon className="w-5 h-5" />;
            case 2:
                return <CommandLineIcon className="w-5 h-5" />;
            case 3:
                return <ServerIcon className="w-5 h-5" />;
            case 4:
                return <ArrowPathIcon className="w-5 h-5" />;
            case 5:
                return <DevicePhoneMobileIcon className="w-5 h-5" />;
            case 6:
                return <CpuChipIcon className="w-5 h-5" />;
            default:
                return <WrenchIcon className="w-5 h-5" />;
        }
    };

    return (
        <Link href={`/products/${product.id}`}>
            <Card
                className={`w-full my-3 cursor-pointer bg-gradient-to-r transition ease-in ${
                    styles.item
                } ${
                    (!product.replacedById &&
                        getTTL(product.renewalDate) < 0 &&
                        `${sharedStyles.alerts_border}`) ||
                    (!product.replacedById &&
                        getTTL(product.renewalDate) < 30 &&
                        'border-2 border-red-500 border-opacity-50') ||
                    (!product.replacedById &&
                        getTTL(product.renewalDate) < 90 &&
                        'border-2 border-amber-500 border-opacity-50') ||
                    (product.replacedById && 'opacity-50')
                } `}
            >
                <div className="flex justify-between">
                    <CardHeader className="flex gap-3">
                        {getTypeIcon(product.productTypeId)}
                        {product.name}
                        <p
                            className={`absolute top-3 right-4 ${
                                (!product.replacedById &&
                                    getTTL(product.renewalDate) < 0 &&
                                    'font-bold text-red-500') ||
                                (!product.replacedById &&
                                    getTTL(product.renewalDate) < 30 &&
                                    'text-red-500') ||
                                (!product.replacedById &&
                                    getTTL(product.renewalDate) < 90 &&
                                    'text-amber-500')
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
