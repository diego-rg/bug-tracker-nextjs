import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

export default function EditBugModal({ session, params, selectedBug, setToggleModalEditBug, setBugs }) {
    const [submitting, setIsSubmitting] = useState(false);
    const [info, setInfo] = useState("");
    const [formData, setFormData] = useState({
        name: selectedBug.name,
        status: selectedBug.status,
        description: selectedBug.description,
        priority: selectedBug.priority,
        severity: selectedBug.severity
    });

    const fetchBugs = async () => {
        const response = await fetch(`/api/users/${session?.user.id}/projects/${params.projectId}/bugs`);
        const data = await response.json();
        setBugs(data);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setInfo("");
        try {
            const formData = new FormData(e.currentTarget);
            const response = await fetch(`/api/users/${session?.user.id}/projects/${params.projectId}/bugs/${selectedBug._id}`, {
                method: "PATCH",
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
            setToggleModalEditBug((prev) => !prev);
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
                    <button onClick={() => setToggleModalEditBug((prev) => !prev)} type="button" className="btn_menu">
                        <AiOutlineClose size={24} />
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-4">
                    <div className="pb-4">
                        <label htmlFor="name" className="form_label">Name:</label>
                        <input className='form_input' type='text' placeholder='Name of the bug' name="name" id="name" value={formData.name}
                            onChange={handleChange} required />
                    </div>

                    <div className="pb-4">
                        <label htmlFor="description" className="form_label">Description:</label>
                        <textarea as="textarea" rows="5" name="description" id="description" type="text" className="form_input" value={formData.description}
                            onChange={handleChange} />
                    </div>

                    <div className="pb-4">
                        <label htmlFor="status" className="form_label"> Status: </label>
                        <select as="select" id="status" name="status" className="form_input" value={formData.status}
                            onChange={handleChange}>
                            <option value="" disabled defaultValue hidden> Select...</option>
                            <option value="new">New</option>
                            <option value="assigned">Assigned</option>
                            <option value="fixed">Fixed</option>
                        </select>
                    </div>

                    <div className="pb-4">
                        <label htmlFor="priority" className="form_label"> Priority: </label>
                        <select as="select" id="priority" name="priority" className="form_input" value={formData.priority}
                            onChange={handleChange}>
                            <option value="" disabled defaultValue hidden> Select...</option>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>

                    <div className="pb-4">
                        <label htmlFor="severity" className="form_label">Severity: </label>
                        <select as="select" id="severity" name="severity" className="form_input" value={formData.severity}
                            onChange={handleChange}>
                            <option value="" disabled defaultValue hidden> Select... </option>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>

                    <div className="pb-4">
                        <label htmlFor="assignedTo" className="form_label">Add developer:</label>
                        <input className='form_input' type='email' placeholder='Email of the developer' name="assignedTo" id="assignedTo" />
                    </div>
                    <div className="pb-4">
                        <p className="form_label">Devs working in the bug:</p>
                        {selectedBug.assignedTo.length > 0 ?
                            (selectedBug.assignedTo.map((dev) => (
                                <span className="card_list pl-3" key={dev._id}>{dev.email} </span>
                            ))) : (
                                <span className="card_list pl-3">No one</span>
                            )
                        }
                    </div>

                    <div className="text-white">{info}</div>

                    <div className="flex">
                        <button className="btn_success" type='submit' disabled={submitting}>Save bug</button>
                        <button className="btn_primary" onClick={() => setToggleModalEditBug((prev) => !prev)} type="button" disabled={submitting}>Close</button>
                    </div>
                </form>
            </div>
        </div >
    );
};