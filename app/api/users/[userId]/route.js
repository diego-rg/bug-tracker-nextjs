import User from "@models/user";
import { connectToDatabase } from "@utils/connectToDatabase";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";

// Middleware controla auth en API tamen. Suponse que temos session ou fara redirect a login
export const GET = async (req, { params }) => {
    try {
        // Verificamos que o usuario que sae nos params da request e o mismo que o da session. INNECESARIO???
        const session = await getServerSession();
        if (session.user.email !== params.userId) {
            return new NextResponse("Your profile does not have acces to this resource.", { status: 403 });
        }

        await connectToDatabase();
        const user = await User.findOne({ _id: req.params.userId });
        // Se existe session debería existir usuario na db. INNECESARIO???
        if (!user)
            return new NextResponse("The requested user does not exist.", { status: 200 });

        return new NextResponse(JSON.stringify(user), { status: 200 });
    } catch (error) {
        return new NextResponse("Error fetching the user data. " + error.message, { status: 500, });
    }
};