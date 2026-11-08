import { NAV, PROFILE, SOCIALS } from "../data/content";
import Logo from "./Logo";
import { SplitChars } from "./Split";

const Footer = () => (
  <footer className="site-footer container-page pb-28 pt-8 md:pb-12">
    {/* The name rises letter by letter as the page reaches its end. */}
    <p
      aria-hidden="true"
      className="footer-name select-none overflow-hidden whitespace-nowrap pb-[0.06em] font-bold leading-none tracking-[-0.055em]"
    >
      <SplitChars text={PROFILE.name} />
    </p>
    <div className="mt-8 flex flex-wrap items-center justify-between gap-x-8 gap-y-4 text-[15px] text-ink-2">
      <p className="flex items-center gap-3">
        <Logo auto className="text-[17px] text-ink" />
        <span>© 2026 {PROFILE.name}. {PROFILE.city}.</span>
      </p>
      <ul className="flex flex-wrap gap-x-5 gap-y-2">
        {[...NAV, { label: "Contact", href: "#contact" }].map(({ label, href }) => (
          <li key={href}><a href={href} className="hover:text-ink">{label}</a></li>
        ))}
        {SOCIALS.map(({ label, href }) => (
          <li key={label}><a href={href} target="_blank" rel="noreferrer" className="hover:text-ink">{label}</a></li>
        ))}
      </ul>
    </div>
  </footer>
);

export default Footer;
