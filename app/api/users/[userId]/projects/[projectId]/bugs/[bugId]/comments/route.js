import Project from "@models/project";
import User from "@models/user";
import Bug from "@models/bug";
import Comment from "@models/comment";
import { connectToDatabase } from "@lib/connectToDatabase";
import { getServerSession } from "next-auth/next";
import { authConfig } from '@lib/authConfig';

export const GET = async (request, { params }) => {
    try {
        await connectToDatabase();
        const session = await getServerSession(authConfig);

        // Si o user non é admin ou developer, non ten acceso ao bug (por si pega id na url)
        const user = await User.findById(session.user.id);
        const project = await Project.findById(params.projectId).populate("admin").populate("developers");
        if (project.admin._id.toString() !== user._id.toString() && !project.developers.toString().includes(user)) {
            return new Response(JSON.stringify({ message: "Your profile does not have access to this resource." }), { status: 403 });
        }

        const bug = await Bug.findById(params.bugId);
        if (!bug)
            return new Response(JSON.stringify({ message: "Error fetching the bug." }), { status: 500 });

        const comments = await Comment.find({ bug }).populate("user").sort({ 'createdAt': 'desc' });

        if (!comments)
            return new Response(JSON.stringify({ message: "The requested bug does not have comments." }), { status: 200 });

        return new Response(JSON.stringify(comments), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ message: "Error fetching the comments of the bug. " + error }), { status: 500, });
    }
};

export const POST = async (request, { params }) => {
    try {
        await connectToDatabase();
        const session = await getServerSession(authConfig);

        // Si o user non é admin ou developer, non ten acceso ao proxecto (por si pega id na url)
        const user = await User.findById(session.user.id);
        const project = await Project.findById(params.projectId).populate("admin", "developers");
        if (project.admin._id.toString() !== user._id.toString() && !project.developers.toString().includes(user)) {
            return new Response(JSON.stringify({ message: "Your profile does not have access to this resource." }), { status: 403 });
        }

        const bug = await Bug.findById(params.bugId);
        if (!bug)
            return new Response(JSON.stringify({ message: "Error fetching the bug." }), { status: 500 });

        const data = await request.formData();
        const content = data.get("content");

        const comment = new Comment({ content, bug, user });
        const saveComment = await comment.save();

        if (!saveComment)
            return new Response(JSON.stringify({ message: "Error while saving the comment." }), { status: 500 });

        return new Response(JSON.stringify({ message: "New comment created succesfully." }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ message: "Error during the comment creation. " + error }), { status: 500, });
    }
};