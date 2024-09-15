import { Roboto_Flex } from "next/font/google";

import "./globals.css";
import SessionProvider from "@components/SessionProvider";

const roboto = Roboto_Flex({ subsets: ["latin"] });

export const metadata = {
  title: "Bug Tracker",
  description: "Track bugs during web development process",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
