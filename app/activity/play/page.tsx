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
  Sparkles,
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

  const sendResponseToPresenter = (chosen: string, correct: boolean) => {
    try {
      fetch('/api/activity/responses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionId: item.id,
          isCorrect: correct,
          selectedOption: chosen,
        }),
      }).catch((err) => console.log('Response tally error', err));
    } catch {
      // Ignore background post error
    }
  };

  const handleSelectOption = (option: string) => {
    const correct = option.toLowerCase().trim() === item.title.toLowerCase().trim();
    setSelectedOption(option);
    setHasAnswered(true);
    setIsCorrect(correct);

    sendResponseToPresenter(option, correct);

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

    sendResponseToPresenter(typedGuess, correct);

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
    <div style={{ width: '100%', maxWidth: '440px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
      {/* Instruction Header */}
      <div
        style={{
          backgroundColor: '#111219',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          borderRadius: '16px',
          padding: '14px 18px',
          boxShadow: '0 8px 20px rgba(0,0,0,0.5)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            color: '#f472b6',
            fontSize: '11px',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '4px',
          }}
        >
          <Sparkles className="w-3.5 h-3.5 text-pink-400" /> Guess the Picture!
        </div>
        <h2 style={{ fontSize: '17px', fontWeight: 800, color: '#ffffff', lineHeight: 1.3 }}>
          What {isPolicy ? 'ICT Policy' : 'ICT Issue'} does this image represent?
        </h2>
        <p style={{ fontSize: '12px', color: '#cbd5e1', marginTop: '4px' }}>
          Examine the clue picture below and tap your guess!
        </p>
      </div>

      {/* Clue Picture Card with EXPLICIT 250px Height (Never Collapses!) */}
      <div
        style={{
          backgroundColor: '#0c0d14',
          border: '1px solid rgba(255, 255, 255, 0.16)',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 10px 25px rgba(0,0,0,0.6)',
        }}
      >
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '250px',
            backgroundColor: '#050608',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Image
            src={item.imageSrc}
            alt="Activity Clue Picture"
            fill
            className="object-contain p-3"
            sizes="(max-width: 640px) 100vw, 420px"
            priority
          />
        </div>

        {/* Hint Control Row */}
        <div
          style={{
            padding: '10px 14px',
            backgroundColor: '#111219',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 600 }}>
            {isPolicy ? 'ICT Policy Clue' : 'ICT Issue Clue'}
          </span>

          <button
            type="button"
            onClick={() => setShowHint(!showHint)}
            style={{
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: '8px',
              backgroundColor: 'rgba(245, 158, 11, 0.15)',
              border: '1px solid rgba(245, 158, 11, 0.35)',
              color: '#fcd34d',
              fontSize: '12px',
              fontWeight: 700,
            }}
          >
            <Lightbulb className="w-3.5 h-3.5" />
            <span>{showHint ? 'Hide Hint' : 'Need a Hint?'}</span>
          </button>
        </div>

        {/* Collapsible Hint Drawer */}
        {showHint && (
          <div
            style={{
              padding: '12px 16px',
              backgroundColor: 'rgba(245, 158, 11, 0.1)',
              borderTop: '1px solid rgba(245, 158, 11, 0.3)',
              color: '#fef08a',
              fontSize: '13px',
              lineHeight: 1.4,
            }}
          >
            <strong style={{ color: '#fbbf24', display: 'block', marginBottom: '2px' }}>
              Clue:
            </strong>
            {item.hint}
          </div>
        )}
      </div>

      {/* Answer Feedback Banner */}
      {hasAnswered && (
        <div
          style={{
            padding: '14px 18px',
            borderRadius: '16px',
            backgroundColor: isCorrect ? 'rgba(6, 78, 59, 0.85)' : 'rgba(76, 5, 25, 0.85)',
            border: isCorrect ? '2px solid #10b981' : '2px solid #f43f5e',
            color: '#ffffff',
            boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
            {isCorrect ? (
              <CheckCircle2 className="w-6 h-6 text-emerald-300 shrink-0 mt-0.5" />
            ) : (
              <XCircle className="w-6 h-6 text-rose-300 shrink-0 mt-0.5" />
            )}
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#ffffff' }}>
                {isCorrect ? 'Correct! Fantastic job!' : 'Not quite right!'}
              </h3>
              <p style={{ fontSize: '13px', color: '#f1f5f9', marginTop: '4px', lineHeight: 1.4 }}>
                {isCorrect ? (
                  <>
                    You correctly guessed{' '}
                    <strong style={{ color: '#6ee7b7', textDecoration: 'underline' }}>
                      {item.title}
                    </strong>
                    ! Your answer has been counted on the presenter screen.
                  </>
                ) : (
                  'That was not the correct answer. You can try tapping another choice or wait for the presenter to reveal!'
                )}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Multiple Choice Options with HIGH CONTRAST & READABLE TEXT */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label
          style={{
            fontSize: '12px',
            fontWeight: 800,
            color: '#cbd5e1',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            paddingLeft: '4px',
          }}
        >
          Choose an Option:
        </label>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {item.options.map((option, idx) => {
            const letter = String.fromCharCode(65 + idx); // A, B, C, D
            const isSelected = selectedOption === option;
            const isActualCorrect =
              option.toLowerCase().trim() === item.title.toLowerCase().trim();

            let bg = '#181a24';
            let border = '1.5px solid rgba(255, 255, 255, 0.2)';
            let textColor = '#ffffff';

            if (hasAnswered) {
              if (isSelected) {
                if (isCorrect) {
                  bg = '#064e3b';
                  border = '2px solid #10b981';
                  textColor = '#6ee7b7';
                } else {
                  bg = '#4c0519';
                  border = '2px solid #f43f5e';
                  textColor = '#fda4af';
                }
              } else if (isActualCorrect && isCorrect) {
                bg = 'rgba(6, 78, 59, 0.4)';
                border = '1.5px solid #10b981';
                textColor = '#6ee7b7';
              }
            }

            return (
              <button
                key={option}
                type="button"
                onClick={() => handleSelectOption(option)}
                style={{
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  backgroundColor: bg,
                  border: border,
                  color: textColor,
                  fontSize: '14px',
                  fontWeight: 700,
                  textAlign: 'left',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                  transition: 'all 0.15s ease',
                }}
              >
                <span
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '13px',
                    fontWeight: 800,
                    backgroundColor: isSelected
                      ? isCorrect
                        ? '#10b981'
                        : '#f43f5e'
                      : '#2a2e40',
                    color: isSelected && isCorrect ? '#000000' : '#ffffff',
                    flexShrink: 0,
                  }}
                >
                  {letter}
                </span>
                <span style={{ flex: 1 }}>{option}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Or Type Your Exact Guess */}
      <div
        style={{
          backgroundColor: '#111219',
          border: '1px solid rgba(255, 255, 255, 0.14)',
          borderRadius: '16px',
          padding: '14px 16px',
        }}
      >
        <label
          style={{
            fontSize: '12px',
            fontWeight: 700,
            color: '#cbd5e1',
            display: 'block',
            marginBottom: '8px',
          }}
        >
          Or type your exact guess:
        </label>
        <form onSubmit={handleTextSubmit} style={{ display: 'flex', gap: '8px' }}>
          <input
            type="text"
            value={typedGuess}
            onChange={(e) => setTypedGuess(e.target.value)}
            placeholder="e.g. Data Privacy"
            style={{
              flex: 1,
              backgroundColor: '#07080c',
              border: '1.5px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '10px',
              padding: '10px 14px',
              fontSize: '13px',
              color: '#ffffff',
              outline: 'none',
            }}
          />
          <button
            type="submit"
            style={{
              cursor: 'pointer',
              background: 'linear-gradient(to right, #db2777, #f43f5e)',
              color: '#ffffff',
              fontWeight: 800,
              fontSize: '13px',
              padding: '10px 18px',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              border: 'none',
              boxShadow: '0 4px 12px rgba(219, 39, 119, 0.4)',
            }}
          >
            <Send className="w-3.5 h-3.5" /> Submit
          </button>
        </form>
      </div>
    </div>
  );
}

function PlayContent() {
  const searchParams = useSearchParams();
  const rawId = searchParams.get('id') || 'policy-data-privacy';
  const item: ActivityItem = getActivityById(rawId) || ICT_ACTIVITIES[0];
  const isPolicy = item.category === 'policies';

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#06070a',
        color: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '14px 16px 40px 16px',
      }}
    >
      {/* Top Banner */}
      <div
        style={{
          width: '100%',
          maxWidth: '440px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingBottom: '12px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
          marginBottom: '16px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {isPolicy ? (
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                backgroundColor: 'rgba(16, 185, 129, 0.2)',
                color: '#34d399',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(16, 185, 129, 0.4)',
              }}
            >
              <ShieldCheck className="w-4 h-4" />
            </div>
          ) : (
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                backgroundColor: 'rgba(244, 63, 94, 0.2)',
                color: '#fb7185',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(244, 63, 94, 0.4)',
              }}
            >
              <AlertTriangle className="w-4 h-4" />
            </div>
          )}
          <div>
            <span
              style={{
                fontSize: '11px',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                fontWeight: 800,
                padding: '2px 8px',
                borderRadius: '9999px',
                backgroundColor: isPolicy ? 'rgba(16, 185, 129, 0.25)' : 'rgba(244, 63, 94, 0.25)',
                color: isPolicy ? '#6ee7b7' : '#fda4af',
                border: isPolicy
                  ? '1px solid rgba(16, 185, 129, 0.4)'
                  : '1px solid rgba(244, 63, 94, 0.4)',
              }}
            >
              {item.categoryTitle}
            </span>
            <h1 style={{ fontSize: '14px', fontWeight: 700, color: '#f1f5f9', marginTop: '2px' }}>
              Question {item.questionNumber} of {item.totalInCategory}
            </h1>
          </div>
        </div>

        <span
          style={{
            fontSize: '11px',
            color: '#cbd5e1',
            fontFamily: 'monospace',
            backgroundColor: '#161824',
            padding: '4px 8px',
            borderRadius: '6px',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            fontWeight: 600,
          }}
        >
          Audience Mode
        </span>
      </div>

      {/* Main Question Card with key to automatically reset state on question change */}
      <QuestionCard key={item.id} item={item} />

      {/* Footer Info */}
      <footer
        style={{
          marginTop: '28px',
          textAlign: 'center',
          fontSize: '11px',
          color: '#64748b',
          maxWidth: '440px',
          lineHeight: 1.4,
        }}
      >
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
        <div
          style={{
            minHeight: '100vh',
            backgroundColor: '#06070a',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#94a3b8',
            fontSize: '14px',
          }}
        >
          Loading Activity Clue...
        </div>
      }
    >
      <PlayContent />
    </Suspense>
  );
}
