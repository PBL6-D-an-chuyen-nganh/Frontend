import React, { useMemo } from 'react'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'

export default function AvailableDatePicker({ availableDates = [], value, onChange, disabled }) {
  const toDate = (str) => new Date(str + 'T00:00:00')
  const toLocalISO = (d) => {
    const y = d.getFullYear()
    const m = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    return `${y}-${m}-${day}`
  }

  const availSet = useMemo(() => new Set(availableDates), [availableDates])
  const isAvail = (d) => availSet.has(toLocalISO(d))

  const firstDate = availableDates.length ? toDate(availableDates[0]) : undefined
  const lastDate  = availableDates.length ? toDate(availableDates[availableDates.length - 1]) : undefined

  return (
    <div
      className={`rounded-xl border-2 border-gray-200 p-3 bg-white ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      <DayPicker
        mode="single"
        showOutsideDays
        disabled={disabled ? () => true : (d) => !isAvail(d)}
        selected={value ? toDate(value) : undefined}
        onSelect={(d) => {
          if (!d || !isAvail(d)) return
          onChange(toLocalISO(d))
        }}
        fromDate={firstDate}
        toDate={lastDate}
        month={firstDate}
      />

      {availableDates.length === 0 && (
        <p className="text-xs text-orange-600 mt-2 font-medium">
          Bác sĩ hiện không có lịch trống.
        </p>
      )}
    </div>
  )
}
