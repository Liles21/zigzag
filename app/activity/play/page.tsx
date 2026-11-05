'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import {
  ShieldCheck,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
  Maximize2,
  X,
  Send,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { getActivityById, ICT_ACTIVITIES, ActivityItem } from '@/lib/activityData';

interface QuestionCardProps {
  item: ActivityItem;
}

function QuestionCard({ item }: QuestionCardProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [typedGuess, setTypedGuess] = useState('');
  const [isFullscreenImage, setIsFullscreenImage] = useState(false);

  const handleSelectOption = (option: string) => {
    setSelectedOption(option);
    setHasAnswered(true);

    const correct = option.toLowerCase().trim() === item.title.toLowerCase().trim();
    setIsCorrect(correct);

    if (correct) {
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate([100, 50, 100]);
      }
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
      });
    }
  };

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!typedGuess.trim()) return;

    const normalizedGuess = typedGuess.toLowerCase().trim();
    const normalizedAnswer = item.title.toLowerCase().trim();
    const correct =
      normalizedGuess === normalizedAnswer ||
      normalizedAnswer.includes(normalizedGuess) ||
      normalizedGuess.includes(normalizedAnswer);

    setSelectedOption(typedGuess);
    setHasAnswered(true);
    setIsCorrect(correct);

    if (correct) {
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate([100, 50, 100]);
      }
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  };

  const isPolicy = item.category === 'policies';

  return (
    <div className="w-full max-w-md flex flex-col gap-4">
      {/* Instruction Header */}
      <div className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-4 shadow-xl">
        <div className="flex items-center gap-2 text-pink-400 text-xs font-semibold uppercase tracking-wider mb-1">
          <Sparkles className="w-3.5 h-3.5" /> Guess the Picture!
        </div>
        <h2 className="text-base sm:text-lg font-bold text-white">
          What {isPolicy ? 'ICT Policy' : 'ICT Issue'} does this image represent?
        </h2>
        <p className="text-xs text-neutral-400 mt-1">
          Examine the clue picture below and select or type your guess!
        </p>
      </div>

      {/* Clue Picture Card */}
      <div className="relative group bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl">
        <div className="relative w-full aspect-[4/3] bg-neutral-950 flex items-center justify-center">
          <Image
            src={item.imageSrc}
            alt="Activity Clue Picture"
            fill
            className="object-contain p-2"
            sizes="(max-width: 640px) 100vw, 400px"
            priority
          />

          {/* Tap to zoom button */}
          <button
            onClick={() => setIsFullscreenImage(true)}
            className="absolute top-2 right-2 bg-black/70 hover:bg-black text-white p-2 rounded-xl backdrop-blur-md border border-white/20 transition-transform active:scale-95"
            aria-label="View Fullscreen"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>

        <div className="p-3 bg-neutral-900/95 flex items-center justify-between border-t border-neutral-800/80">
          <span className="text-[11px] text-neutral-400 flex items-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5 text-neutral-500" />
            Tap image to zoom
          </span>

          {/* Hint Button */}
          <button
            onClick={() => setShowHint(!showHint)}
            className="text-xs font-medium text-amber-400 hover:text-amber-300 flex items-center gap-1 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20 active:scale-95 transition-all"
          >
            <Lightbulb className="w-3.5 h-3.5" />
            {showHint ? 'Hide Hint' : 'Need a Hint?'}
          </button>
        </div>

        {/* Hint Overlay / Drawer */}
        {showHint && (
          <div className="p-3 bg-amber-950/40 border-t border-amber-500/30 text-amber-200 text-xs animate-in fade-in slide-in-from-top-1">
            <span className="font-semibold text-amber-400 block mb-0.5">Clue:</span>
            {item.hint}
          </div>
        )}
      </div>

      {/* Answer Feedback Banner */}
      {hasAnswered && (
        <div
          className={`p-4 rounded-2xl border text-sm animate-in fade-in zoom-in-95 duration-200 shadow-xl ${
            isCorrect
              ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
              : 'bg-rose-950/60 border-rose-500 text-rose-200'
          }`}
        >
          <div className="flex items-start gap-3">
            {isCorrect ? (
              <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
            ) : (
              <XCircle className="w-6 h-6 text-rose-400 shrink-0 mt-0.5" />
            )}
            <div className="flex-1">
              <h3 className="font-bold text-base">
                {isCorrect ? 'Correct! Fantastic job!' : 'Not quite right!'}
              </h3>
              <p className="text-xs mt-1 text-neutral-300">
                {isCorrect ? (
                  <>
                    You correctly identified{' '}
                    <strong className="text-emerald-400 underline decoration-emerald-500">
                      {item.title}
                    </strong>
                    ! Listen to the presenter for key discussion points.
                  </>
                ) : (
                  'That is not the exact answer. You can try tapping another choice or wait for the presenter to reveal!'
                )}
              </p>
            </div>
          </div>

          {isCorrect && (
            <div className="mt-3 pt-3 border-t border-emerald-500/30 text-xs text-neutral-200">
              <p className="font-semibold text-emerald-300 mb-1">Overview:</p>
              <p>{item.description}</p>
            </div>
          )}
        </div>
      )}

      {/* Multiple Choice Options */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-neutral-400 tracking-wider uppercase px-1">
          Choose an Option:
        </label>

        <div className="grid grid-cols-1 gap-2">
          {item.options.map((option, idx) => {
            const letter = String.fromCharCode(65 + idx);
            const isSelected = selectedOption === option;
            const isActualCorrect =
              option.toLowerCase().trim() === item.title.toLowerCase().trim();

            let btnStyle =
              'bg-neutral-900/90 border-neutral-800 text-neutral-200 hover:border-neutral-700 hover:bg-neutral-850';

            if (hasAnswered) {
              if (isSelected) {
                btnStyle = isCorrect
                  ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 ring-2 ring-emerald-500/50'
                  : 'bg-rose-950/80 border-rose-500 text-rose-200 ring-2 ring-rose-500/50';
              } else if (isActualCorrect && isCorrect) {
                btnStyle = 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300';
              }
            }

            return (
              <button
                key={option}
                onClick={() => handleSelectOption(option)}
                className={`flex items-center gap-3 p-3.5 rounded-xl border text-left text-sm font-medium transition-all active:scale-[0.98] ${btnStyle}`}
              >
                <span
                  className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                    isSelected
                      ? isCorrect
                        ? 'bg-emerald-500 text-black'
                        : 'bg-rose-500 text-white'
                      : 'bg-neutral-800 text-neutral-400'
                  }`}
                >
                  {letter}
                </span>
                <span className="flex-1">{option}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Or Type Your Own Guess */}
      <div className="mt-2 bg-neutral-900/60 border border-neutral-800/80 rounded-2xl p-4">
        <label className="text-xs font-medium text-neutral-400 block mb-2">
          Or type your exact guess:
        </label>
        <form onSubmit={handleTextSubmit} className="flex gap-2">
          <input
            type="text"
            value={typedGuess}
            onChange={(e) => setTypedGuess(e.target.value)}
            placeholder="e.g. Data Privacy"
            className="flex-1 bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-pink-500 transition-colors"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white font-medium text-xs px-4 py-2.5 rounded-xl flex items-center gap-1.5 shrink-0 active:scale-95 transition-all"
          >
            <Send className="w-3.5 h-3.5" /> Submit
          </button>
        </form>
      </div>

      {/* Fullscreen Image Lightbox Modal */}
      {isFullscreenImage && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-4 backdrop-blur-md"
          onClick={() => setIsFullscreenImage(false)}
        >
          <button
            onClick={() => setIsFullscreenImage(false)}
            className="absolute top-4 right-4 bg-neutral-800 text-white p-2.5 rounded-full hover:bg-neutral-700 transition-all z-10"
            aria-label="Close Fullscreen"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="relative w-full max-w-lg aspect-square">
            <Image
              src={item.imageSrc}
              alt="Full Clue Picture"
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>
          <p className="text-neutral-400 text-xs mt-4">Tap anywhere to close zoom</p>
        </div>
      )}
    </div>
  );
}

function PlayContent() {
  const searchParams = useSearchParams();
  const rawId = searchParams.get('id') || 'policy-data-privacy';
  const item: ActivityItem = getActivityById(rawId) || ICT_ACTIVITIES[0];
  const isPolicy = item.category === 'policies';

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col items-center p-3 sm:p-6 pb-20 selection:bg-pink-500 selection:text-white">
      {/* Top Banner */}
      <div className="w-full max-w-md flex items-center justify-between py-2 border-b border-neutral-800 mb-4">
        <div className="flex items-center gap-2">
          {isPolicy ? (
            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs border border-emerald-500/30">
              <ShieldCheck className="w-4 h-4" />
            </div>
          ) : (
            <div className="w-7 h-7 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold text-xs border border-rose-500/30">
              <AlertTriangle className="w-4 h-4" />
            </div>
          )}
          <div>
            <span
              className={`text-[10px] tracking-wider uppercase font-bold px-2 py-0.5 rounded-full ${
                isPolicy
                  ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/40'
                  : 'bg-rose-950/80 text-rose-300 border border-rose-500/40'
              }`}
            >
              {item.categoryTitle}
            </span>
            <h1 className="text-sm font-semibold text-neutral-300 mt-0.5">
              Question {item.questionNumber} of {item.totalInCategory}
            </h1>
          </div>
        </div>

        <span className="text-xs text-neutral-400 font-mono bg-neutral-900 px-2 py-1 rounded border border-neutral-800">
          Mobile Audience
        </span>
      </div>

      {/* Main Question Card with key to automatically reset state on question change */}
      <QuestionCard key={item.id} item={item} />

      {/* Footer Info */}
      <footer className="mt-8 text-center text-[11px] text-neutral-600 max-w-md">
        ICT Policies & Issues Presentation Portfolio • Group 6 • Romoculo, Timbal, Atecibo,
        Sanchez, Tabogon, Salado, Quijano
      </footer>
    </div>
  );
}

export default function PlayPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-neutral-950 flex items-center justify-center text-neutral-400 text-sm">
          Loading Activity Clue...
        </div>
      }
    >
      <PlayContent />
    </Suspense>
  );
}
