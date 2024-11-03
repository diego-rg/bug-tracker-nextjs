"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";

import { FaGithub, FaUserCircle } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { VscDebug } from "react-icons/vsc";

const Login = () => {
    const { data: session } = useSession();
    const router = useRouter();
    const [theme, setTheme] = useState("");

    useEffect(() => {
        if (session?.user)
            router.push('/dashboard');
    }, [session]);

    // Dark Mode
    useEffect(() => {
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            setTheme("dark");
        } else {
            setTheme("light");
        }
    }, []);

    useEffect(() => {
        if (theme == "dark") {
            document.querySelector("html").classList.add("dark");
        } else {
            document.querySelector("html").classList.remove("dark");
        }
    }, [theme]);

    return (
        <div className="flex justify-center items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900 bg-[url('../public/images/login.png')]">
            <div className="flex flex-col h-full min-w-fit md:w-1/5 items-center bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 
      dark:border-gray-700 justify-center p-6 md:p-10">
                <div className="w-full">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-xl font-semibold text-gray-700 dark:text-gray-200">Login</h1>
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

                    <button onClick={() => signIn("credentials", { username: "Guest", password: "123", callbackUrl: '/dashboard' })} className="btn_signIn cursor-pointer">
                        <span className="text-gray-700 dark:text-gray-200">
                            <FaUserCircle size={20} />
                        </span>
                        <span className="pl-2 text-md font-bold">Continue as Guest</span>
                    </button>

                    <button onClick={() => signIn("google", { callbackUrl: '/dashboard' })} className="btn_signIn cursor-pointer">
                        <span className="text-gray-700 dark:text-gray-200">
                            <FcGoogle size={20} />
                        </span>
                        <span className="pl-2 text-md font-bold">Sign in with Google</span>
                    </button>

                    <button onClick={() => signIn("github", { callbackUrl: '/dashboard' })} className="btn_signIn cursor-pointer">
                        <span className="text-gray-700 dark:text-gray-200">
                            <FaGithub size={20} />
                        </span>
                        <span className="pl-2 text-md font-bold">Sign in with Github</span>
                    </button>

                    <p className="mt-8 text-right">
                        <Link href="/" className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline">
                            Back to Homepage
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;