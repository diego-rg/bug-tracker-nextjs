"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Link from "next/link";

import ProjectForm from "@components/ProjectForm";
import { getDate } from "@lib/timeDateConversor";

export default function Projects() {
    const { data: session } = useSession();
    const [projects, setProjects] = useState([]);
    const [toggleModal, setToggleModal] = useState(false);
    const [submitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const formData = new FormData(e.currentTarget);
            const response = await fetch(`/api/users/${session?.user.id}/projects`, {
                method: "POST",
                body: formData
            });

            if (!response.ok) {
                throw new Error('Failed to submit the data. Please try again.');
            }

            console.log("Project created.");
        } catch (error) {
            setError(error.message);
            console.log(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        const fetchProjects = async () => {
            const response = await fetch(`/api/users/${session?.user.id}/projects`);
            const data = await response.json();
            setProjects(data);
        };

        if (session?.user.id) fetchProjects();
    }, [session?.user.id]);

    return (
        <div>
            <h1>{session?.user?.name}</h1>
            <div>
                <button className="btn_main" onClick={() => setToggleModal((prev) => !prev)}>
                    <h2>Create a new project</h2>
                    <p>NEW PROJECT LOGO</p>
                </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 justify-items-center">
                {projects.map((project) => (
                    <Link className="card_container_project" href={`/api/users/${session.user.id}/projects/${project._id}`} key={project._id}>
                        <h2 className="card_title">{project.name}</h2>
                        <p className="card_list">Admin: {project.admin.username}</p>
                        <p className="card_list">Created: {getDate(project.createdAt)}</p>
                    </Link>
                ))}
            </div>
            {toggleModal &&
                <ProjectForm
                    setToggleModal={setToggleModal}
                    submitting={submitting}
                    handleSubmit={handleSubmit} />
            }
        </div>
    );
}
