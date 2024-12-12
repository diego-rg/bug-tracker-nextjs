"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

import Pagination from "@components/Pagination";
import Loader from "@components/Loader";
import ProjectCard from "@components/ProjectCard";
import CreateProjectModal from "@components/CreateProjectModal";
import DeleteProjectModal from "@components/DeleteProjectModal";
import EditProjectModal from "@components/EditProjectModal";
import SidebarDesktop from "@components/SidebarDesktop";
import SidebarMobile from "@components/SidebarMobile";
import { CgMoon, CgSun } from "react-icons/cg";
import { MdOutlineArrowBack } from "react-icons/md";

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

    //Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = projects.length > 1 ? projects.slice(indexOfFirstItem, indexOfLastItem) : [];
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const fetchProjects = async () => {
        setInfo(<Loader />);
        const response = await fetch(`/api/users/${session?.user.id}/projects/search?q=${term}`);
        const data = await response.json();
        if (data.status != 200) {
            setInfo(data.message);
        }
        setCurrentPage(1);
        setProjects(data);
    };

    useEffect(() => {
        const debounce = setTimeout(() => {
            if (session?.user.id) fetchProjects();
        }, 1000);
        return () => clearTimeout(debounce);
    }, [session?.user.id, term]);

    // Dark Mode
    useEffect(() => {
        // If the user has already a saved theme in local storage uses it; if not uses the prefered from the browser; if not set uses light
        if (localStorage.getItem("theme") == "dark" || localStorage.getItem("theme") == "light") {
            setTheme(localStorage.getItem("theme"));
            console.log("Theme set from local storage");
        } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            console.log("Theme set from browser preference");
            setTheme("dark");
            localStorage.setItem("theme", "dark");
        } else {
            console.log("Theme set to default (light)");
            setTheme("light");
            localStorage.setItem("theme", "light");
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
            localStorage.setItem("theme", "dark");
        } else {
            document.querySelector("html").classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [theme]);

    return (
        <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
            <SidebarDesktop session={session} model={"Project"} setToggleModalCreate={setToggleModalCreateProject} />

            <main className="w-full bg-gray-200 dark:bg-gray-950">
                <SidebarMobile session={session} model={"Project"} setToggleModalCreate={setToggleModalCreateProject} />

                <nav className="text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-900 px-5 py-2 sm:py-5 flex justify-between">
                    <div className="flex">
                        <a className="btn_menu mr-2" href="/">
                            <MdOutlineArrowBack size={27} />
                        </a>

                        <div>
                            <label htmlFor="term" className="sr-only">Search</label>
                            <input className='form_input' type='text' placeholder='Search for projects' name="term" id="term" value={term}
                                onChange={handleChange} />
                        </div>
                    </div>

                    <button className="btn_menu" onClick={changeTheme} aria-label="Toggle color mode">
                        {theme == "light" ? <CgSun size={27} /> : <CgMoon size={27} />}
                    </button>
                </nav>

                <div className="card_grid p-2 sm:p-10">
                    {currentItems.length > 0 ?
                        (currentItems.map((project) => (
                            <ProjectCard
                                key={project._id}
                                project={project}
                                setSelectedProject={setSelectedProject}
                                setToggleModalDeleteProject={setToggleModalDeleteProject}
                                setToggleModalEditProject={setToggleModalEditProject}
                            />
                        ))) : (
                            <div className="dark:text-white">{info}</div>
                        )
                    }
                </div>

                <div className="flex justify-center">
                    {projects.length > 10 &&
                        <Pagination
                            itemsPerPage={itemsPerPage}
                            totalItems={projects.length}
                            currentPage={currentPage}
                            paginate={paginate} />
                    }
                </div>

            </main>

            {toggleModalCreateProject &&
                <CreateProjectModal
                    session={session}
                    term={term}
                    setProjects={setProjects}
                    setToggleModalCreateProject={setToggleModalCreateProject}
                />
            }

            {toggleModalEditProject &&
                <EditProjectModal
                    session={session}
                    term={term}
                    setProjects={setProjects}
                    selectedProject={selectedProject}
                    setToggleModalEditProject={setToggleModalEditProject}
                />
            }

            {toggleModalDeleteProject &&
                <DeleteProjectModal
                    session={session}
                    term={term}
                    setProjects={setProjects}
                    selectedProject={selectedProject}
                    setToggleModalDeleteProject={setToggleModalDeleteProject}
                />
            }
        </div>
    );
}
