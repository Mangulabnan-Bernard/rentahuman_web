'use client'

import { createContext, useCallback, useContext, useState, ReactNode } from 'react'
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react'

type ToastType = 'success' | 'error' | 'info'

interface ToastItem {
  id: number
  message: string
  type: ToastType
}

interface ToastContextValue {
  toast: (message: string, type?: ToastType) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

// Module-level counter for stable ids (avoids relying on Date/random).
let toastCounterSeed = 0

const ICONS = {
  success: CheckCircle,
  error: AlertCircle,
  info: Info,
}

const ACCENT = {
  success: 'text-green-600 dark:text-green-400',
  error: 'text-red-600 dark:text-red-400',
  info: 'text-primary',
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const dismiss = useCallback((id: number) => {
    setToasts((current) => current.filter((t) => t.id !== id))
  }, [])

  const toast = useCallback(
    (message: string, type: ToastType = 'success') => {
      toastCounterSeed += 1
      const id = toastCounterSeed
      setToasts((current) => [...current, { id, message, type }])
      setTimeout(() => dismiss(id), 3500)
    },
    [dismiss]
  )

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div
        className="fixed bottom-4 right-4 z-[100] flex w-full max-w-sm flex-col gap-2 px-4 sm:px-0"
        aria-live="polite"
        aria-atomic="false"
      >
        {toasts.map((t) => {
          const Icon = ICONS[t.type]
          return (
            <div
              key={t.id}
              role="status"
              className="flex items-start gap-3 rounded-lg border border-border bg-card px-4 py-3 shadow-lg animate-in"
            >
              <Icon className={`mt-0.5 h-5 w-5 flex-shrink-0 ${ACCENT[t.type]}`} />
              <p className="flex-1 text-sm text-foreground">{t.message}</p>
              <button
                onClick={() => dismiss(t.id)}
                aria-label="Dismiss notification"
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )
        })}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context.toast
}
