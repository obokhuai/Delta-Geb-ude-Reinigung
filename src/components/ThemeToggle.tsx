"use client";

import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "./icons";

export const THEME_KEY = "delta-theme";

/** Runs before first paint (inlined in <head>) so the saved theme never flashes. */
export const themeInitScript = `(function(){try{var t=localStorage.getItem("${THEME_KEY}");if(t==="dark"||t==="light")document.documentElement.dataset.theme=t;}catch(e){}})();`;

function currentIsDark() {
  const t = document.documentElement.dataset.theme;
  if (t) return t === "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export default function ThemeToggle({ labels }: { labels: { dark: string; light: string } }) {
  const [dark, setDark] = useState<boolean | null>(null);

  useEffect(() => {
    setDark(currentIsDark());
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => setDark(currentIsDark());
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  function toggle() {
    const next = currentIsDark() ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {}
    setDark(next === "dark");
  }

  return (
    <button type="button" className="icon-btn" onClick={toggle} aria-label={dark ? labels.light : labels.dark}>
      {dark ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}
