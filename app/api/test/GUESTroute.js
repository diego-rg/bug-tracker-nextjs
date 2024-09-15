import User from "@models/user";
import { connectToDatabase } from "@lib/connectToDatabase";

// Create Guest if not exists
export const GET = async () => {
    try {
        await connectToDatabase();
        const guest = await User.findOne({ username: "Guest" });
        if (guest)
            return new Response("Guest user already created.", { status: 200 });

        await User.create({
            email: "guest8n7ahd6f5fake@fake5md6mail.fake",
            username: "Guest",
            image: "https://raw.githubusercontent.com/diego-rg/bug-tracker-nextjs/main/public/images/logo.png",
        });
        return new Response("Guest user created.", { status: 200 });
    } catch (error) {
        return new Response("Error while creating the Guest user." + error, { status: 500, });
    }
};