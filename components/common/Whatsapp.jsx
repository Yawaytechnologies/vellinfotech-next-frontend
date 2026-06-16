'use client'
import React from "react";
import { createPortal } from "react-dom";
import { FaWhatsapp } from "react-icons/fa";

export default function Whatsapp({
  phone = "+91 9600593838",
  message = "Hi! I’d like to know more.",
  variant = "float", // "float" | "bounce"
}) {
  const digits = phone.replace(/[^\d]/g, "");
  const href = `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;

  if (typeof document === "undefined") return null;

  return createPortal(
    <>
      <style>{`
        .wa-fab{position:fixed;right:calc(20px + env(safe-area-inset-right));bottom:calc(20px + env(safe-area-inset-bottom));z-index:2147483647;display:inline-block}
        .wa-btn{position:relative;display:grid;place-items:center;width:64px;height:64px;border-radius:9999px;background:#25D366;color:#fff;box-shadow:0 12px 30px rgba(0,0,0,.25);border:2px solid rgba(255,255,255,.9);transition:transform .18s ease}
        .wa-icon{width:30px;height:30px}
        .wa-fab:hover .wa-btn{transform:scale(1.1)}
        .wa-fab:active .wa-btn{transform:scale(.95)}
        .wa-fab:hover .wa-icon{animation:wa-wiggle .9s ease-in-out}
        .wa-ripple{position:absolute;inset:0;border-radius:9999px;background:#25D366;filter:blur(10px);opacity:.3;pointer-events:none;animation:wa-ripple 2.2s ease-out infinite}
        .wa-float{animation:wa-float 3s ease-in-out infinite}
        .wa-bounce{animation:wa-bounce 1.5s cubic-bezier(.28,.84,.42,1) infinite}

        @keyframes wa-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
        @keyframes wa-bounce{0%,100%{transform:translateY(0)}40%{transform:translateY(-14px)}70%{transform:translateY(-6px)}}
        @keyframes wa-ripple{0%{transform:scale(1);opacity:.30}100%{transform:scale(1.8);opacity:0}}
        @keyframes wa-wiggle{0%,100%{transform:rotate(0)}15%{transform:rotate(-10deg) scale(1.03)}30%{transform:rotate(10deg) scale(1.03)}45%{transform:rotate(-6deg)}60%{transform:rotate(6deg)}75%{transform:rotate(-2deg)}90%{transform:rotate(2deg)}}

        @media (prefers-reduced-motion: reduce){
          .wa-float,.wa-bounce,.wa-ripple,.wa-fab:hover .wa-icon{animation:none!important}
          .wa-fab:hover .wa-btn,.wa-fab:active .wa-btn{transform:none!important}
        }
      `}</style>

      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Chat on WhatsApp ${phone}`}
        className="wa-fab"
      >
        <span className="wa-ripple" aria-hidden />
        <span className={`wa-btn ${variant === "bounce" ? "wa-bounce" : "wa-float"}`}>
          <FaWhatsapp className="wa-icon" aria-hidden="true" />
        </span>
      </a>
    </>,
    document.body
  );
}
