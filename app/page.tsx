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
      <div className="print:hidden">
        <Hero
          persona={persona}
          setPersona={setPersona}
          selectedCourseId={selectedCourseId}
        />
      </div>

      {/* 2. Official HKJF Course Selector & Personalized Requirements */}
      <div className="print:hidden">
        <CourseSelectorSection
          selectedCourseId={selectedCourseId}
          onSelectCourse={handleSelectCourse}
        />
      </div>

      {/* 3. Step-by-Step Arrival & Check-in */}
      <div className="print:hidden">
        <ArrivalGuide />
      </div>

      {/* 4. Interactive Campus Map & Building Finder */}
      <div className="print:hidden">
        <CampusMapInteractive />
      </div>

      {/* 5. Campus & Building Explorer with Tabs */}
      <div className="print:hidden">
        <CampusExplorer />
      </div>

      {/* 6. Cappel Surroundings Guide (Aldi, Lidl, tegut, dm, Apotheke, Pizzeria) */}
      <div className="print:hidden">
        <CappelGuide />
      </div>

      {/* 7. Typical Lehrgang Schedule & Meals */}
      <div className="print:hidden">
        <ScheduleOverview />
      </div>

      {/* 8. Course-Personalized Interactive Packlist (Printable!) */}
      <PacklistInteractive
        selectedCourseId={selectedCourseId}
        onSelectCourse={handleSelectCourse}
      />

      {/* 9. FAQ with live search & accordion */}
      <div className="print:hidden">
        <FaqAccordion />
      </div>

      {/* 10. Startklar Quiz & Certificate */}
      <div className="print:hidden">
        <StartklarQuiz />
      </div>
    </div>
  );
}
