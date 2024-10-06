import Link from "next/link";
import { getDate } from "@lib/timeDateConversor";

export default function ProjectCard({ project }) {
    return (
        <Link className="card" href={`/dashboard/${project._id}`} >
            <h2 className="card_title">{project.name}</h2>
            <p className="card_list">Admin: {project.admin.username}</p>
            <p className="card_list">Created: {getDate(project.createdAt)}</p>
        </Link>
    );
}