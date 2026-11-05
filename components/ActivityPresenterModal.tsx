'use client';

import React, { useState, useEffect, useMemo, useSyncExternalStore } from 'react';
import Image from 'next/image';
import QRCode from 'qrcode';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
  AlertTriangle,
  Sparkles,
  QrCode,
  CheckCircle2,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { getActivitiesByCategory, ActivityItem } from '@/lib/activityData';
import { playCelebrationChime } from '@/lib/soundEffects';

interface ActivityPresenterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function subscribeToWindow() {
  return () => {};
}

function getWindowOrigin() {
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  return '';
}

interface PresenterQuestionCardProps {
  currentItem: ActivityItem;
  category: 'policies' | 'issues';
  isPolicy: boolean;
  currentIndex: number;
  totalQuestions: number;
  handlePrev: () => void;
  handleNext: () => void;
}

function PresenterQuestionCard({
  currentItem,
  category,
  isPolicy,
  currentIndex,
  totalQuestions,
  handlePrev,
  handleNext,
}: PresenterQuestionCardProps) {
  const [isAnswerRevealed, setIsAnswerRevealed] = useState<boolean>(false);

  const handleToggleReveal = () => {
    const nextState = !isAnswerRevealed;
    setIsAnswerRevealed(nextState);

    if (nextState) {
      playCelebrationChime();
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
      });
    }
  };

  return (
    <div className="lg:col-span-7 flex flex-col gap-4">
      {/* Question Header Card */}
      <div className="bg-neutral-950/70 border border-neutral-800 p-4 rounded-2xl flex items-center justify-between">
        <div>
          <span
            className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
              isPolicy
                ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                : 'bg-rose-950 text-rose-300 border border-rose-500/40'
            }`}
          >
            {currentItem.categoryTitle} • CHALLENGE {currentItem.questionNumber}
          </span>
          <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
            Guess the {isPolicy ? 'ICT Policy' : 'ICT Issue'}
          </h3>
        </div>

        {/* Reveal Answer Button */}
        <button
          onClick={handleToggleReveal}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-lg transition-all active:scale-95 ${
            isAnswerRevealed
              ? 'bg-neutral-800 hover:bg-neutral-700 text-amber-300 border border-amber-500/40'
              : 'bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white shadow-pink-600/30'
          }`}
        >
          {isAnswerRevealed ? (
            <>
              <EyeOff className="w-4 h-4" />
              <span>Hide Answer</span>
            </>
          ) : (
            <>
              <Eye className="w-4 h-4" />
              <span>Show Correct Answer</span>
            </>
          )}
        </button>
      </div>

      {/* Picture Preview & Answer Section */}
      <div className="bg-neutral-950/80 border border-neutral-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] bg-neutral-950 flex items-center justify-center border-b border-neutral-800">
          <Image
            src={currentItem.imageSrc}
            alt={currentItem.title}
            fill
            className="object-contain p-2"
            sizes="(max-width: 768px) 100vw, 600px"
            priority
          />

          {!isAnswerRevealed && (
            <div className="absolute inset-0 bg-neutral-950/40 backdrop-blur-[2px] flex items-center justify-center pointer-events-none">
              <span className="bg-black/80 text-white text-xs px-3 py-1.5 rounded-full border border-white/20 font-medium">
                Clue Image • Hidden from Presenter Title Until Revealed
              </span>
            </div>
          )}
        </div>

        {/* REVEALED ANSWER PANEL */}
        {isAnswerRevealed ? (
          <div className="p-4 sm:p-5 bg-gradient-to-b from-neutral-900 to-neutral-950 border-t border-neutral-800 animate-in fade-in duration-300">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
              <CheckCircle2 className="w-4 h-4" /> Official Correct Answer
            </div>
            <h4 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {currentItem.title}
            </h4>
            <p className="text-xs sm:text-sm text-neutral-300 mt-2 leading-relaxed">
              {currentItem.description}
            </p>

            <div className="mt-4 pt-3 border-t border-neutral-800">
              <span className="text-[11px] font-semibold text-neutral-400 block mb-2 uppercase tracking-wider">
                Key Discussion Points for Presenter:
              </span>
              <ul className="grid grid-cols-1 gap-1.5">
                {currentItem.keyPoints.map((point, i) => (
                  <li
                    key={i}
                    className="text-xs text-neutral-300 flex items-start gap-2 bg-neutral-900/60 p-2 rounded-lg border border-neutral-800/80"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-pink-500 mt-1.5 shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div className="p-4 sm:p-5 text-center text-neutral-400 text-xs">
            <p className="text-neutral-300 font-medium text-sm">
              Waiting for audience guesses...
            </p>
            <p className="mt-1">
              Click{' '}
              <strong className="text-pink-400">&quot;Show Correct Answer&quot;</strong> when
              your audience is ready to see the answer and discussion points!
            </p>
          </div>
        )}
      </div>

      {/* Presenter Step Navigation (Previous / Next) */}
      <div className="flex items-center justify-between gap-3 mt-1">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0 && category === 'policies'}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 disabled:opacity-40 disabled:hover:bg-neutral-800 text-neutral-200 text-xs sm:text-sm font-semibold transition-all active:scale-95"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous Activity</span>
        </button>

        <span className="text-xs text-neutral-400 font-mono">
          {isPolicy ? 'Policies' : 'Issues'} {currentIndex + 1} / {totalQuestions}
        </span>

        <button
          onClick={handleNext}
          disabled={currentIndex === totalQuestions - 1 && category === 'issues'}
          className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 disabled:opacity-40 text-white text-xs sm:text-sm font-bold shadow-lg shadow-pink-600/20 transition-all active:scale-95"
        >
          <span>
            {currentIndex === totalQuestions - 1 && category === 'policies'
              ? 'Start Part 2: ICT Issues →'
              : 'Next Activity'}
          </span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export const ActivityPresenterModal: React.FC<ActivityPresenterModalProps> = ({
  isOpen,
  onClose,
}) => {
  // Category: 'policies' is first as requested by the user
  const [category, setCategory] = useState<'policies' | 'issues'>('policies');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  const originUrl = useSyncExternalStore(subscribeToWindow, getWindowOrigin, () => '');

  const questions: ActivityItem[] = useMemo(
    () => getActivitiesByCategory(category),
    [category]
  );
  const currentItem: ActivityItem = questions[currentIndex] || questions[0];

  // Compute mobile URL for this specific question
  const mobilePlayUrl = useMemo(() => {
    const base = originUrl || 'https://zigzag-presentation.vercel.app';
    return `${base}/activity/play?id=${currentItem.id}`;
  }, [originUrl, currentItem.id]);

  // Generate QR Code whenever mobilePlayUrl changes
  useEffect(() => {
    let isMounted = true;
    QRCode.toDataURL(mobilePlayUrl, {
      width: 400,
      margin: 1.5,
      color: {
        dark: '#000000',
        light: '#ffffff',
      },
      errorCorrectionLevel: 'M',
    })
      .then((url) => {
        if (isMounted) setQrDataUrl(url);
      })
      .catch((err) => console.error('Failed to generate QR code', err));

    return () => {
      isMounted = false;
    };
  }, [mobilePlayUrl]);

  // Handle switching category
  const handleCategoryChange = (newCategory: 'policies' | 'issues') => {
    setCategory(newCategory);
    setCurrentIndex(0);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else if (category === 'policies') {
      setCategory('issues');
      setCurrentIndex(0);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    } else if (category === 'issues') {
      setCategory('policies');
      setCurrentIndex(4);
    }
  };

  const handleCopyLink = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(mobilePlayUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  if (!isOpen) return null;

  const isPolicy = category === 'policies';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl max-h-[96vh] flex flex-col bg-neutral-900 border border-neutral-700/80 rounded-3xl shadow-2xl overflow-hidden text-white">
        {/* Top Header & Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-3.5 bg-neutral-950/90 border-b border-neutral-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-pink-600 to-rose-500 flex items-center justify-center shadow-lg shadow-pink-500/20">
              <QrCode className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold tracking-tight text-white">
                  Interactive Activity: Guess the Picture
                </h2>
                <span className="text-[10px] bg-pink-500/20 text-pink-300 font-bold px-2 py-0.5 rounded-full border border-pink-500/30">
                  Presenter Mode
                </span>
              </div>
              <p className="text-xs text-neutral-400">
                Audience scans the QR code to guess on their phones • You reveal the correct answer
              </p>
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white text-xs font-semibold border border-neutral-700 transition-all active:scale-95"
            aria-label="Close Activity and Return to 3D Brochure"
          >
            <X className="w-4 h-4" />
            <span className="hidden sm:inline">Back to 3D Brochure</span>
          </button>
        </div>

        {/* Category Selector Tabs */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-2.5 bg-neutral-950/60 border-b border-neutral-800/80 gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-neutral-400 mr-1 hidden sm:inline">
              Category:
            </span>

            {/* TAB 1: ICT POLICIES (Guessed First) */}
            <button
              onClick={() => handleCategoryChange('policies')}
              className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                isPolicy
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 ring-2 ring-emerald-400/50'
                  : 'bg-neutral-800/80 text-neutral-400 hover:bg-neutral-700 hover:text-white'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>1. ICT POLICIES</span>
              <span className="text-[10px] bg-black/30 px-1.5 py-0.5 rounded-md font-mono">
                5 Questions
              </span>
            </button>

            {/* TAB 2: ICT ISSUES */}
            <button
              onClick={() => handleCategoryChange('issues')}
              className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                !isPolicy
                  ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30 ring-2 ring-rose-400/50'
                  : 'bg-neutral-800/80 text-neutral-400 hover:bg-neutral-700 hover:text-white'
              }`}
            >
              <AlertTriangle className="w-4 h-4" />
              <span>2. ICT ISSUES</span>
              <span className="text-[10px] bg-black/30 px-1.5 py-0.5 rounded-md font-mono">
                5 Questions
              </span>
            </button>
          </div>

          {/* Quick Question Selector Pills */}
          <div className="flex items-center gap-1">
            {questions.map((q, idx) => (
              <button
                key={q.id}
                onClick={() => {
                  setCurrentIndex(idx);
                }}
                className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                  currentIndex === idx
                    ? isPolicy
                      ? 'bg-emerald-500 text-black font-extrabold ring-2 ring-emerald-400/60'
                      : 'bg-rose-500 text-white font-extrabold ring-2 ring-rose-400/60'
                    : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700 hover:text-white'
                }`}
                title={`Jump to Question ${idx + 1}`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Content Body: Two-Column Layout (QR Code on Left, Clue/Answer on Right) */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT: QR Code Scanner Card (lg:col-span-5) */}
          <div className="lg:col-span-5 flex flex-col items-center bg-neutral-950/80 border border-neutral-800 p-5 rounded-2xl shadow-xl">
            <div className="w-full flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                Audience Scan Code
              </span>
              <span className="text-xs font-mono text-neutral-400 bg-neutral-900 px-2 py-0.5 rounded border border-neutral-800">
                Question {currentIndex + 1} of {questions.length}
              </span>
            </div>

            {/* QR Code Canvas */}
            <div className="relative p-3 bg-white rounded-2xl shadow-2xl flex items-center justify-center border-4 border-neutral-800">
              {qrDataUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={qrDataUrl}
                  alt={`QR Code for ${currentItem.title}`}
                  className="w-56 h-56 sm:w-64 sm:h-64 object-contain rounded-lg"
                />
              ) : (
                <div className="w-56 h-56 sm:w-64 sm:h-64 flex items-center justify-center text-black text-xs font-mono">
                  Generating QR...
                </div>
              )}
            </div>

            <p className="text-xs text-center text-neutral-300 font-medium mt-3 max-w-xs">
              Point your smartphone camera at this QR code to view the picture and submit your
              guess!
            </p>

            {/* Direct Link Controls */}
            <div className="w-full mt-4 pt-3 border-t border-neutral-800 flex items-center justify-between gap-2">
              <button
                onClick={handleCopyLink}
                className="flex-1 flex items-center justify-center gap-1.5 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 text-xs py-2 px-3 rounded-xl border border-neutral-800 transition-colors"
                title="Copy Direct Link"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-semibold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Link</span>
                  </>
                )}
              </button>

              <a
                href={mobilePlayUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 text-xs py-2 px-3 rounded-xl border border-neutral-800 transition-colors"
                title="Open mobile audience view in new tab"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Test View</span>
              </a>
            </div>
          </div>

          {/* RIGHT: Presenter Controls, Clue Preview & Answer Reveal (lg:col-span-7) */}
          <PresenterQuestionCard
            key={`${category}-${currentIndex}`}
            currentItem={currentItem}
            category={category}
            isPolicy={isPolicy}
            currentIndex={currentIndex}
            totalQuestions={questions.length}
            handlePrev={handlePrev}
            handleNext={handleNext}
          />
        </div>
      </div>
    </div>
  );
};
