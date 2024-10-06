"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

import ProjectCard from "@components/ProjectCard";
import ProjectForm from "@components/ProjectForm";

export default function Projects() {
    const { data: session } = useSession();
    const [projects, setProjects] = useState([]);
    const [toggleModal, setToggleModal] = useState(false);
    const [submitting, setIsSubmitting] = useState(false);
    const [info, setInfo] = useState(null);

    const fetchProjects = async () => {
        const response = await fetch(`/api/users/${session?.user.id}/projects`);
        const data = await response.json();
        setProjects(data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setInfo("");
        try {
            const formData = new FormData(e.currentTarget);
            const response = await fetch(`/api/users/${session?.user.id}/projects`, {
                method: "POST",
                body: formData
            });
            const data = await response.json();

            if (!response.ok) {
                setInfo(data.message);
                return;
            }
            setInfo("Project created.");
            if (session?.user.id) fetchProjects();
        } catch (error) {
            console.log(error);
            setInfo("Unnexpected error. Try again later.");
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
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
            <main className="card_grid">
                {projects.length > 0 ?
                    (projects.map((project) => (
                        <ProjectCard project={project} key={project._id} />
                    ))) : (
                        <p>No projects!</p>
                    )
                }
            </main>
            {toggleModal &&
                <ProjectForm
                    setToggleModal={setToggleModal}
                    submitting={submitting}
                    handleSubmit={handleSubmit}
                    info={info}
                />
            }
        </div>
    );
}
