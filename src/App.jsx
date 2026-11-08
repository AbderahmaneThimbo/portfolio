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

gsap.registerPlugin(useGSAP, ScrollTrigger);

const App = () => {
  useGSAP(() => {
    const mm = gsap.matchMedia();

    // Motion only for people who have not asked for less of it; everyone else sees the page at rest.
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap
        .timeline({ defaults: { ease: "power3.out", duration: 0.9 } })
        .from(".hero-copy > *", { y: 28, opacity: 0, stagger: 0.08 })
        .from(".hero-photo", { y: 40, opacity: 0, scale: 0.97, duration: 1.1 }, 0.1)
        .from(".hero-photo img", { scale: 1.12, duration: 1.6 }, 0.1)
        .from(".hero-facts > *", { y: 24, opacity: 0, stagger: 0.07 }, 0.45);

      // Each block enters in turn as its section arrives: heading, then text, then the rest.
      gsap.utils.toArray("[data-reveal]").forEach((block) => {
        const parts = block.children.length > 1 ? block.children : [block];
        gsap.from(parts, {
          y: 28,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.075,
          scrollTrigger: { trigger: block, start: "top 85%", once: true },
        });
      });

      // The portrait drifts slightly slower than the page.
      gsap.to(".hero-photo img", {
        yPercent: 8,
        ease: "none",
        scrollTrigger: { trigger: ".hero-photo", start: "top top", end: "bottom top", scrub: true },
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
