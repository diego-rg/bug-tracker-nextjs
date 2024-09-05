import React from "react";

import { AiOutlineClose } from "react-icons/ai";


const BugForm = ({ setToggleModal, submitting, handleSubmit }) => {
    return (
        <div className="modal_container">
            <div className="modal_content">
                <div className="modal_header">
                    <h3 className="modal_title">Fill the project data</h3>
                    <button onClick={() => setToggleModal((prev) => !prev)} type="button" className="btn-menu">
                        <AiOutlineClose size={24} />
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-4">
                    <div className="pb-4">
                        <label htmlFor="name" className="form_label">Name:</label>
                        <input className='form_input' type='text' placeholder='Name of your project' name="name" id="name" required />
                    </div>
                    <div className="flex">
                        <button className="btn_signIn" type='submit' disabled={submitting}>Save project</button>
                        <button className="btn_signIn" onClick={() => setToggleModal((prev) => !prev)} type="button" disabled={submitting}>Close</button>
                    </div>
                </form>

            </div>
        </div >
    );
};

export default BugForm;