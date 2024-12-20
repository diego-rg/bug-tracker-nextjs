import Project from "@models/project";
import User from "@models/user";
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

        if (!project)
            return new Response(JSON.stringify({ message: "The requested project does not exist." }), { status: 200 });

        return new Response(JSON.stringify(project), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ message: "Error fetching the project data." + error }), { status: 500, });
    }
};

export const PATCH = async (request, { params }) => {
    try {
        await connectToDatabase();
        const session = await getServerSession(authConfig);

        // Verificar que o usuario ten permiso para editar: que é admin do proxecto
        const user = await User.findById(session.user.id);
        const project = await Project.findById(params.projectId).populate("admin");
        if (project.admin._id.toString() !== user._id.toString()) {
            return new Response(JSON.stringify({ message: "Only admins can edit their projects." }), { status: 403 });
        }

        const data = await request.formData();
        const name = data.get("name");
        const admin = await User.findById(session.user.id);
        const developer = data.get("developer");

        const checkName = await Project.find({ name, admin });
        if (checkName.length > 0 && checkName._id === project._id) {
            return new Response(JSON.stringify({ message: "Project name already in use." }), { status: 409, });
        }

        if (developer.length > 0) {
            const checkDeveloper = await User.findOne({ email: developer });
            if (!checkDeveloper) {
                return new Response(JSON.stringify({ message: "There are no users with that email registered in the APP." }), { status: 409, });
            }

            const saveProject = await Project.findByIdAndUpdate(project._id.toString(), { name, $addToSet: { "developers": checkDeveloper } });
            if (!saveProject)
                return new Response(JSON.stringify({ message: "Error while updating the project data." }), { status: 500 });

            return new Response(JSON.stringify({ message: "Project updated succesfully." }), { status: 200 });

        }

        const saveProject = await Project.findByIdAndUpdate(project._id.toString(), { name });

        if (!saveProject)
            return new Response(JSON.stringify({ message: "Error while updating the project data." }), { status: 500 });

        return new Response(JSON.stringify({ message: "Project updated succesfully." }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ message: "Error during the project update. " + error }), { status: 500, });
    }
};

export const DELETE = async (request, { params }) => {
    try {
        await connectToDatabase();
        const session = await getServerSession(authConfig);

        // Verificar que o usuario ten permiso para eliminar: que é admin do proxecto
        const user = await User.findById(session.user.id);
        const project = await Project.findById(params.projectId).populate("admin", "developers");
        if (project.admin._id.toString() !== user._id.toString()) {
            return new Response(JSON.stringify({ message: "Only admins can delete their projects." }), { status: 403 });
        }

        await Project.findByIdAndDelete(params.projectId);

        return new Response(JSON.stringify({ message: "Project deleted succesfully." }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ message: "Error deleting the project. " + error }), { status: 500, });
    }
};