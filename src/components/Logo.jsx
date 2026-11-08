import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

const NAME = [..."Da7man"];

const OPEN_MS = 4200; // how long <Da7man/> stays open
const CLOSED_MS = 1500; // how long </> stays closed

// Folds and unfolds on its own, forever: </> on arrival, then <Da7man/>, </>, <Da7man/>…
// `hold` keeps it open (pointer or keyboard on it); people who ask for less motion get it open and still.
const useAutoFold = (auto, hold) => {
  const [folded, setFolded] = useState(auto);
  useEffect(() => {
    if (!auto) return;
    if (hold || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setFolded(false);
      return;
    }
    let timer;
    const step = (next) => {
      setFolded(next);
      timer = setTimeout(() => step(!next), next ? CLOSED_MS : OPEN_MS);
    };
    timer = setTimeout(() => step(false), 700);
    return () => clearTimeout(timer);
  }, [auto, hold]);
  return folded;
};

// The wordmark <Da7man/>: his nickname written as a self-closing component tag.
// The 7 (the Arabic "ح" of Arabizi) carries the accent colour.
// When folded, the letters fold up like paper and the tag closes on itself into </>.
const Logo = ({ className = "", auto = false, hold = false }) => {
  const folded = useAutoFold(auto, hold);
  const innerRef = useRef(null);
  const [width, setWidth] = useState(null);

  // The gap between the brackets animates to the name's real width, re-measured once the font has loaded.
  useEffect(() => {
    const el = innerRef.current;
    const measure = () => setWidth(el.scrollWidth);
    measure();
    document.fonts?.ready.then(measure);
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <span
      className={`logo inline-flex items-center font-semibold tracking-[-0.02em] ${className}`}
      data-folded={folded}
      role="img"
      aria-label="Da7man"
    >
      <span className="logo-br logo-br-open text-ink-2" aria-hidden="true">&lt;</span>
      <span className="logo-name" style={width ? { "--w": `${width}px` } : undefined} aria-hidden="true">
        <span ref={innerRef} className="logo-name-inner">
          {NAME.map((c, i) => (
            <span key={i} className={`logo-ch ${c === "7" ? "logo-seven text-accent" : ""}`} style={{ "--i": i }}>
              {c}
            </span>
          ))}
        </span>
      </span>
      <span className="logo-br logo-br-close text-ink-2" aria-hidden="true">
        <span className="logo-slash">/</span>&gt;
      </span>
    </span>
  );
};

Logo.propTypes = { className: PropTypes.string, auto: PropTypes.bool, hold: PropTypes.bool };

export default Logo;
