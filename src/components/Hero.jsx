import { useEffect, useState } from "react";
import { FACTS, PROFILE, whatsappLink } from "../data/content";
import { SplitWords } from "./Split";

const formatTime = () =>
  new Intl.DateTimeFormat("fr-FR", { hour: "2-digit", minute: "2-digit", timeZone: PROFILE.timeZone }).format(new Date());

// The local time in Nouakchott, live: a visitor abroad sees at a glance when a reply is likely.
const LocalTime = () => {
  const [time, setTime] = useState(formatTime);
  useEffect(() => {
    const id = setInterval(() => setTime(formatTime()), 10000);
    return () => clearInterval(id);
  }, []);
  return (
    <time className="ml-auto text-2xl font-semibold tabular-nums tracking-[-0.02em]" aria-label={`Il est ${time} à Nouakchott`}>
      {time}
    </time>
  );
};

const Hero = () => (
  <section id="accueil" className="container-page grid min-h-[100svh] items-center gap-7 pb-16 pt-24 md:grid-cols-[1.05fr_.95fr] md:gap-12 md:pt-32">
    <div className="hero-copy">
      <h1 className="hero-name text-[clamp(48px,6.4vw,96px)] font-bold leading-none tracking-[-0.045em]">
        <SplitWords text={PROFILE.name} />
      </h1>
      <p className="lead mb-8 mt-6 max-w-[34ch]">
        <strong className="font-semibold text-ink">{PROFILE.role} à Nouakchott.</strong> Frontend en React, Vue.js
        et Flutter. Backend en Java Spring et Node.js.
      </p>
      <div className="flex flex-wrap items-center gap-3">
        <a className="btn btn-primary" href={whatsappLink("Bonjour Abderahmane, j’ai un projet : ")}>
          Démarrer un projet
        </a>
        <a className="btn btn-plain" href={PROFILE.cv} download>
          Télécharger le CV ›
        </a>
      </div>
    </div>

    <figure className="hero-photo relative aspect-square overflow-hidden rounded-[var(--r-xl)] max-md:order-first md:aspect-[4/5]">
      <img
        src={PROFILE.photo}
        alt="Abderahmane Thimbo en chemise noire, lunettes rondes, devant un mur en bois"
        width="1086"
        height="1028"
        className="h-full w-full object-cover object-[50%_20%]"
      />
      <figcaption className="glass-clear absolute inset-x-3 bottom-3 flex items-center gap-3 rounded-[var(--r-l)] px-4 py-3 md:inset-x-4 md:bottom-4">
        <span className="relative h-2.5 w-2.5 shrink-0" aria-hidden="true">
          <span className="absolute inset-0 animate-ping rounded-full bg-[#30d158] opacity-60" />
          <span className="absolute inset-0 rounded-full bg-[#30d158]" />
        </span>
        <span className="text-[15px] leading-tight">
          Ouvert aux projets freelance
          <span className="block text-[15px] opacity-80">{PROFILE.city}</span>
        </span>
        <LocalTime />
      </figcaption>
    </figure>

    <ul className="hero-facts grid gap-3 sm:grid-cols-3 md:col-span-2">
      {FACTS.map(({ value, label }) => (
        <li key={value} className="mat rounded-[var(--r-l)] px-5 py-4 md:px-6 md:py-5">
          <strong className="block text-[26px] leading-tight tracking-[-0.03em] md:text-[28px]">
            {/^\d+/.test(value) ? (
              <>
                <span data-count={value.match(/^\d+/)[0]}>{value.match(/^\d+/)[0]}</span>
                {value.replace(/^\d+/, "")}
              </>
            ) : (
              value
            )}
          </strong>
          <span className="text-[15px] text-ink-2">{label}</span>
        </li>
      ))}
    </ul>
  </section>
);

export default Hero;
