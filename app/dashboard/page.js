"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

import Loader from "@components/Loader";
import ProjectCard from "@components/ProjectCard";
import CreateProjectModal from "@components/CreateProjectModal";
import DeleteProjectModal from "@components/DeleteProjectModal";
import EditProjectModal from "@components/EditProjectModal";
import SidebarDesktop from "@components/SidebarDesktop";
import SidebarMobile from "@components/SidebarMobile";
import { CgMoon, CgSun } from "react-icons/cg";

export default function Projects() {
    const { data: session } = useSession();
    const [info, setInfo] = useState("");
    const [theme, setTheme] = useState("");
    const [term, setTerm] = useState("");
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [toggleModalCreateProject, setToggleModalCreateProject] = useState(false);
    const [toggleModalEditProject, setToggleModalEditProject] = useState(false);
    const [toggleModalDeleteProject, setToggleModalDeleteProject] = useState(false);

    const fetchProjects = async () => {
        setInfo(<Loader />);
        const response = await fetch(`/api/users/${session?.user.id}/projects`);
        const data = await response.json();
        if (data.status != 200) {
            setInfo(data.message);
        }
        setProjects(data);
    };

    useEffect(() => {
        if (session?.user.id) fetchProjects();
    }, [session?.user.id]);

    // Dark Mode
    useEffect(() => {
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            setTheme("dark");
        } else {
            setTheme("light");
        }
    }, []);

    const changeTheme = () => {
        setTheme(theme == "light" ? "dark" : "light");
    };

    //Search
    const handleChange = (e) => {
        setTerm(e.target.value
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, ""));
    };

    useEffect(() => {
        if (theme == "dark") {
            document.querySelector("html").classList.add("dark");
        } else {
            document.querySelector("html").classList.remove("dark");
        }
    }, [theme]);

    return (
        <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
            <SidebarDesktop session={session} model={"Project"} setToggleModalCreate={setToggleModalCreateProject} />

            <main className="w-full bg-gray-200 dark:bg-gray-950">
                <SidebarMobile session={session} model={"Project"} setToggleModalCreate={setToggleModalCreateProject} />

                <nav className="text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-900 px-5 py-2 sm:py-5 flex justify-between">
                    <div>
                        <label htmlFor="term" className="sr-only">Search</label>
                        <input className='form_input' type='text' placeholder='Search for projects' name="term" id="term" value={term}
                            onChange={handleChange} />
                    </div>

                    <button className="btn_menu" onClick={changeTheme} aria-label="Toggle color mode">
                        {theme == "light" ? <CgSun size={27} /> : <CgMoon size={27} />}
                    </button>
                </nav>

                <div className="card_grid p-2 sm:p-10">
                    {projects.length > 0 ?
                        (projects.filter(
                            (project) =>
                            (project.name
                                .toLowerCase()
                                .normalize("NFD")
                                .replace(/[\u0300-\u036f]/g, "")
                                .includes(term))
                        ).map((project) => (
                            <ProjectCard
                                key={project._id}
                                project={project}
                                setSelectedProject={setSelectedProject}
                                setToggleModalDeleteProject={setToggleModalDeleteProject}
                                setToggleModalEditProject={setToggleModalEditProject}
                            />
                        ))) : (
                            <div>{info}</div>
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
