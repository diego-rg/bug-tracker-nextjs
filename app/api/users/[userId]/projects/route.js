import User from "@models/user";
import Project from "@models/project";
import { connectToDatabase } from "@lib/connectToDatabase";
import { getServerSession } from "next-auth/next";
import { authConfig } from '@lib/authConfig';

// Middleware controla auth en API tamen. Suponse que temos session ou fara redirect a login
export const GET = async (request, { params }) => {
    try {
        // Verificamos que o usuario que sae nos params da request e o mismo que o da session. INNECESARIO???
        const session = await getServerSession(authConfig);
        console.log("server");
        console.log(session);
        if (session.user.id !== params.userId) {
            return new Response("Your profile does not have access to this resource.", { status: 403 });
        }

        await connectToDatabase();
        const user = await User.findOne({ _id: params.userId }).populate("projects");

        // Se existe session debería existir usuario na db. INNECESARIO???
        if (!user)
            return new Response("The requested user does not exist.", { status: 200 });

        return new Response(JSON.stringify(user.projects), { status: 200 });
    } catch (error) {
        return new Response("Error fetching the user data." + error, { status: 500, });
    }
};

export const POST = async (request, { params }) => {
    try {
        // Verificamos que o usuario que sae nos params da request e o mismo que o da session. INNECESARIO???
        const session = await getServerSession();
        if (session.user.id !== params.userId) {
            return new Response("Your profile does not have access to this resource.", { status: 403 });
        }

        const data = new Project(request.body);
        await connectToDatabase();
        const project = await data.save();

        if (!project)
            return new Response("Error while saving the project data." + error, { status: 500 });

        return new Response("New project created succesfully.", { status: 200 });
    } catch (error) {
        return new Response("Error during the project creation." + error, { status: 500, });
    }
};