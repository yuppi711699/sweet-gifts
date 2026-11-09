"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { navigation } from "@/lib/config";
import Brand from "./Brand";

export default function Header() {
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    const closeOutside = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !header.current?.contains(event.target)
      )
        setOpen(false);
    };
    const desktop = window.matchMedia("(min-width: 1024px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("pointerdown", closeOutside);
    desktop.addEventListener("change", closeOnDesktop);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("pointerdown", closeOutside);
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, [open]);

  return (
    <>
      <div className="announcement">
        <span>A little sweetness goes a long way.</span>
        <span className="announcement-location">
          Thoughtful gifting, here in Canada <span aria-hidden="true">↗</span>
        </span>
      </div>
      <header className="site-header" ref={header}>
        <div className="container header-inner">
          <Brand />
          <nav aria-label="Main navigation" className="desktop-nav">
            {navigation.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
          <a className="button button-red header-cta" href="#quote">
            Get a Quote <ArrowUpRight size={16} aria-hidden="true" />
          </a>
          <button
            ref={menuButton}
            className="menu-toggle"
            type="button"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? "Close navigation" : "Open navigation"}
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="mobile-nav"
          hidden={!open}
        >
          {navigation.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          ))}
          <a
            className="button button-red"
            href="#quote"
            onClick={() => setOpen(false)}
          >
            Get a Quote <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </nav>
      </header>
    </>
  );
}
