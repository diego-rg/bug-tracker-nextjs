import User from "@models/user";
import Project from "@models/project";
import { connectToDatabase } from "@lib/connectToDatabase";
import { getServerSession } from "next-auth/next";
import { authConfig } from '@lib/authConfig';

export const GET = async (request, { params }) => {
    try {
        await connectToDatabase();
        const session = await getServerSession(authConfig);

        const term = request.nextUrl.searchParams.get("q");

        const user = await User.findById(session.user.id);

        const projects = await Project.find({ $or: [{ admin: user }, { developers: user }], name: new RegExp(term, "gi") }).populate("admin").populate("developers");

        return new Response(JSON.stringify(projects), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ message: "Error fetching the projects data. " + error }), { status: 500, });
    }
};