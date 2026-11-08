import { useEffect } from "react";
import { ReactLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import Header from "./components/Header";
import Hero from "./components/Hero";
import Work from "./components/Work";
import Parcours from "./components/Parcours";
import Stack from "./components/Stack";
import Videos from "./components/Videos";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import FloatingContact from "./components/FloatingContact";
import { initInteractions } from "./lib/interactions";

gsap.registerPlugin(useGSAP, ScrollTrigger);
// Follow real time: in a background tab the entrances finish instead of crawling one frame per second.
gsap.ticker.lagSmoothing(0);

// Every entrance runs without CSS transitions in the way, then leaves the element exactly as CSS wants it
// (tilt and hover effects use transform too).
const DONE = {
  clearProps: "transform,opacity,clipPath",
  onStart() {
    this.targets().forEach((el) => (el.style.transition = "none"));
  },
  onComplete() {
    this.targets().forEach((el) => (el.style.transition = ""));
  },
};

const App = () => {
  useEffect(() => initInteractions(), []);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    // Motion only for people who have not asked for less of it; everyone else sees the page at rest.
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      /* Opening: the bar drops in (the logo unfolds itself, see Header), the name rises, the photo opens like a shutter. */
      gsap
        .timeline({ defaults: { ease: "power3.out", duration: 0.9 } })
        .from(".site-nav", { y: -28, opacity: 0, duration: 0.8, ...DONE })
        .from(".hero-name .word", { yPercent: 110, duration: 1.1, ease: "power4.out", stagger: 0.09 }, 0.2)
        .from(".hero-copy > :not(h1)", { y: 24, opacity: 0, stagger: 0.08, ...DONE }, 0.6)
        .from(
          ".hero-photo",
          { clipPath: "inset(100% 0% 0% 0% round 32px)", duration: 1.4, ease: "power4.inOut", ...DONE },
          0.1
        )
        .from(".hero-photo img", { scale: 1.25, duration: 1.9, ease: "power3.out" }, 0.1)
        .from(".hero-photo figcaption", { y: 30, opacity: 0, duration: 0.8, ...DONE }, 1.1)
        .from(".hero-facts > *", { y: 28, opacity: 0, stagger: 0.08, ...DONE }, 0.9)
        .from("[data-count]", { textContent: 0, snap: { textContent: 1 }, duration: 1.4, ease: "power2.out" }, 1);

      /* The portrait drifts slightly slower than the page. */
      gsap.to(".hero-photo img", {
        yPercent: 8,
        ease: "none",
        scrollTrigger: { trigger: ".hero-photo", start: "top top", end: "bottom top", scrub: true },
      });

      /* Section titles: each word rises from behind its baseline. */
      gsap.utils.toArray("[data-split]").forEach((title) => {
        gsap.from(title.querySelectorAll(".word"), {
          yPercent: 110,
          duration: 1,
          ease: "power4.out",
          stagger: 0.07,
          scrollTrigger: { trigger: title, start: "top 88%", once: true },
        });
      });

      /* Blocks: their parts enter in turn as the section arrives. */
      gsap.utils.toArray("[data-reveal]").forEach((block) => {
        const parts = [...block.children].filter((el) => !el.hasAttribute("data-split"));
        gsap.from(parts.length ? parts : block, {
          y: 36,
          opacity: 0,
          scale: 0.97,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: { trigger: block, start: "top 85%", once: true },
          ...DONE,
        });
      });

      /* Stack: the icons pop in one after another inside each card. */
      gsap.utils.toArray("#stack article").forEach((card) => {
        gsap.from(card.querySelectorAll(".stack-icon"), {
          scale: 0.4,
          opacity: 0,
          rotate: -20,
          duration: 0.6,
          ease: "back.out(2)",
          stagger: 0.05,
          scrollTrigger: { trigger: card, start: "top 85%", once: true },
          ...DONE,
        });
      });

      /* Timeline: each step slides in from the left. */
      gsap.from("#parcours ol li", {
        x: -24,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: "#parcours ol", start: "top 80%", once: true },
        ...DONE,
      });

      /* Videos: the three covers fan out like cards from a hand. */
      gsap.from("[data-fan] > li", {
        y: 80,
        rotate: (i) => (i - 1) * 8,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: { trigger: "[data-fan]", start: "top 85%", once: true },
        ...DONE,
      });

      /* Footer: the name rises letter by letter with the scroll. */
      gsap.from(".footer-name .char", {
        yPercent: 100,
        ease: "power2.out",
        stagger: 0.03,
        scrollTrigger: { trigger: ".site-footer", start: "top 98%", end: "bottom bottom", scrub: 1 },
      });
    });
  });

  return (
    <ReactLenis root options={{ anchors: { offset: -88 } }}>
      <div className="ambient" aria-hidden="true" />
      <Header />
      <main>
        <Hero />
        <Work />
        <Parcours />
        <Stack />
        <Videos />
        <Contact />
      </main>
      <Footer />
      <FloatingContact />
    </ReactLenis>
  );
};

export default App;
