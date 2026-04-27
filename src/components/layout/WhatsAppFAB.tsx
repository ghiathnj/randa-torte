"use client";

import { MessageCircle } from "lucide-react";

interface Props {
  number?: string | null;
}

export function WhatsAppFAB({ number }: Props) {
  if (!number) return null;
  return (
    <a
      href={`https://wa.me/${number}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg shadow-emerald-500/30 flex items-center justify-center hover:scale-110 transition-transform"
      aria-label="WhatsApp"
    >
      <MessageCircle size={26} />
    </a>
  );
}
