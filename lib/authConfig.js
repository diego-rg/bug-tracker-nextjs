import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

import User from '@models/user';
import { connectToDatabase } from '@lib/connectToDatabase';

export const authConfig = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
        }),
        CredentialsProvider({
            name: "Guest",
            credentials: {
                username: {
                    label: "Username:",
                    type: "text",
                    placeholder: "Guest",
                    value: "Guest",
                },
                password: {
                    label: "Password:",
                    type: "password",
                    placeholder: "123",
                    value: "123",
                }
            },
            async authorize(credentials) {
                await connectToDatabase();
                const res = await User.findOne({ username: credentials.username });
                if (res) {
                    const user = {
                        name: res.username,
                        email: res.email,
                        image: res.image,
                        id: res.id,
                    };
                    return user;
                }
                return null;
            }
        })
    ],
    callbacks: {
        async session({ session }) {
            const sessionUser = await User.findOne({ email: session.user.email });
            session.user.id = sessionUser._id.toString();
            return session;
        },
        async signIn({ profile }) {
            if (!profile)
                try {
                    await connectToDatabase();
                    const guest = await User.findOne({ username: "Guest" });
                    if (!guest) {
                        console.log("Guest user not found.");
                        return false;
                    }
                    return true;
                } catch (error) {
                    console.log("Error checking if user exists: ", error.message);
                    return false;
                }

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
        }
    },
    theme: {
        logo: "https://raw.githubusercontent.com/diego-rg/bug-tracker-nextjs/main/public/images/logo.png",
    }
};