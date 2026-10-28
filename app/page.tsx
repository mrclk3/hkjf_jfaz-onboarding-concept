"use client";

import React, { useState, useEffect } from "react";
import { Hero } from "@/components/sections/Hero";
import { CourseSelectorSection } from "@/components/sections/CourseSelectorSection";
import { ArrivalGuide } from "@/components/sections/ArrivalGuide";
import { CampusMapInteractive } from "@/components/sections/CampusMapInteractive";
import { CampusExplorer } from "@/components/sections/CampusExplorer";
import { VirtualClassroomGuide } from "@/components/sections/VirtualClassroomGuide";
import { CappelGuide } from "@/components/sections/CappelGuide";
import { ScheduleOverview } from "@/components/sections/ScheduleOverview";
import { PacklistInteractive } from "@/components/sections/PacklistInteractive";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { StartklarQuiz } from "@/components/sections/StartklarQuiz";
import { useOnboardingFlow, ONBOARDING_STEPS } from "@/hooks/useOnboardingFlow";
import { OnboardingStepper } from "@/components/onboarding/OnboardingStepper";
import { FloatingFlowBar } from "@/components/onboarding/FloatingFlowBar";
import { StepFlowFooter } from "@/components/onboarding/StepFlowFooter";
import { CourseSelectionModal } from "@/components/onboarding/CourseSelectionModal";
import { TourCompletedModal } from "@/components/onboarding/TourCompletedModal";
import { officialCourses } from "@/data/coursesData";
import { MapPin, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import confetti from "canvas-confetti";

export default function HomePage() {
  const [persona, setPersona] = useState<"newcomer" | "returner">("newcomer");
  const [selectedCourseId, setSelectedCourseId] = useState<string>("jf-jugendarbeit-kompakt");
  const [isCourseModalOpen, setIsCourseModalOpen] = useState<boolean>(false);
  const [isTourCompletedModalOpen, setIsTourCompletedModalOpen] = useState<boolean>(false);
  const [showPhysicalCampusExplore, setShowPhysicalCampusExplore] = useState<boolean>(false);

  const activeCourse =
    officialCourses.find((c) => c.id === selectedCourseId) || officialCourses[0];

  const isOnline = activeCourse.format === "online";

  const {
    steps,
    currentStepId,
    currentStep,
    completedSteps,
    progressPercentage,
    flowMode,
    goToStep,
    nextStep,
    prevStep,
    markStepComplete,
    switchMode,
    startGuidedTour,
    resetProgress,
  } = useOnboardingFlow(isOnline);

  const isGuided = flowMode === "guided";

  // Load saved course & check if initial modal needs to be shown.
  // Deep links from the invitation mail (?kurs=<id>&schritt=<slug>) take precedence.
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const linkedCourseId = params.get("kurs");
      const linkedStepSlug = params.get("schritt");
      const linkedCourse = officialCourses.find((c) => c.id === linkedCourseId);
      const savedCourse = localStorage.getItem("jfaz_selected_course");

      if (linkedCourse) {
        setSelectedCourseId(linkedCourse.id);
        localStorage.setItem("jfaz_selected_course", linkedCourse.id);
        localStorage.setItem("jfaz_modal_confirmed", "true");
        if (savedCourse !== linkedCourse.id) {
          // Different course than last visit: start the onboarding fresh
          resetProgress();
        }
        markStepComplete(1);
      } else {
        if (savedCourse && officialCourses.some((c) => c.id === savedCourse)) {
          setSelectedCourseId(savedCourse);
        }
        if (!localStorage.getItem("jfaz_modal_confirmed")) {
          // Show modal on first arrival
          setIsCourseModalOpen(true);
        }
      }

      const linkedStep = ONBOARDING_STEPS.find((s) => s.slug === linkedStepSlug);
      if (linkedStep) {
        // Wait one frame so the course-specific sections are rendered before scrolling
        requestAnimationFrame(() => goToStep(linkedStep.id, true));
      }
    } catch (e) {
      console.error("Could not load initial modal state from localStorage", e);
    }
    // Runs once on arrival; the flow callbacks are stable enough for this one-shot read
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelectCourse = (courseId: string) => {
    setSelectedCourseId(courseId);
    try {
      localStorage.setItem("jfaz_selected_course", courseId);
    } catch (e) {
      console.error("Could not save course selection to localStorage", e);
    }
    // Keep the address bar shareable: it always reflects the chosen course
    const url = new URL(window.location.href);
    url.searchParams.set("kurs", courseId);
    url.searchParams.delete("schritt");
    window.history.replaceState(null, "", url);
  };

  const handleConfirmModalCourse = (courseId: string) => {
    handleSelectCourse(courseId);
    setIsCourseModalOpen(false);
    markStepComplete(1);
    try {
      localStorage.setItem("jfaz_modal_confirmed", "true");
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.5 },
      });
    } catch (e) {}
    goToStep(1, true);
  };

  const handleCompleteTour = () => {
    markStepComplete(7);
    setIsTourCompletedModalOpen(true);
  };

  return (
    <div className={`flex flex-col w-full relative ${isGuided ? "pb-24" : ""}`}>
      {/* 1. Hero & Persona Switcher */}
      <div className="print:hidden">
        <Hero
          persona={persona}
          setPersona={setPersona}
          selectedCourseId={selectedCourseId}
          onStartTour={startGuidedTour}
          onOpenCourseModal={() => setIsCourseModalOpen(true)}
        />
      </div>

      {/* 2. Sticky Onboarding Stepper Bar & Progress Tracker */}
      <OnboardingStepper
        steps={steps}
        currentStepId={currentStepId}
        completedSteps={completedSteps}
        progressPercentage={progressPercentage}
        flowMode={flowMode}
        onSelectStep={(id) => goToStep(id, true)}
        onSwitchMode={switchMode}
        onResetProgress={resetProgress}
        onOpenCourseModal={() => setIsCourseModalOpen(true)}
      />

      {/* STEP 1: Lehrgang & Dresscode */}
      <div id="step-lehrgang" className="print:hidden">
        <div className="relative">
          <CourseSelectorSection
            selectedCourseId={selectedCourseId}
            onSelectCourse={handleSelectCourse}
          />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 -mt-6">
            {isGuided && (
              <StepFlowFooter
                currentStep={steps[0]}
                nextStep={steps[1]}
                isCompleted={completedSteps.includes(1)}
                onNext={() => nextStep(1)}
              />
            )}
          </div>
        </div>
      </div>

      {/* STEP 2: Anreise & Check-in / Virtueller Check-in */}
      <div id="step-anreise" className="print:hidden">
        <div className="relative">
          <ArrivalGuide
            isOnline={isOnline}
            courseTitle={activeCourse.title}
            platform={activeCourse.platform}
          />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 -mt-6">
            {isGuided && (
              <StepFlowFooter
                currentStep={steps[1]}
                nextStep={steps[2]}
                prevStep={steps[0]}
                isCompleted={completedSteps.includes(2)}
                onNext={() => nextStep(2)}
                onPrev={() => prevStep(2)}
              />
            )}
          </div>
        </div>
      </div>

      {/* STEP 3: Campus & Zimmer / Digitaler Seminarraum */}
      <div id="step-campus" className="print:hidden">
        <div className="relative">
          {isOnline ? (
            <>
              <VirtualClassroomGuide platform={activeCourse.platform} />
              
              {/* Optional physical campus exploration for curious online learners */}
              <div className="bg-slate-50 border-t border-slate-200 py-8 px-4 text-center">
                <div className="max-w-4xl mx-auto space-y-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowPhysicalCampusExplore(!showPhysicalCampusExplore)}
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-700 hover:text-hkjf-navy bg-white px-5 py-2.5 rounded-xl border border-slate-300 shadow-sm cursor-pointer"
                  >
                    <MapPin className="w-4 h-4 text-hkjf-red" />
                    <span>
                      {showPhysicalCampusExplore
                        ? "JFAZ-Campusplan ausblenden"
                        : "Planst du spätere Präsenzkurse? Reales JFAZ-Gelände erkunden"}
                    </span>
                    {showPhysicalCampusExplore ? (
                      <ChevronUp className="w-4 h-4 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    )}
                  </Button>

                  {showPhysicalCampusExplore && (
                    <div className="pt-6 text-left animate-in fade-in-50 duration-300">
                      <CampusMapInteractive />
                      <CampusExplorer />
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            <>
              <CampusMapInteractive />
              <CampusExplorer />
            </>
          )}

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 -mt-6">
            {isGuided && (
              <StepFlowFooter
                currentStep={steps[2]}
                nextStep={steps[3]}
                prevStep={steps[1]}
                isCompleted={completedSteps.includes(3)}
                onNext={() => nextStep(3)}
                onPrev={() => prevStep(3)}
              />
            )}
          </div>
        </div>
      </div>

      {/* STEP 4: Tagesablauf & Essenszeiten / Online-Ablauf */}
      <div id="step-ablauf" className="print:hidden">
        <div className="relative">
          <ScheduleOverview
            isOnline={isOnline}
            scheduleNote={activeCourse.onlineScheduleNote}
          />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 -mt-6">
            {isGuided && (
              <StepFlowFooter
                currentStep={steps[3]}
                nextStep={steps[4]}
                prevStep={steps[2]}
                isCompleted={completedSteps.includes(4)}
                onNext={() => nextStep(4)}
                onPrev={() => prevStep(4)}
              />
            )}
          </div>
        </div>
      </div>

      {/* STEP 5: Interaktive Packliste / Schreibtisch-Checkliste */}
      <div id="step-packliste">
        <div className="relative">
          <PacklistInteractive
            selectedCourseId={selectedCourseId}
            onSelectCourse={handleSelectCourse}
          />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 -mt-6 print:hidden">
            {isGuided && (
              <StepFlowFooter
                currentStep={steps[4]}
                nextStep={steps[5]}
                prevStep={steps[3]}
                isCompleted={completedSteps.includes(5)}
                onNext={() => nextStep(5)}
                onPrev={() => prevStep(5)}
              />
            )}
          </div>
        </div>
      </div>

      {/* STEP 6: Cappel-Guide & FAQ / Online-Support & FAQ */}
      <div id="step-umgebung" className="print:hidden">
        <div className="relative">
          <CappelGuide isOnline={isOnline} />
          <FaqAccordion isOnline={isOnline} />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 -mt-6">
            {isGuided && (
              <StepFlowFooter
                currentStep={steps[5]}
                nextStep={steps[6]}
                prevStep={steps[4]}
                isCompleted={completedSteps.includes(6)}
                onNext={() => nextStep(6)}
                onPrev={() => prevStep(6)}
              />
            )}
          </div>
        </div>
      </div>

      {/* STEP 7: Startklar-Quiz */}
      <div id="step-quiz" className="print:hidden">
        <div className="relative">
          <StartklarQuiz isOnline={isOnline} courseTitle={activeCourse.title} />
        </div>
      </div>

      {/* Floating Sticky Bottom Flow Bar */}
      {isGuided && (
      <div className="print:hidden">
        <FloatingFlowBar
          steps={steps}
          currentStepId={currentStepId}
          completedSteps={completedSteps}
          progressPercentage={progressPercentage}
          onNext={() => nextStep()}
          onPrev={() => prevStep()}
          onGoToStep={(id) => goToStep(id, true)}
          onCompleteTour={handleCompleteTour}
        />
      </div>
      )}

      {/* Initial / On-Demand Course Selection Modal */}
      <CourseSelectionModal
        isOpen={isCourseModalOpen}
        selectedCourseId={selectedCourseId}
        onSelectAndConfirm={handleConfirmModalCourse}
        canDismiss={true}
        onClose={() => setIsCourseModalOpen(false)}
      />

      {/* Tour Completed Celebration Modal */}
      <TourCompletedModal
        isOpen={isTourCompletedModalOpen}
        onClose={() => setIsTourCompletedModalOpen(false)}
        courseTitle={activeCourse.title}
        isOnline={isOnline}
        onGoToPacklist={() => goToStep(5, true)}
        onRestartTour={() => {
          resetProgress();
          goToStep(1, true);
        }}
      />
    </div>
  );
}
