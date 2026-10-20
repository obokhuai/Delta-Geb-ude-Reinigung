"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type PointerEvent } from "react";
import type { Locale } from "@/i18n/config";
import { pagePath } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/de";
import type { SiteImage } from "@/config/images";
import type { ServiceId } from "@/lib/validation";
import { site } from "@/config/site";
import { ArrowIcon, PhoneIcon, PinIcon } from "./icons";

/** Time each slide is shown, in milliseconds */
export const SLIDE_INTERVAL = 5000;

/** Which service each slide promotes (null = general / no preselection) */
const SLIDE_SERVICES: (ServiceId | null)[] = [null, "office", "hotel", "house", "glass"];

interface Props {
  locale: Locale;
  hero: Dictionary["hero"];
  contactLabel: string;
  images: SiteImage[];
}

export default function HeroSlider({ locale, hero, contactLabel, images }: Props) {
  const slides = hero.slides;
  const count = slides.length;
  const [index, setIndex] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [hidden, setHidden] = useState(false);
  const touchX = useRef<number | null>(null);

  const running = !userPaused && !hovered && !focused && !hidden;

  // Each time the slideshow resumes, restart the progress bar so it matches the fresh timer.
  const [runKey, setRunKey] = useState(0);
  useEffect(() => {
    if (running) setRunKey((k) => k + 1);
  }, [running]);

  const go = useCallback((i: number) => setIndex(((i % count) + count) % count), [count]);

  // Advance every SLIDE_INTERVAL ms while running. Restarts whenever the slide changes.
  useEffect(() => {
    if (!running) return;
    const t = window.setTimeout(() => go(index + 1), SLIDE_INTERVAL);
    return () => window.clearTimeout(t);
  }, [index, running, go]);

  // Stop while the browser tab is in the background.
  useEffect(() => {
    const onVis = () => setHidden(document.visibilityState === "hidden");
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  function onPointerDown(e: PointerEvent) {
    if (e.pointerType !== "mouse") touchX.current = e.clientX;
  }
  function onPointerUp(e: PointerEvent) {
    if (touchX.current === null) return;
    const dx = e.clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) > 50) go(index + (dx < 0 ? 1 : -1));
  }

  const slide = slides[index];
  const service = SLIDE_SERVICES[index] ?? null;
  const tail = /^[.,!?]/.test(slide.after) ? slide.after : ` ${slide.after}`;

  return (
    <section
      className="hero"
      id="home"
      aria-roledescription="carousel"
      aria-label={hero.carousel.label}
      onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setHovered(false)}
      onFocus={(e) => {
        // Pause for keyboard users only (mouse/touch clicks don't count as focus-visible)
        if ((e.target as HTMLElement).matches?.(":focus-visible")) setFocused(true);
      }}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused(false);
      }}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
    >
      <h1 className="sr-only">{hero.srTitle}</h1>

      <div className="hero-media" aria-hidden="true">
        {images.slice(0, count).map((img, i) => (
          <div key={img.src} className="hero-slide-img" data-active={i === index}>
            <Image
              src={img.src}
              alt={img.alt[locale]}
              fill
              sizes="100vw"
              priority={i === 0}
              loading={i === 0 ? undefined : "eager"}
              fetchPriority={i === 0 ? "high" : "low"}
              quality={70}
            />
          </div>
        ))}
        <div className="hero-shade" />
      </div>

      <div className="wrap hero-inner">
        <div
          className="hero-copy"
          key={index}
          role="group"
          aria-roledescription="slide"
          aria-label={`${hero.carousel.slide} ${index + 1} ${hero.carousel.of} ${count}: ${slide.eyebrow}`}
        >
          <span className="eyebrow">{slide.eyebrow}</span>
          <p className="hero-title">
            {slide.before} <em>{slide.em}</em>
            {tail}
          </p>
          <p className="hero-lead">{slide.text}</p>
          <div className="hero-actions">
            <Link
              className="btn btn-primary"
              href={`${pagePath(locale, "quote")}${service ? `?service=${service}` : ""}`}
            >
              {slide.cta}
              <ArrowIcon size={18} />
            </Link>
            <Link className="btn btn-on-photo" href={pagePath(locale, "contact")}>
              {contactLabel}
            </Link>
          </div>
        </div>

        <div className="hero-bottom">
          <ul className="hero-facts">
            <li>
              <PinIcon size={18} />
              {site.address.street}, {site.address.postalCode} {site.address.city}
            </li>
            <li>
              <PhoneIcon size={18} />
              <a href={site.phone.href}>{site.phone.display}</a>
            </li>
          </ul>

          <div className="hero-controls">
            <button type="button" className="hero-ctrl" onClick={() => go(index - 1)} aria-label={hero.carousel.prev}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 6l-6 6 6 6" /></svg>
            </button>
            <div className="hero-dots">
              {slides.map((s, i) => (
                <button
                  key={s.eyebrow}
                  type="button"
                  className="hero-dot"
                  aria-label={`${hero.carousel.slide} ${i + 1} ${hero.carousel.of} ${count}: ${s.eyebrow}`}
                  aria-current={i === index ? "true" : undefined}
                  onClick={() => go(i)}
                >
                  <span
                    key={i === index ? `active-${index}-${runKey}` : "idle"}
                    className="hero-dot-fill"
                    style={{ animationDuration: `${SLIDE_INTERVAL}ms`, animationPlayState: running ? "running" : "paused" }}
                  />
                </button>
              ))}
            </div>
            <button type="button" className="hero-ctrl" onClick={() => go(index + 1)} aria-label={hero.carousel.next}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg>
            </button>
            <button
              type="button"
              className="hero-ctrl"
              onClick={() => setUserPaused((p) => !p)}
              aria-label={userPaused ? hero.carousel.play : hero.carousel.pause}
              aria-pressed={userPaused}
            >
              {userPaused ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 4.5v15l13-7.5z" /></svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="4.5" width="4" height="15" rx="1" /><rect x="14" y="4.5" width="4" height="15" rx="1" /></svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
