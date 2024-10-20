import Project from "@models/project";
import User from "@models/user";
import Bug from "@models/bug";
import { connectToDatabase } from "@lib/connectToDatabase";
import { getServerSession } from "next-auth/next";
import { authConfig } from '@lib/authConfig';

// Middleware controla auth en API tamen. Suponse que temos session ou fara redirect a login
export const GET = async (request, { params }) => {
    try {
        // Verificamos que o usuario que sae nos params da request e o mismo que o da session. INNECESARIO???
        // E tamén que o usuario está autorizado para acceder a ese proxecto
        await connectToDatabase();
        const session = await getServerSession(authConfig);
        // TODO: probar a entrar a un project que non é de ese user 
        // cambiar por find{id:projectID, admin ou developer:userID }???
        const user = await User.findById(session.user.id);
        const project = await Project.findById(params.projectId).populate("admin", "developers");
        if (session.user.id !== params.userId || (project.admin._id.toString() !== user._id.toString() && !project.developers.toString().includes(user))) {
            return new Response(JSON.stringify({ message: "Your profile does not have access to this resource." }), { status: 403 });
        }

        const bug = await Bug.findById(params.bugId);

        // INNECESARIO???
        if (!bug)
            return new Response(JSON.stringify({ message: "The requested bug does not exist." }), { status: 200 });

        return new Response(JSON.stringify(bug), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ message: "Error fetching the bug data. " + error }), { status: 500, });
    }
};

export const PATCH = async (request, { params }) => {
    try {
        await connectToDatabase();

        // Verificamos que o usuario que sae nos params da request e o mismo que o da session. INNECESARIO???
        const session = await getServerSession(authConfig);
        if (session.user.id !== params.userId) {
            return new Response(JSON.stringify({ message: "Your profile does not have access to this resource." }), { status: 403 });
        }

        // Verificar que o usuario ten permiso para editar: que é admin do proxecto ou está asignado ao bug
        const user = await User.findById(session.user.id);
        const project = await Project.findById(params.projectId).populate("admin").populate("developers");
        const bug = await Bug.findById(params.bugId).populate("createdBy", "assignedTo");
        if (project.admin._id.toString() !== user._id.toString() && !project.developers.toString().includes(user)) {
            return new Response(JSON.stringify({ message: "Only admins or developers can edit bugs in their projects." }), { status: 403 });
        }

        const data = await request.formData();

        console.log(data);

        const name = data.get("name");
        const description = data.get("description");
        const status = data.get("status");
        const priority = data.get("priority");
        const severity = data.get("severity");
        const assignedTo = data.get("assignedTo");

        const checkName = await Bug.find({ name, project });
        if (checkName.length > 0 && checkName._id === project._id) {
            return new Response(JSON.stringify({ message: "Bug name already in use." }), { status: 409, });
        }

        if (assignedTo.length > 0) {
            const checkDeveloper = await User.findOne({ email: assignedTo });

            if (!checkDeveloper) {
                return new Response(JSON.stringify({ message: "There are no users with that email registered in the APP." }), { status: 409, });
            }

            if (!project.developers.toString().includes(checkDeveloper)) {
                return new Response(JSON.stringify({ message: "There are no users with that email in this project." }), { status: 409, });
            }

            const saveBug = await Bug.findByIdAndUpdate(bug._id.toString(), { name, description, status, priority, severity, $addToSet: { "assignedTo": checkDeveloper } });
            if (!saveBug)
                return new Response(JSON.stringify({ message: "Error while updating the bug data." }), { status: 500 });

            return new Response(JSON.stringify({ message: "Bug updated succesfully." }), { status: 200 });

        }

        const saveBug = await Bug.findByIdAndUpdate(bug._id.toString(), { name, description, status, priority, severity });

        if (!saveBug)
            return new Response(JSON.stringify({ message: "Error while updating the bug data." }), { status: 500 });

        return new Response(JSON.stringify({ message: "Bug updated succesfully." }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ message: "Error during the bug update. " + error }), { status: 500, });
    }
};

export const DELETE = async (request, { params }) => {
    try {
        await connectToDatabase();

        // Verificamos que o usuario que sae nos params da request e o mismo que o da session. INNECESARIO???
        const session = await getServerSession(authConfig);
        if (session.user.id !== params.userId) {
            return new Response(JSON.stringify({ message: "Your profile does not have access to this resource." }), { status: 403 });
        }

        // Verificar que o usuario ten permiso para eliminar: que é admin do proxecto
        const user = await User.findById(session.user.id);
        const project = await Project.findById(params.projectId).populate("admin", "developers");
        if (project.admin._id.toString() !== user._id.toString()) {
            return new Response(JSON.stringify({ message: "Only admins can delete bugs in their projects." }), { status: 403 });
        }

        await Bug.findByIdAndDelete(params.bugId);

        return new Response(JSON.stringify({ message: "Project deleted succesfully." }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ message: "Error deleting the project. " + error }), { status: 500, });
    }
};