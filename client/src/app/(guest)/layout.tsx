import Header from "@/components/(landing)/header";
import Footer from "@/components/(landing)/footer";

export default function GuestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
     

        <Header />

        {children}

        <Footer />
    </div>
  );
}