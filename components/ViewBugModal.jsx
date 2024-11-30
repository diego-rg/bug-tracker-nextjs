import { useState, useEffect } from "react";

import { AiOutlineClose } from "react-icons/ai";
import Loader from "@components/Loader";

import { getTimeAndDate } from "@lib/timeDateConversor";

export default function ViewBugModal({ session, params, selectedBug, setToggleModalViewBug }) {
    const [submitting, setIsSubmitting] = useState(false);
    const [info, setInfo] = useState("");
    const [comments, setComments] = useState([]);

    const fetchComments = async () => {
        setInfo(<Loader />);
        const response = await fetch(`/api/users/${session?.user.id}/projects/${params.projectId}/bugs/${selectedBug._id}/comments`);
        const data = await response.json();
        if (data.status != 200) {
            setInfo(data.message);
        }
        setComments(data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setInfo("");
        try {
            const formData = new FormData(e.currentTarget);
            const response = await fetch(`/api/users/${session?.user.id}/projects/${params.projectId}/bugs/${selectedBug._id}/comments`, {
                method: "POST",
                body: formData
            });
            const data = await response.json();

            if (!response.ok) {
                setInfo(data.message);
                return;
            }
            setInfo(data.message);
            if (session?.user.id) fetchComments();

            setInfo("");
        } catch (error) {
            console.log(error);
            setInfo("Unnexpected error. Try again later.");
        } finally {
            const form = document.getElementById("commentForm");
            form.reset();
            setIsSubmitting(false);
        }
    };


    useEffect(() => {
        if (session?.user.id) fetchComments();
    }, [session?.user.id]);

    return (
        <div className="modal_container">
            <div className="modal_content">
                <div className="modal_header">
                    <h3 className="modal_title">{selectedBug.name}</h3>
                    <button onClick={() => setToggleModalViewBug((prev) => !prev)} type="button" className="btn_menu">
                        <AiOutlineClose size={24} />
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>
                <div className="p-4">
                    <p className="modal_description">Status:
                        <span className="modal_text">{selectedBug.status}</span>
                    </p>
                    <p className="modal_description">Priority:
                        <span className="modal_text">{selectedBug.priority}</span>
                    </p>
                    <p className="modal_description">Severity:
                        <span className="modal_text">{selectedBug.severity}</span>
                    </p>
                    <p className="modal_description">Created by:
                        <span className="modal_text">{selectedBug.createdBy.email}</span>
                    </p>
                    <p className="modal_description">Assigned to:
                        {selectedBug.assignedTo.length > 0 ?
                            (selectedBug.assignedTo.map((dev) => (
                                <span className="modal_text" key={dev._id}>{dev.email} </span>
                            ))) : (
                                <span className="modal_text">No one</span>
                            )
                        }
                    </p>
                    <p className="modal_description">Creation date:
                        <span className="modal_text">{getTimeAndDate(selectedBug.createdAt)}</span>
                    </p>
                    <p className="modal_description">Description:
                        <span className="modal_text">{selectedBug.description}</span>
                    </p>

                    <div className="modal_description pt-4 max-h-40vh">Comments:
                        <ul className="modal_description px-4">
                            {comments.length > 0 ?
                                (comments.map((comment) => (
                                    <li className="modal_text list-disc p-0" key={comment._id}>
                                        <span className="modal_description_comment block">{comment.user.email} ( {getTimeAndDate(comment.createdAt)}): </span>
                                        {comment.content}
                                    </li>
                                ))) : (
                                    <span className="modal_text">No coments for now.</span>
                                )
                            }
                        </ul>
                    </div>

                    <form onSubmit={handleSubmit} id="commentForm" className="px-4">
                        <div className="pb-4">
                            <textarea as="textarea" rows="3" name="content" id="content" type="text" className="form_input" />
                        </div>

                        <div className="dark:text-white">{info}</div>
                        <div className="flex justify-end">
                            <button className="btn_small_primary" type='submit' disabled={submitting}>Comment</button>
                        </div>
                    </form>
                </div>
            </div>
        </div >
    );
};