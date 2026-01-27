"use client"

import { Icon } from "@iconify/react"
import { Avatar, AvatarFallback } from "@repo/ui/components/avatar"
import { Button } from "@repo/ui/components/button"
import { Card, CardContent, CardFooter, CardHeader } from "@repo/ui/components/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@repo/ui/components/dropdown-menu"
import { Textarea } from "@repo/ui/components/textarea"
import { AnimatePresence, MotionConfig, motion } from "motion/react"
import { useEffect, useRef, useState } from "react"

export default function Modal() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <MotionConfig transition={{ type: "spring", visualDuration: 0.2, bounce: 0 }}>
      <motion.div layoutId="modal" id="modal-open" style={{ borderRadius: 30 }}>
        <motion.div layoutId="cta" whileTap={{ scale: 0.95 }}>
          <Button className="send-button" onClick={() => setIsOpen(true)} data-primary-action>
            <motion.span layoutId="cta-text">
              <Icon icon="lucide:sparkles" />
            </motion.span>
          </Button>
        </motion.div>
      </motion.div>
      <AnimatePresence>{isOpen ? <Dialog close={() => setIsOpen(false)} /> : null}</AnimatePresence>
      <StyleSheet />
    </MotionConfig>
  )
}

function Dialog({ close }: { close: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! How can I help you today?", sender: "assistant" },
  ])
  const [inputValue, setInputValue] = useState("")

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    const newMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: "user",
    }

    setMessages((prev) => [...prev, newMessage])
    setInputValue("")

    // Simulate assistant response
    setTimeout(() => {
      const responses = [
        "That's a great question! Let me help you with that.",
        "I understand what you're looking for. Here's what I think...",
        "Interesting! Let me break this down for you.",
        "I'd be happy to assist you with that.",
        "That's a thoughtful question. Here's my perspective...",
      ]
      const randomResponse = responses[Math.floor(Math.random() * responses.length)]

      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          text: randomResponse,
          sender: "assistant",
        },
      ])
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  /**
   * Use the dialog element's imperative API to open and close the dialog
   * when the component mounts and unmounts. This enables exit animations
   * and maintains the dialog's natural accessibility behaviour.
   */
  useEffect(() => {
    if (!dialogRef.current) return
    dialogRef.current.showModal()

    return () => {
      dialogRef.current?.close()
    }
  }, [])

  useClickOutside(modalRef, close)

  return (
    <>
      <motion.div
        className="overlay data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-primary-950/80 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, ease: "linear" }}
      />
      <dialog
        ref={dialogRef}
        open={false}
        /**
         * The onCancel event is triggered when the user
         * presses the Esc key. We prevent the default and
         * close the dialog via the provided callback that
         * first sets React state to false.
         *
         * AnimatePresence will take care of our exit animation
         * before actually closing the dialog.
         */
        onCancel={(event) => {
          event.preventDefault()
          close()
        }}
        /**
         * However, if the Esc key is pressed twice, the
         * close method will always fire, and it isn't cancellable.
         * So we listen for this and make sure the React
         * state is updated to false.
         */
        onClose={close}
      >
        <motion.div
          ref={modalRef}
          className="modal"
          layoutId="modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Card className="modal-card bg-accent">
            <CardHeader className="card-header">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                      AI
                    </AvatarFallback>
                  </Avatar>
                  <h2 className="title h3">Assistant</h2>
                </div>
                <Button variant="ghost" size="sm" aria-label="Close" onClick={close}>
                  <Icon icon="lucide:x" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="messages-container">
              <motion.div layout exit={{ y: 100 }} className="messages-list">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`message ${message.sender} bg-card rounded-md border`}
                  >
                    <div className="message-content">{message.text}</div>
                  </div>
                ))}
              </motion.div>
            </CardContent>

            <CardFooter className="input-container">
              <div className="input-wrapper w-full">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="send-button" type="button">
                      <Icon icon="lucide:plus" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-48" side="top" sideOffset={5}>
                    <DropdownMenuItem onClick={() => setInputValue((prev) => `${prev}📎 `)}>
                      <Icon icon="lucide:paperclip" className="mr-2 h-4 w-4" />
                      Attach file
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setInputValue((prev) => `${prev}📷 `)}>
                      <Icon icon="lucide:image" className="mr-2 h-4 w-4" />
                      Add image
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setInputValue((prev) => `${prev}📊 `)}>
                      <Icon icon="lucide:bar-chart" className="mr-2 h-4 w-4" />
                      Create chart
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setInputValue((prev) => `${prev}💡 `)}>
                      <Icon icon="lucide:lightbulb" className="mr-2 h-4 w-4" />
                      Get suggestions
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setInputValue((prev) => `${prev}🔍 `)}>
                      <Icon icon="lucide:search" className="mr-2 h-4 w-4" />
                      Search knowledge
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask anything..."
                  className="message-input"
                  rows={1}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  size="sm"
                  className="send-button"
                >
                  <Icon icon="lucide:sparkles" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        </motion.div>
      </dialog>
    </>
  )
}

/**
 * ==============   Utils   ================
 */

function useClickOutside(ref: React.RefObject<HTMLElement | null>, close: VoidFunction) {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && checkClickOutside(event, ref.current)) {
        close()
      }
    }

    document.addEventListener("click", handleClickOutside)

    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [ref, close])
}

// Helper to check if a click event occurred outside a given element
function checkClickOutside(event: MouseEvent, element: HTMLElement) {
  const { top, left, width, height } = element.getBoundingClientRect()

  if (
    event.clientX < left ||
    event.clientX > left + width ||
    event.clientY < top ||
    event.clientY > top + height
  ) {
    return true
  }
  return false
}

/**
 * ==============   Styles   ================
 */
function StyleSheet() {
  return (
    <style>
      {`
        #sandbox {
            justify-content: flex-end;
            padding: 20px;
            overflow: hidden;
        }

        #sandbox button {
            -webkit-touch-callout: none;
            -webkit-user-select: none;
        }

        #sandbox button:focus-visible {
            outline-offset: 2px;
            outline: 2px solid #8df0cc;
        }

        #sandbox button span {
            display: inline-block;
        }

        #modal-open {
            position: fixed;
            bottom: 24px;
            left: 50%;
            transform: translateX(-50%);
            width: auto;
            max-width: 300px;
            display: flex;
            justify-content: center;
            z-index: 1000;
        }

        .controls {
            padding-top: 20px;
            display: flex;
            justify-content: flex-end;
            gap: 10px;
        }

        .controls button.cancel {
            background-color: var(--divider);
            color: #f5f5f5;
        }

        dialog {
            background: none;
            border: none;
            padding: 0;
            margin: 0;
            display: flex;
            justify-content: center;
            align-items: flex-end;
            width: 100%;
            height: 100%;
            max-width: 100%;
            max-height: 100%;
            overflow: visible;
        }

        .modal {
            width: 500px;
            max-width: 90vw;
            position: relative;
            bottom: 20px;
            height: 400px;
        }

        .modal-card {
            width: 100%;
            height: 100%;
            border-radius: 16px;
            overflow: visible;
            display: flex;
            flex-direction: column;
        }

        .modal-card .card-header {
            flex-shrink: 0;
            padding: 16px 20px;
            border-bottom: 1px solid hsl(var(--border));
        }

        .modal-card .messages-container {
            flex: 1;
            overflow-y: auto;
            padding: 16px 20px;
            min-height: 0;
        }

        .modal-card .input-container {
            flex-shrink: 0;
            padding: 16px 20px;
            border-top: 1px solid hsl(var(--border));
        }

        .messages-list {
            display: flex;
            flex-direction: column;
            gap: 16px;
        }

        .message {
            display: flex;
            gap: 12px;
            max-width: 85%;
        }

        .message.user {
            align-self: flex-end;
            flex-direction: row-reverse;
        }

        .message.assistant {
            align-self: flex-start;
        }

        .message-content {
            background: hsl(var(--muted));
            padding: 12px 16px;
            border-radius: 18px;
            color: hsl(var(--foreground));
            line-height: 1.5;
            word-wrap: break-word;
        }

        .message.user .message-content {
            background: hsl(var(--primary));
            color: hsl(var(--primary-foreground));
        }



        .input-wrapper {
            display: flex;
            gap: 8px;
            align-items: flex-end;
        }

        .message-input {
            flex: 1;
            resize: none;
            min-height: 40px;
            max-height: 120px;
        }

        .send-button {
            height: 40px;
            width: 40px;
            padding: 0;
        }

        dialog::backdrop {
            display: none;
        }

        .title {
            margin: 0;
            font-size: 16px;
            font-weight: 600;
        }


    `}
    </style>
  )
}
