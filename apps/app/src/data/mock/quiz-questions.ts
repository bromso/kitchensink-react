// Quiz Questions Mock Data

export interface QuizQuestion {
  id: number
  question: string
  options: string[]
  correctAnswer: number
}

export interface QuizResult {
  totalQuestions: number
  correctAnswers: number
  wrongAnswers: number
  score: number
  answers: {
    questionId: number
    selectedAnswer: number
    isCorrect: boolean
  }[]
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Which of the following is a use case of tag clouds?",
    options: [
      "Listing alphabetically all categories of content on the homepage",
      "Organizing a website's main navigation",
      "Displaying a list of unrelated links on a website's footer",
      "Highlighting the most frequently used tags or topics on a blog",
    ],
    correctAnswer: 3,
  },
  {
    id: 2,
    question: "What is the primary purpose of responsive web design?",
    options: [
      "To make websites load faster",
      "To ensure websites work well on different screen sizes",
      "To improve search engine rankings",
      "To reduce development costs",
    ],
    correctAnswer: 1,
  },
  {
    id: 3,
    question: "Which HTML element is used for the largest heading?",
    options: ["<h6>", "<h3>", "<h1>", "<header>"],
    correctAnswer: 2,
  },
  {
    id: 4,
    question: "What does CSS stand for?",
    options: [
      "Computer Style Sheets",
      "Cascading Style Sheets",
      "Creative Style Sheets",
      "Colorful Style Sheets",
    ],
    correctAnswer: 1,
  },
  {
    id: 5,
    question: "Which of these is NOT a JavaScript data type?",
    options: ["String", "Boolean", "Float", "Number"],
    correctAnswer: 2,
  },
]

// Utility functions
export function calculateScore(
  questions: QuizQuestion[],
  answers: Map<number, number>
): QuizResult {
  const results: QuizResult["answers"] = []
  let correctCount = 0

  for (const question of questions) {
    const selectedAnswer = answers.get(question.id)
    const isCorrect = selectedAnswer === question.correctAnswer

    if (isCorrect) correctCount++

    results.push({
      questionId: question.id,
      selectedAnswer: selectedAnswer ?? -1,
      isCorrect,
    })
  }

  return {
    totalQuestions: questions.length,
    correctAnswers: correctCount,
    wrongAnswers: questions.length - correctCount,
    score: Math.round((correctCount / questions.length) * 100),
    answers: results,
  }
}

export function getQuestionById(id: number): QuizQuestion | undefined {
  return quizQuestions.find((q) => q.id === id)
}

export function shuffleOptions(question: QuizQuestion): QuizQuestion {
  const shuffledOptions = [...question.options].sort(() => Math.random() - 0.5)
  const newCorrectIndex = shuffledOptions.indexOf(question.options[question.correctAnswer])

  return {
    ...question,
    options: shuffledOptions,
    correctAnswer: newCorrectIndex,
  }
}
