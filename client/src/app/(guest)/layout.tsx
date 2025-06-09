import Header from "@/components/(landing)/header";
import Footer from "@/components/(landing)/footer";
import AnimationWrapper from "@/components/animation-wrapper";

export default function GuestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>


        <Header />
        <AnimationWrapper>


        {children}
        </AnimationWrapper>

        <Footer />

    </div>
  );
}