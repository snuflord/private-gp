import Banner from "./components/Banner";
import Cards from "./components/Cards";
import ImageCard from "./components/ImageCard";
import Statement from "./components/Statement";
import Contact from "./components/Contact";

export default function Home() {
  return (
    <main className="min-h-screen">

      <Banner />

      <section className="container mx-auto px-4">
        
        <Cards />
        <ImageCard />
        <Statement />
        <Contact />
        
      </section>
    </main>
  );
}
