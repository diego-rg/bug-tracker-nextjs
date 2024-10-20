import { getDate } from "@lib/timeDateConversor";

import { RiDeleteBin2Line, RiEdit2Line } from "react-icons/ri";

export default function BugCard({ bug, setSelectedBug, setToggleModalViewBug, setToggleModalEditBug, setToggleModalDeleteBug }) {
    return (
        <div className="card">
            <h2 className="card_title">{bug.name}</h2>
            <p className="card_list">Status: {bug.status}</p>
            <p className="card_list">Priority: {bug.priority}</p>
            <p className="card_list">Severity: {bug.severity}</p>
            <p className="card_list">Created: {getDate(bug.createdAt)}</p>
            <div className="flex justify-between pt-2">
                <button onClick={() => { setSelectedBug(bug); setToggleModalViewBug((prev) => !prev); }} type="button" className="btn_small_primary">
                    View
                </button>
                <button onClick={() => { setSelectedBug(bug); setToggleModalEditBug((prev) => !prev); }} type="button" className="btn_small_primary">
                    <RiEdit2Line />
                </button>
                <button onClick={() => { setSelectedBug(bug); setToggleModalDeleteBug((prev) => !prev); }} type="button" className="btn_small_danger">
                    <RiDeleteBin2Line />
                </button>
            </div>
        </div >
    );
}