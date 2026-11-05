'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  ShieldCheck,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  XCircle,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Check,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { getActivityById, ICT_ACTIVITIES, ActivityItem } from '@/lib/activityData';

interface QuestionCardProps {
  item: ActivityItem;
}

function QuestionCard({ item }: QuestionCardProps) {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // Find next and previous questions across the activities list
  const currentIndex = ICT_ACTIVITIES.findIndex((q) => q.id === item.id);
  const prevItem = currentIndex > 0 ? ICT_ACTIVITIES[currentIndex - 1] : null;
  const nextItem = currentIndex < ICT_ACTIVITIES.length - 1 ? ICT_ACTIVITIES[currentIndex + 1] : null;

  const handleSelectOption = (option: string) => {
    if (hasSubmitted) return; // Prevent changing after submission until retry
    setSelectedOption(option);
  };

  const handleSubmitAnswer = () => {
    if (!selectedOption) return;

    const correct = selectedOption.toLowerCase().trim() === item.title.toLowerCase().trim();
    setHasSubmitted(true);
    setIsCorrect(correct);

    // Send answer to the live presenter tally API
    try {
      fetch('/api/activity/responses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionId: item.id,
          isCorrect: correct,
          selectedOption,
        }),
      }).catch((err) => console.log('Response tally error', err));
    } catch {
      // Ignore background post error
    }

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

  const handleTryAgain = () => {
    setHasSubmitted(false);
    setSelectedOption(null);
  };

  const handleGoNext = () => {
    if (nextItem) {
      router.push(`/activity/play?id=${nextItem.id}`);
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handleGoPrev = () => {
    if (prevItem) {
      router.push(`/activity/play?id=${prevItem.id}`);
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const isPolicy = item.category === 'policies';

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '440px',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
        paddingBottom: '100px',
      }}
    >
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
          Examine the clue picture below, select your choice, and tap Submit!
        </p>
      </div>

      {/* Clue Picture Card (Guaranteed 240px Height) */}
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
            height: '190px',
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
            {isPolicy ? 'ICT Policy Challenge' : 'ICT Issue Challenge'}
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

      {/* Multiple Choice Options */}
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
          Select an Option:
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

            if (isSelected) {
              if (hasSubmitted) {
                if (isCorrect) {
                  bg = '#064e3b';
                  border = '2px solid #10b981';
                  textColor = '#6ee7b7';
                } else {
                  bg = '#4c0519';
                  border = '2px solid #f43f5e';
                  textColor = '#fda4af';
                }
              } else {
                // Selected before submit: glowing blue highlight
                bg = '#1e293b';
                border = '2px solid #38bdf8';
                textColor = '#ffffff';
              }
            } else if (hasSubmitted && isActualCorrect && !isCorrect) {
              // Highlight the real answer if they got it wrong
              bg = 'rgba(6, 78, 59, 0.4)';
              border = '1.5px solid #10b981';
              textColor = '#6ee7b7';
            }

            return (
              <button
                key={option}
                type="button"
                onClick={() => handleSelectOption(option)}
                style={{
                  cursor: hasSubmitted ? 'default' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '13px 16px',
                  borderRadius: '12px',
                  backgroundColor: bg,
                  border: border,
                  color: textColor,
                  fontSize: '14px',
                  fontWeight: 700,
                  textAlign: 'left',
                  boxShadow: isSelected ? '0 0 12px rgba(56, 189, 248, 0.3)' : '0 4px 12px rgba(0,0,0,0.3)',
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
                      ? hasSubmitted
                        ? isCorrect
                          ? '#10b981'
                          : '#f43f5e'
                        : '#0284c7'
                      : '#2a2e40',
                    color: isSelected && hasSubmitted && isCorrect ? '#000000' : '#ffffff',
                    flexShrink: 0,
                  }}
                >
                  {letter}
                </span>
                <span style={{ flex: 1 }}>{option}</span>
                {isSelected && !hasSubmitted && (
                  <Check className="w-4 h-4 text-sky-400 shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* SUBMIT BUTTON (When option is selected and not yet submitted) */}
      {!hasSubmitted && (
        <button
          type="button"
          onClick={handleSubmitAnswer}
          disabled={!selectedOption}
          style={{
            cursor: selectedOption ? 'pointer' : 'not-allowed',
            width: '100%',
            padding: '14px 20px',
            borderRadius: '14px',
            background: selectedOption
              ? 'linear-gradient(to right, #ec4899, #f43f5e)'
              : '#1f2230',
            color: selectedOption ? '#ffffff' : '#64748b',
            border: selectedOption ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
            fontSize: '15px',
            fontWeight: 800,
            letterSpacing: '0.02em',
            boxShadow: selectedOption ? '0 8px 24px rgba(236, 72, 153, 0.4)' : 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            transition: 'all 0.2s ease',
          }}
        >
          <span>{selectedOption ? 'Submit My Guess' : 'Tap an Option Above to Submit'}</span>
        </button>
      )}

      {/* RESULT CARD & NEXT QUESTION (Appears after submitting) */}
      {hasSubmitted && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            marginTop: '4px',
          }}
        >
          {/* Feedback Card */}
          <div
            style={{
              padding: '14px 18px',
              borderRadius: '16px',
              backgroundColor: isCorrect ? 'rgba(6, 78, 59, 0.9)' : 'rgba(76, 5, 25, 0.9)',
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
              <div style={{ flex: 1 }}>
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
                      ! Your vote has been counted on the presenter screen.
                    </>
                  ) : (
                    <>
                      The correct answer is{' '}
                      <strong style={{ color: '#fda4af' }}>{item.title}</strong>.
                    </>
                  )}
                </p>

                {!isCorrect && (
                  <button
                    type="button"
                    onClick={handleTryAgain}
                    style={{
                      cursor: 'pointer',
                      marginTop: '8px',
                      fontSize: '12px',
                      fontWeight: 700,
                      color: '#ffffff',
                      backgroundColor: 'rgba(255, 255, 255, 0.15)',
                      border: '1px solid rgba(255, 255, 255, 0.25)',
                      padding: '4px 10px',
                      borderRadius: '8px',
                    }}
                  >
                    Change / Re-submit Guess
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Prominent NEXT QUESTION Button */}
          {nextItem ? (
            <button
              type="button"
              onClick={handleGoNext}
              style={{
                cursor: 'pointer',
                width: '100%',
                padding: '14px 20px',
                borderRadius: '14px',
                background: 'linear-gradient(to right, #10b981, #059669)',
                color: '#ffffff',
                border: 'none',
                fontSize: '15px',
                fontWeight: 900,
                letterSpacing: '0.02em',
                boxShadow: '0 8px 24px rgba(16, 185, 129, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'all 0.15s ease',
              }}
            >
              <span>
                {item.questionNumber === 5 && isPolicy
                  ? 'Proceed to Part 2: ICT Issues'
                  : `Next Question (${nextItem.questionNumber} of ${nextItem.totalInCategory})`}
              </span>
              <ChevronRight className="w-5 h-5" />
            </button>
          ) : (
            <div
              style={{
                padding: '12px',
                borderRadius: '12px',
                backgroundColor: '#161824',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                textAlign: 'center',
                color: '#34d399',
                fontSize: '14px',
                fontWeight: 800,
              }}
            >
              You completed all questions in the activity!
            </div>
          )}
        </div>
      )}

      {/* Bottom Step Navigation Row (Prev & Next buttons always available) */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: '6px',
          paddingTop: '10px',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <button
          type="button"
          onClick={handleGoPrev}
          disabled={!prevItem}
          style={{
            cursor: prevItem ? 'pointer' : 'not-allowed',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            backgroundColor: '#1b1e2b',
            color: prevItem ? '#ffffff' : '#64748b',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            padding: '8px 14px',
            borderRadius: '10px',
            fontSize: '12px',
            fontWeight: 700,
            opacity: prevItem ? 1 : 0.4,
          }}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>

        <span style={{ fontSize: '12px', color: '#94a3b8', fontFamily: 'monospace', fontWeight: 600 }}>
          {item.questionNumber} of {item.totalInCategory}
        </span>

        <button
          type="button"
          onClick={handleGoNext}
          disabled={!nextItem}
          style={{
            cursor: nextItem ? 'pointer' : 'not-allowed',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            backgroundColor: '#1b1e2b',
            color: nextItem ? '#ffffff' : '#64748b',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            padding: '8px 14px',
            borderRadius: '10px',
            fontSize: '12px',
            fontWeight: 700,
            opacity: nextItem ? 1 : 0.4,
          }}
        >
          <span>Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>
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
        width: '100%',
        backgroundColor: '#06070a',
        color: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '14px 16px 140px 16px',
        overflowY: 'auto',
        WebkitOverflowScrolling: 'touch',
        touchAction: 'pan-y',
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
          lineHeight: 1.5,
        }}
      >
        ICT Policies & Issues Presentation Portfolio • Group 6
        <br />
        Sabado • Sanchez • Tabugon • Timbal • Quijas • Ramacula • Ramal • Precioso
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
