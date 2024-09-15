import Project from "@models/project";
import User from "@models/user";
import { connectToDatabase } from "@lib/connectToDatabase";
import { getServerSession } from "next-auth/next";
import { authConfig } from '@lib/authConfig';

// Middleware controla auth en API tamen. Suponse que temos session ou fara redirect a login
export const GET = async (request, { params }) => {
    try {
        await connectToDatabase();

        // Verificamos que o usuario que sae nos params da request e o mismo que o da session. INNECESARIO???
        // E tamén que o usuario está autorizado para acceder a ese proxecto
        const session = await getServerSession(authConfig);
        // TODO: probar a entrar a un project que non é de ese user 
        // cambiar por find{id:projectID, admin ou developer:userID }???
        const user = await User.findById(session.user.id);
        const project = await Project.findById(params.projectId).populate("admin", "developers");
        if (session.user.id !== params.userId || (project.admin._id.toString() !== user._id.toString() && !project.developers.includes(user))) {
            return new Response(JSON.stringify({ message: "Your profile does not have access to this resource." }), { status: 403 });
        }

        // INNECESARIO???
        if (!project)
            return new Response(JSON.stringify({ message: "The requested project does not exist." }), { status: 200 });

        return new Response(JSON.stringify(project), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ message: "Error fetching the project data." + error }), { status: 500, });
    }
};

// TODO facer update project
export const PUT = async (request, { params }) => {
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
            return new Response(JSON.stringify({ message: "Project name already in use." }), { status: 500, });
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