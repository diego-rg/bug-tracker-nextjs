import { useState } from "react";

import { AiOutlineClose, AiOutlineWarning } from "react-icons/ai";

export default function DeleteProjectModal({ session, term, selectedProject, setToggleModalDeleteProject, setProjects }) {
    const [submitting, setIsSubmitting] = useState(false);
    const [info, setInfo] = useState(null);

    const fetchProjects = async () => {
        const response = await fetch(`/api/users/${session?.user.id}/projects/search?q=${term}`);
        const data = await response.json();
        setProjects(data);
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        setInfo("");
        try {
            const response = await fetch(`/api/users/${session?.user.id}/projects/${selectedProject._id}`, {
                method: "DELETE"
            });
            const data = await response.json();

            if (!response.ok) {
                setInfo(data.message);
                return;
            }
            setInfo(data.message);
            if (session?.user.id) fetchProjects();

            await new Promise(resolve => setTimeout(resolve, 1000));
            setToggleModalDeleteProject((prev) => !prev);
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
                    <h3 className="modal_title flex">
                        <span className="pr-2 pt-0.5 text-red-600">
                            <AiOutlineWarning size={24} />
                        </span>
                        Important!</h3>
                    <button onClick={() => setToggleModalDeleteProject((prev) => !prev)} type="button" className="btn_menu">
                        <AiOutlineClose size={24} />
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>

                <div className="p-4">
                    <p className="modal_description">This project will be deleted and its data lost. Do you wish to proceed?</p>

                    <div className="dark:text-white p-1">{info}</div>

                    <button onClick={() => setToggleModalDeleteProject((prev) => !prev)} type="button" disabled={submitting} className="btn_primary">
                        No, go back
                    </button>
                    <button onClick={handleSubmit} type="button" disabled={submitting} className="btn_danger">
                        Yes, delete it
                    </button>
                </div>
            </div>
        </div>
    );
};