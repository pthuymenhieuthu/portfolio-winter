import Link from "next/link";

export function HeroCtaButtons() {
  return (
    <div className="flex flex-col items-center">
      <Link
        className="inline-flex h-11 items-center justify-center overflow-hidden rounded-full bg-[#F7F7FA] px-6 text-base font-medium text-black/60 shadow-[0_0_0_1px_rgba(0,0,0,.06),0_1px_1px_.5px_rgba(0,0,0,.06),0_3px_3px_1.5px_rgba(0,0,0,.06),0_6px_6px_-3px_rgba(0,0,0,.06),0_12px_12px_-6px_rgba(0,0,0,.06),0_24px_24px_-12px_rgba(0,0,0,.06),inset_0_1px_0_#fff] transition duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-black/75 hover:shadow-[0_0_0_1px_rgba(0,0,0,.07),0_2px_2px_rgba(0,0,0,.06),0_8px_12px_-4px_rgba(0,0,0,.1),0_20px_24px_-10px_rgba(0,0,0,.1),inset_0_1px_0_#fff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3BA0FF]/35"
        href="#projects"
      >
        View my works
      </Link>
    </div>
  );
}
