'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@nextui-org/react';
import { HomeIcon } from '@heroicons/react/24/outline';

export default function BackHomeButton() {
    return (
        <Link href="/">
            <Button
                className="bg-gradient-to-r from-indigo-500 to-indigo-700 text-black float-right lg:px-12 px-6 py-2 my-10"
                variant="shadow"
                startContent={<HomeIcon className="w-5 h-5" />}
            >
                {window?.innerWidth > 1024 ? 'Home' : ''}
            </Button>
        </Link>
    );
}
