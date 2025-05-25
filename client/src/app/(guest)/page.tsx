import Carousel from "@/components/(landing)/(home)/carousel";
import MovieTabsCarousel from "@/components/(landing)/(home)/tab-film-upcoming-showing";
import Footer from "@/components/(landing)/footer";
import Header from "@/components/(landing)/header";
// import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full font-[family-name:var(--font-geist-sans)]">
      <Header />

      <div className="w-full">
        <Carousel />
      </div>

      <div className="w-full">
        <MovieTabsCarousel />
      </div>

      <Footer />
    </div>
  );
}
