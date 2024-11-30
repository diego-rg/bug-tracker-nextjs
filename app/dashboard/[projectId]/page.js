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
import { CgMoon, CgSun } from "react-icons/cg";
import { MdOutlineArrowBack } from "react-icons/md";

export default function Bugs({ params }) {
    const { data: session } = useSession();
    const [bugs, setBugs] = useState([]);
    const [term, setTerm] = useState("");
    const [formData, setFormData] = useState({
        status: "",
        priority: "",
        severity: ""
    });
    const [info, setInfo] = useState("");
    const [theme, setTheme] = useState("");
    const [selectedBug, setSelectedBug] = useState(null);
    const [toggleModalViewBug, setToggleModalViewBug] = useState(false);
    const [toggleModalCreateBug, setToggleModalCreateBug] = useState(false);
    const [toggleModalEditBug, setToggleModalEditBug] = useState(false);
    const [toggleModalDeleteBug, setToggleModalDeleteBug] = useState(false);

    const fetchBugs = async () => {
        setInfo(<Loader />);
        const response = await fetch(`/api/users/${session?.user.id}/projects/${params.projectId}/bugs/search?q=${term}&status=${formData.status}&priority=${formData.priority}&severity=${formData.severity}`);
        const data = await response.json();
        if (data.status != 200) {
            setInfo(data.message);
        }
        setBugs(data);
    };

    useEffect(() => {
        const debounce = setTimeout(() => {
            if (session?.user.id) fetchBugs();
        }, 1000);
        return () => clearTimeout(debounce);
    }, [session?.user.id, term, formData]);


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

    const handleChangeSelect = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
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
            <SidebarDesktop session={session} model={"Bug"} setToggleModalCreate={setToggleModalCreateBug} />

            <main className="w-full bg-gray-200 dark:bg-gray-950">
                <SidebarMobile session={session} model={"Project"} setToggleModalCreateBug={setToggleModalCreateBug} />

                <nav className="text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-900 px-5 py-2 sm:py-5 flex justify-between">
                    <div className="flex flex-wrap">
                        <a className="btn_menu mr-2" href="/dashboard">
                            <MdOutlineArrowBack size={27} />
                        </a>

                        <div className="m-1">
                            <label htmlFor="status" className="sr-only"> Status</label>
                            <select as="select" id="status" name="status" className="form_input" value={formData.status}
                                onChange={handleChangeSelect}>
                                <option value="" defaultValue>Status</option>
                                <option value="new">New</option>
                                <option value="assigned">Assigned</option>
                                <option value="fixed">Fixed</option>
                            </select>
                        </div>

                        <div className="m-1">
                            <label htmlFor="priority" className="sr-only"> Priority</label>
                            <select as="select" id="priority" name="priority" className="form_input" value={formData.priority}
                                onChange={handleChangeSelect}>
                                <option value="" defaultValue>Priority</option>
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>

                        <div className="m-1">
                            <label htmlFor="severity" className="sr-only">Severity</label>
                            <select as="select" id="severity" name="severity" className="form_input" value={formData.severity}
                                onChange={handleChangeSelect}>
                                <option value="" defaultValue>Severity</option>
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>

                        <div className="m-1">
                            <label htmlFor="term" className="sr-only">Search</label>
                            <input className='form_input' type='text' placeholder='Search for bugs' name="term" id="term" value={term}
                                onChange={handleChange} />
                        </div>
                    </div>

                    <button className="btn_menu m-1" onClick={changeTheme} aria-label="Toggle color mode">
                        {theme == "light" ? <CgSun size={27} /> : <CgMoon size={27} />}
                    </button>
                </nav>

                <div className="card_grid p-2 sm:p-10">
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
                            <div className="dark:text-white">{info}</div>
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
                    term={term}
                    formData={formData}
                    params={params}
                    setToggleModalCreateBug={setToggleModalCreateBug}
                    setBugs={setBugs}
                />
            }

            {toggleModalEditBug &&
                <EditBugModal
                    session={session}
                    params={params}
                    term={term}
                    searchFormData={formData}
                    setToggleModalEditBug={setToggleModalEditBug}
                    setBugs={setBugs}
                    selectedBug={selectedBug}
                />
            }

            {toggleModalDeleteBug &&
                <DeleteBugModal
                    session={session}
                    params={params}
                    term={term}
                    formData={formData}
                    setToggleModalDeleteBug={setToggleModalDeleteBug}
                    setBugs={setBugs}
                    selectedBug={selectedBug}
                />
            }
        </div>
    );
}
