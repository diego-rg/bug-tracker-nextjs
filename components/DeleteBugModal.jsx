import { useState } from "react";

import { AiOutlineClose, AiOutlineWarning } from "react-icons/ai";

export default function DeleteBugModal({ session, params, selectedBug, setToggleModalDeleteBug, setBugs }) {
    const [submitting, setIsSubmitting] = useState(false);
    const [info, setInfo] = useState(null);

    const fetchBugs = async () => {
        const response = await fetch(`/api/users/${session?.user.id}/projects/${params.projectId}/bugs`);
        const data = await response.json();
        setBugs(data);
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        setInfo("");
        try {
            const response = await fetch(`/api/users/${session?.user.id}/projects/${params.projectId}/bugs/${selectedBug._id}`, {
                method: "DELETE"
            });
            const data = await response.json();

            if (!response.ok) {
                setInfo(data.message);
                return;
            }
            setInfo(data.message);
            if (session?.user.id) fetchBugs();

            await new Promise(resolve => setTimeout(resolve, 1000));
            setToggleModalDeleteBug((prev) => !prev);
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
                    <button onClick={() => setToggleModalDeleteBug((prev) => !prev)} type="button" className="btn_menu">
                        <AiOutlineClose size={24} />
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>

                <div className="p-4">
                    <p className="modal_description">This bug will be deleted and its data lost. Do you wish to proceed?</p>

                    <div className="text-white p-1">{info}</div>

                    <button onClick={() => setToggleModalDeleteBug((prev) => !prev)} type="button" disabled={submitting} className="btn_primary">
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