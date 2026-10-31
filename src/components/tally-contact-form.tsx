"use client";

const embedUrl =
  "https://tally.so/embed/QKQ281?alignLeft=1&hideTitle=1&hideFooter=1&transparentBackground=1&dynamicHeight=1";

type TallyContactFormProps = {
  layout?: "default" | "stacked";
};

export function TallyContactForm({
  layout = "default",
}: TallyContactFormProps) {
  const isStacked = layout === "stacked";

  return (
    <div
      className={
        isStacked
          ? "relative mx-auto h-[248px] w-full overflow-hidden"
          : "relative mx-auto h-[300px] w-full max-w-[480px] overflow-hidden md:h-[284px] md:max-w-[600px]"
      }
    >
      <iframe
        src={embedUrl}
        height={isStacked ? "248" : "284"}
        loading="eager"
        scrolling="no"
        title="Project inquiry form"
        width="100%"
        className={
          isStacked
            ? "block h-full w-full -translate-y-7 overflow-hidden bg-transparent"
            : "block h-full w-full overflow-hidden bg-transparent"
        }
        style={{ border: 0, margin: 0 }}
      />
    </div>
  );
}
