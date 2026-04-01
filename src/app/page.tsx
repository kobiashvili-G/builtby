import { OrganicLines } from "@/components/shared/organic-lines";
import { Navbar } from "@/components/nav/navbar";

export default function Home() {
  return (
    <main className="relative min-h-[200vh] bg-cream">
      <OrganicLines />
      <Navbar />
      <div className="relative z-10 pt-20 p-16">
        <h1 className="font-display text-[8vw] font-extrabold text-primary">
          BUILTBY.PRO
        </h1>
      </div>
    </main>
  );
}
