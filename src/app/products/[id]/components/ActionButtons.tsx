'use client';

import React, { useState } from 'react';

import { Button } from '@nextui-org/button';
import { ArrowPathIcon, TrashIcon } from '@heroicons/react/24/outline';

import RenewModal from './RenewModal';
import AddModal from '../../components/AddModal';
import type { Product, ProductType } from '@prisma/client';
import {
    addProduct,
    replaceProduct,
    updateProduct,
} from '@/app/actions/products/products';
import { useRouter } from 'next/navigation';

type Props = {
    currentProduct: Product;
    productTypes: ProductType[];
};

export default function ActionButtons({ currentProduct, productTypes }: Props) {
    const router = useRouter();
    const [showRenewModal, setShowRenewModal] = useState(false);
    const [showReplaceModal, setShowReplaceModal] = useState(false);

    const toggleRenewModal = () => {
        setShowRenewModal(!showRenewModal);
    };

    const toggleReplaceModal = () => {
        setShowReplaceModal(!showReplaceModal);
    };

    const handleRenew = async (form: FormData) => {
        await updateProduct({
            id: currentProduct.id,
            renewalDate: new Date(form.get('product-renewal-date') as string),
        });
        toggleRenewModal();
        router.refresh();
    };

    const handleReplace = async (formData: FormData) => {
        try {
            const id = await addProduct(formData);
            await replaceProduct(currentProduct.id, id);

            if (id) {
                router.replace(`/products/${id}`);
            } else {
                alert('Something went wrong');
            }
        } catch (err: any) {
            for (const error of err.errors) {
                alert(error.message);
            }
        }
    };

    return (
        <div className="flex gap-2">
            <Button
                className="bg-indigo-300 text-black px-12"
                variant="shadow"
                onClick={toggleRenewModal}
                startContent={<ArrowPathIcon className="w-5 h-5" />}
            >
                Renew
            </Button>
            <RenewModal
                product={currentProduct}
                renewProduct={handleRenew}
                showModal={showRenewModal}
                closeModal={toggleRenewModal}
            />
            <Button
                className="bg-indigo-300 text-black px-12"
                variant="shadow"
                onClick={toggleReplaceModal}
                startContent={<TrashIcon className="w-5 h-5" />}
            >
                Replace
            </Button>
            <AddModal
                addProduct={handleReplace}
                showModal={showReplaceModal}
                closeModal={toggleReplaceModal}
                productTypes={productTypes}
            />
        </div>
    );
}
