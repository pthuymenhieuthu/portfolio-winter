"use client";

import { useState } from "react";

const PASSWORD_BY_SLUG: Record<string, string> = {
  zoan: "1125", // bài /blog/zoan dùng pass 1125
  // thêm slug khác nếu muốn
};

type PasswordGateProps = {
  slug: string;
  title?: string; // <- thêm title vào props ở đây
  children: React.ReactNode;
};

export function PasswordGate({ slug, title, children }: PasswordGateProps) {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [unlocked, setUnlocked] = useState(false);

  // nếu quên define password cho slug này thì cho qua luôn
  if (!PASSWORD_BY_SLUG[slug]) {
    return <>{children}</>;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input === PASSWORD_BY_SLUG[slug]) {
      setUnlocked(true);
      setError("");
    } else {
      setError("Wrong password. Please try again.");
    }
  };

  if (unlocked) {
    return <>{children}</>;
  }

  return (
    <div className="mt-8 max-w-md border rounded-2xl p-6 bg-background/60 backdrop-blur">
  <h2 className="text-lg font-semibold mb-1">
    This post is protected 🔒
  </h2>

  {title && (
    <p className="text-sm font-medium mb-1">
      {title}
    </p>
  )}

  <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
    This project is under an NDA, so I’m unable to share full details publicly.  
    Please enter the password I provided to view the complete case study.
  </p>

  <form onSubmit={handleSubmit} className="space-y-3">
    <input
      type="password"
      placeholder="Enter password"
      value={input}
      onChange={(e) => setInput(e.target.value)}
      className="w-full border rounded-lg px-3 py-2 text-sm bg-background"
    />

    {error && (
      <p className="text-xs text-red-500">
        {error}
      </p>
    )}

    <button
      type="submit"
      className="inline-flex items-center rounded-lg px-4 py-2 text-sm font-medium border bg-primary text-primary-foreground"
    >
      Unlock
    </button>
  </form>

  <p className="text-xs text-muted-foreground mt-4">
    Need access? Contact me at{" "}
    <span className="font-medium text-foreground">
      phuongthuy101222@gmail.com
    </span>
  </p>
</div>
  );
}