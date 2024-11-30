import { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";

export default function EditProjectModal({ session, term, selectedProject, setToggleModalEditProject, setProjects }) {
    const [submitting, setIsSubmitting] = useState(false);
    const [info, setInfo] = useState("");
    const [dev, setDev] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [selectedOption, setSelectedOption] = useState("");
    const [formData, setFormData] = useState({
        name: selectedProject.name,
    });

    const fetchProjects = async () => {
        const response = await fetch(`/api/users/${session?.user.id}/projects/search?q=${term}`);
        const data = await response.json();
        setProjects(data);
    };

    const fetchDevelopers = async () => {
        const response = await fetch(`/api/users?q=${dev}`);
        const data = await response.json();
        setSuggestions(data);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSearch = (e) => {
        setDev(e.target.value);
    };

    const handleSelect = (e) => {
        setDev(e.currentTarget.innerText);
        setSelectedOption((e.currentTarget.innerText));
        setSuggestions([]);
    };

    useEffect(() => {
        const debounce = setTimeout(() => {
            if (dev.length > 0 && dev != selectedOption)
                fetchDevelopers();
            else
                setSuggestions([]);
        }, 1000);
        return () => clearTimeout(debounce);
    }, [dev]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setInfo("");
        try {
            const formData = new FormData(e.currentTarget);
            const response = await fetch(`/api/users/${session?.user.id}/projects/${selectedProject._id}`, {
                method: "PATCH",
                body: formData
            });
            const data = await response.json();

            if (!response.ok) {
                setInfo(data.message);
                return;
            }
            setInfo(data.message);
            if (session?.user.id) fetchProjects();

            await new Promise(resolve => setTimeout(resolve, 1000));
            setToggleModalEditProject((prev) => !prev);
            setInfo("");
        } catch (error) {
            console.log(error);
            setInfo("Unnexpected error. Try again later.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="modal_container">
            <div className="modal_content">
                <div className="modal_header">
                    <h3 className="modal_title">Edit the project data</h3>
                    <button onClick={() => setToggleModalEditProject((prev) => !prev)} type="button" className="btn_menu">
                        <AiOutlineClose size={24} />
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-4">
                    <div className="pb-4">
                        <label htmlFor="name" className="form_label">Name:</label>
                        <input className='form_input' type='text' placeholder='Name of your project' value={formData.name}
                            onChange={handleChange} name="name" id="name" required />
                    </div>

                    <div className="pb-4">
                        <label htmlFor="developer" className="form_label">Add developer:</label>
                        <input className='form_input' type='email' placeholder='Email of the developer' value={dev}
                            onChange={handleSearch} name="developer" id="developer" />
                        {suggestions.length > 0 && (
                            suggestions.map((sug) => (
                                <p onClick={handleSelect} className="dark:text-white block cursor-pointer" key={sug.email} id={sug.email}>{sug.email}</p>
                            ))
                        )
                        }
                    </div>
                    <div className="pb-4">
                        <p className="form_label">Devs in the project:</p>
                        {selectedProject.developers.length > 0 ?
                            (selectedProject.developers.map((dev) => (
                                <span className="card_list pl-3" key={dev._id}>{dev.email} </span>
                            ))) : (
                                <span className="card_list pl-3">No one</span>
                            )
                        }
                    </div>

                    <div className="dark:text-white">{info}</div>

                    <div className="flex">
                        <button className="btn_success" type='submit' disabled={submitting}>Save project</button>
                        <button className="btn_primary" onClick={() => setToggleModalEditProject((prev) => !prev)} type="button" disabled={submitting}>Close</button>
                    </div>
                </form>
            </div>
        </div >
    );
};