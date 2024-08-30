"use client";

import { useSession } from "next-auth/react";

export default function Projects() {
    const { data: session } = useSession();
    return (
        <div>
            <h1>{session.user?.name}</h1>
            <p>PROJECT LIST</p>
        </div>
    );
}
