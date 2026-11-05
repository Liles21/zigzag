'use client';

import React, { useState, useEffect, useMemo } from 'react';
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
    <div className="w-full flex flex-col gap-4">
      {/* Question Header Card */}
      <div className="bg-neutral-950 border border-neutral-800 p-4 rounded-2xl flex items-center justify-between">
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
          <h3 className="text-base sm:text-xl font-bold text-white mt-1">
            Guess the {isPolicy ? 'ICT Policy' : 'ICT Issue'}
          </h3>
        </div>

        {/* Reveal Answer Button */}
        <button
          type="button"
          onClick={handleToggleReveal}
          style={{ cursor: 'pointer' }}
          className={`flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-lg transition-all active:scale-95 ${
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
      <div className="bg-neutral-950 border border-neutral-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] bg-neutral-950 flex items-center justify-center border-b border-neutral-800 min-h-[180px]">
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
              <span className="bg-black/85 text-white text-[11px] sm:text-xs px-3 py-1.5 rounded-full border border-white/20 font-medium shadow-md">
                Clue Image • Hidden Title Until Revealed
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
          type="button"
          onClick={handlePrev}
          disabled={currentIndex === 0 && category === 'policies'}
          style={{ cursor: currentIndex === 0 && category === 'policies' ? 'not-allowed' : 'pointer' }}
          className="flex items-center gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 disabled:opacity-40 disabled:hover:bg-neutral-800 text-neutral-200 text-xs sm:text-sm font-semibold transition-all active:scale-95"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>

        <span className="text-xs text-neutral-400 font-mono">
          {isPolicy ? 'Policies' : 'Issues'} {currentIndex + 1} / {totalQuestions}
        </span>

        <button
          type="button"
          onClick={handleNext}
          disabled={currentIndex === totalQuestions - 1 && category === 'issues'}
          style={{ cursor: currentIndex === totalQuestions - 1 && category === 'issues' ? 'not-allowed' : 'pointer' }}
          className="flex items-center gap-1.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 disabled:opacity-40 text-white text-xs sm:text-sm font-bold shadow-lg shadow-pink-600/20 transition-all active:scale-95"
        >
          <span>
            {currentIndex === totalQuestions - 1 && category === 'policies'
              ? 'Start Part 2: ICT Issues →'
              : 'Next Question'}
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

  const questions: ActivityItem[] = useMemo(
    () => getActivitiesByCategory(category),
    [category]
  );
  const currentItem: ActivityItem = questions[currentIndex] || questions[0];

  // Safely construct mobile URL
  const mobilePlayUrl = useMemo(() => {
    let origin = 'https://zigzag-presentation.vercel.app';
    if (typeof window !== 'undefined' && window.location.origin) {
      origin = window.location.origin;
    }
    return `${origin}/activity/play?id=${currentItem.id}`;
  }, [currentItem.id]);

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
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 99999,
        backgroundColor: 'rgba(0, 0, 0, 0.88)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '12px',
        overflowY: 'auto',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '1060px',
          maxHeight: '94vh',
          backgroundColor: '#121319',
          border: '1px solid rgba(255, 255, 255, 0.16)',
          borderRadius: '24px',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.9)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          color: '#ffffff',
        }}
      >
        {/* Top Header & Navigation */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            padding: '14px 20px',
            backgroundColor: '#0a0a0e',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-pink-600 to-rose-500 flex items-center justify-center shadow-lg shadow-pink-500/20">
              <QrCode className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm sm:text-base font-bold tracking-tight text-white">
                  Interactive Activity: Guess the Picture
                </h2>
                <span className="text-[10px] bg-pink-500/20 text-pink-300 font-bold px-2 py-0.5 rounded-full border border-pink-500/30">
                  Presenter Screen
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-neutral-400">
                Audience scans the QR code to guess on their phones • You reveal the correct answer
              </p>
            </div>
          </div>

          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            style={{ cursor: 'pointer' }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white text-xs font-semibold border border-neutral-700 transition-all active:scale-95"
            aria-label="Close Activity and Return to 3D Brochure"
          >
            <X className="w-4 h-4" />
            <span>Close / Back to Brochure</span>
          </button>
        </div>

        {/* Category Selector Tabs */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 20px',
            backgroundColor: '#0d0e14',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            flexWrap: 'wrap',
            gap: '8px',
          }}
        >
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-neutral-400 mr-1 hidden sm:inline">
              Category:
            </span>

            {/* TAB 1: ICT POLICIES (Guessed First) */}
            <button
              type="button"
              onClick={() => handleCategoryChange('policies')}
              style={{ cursor: 'pointer' }}
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
              type="button"
              onClick={() => handleCategoryChange('issues')}
              style={{ cursor: 'pointer' }}
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
          <div className="flex items-center gap-1.5">
            {questions.map((q, idx) => (
              <button
                type="button"
                key={q.id}
                onClick={() => setCurrentIndex(idx)}
                style={{ cursor: 'pointer' }}
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg text-xs font-bold transition-all ${
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

        {/* Content Body */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '16px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* LEFT: QR Code Scanner Card (lg:col-span-5) */}
            <div className="lg:col-span-5 flex flex-col items-center bg-neutral-950 border border-neutral-800 p-5 rounded-2xl shadow-xl">
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
              <div className="p-3 bg-white rounded-2xl shadow-2xl flex items-center justify-center border-4 border-neutral-800">
                {qrDataUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={qrDataUrl}
                    alt={`QR Code for ${currentItem.title}`}
                    className="w-48 h-48 sm:w-60 sm:h-60 object-contain rounded-lg"
                  />
                ) : (
                  <div className="w-48 h-48 sm:w-60 sm:h-60 flex items-center justify-center text-black text-xs font-mono">
                    Generating QR...
                  </div>
                )}
              </div>

              <p className="text-xs text-center text-neutral-300 font-medium mt-3 max-w-xs">
                Audience can scan with phone camera to view the picture and submit their guess!
              </p>

              {/* Direct Link Controls */}
              <div className="w-full mt-4 pt-3 border-t border-neutral-800 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={handleCopyLink}
                  style={{ cursor: 'pointer' }}
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
            <div className="lg:col-span-7">
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
      </div>
    </div>
  );
};
