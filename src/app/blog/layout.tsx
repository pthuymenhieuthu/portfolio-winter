import RootLayout from "../layout"; // 👈 import layout gốc
import { cn } from "@/lib/utils";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RootLayout>
      <div
        className={cn(
          "min-h-screen bg-background font-sans antialiased max-w-5xl mx-auto py-12 sm:py-24 px-6"
        )}
      >
        {children}
      </div>
    </RootLayout>
  );
}