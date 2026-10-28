"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { Award, CheckCircle2, XCircle, RotateCcw, Sparkles, Laptop } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Question {
  id: number;
  question: string;
  options: { text: string; correct: boolean; explanation: string }[];
}

const physicalQuizQuestions: Question[] = [
  {
    id: 1,
    question: "Muss ich eigene Bettwäsche ins JFAZ mitbringen?",
    options: [
      {
        text: "Ja, Kissen, Decke und Bezüge müssen komplett mitgebracht werden.",
        correct: false,
        explanation: "Falsch: Bettwäsche wird gestellt!",
      },
      {
        text: "Nein, Bettwäsche wird gestellt. Nur eigene Handtücher einpacken!",
        correct: true,
        explanation: "Richtig! Bettwäsche wird gestellt. Du brauchst nur dein Handtuch & Duschgel.",
      },
      {
        text: "Nur ein Schlafsack ist erlaubt.",
        correct: false,
        explanation: "Falsch: Du schläfst in einem Einzelzimmer, Bettwäsche wird gestellt.",
      },
    ],
  },
  {
    id: 2,
    question: "Was öffnet dir bei deinem Aufenthalt Zimmer, Seiteneingänge und Zufahrtstor?",
    options: [
      {
        text: "Ein klassischer Schlüsselbund, den du per Post bekommst.",
        correct: false,
        explanation: "Falsch: Du bekommst vor Ort einen Transponder.",
      },
      {
        text: "Ein Transponder, den du bei der Anmeldung am Anreisetag erhältst.",
        correct: true,
        explanation: "Genau richtig! Den Transponder gibt es bei der Anmeldung.",
      },
      {
        text: "Gar nichts – alle Türen sind immer offen.",
        correct: false,
        explanation: "Falsch: Zimmer und Eingänge öffnest du mit deinem Transponder.",
      },
    ],
  },
  {
    id: 3,
    question: "Was gilt am Abreisetag?",
    options: [
      {
        text: "Einfach losfahren, das Zimmer wird komplett vom Personal gemacht.",
        correct: false,
        explanation: "Falsch: Bett abziehen und Transponder zurückgeben gehören dazu.",
      },
      {
        text: "Bett abziehen und den Transponder bis 14:00 Uhr zurückgeben.",
        correct: true,
        explanation: "Sehr gut aufgepasst! So klappt die Abreise reibungslos.",
      },
      {
        text: "Den Transponder als Andenken mitnehmen.",
        correct: false,
        explanation: "Falsch: Der Transponder muss bis 14:00 Uhr zurückgegeben werden.",
      },
    ],
  },
];

const onlineQuizQuestions: Question[] = [
  {
    id: 1,
    question: "Wann solltest du dich am Seminartag in den virtuellen Raum einwählen?",
    options: [
      {
        text: "Erst 10 Minuten nach offiziellem Beginn.",
        correct: false,
        explanation: "Falsch: Pünktlichkeit ist auch online wichtig für den reibungslosen Seminarstart.",
      },
      {
        text: "Ca. 15 Minuten vor Seminarbeginn für den Ton- und Kamera-Check.",
        correct: true,
        explanation: "Richtig! So vermeidest du Hektik und stellst sicher, dass Headset und Bild sauber funktionieren.",
      },
      {
        text: "Einloggen ist optional, man kann die Aufzeichnung später schauen.",
        correct: false,
        explanation: "Falsch: Online-Lehrgänge leben vom Mitmachen – du nimmst live teil."
      },
    ],
  },
  {
    id: 2,
    question: "Wo findest du verbindliche Vorgaben, z. B. ob deine Kamera an sein muss?",
    options: [
      {
        text: "Irgendwo in Social Media.",
        correct: false,
        explanation: "Falsch: Verbindlich ist das, was dir die HKJF schickt.",
      },
      {
        text: "In deiner Einladung bzw. bei der Lehrgangsleitung.",
        correct: true,
        explanation: "Sehr gut! Einladung und Lehrgangsleitung sagen dir, was für deinen Lehrgang gilt.",
      },
      {
        text: "Das muss ich mir selbst ausdenken.",
        correct: false,
        explanation: "Falsch: Die Vorgaben stehen in deiner Einladung.",
      },
    ],
  },
  {
    id: 3,
    question: "Musst du für diesen Lehrgang persönlich nach Marburg-Cappel reisen?",
    options: [
      {
        text: "Ja, am ersten Vormittag zur Passkontrolle.",
        correct: false,
        explanation: "Falsch: Reines Online-Seminar – keine Reise erforderlich!",
      },
      {
        text: "Nein, es ist ein 100% digitales Online-Seminar bequem von zu Hause aus.",
        correct: true,
        explanation: "Genau richtig! Du sparst Fahrtzeit, packst keinen Koffer und lernst am eigenen Schreibtisch.",
      },
      {
        text: "Ja, um die Teilnahmebescheinigung abzuholen.",
        correct: false,
        explanation: "Falsch: Für ein Online-Seminar musst du nicht anreisen."
      },
    ],
  },
];

interface StartklarQuizProps {
  isOnline?: boolean;
  courseTitle?: string;
}

export function StartklarQuiz({ isOnline = false, courseTitle }: StartklarQuizProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  const activeQuestions = isOnline ? onlineQuizQuestions : physicalQuizQuestions;

  // Reset quiz when course format changes
  useEffect(() => {
    setSelectedAnswers({});
    setShowResults(false);
  }, [isOnline]);

  const handleSelectOption = (questionId: number, optionIndex: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const calculateScore = () => {
    let score = 0;
    activeQuestions.forEach((q) => {
      const selected = selectedAnswers[q.id];
      if (selected !== undefined && q.options[selected].correct) {
        score += 1;
      }
    });
    return score;
  };

  const handleFinish = () => {
    setShowResults(true);
    const score = calculateScore();
    if (score === activeQuestions.length) {
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (e) {}
    }
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setShowResults(false);
  };

  const isComplete = Object.keys(selectedAnswers).length === activeQuestions.length;
  const score = calculateScore();

  return (
    <section id="quiz" className="py-16 sm:py-20 bg-slate-50 border-b border-border/70">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <Badge variant="default" className="mb-3">
            {isOnline ? "Online-Startklar-Check" : "Abschluss-Check"}
          </Badge>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-hkjf-navy tracking-tight">
            {isOnline ? "Bist du startklar fürs Online-Seminar?" : "Bist du startklar fürs JFAZ?"}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            {isOnline
              ? "Teste in 3 schnellen Fragen, ob du alle Online-Regeln, Einwahlzeiten und Voraussetzungen kennst."
              : "Teste in 3 kurzen Fragen, ob du an alles Wichtige für deinen Aufenthalt gedacht hast."}
          </p>
        </div>

        {/* Questions Grid */}
        <div className="space-y-6">
          {activeQuestions.map((q, qIndex) => {
            const selectedIdx = selectedAnswers[q.id];

            return (
              <Card key={q.id} className="border-2 border-slate-200/90 shadow-sm overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-black uppercase text-hkjf-red">
                      Frage {qIndex + 1} von {activeQuestions.length}
                    </span>
                  </div>
                  <CardTitle className="text-base sm:text-lg text-hkjf-navy">
                    {q.question}
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-2.5">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = selectedIdx === optIdx;
                    let optionStyle = "border-slate-200 hover:border-hkjf-red/50 bg-white text-slate-700";

                    if (showResults) {
                      if (opt.correct) {
                        optionStyle = "border-emerald-500 bg-emerald-50 text-emerald-950 font-bold";
                      } else if (isSelected && !opt.correct) {
                        optionStyle = "border-red-400 bg-red-50 text-red-900";
                      } else {
                        optionStyle = "border-slate-200 opacity-60 bg-slate-50";
                      }
                    } else if (isSelected) {
                      optionStyle = "border-hkjf-navy bg-slate-100 text-hkjf-navy font-bold shadow-xs";
                    }

                    return (
                      <button
                        key={optIdx}
                        disabled={showResults}
                        onClick={() => handleSelectOption(q.id, optIdx)}
                        className={`w-full p-3.5 rounded-xl border-2 text-left text-xs sm:text-sm transition-all duration-150 flex items-start gap-3 select-none cursor-pointer ${optionStyle}`}
                      >
                        <div className="w-5 h-5 rounded-full border-2 border-slate-300 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs bg-white">
                          {String.fromCharCode(65 + optIdx)}
                        </div>
                        <span className="flex-grow">{opt.text}</span>
                        {showResults && opt.correct && (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                        )}
                        {showResults && isSelected && !opt.correct && (
                          <XCircle className="w-5 h-5 text-red-500 shrink-0" />
                        )}
                      </button>
                    );
                  })}

                  {showResults && (
                    <div
                      className={`p-3 rounded-xl text-xs font-semibold mt-3 ${
                        q.options[selectedIdx]?.correct
                          ? "bg-emerald-100 text-emerald-900"
                          : "bg-red-100 text-red-900"
                      }`}
                    >
                      {q.options[selectedIdx]?.explanation || "Bitte eine Antwort wählen."}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Action Button & Result */}
        <div className="mt-8 text-center">
          {!showResults ? (
            <Button
              size="lg"
              disabled={!isComplete}
              onClick={handleFinish}
              className="bg-hkjf-red hover:bg-hkjf-redDark text-white font-bold px-8 shadow-md gap-2 cursor-pointer"
            >
              <Award className="w-5 h-5" />
              <span>Antworten auswerten ({Object.keys(selectedAnswers).length}/{activeQuestions.length})</span>
            </Button>
          ) : (
            <div className="bg-gradient-to-br from-slate-900 to-hkjf-navyDark text-white p-8 rounded-3xl shadow-xl space-y-4 max-w-xl mx-auto animate-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center mx-auto font-black text-2xl shadow-lg">
                {isOnline ? <Laptop className="w-8 h-8 text-slate-950" /> : <Sparkles className="w-8 h-8 text-slate-950" />}
              </div>

              <div className="space-y-1">
                <Badge variant="gold" className="font-bold uppercase tracking-wider text-slate-950">
                  Dein Ergebnis
                </Badge>
                <h3 className="text-2xl font-black">
                  {score === 3
                    ? isOnline
                      ? "100% startklar fürs Online-Seminar!"
                      : "Hervorragend! Du bist 100% startklar!"
                    : `Du hast ${score} von 3 Fragen richtig!`}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {score === 3
                    ? isOnline
                      ? `Du hast deinen digitalen Schreibtisch optimal vorbereitet und kennst alle Online-Regeln für "${courseTitle || "dein Seminar"}". Wir wünschen dir viel Erfolg und produktive Stunden!`
                      : `Du kennst die wichtigsten Abläufe für deinen Aufenthalt. Wir wünschen dir einen schönen Lehrgang in Marburg-Cappel!`
                    : "Lies dir die Tipps oben noch einmal in Ruhe durch, dann bist du bestens vorbereitet."}
                </p>
              </div>

              <div className="pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleReset}
                  className="bg-white/10 hover:bg-white/20 text-white border-white/30 font-bold gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Quiz wiederholen</span>
                </Button>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
