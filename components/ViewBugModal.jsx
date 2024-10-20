import { AiOutlineClose } from "react-icons/ai";

import { getTimeAndDate } from "@lib/timeDateConversor";

export default function ViewBugModal({ selectedBug, setToggleModalViewBug }) {
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
                        <p className="modal_text">{selectedBug.description}</p>
                    </p>
                </div>
            </div>
        </div >
    );
};