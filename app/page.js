import Navbar from "@components/Navbar";
import Hero from "@components/Hero";
import Features from "@components/Features";
import Footer from "@components/Footer";
import { getServerSession } from "next-auth/next";
import { authConfig } from "@lib/authConfig";

export default async function Home() {
  const session = await getServerSession(authConfig);

  return (
    <div className="bg_home">
      <section className="min-h-screen flex justify-center items-center" id="hero">
        <Navbar session={session} />
        <Hero />
      </section>
      <section className="min-h-screen flex flex-col items-center" id="features">
        <Features />
        <Footer />
      </section>
    </div>
  );
}
