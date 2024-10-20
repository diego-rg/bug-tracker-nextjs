import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

export default function CreateProjectModal({ session, setToggleModalCreateProject, setProjects }) {
    const [submitting, setIsSubmitting] = useState(false);
    const [info, setInfo] = useState("");

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
            setInfo(data.message);
            if (session?.user.id) fetchProjects();

            await new Promise(resolve => setTimeout(resolve, 1000));
            setToggleModalCreateProject((prev) => !prev);
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
                    <h3 className="modal_title">Fill the project data</h3>
                    <button onClick={() => setToggleModalCreateProject((prev) => !prev)} type="button" className="btn_menu">
                        <AiOutlineClose size={24} />
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-4">
                    <div className="pb-4">
                        <label htmlFor="name" className="form_label">Name:</label>
                        <input className='form_input' type='text' placeholder='Name of your project' name="name" id="name" required />
                    </div>
                    <div className="text-white">{info}</div>
                    <div className="flex">
                        <button className="btn_success" type='submit' disabled={submitting}>Save project</button>
                        <button className="btn_primary" onClick={() => setToggleModalCreateProject((prev) => !prev)} type="button" disabled={submitting}>Close</button>
                    </div>
                </form>
            </div>
        </div >
    );
};