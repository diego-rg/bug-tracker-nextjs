"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Link from "next/link";

import { getDate } from "@lib/timeDateConversor";

import BugForm from "@components/BugForm";

export default function Bugs({ params }) {
    const { data: session } = useSession();
    const [bugs, setBugs] = useState([]);
    const [toggleModal, setToggleModal] = useState(false);
    const [submitting, setIsSubmitting] = useState(false);
    const [info, setInfo] = useState(null);

    const fetchBugs = async () => {
        const response = await fetch(`/api/users/${session?.user.id}/projects/${params.projectId}/bugs`);
        const data = await response.json();
        setBugs(data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setInfo("");
        try {
            const formData = new FormData(e.currentTarget);
            const response = await fetch(`/api/users/${session?.user.id}/projects/${params.projectId}/bugs`, {
                method: "POST",
                body: formData
            });
            const data = await response.json();

            if (!response.ok) {
                setInfo(data.message);
                return;
            }
            setInfo("Project created.");
            if (session?.user.id) fetchBugs();
        } catch (error) {
            console.log(error);
            setInfo("Unnexpected error. Try again later.");
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        if (session?.user.id) fetchBugs();
    }, [session?.user.id]);

    return (
        <div>
            <h1>{session?.user?.name}</h1>
            <div>
                <button className="btn_main" onClick={() => setToggleModal((prev) => !prev)}>
                    <h2>Create a new bug</h2>
                    <p>NEW BUG LOGO</p>
                </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 justify-items-center">
                {bugs.length > 0 ?
                    (bugs.map((bug) => (
                        <Link className="card_container_project" href={`/api/users/${session.user.id}/projects/${params.projectId}/bugs/${bugs._id}`} key={bug._id}>
                            <h2 className="card_title">{bug.name}</h2>
                            <p className="card_list">Status: {bug.status}</p>
                            <p className="card_list">Priority: {bug.priority}</p>
                            <p className="card_list">Severity: {bug.severity}</p>
                            <p className="card_list">Created: {getDate(bug.createdAt)}</p>
                        </Link>
                    ))) : (
                        <p>No bugs!</p>
                    )
                }
            </div>
            {toggleModal &&
                <BugForm
                    setToggleModal={setToggleModal}
                    submitting={submitting}
                    handleSubmit={handleSubmit}
                    info={info}
                />
            }
        </div>
    );
}
