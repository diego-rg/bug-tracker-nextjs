"use client";

import { RiBookOpenLine, RiQuestionLine, RiLogoutBoxLine, RiArrowGoBackFill } from "react-icons/ri";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { VscDebug } from "react-icons/vsc";
import { signOut } from "next-auth/react";

export default function SidebarDesktop({ session, model, setToggleModalCreate }) {
    return (
        <div className="hidden sm:block py-4 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-900">
            <a className="flex justify-center items-center text-lg font-bold text-gray-900 dark:text-gray-200" href="/">
                <span className="text-purple-700 dark:text-purple-500">
                    <VscDebug size={20} />
                </span>
                <span className="mr-3 ml-1">Bug Tracker</span>
            </a>

            {session?.user &&
                <div className="mt-6 text-center">
                    <img className="w-5 inline" alt="User profile picture" src={session?.user?.image} />
                    <p className="text-center text-sm text-gray-900 dark:text-white">{session?.user?.name}</p>
                </div>
            }

            <ul className="mt-10">
                <li className="relative px-6 py-6">
                    <button className="btn_sidebar btn_menu" onClick={() => setToggleModalCreate((prev) => !prev)}>
                        <MdOutlineCreateNewFolder size={40} />
                        <span>Create {model}</span>
                    </button>
                </li>

                {model == "Project" ? (
                    <li className="relative px-6 py-6">
                        <a className="btn_sidebar btn_menu" href="/">
                            <RiArrowGoBackFill size={40} />
                            <span>Go Back</span>
                        </a>
                    </li>
                ) : (
                    <li className="relative px-6 py-6">
                        <a className="btn_sidebar btn_menu" href="/dashboard">
                            <RiArrowGoBackFill size={40} />
                            <span>Go Back</span>
                        </a>
                    </li>
                )
                }

                <li className="relative px-6 py-6">
                    <a className="btn_sidebar btn_menu" href="https://github.com/diego-rg/bug-tracker-nextjs">
                        <RiBookOpenLine size={40} />
                        <span>Documentation</span>
                    </a>
                </li>

                <li className="relative px-6 py-6">
                    <a className="btn_sidebar btn_menu" href="https://diego-rg.vercel.app">
                        <RiQuestionLine size={40} />
                        <span>About</span>
                    </a>
                </li>

                <li className="relative px-6 py-6">
                    <button type="button" onClick={() => signOut({ callbackUrl: '/' })} className="btn_sidebar btn_menu">
                        <RiLogoutBoxLine size={40} />
                        <span>Log out</span>
                    </button>
                </li>
            </ul>
        </div>
    );
};