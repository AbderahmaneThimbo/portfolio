import { Fragment } from "react";
import PropTypes from "prop-types";

// Words wrapped in masks, so each one can rise from behind its own baseline.
// The space sits between the masks: inside an inline-block it would collapse.
export const SplitWords = ({ text }) =>
  text.split(" ").map((word, i, all) => (
    <Fragment key={i}>
      <span className="word-mask">
        <span className="word">{word}</span>
      </span>
      {i < all.length - 1 ? " " : null}
    </Fragment>
  ));

SplitWords.propTypes = { text: PropTypes.string.isRequired };

// A heading whose words slide up when it enters the screen.
export const Title = ({ text, className = "" }) => (
  <h2 className={`title ${className}`} data-split>
    <SplitWords text={text} />
  </h2>
);

Title.propTypes = { text: PropTypes.string.isRequired, className: PropTypes.string };

// Letters as separate boxes, for the footer name.
export const SplitChars = ({ text }) =>
  [...text].map((c, i) => (
    <span key={i} className="char inline-block" style={c === " " ? { width: "0.28em" } : undefined}>
      {c === " " ? " " : c}
    </span>
  ));

SplitChars.propTypes = { text: PropTypes.string.isRequired };
