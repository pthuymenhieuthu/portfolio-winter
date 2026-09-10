"use client";

const embedUrl =
  "https://tally.so/embed/QKQ281?alignLeft=1&hideTitle=1&hideFooter=1&transparentBackground=1&dynamicHeight=1";

export function TallyContactForm() {
  return (
    <div className="relative mx-auto h-[300px] w-full max-w-[480px] overflow-hidden md:h-[284px] md:max-w-[600px]">
      <iframe
        src={embedUrl}
        height="284"
        loading="eager"
        scrolling="no"
        title="Contact form"
        width="100%"
        className="block h-full w-full overflow-hidden bg-transparent"
        style={{ border: 0, margin: 0 }}
      />
    </div>
  );
}
