"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { Award, CheckCircle2, XCircle, RotateCcw, Sparkles, ShieldCheck } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Question {
  id: number;
  question: string;
  options: { text: string; correct: boolean; explanation: string }[];
}

const quizQuestions: Question[] = [
  {
    id: 1,
    question: "Muss ich eigene Bettwäsche ins JFAZ mitbringen?",
    options: [
      {
        text: "Ja, Kissen, Decke und Bezüge müssen komplett mitgebracht werden.",
        correct: false,
        explanation: "Falsch: Bettwäsche ist im JFAZ vorhanden und bezogen!",
      },
      {
        text: "Nein, Bettwäsche ist vorhanden und frisch bezogen. Nur eigene Handtücher einpacken!",
        correct: true,
        explanation: "Richtig! Bettwäsche ist vor Ort. Du brauchst nur dein Handtuch & Duschgel.",
      },
      {
        text: "Nur ein Schlafsack ist erlaubt.",
        correct: false,
        explanation: "Falsch: Du schläfst in einem bequemen Bett mit frischer Bettwäsche.",
      },
    ],
  },
  {
    id: 2,
    question: "Wo erhältst du deinen Zimmerschlüssel bei deiner Ankunft?",
    options: [
      {
        text: "Im Supermarkt um die Ecke.",
        correct: false,
        explanation: "Falsch: Den Schlüssel gibt es direkt am Campus.",
      },
      {
        text: "Direkt an der Pforte / Rezeption im JFAZ-Hauptgebäude.",
        correct: true,
        explanation: "Genau richtig! Die Pforte begrüßt dich und händigt dir deine Zimmerkarte aus.",
      },
      {
        text: "Der Schlüssel liegt unter der Fußmatte.",
        correct: false,
        explanation: "Falsch: Bitte melde dich an der offiziellen Pforte.",
      },
    ],
  },
  {
    id: 3,
    question: "Welche Geschäfte erreichst du zu Fuß in Cappel in wenigen Minuten?",
    options: [
      {
        text: "Keine, das JFAZ liegt fernab jeder Zivilisation.",
        correct: false,
        explanation: "Falsch: Cappel hat eine hervorragende Nahversorgung.",
      },
      {
        text: "ALDI Nord, Lidl, tegut, dm-Drogerie, Apotheke und Pizzeria/Imbiss.",
        correct: true,
        explanation: "Sehr gut aufgepasst! Alles ist in 7 bis 12 Minuten gemütlich zu Fuß erreichbar.",
      },
      {
        text: "Nur einen Flughafen.",
        correct: false,
        explanation: "Falsch: In Cappel gibt es tolle Supermärkte, Drogerien und Imbisse.",
      },
    ],
  },
];

export function StartklarQuiz() {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  const handleSelectOption = (questionId: number, optionIndex: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const calculateScore = () => {
    let score = 0;
    quizQuestions.forEach((q) => {
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
    if (score === quizQuestions.length) {
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

  const isComplete = Object.keys(selectedAnswers).length === quizQuestions.length;
  const score = calculateScore();

  return (
    <section id="quiz" className="py-16 sm:py-20 bg-white border-b border-border/70 scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <Badge variant="gold" className="mb-3">
            Interaktiver Schnell-Check
          </Badge>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-hkjf-navy tracking-tight">
            Bist du startklar fürs JFAZ?
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Teste dein Wissen in 3 kurzen Fragen und sichere dir dein persönliches Startklar-Abzeichen!
          </p>
        </div>

        {/* Questions List */}
        <div className="space-y-6">
          {quizQuestions.map((q, qIndex) => {
            const selectedIdx = selectedAnswers[q.id];

            return (
              <Card key={q.id} className="border-2 border-slate-200/90 shadow-sm">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-black uppercase text-hkjf-red">
                      Frage {qIndex + 1} von {quizQuestions.length}
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
                        className={`w-full p-3.5 rounded-xl border-2 text-left text-xs sm:text-sm transition-all duration-150 flex items-start gap-3 select-none ${optionStyle}`}
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

        {/* Action Button & Result Certificate */}
        <div className="mt-8 text-center">
          {!showResults ? (
            <Button
              size="lg"
              disabled={!isComplete}
              onClick={handleFinish}
              className="bg-hkjf-red hover:bg-hkjf-redDark text-white font-bold px-8 shadow-md gap-2"
            >
              <Award className="w-5 h-5" />
              <span>Antworten auswerten ({Object.keys(selectedAnswers).length}/{quizQuestions.length})</span>
            </Button>
          ) : (
            <div className="bg-gradient-to-br from-slate-900 to-hkjf-navyDark text-white p-8 rounded-3xl shadow-xl space-y-4 max-w-xl mx-auto animate-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center mx-auto font-black text-2xl shadow-lg">
                <Sparkles className="w-8 h-8 text-slate-950" />
              </div>

              <div className="space-y-1">
                <Badge variant="gold" className="font-bold uppercase tracking-wider text-slate-950">
                  Offizieller Startklar-Nachweis
                </Badge>
                <h3 className="text-2xl font-black">
                  {score === 3
                    ? "Hervorragend! Du bist 100% startklar!"
                    : `Du hast ${score} von 3 Fragen richtig!`}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300">
                  {score === 3
                    ? "Du kennst alle Abläufe, die Zimmerregeln und die Cappel-Geheimtipps. Wir wünschen dir einen fantastischen und lehrreichen Aufenthalt im JFAZ Marburg!"
                    : "Lies dir die Tipps oben noch einmal in Ruhe durch, dann bist du bestens vorbereitet."}
                </p>
              </div>

              <div className="pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleReset}
                  className="bg-white/10 hover:bg-white/20 text-white border-white/30 font-bold gap-2"
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
