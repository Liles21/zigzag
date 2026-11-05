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
  ShieldCheck,
  AlertTriangle,
  Sparkles,
  QrCode,
  CheckCircle2,
  Lock,
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
  const [responseStats, setResponseStats] = useState<{ correct: number; wrong: number; total: number }>({
    correct: 0,
    wrong: 0,
    total: 0,
  });

  // Poll live response stats from mobile audience every 2 seconds
  useEffect(() => {
    let isMounted = true;
    const fetchStats = () => {
      fetch(`/api/activity/responses?questionId=${currentItem.id}`)
        .then((res) => res.json())
        .then((data) => {
          if (isMounted && data.stats) {
            setResponseStats(data.stats);
          }
        })
        .catch(() => {});
    };

    fetchStats();
    const interval = setInterval(fetchStats, 2000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [currentItem.id]);

  const handleSimulateResponse = (correct: boolean) => {
    fetch('/api/activity/responses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        questionId: currentItem.id,
        isCorrect: correct,
        selectedOption: correct ? currentItem.title : 'Incorrect Option',
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.stats) setResponseStats(data.stats);
      })
      .catch(() => {});
  };

  const handleResetVotes = () => {
    fetch('/api/activity/responses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        questionId: currentItem.id,
        reset: true,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.stats) setResponseStats(data.stats);
      })
      .catch(() => {});
  };

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
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '14px' }}>
      {/* Question Header Card */}
      <div
        style={{
          backgroundColor: '#0c0d13',
          border: '1px solid rgba(255, 255, 255, 0.14)',
          borderRadius: '16px',
          padding: '14px 18px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
        }}
      >
        <div>
          <span
            style={{
              display: 'inline-block',
              fontSize: '11px',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              padding: '3px 10px',
              borderRadius: '9999px',
              backgroundColor: isPolicy ? 'rgba(16, 185, 129, 0.2)' : 'rgba(244, 63, 94, 0.2)',
              color: isPolicy ? '#6ee7b7' : '#fda4af',
              border: isPolicy
                ? '1px solid rgba(16, 185, 129, 0.4)'
                : '1px solid rgba(244, 63, 94, 0.4)',
            }}
          >
            {currentItem.categoryTitle} • CHALLENGE {currentItem.questionNumber}
          </span>
          <h3
            style={{
              fontSize: '18px',
              fontWeight: 800,
              color: '#ffffff',
              marginTop: '4px',
            }}
          >
            Guess the {isPolicy ? 'ICT Policy' : 'ICT Issue'}
          </h3>
        </div>

        {/* Reveal Answer Button */}
        <button
          type="button"
          onClick={handleToggleReveal}
          style={{
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 16px',
            borderRadius: '12px',
            fontSize: '13px',
            fontWeight: 800,
            color: '#ffffff',
            backgroundColor: isAnswerRevealed ? '#2a2d3d' : '#e11d48',
            border: isAnswerRevealed
              ? '1px solid rgba(251, 191, 36, 0.4)'
              : '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: isAnswerRevealed ? 'none' : '0 4px 14px rgba(225, 29, 72, 0.4)',
            transition: 'all 0.15s ease',
          }}
        >
          {isAnswerRevealed ? (
            <>
              <EyeOff className="w-4 h-4 text-amber-300" />
              <span style={{ color: '#fde68a' }}>Hide Answer</span>
            </>
          ) : (
            <>
              <Eye className="w-4 h-4 text-white" />
              <span>Show Correct Answer</span>
            </>
          )}
        </button>
      </div>

      {/* Picture Frame Section (Hidden on Presenter Screen until Revealed) */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '260px',
          backgroundColor: '#08090e',
          borderRadius: '16px',
          overflow: 'hidden',
          border: '1px solid rgba(255, 255, 255, 0.14)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
        }}
      >
        {isAnswerRevealed ? (
          <>
            <Image
              src={currentItem.imageSrc}
              alt={currentItem.title}
              fill
              className="object-contain p-3 animate-in fade-in duration-300"
              sizes="(max-width: 768px) 100vw, 600px"
              priority
            />

            {/* Revealed Badge */}
            <div
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                backgroundColor: 'rgba(16, 185, 129, 0.9)',
                color: '#ffffff',
                fontSize: '11px',
                fontWeight: 800,
                padding: '4px 10px',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.5)',
              }}
            >
              Revealed Picture
            </div>
          </>
        ) : (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              padding: '24px',
              gap: '12px',
            }}
          >
            <div
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '18px',
                backgroundColor: 'rgba(236, 72, 153, 0.12)',
                border: '1px solid rgba(236, 72, 153, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 24px rgba(236, 72, 153, 0.2)',
              }}
            >
              <Lock className="w-7 h-7 text-pink-400" />
            </div>
            <div>
              <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#ffffff' }}>
                Picture Clue Hidden
              </h4>
              <p
                style={{
                  fontSize: '13px',
                  color: '#cbd5e1',
                  marginTop: '4px',
                  maxWidth: '360px',
                  lineHeight: 1.4,
                }}
              >
                Audience can view this clue picture on their phones by scanning the QR code on the left!
              </p>
            </div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                padding: '5px 12px',
                borderRadius: '9999px',
                fontSize: '11px',
                color: '#f472b6',
                fontWeight: 700,
              }}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Reveals here when you click &quot;Show Correct Answer&quot;</span>
            </div>
          </div>
        )}
      </div>

      {/* LIVE AUDIENCE RESPONSES SCORECARD (Shows Correct vs Wrong Answers) */}
      <div
        style={{
          backgroundColor: '#0c0d14',
          border: '1px solid rgba(255, 255, 255, 0.16)',
          borderRadius: '16px',
          padding: '14px 18px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '10px',
            flexWrap: 'wrap',
            gap: '8px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                fontSize: '12px',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: '#cbd5e1',
              }}
            >
              Audience Response Tally
            </span>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                color: '#f472b6',
                backgroundColor: 'rgba(236, 72, 153, 0.15)',
                padding: '2px 8px',
                borderRadius: '6px',
                border: '1px solid rgba(236, 72, 153, 0.3)',
              }}
            >
              {responseStats.total} {responseStats.total === 1 ? 'Submission' : 'Submissions'}
            </span>
          </div>

          {/* Quick Demo Controls for Presenter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <button
              type="button"
              onClick={() => handleSimulateResponse(true)}
              style={{
                cursor: 'pointer',
                fontSize: '11px',
                fontWeight: 700,
                color: '#34d399',
                backgroundColor: 'rgba(16, 185, 129, 0.15)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                padding: '3px 8px',
                borderRadius: '6px',
              }}
              title="Add 1 simulated correct vote (for testing)"
            >
              +1 Correct
            </button>
            <button
              type="button"
              onClick={() => handleSimulateResponse(false)}
              style={{
                cursor: 'pointer',
                fontSize: '11px',
                fontWeight: 700,
                color: '#fb7185',
                backgroundColor: 'rgba(244, 63, 94, 0.15)',
                border: '1px solid rgba(244, 63, 94, 0.3)',
                padding: '3px 8px',
                borderRadius: '6px',
              }}
              title="Add 1 simulated wrong vote (for testing)"
            >
              +1 Wrong
            </button>
            {responseStats.total > 0 && (
              <button
                type="button"
                onClick={handleResetVotes}
                style={{
                  cursor: 'pointer',
                  fontSize: '11px',
                  fontWeight: 600,
                  color: '#94a3b8',
                  backgroundColor: '#1f2230',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  padding: '3px 8px',
                  borderRadius: '6px',
                }}
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {/* 2 Big Score Cards: Correct vs Wrong */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          {/* CORRECT ANSWERS BOX */}
          <div
            style={{
              backgroundColor: 'rgba(6, 78, 59, 0.35)',
              border: '2px solid #10b981',
              borderRadius: '12px',
              padding: '10px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  backgroundColor: '#10b981',
                  color: '#000000',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 900,
                }}
              >
                <Check className="w-5 h-5 stroke-[3]" />
              </div>
              <div>
                <span style={{ fontSize: '14px', fontWeight: 900, color: '#6ee7b7', display: 'block' }}>
                  Got It Correct
                </span>
                <span style={{ fontSize: '11px', color: '#a7f3d0' }}>
                  {responseStats.total > 0
                    ? `${Math.round((responseStats.correct / responseStats.total) * 100)}% accuracy`
                    : 'Awaiting answers'}
                </span>
              </div>
            </div>
            <span
              style={{
                fontSize: '28px',
                fontWeight: 900,
                color: '#34d399',
                fontFamily: 'monospace',
              }}
            >
              {responseStats.correct}
            </span>
          </div>

          {/* WRONG ANSWERS BOX */}
          <div
            style={{
              backgroundColor: 'rgba(76, 5, 25, 0.35)',
              border: '2px solid #f43f5e',
              borderRadius: '12px',
              padding: '10px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  backgroundColor: '#f43f5e',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 900,
                }}
              >
                <X className="w-5 h-5 stroke-[3]" />
              </div>
              <div>
                <span style={{ fontSize: '14px', fontWeight: 900, color: '#fda4af', display: 'block' }}>
                  Got It Wrong
                </span>
                <span style={{ fontSize: '11px', color: '#fecdd3' }}>
                  {responseStats.total > 0
                    ? `${Math.round((responseStats.wrong / responseStats.total) * 100)}% incorrect`
                    : 'Awaiting answers'}
                </span>
              </div>
            </div>
            <span
              style={{
                fontSize: '28px',
                fontWeight: 900,
                color: '#fb7185',
                fontFamily: 'monospace',
              }}
            >
              {responseStats.wrong}
            </span>
          </div>
        </div>

        {/* Live Colored Split Bar */}
        {responseStats.total > 0 && (
          <div
            style={{
              width: '100%',
              height: '10px',
              borderRadius: '9999px',
              backgroundColor: '#1f2230',
              overflow: 'hidden',
              display: 'flex',
              marginTop: '10px',
            }}
          >
            <div
              style={{
                width: `${(responseStats.correct / responseStats.total) * 100}%`,
                backgroundColor: '#10b981',
                transition: 'width 0.4s ease',
              }}
            />
            <div
              style={{
                width: `${(responseStats.wrong / responseStats.total) * 100}%`,
                backgroundColor: '#f43f5e',
                transition: 'width 0.4s ease',
              }}
            />
          </div>
        )}
      </div>

      {/* Answer / Instructions Card */}
      <div
        style={{
          backgroundColor: '#0f1017',
          border: '1px solid rgba(255, 255, 255, 0.14)',
          borderRadius: '16px',
          padding: '16px 20px',
          minHeight: '120px',
        }}
      >
        {isAnswerRevealed ? (
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: '#34d399',
                fontSize: '12px',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '4px',
              }}
            >
              <CheckCircle2 className="w-4 h-4" /> Official Correct Answer
            </div>
            <h4
              style={{
                fontSize: '22px',
                fontWeight: 900,
                color: '#ffffff',
                letterSpacing: '-0.02em',
              }}
            >
              {currentItem.title}
            </h4>
            <p
              style={{
                fontSize: '13px',
                color: '#e2e8f0',
                marginTop: '6px',
                lineHeight: 1.5,
              }}
            >
              {currentItem.description}
            </p>

            <div
              style={{
                marginTop: '12px',
                paddingTop: '10px',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <span
                style={{
                  display: 'block',
                  fontSize: '11px',
                  fontWeight: 700,
                  color: '#94a3b8',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginBottom: '8px',
                }}
              >
                Key Discussion Points for Presenter:
              </span>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {currentItem.keyPoints.map((point, i) => (
                  <li
                    key={i}
                    style={{
                      fontSize: '12px',
                      color: '#f1f5f9',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '8px',
                      backgroundColor: 'rgba(255, 255, 255, 0.04)',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                    }}
                  >
                    <span
                      style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '9999px',
                        backgroundColor: '#ec4899',
                        marginTop: '5px',
                        flexShrink: 0,
                      }}
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '10px 0' }}>
            <p style={{ color: '#ffffff', fontSize: '15px', fontWeight: 700 }}>
              Waiting for audience guesses...
            </p>
            <p style={{ color: '#cbd5e1', fontSize: '13px', marginTop: '4px' }}>
              Click{' '}
              <strong style={{ color: '#f43f5e' }}>&quot;Show Correct Answer&quot;</strong> when
              your audience is ready to see the answer and discussion points!
            </p>
          </div>
        )}
      </div>

      {/* Presenter Step Navigation (Previous / Next) */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
        }}
      >
        <button
          type="button"
          onClick={handlePrev}
          disabled={currentIndex === 0 && category === 'policies'}
          style={{
            cursor: currentIndex === 0 && category === 'policies' ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '10px 18px',
            borderRadius: '12px',
            backgroundColor: '#222533',
            color: '#ffffff',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            fontSize: '13px',
            fontWeight: 700,
            opacity: currentIndex === 0 && category === 'policies' ? 0.35 : 1,
            transition: 'all 0.15s ease',
          }}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>

        <span
          style={{
            fontSize: '13px',
            color: '#cbd5e1',
            fontFamily: 'monospace',
            fontWeight: 700,
          }}
        >
          {isPolicy ? 'Policies' : 'Issues'} {currentIndex + 1} / {totalQuestions}
        </span>

        <button
          type="button"
          onClick={handleNext}
          disabled={currentIndex === totalQuestions - 1 && category === 'issues'}
          style={{
            cursor:
              currentIndex === totalQuestions - 1 && category === 'issues'
                ? 'not-allowed'
                : 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '10px 20px',
            borderRadius: '12px',
            background: 'linear-gradient(to right, #db2777, #e11d48)',
            color: '#ffffff',
            fontSize: '13px',
            fontWeight: 800,
            boxShadow: '0 4px 14px rgba(225, 29, 72, 0.4)',
            opacity: currentIndex === totalQuestions - 1 && category === 'issues' ? 0.35 : 1,
            transition: 'all 0.15s ease',
          }}
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
          maxWidth: '1080px',
          maxHeight: '94vh',
          backgroundColor: '#111218',
          border: '1px solid rgba(255, 255, 255, 0.18)',
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
            backgroundColor: '#090a0f',
            borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #db2777, #f43f5e)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(219, 39, 119, 0.4)',
              }}
            >
              <QrCode className="w-5 h-5 text-white" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h2 style={{ fontSize: '16px', fontWeight: 800, color: '#ffffff' }}>
                  Interactive Activity: Guess the Picture
                </h2>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 800,
                    backgroundColor: 'rgba(236, 72, 153, 0.25)',
                    color: '#f472b6',
                    padding: '2px 8px',
                    borderRadius: '9999px',
                    border: '1px solid rgba(236, 72, 153, 0.4)',
                  }}
                >
                  Presenter Screen
                </span>
              </div>
              <p style={{ fontSize: '12px', color: '#cbd5e1', marginTop: '2px' }}>
                Audience scans the QR code to guess on their phones • You reveal the correct answer
              </p>
            </div>
          </div>

          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            style={{
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 14px',
              borderRadius: '12px',
              backgroundColor: '#222533',
              color: '#ffffff',
              fontSize: '12px',
              fontWeight: 700,
              border: '1px solid rgba(255, 255, 255, 0.2)',
            }}
            aria-label="Close Activity and Return to 3D Brochure"
          >
            <X className="w-4 h-4 text-white" />
            <span>Close / Back to Brochure</span>
          </button>
        </div>

        {/* Category Selector Tabs with HIGH CONTRAST & FULL VISIBILITY */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 20px',
            backgroundColor: '#0c0d13',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            flexWrap: 'wrap',
            gap: '10px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#cbd5e1' }}>Category:</span>

            {/* TAB 1: ICT POLICIES */}
            <button
              type="button"
              onClick={() => handleCategoryChange('policies')}
              style={{
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                borderRadius: '12px',
                fontSize: '13px',
                fontWeight: isPolicy ? 800 : 700,
                backgroundColor: isPolicy ? '#059669' : '#1e212b',
                color: '#ffffff',
                border: isPolicy
                  ? '2px solid #34d399'
                  : '1px solid rgba(255, 255, 255, 0.25)',
                boxShadow: isPolicy ? '0 4px 14px rgba(16, 185, 129, 0.35)' : 'none',
              }}
            >
              <ShieldCheck className="w-4 h-4 text-white" />
              <span>1. ICT POLICIES</span>
              <span
                style={{
                  fontSize: '11px',
                  backgroundColor: 'rgba(0, 0, 0, 0.4)',
                  padding: '2px 6px',
                  borderRadius: '6px',
                  color: '#ffffff',
                  fontFamily: 'monospace',
                }}
              >
                5 Questions
              </span>
            </button>

            {/* TAB 2: ICT ISSUES */}
            <button
              type="button"
              onClick={() => handleCategoryChange('issues')}
              style={{
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                borderRadius: '12px',
                fontSize: '13px',
                fontWeight: !isPolicy ? 800 : 700,
                backgroundColor: !isPolicy ? '#e11d48' : '#1e212b',
                color: '#ffffff',
                border: !isPolicy
                  ? '2px solid #fb7185'
                  : '1px solid rgba(255, 255, 255, 0.25)',
                boxShadow: !isPolicy ? '0 4px 14px rgba(225, 29, 72, 0.35)' : 'none',
              }}
            >
              <AlertTriangle className="w-4 h-4 text-white" />
              <span>2. ICT ISSUES</span>
              <span
                style={{
                  fontSize: '11px',
                  backgroundColor: 'rgba(0, 0, 0, 0.4)',
                  padding: '2px 6px',
                  borderRadius: '6px',
                  color: '#ffffff',
                  fontFamily: 'monospace',
                }}
              >
                5 Questions
              </span>
            </button>
          </div>

          {/* Quick Question Selector Pills [1] [2] [3] [4] [5] with High Visibility */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {questions.map((q, idx) => {
              const isActive = currentIndex === idx;
              return (
                <button
                  type="button"
                  key={q.id}
                  onClick={() => setCurrentIndex(idx)}
                  style={{
                    cursor: 'pointer',
                    width: '34px',
                    height: '34px',
                    borderRadius: '10px',
                    fontSize: '14px',
                    fontWeight: 800,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: isActive
                      ? isPolicy
                        ? '#10b981'
                        : '#f43f5e'
                      : '#222533',
                    color: isActive ? (isPolicy ? '#000000' : '#ffffff') : '#ffffff',
                    border: isActive
                      ? '2px solid #ffffff'
                      : '1px solid rgba(255, 255, 255, 0.25)',
                    boxShadow: isActive ? '0 0 10px rgba(255, 255, 255, 0.5)' : 'none',
                  }}
                  title={`Jump to Question ${idx + 1}`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Body */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '18px 22px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* LEFT: QR Code Scanner Card (lg:col-span-5) */}
            <div
              className="lg:col-span-5"
              style={{
                backgroundColor: '#0c0d13',
                border: '1px solid rgba(255, 255, 255, 0.14)',
                padding: '20px',
                borderRadius: '16px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
              }}
            >
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '12px',
                }}
              >
                <span
                  style={{
                    fontSize: '12px',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    color: '#f472b6',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                  Audience Scan Code
                </span>
                <span
                  style={{
                    fontSize: '12px',
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    color: '#ffffff',
                    backgroundColor: '#1f2230',
                    padding: '3px 8px',
                    borderRadius: '6px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                  }}
                >
                  Question {currentIndex + 1} of {questions.length}
                </span>
              </div>

              {/* QR Code Canvas */}
              <div
                style={{
                  padding: '12px',
                  backgroundColor: '#ffffff',
                  borderRadius: '16px',
                  border: '4px solid #222533',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.7)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {qrDataUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={qrDataUrl}
                    alt={`QR Code for ${currentItem.title}`}
                    className="w-48 h-48 sm:w-56 sm:h-56 object-contain rounded-lg"
                  />
                ) : (
                  <div className="w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center text-black text-xs font-mono">
                    Generating QR...
                  </div>
                )}
              </div>

              <p
                style={{
                  fontSize: '13px',
                  textAlign: 'center',
                  color: '#e2e8f0',
                  fontWeight: 600,
                  marginTop: '14px',
                  maxWidth: '280px',
                  lineHeight: 1.4,
                }}
              >
                Audience can scan with phone camera to view the picture and submit their guess!
              </p>

              {/* URL Preview */}
              <div
                style={{
                  marginTop: '10px',
                  padding: '6px 12px',
                  backgroundColor: '#161822',
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  maxWidth: '290px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  fontSize: '11px',
                  fontFamily: 'monospace',
                  color: '#94a3b8',
                }}
                title={mobilePlayUrl}
              >
                {mobilePlayUrl}
              </div>

              {/* Direct Link Controls */}
              <div
                style={{
                  width: '100%',
                  marginTop: '16px',
                  paddingTop: '12px',
                  borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <button
                  type="button"
                  onClick={handleCopyLink}
                  style={{
                    cursor: 'pointer',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    backgroundColor: '#222533',
                    color: '#ffffff',
                    fontSize: '13px',
                    fontWeight: 700,
                    padding: '10px 16px',
                    borderRadius: '12px',
                    border: '1px solid rgba(255, 255, 255, 0.25)',
                    transition: 'all 0.15s ease',
                  }}
                  title="Copy Direct Link"
                >
                  {copiedLink ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span style={{ color: '#34d399' }}>Copied Link!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-white" />
                      <span>Copy Link</span>
                    </>
                  )}
                </button>
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
