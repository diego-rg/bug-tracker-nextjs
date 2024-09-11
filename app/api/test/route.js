import User from "@models/user";
import Project from "@models/project";
import { connectToDatabase } from "@lib/connectToDatabase";
import { getServerSession } from "next-auth/next";
import { authConfig } from '@lib/authConfig';

// PROBA TEST DEVELOPERS
export const GET = async (request, { params }) => {
    try {
        const session = await getServerSession(authConfig);

        await connectToDatabase();
        const admin = await User.findById(session.user.id);
        const dev = await User.findOne({ email: "lol123pepe123lol@gmail.com" });
        const project = new Project({ name: "TEST DEVELOPERS", admin, developers: [dev] });
        const saveProject = await project.save();

        if (!saveProject)
            return new Response(JSON.stringify({ message: "Error while saving the project data." }), { status: 500 });

        return new Response(JSON.stringify({ message: "New project created succesfully." }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({
            message: "Error during the project creation. " + (error.code === 11000 ? "Project name already in use." : error)
        }), { status: 500, });
    }
};