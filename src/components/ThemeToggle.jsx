import { useEffect, useMemo, useState } from "react";
import { flushSync } from "react-dom";
import PropTypes from "prop-types";

// 9 × 9 pixel drawings: the thumb's icon dissolves pixel by pixel and reforms as the other one.
const SUN = [
  "....#....",
  ".#.....#.",
  "...###...",
  "..#####..",
  "#.#####.#",
  "..#####..",
  "...###...",
  ".#.....#.",
  "....#....",
];
const MOON = [
  "..####...",
  ".###.....",
  "###....#.",
  "###......",
  "###......",
  "###......",
  ".###....#",
  "..######.",
  "...####..",
];

const toPixels = (rows) =>
  rows.flatMap((row, y) => [...row].map((c, x) => (c === "#" ? { x, y } : null)).filter(Boolean));

const THEME_COLOR = { light: "#f5f5f7", dark: "#000000" };

const readTheme = () => document.documentElement.dataset.theme === "dark" ? "dark" : "light";

const PixelIcon = ({ rows, visible, className }) => {
  // A fixed pseudo-random delay per pixel, so the dissolve looks scattered but stays stable.
  const pixels = useMemo(
    () => toPixels(rows).map((p, i) => ({ ...p, delay: ((i * 53) % 17) * 18 })),
    [rows]
  );
  return (
    <svg viewBox="0 0 9 9" className={`absolute h-5 w-5 ${className}`} aria-hidden="true">
      {pixels.map(({ x, y, delay }) => (
        <rect
          key={`${x}-${y}`}
          x={x + 0.08}
          y={y + 0.08}
          width="0.84"
          height="0.84"
          rx="0.12"
          fill="currentColor"
          style={{
            transformBox: "fill-box",
            transformOrigin: "center",
            transition: "opacity 260ms ease, transform 320ms cubic-bezier(.3,1.4,.4,1)",
            transitionDelay: `${delay}ms`,
            opacity: visible ? 1 : 0,
            transform: visible ? "scale(1)" : "scale(0.2) translateY(1.5px)",
          }}
        />
      ))}
    </svg>
  );
};
PixelIcon.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.string).isRequired,
  visible: PropTypes.bool.isRequired,
  className: PropTypes.string,
};

const ThemeToggle = () => {
  const [theme, setTheme] = useState(readTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", THEME_COLOR[theme]);
  }, [theme]);

  // Follow the system setting until the visitor picks a theme themselves.
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e) => {
      let saved = null;
      try { saved = localStorage.getItem("theme"); } catch { /* storage blocked */ }
      if (!saved) setTheme(e.matches ? "dark" : "light");
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  const flip = (event) => {
    const next = theme === "dark" ? "light" : "dark";
    try { localStorage.setItem("theme", next); } catch { /* storage blocked */ }

    const apply = () => {
      document.documentElement.dataset.theme = next;
      flushSync(() => setTheme(next));
    };

    // Where supported, the new theme spreads in a circle from the toggle.
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!document.startViewTransition || calm) return apply();

    const r = event.currentTarget.getBoundingClientRect();
    const x = r.left + r.width / 2;
    const y = r.top + r.height / 2;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));

    // The switch must happen even if the browser never gets to run the transition (e.g. a throttled tab).
    let applied = false;
    const applyOnce = () => {
      if (applied) return;
      applied = true;
      apply();
    };
    const transition = document.startViewTransition(applyOnce);
    setTimeout(() => {
      if (!applied) {
        transition.skipTransition();
        applyOnce();
      }
    }, 400);
    transition.ready
      .then(() => {
        document.documentElement.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
          { duration: 700, easing: "cubic-bezier(.3,.7,.2,1)", pseudoElement: "::view-transition-new(root)" }
        );
      })
      .catch(() => {});
  };

  const dark = theme === "dark";

  return (
    <button
      type="button"
      onClick={flip}
      role="switch"
      aria-checked={dark}
      aria-label="Mode sombre"
      className="relative h-10 w-[74px] shrink-0 rounded-full"
      style={{ background: "var(--tint)", boxShadow: "inset 0 2px 6px rgba(0,0,0,.25)" }}
    >
      <span
        className="absolute left-[3px] top-[3px] grid h-[34px] w-10 place-items-center rounded-xl"
        style={{
          transform: dark ? "translateX(28px)" : "none",
          transition: "transform 550ms cubic-bezier(.3,1.4,.4,1), box-shadow 400ms, background-color 400ms",
          background: dark ? "rgba(120,140,255,.18)" : "rgba(255,255,255,.4)",
          WebkitBackdropFilter: "blur(10px)",
          backdropFilter: "blur(10px)",
          boxShadow: dark
            ? "inset 0 1px 0 rgba(255,255,255,.6), inset 0 -2px 4px rgba(0,0,0,.4), 0 0 0 1px rgba(150,170,255,.55), 0 0 18px rgba(110,130,255,.55)"
            : "inset 0 1px 0 rgba(255,255,255,.9), inset 0 -2px 4px rgba(0,0,0,.12), 0 0 0 1px rgba(255,255,255,.6), 0 4px 14px rgba(0,0,0,.2)",
        }}
      >
        <PixelIcon rows={SUN} visible={!dark} className="text-[#1d1d1f]" />
        <PixelIcon rows={MOON} visible={dark} className="text-[#e8ecff]" />
      </span>
    </button>
  );
};

export default ThemeToggle;
