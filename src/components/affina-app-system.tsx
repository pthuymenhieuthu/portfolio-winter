import Image from "next/image";

// Figma 60:19006: sky-blue radial stops fading into the white app surface.
export const affinaAppGradient =
  "radial-gradient(ellipse at 50% 24%, #a8dffe 6.4%, #ace0fe 30.5%, #ffffff 100%)";

const buttonShadow =
  "inset 0 -5px 6px rgba(255,255,255,.25), inset 0 0 0 1px rgba(16,24,40,.18), 0 4px 13px rgba(0,0,0,.08)";

export function AffinaAppDesignSystem() {
  return (
    <div id="affina-app-design-system" className="overflow-hidden rounded-3xl border border-[#cce6f7] font-[var(--font-sans)] text-[#2e2222]" style={{ background: affinaAppGradient }}>
      <div className="flex items-center justify-between gap-6 p-5 sm:p-8 lg:p-10">
        <p className="text-xs font-bold uppercase tracking-[0.08em]">Affina app · Visual foundations</p>
        <Image alt="Affina" className="h-auto w-[72px] sm:w-[92px]" height={60} src="/assets/affina/brand-wordmark-after.svg" width={300} />
      </div>
      <div className="grid gap-px bg-white/50 lg:grid-cols-2">
        <article className="min-w-0 bg-white/65 p-5 sm:p-8 lg:p-10">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#62666b]">01 · Foundation</p>
          <h4 className="mt-2 text-2xl font-bold">The app’s visual language</h4>
          <p className="mt-7 text-[10px] font-bold uppercase tracking-[0.1em] text-[#62666b]">Background · Action · Selection · Surface · Text</p>
          <div className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-6">
            {["#A8DFFE", "#2C86FF", "#FF51FF", "#F9F8FB", "#2E2222", "#808080"].map(color => (
              <div key={color}>
                <div className="aspect-square rounded-xl border border-black/[0.06]" style={{ backgroundColor: color }} />
                <p className="mt-2 text-[9px] text-[#62666b]">{color}</p>
              </div>
            ))}
          </div>
          <div className="mt-7 rounded-2xl border border-white/80 bg-white/70 p-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#62666b]">Typography · Momo Trust Sans</p>
            <p className="mt-3 text-2xl font-bold leading-tight">Protection, your way</p>
            <p className="mt-3 text-sm leading-6 text-[#808080]">Choose insurance that fits your needs and budget.</p>
            <p className="mt-4 text-xs text-[#62666b]">Regular · Medium · SemiBold · Bold</p>
          </div>
          <div className="mt-7">
            <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#62666b]">Spacing</p>
            <div className="mt-4 flex h-16 items-end justify-between gap-2">
              {[4, 8, 12, 16, 24, 32].map(space => (
                <div className="flex min-w-0 flex-1 flex-col items-center gap-2" key={space}>
                  <span className="block w-full max-w-10 rounded-sm bg-[#2c86ff]" style={{ height: space }} />
                  <span className="text-[9px] text-[#62666b]">{space}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-7">
            <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#62666b]">Rounded surfaces</p>
            <div className="mt-3 flex flex-wrap gap-3">
              {[4, 8, 12, 16, 24].map(radius => <div className="flex size-11 items-center justify-center border border-[#cce6f7] bg-white/70 text-[9px] text-[#2366b7]" key={radius} style={{ borderRadius: radius }}>{radius}</div>)}
              <div className="flex size-11 items-center justify-center rounded-full border border-[#cce6f7] bg-white/70 text-[9px] text-[#2366b7]">pill</div>
            </div>
          </div>
        </article>
        <article className="min-w-0 bg-white/40 p-5 sm:p-8 lg:p-10">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#62666b]">02 · Components</p>
          <h4 className="mt-2 text-2xl font-bold">Familiar at every step</h4>
          <div className="mt-7 space-y-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#62666b]">Survey selection</p>
            <div className="flex items-center justify-between gap-4 rounded-[20px] bg-white p-5 shadow-[0_8px_24px_rgba(255,81,255,0.12)]">
              <span className="text-sm font-semibold">Health insurance</span>
              <span className="flex size-5 shrink-0 items-center justify-center rounded-full border border-[#ff51ff]"><span className="size-3 rounded-full bg-[#ff51ff]" /></span>
            </div>
            <div className="flex items-center justify-between gap-4 rounded-[20px] border border-[#e8e3ed] bg-[#f9f8fb] p-5">
              <span className="text-sm font-medium">Home insurance</span><span className="size-5 shrink-0 rounded-full border border-[#d4cedb] bg-white" />
            </div>
          </div>
          <div className="mt-7 rounded-3xl bg-white/80 p-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#62666b]">Actions</p>
            <div className="mt-4 space-y-3">
              <div className="rounded-full bg-[#2c86ff] px-5 py-3 text-center text-sm font-semibold text-white" style={{ boxShadow: buttonShadow }}>Get started</div>
              <div className="rounded-full border border-[#ffc1ff] bg-white px-5 py-3 text-center text-sm font-semibold text-[#dd24e3] shadow-sm">Buy now</div>
            </div>
          </div>
          <div className="mt-7 rounded-3xl bg-white/90 p-5 shadow-[0_4px_20px_rgba(0,0,0,0.09)]">
            <span className="rounded-full border border-[#ffca49] bg-[#ffe299] px-3 py-1 text-[10px] font-medium">Recommended for you</span>
            <p className="mt-5 text-lg font-bold">A plan that fits</p>
            <p className="mt-2 text-sm leading-6 text-[#808080]">White cards separate plan details from the blue background and keep key information easy to scan.</p>
          </div>
        </article>
      </div>
    </div>
  );
}
