import Navbar from "@components/Navbar";
import Hero from "@components/Hero";
import Features from "@components/Features";
import Footer from "@components/Footer";

export default function Home() {
  return (
    <div id="home">
      <section className="h-screen flex justify-center items-center" id="hero">
        <Navbar />
        <Hero />
      </section>
      <section className="h-screen flex flex-col items-center" id="features">
        <Features />
        <Footer />
      </section>
    </div>
  );
}
