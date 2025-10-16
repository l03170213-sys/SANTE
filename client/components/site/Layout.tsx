import { PropsWithChildren } from "react";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
