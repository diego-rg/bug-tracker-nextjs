import Link from "next/link";
import { LiaArrowDownSolid } from "react-icons/lia";

export default function Hero() {
    return (
        <main className="px-6 pt-14 max-w-2xl py-12 text-center">
            <header>
                <h1 className="text-3xl lg:text-6xl font-bold tracking-tight text-gray-900">
                    Track bugs during web development process
                </h1>
                <p className="mt-6 text-md lg:text-lg leading-8 text-gray-600">
                    Create projects to manage the information about issues, add other users to your projects and assign tasks to save time and make software development easier.
                </p>
            </header>

            <div className="mt-10 flex items-center justify-center">
                <Link href="#features" className="btn_main">
                    Learn More
                    <span className="pl-2 pt-1" aria-hidden="true"><LiaArrowDownSolid /></span>
                </Link>
            </div>
        </main>
    );
}
