"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

import ProjectCard from "@components/ProjectCard";
import CreateProjectModal from "@components/CreateProjectModal";
import DeleteProjectModal from "@components/DeleteProjectModal";
import EditProjectModal from "@components/EditProjectModal";
import SidebarDesktop from "@components/SidebarDesktop";
import SidebarMobile from "@components/SidebarMobile";

export default function Projects() {
    const { data: session } = useSession();
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [toggleModalCreateProject, setToggleModalCreateProject] = useState(false);
    const [toggleModalEditProject, setToggleModalEditProject] = useState(false);
    const [toggleModalDeleteProject, setToggleModalDeleteProject] = useState(false);

    const fetchProjects = async () => {
        const response = await fetch(`/api/users/${session?.user.id}/projects`);
        const data = await response.json();
        setProjects(data);
    };

    useEffect(() => {
        if (session?.user.id) fetchProjects();
    }, [session?.user.id]);

    return (
        <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
            <SidebarDesktop session={session} model={"Project"} setToggleModalCreate={setToggleModalCreateProject} />

            <main className="w-full bg-gray-200 dark:bg-gray-950">
                <SidebarMobile session={session} model={"Project"} setToggleModalCreate={setToggleModalCreateProject} />

                <div className="card_grid p-2 sm:p-10">
                    {projects.length > 0 ?
                        (projects.map((project) => (
                            <ProjectCard
                                key={project._id}
                                project={project}
                                setSelectedProject={setSelectedProject}
                                setToggleModalDeleteProject={setToggleModalDeleteProject}
                                setToggleModalEditProject={setToggleModalEditProject}
                            />
                        ))) : (
                            <p>No projects!</p>
                        )
                    }
                </div>
            </main>

            {toggleModalCreateProject &&
                <CreateProjectModal
                    session={session}
                    setProjects={setProjects}
                    setToggleModalCreateProject={setToggleModalCreateProject}
                />
            }

            {toggleModalEditProject &&
                <EditProjectModal
                    session={session}
                    setProjects={setProjects}
                    selectedProject={selectedProject}
                    setToggleModalEditProject={setToggleModalEditProject}
                />
            }

            {toggleModalDeleteProject &&
                <DeleteProjectModal
                    session={session}
                    setProjects={setProjects}
                    selectedProject={selectedProject}
                    setToggleModalDeleteProject={setToggleModalDeleteProject}
                />
            }
        </div>
    );
}
