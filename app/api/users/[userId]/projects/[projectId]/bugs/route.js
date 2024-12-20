import Project from "@models/project";
import User from "@models/user";
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
        const bugs = await Bug.find({ project: project }).populate("createdBy").populate("assignedTo");

        if (!bugs)
            return new Response(JSON.stringify({ message: "The requested project does not have bugs." }), { status: 200 });

        return new Response(JSON.stringify(bugs), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ message: "Error fetching the project data. " + error }), { status: 500, });
    }
};

export const POST = async (request, { params }) => {
    try {
        await connectToDatabase();
        const session = await getServerSession(authConfig);

        // Si o user non é admin ou developer, non ten acceso ao proxecto (por si pega id na url)
        const user = await User.findById(session.user.id);
        const project = await Project.findById(params.projectId).populate("admin", "developers");
        if (project.admin._id.toString() !== user._id.toString() && !project.developers.toString().includes(user)) {
            return new Response(JSON.stringify({ message: "Your profile does not have access to this resource." }), { status: 403 });
        }

        const data = await request.formData();
        const name = data.get("name");
        const description = data.get("description");
        const priority = data.get("priority");
        const severity = data.get("severity");

        const checkName = await Bug.find({ name, project });
        if (checkName.length > 0) {
            return new Response(JSON.stringify({ message: "Bug name already in use." }), { status: 500, });
        }

        const bug = new Bug({ name, description, priority, severity, createdBy: user, project });
        const saveBug = await bug.save();

        if (!saveBug)
            return new Response(JSON.stringify({ message: "Error while saving the bug data." }), { status: 500 });

        return new Response(JSON.stringify({ message: "New bug created succesfully." }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ message: "Error during the bug creation. " + error }), { status: 500, });
    }
};