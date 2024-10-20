import Image from "next/image";
import Link from "next/link";
import { MdOutlineCreateNewFolder, MdOutlineAddBox, MdBugReport } from "react-icons/md";

export default function Features() {
    const features = [{
        name: 'Create projects. ',
        description:
            'Manage several independent projects that are visible only to you and your team.',
        icon: MdOutlineCreateNewFolder,
    }, {
        name: 'Add developers. ',
        description: 'Invite any other user as developer using his email direction.',
        icon: MdOutlineAddBox,
    }, {
        name: 'Assign and track bugs. ',
        description: 'Create, update, remove and keep the status of each bug updated.',
        icon: MdBugReport,
    },
    ];
    return (
        <div className="h-100 max-w-screen-xl flex mt-auto p-6">
            <div className="lg:pr-6">
                <header>
                    <p className="text-xl lg:text-2xl font-semibold leading-7 text-purple-600">Save time</p>
                    <h2 className="mt-2 text-2xl lg:text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Bug Tracker</h2>
                    <p className="mt-6 text-lg lg:text-xl leading-8 text-gray-600">Web app to track bugs during web development process.</p>
                </header>
                <dl className="mt-10 max-w-xl space-y-8 text-md lg:text-lg leading-7 text-gray-600 lg:max-w-none">
                    {features.map((feature) => (
                        <div key={feature.name} className="relative pl-9">
                            <dt className="inline font-semibold text-gray-900">
                                <feature.icon aria-hidden="true" className="absolute left-1 top-1 h-5 w-5 text-purple-600" />
                                {feature.name}
                            </dt>
                            <dd className="inline">{feature.description}</dd>
                        </div>
                    ))}
                </dl>
                <p className="mt-6 text-md lg:text-lg leading-8 text-gray-600 text-center lg:text-end">
                    ...sounds Good?
                    <Link href="/dashboard" className="mx-2 inline-flex underline font-bold text-gray-700 hover:scale-105">
                        Start now!
                    </Link>
                </p>
            </div>
            <div className="hidden lg:flex lg:pl-6">
                <Image alt="Product screenshot" src="/images/product-image.svg" width={500} height={500} />
            </div>
        </div>
    );
}
