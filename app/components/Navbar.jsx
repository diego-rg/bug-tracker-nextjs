'use client';

import { useState } from 'react';
import { Dialog, DialogPanel } from '@headlessui/react';
import { VscDebug, VscMenu } from "react-icons/vsc";
import Link from 'next/link';

const navigation = [
    { name: 'Product', href: '#' },
    { name: 'Features', href: '#' },
    { name: 'Marketplace', href: '#' },
    { name: 'Company', href: '#' },
];

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="absolute inset-x-0 top-0 z-50 lg:px-16 lg:py-5">
            {/* NAV */}
            <nav aria-label="Global" className="flex items-center justify-between px-2 lg:px-8">
                <div className="flex lg:flex-1">
                    {/* LOGO: DESKTOP AND MOBILE */}
                    <Link href="/" className="flex m-1.5 p-1.5">
                        <span className="sr-only">Bug Tracker</span>
                        <VscDebug className=" size-5 lg:size-7 xl:size-9" />
                        <h1 className="px-1 text-md lg:text-2xl xl:text-3xl font-semibold">BugTracker</h1>
                    </Link>
                </div>
                {/* BUTTON: OPEN DROPDOWN MOBILE */}
                <div className="flex lg:hidden">
                    <button type="button" onClick={() => setMobileMenuOpen(true)}
                        className="m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
                        <span className="sr-only">Open main menu</span>
                        <VscMenu className="size-6" aria-hidden="true" />
                    </button>
                </div>
                {/* MENU ITEMS DESKTOP */}
                <div className="hidden lg:flex lg:gap-x-12">
                    {navigation.map((item) => (
                        <Link key={item.name} href={item.href} className="text-md font-semibold leading-6 text-gray-900">
                            {item.name}
                        </Link>
                    ))}
                </div>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    <a href="#" className="text-sm font-semibold leading-6 text-gray-900">Log in
                        <span aria-hidden="true">&rarr;</span>
                    </a>
                </div>
            </nav>

            {/* MOBILE DROPDOWN MENU*/}
            <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
                <div className="fixed inset-0 z-50" />
                <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        {/* LOGO: INSIDE DROPDOWN MENU */}
                        <Link href="/" className="flex m-1.5 p-1.5">
                            <span className="sr-only">Bug Tracker</span>
                            <VscDebug className=" size-5 lg:size-9" />
                            <h1 className="px-1 text-md lg:text-3xl font-semibold">BugTracker</h1>
                        </Link>
                        {/* BUTTON: CLOSE DROPDOWN MOBILE */}
                        <button type="button" onClick={() => setMobileMenuOpen(false)}
                            className="m-2.5 rounded-md p-2.5 text-gray-700">
                            <span className="sr-only">Close main menu</span>
                            <VscMenu className="size-6" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6">
                                {navigation.map((item) => (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                    >
                                        {item.name}
                                    </a>
                                ))}
                            </div>
                            <div className="py-6">
                                <a
                                    href="#"
                                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    Log in
                                </a>
                            </div>
                        </div>
                    </div>
                </DialogPanel>
            </Dialog>
        </header>
    );
}
