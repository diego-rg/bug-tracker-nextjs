"use client";

import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { VscDebug, VscMenu } from "react-icons/vsc";
import { LiaArrowRightSolid } from "react-icons/lia";
import { RxExit } from "react-icons/rx";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { AiOutlineClose } from "react-icons/ai";

const navigation = [
    { name: "Guide", href: "#" },
    { name: "Code", href: "https://github.com/diego-rg/bug-tracker-nextjs" },
    { name: "Credits", href: "https://github.com/diego-rg/bug-tracker-nextjs/blob/main/credits.md" },
    { name: "About", href: "https://diego-rg.vercel.app/" },
];

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { data: session } = useSession();

    return (
        <header className="absolute inset-x-0 top-0 z-50 xl:px-16 xl:py-5">
            {/* NAV */}
            <nav aria-label="Global" className="flex items-center justify-between px-4 py-4 xl:py-0 xl:px-8">
                <div className="flex lg:flex-1">
                    {/* LOGO: DESKTOP AND MOBILE */}
                    <Link href="/" className="flex m-1.5 p-1.5 text-purple-600">
                        <span className="sr-only">Bug Tracker</span>
                        <VscDebug className="size-5 lg:size-7 xl:size-9" />
                        <h1 className="px-1 text-md lg:text-2xl xl:text-3xl font-bold">BugTracker</h1>
                    </Link>
                </div>
                {/* BUTTON: OPEN DROPDOWN MOBILE */}
                <div className="flex xl:hidden">
                    <button type="button" onClick={() => setMobileMenuOpen(true)}
                        className="m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
                        <span className="sr-only">Open main menu</span>
                        <VscMenu className="size-6" aria-hidden="true" />
                    </button>
                </div>
                {/* MENU ITEMS DESKTOP */}
                <div className="hidden xl:flex xl:gap-x-12">
                    {navigation.map((item) => (
                        <Link key={item.name} href={item.href} className="text-lg font-semibold leading-6 text-gray-700 hover:text-purple-600">
                            {item.name}
                        </Link>
                    ))}
                </div>
                <div className="hidden xl:flex xl:flex-1 xl:justify-end">
                    {session?.user ?
                        (<div className="hidden lg:flex lg:flex-1 lg:justify-end">
                            <Link href="/dashboard" className="mx-2 flex justify-center rounded-md bg-purple-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm 
                            hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600">
                                Dashboard
                                <span className="pl-2 pt-1" aria-hidden="true"><VscDebug /></span>
                            </Link>
                            <button type="button" onClick={() => signOut({ callbackUrl: '/' })} className="mx-2 flex justify-center rounded-md bg-red-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm 
                                hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">
                                Log Out
                                <span className="pl-2 pt-1" aria-hidden="true"><RxExit /></span>
                            </button>
                        </div>)
                        : (<Link href="/api/auth/signin" className="flex justify-center rounded-md bg-purple-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm 
                            hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600">
                            Log In
                            <span className="pl-2 pt-1" aria-hidden="true"><LiaArrowRightSolid /></span>
                        </Link>)}
                </div>
            </nav>

            {/* MOBILE DROPDOWN MENU*/}
            <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="xl:hidden">
                <div className="fixed inset-0 z-50" />
                <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-4 py-4 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        {/* LOGO: INSIDE DROPDOWN MENU */}
                        <Link href="/" className="flex m-1.5 p-1.5 text-purple-600">
                            <span className="sr-only">Bug Tracker</span>
                            <VscDebug className="size-5 lg:size-9" />
                            <h1 className="px-1 text-md lg:text-3xl font-bold">BugTracker</h1>
                        </Link>
                        {/* BUTTON: CLOSE DROPDOWN MOBILE */}
                        <button type="button" onClick={() => setMobileMenuOpen(false)}
                            className="m-2.5 rounded-md p-2.5 text-gray-700">
                            <span className="sr-only">Close main menu</span>
                            <AiOutlineClose className="size-6" aria-hidden="true" />
                        </button>
                    </div>
                    {/* MENU ITEMS MOBILE DROPDOWN MENU */}
                    <div className="mt-6 flow-root">
                        <div className="divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6 px-3.5">
                                {navigation.map((item) => (
                                    <Link key={item.name} href={item.href} className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-100">
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                            <div className="py-6">
                                {session?.user ?
                                    (<div className="py-6">
                                        <Link href="/dashboard" className="w-full m-2 flex justify-center rounded-md bg-purple-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm 
                            hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600">
                                            Dashboard
                                            <span className="pl-2 pt-1" aria-hidden="true"><VscDebug /></span>
                                        </Link>
                                        <button type="button" onClick={() => signOut({ callbackUrl: '/' })} className="w-full m-2 flex justify-center rounded-md bg-red-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm 
                                hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">
                                            Log Out
                                            <span className="pl-2 pt-1" aria-hidden="true"><RxExit /></span>
                                        </button>
                                    </div>)
                                    : (<Link href="/api/auth/signin" className="w-full flex justify-center rounded-md bg-purple-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm 
                            hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600">
                                        Log In
                                        <span className="pl-2 pt-1" aria-hidden="true"><LiaArrowRightSolid /></span>
                                    </Link>)}
                            </div>
                        </div>
                    </div>
                </DialogPanel>
            </Dialog>
        </header>
    );
}
