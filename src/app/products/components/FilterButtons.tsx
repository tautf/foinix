'use client';

import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { Switch } from '@nextui-org/react';
import { ButtonGroup } from '@nextui-org/button';
import type { ProductType } from '@prisma/client';

import FilterButton from './FilterButton';

type Props = {
    productTypes: ProductType[];
};

export default function FilterButtons({ productTypes }: Props) {
    const router = useRouter();

    const [hideReplaced, setHideReplaced] = useState(true);
    const [currentFilters, setCurrentFilters] = useState<ProductType[]>([]);

    const handleFilterChange = (type: ProductType) => {
        setCurrentFilters((prevFilters) => {
            const typeIndex = prevFilters.findIndex(
                (filter) => filter.id === type.id,
            );
            if (typeIndex !== -1) {
                const updatedFilters = [...prevFilters];
                updatedFilters.splice(typeIndex, 1);
                return updatedFilters;
            } else {
                return [...prevFilters, { ...type }];
            }
        });
    };

    const toggleHideReplaced = (isSelected: boolean) => {
        setHideReplaced(isSelected);
    };

    useEffect(() => {
        let path = '';
        if (currentFilters.length > 0) {
            path = `/products?types=${currentFilters
                .map((filter) => filter.name.toLowerCase())
                .join(',')}&hideReplaced=${hideReplaced}`;
            router.replace(path);
        } else {
            path = `/products?hideReplaced=${hideReplaced}`;
            router.replace(path);
        }
    }, [currentFilters, router, hideReplaced]);

    return (
        <div className="flex justify-between">
            <Switch
                className="mr-5 ml-auto sm:order-2"
                size="sm"
                defaultSelected
                color="default"
                onValueChange={toggleHideReplaced}
            >
                Hide replaced
            </Switch>
            <ButtonGroup className="hidden sm:block ml-5">
                {productTypes.map((type: ProductType) => (
                    <FilterButton
                        key={type.id}
                        type={type}
                        handleFilterChange={handleFilterChange}
                    ></FilterButton>
                ))}
            </ButtonGroup>
        </div>
    );
}
