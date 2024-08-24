import { Roboto_Flex } from "next/font/google";

import "./globals.css";
import Provider from "@components/Provider";

const inter = Roboto_Flex({ subsets: ["latin"] });

export const metadata = {
  title: "Bug Tracker",
  description: "Track bugs during web development process",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <main>
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
}
