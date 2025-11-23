"use client";

import { useState } from "react";

const PASSWORD_BY_SLUG: Record<string, string> = {
  zoan: "1125",
  // cake: "abc123", // nếu sau này muốn lock bài khác thì add thêm
};

type PasswordGateProps = {
  slug: string;
  children: React.ReactNode;
};

export function PasswordGate({ slug, children }: PasswordGateProps) {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [unlocked, setUnlocked] = useState(false);

  if (!PASSWORD_BY_SLUG[slug]) {
    // Nếu quên set password trong map thì cho qua luôn
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
    <div className="max-w-xl mx-auto mt-12 border rounded-2xl p-6">
      <h2 className="text-lg font-semibold mb-2">This post is protected 🔒</h2>
      <p className="text-sm text-muted-foreground mb-4">
        Enter the password to view this case study.
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
    </div>
  );
}