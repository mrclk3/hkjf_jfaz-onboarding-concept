"use client";

import { useState, useEffect, useCallback } from "react";

export interface OnboardingStep {
  id: number;
  slug: string;
  targetId: string;
  title: string;
  shortTitle: string;
  description: string;
  estimatedTime: string;
  iconName: string;
}

export const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    id: 1,
    slug: "lehrgang",
    targetId: "step-lehrgang",
    title: "Lehrgang & Dresscode auswählen",
    shortTitle: "Lehrgang",
    description: "Wähle dein Seminar für maßgeschneiderte Infos und Packlisten.",
    estimatedTime: "1 Min.",
    iconName: "GraduationCap",
  },
  {
    id: 2,
    slug: "anreise",
    targetId: "step-anreise",
    title: "Anreise, Schranke & Check-in",
    shortTitle: "Anreise",
    description: "Navigationsadresse, Parken, Pforte und Schlüsselabholung.",
    estimatedTime: "1 Min.",
    iconName: "Navigation",
  },
  {
    id: 3,
    slug: "campus",
    targetId: "step-campus",
    title: "Campus, Lehrsäle & Zimmer",
    shortTitle: "Campus",
    description: "Interaktive Geländeübersicht, Bettenhäuser und Räume.",
    estimatedTime: "1.5 Min.",
    iconName: "MapPin",
  },
  {
    id: 4,
    slug: "ablauf",
    targetId: "step-ablauf",
    title: "Tagesablauf & Essenszeiten",
    shortTitle: "Tagesablauf",
    description: "Frühstück, Unterrichtsblöcke, Mensazeiten und Bistro.",
    estimatedTime: "1 Min.",
    iconName: "Clock",
  },
  {
    id: 5,
    slug: "packliste",
    targetId: "step-packliste",
    title: "Interaktive Packliste",
    shortTitle: "Packliste",
    description: "Koffer packen mit lehrgangsspezifischer Ausrüstung zum Abhaken.",
    estimatedTime: "1.5 Min.",
    iconName: "Package",
  },
  {
    id: 6,
    slug: "umgebung",
    targetId: "step-umgebung",
    title: "Cappel-Guide & FAQ",
    shortTitle: "Cappel & FAQ",
    description: "Supermärkte, Apotheke, Pizzeria in Gehdistanz & Notfallhilfe.",
    estimatedTime: "1 Min.",
    iconName: "ShoppingBag",
  },
  {
    id: 7,
    slug: "quiz",
    targetId: "step-quiz",
    title: "Startklar-Quiz & Zertifikat",
    shortTitle: "Startklar-Quiz",
    description: "3-Fragen-Check, Konfetti und dein offizielles Starter-Abzeichen.",
    estimatedTime: "1 Min.",
    iconName: "Award",
  },
];

export type FlowMode = "guided" | "overview";

export function useOnboardingFlow() {
  const [currentStepId, setCurrentStepId] = useState<number>(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [flowMode, setFlowMode] = useState<FlowMode>("guided");
  const [isClient, setIsClient] = useState(false);

  // Load from localStorage
  useEffect(() => {
    setIsClient(true);
    try {
      const savedStep = localStorage.getItem("jfaz_flow_step");
      if (savedStep) {
        const stepNum = parseInt(savedStep, 10);
        if (stepNum >= 1 && stepNum <= ONBOARDING_STEPS.length) {
          setCurrentStepId(stepNum);
        }
      }
      const savedCompleted = localStorage.getItem("jfaz_flow_completed");
      if (savedCompleted) {
        setCompletedSteps(JSON.parse(savedCompleted));
      }
      const savedMode = localStorage.getItem("jfaz_flow_mode") as FlowMode;
      if (savedMode === "guided" || savedMode === "overview") {
        setFlowMode(savedMode);
      }
    } catch (e) {
      console.error("Could not restore onboarding state from localStorage", e);
    }
  }, []);

  // Save changes to localStorage
  const saveState = useCallback(
    (step: number, completed: number[], mode: FlowMode) => {
      try {
        localStorage.setItem("jfaz_flow_step", step.toString());
        localStorage.setItem("jfaz_flow_completed", JSON.stringify(completed));
        localStorage.setItem("jfaz_flow_mode", mode);
      } catch (e) {
        console.error("Could not save onboarding state to localStorage", e);
      }
    },
    []
  );

  const scrollToStep = useCallback((stepId: number) => {
    const step = ONBOARDING_STEPS.find((s) => s.id === stepId);
    if (!step) return;

    setTimeout(() => {
      const element = document.getElementById(step.targetId);
      if (element) {
        const yOffset = -90; // offset for sticky navbar + stepper
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }, 50);
  }, []);

  const goToStep = useCallback(
    (stepId: number, autoScroll: boolean = true) => {
      if (stepId < 1 || stepId > ONBOARDING_STEPS.length) return;
      setCurrentStepId(stepId);
      saveState(stepId, completedSteps, flowMode);
      if (autoScroll) {
        scrollToStep(stepId);
      }
    },
    [completedSteps, flowMode, saveState, scrollToStep]
  );

  const markStepComplete = useCallback(
    (stepId: number) => {
      setCompletedSteps((prev) => {
        if (!prev.includes(stepId)) {
          const updated = [...prev, stepId];
          saveState(currentStepId, updated, flowMode);
          return updated;
        }
        return prev;
      });
    },
    [currentStepId, flowMode, saveState]
  );

  const nextStep = useCallback(() => {
    markStepComplete(currentStepId);
    if (currentStepId < ONBOARDING_STEPS.length) {
      const nextId = currentStepId + 1;
      goToStep(nextId, true);
    }
  }, [currentStepId, goToStep, markStepComplete]);

  const prevStep = useCallback(() => {
    if (currentStepId > 1) {
      const prevId = currentStepId - 1;
      goToStep(prevId, true);
    }
  }, [currentStepId, goToStep]);

  const switchMode = useCallback(
    (newMode: FlowMode) => {
      setFlowMode(newMode);
      saveState(currentStepId, completedSteps, newMode);
    },
    [completedSteps, currentStepId, saveState]
  );

  const startGuidedTour = useCallback(() => {
    setFlowMode("guided");
    goToStep(1, true);
  }, [goToStep]);

  const resetProgress = useCallback(() => {
    setCurrentStepId(1);
    setCompletedSteps([]);
    saveState(1, [], flowMode);
    scrollToStep(1);
  }, [flowMode, saveState, scrollToStep]);

  const currentStep =
    ONBOARDING_STEPS.find((s) => s.id === currentStepId) || ONBOARDING_STEPS[0];
  const progressPercentage = Math.round(
    ((completedSteps.length) / ONBOARDING_STEPS.length) * 100
  );

  return {
    steps: ONBOARDING_STEPS,
    currentStepId,
    currentStep,
    completedSteps,
    progressPercentage,
    flowMode,
    isClient,
    goToStep,
    nextStep,
    prevStep,
    markStepComplete,
    switchMode,
    startGuidedTour,
    resetProgress,
    scrollToStep,
  };
}
