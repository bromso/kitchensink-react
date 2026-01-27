"use client"

import { Icon } from "@iconify/react"
import { Button } from "@repo/ui/components/button"
import { Card } from "@repo/ui/components/card"
import { Progress } from "@repo/ui/components/progress"
import {
  type MotionValue,
  motion,
  motionValue,
  useMotionTemplate,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react"
import type React from "react"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"

/* ----------------------- Types ----------------------- */
interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
}

interface QuizResults {
  totalQuestions: number
  answeredQuestions: number
  correctAnswers: number
  timeSpent: number
  answers: Record<number, number | null>
}

interface QuizInterfaceProps {
  questions: Question[]
  timeLimit?: number // in seconds
  onQuizComplete?: (results: QuizResults) => void
  onQuizExit?: () => void
}

/* ----------------------- Hooks & utils ----------------------- */
const WIDTH_FACTOR = 0.75
const SPRING = { stiffness: 400, damping: 60 }
const _ACTIVE_BG_SPRING = { stiffness: 600, damping: 40 } // parity with tab bg (if you add indicators)

// Calculate the x target like in SmoothTabs
const calculateViewX = (difference: number, containerWidth: number) =>
  difference * (containerWidth * WIDTH_FACTOR) * -1

function usePrefersReducedMotion() {
  const [reduce, setReduce] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const onChange = () => setReduce(mq.matches)
    onChange()
    mq.addEventListener?.("change", onChange)
    return () => mq.removeEventListener?.("change", onChange)
  }, [])
  return reduce
}

function useContainerWidth(ref: React.RefObject<HTMLDivElement | null>) {
  const [w, setW] = useState(0)
  useEffect(() => {
    if (!ref.current) return
    const update = () => {
      const width = ref.current?.getBoundingClientRect().width ?? 0
      setW(width)
    }
    update()
    const ro = new ResizeObserver(update)
    ro.observe(ref.current)
    window.addEventListener("resize", update)
    return () => {
      ro.disconnect()
      window.removeEventListener("resize", update)
    }
  }, [ref])
  return w
}

type SmoothMotionArgs = {
  containerWidth: number
  activeIndex: number
  viewIndex: number
  reducedMotion: boolean
}

function useSmoothPagerMotion({
  containerWidth,
  activeIndex,
  viewIndex,
  reducedMotion,
}: SmoothMotionArgs) {
  const difference = activeIndex - viewIndex

  // Always call hooks unconditionally (React rules of hooks)
  const springX = useSpring(0, SPRING)
  const staticX = useMemo(() => motionValue(0), [])
  const xVelocity = useVelocity(springX)
  const transformedOpacity = useTransform(
    springX,
    [-containerWidth * 0.6, 0, containerWidth * 0.6],
    [0, 1, 0]
  )
  const transformedBlur = useTransform(xVelocity, [-1000, 0, 1000], [4, 0, 4], { clamp: false })

  // Use static values for reduced motion, animated values otherwise
  const x: MotionValue<number> = reducedMotion ? staticX : springX
  const staticOpacity = useMemo(() => motionValue(1), [])
  const staticBlur = useMemo(() => motionValue(0), [])
  const opacity = reducedMotion ? staticOpacity : transformedOpacity
  const blurPx = reducedMotion ? staticBlur : transformedBlur

  // Set target whenever activeIndex or width changes
  useEffect(() => {
    const target = calculateViewX(difference, containerWidth)
    if (reducedMotion) {
      staticX.set(target) // snap, no spring
    } else {
      springX.set(target) // spring will animate to target
    }
  }, [difference, containerWidth, reducedMotion, staticX, springX])

  return { x, opacity, blurPx }
}

/* ----------------------- Question Slide Component ----------------------- */
interface QuestionSlideProps {
  question: Question
  viewIndex: number
  activeIndex: number
  containerWidth: number
  reducedMotion: boolean
  selectedOption: number | null
  onOptionSelect: (qid: number, optionIndex: number) => void
}

function QuestionSlide({
  question,
  viewIndex,
  activeIndex,
  containerWidth,
  reducedMotion,
  selectedOption,
  onOptionSelect,
}: QuestionSlideProps) {
  const { x, opacity, blurPx } = useSmoothPagerMotion({
    containerWidth,
    activeIndex,
    viewIndex,
    reducedMotion,
  })

  const isActive = viewIndex === activeIndex
  const filterStyle = useMotionTemplate`blur(${blurPx}px)`

  return (
    <motion.div
      aria-hidden={!isActive}
      style={{
        position: "absolute",
        inset: 0,
        padding: 16,
        x,
        opacity,
        filter: filterStyle,
        willChange: "transform, filter",
        isolation: "isolate",
      }}
    >
      {/* Content of a single question */}
      <div className="mb-6 text-center">
        <h1 className="text-xl font-semibold">{question.question}</h1>
      </div>

      <div className="space-y-4">
        {question.options.map((option, index) => (
          <Card
            key={`${question.id}-option-${index}`}
            className={`relative cursor-pointer p-4 transition-colors hover:bg-muted ${
              selectedOption === index ? "bg-muted border-primary" : ""
            }`}
            role="button"
            tabIndex={isActive ? 0 : -1}
            onClick={() => onOptionSelect(question.id, index)}
            onKeyDown={(e) => {
              if (!isActive) return
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault()
                onOptionSelect(question.id, index)
              }
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">{option}</div>
            </div>
            <kbd className="bg-muted pointer-events-none absolute top-1/2 right-[1rem] hidden h-6 items-center gap-1 rounded border px-2 font-mono text-xs font-medium opacity-100 select-none sm:flex -translate-y-1/2">
              {index + 1}
            </kbd>
          </Card>
        ))}
      </div>
    </motion.div>
  )
}

/* ----------------------- Component ----------------------- */
export default function QuizInterface({
  questions,
  timeLimit,
  onQuizComplete,
  onQuizExit,
}: QuizInterfaceProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number | null>>({})
  const [timeRemaining, setTimeRemaining] = useState(timeLimit ?? 0)
  const [elapsedTime, setElapsedTime] = useState(0)

  const reduceMotion = usePrefersReducedMotion()
  const slidesRef = useRef<HTMLDivElement>(null)
  const containerWidth = useContainerWidth(slidesRef)

  const currentQuestion = questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100
  const answeredCount = useMemo(
    () => Object.values(answers).filter((a) => a !== null && a !== undefined).length,
    [answers]
  )

  const handleQuizComplete = useCallback(() => {
    const correctAnswers = questions.reduce((count, q) => {
      const userAnswer = answers[q.id]
      return userAnswer === q.correctAnswer ? count + 1 : count
    }, 0)

    const results: QuizResults = {
      totalQuestions: questions.length,
      answeredQuestions: answeredCount,
      correctAnswers,
      timeSpent: timeLimit ? timeLimit - timeRemaining : elapsedTime,
      answers,
    }
    onQuizComplete?.(results)
  }, [questions, answers, answeredCount, timeLimit, timeRemaining, elapsedTime, onQuizComplete])

  // Timer - only run countdown if timeLimit is set
  useEffect(() => {
    if (timeLimit === undefined) {
      // No time limit - just track elapsed time
      const t = setInterval(() => setElapsedTime((s) => s + 1), 1000)
      return () => clearInterval(t)
    }

    if (timeRemaining <= 0) {
      handleQuizComplete()
      return
    }
    const t = setInterval(() => setTimeRemaining((s) => s - 1), 1000)
    return () => clearInterval(t)
  }, [timeRemaining, timeLimit, handleQuizComplete])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleOptionSelect = (qid: number, optionIndex: number) => {
    setAnswers((prev) => ({ ...prev, [qid]: optionIndex }))
  }

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((i) => i + 1)
    } else {
      handleQuizComplete()
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) setCurrentQuestionIndex((i) => i - 1)
  }

  const _handleSkip = () => {
    const qid = currentQuestion.id
    setAnswers((prev) => ({ ...prev, [qid]: null }))
    handleNext()
  }

  if (!currentQuestion) return <div>No questions available</div>

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <header className="mb-8 flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={onQuizExit}>
            <Icon icon="lucide:x" className="h-4 w-4" />
          </Button>
          <div className="flex flex-1 items-center px-4">
            <Progress value={progress} className="h-2" />
          </div>
          <div className="flex items-center gap-2">
            <div className="text-sm">
              {currentQuestionIndex + 1}/{questions.length}
            </div>
            <Button variant="ghost" size="icon">
              <Icon icon="lucide:flag" className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Icon icon="lucide:more-horizontal" className="h-4 w-4" />
            </Button>
          </div>
        </header>

        {/* Slides container (fixed height to avoid layout shift) */}
        <div
          ref={slidesRef}
          className="relative"
          style={{
            // tune height to your content; fixed prevents jump during absolute slides
            minHeight: 360,
          }}
        >
          {questions.map((q, viewIndex) => (
            <QuestionSlide
              key={q.id}
              question={q}
              viewIndex={viewIndex}
              activeIndex={currentQuestionIndex}
              containerWidth={containerWidth}
              reducedMotion={reduceMotion}
              selectedOption={answers[q.id] ?? null}
              onOptionSelect={handleOptionSelect}
            />
          ))}
        </div>

        {/* Navigation */}
        <footer className="mt-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {timeLimit !== undefined && (
              <div className="text-xl font-medium">{formatTime(timeRemaining)}</div>
            )}
            <div className="text-sm text-muted-foreground">
              Answered: {answeredCount}/{questions.length}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
            >
              <Icon icon="lucide:chevron-left" className="mr-1 h-4 w-4" />
              Previous
            </Button>

            <Button onClick={handleNext}>
              {currentQuestionIndex === questions.length - 1 ? "Finish" : "Next"}
              {currentQuestionIndex < questions.length - 1 && (
                <Icon icon="lucide:chevron-right" className="ml-1 h-4 w-4" />
              )}
            </Button>
          </div>
        </footer>

        {/* SR announcement */}
        <div aria-live="polite" className="sr-only">
          Question {currentQuestionIndex + 1} of {questions.length}
        </div>
      </div>
    </div>
  )
}
