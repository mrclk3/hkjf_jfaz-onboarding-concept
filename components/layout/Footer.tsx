"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Search,
  Facebook,
  Instagram,
  MessageCircle,
} from "lucide-react";

export function Footer() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      window.location.href = "#faq";
    }
  };

  return (
    <div className="w-full">
      {/* Seamless Solid SVG Wave Divider in exact Footer Dark Blue #232d53 */}
      <div className="w-full overflow-hidden leading-none bg-white">
        <svg
          className="relative block w-full h-12 sm:h-16 lg:h-24 text-[#232d53]"
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,45 C320,95 640,15 960,65 C1200,105 1340,40 1440,55 L1440,100 L0,100 Z"
            fill="#232d53"
          />
        </svg>
      </div>

      {/* Main Footer Container in #232d53 */}
      <footer id="footer" className="bg-[#232d53] text-slate-300 pt-2 pb-10 -mt-[1px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Main Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-14 border-b border-slate-700/60">
            
            {/* Col 1: White Logo + Search Pill (lg:col-span-4) */}
            <div className="lg:col-span-4 space-y-6">
              <div className="relative w-48 h-14 flex items-center">
                <Image
                  src="/assets/hkjf_logo.svg"
                  alt="Hessische Kinder- und Jugendfeuerwehr"
                  width={200}
                  height={56}
                  className="h-full w-auto object-contain brightness-0 invert"
                />
              </div>

              {/* Search Input Pill with Red Search Button */}
              <form onSubmit={handleSearch} className="relative max-w-xs">
                <input
                  type="text"
                  placeholder="Suchen..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-[#1c2444]/90 border border-slate-600/70 rounded-full py-2.5 pl-4 pr-12 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#dd0a35] focus:ring-1 focus:ring-[#dd0a35] transition-all"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#dd0a35] hover:bg-[#b5072a] text-white flex items-center justify-center transition-transform duration-150 active:scale-95 shadow-sm cursor-pointer"
                  aria-label="Suche starten"
                >
                  <Search className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>

            {/* Col 2: KONTAKT (lg:col-span-3) */}
            <div className="lg:col-span-3 space-y-3">
              <h4 className="text-sm font-bold text-white tracking-wider uppercase">
                KONTAKT
              </h4>
              <div className="space-y-2.5 text-xs text-slate-300 leading-relaxed">
                <p className="font-semibold text-white">
                  Hessische Kinder- und Jugendfeuerwehr
                </p>
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <span>
                    Lintzingsweg 1a, 35043<br />
                    Marburg-Cappel
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                  <a href="tel:064219687890" className="hover:text-white transition-colors">
                    06421 / 968 789 0
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                  <a href="mailto:info@hkjf.de" className="hover:text-white transition-colors">
                    info@hkjf.de
                  </a>
                </div>
              </div>
            </div>

            {/* Col 3: FOLGE UNS (lg:col-span-3) */}
            <div className="lg:col-span-3 space-y-3">
              <h4 className="text-sm font-bold text-white tracking-wider uppercase">
                FOLGE UNS
              </h4>
              <div className="flex items-center gap-2.5 pt-1">
                {/* Facebook Page */}
                <a
                  href="https://www.facebook.com/jugendfeuerwehrhessen"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-[#2f3b6a] hover:bg-[#dd0a35] text-white flex items-center justify-center transition-colors shadow-sm"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>

                {/* Facebook Group */}
                <a
                  href="https://www.facebook.com/groups/jugendfeuerwehrhessen"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-[#2f3b6a] hover:bg-[#dd0a35] text-white flex items-center justify-center transition-colors shadow-sm"
                  aria-label="Facebook Gruppe"
                >
                  <Facebook className="w-4 h-4" />
                </a>

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/jugendfeuerwehrhessen"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-[#2f3b6a] hover:bg-[#dd0a35] text-white flex items-center justify-center transition-colors shadow-sm"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>

                {/* WhatsApp */}
                <a
                  href="https://whatsapp.com/channel/0029VaF5PZ05kg76qSjTq31Q"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-[#2f3b6a] hover:bg-[#dd0a35] text-white flex items-center justify-center transition-colors shadow-sm"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Col 4: RECHTLICHES (lg:col-span-2) */}
            <div className="lg:col-span-2 space-y-3">
              <h4 className="text-sm font-bold text-white tracking-wider uppercase">
                RECHTLICHES
              </h4>
              <ul className="space-y-2 text-xs font-semibold">
                <li>
                  <a
                    href="https://www.hkjf.de/impressum/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#dd0a35] hover:text-red-400 transition-colors"
                  >
                    Impressum
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.hkjf.de/datenschutz/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#dd0a35] hover:text-red-400 transition-colors"
                  >
                    Datenschutz
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.hkjf.de/barrierefreiheit/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#dd0a35] hover:text-red-400 transition-colors"
                  >
                    Barrierefreiheit
                  </a>
                </li>
              </ul>
            </div>

          </div>

          {/* Bottom Sub-Footer Bar */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-3 text-xs text-slate-400 text-center">
            <span>© {new Date().getFullYear()} Hessische Kinder- und Jugendfeuerwehr</span>
            <span className="hidden sm:inline text-slate-600">•</span>
            <a
              href="https://www.hkjf.de/interner-bereich/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#dd0a35] hover:text-red-400 font-semibold flex items-center gap-1.5 transition-colors"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-red-500 via-amber-400 to-blue-500 inline-block" />
              <span>Interner Bereich</span>
            </a>
          </div>

        </div>
      </footer>
    </div>
  );
}
