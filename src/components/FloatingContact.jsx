import React, { useState } from 'react';
import { FaWhatsapp, FaEnvelope, FaLinkedin, FaComments } from 'react-icons/fa';

const FloatingContact = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-3">
      {open && (
        <div className="flex flex-col space-y-2 bg-white p-3 rounded-xl shadow-xl">
          <a
            href="https://wa.me/+22249028081"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-500 hover:scale-110 transition-transform text-2xl"
          >
            <FaWhatsapp />
          </a>
          <a
  href="mailto:abderahmanethimbo@gmail.com"
  className="text-red-600 hover:scale-110 transition-transform text-2xl"
>
  <FaEnvelope />
</a>
          <a
            href="https://www.linkedin.com/in/abderahmane-thimbo-854b10309"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:scale-110 transition-transform text-2xl"
          >
            <FaLinkedin />
          </a>
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        className="btn btn-primary rounded-full p-3 text-xl"
        title="Contactez-moi"
      >
        <FaComments />
      </button>
    </div>
  );
};

export default FloatingContact;
