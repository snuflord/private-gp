import { AuthProvider } from "../../context/AuthContext";
import Banner from "./components/Banner";
import Cards from "./components/Cards";
import ImageCard from "./components/ImageCard";
import Statement from "./components/Statement";
import Contact from "./components/Contact";
import EmailContact from "./components/EmailContact";
import BlogCards from "./components/BlogCards";

export default function Home() {
  return (
    <main className="min-h-screen">

      <Banner />

      <section className="container relative mx-auto max-w-8xl flex-grow px-4 md:px-6">
        
        <Cards />
        <ImageCard />
        <EmailContact />
        <Statement />
        <BlogCards />
        
        {/* <AuthProvider>
          <Contact />
        </AuthProvider> */}
        
        
      </section>
    </main>
  );
}
