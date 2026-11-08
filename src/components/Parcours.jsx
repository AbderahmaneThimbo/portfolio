import { PROFILE, STORY, TIMELINE } from "../data/content";
import { Title } from "./Split";

const Parcours = () => (
  <section id="parcours" className="section container-page grid gap-10 md:grid-cols-[1.1fr_.9fr] md:gap-16">
    <div data-reveal>
      <Title text="De l’économie au code" className="mb-8" />
      <div className="max-w-[56ch] space-y-5 text-xl leading-[1.6]">
        {STORY.map((p) => (
          <p key={p.slice(0, 24)}>{p}</p>
        ))}
      </div>
      <div className="mt-8 flex items-center gap-3">
        <img src="/images/abderahmane-avatar.jpg" alt="" width="48" height="48" className="h-12 w-12 rounded-full object-cover" />
        <p className="leading-tight">
          <span className="block font-semibold">{PROFILE.name}</span>
          <span className="text-[15px] text-ink-2">{PROFILE.role}</span>
        </p>
      </div>
    </div>

    <ol className="mat self-start rounded-[var(--r-xl)] p-3">
      {TIMELINE.map(({ when, what, where, now }) => (
        <li
          key={what}
          className={`grid grid-cols-[96px_1fr] gap-3 rounded-[var(--r-l)] px-4 py-4 ${now ? "bg-[var(--tint)]" : ""}`}
        >
          <span className="pt-0.5 text-[15px] text-ink-2 tabular-nums">{when}</span>
          <span>
            <span className="block font-semibold leading-snug">
              {what}
              {now && <span className="ml-2 align-middle text-[15px] font-medium text-accent">aujourd’hui</span>}
            </span>
            <span className="text-[15px] text-ink-2">{where}</span>
          </span>
        </li>
      ))}
    </ol>
  </section>
);

export default Parcours;
