import { Roboto_Flex } from "next/font/google";

import "./globals.css";

import { getServerSession } from "next-auth";
import SessionProvider from "@components/SessionProvider";

const roboto = Roboto_Flex({ subsets: ["latin"] });

export const metadata = {
  title: "Bug Tracker",
  description: "Track bugs during web development process",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body className={roboto.className}>
        <SessionProvider session={session}>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
