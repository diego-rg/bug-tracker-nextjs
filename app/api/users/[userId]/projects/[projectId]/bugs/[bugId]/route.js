import Bug from "@models/project";
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
        const bug = await Bug.findOne({ _id: params.bugId });

        // INNECESARIO???
        if (!bug)
            return new Response("The requested bug does not exist.", { status: 200 });

        return new Response(JSON.stringify(bug), { status: 200 });
    } catch (error) {
        return new Response("Error fetching the bug data." + error, { status: 500, });
    }
};