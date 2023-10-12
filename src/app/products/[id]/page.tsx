import React from 'react';

import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/card';
import { Divider } from '@nextui-org/divider';
import dayjs from 'dayjs';

import BackHomeButton from '../components/BackHomeButton';

import {
    ArrowPathIcon,
    ComputerDesktopIcon,
    CommandLineIcon,
    ServerIcon,
    DevicePhoneMobileIcon,
    CpuChipIcon,
    WrenchIcon,
} from '@heroicons/react/24/outline';

import { getProductById } from '@/app/actions/products/products';
import ActionButtons from './components/ActionButtons';
import { getProductTypes } from '@/app/actions/product-type/product-types';

export const revalidate = 3600;

export default async function Product(params: { params: { id: string } }) {
    const productTypes = await getProductTypes();
    const product = await getProductById(Number(params.params['id']));

    const getTypeIcon = (typeId: number) => {
        switch (typeId) {
            case 1:
                return <ComputerDesktopIcon className="w-7 h-7" />;
            case 2:
                return <CommandLineIcon className="w-7 h-7" />;
            case 3:
                return <ServerIcon className="w-7 h-7" />;
            case 4:
                return <ArrowPathIcon className="w-7 h-7" />;
            case 5:
                return <DevicePhoneMobileIcon className="w-7 h-7" />;
            case 6:
                return <CpuChipIcon className="w-7 h-7" />;
            default:
                return <WrenchIcon className="w-7 h-7" />;
        }
    };

    return (
        <div className="mx-auto m-10 xl:mt-32 max-w-screen-lg">
            <BackHomeButton />
            <Card className="w-full">
                <CardHeader className="flex gap-3">
                    {getTypeIcon(product.productTypeId)}
                    <div className="flex flex-col">
                        <p className="text-lg font-bold text-indigo-300">
                            {product.name}
                        </p>
                        {product.description && (
                            <p className="text-small text-default-500">
                                {product.description}
                            </p>
                        )}
                    </div>
                </CardHeader>
                <Divider />
                <CardBody>
                    {product.replacedById && (
                        <p className="text-red-500">
                            Product got replaced by Id {product.replacedById}
                        </p>
                    )}
                    {product.cmdb_link && (
                        <a href={product.cmdb_link!} className="underline">
                            {product.cmdb_link}
                        </a>
                    )}
                    <h2>
                        To replace on{' '}
                        {dayjs(product.renewalDate).format('DD.MM.YYYY')}
                    </h2>
                    <hr />
                    <p>
                        Created at:{' '}
                        {dayjs(product.createdAt).format('DD.MM.YYYY HH:mm')}
                    </p>
                    <p>
                        Updated at:{' '}
                        {dayjs(product.updatedAt).format('DD.MM.YYYY HH:mm')}
                    </p>
                </CardBody>
                <Divider />
                <CardFooter>
                    <ActionButtons
                        productTypes={productTypes}
                        currentProduct={product}
                    />
                </CardFooter>
            </Card>
        </div>
    );
}
