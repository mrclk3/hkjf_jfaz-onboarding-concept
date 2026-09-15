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
import { useOnboardingFlow, ONBOARDING_STEPS } from "@/hooks/useOnboardingFlow";
import { OnboardingStepper } from "@/components/onboarding/OnboardingStepper";
import { FloatingFlowBar } from "@/components/onboarding/FloatingFlowBar";
import { StepFlowFooter } from "@/components/onboarding/StepFlowFooter";
import { CourseSelectionModal } from "@/components/onboarding/CourseSelectionModal";
import { TourCompletedModal } from "@/components/onboarding/TourCompletedModal";
import { officialCourses } from "@/data/coursesData";
import confetti from "canvas-confetti";

export default function HomePage() {
  const [persona, setPersona] = useState<"newcomer" | "returner">("newcomer");
  const [selectedCourseId, setSelectedCourseId] = useState<string>("jf-jugendarbeit-kompakt");
  const [isCourseModalOpen, setIsCourseModalOpen] = useState<boolean>(false);
  const [isTourCompletedModalOpen, setIsTourCompletedModalOpen] = useState<boolean>(false);

  const activeCourse =
    officialCourses.find((c) => c.id === selectedCourseId) || officialCourses[0];

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
  } = useOnboardingFlow();

  // Load saved course & check if initial modal needs to be shown
  useEffect(() => {
    try {
      const savedCourse = localStorage.getItem("jfaz_selected_course");
      if (savedCourse) {
        setSelectedCourseId(savedCourse);
      }
      const hasConfirmedCourse = localStorage.getItem("jfaz_modal_confirmed");
      if (!hasConfirmedCourse) {
        // Show modal on first arrival
        setIsCourseModalOpen(true);
      }
    } catch (e) {
      console.error("Could not load initial modal state from localStorage", e);
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
    <div className="flex flex-col w-full relative pb-20">
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
      <div className="print:hidden">
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
      </div>

      {/* STEP 1: Lehrgang & Dresscode */}
      <div id="step-lehrgang" className="print:hidden scroll-mt-32">
        <div className="relative">
          <CourseSelectorSection
            selectedCourseId={selectedCourseId}
            onSelectCourse={handleSelectCourse}
          />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 -mt-6">
            <StepFlowFooter
              currentStep={steps[0]}
              nextStep={steps[1]}
              isCompleted={completedSteps.includes(1)}
              onNext={nextStep}
            />
          </div>
        </div>
      </div>

      {/* STEP 2: Anreise & Check-in */}
      <div id="step-anreise" className="print:hidden scroll-mt-32">
        <div className="relative">
          <ArrivalGuide />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 -mt-6">
            <StepFlowFooter
              currentStep={steps[1]}
              nextStep={steps[2]}
              prevStep={steps[0]}
              isCompleted={completedSteps.includes(2)}
              onNext={nextStep}
              onPrev={prevStep}
            />
          </div>
        </div>
      </div>

      {/* STEP 3: Campus & Zimmer (Map & Explorer) */}
      <div id="step-campus" className="print:hidden scroll-mt-32">
        <div className="relative">
          <CampusMapInteractive />
          <CampusExplorer />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 -mt-6">
            <StepFlowFooter
              currentStep={steps[2]}
              nextStep={steps[3]}
              prevStep={steps[1]}
              isCompleted={completedSteps.includes(3)}
              onNext={nextStep}
              onPrev={prevStep}
            />
          </div>
        </div>
      </div>

      {/* STEP 4: Tagesablauf & Essenszeiten */}
      <div id="step-ablauf" className="print:hidden scroll-mt-32">
        <div className="relative">
          <ScheduleOverview />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 -mt-6">
            <StepFlowFooter
              currentStep={steps[3]}
              nextStep={steps[4]}
              prevStep={steps[2]}
              isCompleted={completedSteps.includes(4)}
              onNext={nextStep}
              onPrev={prevStep}
            />
          </div>
        </div>
      </div>

      {/* STEP 5: Interaktive Packliste */}
      <div id="step-packliste" className="scroll-mt-32">
        <div className="relative">
          <PacklistInteractive
            selectedCourseId={selectedCourseId}
            onSelectCourse={handleSelectCourse}
          />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 -mt-6 print:hidden">
            <StepFlowFooter
              currentStep={steps[4]}
              nextStep={steps[5]}
              prevStep={steps[3]}
              isCompleted={completedSteps.includes(5)}
              onNext={nextStep}
              onPrev={prevStep}
            />
          </div>
        </div>
      </div>

      {/* STEP 6: Cappel-Guide & FAQ */}
      <div id="step-umgebung" className="print:hidden scroll-mt-32">
        <div className="relative">
          <CappelGuide />
          <FaqAccordion />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 -mt-6">
            <StepFlowFooter
              currentStep={steps[5]}
              nextStep={steps[6]}
              prevStep={steps[4]}
              isCompleted={completedSteps.includes(6)}
              onNext={nextStep}
              onPrev={prevStep}
            />
          </div>
        </div>
      </div>

      {/* STEP 7: Startklar-Quiz & Zertifikat */}
      <div id="step-quiz" className="print:hidden scroll-mt-32">
        <div className="relative">
          <StartklarQuiz />
        </div>
      </div>

      {/* Floating Sticky Bottom Flow Bar */}
      <div className="print:hidden">
        <FloatingFlowBar
          steps={steps}
          currentStepId={currentStepId}
          completedSteps={completedSteps}
          progressPercentage={progressPercentage}
          onNext={nextStep}
          onPrev={prevStep}
          onGoToStep={(id) => goToStep(id, true)}
          onCompleteTour={handleCompleteTour}
        />
      </div>

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
        onGoToPacklist={() => goToStep(5, true)}
        onRestartTour={() => {
          resetProgress();
          goToStep(1, true);
        }}
      />
    </div>
  );
}
