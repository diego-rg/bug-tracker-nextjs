"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

import Loader from "@components/Loader";
import BugCard from "@components/BugCard";
import ViewBugModal from "@components/ViewBugModal";
import DeleteBugModal from "@components/DeleteBugModal";
import CreateBugModal from "@components/CreateBugModal";
import EditBugModal from "@components/EditBugModal";
import SidebarDesktop from "@components/SidebarDesktop";
import SidebarMobile from "@components/SidebarMobile";

export default function Bugs({ params }) {
    const { data: session } = useSession();
    const [bugs, setBugs] = useState([]);
    const [info, setInfo] = useState("");
    const [selectedBug, setSelectedBug] = useState(null);
    const [toggleModalViewBug, setToggleModalViewBug] = useState(false);
    const [toggleModalCreateBug, setToggleModalCreateBug] = useState(false);
    const [toggleModalEditBug, setToggleModalEditBug] = useState(false);
    const [toggleModalDeleteBug, setToggleModalDeleteBug] = useState(false);

    const fetchBugs = async () => {
        setInfo(<Loader />);
        const response = await fetch(`/api/users/${session?.user.id}/projects/${params.projectId}/bugs`);
        const data = await response.json();
        if (data.status != 200) {
            setInfo(data.message);
        }
        setBugs(data);
    };

    useEffect(() => {
        if (session?.user.id) fetchBugs();
    }, [session?.user.id]);

    return (
        <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
            <SidebarDesktop session={session} model={"Bug"} setToggleModalCreate={setToggleModalCreateBug} />

            <main className="w-full bg-gray-200 dark:bg-gray-700 p-2 sm:p-10">
                <SidebarMobile session={session} model={"Project"} setToggleModalCreateBug={setToggleModalCreateBug} />

                <div className="card_grid">
                    {bugs.length > 0 ?
                        (bugs.map((bug) => (
                            <BugCard
                                key={bug._id}
                                bug={bug}
                                session={session}
                                params={params}
                                setSelectedBug={setSelectedBug}
                                setToggleModalViewBug={setToggleModalViewBug}
                                setToggleModalEditBug={setToggleModalEditBug}
                                setToggleModalDeleteBug={setToggleModalDeleteBug} />
                        ))) : (
                            <div>{info}</div>
                        )
                    }
                </div>
            </main>

            {toggleModalViewBug &&
                <ViewBugModal
                    session={session}
                    params={params}
                    setToggleModalViewBug={setToggleModalViewBug}
                    selectedBug={selectedBug}
                />
            }

            {toggleModalCreateBug &&
                <CreateBugModal
                    session={session}
                    params={params}
                    setToggleModalCreateBug={setToggleModalCreateBug}
                    setBugs={setBugs}
                />
            }

            {toggleModalEditBug &&
                <EditBugModal
                    session={session}
                    params={params}
                    setToggleModalEditBug={setToggleModalEditBug}
                    setBugs={setBugs}
                    selectedBug={selectedBug}
                />
            }

            {toggleModalDeleteBug &&
                <DeleteBugModal
                    session={session}
                    params={params}
                    setToggleModalDeleteBug={setToggleModalDeleteBug}
                    setBugs={setBugs}
                    selectedBug={selectedBug}
                />
            }
        </div>
    );
}
