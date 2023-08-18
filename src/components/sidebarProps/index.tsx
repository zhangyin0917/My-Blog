import React, { useState } from 'react'
import { format, addMonths, subMonths, startOfMonth, eachDayOfInterval } from 'date-fns'
import '../../style/CalendarSidebar.css'

interface CalendarSidebarProps {
  selectedDate: Date
  onSelectDate: (date: Date) => void
}

const CalendarSidebar: React.FC<CalendarSidebarProps> = ({ selectedDate, onSelectDate }) => {
  const [currentMonth, setCurrentMonth] = useState(selectedDate)

  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1))
  }

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1))
  }

  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: addMonths(startOfMonth(currentMonth), 1),
  })

  return (
    <div className='calendar-sidebar'>
      <div className='calendar-header'>
        <button onClick={handlePrevMonth}>&lt;</button>
        <h2>{format(currentMonth, 'MMMM yyyy')}</h2>
        <button onClick={handleNextMonth}>&gt;</button>
      </div>
      <div className='calendar-days'>
        {daysInMonth.map((day, index) => (
          <div
            key={index}
            className={`calendar-day ${selectedDate.toDateString() === day.toDateString() ? 'selected' : ''}`}
            onClick={() => onSelectDate(day)}>
            {format(day, 'd')}
          </div>
        ))}
      </div>
    </div>
  )
}

export default CalendarSidebar
