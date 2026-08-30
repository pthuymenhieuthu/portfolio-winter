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
      <iframe
        data-tally-src={embedUrl}
        height="284"
        loading="lazy"
        scrolling="no"
        title="Contact form"
        width="100%"
        className="mx-auto w-full max-w-[600px] overflow-hidden bg-transparent"
        style={{ border: 0, margin: 0 }}
      />
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
