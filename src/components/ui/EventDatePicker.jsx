import { forwardRef, useEffect, useId, useRef, useState } from 'react'
import { DayPicker } from '@daypicker/react'
import { es } from '@daypicker/react/locale'
import { CalendarDays } from 'lucide-react'
import '@daypicker/react/style.css'
import { formatDateField, getLocalToday, parseLocalDate, toLocalDateValue } from '../../utils/date'

const EventDatePicker = forwardRef(function EventDatePicker({ value, onChange, error, inputClass }, forwardedRef) {
  const [isOpen, setIsOpen] = useState(false)
  const [openAbove, setOpenAbove] = useState(false)
  const containerRef = useRef(null)
  const triggerRef = useRef(null)
  const restoreFocusRef = useRef(false)
  const calendarId = useId()
  const selected = parseLocalDate(value)
  const today = getLocalToday()

  const setTriggerRef = (element) => {
    triggerRef.current = element
    if (typeof forwardedRef === 'function') forwardedRef(element)
    else if (forwardedRef) forwardedRef.current = element
  }

  const closeAndRestoreFocus = () => {
    restoreFocusRef.current = true
    setIsOpen(false)
  }

  const openCalendar = () => {
    const rect = triggerRef.current?.getBoundingClientRect()
    if (rect) {
      const spaceBelow = window.innerHeight - rect.bottom
      setOpenAbove(spaceBelow < 380 && rect.top > spaceBelow)
    }
    setIsOpen(true)
  }

  useEffect(() => {
    if (!isOpen && restoreFocusRef.current) {
      restoreFocusRef.current = false
      triggerRef.current?.focus()
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return undefined

    const handlePointerDown = (event) => {
      if (!containerRef.current?.contains(event.target)) setIsOpen(false)
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
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  const handleSelect = (date) => {
    if (!date) return
    onChange(toLocalDateValue(date))
    closeAndRestoreFocus()
  }

  return <div ref={containerRef} className="relative">
    <button
      ref={setTriggerRef}
      type="button"
      aria-expanded={isOpen}
      aria-haspopup="dialog"
      aria-controls={isOpen ? calendarId : undefined}
      aria-invalid={Boolean(error)}
      aria-describedby={error ? 'date-error' : undefined}
      onClick={() => {
        if (isOpen) setIsOpen(false)
        else openCalendar()
      }}
      onKeyDown={(event) => {
        if (event.key === 'ArrowDown' && !isOpen) {
          event.preventDefault()
          openCalendar()
        }
      }}
      className={`${inputClass} flex items-center pr-11 text-left ${error ? 'border-red-400/80 focus:border-red-300 focus:ring-red-300/30' : ''}`}
    >
      <span className={value ? 'text-white' : 'text-gray-500'}>{formatDateField(value) || 'dd/mm/aaaa'}</span>
      <CalendarDays aria-hidden="true" size={18} className="pointer-events-none absolute right-3 text-white" />
    </button>
    {isOpen && <div id={calendarId} role="dialog" aria-label="Calendario de fecha del evento" className={`event-date-popover${openAbove ? ' is-above' : ''}`}>
      <DayPicker
        mode="single"
        locale={es}
        weekStartsOn={1}
        navLayout="around"
        autoFocus
        selected={selected}
        defaultMonth={selected || today}
        startMonth={today}
        disabled={{ before: today }}
        onSelect={handleSelect}
        footer={selected ? `Fecha seleccionada: ${formatDateField(value)}` : 'Selecciona la fecha del evento'}
      />
    </div>}
  </div>
})

export default EventDatePicker
