import User from "@models/user";
import { connectToDatabase } from "@lib/connectToDatabase";
import { getServerSession } from "next-auth/next";
import { authConfig } from '@lib/authConfig';

export const GET = async (request, { params }) => {
    try {
        await connectToDatabase();
        const session = await getServerSession(authConfig);

        const term = request.nextUrl.searchParams.get("q");
        console.log(term);

        const user = await User.findById(session.user.id);
        const developers = await User.find({ email: new RegExp(term, "gi") });

        return new Response(JSON.stringify(developers), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ message: "Error fetching the user data. " + error }), { status: 500, });
    }
};