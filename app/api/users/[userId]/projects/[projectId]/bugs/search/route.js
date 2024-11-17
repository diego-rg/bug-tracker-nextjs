import User from "@models/user";
import Project from "@models/project";
import Bug from "@models/bug";
import { connectToDatabase } from "@lib/connectToDatabase";
import { getServerSession } from "next-auth/next";
import { authConfig } from '@lib/authConfig';

export const GET = async (request, { params }) => {
    try {
        await connectToDatabase();
        const session = await getServerSession(authConfig);

        // Si o user non é admin ou developer, non ten acceso ao proxecto (por si pega id na url)
        const user = await User.findById(session.user.id);
        const project = await Project.findById(params.projectId).populate("admin").populate("developers");
        if (project.admin._id.toString() !== user._id.toString() && !project.developers.toString().includes(user)) {
            return new Response(JSON.stringify({ message: "Your profile does not have access to this resource." }), { status: 403 });
        }

        const filters = {};
        const term = request.nextUrl.searchParams.get("q");
        if (request.nextUrl.searchParams.get("status").length > 0)
            filters.status = request.nextUrl.searchParams.get("status");
        if (request.nextUrl.searchParams.get("priority").length > 0)
            filters.priority = request.nextUrl.searchParams.get("priority");
        if (request.nextUrl.searchParams.get("severity").length > 0)
            filters.severity = request.nextUrl.searchParams.get("severity");

        console.log(filters);

        const bugs = await Bug.find({ project, name: new RegExp(term, "gi"), ...filters }).populate("createdBy").populate("assignedTo");

        if (bugs.length == 0)
            return new Response(JSON.stringify({ message: "No bugs found." }), { status: 200 });

        return new Response(JSON.stringify(bugs), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ message: "Error fetching the bugs data. " + error }), { status: 500, });
    }
};