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

  if (!questionId) {
    return NextResponse.json(statsStore);
  }

  const stats = getOrCreateStats(questionId);
  return NextResponse.json({
    questionId,
    stats,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
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
      return NextResponse.json({ success: true, stats: statsStore[questionId] });
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
    });
  } catch (err) {
    return NextResponse.json({ error: 'Invalid request', details: String(err) }, { status: 500 });
  }
}

