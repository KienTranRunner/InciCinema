import Carousel from "@/components/(landing)/(home)/carousel";
import MovieTabsCarousel from "@/components/(landing)/(home)/tab-film-upcoming-showing";

export default function Home() {
  return (
    <div className="w-full font-[family-name:var(--font-geist-sans)]">
      <div className="w-full">
        <Carousel />
      </div>

      <div className="w-full">
        <MovieTabsCarousel />
      </div>
    </div>
  );
}
