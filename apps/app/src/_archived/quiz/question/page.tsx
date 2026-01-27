"use client"

import QuizInterface from "@/components/quiz-interface"

const sampleQuestions = [
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

export default function Home() {
  return (
    <main>
      <QuizInterface
        questions={sampleQuestions}
        onQuizComplete={(results) => {
          console.log("Quiz completed:", results)
        }}
      />
    </main>
  )
}
