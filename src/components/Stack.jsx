import { STACK } from "../data/content";

// Bento placement per group: frontend and backend are the core, the rest sits beneath.
const SPAN = {
  Frontend: "md:col-span-4",
  Backend: "md:col-span-2",
  Données: "md:col-span-2",
  Outils: "md:col-span-2",
  "IA et digital": "md:col-span-2",
};

const Stack = () => (
  <section id="stack" className="section container-page">
    <div data-reveal className="mb-10 flex flex-wrap items-end justify-between gap-x-10 gap-y-3">
      <h2 className="title">Ma stack</h2>
      <p className="lead max-w-[40ch]">Les outils que j’utilise chaque jour, en production et sur mes projets.</p>
    </div>

    <div data-reveal className="grid gap-3 md:grid-cols-6">
      {STACK.map(({ group, note, items }) => (
        <article key={group} className={`mat rounded-[var(--r-xl)] p-6 md:p-7 ${SPAN[group]}`}>
          <h3 className="text-2xl font-semibold tracking-[-0.02em]">{group}</h3>
          <p className="mb-5 text-[15px] text-ink-2">{note}</p>
          <ul className={`grid gap-x-6 gap-y-3 ${items.length > 4 ? "sm:grid-cols-2" : ""}`}>
            {items.map(({ name, Icon }) => (
              <li key={name} className="flex items-center gap-3 text-[17px]">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[var(--tint)]">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                {name}
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  </section>
);

export default Stack;
