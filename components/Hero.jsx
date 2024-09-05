import Link from "next/link";
import { LiaArrowDownSolid } from "react-icons/lia";

export default function Hero() {
    return (
        <header className="px-6 pt-14 max-w-2xl py-12 text-center">
            <h1 className="text-3xl lg:text-6xl font-bold tracking-tight text-gray-900">
                Track bugs during web development process
            </h1>
            <p className="mt-6 text-md lg:text-lg leading-8 text-gray-600">
                Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet
                fugiat veniam occaecat fugiat aliqua.
            </p>
            <div className="mt-10 flex items-center justify-center">
                <Link href="#features" className="btn_main">
                    Learn More
                    <span className="pl-2 pt-1" aria-hidden="true"><LiaArrowDownSolid /></span>
                </Link>
            </div>
        </header>
    );
}
