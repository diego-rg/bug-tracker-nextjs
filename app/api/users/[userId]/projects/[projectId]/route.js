import Project from "@models/project";
import { connectToDatabase } from "@lib/connectToDatabase";
import { getServerSession } from "next-auth/next";
import { authConfig } from '@lib/authConfig';

// Middleware controla auth en API tamen. Suponse que temos session ou fara redirect a login
export const GET = async (request, { params }) => {
    try {
        // Verificamos que o usuario que sae nos params da request e o mismo que o da session. INNECESARIO???
        const session = await getServerSession(authConfig);
        if (session.user.id !== params.userId) {
            return new Response("Your profile does not have access to this resource.", { status: 403 });
        }

        await connectToDatabase();
        const project = await Project.findOne({ _id: params.projectId });

        // INNECESARIO???
        if (!project)
            return new Response("The requested project does not exist.", { status: 200 });

        return new Response(JSON.stringify(project), { status: 200 });
    } catch (error) {
        return new Response("Error fetching the project data." + error, { status: 500, });
    }
};