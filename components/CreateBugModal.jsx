import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

export default function CreateBugModal({ session, term, formData, params, setToggleModalCreateBug, setBugs }) {
    const [submitting, setIsSubmitting] = useState(false);
    const [info, setInfo] = useState("");

    const fetchBugs = async () => {
        const response = await fetch(`/api/users/${session?.user.id}/projects/${params.projectId}/bugs/search?q=${term}&status=${formData.status}&priority=${formData.priority}&severity=${formData.severity}`);
        const data = await response.json();
        setBugs(data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setInfo("");
        try {
            const formData = new FormData(e.currentTarget);
            const response = await fetch(`/api/users/${session?.user.id}/projects/${params.projectId}/bugs`, {
                method: "POST",
                body: formData
            });
            const data = await response.json();

            if (!response.ok) {
                setInfo(data.message);
                return;
            }
            setInfo(data.message);
            if (session?.user.id) fetchBugs();

            await new Promise(resolve => setTimeout(resolve, 1000));
            setToggleModalCreateBug((prev) => !prev);
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
                    <h3 className="modal_title">Fill the bug data</h3>
                    <button onClick={() => setToggleModalCreateBug((prev) => !prev)} type="button" className="btn_menu">
                        <AiOutlineClose size={24} />
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-4">
                    <div className="pb-4">
                        <label htmlFor="name" className="form_label">Name:</label>
                        <input className='form_input' type='text' placeholder='Name of the bug' name="name" id="name" required />
                    </div>

                    <div className="pb-4">
                        <label htmlFor="description" className="form_label">Description:</label>
                        <textarea as="textarea" rows="5" name="description" id="description" type="text" className="form_input" />
                    </div>

                    <div className="pb-4">
                        <label htmlFor="priority" className="form_label"> Priority: </label>
                        <select as="select" id="priority" name="priority" className="form_input">
                            <option value="" disabled defaultValue hidden> Select...</option>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>

                    <div className="pb-4">
                        <label htmlFor="severity" className="form_label">Severity: </label>
                        <select as="select" id="severity" name="severity" className="form_input">
                            <option value="" disabled defaultValue hidden> Select... </option>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>

                    <div className="dark:text-white">{info}</div>
                    <div className="flex">
                        <button className="btn_success" type='submit' disabled={submitting}>Save bug</button>
                        <button className="btn_primary" onClick={() => setToggleModalCreateBug((prev) => !prev)} type="button" disabled={submitting}>Close</button>
                    </div>
                </form>
            </div>
        </div >
    );
};