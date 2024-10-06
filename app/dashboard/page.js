"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

import ProjectCard from "@components/ProjectCard";
import ProjectForm from "@components/ProjectForm";
import SidebarDesktop from "@components/SidebarDesktop";

export default function Projects() {
    const { data: session } = useSession();
    const [projects, setProjects] = useState([]);
    const [toggleModalCreateProject, setToggleModalCreateProject] = useState(false);
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
        <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
            <SidebarDesktop session={session} model={"Project "} setToggleModalCreate={setToggleModalCreateProject} />

            <main className="w-full bg-gray-200 dark:bg-gray-700 p-2 sm:p-10">
                <div className="card_grid">
                    {projects.length > 0 ?
                        (projects.map((project) => (
                            <ProjectCard project={project} key={project._id} />
                        ))) : (
                            <p>No projects!</p>
                        )
                    }
                </div>
            </main>

            {toggleModalCreateProject &&
                <ProjectForm
                    setToggleModalCreateProject={setToggleModalCreateProject}
                    submitting={submitting}
                    handleSubmit={handleSubmit}
                    info={info}
                />
            }
        </div>
    );
}
