"use client";

import React, { useEffect, useState } from "react";
import { applyTheme, resolveTheme, type Theme } from "./theme";

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const next = resolveTheme(
      localStorage.getItem("theme"),
      window.matchMedia("(prefers-color-scheme: dark)").matches,
    );
    setTheme(next);
    applyTheme(next);
  }, []);

  const toggle = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem("theme", next);
    applyTheme(next);
  };

  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
    >
      theme: <span aria-hidden="true">{theme}</span>
    </button>
  );
}
