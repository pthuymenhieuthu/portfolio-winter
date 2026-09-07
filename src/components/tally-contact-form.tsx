"use client";

import Script from "next/script";
import { useCallback, useEffect } from "react";
import { ArrowRight } from "lucide-react";

type TallyWindow = Window & {
  Tally?: {
    loadEmbeds: () => void;
  };
};

const embedUrl =
  "https://tally.so/embed/QKQ281?alignLeft=1&hideTitle=1&hideFooter=1&transparentBackground=1&dynamicHeight=1";

export function TallyContactForm() {
  const loadTally = useCallback(() => {
    const tallyWindow = window as TallyWindow;
    if (tallyWindow.Tally) {
      tallyWindow.Tally.loadEmbeds();
      return;
    }

    document
      .querySelectorAll<HTMLIFrameElement>("iframe[data-tally-src]:not([src])")
      .forEach((iframe) => {
        if (iframe.dataset.tallySrc) {
          iframe.src = iframe.dataset.tallySrc;
        }
      });
  }, []);

  useEffect(() => {
    loadTally();
  }, [loadTally]);

  return (
    <>
      <div className="relative mx-auto h-[300px] w-full max-w-[600px] overflow-hidden sm:h-[284px]">
        <iframe
          data-tally-src={embedUrl}
          height="284"
          loading="lazy"
          scrolling="no"
          title="Contact form"
          width="100%"
          className="block h-full w-full overflow-hidden bg-transparent"
          style={{ border: 0, margin: 0 }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-[207px] z-10 inline-flex h-11 min-w-[128px] items-center justify-center gap-2 rounded-full bg-white px-5 text-base font-medium text-[#29303B] shadow-[0_0_0_1px_rgba(41,48,59,.06),0_1px_1px_.5px_rgba(41,48,59,.06),0_3px_3px_1.5px_rgba(41,48,59,.06),0_6px_6px_-3px_rgba(41,48,59,.06),0_12px_12px_-6px_rgba(41,48,59,.06),0_24px_24px_-12px_rgba(41,48,59,.06),inset_0_1px_0_#fff]"
        >
          Submit
          <ArrowRight className="size-4" strokeWidth={1.75} />
        </div>
      </div>
      <Script
        id="tally-embed"
        src="https://tally.so/widgets/embed.js"
        strategy="lazyOnload"
        onLoad={loadTally}
        onReady={loadTally}
      />
    </>
  );
}
