import User from "@models/user";
import Project from "@models/project";
import { connectToDatabase } from "@lib/connectToDatabase";
import { getServerSession } from "next-auth/next";
import { authConfig } from '@lib/authConfig';

export const GET = async (request, { params }) => {
    try {
        await connectToDatabase();

        // Verificamos que o usuario que sae nos params da request e o mismo que o da session. INNECESARIO??? BUG en proyectos compartidos
        const session = await getServerSession(authConfig);
        if (session.user.id !== params.userId) {
            return new Response(JSON.stringify({ message: "Your profile does not have access to this resource." }), { status: 403 });
        }

        const user = await User.findById(session.user.id);
        const projects = await Project.find({ $or: [{ admin: user }, { developers: user }] }).populate("admin").populate("developers");

        return new Response(JSON.stringify(projects), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ message: "Error fetching the user data. " + error }), { status: 500, });
    }
};

export const POST = async (request, { params }) => {
    try {
        await connectToDatabase();

        // Verificamos que o usuario que sae nos params da request e o mismo que o da session. INNECESARIO???
        const session = await getServerSession(authConfig);
        if (session.user.id !== params.userId) {
            return new Response(JSON.stringify({ message: "Your profile does not have access to this resource." }), { status: 403 });
        }

        const data = await request.formData();
        const name = data.get("name");
        const admin = await User.findById(session.user.id);

        const checkName = await Project.find({ name, admin });
        if (checkName.length > 0) {
            return new Response(JSON.stringify({ message: "Project name already in use." }), { status: 409, });
        }

        const project = new Project({ name, admin });
        const saveProject = await project.save();

        if (!saveProject)
            return new Response(JSON.stringify({ message: "Error while saving the project data." }), { status: 500 });

        return new Response(JSON.stringify({ message: "New project created succesfully." }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ message: "Error during the project creation. " + error }), { status: 500, });
    }
};