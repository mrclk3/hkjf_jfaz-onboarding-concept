"use client";

import React, { useState, useEffect } from "react";
import { Hero } from "@/components/sections/Hero";
import { CourseSelectorSection } from "@/components/sections/CourseSelectorSection";
import { ArrivalGuide } from "@/components/sections/ArrivalGuide";
import { CampusMapInteractive } from "@/components/sections/CampusMapInteractive";
import { CampusExplorer } from "@/components/sections/CampusExplorer";
import { CappelGuide } from "@/components/sections/CappelGuide";
import { ScheduleOverview } from "@/components/sections/ScheduleOverview";
import { PacklistInteractive } from "@/components/sections/PacklistInteractive";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { StartklarQuiz } from "@/components/sections/StartklarQuiz";

export default function HomePage() {
  const [persona, setPersona] = useState<"newcomer" | "returner">("newcomer");
  const [selectedCourseId, setSelectedCourseId] = useState<string>("jf-jugendarbeit-kompakt");

  // Load saved course from localStorage
  useEffect(() => {
    try {
      const savedCourse = localStorage.getItem("jfaz_selected_course");
      if (savedCourse) {
        setSelectedCourseId(savedCourse);
      }
    } catch (e) {
      console.error("Could not load course selection from localStorage", e);
    }
  }, []);

  const handleSelectCourse = (courseId: string) => {
    setSelectedCourseId(courseId);
    try {
      localStorage.setItem("jfaz_selected_course", courseId);
    } catch (e) {
      console.error("Could not save course selection to localStorage", e);
    }
  };

  return (
    <div className="flex flex-col w-full">
      {/* 1. Hero & Persona Switcher */}
      <Hero
        persona={persona}
        setPersona={setPersona}
        selectedCourseId={selectedCourseId}
      />

      {/* 2. Official HKJF Course Selector & Personalized Requirements */}
      <CourseSelectorSection
        selectedCourseId={selectedCourseId}
        onSelectCourse={handleSelectCourse}
      />

      {/* 3. Step-by-Step Arrival & Check-in */}
      <ArrivalGuide />

      {/* 4. Interactive Campus Map & Building Finder */}
      <CampusMapInteractive />

      {/* 5. Campus & Building Explorer with Tabs */}
      <CampusExplorer />

      {/* 6. Cappel Surroundings Guide (Aldi, Lidl, tegut, dm, Apotheke, Pizzeria) */}
      <CappelGuide />

      {/* 7. Typical Lehrgang Schedule & Meals */}
      <ScheduleOverview />

      {/* 8. Course-Personalized Interactive Packlist */}
      <PacklistInteractive
        selectedCourseId={selectedCourseId}
        onSelectCourse={handleSelectCourse}
      />

      {/* 9. FAQ with live search & accordion */}
      <FaqAccordion />

      {/* 10. Startklar Quiz & Certificate */}
      <StartklarQuiz />
    </div>
  );
}
