import React from "react";

const WhatsAppChatIcon = ({ phoneNumber, message }) => {
    const whatsappLink = `https://wa.me/${phoneNumber}${
        message ? `?text=${encodeURIComponent(message)}` : ""
    }`;

    return (
        <a
            href={whatsappLink}
            className="fixed bottom-4 right-4 z-50 bg-[#25D366] p-3 rounded-full shadow-lg transition-transform duration-300 hover:scale-105 flex items-center justify-center"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
        >
            <img
                src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" // Using a public WhatsApp SVG
                alt="WhatsApp Chat"
                className="w-12 h-12 md:w-11 md:h-11 lg:w-10 lg:h-10" // Responsive sizing with Tailwind
            />
        </a>
    );
};

export default WhatsAppChatIcon;
