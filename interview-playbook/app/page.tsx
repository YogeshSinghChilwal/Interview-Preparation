import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <div className="max-w-5xl mx-auto mt-10">
        <Navbar />
        <Hero />
      </div>
    </>
  );
}
