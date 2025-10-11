import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Playbooks from "@/components/Playbooks";

export default function Home() {
  return (
    <>
      <div className="max-w-5xl mx-auto mt-10 px-10">
        <Navbar />
        <Hero />
        <Playbooks />
      </div>
    </>
  );
}
