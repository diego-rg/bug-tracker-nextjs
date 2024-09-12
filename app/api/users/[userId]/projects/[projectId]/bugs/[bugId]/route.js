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
        if (session.user.id !== params.userId || (project.admin !== user && !project.developers.includes(user))) {
            return new Response.JSON.stringify({ message: "Your profile does not have access to this resource." }, { status: 403 });
        }

        const bug = await Bug.findById(params.bugId);

        // INNECESARIO???
        if (!bug)
            return new Response.JSON.stringify({ message: "The requested bug does not exist." }, { status: 200 });

        return new Response(JSON.stringify(bug), { status: 200 });
    } catch (error) {
        return new Response.JSON.stringify({ message: "Error fetching the bug data. " + error }, { status: 500, });
    }
};