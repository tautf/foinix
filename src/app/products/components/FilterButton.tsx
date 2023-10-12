'use client';
import React, { useState } from 'react';
import { Button } from '@nextui-org/button';

import type { ProductType } from '@prisma/client';

type Props = {
    type: ProductType;
    handleFilterChange: (type: ProductType) => void;
};
export default function FilterButton({ type, handleFilterChange }: Props) {
    const [active, setActive] = useState(false);

    const handleClick = () => {
        setActive(!active);
        handleFilterChange(type);
    };

    return (
        <Button
            name={type.name}
            className={'transition ease-in hover:scale-105'}
            variant={active ? 'solid' : 'bordered'}
            key={type.id}
            size="sm"
            onClick={handleClick}
        >
            {type.name}
        </Button>
    );
}
