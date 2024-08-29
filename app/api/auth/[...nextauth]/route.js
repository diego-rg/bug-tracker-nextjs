import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

import User from '@models/user';
import { connectToDatabase } from '@utils/connectToDatabase';

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Guest',
            credentials: {
            },
            async authorize(credentials, req) {
                const profile = {
                    email: "guest88ml9fd54ab9@guestfakeemail.fake",
                    username: "Guest",
                    picture: "\images\logo.png"
                };
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
        })
    ],
    callbacks: {
        async session({ session }) {
            const sessionUser = await User.findOne({ email: session.user.email });
            session.user.id = sessionUser._id.toString();
            return session;
        },
        async signIn({ profile }) {
            try {
                await connectToDatabase();
                const userExists = await User.findOne({ email: profile.email });
                if (!userExists) {
                    await User.create({
                        email: profile.email,
                        username: profile.name,
                        image: profile.picture,
                    });
                }
                return true;
            } catch (error) {
                console.log("Error checking if user exists: ", error.message);
                return false;
            }
        },
    }
});

export { handler as GET, handler as POST };