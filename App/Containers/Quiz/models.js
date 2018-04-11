export function Question (payload) {
  return {
    category: payload.category,
    type: payload.type,
    difficulty: payload.difficulty,
    question: payload.question,
    correctAnswer: payload.correct_answer === 'True',
    isCorrect: null
  }
}
