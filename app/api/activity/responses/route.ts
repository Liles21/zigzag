import { NextResponse } from 'next/server';

// In-memory store for audience responses during the active presentation session
interface QuestionStats {
  correct: number;
  wrong: number;
  total: number;
  answers: Record<string, number>;
}

// Global variable kept warm during the server process
const statsStore: Record<string, QuestionStats> = {};

// Presenter-synchronized live active question state
let activeQuestionId: string = 'policy-data-privacy';
let activeCategory: 'policies' | 'issues' = 'policies';
let activeIndex: number = 0;

function getOrCreateStats(questionId: string): QuestionStats {
  if (!statsStore[questionId]) {
    statsStore[questionId] = {
      correct: 0,
      wrong: 0,
      total: 0,
      answers: {},
    };
  }
  return statsStore[questionId];
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const questionId = searchParams.get('questionId');

  const targetId = questionId || activeQuestionId;
  const stats = getOrCreateStats(targetId);

  return NextResponse.json({
    questionId: targetId,
    stats,
    activeQuestionId,
    activeCategory,
    activeIndex,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // 1. Presenter synchronizes active question across all connected devices
    if (body.setActiveQuestionId) {
      activeQuestionId = body.setActiveQuestionId;
      if (body.category) activeCategory = body.category;
      if (typeof body.index === 'number') activeIndex = body.index;

      return NextResponse.json({
        success: true,
        activeQuestionId,
        activeCategory,
        activeIndex,
      });
    }

    const { questionId, isCorrect, selectedOption, reset } = body;

    if (!questionId) {
      return NextResponse.json({ error: 'Missing questionId' }, { status: 400 });
    }

    if (reset) {
      statsStore[questionId] = {
        correct: 0,
        wrong: 0,
        total: 0,
        answers: {},
      };
      return NextResponse.json({ success: true, stats: statsStore[questionId], activeQuestionId });
    }

    const stats = getOrCreateStats(questionId);
    stats.total += 1;
    if (isCorrect) {
      stats.correct += 1;
    } else {
      stats.wrong += 1;
    }

    if (selectedOption) {
      stats.answers[selectedOption] = (stats.answers[selectedOption] || 0) + 1;
    }

    return NextResponse.json({
      success: true,
      stats,
      activeQuestionId,
    });
  } catch (err) {
    return NextResponse.json({ error: 'Invalid request', details: String(err) }, { status: 500 });
  }
}

