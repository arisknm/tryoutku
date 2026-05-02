'use client'
import { create } from 'zustand'
import { User } from '@/types'

interface AuthStore {
  user: User | null
  setUser: (user: User | null) => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}))

interface TryoutStore {
  currentAttemptId: string | null
  answers: Record<string, string>
  currentQuestion: number
  timeLeft: number
  setAttemptId: (id: string) => void
  setAnswer: (questionId: string, answer: string) => void
  setCurrentQuestion: (n: number) => void
  setTimeLeft: (t: number) => void
  reset: () => void
}

export const useTryoutStore = create<TryoutStore>((set) => ({
  currentAttemptId: null,
  answers: {},
  currentQuestion: 0,
  timeLeft: 0,
  setAttemptId: (id) => set({ currentAttemptId: id }),
  setAnswer: (questionId, answer) =>
    set((state) => ({ answers: { ...state.answers, [questionId]: answer } })),
  setCurrentQuestion: (n) => set({ currentQuestion: n }),
  setTimeLeft: (t) => set({ timeLeft: t }),
  reset: () =>
    set({ currentAttemptId: null, answers: {}, currentQuestion: 0, timeLeft: 0 }),
}))
