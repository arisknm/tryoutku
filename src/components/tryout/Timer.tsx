'use client'
import { useEffect, useState, useCallback } from 'react'
import { Clock, AlertTriangle } from 'lucide-react'
import { formatDetik } from '@/lib/utils'
import { cn } from '@/lib/utils'

interface TimerProps {
  totalDetik: number
  onTimeUp: () => void
  onTick?: (remaining: number) => void
}

export default function Timer({ totalDetik, onTimeUp, onTick }: TimerProps) {
  const [remaining, setRemaining] = useState(totalDetik)
  const isWarning = remaining <= 300 // 5 menit terakhir
  const isDanger = remaining <= 60   // 1 menit terakhir

  useEffect(() => {
    if (remaining <= 0) {
      onTimeUp()
      return
    }
    const interval = setInterval(() => {
      setRemaining(prev => {
        const next = prev - 1
        onTick?.(next)
        if (next <= 0) {
          onTimeUp()
          clearInterval(interval)
        }
        return next
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const persen = Math.round((remaining / totalDetik) * 100)

  return (
    <div className={cn(
      'flex items-center gap-2 px-4 py-2 rounded-xl font-mono font-bold text-sm',
      isDanger ? 'bg-red-100 text-red-700 timer-warning' :
      isWarning ? 'bg-yellow-100 text-yellow-700' :
      'bg-indigo-50 text-indigo-700'
    )}>
      {isDanger ? <AlertTriangle className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
      <span>{formatDetik(remaining)}</span>
    </div>
  )
}
