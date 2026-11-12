import { forwardRef, useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Clock3 } from 'lucide-react'
import { formatTimeField, parseTimeValue, to24HourTime } from '../../utils/time'

const HOURS = Array.from({ length: 12 }, (_, index) => index + 1)
const MINUTES = Array.from({ length: 60 }, (_, index) => index)
const PERIODS = ['AM', 'PM']

function defaultDraft() {
  const now = new Date()
  return {
    hour: now.getHours() % 12 || 12,
    minute: now.getMinutes(),
    period: now.getHours() < 12 ? 'AM' : 'PM',
  }
}

function TimeOptions({ label, name, values, selected, formatValue, onSelect }) {
  const focusOption = (value) => {
    requestAnimationFrame(() => document.querySelector(`[data-time-option="${name}-${value}"]`)?.focus())
  }

  const moveSelection = (current, direction) => {
    const currentIndex = values.indexOf(current)
    const nextIndex = (currentIndex + direction + values.length) % values.length
    const nextValue = values[nextIndex]
    onSelect(nextValue)
    focusOption(nextValue)
  }

  return <div className="min-w-0">
    <span className="mb-1.5 block text-center text-[11px] font-semibold uppercase tracking-wider text-gray-400">{label}</span>
    <div role="listbox" aria-label={label} aria-activedescendant={`${name}-${selected}`} className="event-time-list">
      {values.map((value) => {
        const isSelected = value === selected
        return <button
          id={`${name}-${value}`}
          key={value}
          type="button"
          role="option"
          aria-selected={isSelected}
          tabIndex={isSelected ? 0 : -1}
          data-time-option={`${name}-${value}`}
          data-time-selected={isSelected ? 'true' : undefined}
          onClick={() => onSelect(value)}
          onKeyDown={(event) => {
            if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
              event.preventDefault()
              moveSelection(value, 1)
            } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
              event.preventDefault()
              moveSelection(value, -1)
            } else if (event.key === 'Home') {
              event.preventDefault()
              onSelect(values[0])
              focusOption(values[0])
            } else if (event.key === 'End') {
              event.preventDefault()
              onSelect(values.at(-1))
              focusOption(values.at(-1))
            }
          }}
          className="event-time-option"
        >{formatValue(value)}</button>
      })}
    </div>
  </div>
}

const EventTimePicker = forwardRef(function EventTimePicker({ value, onChange, error, inputClass, labelledBy }, forwardedRef) {
  const [isOpen, setIsOpen] = useState(false)
  const [openAbove, setOpenAbove] = useState(false)
  const [mobilePanel, setMobilePanel] = useState(false)
  const [draft, setDraft] = useState(() => parseTimeValue(value) || defaultDraft())
  const containerRef = useRef(null)
  const panelRef = useRef(null)
  const triggerRef = useRef(null)
  const restoreFocusRef = useRef(false)
  const panelId = useId()

  const setTriggerRef = (element) => {
    triggerRef.current = element
    if (typeof forwardedRef === 'function') forwardedRef(element)
    else if (forwardedRef) forwardedRef.current = element
  }

  const closeAndRestoreFocus = (deferFocus = false) => {
    restoreFocusRef.current = deferFocus ? 'defer' : 'now'
    setIsOpen(false)
  }

  const openPanel = () => {
    setDraft(parseTimeValue(value) || defaultDraft())
    setMobilePanel(window.matchMedia('(max-width: 639px)').matches)
    const rect = triggerRef.current?.getBoundingClientRect()
    if (rect) {
      const spaceBelow = window.innerHeight - rect.bottom
      setOpenAbove(spaceBelow < 360 && rect.top > spaceBelow)
    }
    setIsOpen(true)
  }

  useEffect(() => {
    if (isOpen || !restoreFocusRef.current) return undefined
    const deferred = restoreFocusRef.current === 'defer'
    restoreFocusRef.current = false
    if (!deferred) {
      triggerRef.current?.focus()
      return undefined
    }
    const timer = window.setTimeout(() => triggerRef.current?.focus(), 0)
    return () => window.clearTimeout(timer)
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return undefined

    const focusTimer = window.setTimeout(() => panelRef.current?.querySelector('[data-time-selected="true"]')?.focus(), 0)
    const handlePointerDown = (event) => {
      if (!containerRef.current?.contains(event.target) && !panelRef.current?.contains(event.target)) closeAndRestoreFocus(true)
    }
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        closeAndRestoreFocus()
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      window.clearTimeout(focusTimer)
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  const confirmTime = () => {
    onChange(to24HourTime(draft.hour, draft.minute, draft.period))
    closeAndRestoreFocus()
  }

  const panel = isOpen && <div ref={panelRef} id={panelId} role="dialog" aria-labelledby={labelledBy} className={`event-time-popover${openAbove ? ' is-above' : ''}`}>
    <div className="grid grid-cols-[1fr_1fr_.9fr] gap-2">
      <TimeOptions label="Hora" name="event-hour" values={HOURS} selected={draft.hour} formatValue={(hour) => String(hour).padStart(2, '0')} onSelect={(hour) => setDraft((current) => ({ ...current, hour }))} />
      <TimeOptions label="Minutos" name="event-minute" values={MINUTES} selected={draft.minute} formatValue={(minute) => String(minute).padStart(2, '0')} onSelect={(minute) => setDraft((current) => ({ ...current, minute }))} />
      <TimeOptions label="Periodo" name="event-period" values={PERIODS} selected={draft.period} formatValue={(period) => period === 'AM' ? 'a. m.' : 'p. m.'} onSelect={(period) => setDraft((current) => ({ ...current, period }))} />
    </div>
    <button type="button" onClick={confirmTime} className="event-time-confirm">Confirmar hora</button>
  </div>

  return <>
    <div ref={containerRef} className="relative">
      <button
      ref={setTriggerRef}
      type="button"
      aria-labelledby={labelledBy}
      aria-expanded={isOpen}
      aria-haspopup="dialog"
      aria-controls={isOpen ? panelId : undefined}
      aria-invalid={Boolean(error)}
      aria-describedby={error ? 'time-error' : undefined}
      onClick={() => {
        if (isOpen) closeAndRestoreFocus()
        else openPanel()
      }}
      onKeyDown={(event) => {
        if (event.key === 'ArrowDown' && !isOpen) {
          event.preventDefault()
          openPanel()
        }
      }}
      className={`${inputClass} flex items-center pr-11 text-left ${error ? 'border-red-400/80 focus:border-red-300 focus:ring-red-300/30' : ''}`}
      >
        <span className={value ? 'text-white' : 'text-gray-500'}>{formatTimeField(value) || 'Selecciona la hora'}</span>
        <Clock3 aria-hidden="true" size={18} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white" />
      </button>
      {!mobilePanel && panel}
    </div>
    {mobilePanel && panel ? createPortal(panel, document.body) : null}
  </>
})

export default EventTimePicker
