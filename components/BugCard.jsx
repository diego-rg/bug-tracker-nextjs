import Link from "next/link";
import { getTimeAndDate } from "@lib/timeDateConversor";

export default function BugCard({ bug, session, params }) {
    return (
        <Link className="card" href={`/api/users/${session.user.id}/projects/${params.projectId}/bugs/${bug._id}`} >
            <h2 className="card_title">{bug.name}</h2>
            <p className="card_list">Status: {bug.status}</p>
            <p className="card_list">Priority: {bug.priority}</p>
            <p className="card_list">Severity: {bug.severity}</p>
            <p className="card_list">Created: {getTimeAndDate(bug.createdAt)}</p>
        </Link>
    );
}