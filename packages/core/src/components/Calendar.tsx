import React, { useState } from "react";
import { InputWithIcon } from "./Field";
import { CalendarIcon } from "./Primitives";
import { Popover } from "./Overlays";

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];

function daysInMonth(year: number, month: number) { return new Date(year, month + 1, 0).getDate(); }
function startWeekday(year: number, month: number) { return new Date(year, month, 1).getDay(); }
function sameDay(a: Date, b: Date) { return a.toDateString() === b.toDateString(); }

export interface CalendarProps {
  selected?: Date;
  onSelect: (d: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  disabled?: boolean;
}

export function Calendar({ selected, onSelect, minDate, maxDate, disabled }: CalendarProps) {
  const [cursor, setCursor] = useState(selected ?? new Date());
  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const total = daysInMonth(year, month);
  const startDay = startWeekday(year, month);
  const cells: Array<{ date: Date; outside?: boolean }> = [];
  for (let i = 0; i < startDay; i++) cells.push({ date: new Date(year, month, i - startDay + 1), outside: true });
  for (let d = 1; d <= total; d++) cells.push({ date: new Date(year, month, d) });
  while (cells.length % 7 !== 0) cells.push({ date: new Date(year, month, total + (cells.length % 7)), outside: true });

  const monthLabel = cursor.toLocaleDateString(undefined, { month: "long", year: "numeric" });

  return (
    <div className={`cds-calendar ${disabled ? "cds-calendar--disabled" : ""}`} role="group" aria-label="Calendar" style={disabled ? { opacity: 0.6, pointerEvents: "none" } : undefined}>
      <div className="cds-calendar-header">
        <button type="button" className="cds-calendar-nav" disabled={disabled} onClick={() => setCursor(new Date(year, month - 1, 1))} aria-label="Previous month">‹</button>
        <span className="cds-calendar-title">{monthLabel}</span>
        <button type="button" className="cds-calendar-nav" disabled={disabled} onClick={() => setCursor(new Date(year, month + 1, 1))} aria-label="Next month">›</button>
      </div>
      <div className="cds-calendar-grid">
        {WEEKDAYS.map((w, i) => <div className="cds-calendar-weekday" key={i}>{w}</div>)}
        {cells.map(({ date, outside }, i) => {
          const isDateDisabled = disabled || (minDate && date < minDate) || (maxDate && date > maxDate);
          const isSelected = selected && sameDay(date, selected);
          return (
            <button
              key={i}
              type="button"
              className={`cds-calendar-day ${outside ? "cds-calendar-day--outside" : ""}`}
              aria-selected={isSelected || undefined}
              disabled={!!isDateDisabled}
              onClick={() => onSelect(date)}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export interface DatePickerProps {
  value?: Date;
  onChange?: (d: Date) => void;
  placeholder?: string;
  disabled?: boolean;
  id?: string;
}

export function DatePicker({ value, onChange, placeholder = "Select date", disabled, id }: DatePickerProps) {
  const trigger = (
    <InputWithIcon
      id={id}
      readOnly
      disabled={disabled}
      value={value ? value.toLocaleDateString("en-GB") : ""}
      placeholder={placeholder}
      trailingIcon={<CalendarIcon size={16} />}
      style={{ cursor: disabled ? "not-allowed" : "pointer" }}
    />
  );
  if (disabled) {
    return <div className="cds-date-picker">{trigger}</div>;
  }
  return (
    <div className="cds-date-picker">
      <Popover trigger={trigger}>
        <Calendar selected={value} onSelect={onChange ?? (() => {})} />
      </Popover>
    </div>
  );
}
