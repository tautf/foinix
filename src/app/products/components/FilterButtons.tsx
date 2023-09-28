"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { ButtonGroup } from "@nextui-org/button";
import type { ProductType } from "@prisma/client";

import FilterButton from "./FilterButton";

type Props = {
  productTypes: ProductType[];
};

export default function FilterButtons({ productTypes }: Props) {
  const router = useRouter();

  const [currentFilters, setCurrentFilters] = useState<ProductType[]>([]);

  const handleFilterChange = (type: ProductType) => {
    setCurrentFilters((prevFilters) => {
      const typeIndex = prevFilters.findIndex(
        (filter) => filter.id === type.id
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

  useEffect(() => {
    let path = "";
    if (currentFilters.length > 0) {
      path = `/products?types=${currentFilters
        .map((filter) => filter.name.toLowerCase())
        .join(",")}`;
      router.replace(path);
    } else {
      path = "/products";
      router.replace(path);
    }
  }, [currentFilters, router]);

  return (
    <ButtonGroup className="ml-5">
      {productTypes.map((type: ProductType) => (
        <FilterButton
          key={type.id}
          type={type}
          handleFilterChange={handleFilterChange}
        ></FilterButton>
      ))}
    </ButtonGroup>
  );
}
