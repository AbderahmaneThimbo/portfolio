import PropTypes from "prop-types";
import { PROJECTS } from "../data/content";
import { Title } from "./Split";

const byName = Object.fromEntries(PROJECTS.map((p) => [p.name, p]));

const Arrow = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M7 17 17 7M9 7h8v8" />
  </svg>
);

const Tags = ({ tags }) => (
  <ul className="flex flex-wrap gap-2">
    {tags.map((t) => (
      <li key={t} className="chip">{t}</li>
    ))}
  </ul>
);
Tags.propTypes = { tags: PropTypes.arrayOf(PropTypes.string).isRequired };

// A live project: its real screen fills the card, the caption floats on clear glass.
const ShotCard = ({ project, large = false, className = "" }) => {
  const { name, kind, href, shots } = project;
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      data-tilt
      className={`group relative block overflow-hidden rounded-[var(--r-xl)] bg-[var(--tint)] ${large ? "aspect-[4/3] sm:aspect-[16/10]" : "aspect-[4/3]"} ${className}`}
    >
      <img
        src={shots[0]}
        srcSet={`${shots[0].replace(".webp", "-720.webp")} 720w, ${shots[0]} 1200w`}
        sizes={large ? "(min-width: 1024px) 760px, calc(100vw - 32px)" : "(min-width: 1024px) 380px, (min-width: 768px) 50vw, calc(100vw - 32px)"}
        width="1200"
        height="750"
        alt={`${name}, page d’accueil`}
        loading="lazy"
        className="h-full w-full object-cover object-top transition-transform duration-700 ease-[cubic-bezier(.2,.8,.2,1)] group-hover:scale-[1.04]"
      />
      {large && shots[1] && (
        <span className="absolute bottom-[18%] right-[5%] hidden w-[19%] rounded-[24px] bg-black p-[5px] transition-transform duration-700 group-hover:-translate-y-2 sm:block">
          <img src={shots[1]} alt={`${name} sur téléphone`} width="260" height="563" loading="lazy" className="float w-full rounded-[19px]" />
        </span>
      )}
      <div className="glass-clear absolute inset-x-3 bottom-3 flex items-center gap-3 rounded-[var(--r-l)] px-4 py-3">
        <span className="min-w-0">
          <span className="block text-xl font-semibold tracking-[-0.02em]">{name}</span>
          <span className="block truncate text-[15px]">{kind}</span>
        </span>
        <span className="ml-auto"><Arrow /></span>
      </div>
    </a>
  );
};
ShotCard.propTypes = {
  project: PropTypes.object.isRequired,
  large: PropTypes.bool,
  className: PropTypes.string,
};

const NearUCard = ({ project }) => (
  <article data-tilt className="mat flex flex-col rounded-[var(--r-xl)] p-3 lg:row-span-2">
    <div className="flex flex-1 items-center justify-center gap-3 rounded-[var(--r-l)] bg-[var(--tint)] px-4 py-10">
      {project.shots?.length ? (
        project.shots.slice(0, 2).map((src, i) => (
          <span key={src} className={`float w-[46%] max-w-[190px] rounded-[26px] bg-black p-[5px] ${i ? "float-late mt-12" : ""}`}>
            <img src={src} srcSet={`${src.replace(".webp", "-240.webp")} 240w, ${src} 380w`} sizes="(min-width: 1024px) 180px, 40vw" alt={`NearU, écran ${i + 1}`} width="380" height="753" loading="lazy" className="w-full rounded-[21px]" />
          </span>
        ))
      ) : (
        <img src={project.icon} alt="Icône de l’appli NearU" width="160" height="160" loading="lazy" className="w-32 rounded-[36px] md:w-40" />
      )}
    </div>
    <div className="space-y-3 p-4 pt-5">
      <h3 className="text-[28px] font-semibold leading-tight tracking-[-0.03em]">{project.name}</h3>
      <p className="font-semibold">
        {project.kind}, {project.status.toLowerCase()}.
      </p>
      <p className="text-ink-2">{project.summary} Je la conçois et la développe seul, du frontend au backend.</p>
      <Tags tags={project.tags} />
    </div>
  </article>
);
NearUCard.propTypes = { project: PropTypes.object.isRequired };

const REQUEST = `POST /api/reservations
{
  "name": "Abderahmane",
  "date": "2026-10-24",
  "time": "19:30",
  "guests": 2
}`;

const ApiCard = ({ project }) => (
  <a href={project.href} target="_blank" rel="noreferrer" data-tilt className="mat group flex flex-col rounded-[var(--r-xl)] p-3">
    <pre className="overflow-x-auto rounded-[var(--r-l)] bg-[#0d0d0f] p-5 text-[13px] leading-relaxed text-[#e5e5ea]">
      <code>
        <span className="text-[#7dd3fc]">{REQUEST.split("\n")[0]}</span>
        {"\n" + REQUEST.split("\n").slice(1).join("\n")}
        {"\n\n"}
        <span className="text-[#30d158]">201 Created</span>
      </code>
    </pre>
    <div className="flex items-center gap-3 p-4 pt-5">
      <span className="min-w-0">
        <span className="block text-xl font-semibold tracking-[-0.02em]">{project.name}</span>
        <span className="block text-[15px] text-ink-2">{project.kind}, avec Express et Prisma</span>
      </span>
      <span className="ml-auto transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"><Arrow /></span>
    </div>
  </a>
);
ApiCard.propTypes = { project: PropTypes.object.isRequired };

const SmallCard = ({ project }) => (
  <article className="mat flex-1 rounded-[var(--r-xl)] p-6">
    <h3 className="text-2xl font-semibold tracking-[-0.02em]">{project.name}</h3>
    <p className="mb-4 text-ink-2">{project.note ?? project.kind}</p>
    <Tags tags={project.tags} />
  </article>
);
SmallCard.propTypes = { project: PropTypes.object.isRequired };

const Work = () => (
  <section id="projets" className="section container-page">
    <div data-reveal className="mb-10 flex flex-wrap items-end justify-between gap-x-10 gap-y-3">
      <Title text="Projets" />
      <p className="lead max-w-[40ch]">Des sites en ligne, une appli mobile, une API et des outils que j’utilise moi-même.</p>
    </div>

    <div data-reveal className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
      <ShotCard project={byName.Ocazion} large className="md:col-span-2" />
      <NearUCard project={byName.NearU} />
      <ApiCard project={byName["Reservation API"]} />
      <ShotCard project={byName.ShopGrids} />
      <ShotCard project={byName.Travel} />
      <ShotCard project={byName.Codakt} />
      <div className="flex flex-col gap-3 max-lg:md:col-span-2 max-lg:md:flex-row">
        <SmallCard project={byName.Mailer} />
        <SmallCard project={byName["Lien WhatsApp"]} />
      </div>
    </div>
  </section>
);

export default Work;
