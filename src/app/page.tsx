import { PortfolioMasthead } from "@/components/portfolio-masthead";
import ClassicPortfolio from "@/app/classic/page";

export default function Page() {
  if (process.env.NODE_ENV === "production") return <ClassicPortfolio />;

  return (
    <main className="h-[100dvh] w-full overflow-hidden bg-[#fafafa]">
      <PortfolioMasthead />
    </main>
  );
}
