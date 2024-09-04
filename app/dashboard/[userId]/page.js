"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Link from "next/link";

import ProjectForm from "@components/ProjectForm";

export default function Projects() {
    const { data: session } = useSession();
    const [projects, setProjects] = useState([]);
    const [toggleModal, setToggleModal] = useState(false);
    const [submitting, setIsSubmitting] = useState(false);
    const [project, setProject] = useState({ name: "", admin: "" });

    const createProject = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const response = await fetch(`/api/users/${session?.user.id}/projects`, {
                method: "POST",
                body: JSON.stringify({
                    name: project.name,
                    admin: session?.user.id,
                }),
            });

            if (response.ok) {
                console.log("Project created.");
            }
        } catch (error) {
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
                <button className="btn_signIn" onClick={() => setToggleModal((prev) => !prev)}>
                    <h2>Create a new project</h2>
                    <p>NEW PROJECT LOGO</p>
                </button>
                {projects.map((project) => (
                    <Link className="btn_signIn" href={`/api/users/${session.user.id}/projects/${project._id}`} key={project._id}>
                        <h2>{project.name}</h2>
                        <p>{project.admin}</p>
                    </Link>
                ))}
            </div>
            {toggleModal &&
                <ProjectForm
                    setToggleModal={setToggleModal}
                    project={project}
                    setProject={setProject}
                    submitting={submitting}
                    handleSubmit={createProject} />
            }
        </div>
    );
}
