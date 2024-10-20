import Link from "next/link";
import { getDate } from "@lib/timeDateConversor";

import { RiDeleteBin2Line, RiEdit2Line } from "react-icons/ri";

export default function ProjectCard({ project, setSelectedProject, setToggleModalEditProject, setToggleModalDeleteProject }) {
    return (
        <div className="card">
            <h2 className="card_title">{project.name}</h2>
            <p className="card_list">Admin: {project.admin.username}</p>
            <p className="card_list">Created: {getDate(project.createdAt)}</p>
            <div className="flex justify-between pt-2">
                <Link href={`/dashboard/${project._id}`} className="btn_small_primary">
                    Open
                </Link>
                <button onClick={() => { setSelectedProject(project); setToggleModalEditProject((prev) => !prev); }} type="button" className="btn_small_primary">
                    <RiEdit2Line />
                </button>
                <button onClick={() => { setSelectedProject(project); setToggleModalDeleteProject((prev) => !prev); }} type="button" className="btn_small_danger">
                    <RiDeleteBin2Line />
                </button>
            </div>
        </div >
    );
}