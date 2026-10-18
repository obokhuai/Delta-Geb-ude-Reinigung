"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/de";
import { Logo } from "./illustrations";
import { CloseIcon, MenuIcon } from "./icons";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeToggle from "./ThemeToggle";

interface Props {
  locale: Locale;
  dict: Pick<Dictionary, "nav" | "a11y" | "cta" | "tagline">;
}

export default function Header({ locale, dict }: Props) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const home = `/${locale}`;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        btnRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const links = [
    { href: `${home}#about`, label: dict.nav.about },
    { href: `${home}#services`, label: dict.nav.services },
    { href: `${home}#why`, label: dict.nav.why },
    { href: `${home}#quote`, label: dict.nav.quote },
    { href: `${home}#contact`, label: dict.nav.contact }
  ];

  return (
    <header className="site-header">
      <div className="wrap bar">
        <Link className="brand" href={home} aria-label={dict.a11y.home}>
          <Logo />
          <span className="brand-name">
            Delta
            <br />
            Gebäude Reinigung
            <small>{dict.tagline}</small>
          </span>
        </Link>

        <nav className="main-nav" id="main-nav" aria-label={dict.a11y.mainNav} data-open={open}>
          <ul>
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} onClick={() => setOpen(false)}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="tools">
          <LanguageSwitcher locale={locale} label={dict.a11y.language} />
          <ThemeToggle labels={{ dark: dict.a11y.dark, light: dict.a11y.light }} />
          <Link className="btn btn-primary btn-small header-cta" href={`${home}#quote`}>
            {dict.cta.quote}
          </Link>
          <button
            ref={btnRef}
            type="button"
            className="icon-btn menu-btn"
            aria-controls="main-nav"
            aria-expanded={open}
            aria-label={open ? dict.a11y.menuClose : dict.a11y.menuOpen}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <CloseIcon size={22} /> : <MenuIcon size={22} />}
          </button>
        </div>
      </div>
    </header>
  );
}
