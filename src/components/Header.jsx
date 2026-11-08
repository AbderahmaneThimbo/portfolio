import { useEffect, useState } from "react";
import { NAV, PROFILE } from "../data/content";
import ThemeToggle from "./ThemeToggle";
import Logo from "./Logo";

// Highlights the link of the section currently on screen.
const useActiveSection = (ids) => {
  const [active, setActive] = useState("");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);
  return active;
};

const SECTION_IDS = NAV.map((n) => n.href.slice(1));

const Header = () => {
  const [open, setOpen] = useState(false);
  const active = useActiveSection(SECTION_IDS);
  // The logo folds and unfolds on its own; it stays open while the pointer or keyboard is on it.
  const [onLogo, setOnLogo] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="fixed left-1/2 top-3 z-40 w-[min(1100px,calc(100%-24px))] -translate-x-1/2 md:top-4">
      <nav
        aria-label="Navigation principale"
        className="site-nav glass flex h-14 items-center gap-1 rounded-full pl-5 pr-2"
      >
        <a
          href="#accueil"
          className="mr-auto text-xl"
          aria-label={`Da7man, ${PROFILE.name}, retour en haut`}
          onPointerEnter={() => setOnLogo(true)}
          onPointerLeave={() => setOnLogo(false)}
          onFocus={() => setOnLogo(true)}
          onBlur={() => setOnLogo(false)}
        >
          <Logo auto hold={onLogo} />
        </a>

        <ul className="hidden items-center md:flex">
          {NAV.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                aria-current={active === href.slice(1) ? "true" : undefined}
                className="block rounded-full px-4 py-2 text-[15px] transition-colors hover:bg-[var(--tint)] aria-[current]:bg-[var(--tint)] aria-[current]:font-semibold"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <div className="ml-1 flex items-center gap-2">
          <ThemeToggle />
          <a href="#contact" className="btn btn-primary max-md:hidden">
            Me contacter
          </a>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full transition-colors hover:bg-[var(--tint)] md:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 8h16M4 16h16" />}
            </svg>
          </button>
        </div>
      </nav>

      <div
        id="menu-mobile"
        className={`glass mt-2 rounded-[var(--r-l)] p-2 transition-all duration-300 md:hidden ${
          open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"
        }`}
      >
        <ul>
          {[...NAV, { label: "Contact", href: "#contact" }].map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                onClick={() => setOpen(false)}
                className="block rounded-2xl px-4 py-3 text-xl font-medium hover:bg-[var(--tint)]"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default Header;
