"use client";

import React, { useState } from "react";
import { Hero } from "@/components/sections/Hero";
import { ArrivalGuide } from "@/components/sections/ArrivalGuide";
import { CampusExplorer } from "@/components/sections/CampusExplorer";
import { CappelGuide } from "@/components/sections/CappelGuide";
import { ScheduleOverview } from "@/components/sections/ScheduleOverview";
import { PacklistInteractive } from "@/components/sections/PacklistInteractive";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { StartklarQuiz } from "@/components/sections/StartklarQuiz";

export default function HomePage() {
  const [persona, setPersona] = useState<"newcomer" | "returner">("newcomer");

  return (
    <div className="flex flex-col w-full">
      {/* 1. Hero & Persona Switcher */}
      <Hero persona={persona} setPersona={setPersona} />

      {/* 2. Step-by-Step Arrival & Check-in */}
      <ArrivalGuide />

      {/* 3. Campus & Building Explorer with Tabs */}
      <CampusExplorer />

      {/* 4. Cappel Surroundings Guide (Aldi, Lidl, tegut, dm, Apotheke, Pizzeria) */}
      <CappelGuide />

      {/* 5. Typical Lehrgang Schedule & Meals */}
      <ScheduleOverview />

      {/* 6. Interactive Packlist with LocalStorage & Progress */}
      <PacklistInteractive />

      {/* 7. FAQ with live search & accordion */}
      <FaqAccordion />

      {/* 8. Startklar Quiz & Certificate */}
      <StartklarQuiz />
    </div>
  );
}
