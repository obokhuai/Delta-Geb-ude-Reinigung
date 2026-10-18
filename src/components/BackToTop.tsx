"use client";

import { useEffect, useState } from "react";
import { ArrowIcon } from "@/components/icons";

/** Floating back-to-top button; appears after scrolling down. */
export default function BackToTop({ label }: { label: string }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!show) return null;
  return (
    <button
      type="button"
      className="icon-btn back-top"
      aria-label={label}
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
        })
      }
    >
      <ArrowIcon />
    </button>
  );
}
