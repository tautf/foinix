'use client';

import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { Input } from '@nextui-org/input';
import { ButtonGroup } from '@nextui-org/button';
import { Switch } from '@nextui-org/switch';
import type { ProductType } from '@prisma/client';

import FilterButton from './FilterButton';

type Props = {
    productTypes: ProductType[];
};

export default function FilterButtons({ productTypes }: Props) {
    const router = useRouter();

    const [hideReplaced, setHideReplaced] = useState(true);
    const [currentProductTypeFilters, setCurrentProductTypeFilters] = useState<
        ProductType[]
    >([]);
    const [currentProductFilters, setCurrentProductFilters] =
        useState<string>('');

    const handleFilterChange = (type: ProductType) => {
        setCurrentProductTypeFilters((prevFilters) => {
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

    const handleInputChange = (e: any) => {
        const value = e.target.value;
        setCurrentProductFilters(value);
    };

    useEffect(() => {
        let path = '';
        if (currentProductTypeFilters.length > 0) {
            path = `/products?types=${currentProductTypeFilters
                .map((filter) => filter.name.toLowerCase())
                .join(
                    ',',
                )}&hideReplaced=${hideReplaced}&filter=${currentProductFilters}`;
            router.replace(path);
        } else {
            path = `/products?hideReplaced=${hideReplaced}&filter=${currentProductFilters}`;
            router.replace(path);
        }
    }, [
        currentProductTypeFilters,
        currentProductFilters,
        router,
        hideReplaced,
    ]);

    return (
        <>
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
            <Input
                className="m-5 w-100"
                type="text"
                size="sm"
                placeholder="Search for products..."
                onChange={handleInputChange}
            />
        </>
    );
}
