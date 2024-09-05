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
        if (session.user.id !== params.userId) {
            return new Response("Your profile does not have access to this resource.", { status: 403 });
        }

        await connectToDatabase();
        const user = await User.findOne({ _id: session.user.id });
        const projects = await Project.find({ admin: user }).populate("admin");

        return new Response(JSON.stringify(projects), { status: 200 });
    } catch (error) {
        return new Response("Error fetching the user data." + error, { status: 500, });
    }
};

export const POST = async (request, { params }) => {
    try {
        // Verificamos que o usuario que sae nos params da request e o mismo que o da session. INNECESARIO???
        const session = await getServerSession(authConfig);
        if (session.user.id !== params.userId) {
            return new Response("Your profile does not have access to this resource.", { status: 403 });
        }

        const data = await request.formData();
        const name = data.get("name");
        console.log(name);
        const admin = await User.findOne({ _id: session.user.id });
        console.log(admin);

        await connectToDatabase();

        const project = new Project({ name, admin });

        const saveProject = await project.save();

        if (!saveProject)
            return new Response("Error while saving the project data." + error, { status: 500 });

        return new Response("New project created succesfully.", { status: 200 });
    } catch (error) {
        return new Response("Error during the project creation." + error, { status: 500, });
    }
};