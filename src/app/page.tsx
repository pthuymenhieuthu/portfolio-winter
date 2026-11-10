import { PortfolioMasthead } from "@/components/portfolio-masthead";
import GoogleTracking from "@/components/google-tracking";
import ClassicPortfolio from "@/app/classic/page";

export default function Page() {
  if (process.env.NODE_ENV === "production") return <ClassicPortfolio />;

  return (
    <main className="h-[100dvh] w-full overflow-hidden bg-[#fafafa]">
      <GoogleTracking />
      <PortfolioMasthead />
    </main>
  );
}
