import Link from 'next/link';
import { LiaHomeSolid } from "react-icons/lia";

export default function NotFound() {
    return (
        <section className="bg_home h-screen flex justify-center items-center">
            <div className='text-center'>
                <h2 className="text-xl lg:text-2xl font-semibold leading-7 text-purple-600">Not Found!</h2>
                <p className="my-6 text-md lg:text-lg leading-8 text-gray-900">Could not find the requested resource.</p>
                <div className="mt-10 flex items-center justify-center">
                    <Link href="/" className="w-fit flex rounded-md bg-purple-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm 
                            hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600">
                        Return to homepage
                        <span className="pl-2 pt-1" aria-hidden="true"><LiaHomeSolid /></span>
                    </Link>
                </div>
            </div>
        </section>
    );
}