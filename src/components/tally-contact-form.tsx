"use client";

import Script from "next/script";
import { useCallback, useEffect } from "react";

type TallyWindow = Window & {
  Tally?: {
    loadEmbeds: () => void;
  };
};

const embedUrl =
  "https://tally.so/embed/QKQ281?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1";

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
      <div className="mx-auto h-[252px] w-full max-w-[600px] overflow-visible sm:h-[284px]">
        <iframe
          data-tally-src={embedUrl}
          height="284"
          loading="lazy"
          scrolling="no"
          title="Contact form"
          width="100%"
          className="mx-auto w-[112%] max-w-none origin-top -translate-x-[5.35%] scale-[0.89] overflow-hidden bg-transparent sm:w-full sm:translate-x-0 sm:scale-100"
          style={{ border: 0, margin: 0 }}
        />
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
