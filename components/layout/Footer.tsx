import React from "react";
import Image from "next/image";
import { Phone, Mail, MapPin, ExternalLink, Heart, ShieldAlert } from "lucide-react";

export function Footer() {
  return (
    <footer id="footer" className="bg-hkjf-navyDark text-slate-300 pt-16 pb-12 border-t-4 border-hkjf-red">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          
          {/* Col 1: Brand & Identity */}
          <div className="space-y-4">
            <div className="bg-white p-3 rounded-xl inline-block">
              <Image
                src="/assets/hkjf_logo.png"
                alt="HKJF Logo"
                width={160}
                height={40}
                className="object-contain"
              />
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Das Jugendfeuerwehrausbildungszentrum (JFAZ) in Marburg ist die zentrale Bildungsstätte der Hessischen Jugendfeuerwehr im Landesfeuerwehrverband Hessen e.V.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold bg-emerald-950/50 p-2.5 rounded-lg border border-emerald-800/60">
              <ShieldAlert className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Offizielles Onboarding-Portal für Lehrgangsgäste</span>
            </div>
          </div>

          {/* Col 2: Standort & Pforte */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-700 pb-2">
              Standort &amp; Pforte
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-hkjf-red shrink-0 mt-0.5" />
                <span>
                  Jugendfeuerwehrausbildungszentrum<br />
                  Cappeler Straße 130<br />
                  35043 Marburg-Cappel
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-hkjf-red shrink-0" />
                <span>Pforte: (06421) 800-0</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-hkjf-red shrink-0" />
                <a href="mailto:info@hkjf.de" className="hover:text-white transition-colors">
                  info@hkjf.de
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Schnelleinstieg */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-700 pb-2">
              Direktzugriff
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#anreise" className="hover:text-white transition-colors flex items-center gap-1.5">
                  &rarr; Anreise, Parken &amp; Check-in
                </a>
              </li>
              <li>
                <a href="#campus" className="hover:text-white transition-colors flex items-center gap-1.5">
                  &rarr; Campus-Übersicht &amp; Zimmer
                </a>
              </li>
              <li>
                <a href="#umgebung" className="hover:text-white transition-colors flex items-center gap-1.5">
                  &rarr; Cappel-Guide (Aldi, Lidl, Apotheke)
                </a>
              </li>
              <li>
                <a href="#packliste" className="hover:text-white transition-colors flex items-center gap-1.5">
                  &rarr; Interaktive Packliste
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors flex items-center gap-1.5">
                  &rarr; FAQ &amp; Notfall-Hilfe
                </a>
              </li>
              <li>
                <a href="#quiz" className="hover:text-white transition-colors flex items-center gap-1.5">
                  &rarr; Startklar-Check &amp; Urkunde
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Links & Partner */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-700 pb-2">
              Offizielle Links
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://www.hkjf.de"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white flex items-center justify-between"
                >
                  <span>Hessische Jugendfeuerwehr</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://hlfs.hessen.de"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white flex items-center justify-between"
                >
                  <span>HLFS Hessen</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://portal.hlfs.hessen.de"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white flex items-center justify-between"
                >
                  <span>Lehrgangsportal</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.feuerwehr-hessen.de"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white flex items-center justify-between"
                >
                  <span>LFV Hessen e.V.</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Sub-Footer */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Hessische Kinder- und Jugendfeuerwehr im LFV Hessen e.V.</p>
          <div className="flex items-center gap-1">
            <span>Gestaltet für einen stressfreien Lehrgangsstart</span>
            <Heart className="w-3.5 h-3.5 text-hkjf-red inline" />
          </div>
        </div>
      </div>
    </footer>
  );
}
