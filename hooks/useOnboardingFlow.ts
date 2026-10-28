"use client";

import { useState, useEffect, useCallback, useRef } from "react";

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
    title: "Anreise, Einfahrt & Anmeldung",
    shortTitle: "Anreise",
    description: "Navigationsadresse, neue Einfahrt, Anmeldezeiten und Transponder.",
    estimatedTime: "1 Min.",
    iconName: "Navigation",
  },
  {
    id: 3,
    slug: "campus",
    targetId: "step-campus",
    title: "Gelände, Zimmer & Verpflegung",
    shortTitle: "Campus",
    description: "Geländeübersicht, Einzelzimmer, Essenszeiten und Lageplan.",
    estimatedTime: "1.5 Min.",
    iconName: "MapPin",
  },
  {
    id: 4,
    slug: "ablauf",
    targetId: "step-ablauf",
    title: "Tagesablauf & Essenszeiten",
    shortTitle: "Tagesablauf",
    description: "Frühstück, Unterrichtsblöcke und Essenszeiten.",
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
    description: "Einkauf in der Nähe und Antworten auf häufige Fragen.",
    estimatedTime: "1 Min.",
    iconName: "ShoppingBag",
  },
  {
    id: 7,
    slug: "quiz",
    targetId: "step-quiz",
    title: "Startklar-Quiz",
    shortTitle: "Startklar-Quiz",
    description: "3 kurze Fragen, um zu prüfen, ob du an alles gedacht hast.",
    estimatedTime: "1 Min.",
    iconName: "Award",
  },
];

export const ONLINE_ONBOARDING_STEPS: OnboardingStep[] = [
  {
    id: 1,
    slug: "lehrgang",
    targetId: "step-lehrgang",
    title: "Online-Lehrgang & Format",
    shortTitle: "Lehrgang",
    description: "Reines Online-Seminar gewählt (100% digital, keine Anreise nach Marburg).",
    estimatedTime: "1 Min.",
    iconName: "GraduationCap",
  },
  {
    id: 2,
    slug: "anreise",
    targetId: "step-anreise",
    title: "Virtueller Check-in & Technik",
    shortTitle: "Zugang & Technik",
    description: "Meeting-Link, Einwahlzeiten, Audio/Video-Test & Systemvoraussetzungen.",
    estimatedTime: "1 Min.",
    iconName: "Navigation",
  },
  {
    id: 3,
    slug: "campus",
    targetId: "step-campus",
    title: "Digitaler Seminarraum & Netiquette",
    shortTitle: "Online-Raum",
    description: "Teams/BigBlueButton, Breakout-Rooms & digitale Zusammenarbeit.",
    estimatedTime: "1.5 Min.",
    iconName: "MapPin",
  },
  {
    id: 4,
    slug: "ablauf",
    targetId: "step-ablauf",
    title: "Online-Ablauf & Bildschirmpausen",
    shortTitle: "Online-Ablauf",
    description: "Unterrichtsblöcke, Pausenregelung & Verpflegung am heimischen Schreibtisch.",
    estimatedTime: "1 Min.",
    iconName: "Clock",
  },
  {
    id: 5,
    slug: "packliste",
    targetId: "step-packliste",
    title: "Schreibtisch- & Technik-Checkliste",
    shortTitle: "Checkliste",
    description: "Headset, Webcam & Notizen digital abhaken.",
    estimatedTime: "1.5 Min.",
    iconName: "Package",
  },
  {
    id: 6,
    slug: "umgebung",
    targetId: "step-umgebung",
    title: "Online-Support & FAQ",
    shortTitle: "Support & FAQ",
    description: "Hilfe bei Verbindungsproblemen, Kamera-Regeln & Seminarunterlagen.",
    estimatedTime: "1 Min.",
    iconName: "ShoppingBag",
  },
  {
    id: 7,
    slug: "quiz",
    targetId: "step-quiz",
    title: "Online-Startklar-Quiz",
    shortTitle: "Startklar-Quiz",
    description: "3 kurze Fragen rund um dein Online-Seminar.",
    estimatedTime: "1 Min.",
    iconName: "Award",
  },
];

export type FlowMode = "guided" | "overview";

// How long scroll-spy stays quiet after a programmatic jump (smooth scroll passes other steps)
const SCROLL_LOCK_MS = 1200;

export function useOnboardingFlow(isOnline: boolean = false) {
  const [currentStepId, setCurrentStepId] = useState<number>(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [flowMode, setFlowMode] = useState<FlowMode>("guided");
  const [isClient, setIsClient] = useState(false);
  const scrollLockUntil = useRef(0);

  const activeSteps = isOnline ? ONLINE_ONBOARDING_STEPS : ONBOARDING_STEPS;
  const stepCount = activeSteps.length;

  // Load from localStorage
  useEffect(() => {
    try {
      const savedStep = localStorage.getItem("jfaz_flow_step");
      if (savedStep) {
        const stepNum = parseInt(savedStep, 10);
        if (stepNum >= 1 && stepNum <= stepCount) {
          setCurrentStepId(stepNum);
        }
      }
      const savedCompleted = localStorage.getItem("jfaz_flow_completed");
      if (savedCompleted) {
        const parsed = JSON.parse(savedCompleted);
        if (Array.isArray(parsed)) {
          setCompletedSteps(
            parsed.filter((n): n is number => Number.isInteger(n) && n >= 1 && n <= stepCount)
          );
        }
      }
      const savedMode = localStorage.getItem("jfaz_flow_mode") as FlowMode;
      if (savedMode === "guided" || savedMode === "overview") {
        setFlowMode(savedMode);
      }
    } catch (e) {
      console.error("Could not restore onboarding state from localStorage", e);
    }
    setIsClient(true);
  }, [stepCount]);

  // Persist after every change (only once the saved state has been restored)
  useEffect(() => {
    if (!isClient) return;
    try {
      localStorage.setItem("jfaz_flow_step", currentStepId.toString());
      localStorage.setItem("jfaz_flow_completed", JSON.stringify(completedSteps));
      localStorage.setItem("jfaz_flow_mode", flowMode);
    } catch (e) {
      console.error("Could not save onboarding state to localStorage", e);
    }
  }, [isClient, currentStepId, completedSteps, flowMode]);

  const scrollToStep = useCallback(
    (stepId: number) => {
      const step = activeSteps.find((s) => s.id === stepId);
      if (!step) return;

      scrollLockUntil.current = Date.now() + SCROLL_LOCK_MS;
      setTimeout(() => {
        // Offset for the sticky navbar + stepper comes from `scroll-padding-top` (see globals.css)
        document.getElementById(step.targetId)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
    },
    [activeSteps]
  );

  // Scroll-spy: keep the current step in sync with the section the user is reading
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      if (Date.now() < scrollLockUntil.current) return;
      const offset =
        parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
      const triggerLine = offset + window.innerHeight * 0.25;
      let active = activeSteps[0].id;
      for (const step of activeSteps) {
        const el = document.getElementById(step.targetId);
        if (el && el.getBoundingClientRect().top <= triggerLine) {
          active = step.id;
        }
      }
      setCurrentStepId((prev) => (prev === active ? prev : active));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [activeSteps]);

  const goToStep = useCallback(
    (stepId: number, autoScroll: boolean = true) => {
      if (stepId < 1 || stepId > stepCount) return;
      setCurrentStepId(stepId);
      if (autoScroll) {
        scrollToStep(stepId);
      }
    },
    [stepCount, scrollToStep]
  );

  const markStepComplete = useCallback((stepId: number) => {
    setCompletedSteps((prev) => (prev.includes(stepId) ? prev : [...prev, stepId]));
  }, []);

  // `fromStepId` lets each section's own footer advance from *its* step,
  // independent of where the scroll-spy currently is.
  const nextStep = useCallback(
    (fromStepId?: number) => {
      const from = fromStepId ?? currentStepId;
      markStepComplete(from);
      if (from < stepCount) {
        goToStep(from + 1, true);
      }
    },
    [stepCount, currentStepId, goToStep, markStepComplete]
  );

  const prevStep = useCallback(
    (fromStepId?: number) => {
      const from = fromStepId ?? currentStepId;
      if (from > 1) {
        goToStep(from - 1, true);
      }
    },
    [currentStepId, goToStep]
  );

  const switchMode = useCallback((newMode: FlowMode) => {
    setFlowMode(newMode);
  }, []);

  const startGuidedTour = useCallback(() => {
    setFlowMode("guided");
    goToStep(1, true);
  }, [goToStep]);

  const resetProgress = useCallback(() => {
    setCurrentStepId(1);
    setCompletedSteps([]);
  }, []);

  const currentStep =
    activeSteps.find((s) => s.id === currentStepId) || activeSteps[0];
  const progressPercentage = Math.round(
    (completedSteps.length / stepCount) * 100
  );

  return {
    steps: activeSteps,
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
