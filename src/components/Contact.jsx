import { useState } from "react";
import { PROFILE, PROJECT_TYPES, SOCIALS, whatsappLink } from "../data/content";

const buildMessage = ({ type, project, name }) => {
  const hello = name.trim() ? `Bonjour Abderahmane, je suis ${name.trim()}.` : "Bonjour Abderahmane,";
  const what = type ? ` J’ai un projet : ${type.toLowerCase()}.` : " J’ai un projet.";
  const details = project.trim() ? `\n\n${project.trim()}` : "";
  return `${hello}${what}${details}`;
};

// The contact form is a WhatsApp link generator: the visitor writes, sees the message, and sends it from WhatsApp.
const Contact = () => {
  const [form, setForm] = useState({ type: "", project: "", name: "" });
  const message = buildMessage(form);
  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    window.open(whatsappLink(message), "_blank", "noopener");
  };

  return (
    <section id="contact" className="section container-page">
      <div data-reveal className="mat grid gap-10 rounded-[var(--r-xl)] p-6 md:p-12 lg:grid-cols-[1.1fr_.9fr] lg:gap-14">
        <form onSubmit={submit} className="flex flex-col">
          <h2 className="title mb-4">Un projet en tête ?</h2>
          <p className="lead mb-8 max-w-[38ch]">Décris-le en deux lignes. Ton message s’ouvre dans WhatsApp, prêt à envoyer.</p>

          <fieldset className="mb-6">
            <legend className="mb-3 font-semibold">C’est pour…</legend>
            <div className="flex flex-wrap gap-2">
              {PROJECT_TYPES.map((t) => (
                <label key={t} className="cursor-pointer">
                  <input type="radio" name="type" value={t} checked={form.type === t} onChange={set("type")} className="peer sr-only" />
                  <span className="inline-flex h-11 items-center rounded-full bg-[var(--tint)] px-4 transition-colors peer-checked:bg-[var(--ink)] peer-checked:text-[var(--bg)] peer-focus-visible:outline peer-focus-visible:outline-[3px] peer-focus-visible:outline-[var(--accent)]">
                    {t}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <label htmlFor="project" className="mb-2 font-semibold">Ton projet</label>
          <textarea
            id="project"
            rows={4}
            value={form.project}
            onChange={set("project")}
            placeholder="Ex. : un site pour ma boutique à Tevragh Zeina, avec les prix et un bouton WhatsApp."
            className="mb-5 w-full resize-y rounded-[var(--r-l)] bg-[var(--tint)] px-4 py-3 text-[17px] outline-none placeholder:text-ink-2 focus:ring-2 focus:ring-[var(--accent)]"
          />

          <label htmlFor="name" className="mb-2 font-semibold">Ton nom <span className="font-normal text-ink-2">(facultatif)</span></label>
          <input
            id="name"
            value={form.name}
            onChange={set("name")}
            autoComplete="name"
            className="mb-8 h-12 w-full rounded-[var(--r-l)] bg-[var(--tint)] px-4 text-[17px] outline-none focus:ring-2 focus:ring-[var(--accent)]"
          />

          <button type="submit" className="btn btn-primary h-12 self-start px-7">Ouvrir dans WhatsApp</button>
        </form>

        <div className="flex flex-col gap-8">
          {/* Live preview of the message, as it will appear in WhatsApp. */}
          <div aria-live="polite" className="rounded-[var(--r-l)] bg-[var(--tint)] p-4">
            <p className="mb-3 text-[15px] text-ink-2">Aperçu du message</p>
            <p className="ml-auto max-w-[92%] whitespace-pre-line rounded-2xl rounded-br-md bg-[#d9fdd3] px-4 py-3 text-[17px] leading-snug text-[#111b21]">
              {message}
            </p>
          </div>

          <dl className="grid grid-cols-[110px_1fr] gap-y-3 text-[17px]">
            <dt className="text-ink-2">Email</dt>
            <dd><a href={`mailto:${PROFILE.email}`} className="break-all hover:text-accent">{PROFILE.email}</a></dd>
            <dt className="text-ink-2">Téléphone</dt>
            <dd><a href={`tel:${PROFILE.phone.replace(/\s/g, "")}`} className="hover:text-accent">{PROFILE.phone}</a></dd>
            <dt className="text-ink-2">Ville</dt>
            <dd>{PROFILE.city}</dd>
          </dl>

          <ul className="flex flex-wrap gap-2">
            {SOCIALS.map(({ label, href }) => (
              <li key={label}>
                <a href={href} target="_blank" rel="noreferrer" className="chip h-11 px-4 transition-colors hover:bg-[var(--ink)] hover:text-[var(--bg)]">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Contact;
