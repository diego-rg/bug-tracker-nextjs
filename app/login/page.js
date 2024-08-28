"use client";

import { CgMoon, CgSun } from "react-icons/cg";
import { FaGithub, FaUserCircle } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { VscDebug } from "react-icons/vsc";
import { useEffect, useState } from "react";
import { signIn, useSession, getProviders } from "next-auth/react";
import Link from "next/link";
import { useRouter } from 'next/navigation';

export default function Login() {
    const { data: session } = useSession();
    const [providers, setProviders] = useState(null);
    const router = useRouter();

    if (session)
        router.push(`dashboard/${session.user?.name}`);

    useEffect(() => {
        const setUpProviders = async () => {
            const response = await getProviders();
            setProviders(response);
        };
        setUpProviders();
    }, []);

    const providerIcons = {
        Google: <FcGoogle size={20} />,
        GitHub: <FaGithub size={20} />
    };

    const darkMode = false;

    return (
        <div className="flex justify-center items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900 bg-[url('../public/images/login.png')]">
            <div className="flex flex-col h-full min-w-fit md:w-1/5 items-center bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 
      dark:border-gray-700 justify-center p-6 md:p-10">
                <div className="w-full">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-xl font-semibold text-gray-700 dark:text-gray-200">Login</h1>
                        <button className="btn-menu" aria-label="Toggle color mode">
                            {darkMode ? <CgSun size={27} /> : <CgMoon size={27} />}
                        </button>
                    </div>

                    <div className="flex justify-center items-center text-2xl font-bold text-gray-800 dark:text-gray-200 pt-8 pb-2">
                        <span className="text-purple-700 dark:text-purple-500">
                            <VscDebug size={27} />
                        </span>
                        <span className="mr-2 ml-3">Bug Tracker</span>
                    </div>
                    <div className="flex justify-center items-center text-md font-semibold text-gray-800 dark:text-gray-200 pb-8 pt-2">
                        <span className="mr-2 ml-3">Track issues during development</span>
                    </div>

                    <Link className="btn_signIn cursor-pointer" href="#">
                        <span className="text-gray-700 dark:text-gray-200">
                            <FaUserCircle size={20} />
                        </span>
                        <span className="pl-2 text-md font-bold">Continue as Guest</span>
                    </Link>

                    {providers && Object.values(providers).map((provider) => (
                        <button type="button" key={provider.name} onClick={() => signIn(provider.id)}
                            className="btn_signIn cursor-pointer">
                            <span className="text-gray-700 dark:text-gray-200">
                                {providerIcons[provider.name]}
                            </span>
                            <span className="pl-2 text-md font-bold">Sign in with {`${provider.name}`}</span>
                        </button>
                    ))
                    }
                </div>
            </div>
        </div>
    );
};
