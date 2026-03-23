import Header from "@/components/Header";
import Hero from "@/components/Hero";
import BrandShowcase from "@/components/BrandShowcase";
import CategoryGrid from "@/components/CategoryGrid";
import WhyChooseUs from "@/components/WhyChooseUs";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <BrandShowcase />
        <CategoryGrid />
        <WhyChooseUs />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
