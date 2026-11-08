import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { VIDEOS } from "../data/content";
import { Title } from "./Split";

const MEDIA = "aspect-[9/16] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]";

// The opening seconds of a real video, muted and looping; a still cover for people who prefer less motion.
// Nothing is downloaded until the video comes near the screen, and it pauses when it leaves it.
const Clip = ({ src, poster }) => {
  const ref = useRef(null);
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    const sync = () => {
      if (visible && !reduce.matches) {
        if (!video.src) video.src = src;
        video.play().catch(() => {});
      } else video.pause();
    };
    const observer = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      sync();
    }, { rootMargin: "200px 0px" });
    observer.observe(video);
    reduce.addEventListener("change", sync);
    return () => {
      observer.disconnect();
      reduce.removeEventListener("change", sync);
    };
  }, [src]);
  return <video ref={ref} poster={poster} muted loop playsInline preload="none" width="540" height="960" className={MEDIA} />;
};
Clip.propTypes = { src: PropTypes.string.isRequired, poster: PropTypes.string.isRequired };

const Videos = () => (
  <section id="videos" className="section container-page grid items-center gap-10 md:grid-cols-[.85fr_1.15fr] md:gap-14">
    <div data-reveal>
      <Title text="Le web expliqué, en vidéo" className="mb-4" />
      <p className="lead mb-8 max-w-[40ch]">
        Sur TikTok et Instagram, j’explique l’informatique simplement : scénario, motion design et montage, avec l’IA
        comme assistant.
      </p>
      <a href={VIDEOS.profile} target="_blank" rel="noreferrer" className="btn btn-primary">
        Voir sur TikTok
      </a>
    </div>

    {/* The covers carry their own titles in large type; the caption is only shown where there is room. */}
    <ul data-fan className="grid grid-cols-3 gap-2 md:gap-3">
      {VIDEOS.items.map(({ title, cover, clip }) => (
        <li key={cover}>
          <a href={VIDEOS.profile} target="_blank" rel="noreferrer" className="group block" aria-label={`${title}, sur TikTok`}>
            <span className="block overflow-hidden rounded-[var(--r-l)] bg-[var(--tint)]">
              {clip ? (
                <Clip src={clip} poster={cover} />
              ) : (
                <img src={cover} alt="" width="540" height="960" loading="lazy" className={MEDIA} />
              )}
            </span>
            <span className="mt-3 hidden text-[15px] font-medium leading-snug md:block">{title}</span>
          </a>
        </li>
      ))}
    </ul>
  </section>
);

export default Videos;
