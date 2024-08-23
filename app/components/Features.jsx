import Image from "next/image";
import { MdOutlineCreateNewFolder, MdOutlineAddBox, MdBugReport } from "react-icons/md";

export default function Features() {
    const features = [{
        name: 'Create projects.',
        description:
            'Manage several independent projects that are visible only to you and your team.',
        icon: MdOutlineCreateNewFolder,
    }, {
        name: 'Add developers.',
        description: 'Invite any other user as developer using his email direction.',
        icon: MdOutlineAddBox,
    }, {
        name: 'Assign and track bugs.',
        description: 'Create, update, remove and keep the status of each bug updated.',
        icon: MdBugReport,
    },
    ];
    return (
        <section className="px-6 pt-14 lg:px-8">
            {/* FEATURES SECTION */}
            <div className="overflow-hidden py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                        <div className="lg:pr-8 lg:pt-4">
                            <div className="lg:max-w-lg">
                                <h2 className="text-base font-semibold leading-7 text-purple-600">Save time</h2>
                                <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Bug Tracker</p>
                                <p className="mt-6 text-lg leading-8 text-gray-600">Web app to track bugs during web development process.</p>
                                <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                                    {features.map((feature) => (
                                        <div key={feature.name} className="relative pl-9">
                                            <dt className="inline font-semibold text-gray-900">
                                                <feature.icon aria-hidden="true" className="absolute left-1 top-1 h-5 w-5 text-purple-600" />
                                                {feature.name}
                                            </dt>{' '}
                                            <dd className="inline">{feature.description}</dd>
                                        </div>
                                    ))}
                                </dl>
                            </div>
                        </div>
                        <div className="lg:max-w-lg overflow-hidden lg:overflow-visible">
                            <Image alt="Product screenshot" src="/images/product-image.svg" width={1907} height={945}
                                className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
