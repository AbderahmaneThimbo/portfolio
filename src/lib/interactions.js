import gsap from "gsap";

/*
  Pointer interactions, attached once the page is mounted:
  - a soft light that follows the pointer across glass and mat surfaces (like light on real glass);
  - a slight 3D tilt on project cards;
  - primary buttons that lean toward the pointer.
  Only on devices with a precise pointer; tilt and magnet are skipped when people ask for less motion.
*/
export const initInteractions = () => {
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (!finePointer) return () => {};
  const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const cleanups = [];

  const on = (el, type, fn) => {
    el.addEventListener(type, fn);
    cleanups.push(() => el.removeEventListener(type, fn));
  };

  document.querySelectorAll(".glass, .mat, [data-tilt]").forEach((el) => {
    on(el, "pointermove", (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      el.style.setProperty("--mx", `${x * 100}%`);
      el.style.setProperty("--my", `${y * 100}%`);
      el.style.setProperty("--light", "1");
      if (!calm && el.hasAttribute("data-tilt")) {
        el.style.setProperty("--ry", `${(x - 0.5) * 7}deg`);
        el.style.setProperty("--rx", `${(0.5 - y) * 7}deg`);
      }
    });
    on(el, "pointerleave", () => {
      el.style.setProperty("--light", "0");
      el.style.setProperty("--rx", "0deg");
      el.style.setProperty("--ry", "0deg");
    });
  });

  if (!calm) {
    document.querySelectorAll(".btn-primary").forEach((btn) => {
      const toX = gsap.quickTo(btn, "x", { duration: 0.4, ease: "power3.out" });
      const toY = gsap.quickTo(btn, "y", { duration: 0.4, ease: "power3.out" });
      on(btn, "pointermove", (e) => {
        const r = btn.getBoundingClientRect();
        toX((e.clientX - (r.left + r.width / 2)) * 0.25);
        toY((e.clientY - (r.top + r.height / 2)) * 0.35);
      });
      on(btn, "pointerleave", () => {
        toX(0);
        toY(0);
      });
    });
  }

  return () => cleanups.forEach((fn) => fn());
};
