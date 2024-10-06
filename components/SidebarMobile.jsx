"use client";


import { RiBookOpenLine, RiQuestionLine, RiLogoutBoxLine, RiArrowGoBackFill } from "react-icons/ri";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { signOut } from "next-auth/react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { VscDebug, VscMenu } from "react-icons/vsc";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

export default function SidebarMobile({ session, model, setToggleModalCreate }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="sm:hidden inset-x-0 top-0 z-30 bg-gray-900">
            {/* NAV MOBILE */}
            <nav aria-label="Global" className="flex items-center justify-between p-2">
                <div className="flex lg:flex-1">
                    {/* LOGO */}
                    <Link href="/" className="flex m-1.5 p-1.5 text-purple-600">
                        <span className="sr-only">Bug Tracker</span>
                        <VscDebug className="size-5 lg:size-7 xl:size-9" />
                    </Link>
                </div>
                {session?.user &&
                    <p className="mt-2 text-center text-sm text-gray-900 dark:text-white">{session?.user?.name}</p>
                }
                {/* BUTTON: OPEN SIDEBAR MOBILE */}
                <div className="flex xl:hidden">
                    <button type="button" onClick={() => setMobileMenuOpen(true)}
                        className="m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
                        <span className="sr-only">Open sidebar menu</span>
                        <VscMenu className="size-6" aria-hidden="true" />
                    </button>
                </div>
            </nav>

            {/* MOBILE SIDEBAR MENU*/}
            <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="sm:hidden">
                <div className="fixed inset-0 z-30" />
                <DialogPanel className="fixed inset-y-0 right-0 z-30 w-full overflow-y-auto bg-gray-900 p-2">
                    <div className="flex items-center justify-between">
                        {/* LOGO: INSIDE SIDEBAR MENU */}
                        <Link href="/" className="flex m-1.5 p-1.5 text-purple-600">
                            <span className="sr-only">Bug Tracker</span>
                            <VscDebug className="size-5 lg:size-9" />
                        </Link>
                        {/* BUTTON: CLOSE DROPDOWN MOBILE */}
                        <button type="button" onClick={() => setMobileMenuOpen(false)}
                            className="m-2.5 rounded-md p-2.5 text-gray-700">
                            <span className="sr-only">Close main menu</span>
                            <AiOutlineClose className="size-6" aria-hidden="true" />
                        </button>
                    </div>
                    {/* MENU ITEMS MOBILE DROPDOWN MENU */}
                    <div className="mt-2 flow-root">
                        <ul>
                            <li className="relative p-3">
                                <button className="btn_sidebar btn_menu" onClick={() => { setToggleModalCreate((prev) => !prev); setMobileMenuOpen(false); }}>
                                    <MdOutlineCreateNewFolder size={40} />
                                    <span>Create {model}</span>
                                </button>
                            </li>

                            {model == "Project" ? (
                                <li className="relative p-3">
                                    <a className="btn_sidebar btn_menu" href="/">
                                        <RiArrowGoBackFill size={40} />
                                        <span>Go Back</span>
                                    </a>
                                </li>
                            ) : (
                                <li className="relative p-3">
                                    <a className="btn_sidebar btn_menu" href="/dashboard">
                                        <RiArrowGoBackFill size={40} />
                                        <span>Go Back</span>
                                    </a>
                                </li>
                            )
                            }

                            <li className="relative p-3">
                                <a className="btn_sidebar btn_menu" href="https://github.com/diego-rg/bug-tracker-nextjs">
                                    <RiBookOpenLine size={40} />
                                    <span>Documentation</span>
                                </a>
                            </li>

                            <li className="relative p-3">
                                <a className="btn_sidebar btn_menu" href="https://diego-rg.vercel.app">
                                    <RiQuestionLine size={40} />
                                    <span>About</span>
                                </a>
                            </li>

                            <li className="relative p-3">
                                <button type="button" onClick={() => signOut({ callbackUrl: '/' })} className="btn_sidebar btn_menu">
                                    <RiLogoutBoxLine size={40} />
                                    <span>Log out</span>
                                </button>
                            </li>
                        </ul>
                    </div>
                </DialogPanel>
            </Dialog>
        </header >
    );
}
