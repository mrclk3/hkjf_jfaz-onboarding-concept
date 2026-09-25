"use client";

import React, { useState } from "react";
import { Search, HelpCircle, PhoneCall, Sparkles } from "lucide-react";
import { faqList, faqCategories } from "@/data/faqData";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface FaqAccordionProps {
  isOnline?: boolean;
}

export function FaqAccordion({ isOnline = false }: FaqAccordionProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>(isOnline ? "online" : "all");

  React.useEffect(() => {
    if (isOnline) {
      setSelectedCategory("online");
    }
  }, [isOnline]);

  const filteredFaqs = faqList.filter((faq) => {
    const matchesCategory =
      selectedCategory === "all" || faq.category === selectedCategory;

    const term = searchTerm.toLowerCase().trim();
    if (!term) return matchesCategory;

    const matchesSearch =
      faq.question.toLowerCase().includes(term) ||
      faq.answer.toLowerCase().includes(term) ||
      faq.keywords.some((k) => k.toLowerCase().includes(term));

    return matchesCategory && matchesSearch;
  });

  return (
    <section id="faq" className="py-16 sm:py-20 bg-hkjf-cream border-b border-border/70 scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <Badge variant="secondary" className="mb-3">
            Häufige Fragen &amp; Notfall
          </Badge>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-hkjf-navy tracking-tight">
            Alles, was du vorab wissen musst
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Finde sofort Antworten zu WLAN, Bettwäsche, Parken, Verpflegung und Lehrgangsordnung.
          </p>
        </div>

        {/* Live Search & Filter Bar */}
        <div className="space-y-4 mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
            <Input
              type="text"
              placeholder="Suche nach Stichwort (z. B. WLAN, Bettwäsche, Parken, Essen)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 bg-white shadow-sm"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-700 bg-slate-100 px-2 py-1 rounded"
              >
                Löschen
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap justify-center gap-1.5">
            {faqCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all border ${
                  selectedCategory === cat.id
                    ? "bg-hkjf-red text-white border-hkjf-red shadow-xs"
                    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Accordion List */}
        {filteredFaqs.length > 0 ? (
          <Accordion type="single" collapsible className="w-full">
            {filteredFaqs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id}>
                <AccordionTrigger className="text-sm sm:text-base">
                  <span className="flex items-center gap-2.5">
                    <HelpCircle className="w-4 h-4 text-hkjf-red shrink-0" />
                    <span>{faq.question}</span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-xs sm:text-sm text-slate-600">
                  <p className="leading-relaxed">{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <div className="bg-white rounded-2xl p-8 text-center border border-slate-200 shadow-sm space-y-3">
            <p className="text-sm font-semibold text-slate-600">
              Keine passende Antwort für &bdquo;{searchTerm}&ldquo; gefunden.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
              }}
            >
              Filter zurücksetzen
            </Button>
          </div>
        )}

        {/* Still have questions card */}
        <div className="mt-10 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-blue-50 text-hkjf-navy flex items-center justify-center shrink-0">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-hkjf-navy text-sm sm:text-base">
                Deine Frage ist nicht dabei?
              </h4>
              <p className="text-xs text-slate-500">
                Unser Team der Bildungsstätte hilft dir gerne telefonisch oder per E-Mail weiter.
              </p>
            </div>
          </div>
          <Button asChild size="sm" className="bg-hkjf-navy hover:bg-hkjf-navyDark text-white font-bold shrink-0">
            <a href="mailto:info@hkjf.de">Frage stellen</a>
          </Button>
        </div>

      </div>
    </section>
  );
}
