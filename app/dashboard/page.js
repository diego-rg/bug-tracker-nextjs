"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Dashboard() {
    const { data: session } = useSession();

    return (
        <div className="bg_home">
            <section className="min-h-screen flex justify-evenly items-center" id="hero">
                <Link href={`/dashboard/${session?.user.id}`} className="flex rounded-md bg-purple-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm 
                            hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600">
                    Projects
                </Link>
                <Link href="/" className="flex rounded-md bg-purple-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm 
                            hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600">
                    Homepage
                </Link>
                <button type="button" onClick={() => signOut({ callbackUrl: '/' })} className="flex justify-center rounded-md bg-purple-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm 
                                hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600">
                    Log Out
                </button>
            </section>
        </div>
    );
}
