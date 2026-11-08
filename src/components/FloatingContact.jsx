import { useEffect, useState } from "react";
import { SiWhatsapp } from "react-icons/si";
import { whatsappLink } from "../data/content";

// A glass WhatsApp button that floats above the content, hidden while the contact section is on screen.
const FloatingContact = () => {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const target = document.getElementById("contact");
    if (!target) return;
    const observer = new IntersectionObserver(([e]) => setHidden(e.isIntersecting), { threshold: 0.2 });
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return (
    <a
      href={whatsappLink("Bonjour Abderahmane, ")}
      target="_blank"
      rel="noreferrer"
      aria-label="Écrire sur WhatsApp"
      className={`glass fixed bottom-4 right-4 z-40 flex h-14 items-center gap-2.5 rounded-full pl-4 pr-5 font-semibold transition-all duration-300 hover:-translate-y-0.5 md:bottom-6 md:right-6 ${
        hidden ? "pointer-events-none translate-y-4 opacity-0" : "opacity-100"
      }`}
    >
      <SiWhatsapp className="h-6 w-6 text-[#25d366]" aria-hidden="true" />
      WhatsApp
    </a>
  );
};

export default FloatingContact;
