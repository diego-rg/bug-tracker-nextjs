"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

export default function Projects() {
    const { data: session } = useSession();
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            const response = await fetch(`/api/users/${session?.user.id}/projects`);
            const data = await response.json();
            setProjects(data);
        };

        if (session?.user.id) fetchProjects();
    }, [session?.user.id]);

    return (
        <div>
            <h1>{session.user?.name}</h1>
            <div>
                {projects.map((project) => (
                    <div key={project._id} className="relative pl-9">
                        <h2>{project.name}</h2>
                        <p>{project.admin}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
