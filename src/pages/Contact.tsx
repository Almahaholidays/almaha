import React, { useState, useRef, useEffect } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import SEO from '../components/SEO/SEO';
import { PAGE_SEO } from '../utils/seo/seoData';

/* ─────────────────────────────────────────────
   Constants
───────────────────────────────────────────── */
const PHONE   = '+968 9803 6952';
const EMAIL   = 'salessupport@almahaholidays.com';

const tourTypes = [
  'Desert Safari',
  'Heritage Tours',
  'Mountain Trekking',
  'Coastal & Water',
  'Wellness Retreat',
  'Cultural Immersion',
  'Luxury Travel',
  'Custom Journey',
];

/* ─────────────────────────────────────────────
   Shared arrow
───────────────────────────────────────────── */
const Arrow: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

/* ─────────────────────────────────────────────
   Custom Travellers Select
───────────────────────────────────────────── */
const travellersOptions = [
  {
    value: '1',
    // label: 'Solo Traveller',
    desc: '1 person',
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="4" /><path d="M5 20c0-3.866 3.134-7 7-7s7 3.134 7 7" />
      </svg>
    ),
  },
  {
    value: '2',
    // label: 'Couple',
    desc: '2 people',
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="8" cy="8" r="3" /><path d="M2 20c0-2.761 2.239-5 6-5" />
        <circle cx="16" cy="8" r="3" /><path d="M16 15c3.761 0 6 2.239 6 5" />
      </svg>
    ),
  },
  {
    value: '3-4',
    // label: 'Small Group',
    desc: '3–4 people',
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="6" r="3" /><path d="M9 20c0-2.209 1.343-4 3-4s3 1.791 3 4" />
        <circle cx="4.5" cy="9" r="2" /><path d="M2 20c0-1.657.895-3 2.5-3" />
        <circle cx="19.5" cy="9" r="2" /><path d="M22 20c0-1.657-.895-3-2.5-3" />
      </svg>
    ),
  },
  {
    value: '5-8',
    // label: 'Group',
    desc: '5–8 people',
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
  {
    value: '9-15',
    // label: 'Large Group',
    desc: '9–15 people',
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" />
        <path d="M3 21h18" />
      </svg>
    ),
  },
  {
    value: '16+',
    // label: 'Event / Corporate',
    desc: '16+ people',
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
];

const TravellersSelect: React.FC<{ value: string; onChange: (v: string) => void }> = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const selected = travellersOptions.find(o => o.value === value);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen(p => !p)}
        className={`w-full flex items-center justify-between gap-3 pb-3 border-b transition-colors duration-300 text-left outline-none ${open ? 'border-[#e3261d]' : 'border-neutral-200'}`}
      >
        <span className={`text-base ${selected ? 'text-primary-dark' : 'text-neutral-300'}`}>
          {selected ? selected.desc : 'Select travellers'}
        </span>
        <svg className={`w-4 h-4 text-neutral-400 flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown */}
      <div className={`absolute z-[9999] top-full left-0 right-0 mt-2 bg-white border border-neutral-100 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.12)] overflow-hidden transition-all duration-200 origin-top ${open ? 'opacity-100 scale-y-100 pointer-events-auto' : 'opacity-0 scale-y-95 pointer-events-none'}`}>
        {travellersOptions.map((opt, i) => {
          const isSelected = value === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => { onChange(opt.value); setOpen(false); }}
              className={`w-full flex items-center gap-4 px-5 py-3.5 text-left transition-all duration-150 ${i > 0 ? 'border-t border-neutral-50' : ''} ${isSelected ? 'bg-[#e3261d]/[0.04]' : 'hover:bg-neutral-50'}`}
            >
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-200 ${isSelected ? 'bg-[#e3261d] text-white' : 'bg-neutral-100 text-neutral-400'}`}>
                {opt.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-bold leading-tight transition-colors duration-200 ${isSelected ? 'text-[#e3261d]' : 'text-primary-dark'}`}>{opt.desc}</p>
              </div>
              {isSelected && (
                <svg className="w-4 h-4 text-[#e3261d] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   Custom Date Range Picker
───────────────────────────────────────────── */
interface DateRange { start: Date | null; end: Date | null; }

const MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const DAY_LABELS  = ['Su','Mo','Tu','We','Th','Fr','Sa'];

const toDayStr = (d: Date) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
};
const fmtDate = (d: Date) => d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

const DateRangePicker: React.FC<{ value: DateRange; onChange: (v: DateRange) => void }> = ({ value, onChange }) => {
  const [open, setOpen]         = useState(false);
  const [hovered, setHovered]   = useState<string | null>(null);
  const [viewDate, setViewDate] = useState(() => { const d = new Date(); d.setDate(1); return d; });
  const containerRef = useRef<HTMLDivElement>(null);

  const selecting = !value.start || (value.start && value.end) ? 'start' : 'end';

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const year  = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDayOfWeek = new Date(year, month, 1).getDay();
  const daysInMonth    = new Date(year, month + 1, 0).getDate();

  const today    = new Date(); today.setHours(0,0,0,0);
  const todayStr = toDayStr(today);
  const startStr = value.start ? toDayStr(value.start) : null;
  const endStr   = value.end   ? toDayStr(value.end)   : null;

  // Effective end: confirmed end OR hovered preview while selecting end
  const effectiveEndStr = endStr ?? (selecting === 'end' && hovered ? hovered : null);

  // Normalise so rangeStart <= rangeEnd regardless of selection order
  const [rangeStart, rangeEnd] = startStr && effectiveEndStr
    ? startStr <= effectiveEndStr ? [startStr, effectiveEndStr] : [effectiveEndStr, startStr]
    : [null, null];

  const cells: (Date | null)[] = [
    ...Array(firstDayOfWeek).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1)),
  ];

  const handleDayClick = (d: Date, dStr: string) => {
    if (dStr < todayStr) return;
    if (selecting === 'start') {
      onChange({ start: d, end: null });
    } else {
      if (dStr === startStr) {
        onChange({ start: null, end: null });
      } else if (dStr < startStr!) {
        onChange({ start: d, end: value.start }); setOpen(false);
      } else {
        onChange({ start: value.start, end: d }); setOpen(false);
      }
    }
  };

  const displayText = () => {
    if (!value.start) return null;
    if (!value.end) return `${fmtDate(value.start)} →`;
    return `${fmtDate(value.start)} → ${fmtDate(value.end)}`;
  };

  const statusMsg = selecting === 'start'
    ? 'Select departure date'
    : value.end ? 'Dates confirmed ✓' : 'Now select return date';

  return (
    <div ref={containerRef} className="relative">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen(p => !p)}
        className={`w-full flex items-center gap-3 pb-3 border-b transition-colors duration-300 text-left outline-none ${open ? 'border-[#e3261d]' : 'border-neutral-200'}`}
      >
        <svg className="w-4 h-4 text-neutral-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <rect x="3" y="4" width="18" height="18" rx="2" strokeWidth="1.5" />
          <line x1="16" y1="2" x2="16" y2="6" strokeWidth="1.5" /><line x1="8" y1="2" x2="8" y2="6" strokeWidth="1.5" />
          <line x1="3" y1="10" x2="21" y2="10" strokeWidth="1.5" />
        </svg>
        <span className={`flex-1 text-base ${displayText() ? 'text-primary-dark' : 'text-neutral-300'}`}>
          {displayText() ?? 'Select travel dates'}
        </span>
        {value.start ? (
          <span
            role="button"
            onClick={(e) => { e.stopPropagation(); onChange({ start: null, end: null }); }}
            className="text-neutral-300 hover:text-neutral-500 transition-colors duration-200 cursor-pointer flex-shrink-0"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </span>
        ) : (
          <svg className={`w-4 h-4 text-neutral-400 flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        )}
      </button>

      {/* Calendar panel */}
      <div className={`absolute z-[9999] top-full left-0 mt-2 bg-white border border-neutral-100 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.12)] transition-all duration-200 origin-top min-w-[320px] max-w-[360px] ${open ? 'opacity-100 scale-y-100 pointer-events-auto' : 'opacity-0 scale-y-95 pointer-events-none'}`}>
        <div className="p-5">

          {/* Month navigation */}
          <div className="flex items-center justify-between mb-5">
            <button type="button" onClick={() => setViewDate(new Date(year, month - 1, 1))}
              className="w-8 h-8 rounded-full hover:bg-neutral-100 flex items-center justify-center transition-colors duration-200">
              <svg className="w-4 h-4 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="text-center">
              <p className="text-sm font-bold text-primary-dark">{MONTH_NAMES[month]} {year}</p>
              <p className={`text-[10px] font-bold tracking-wider uppercase mt-0.5 ${value.end ? 'text-[#e3261d]' : 'text-neutral-400'}`}>
                {statusMsg}
              </p>
            </div>
            <button type="button" onClick={() => setViewDate(new Date(year, month + 1, 1))}
              className="w-8 h-8 rounded-full hover:bg-neutral-100 flex items-center justify-center transition-colors duration-200">
              <svg className="w-4 h-4 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Weekday headers */}
          <div className="grid grid-cols-7 mb-1">
            {DAY_LABELS.map(d => (
              <div key={d} className="h-8 flex items-center justify-center">
                <span className="text-[10px] font-bold text-neutral-300 tracking-wider">{d}</span>
              </div>
            ))}
          </div>

          {/* Day grid */}
          <div className="grid grid-cols-7">
            {cells.map((day, idx) => {
              if (!day) return <div key={`e-${idx}`} className="h-9" />;

              const dStr    = toDayStr(day);
              const isPast  = dStr < todayStr;
              const isToday = dStr === todayStr;
              const isDot   = dStr === startStr || dStr === endStr; // confirmed selection dots
              const isRangeStart = dStr === rangeStart;
              const isRangeEnd   = dStr === rangeEnd;
              const inMiddle     = !!(rangeStart && rangeEnd && dStr > rangeStart && dStr < rangeEnd);

              return (
                <div key={dStr} className="relative h-9 flex items-center justify-center">
                  {/* Range strip — half-cell for caps, full for middle */}
                  {isRangeStart && rangeStart !== rangeEnd && (
                    <div className="absolute right-0 top-1 bottom-1 left-1/2 bg-[#e3261d]/10 pointer-events-none" />
                  )}
                  {inMiddle && (
                    <div className="absolute inset-x-0 top-1 bottom-1 bg-[#e3261d]/10 pointer-events-none" />
                  )}
                  {isRangeEnd && rangeStart !== rangeEnd && (
                    <div className="absolute left-0 top-1 bottom-1 right-1/2 bg-[#e3261d]/10 pointer-events-none" />
                  )}

                  {/* Day button */}
                  <button
                    type="button"
                    onClick={() => handleDayClick(day, dStr)}
                    onMouseEnter={() => !isPast && setHovered(dStr)}
                    onMouseLeave={() => setHovered(null)}
                    disabled={isPast}
                    className={`
                      relative z-10 w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-medium transition-all duration-150
                      ${isPast ? 'text-neutral-200 cursor-not-allowed' : 'cursor-pointer'}
                      ${isDot ? 'bg-[#e3261d] text-white shadow-[0_3px_12px_rgba(227,38,29,0.45)] font-bold' : ''}
                      ${!isDot && !isPast ? 'hover:bg-[#e3261d]/15 hover:text-[#e3261d]' : ''}
                      ${isToday && !isDot ? 'font-black text-primary-dark' : ''}
                    `}
                  >
                    {day.getDate()}
                    {isToday && !isDot && (
                      <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#e3261d]" />
                    )}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Footer — only when start is picked */}
          {value.start && (
            <div className="mt-4 pt-4 border-t border-neutral-100 flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="text-[9px] font-bold tracking-[0.2em] text-neutral-400 uppercase">
                  {value.end ? 'Selected range' : 'Departure'}
                </p>
                <p className="text-sm font-bold text-primary-dark mt-0.5 truncate">{displayText()}</p>
              </div>
              <button
                type="button"
                onClick={() => onChange({ start: null, end: null })}
                className="text-[10px] font-bold tracking-wider uppercase text-neutral-400 hover:text-[#e3261d] transition-colors duration-200 flex-shrink-0"
              >
                Clear
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   1 · OPENER
   Full-screen split: dark left + image right
───────────────────────────────────────────── */
const Opener: React.FC = () => (
  <section className="relative min-h-screen flex flex-col lg:flex-row overflow-hidden">

    {/* ── LEFT: dark panel ── */}
    <div className="relative flex-1 bg-primary-dark flex flex-col justify-center pt-32 pb-16 px-10 md:px-16 lg:px-20 overflow-hidden">

      {/* Decorative ghost text */}
      <span className="absolute -bottom-6 -left-4 font-display text-[12rem] font-black text-white/[0.025] select-none leading-none pointer-events-none">
        Hello
      </span>

      {/* Eyebrow */}
      <div className="flex items-center gap-4 mb-8 animate-slide-up opacity-0">
        <div className="w-8 h-px bg-[#e3261d]/60" />
        <span className="text-[10px] font-bold tracking-[0.45em] text-[#e3261d] uppercase">
          Contact Al Maha Holidays
        </span>
      </div>

      {/* Heading */}
      <h1 className="font-display text-6xl md:text-7xl font-bold text-white leading-[0.95] mb-8 animate-slide-up opacity-0 max-w-lg">
        Let's Plan<br />
        <span className="italic font-normal text-white/30">Your Journey</span>
      </h1>

      <div className="w-10 h-0.5 bg-[#e3261d] mb-8 animate-fade-up opacity-0" />

      <p className="text-white/45 text-lg leading-relaxed max-w-sm mb-14 animate-fade-up opacity-0">
        Tell us your dream — we'll craft the perfect Oman experience around it. Our team responds within 24 hours.
      </p>

      {/* Contact channels */}
      <div className="animate-fade-delayed opacity-0">
        <div className="h-px bg-white/8 mb-0" />
        {[
          {
            icon: (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            ),
            label: 'Call us directly',
            value: PHONE,
            href: `tel:${PHONE}`,
          },
          {
            icon: (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            ),
            label: 'Email us',
            value: EMAIL,
            href: `mailto:${EMAIL}`,
          },
          {
            icon: (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ),
            label: 'Response time',
            value: 'Within 24 hours',
            href: null,
          },
        ].map((ch) => (
          <React.Fragment key={ch.label}>
            <div className="flex items-center justify-between gap-6 py-5 group">
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-9 h-9 rounded-full border border-white/12 bg-white/5 flex items-center justify-center flex-shrink-0 text-white/40 group-hover:border-[#e3261d]/40 group-hover:text-[#e3261d] group-hover:bg-[#e3261d]/10 transition-all duration-300">
                  {ch.icon}
                </div>
                <div className="min-w-0">
                  <p className="text-[9px] font-bold tracking-[0.25em] uppercase text-white/25 mb-0.5">{ch.label}</p>
                  {ch.href ? (
                    <a href={ch.href} className="text-white/70 font-medium text-sm hover:text-white transition-colors duration-300 truncate block">
                      {ch.value}
                    </a>
                  ) : (
                    <p className="text-white/70 font-medium text-sm">{ch.value}</p>
                  )}
                </div>
              </div>
              {ch.href && (
                <Arrow className="w-4 h-4 text-white/20 group-hover:text-[#e3261d] group-hover:translate-x-0.5 transition-all duration-300 flex-shrink-0" />
              )}
            </div>
            <div className="h-px bg-white/8" />
          </React.Fragment>
        ))}
      </div>
    </div>

    {/* ── RIGHT: image panel ── */}
    <div className="relative w-full lg:w-[45%] flex-shrink-0 h-[50vh] lg:h-auto overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&q=80"
        alt="Oman landscape"
        className="w-full h-full object-cover"
      />
      {/* Gradient bleeds into dark left */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-dark via-primary-dark/20 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/60 to-transparent" />

      {/* Floating rating badge */}
      <div className="absolute bottom-8 right-8 bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl px-5 py-4">
        <p className="text-white font-display text-2xl font-bold leading-none">4.9 ★</p>
        <p className="text-white/45 text-[9px] tracking-[0.2em] uppercase mt-1">500+ Reviews</p>
      </div>

      {/* Location pill */}
      <div className="absolute top-8 right-8 inline-flex items-center gap-2 bg-black/30 backdrop-blur-md border border-white/10 rounded-full px-4 py-2">
        <svg className="w-3 h-3 text-[#e3261d] flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
        </svg>
        <span className="text-white/70 text-[10px] font-bold tracking-[0.2em] uppercase">Muscat, Oman</span>
      </div>
    </div>

  </section>
);

/* ─────────────────────────────────────────────
   2 · FORM SECTION
   Asymmetric two-panel: form left + info right
───────────────────────────────────────────── */

/* ── Minimal bottom-border input ── */
const Field: React.FC<{
  label: string;
  children: React.ReactNode;
}> = ({ label, children }) => (
  <div className="group">
    <label className="block text-[10px] font-bold tracking-[0.25em] uppercase text-neutral-400 mb-3 group-focus-within:text-[#e3261d] transition-colors duration-300">
      {label}
    </label>
    {children}
  </div>
);

const inputCls =
  'w-full bg-transparent border-b border-neutral-200 focus:border-[#e3261d] outline-none pb-3 text-primary-dark text-base placeholder:text-neutral-300 transition-colors duration-300';

/* ── Contact form ── */
const ContactForm: React.FC = () => {
  const [ref, entry] = useIntersectionObserver({ threshold: 0.08, freezeOnceVisible: true });
  const visible = !!entry?.isIntersecting;

  const [selected, setSelected]   = useState<string[]>([]);
  const [travellers, setTravellers] = useState('');
  const [dateRange, setDateRange]   = useState<DateRange>({ start: null, end: null });
  const [submitted, setSubmitted]   = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const toggle = (t: string) =>
    setSelected((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Format the email body with all form details
    const emailBody = `
Contact Form Submission
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 CONTACT DETAILS
Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}

👥 TRAVEL DETAILS
Number of Travellers: ${travellers || 'Not specified'}
${dateRange.start ? `Travel Dates: ${fmtDate(dateRange.start)}${dateRange.end ? ` → ${fmtDate(dateRange.end)}` : ' (return date not selected)'}` : 'Travel Dates: Not selected'}

🎯 INTERESTS
${selected.length > 0 ? selected.join(', ') : 'None selected'}

💬 MESSAGE
${message}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
This enquiry was submitted via the Al Maha Tourism contact form.
    `.trim();

    // Open default mail app (works on all devices — opens Gmail app on mobile, Gmail/Outlook on desktop)
    const mailtoLink = `mailto:${EMAIL}?subject=${encodeURIComponent('New Contact Form Submission - ' + name)}&body=${encodeURIComponent(emailBody)}`;

    window.location.href = mailtoLink;

    // Show success message
    setSubmitted(true);
  };

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`flex-1 bg-white px-8 md:px-14 lg:px-16 py-20 transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] relative z-10 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    >
      {/* Form header */}
      <div className="flex items-center gap-5 mb-10">
        <div className="flex-1 h-px bg-neutral-100" />
        <span className="text-[10px] font-bold tracking-[0.4em] text-[#e3261d] uppercase whitespace-nowrap">Send a Message</span>
        <div className="flex-1 h-px bg-neutral-100" />
      </div>

      <h2 className="font-display text-4xl md:text-5xl font-bold text-primary-dark leading-[1.05] mb-3">
        Tell us about<br />
        <span className="italic font-normal text-neutral-400">your dream trip</span>
      </h2>

      <div className="w-8 h-0.5 bg-[#e3261d] mb-10" />

      {submitted ? (
        /* ── Success state ── */
        <div className="flex flex-col items-start gap-6 py-12">
          <div className="w-16 h-16 rounded-full bg-[#e3261d]/10 border border-[#e3261d]/30 flex items-center justify-center">
            <svg className="w-7 h-7 text-[#e3261d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <p className="text-[10px] font-bold tracking-[0.35em] text-[#e3261d] uppercase mb-3">Message Sent</p>
            <h3 className="font-display text-3xl font-bold text-primary-dark mb-3">We'll be in touch soon.</h3>
            <p className="text-neutral-500 text-base leading-relaxed max-w-md">
              Thank you for reaching out. One of our travel specialists will respond to your enquiry within 24 hours.
            </p>
          </div>
          <button
            onClick={() => {
              setSubmitted(false);
              setName('');
              setEmail('');
              setPhone('');
              setMessage('');
              setTravellers('');
              setSelected([]);
              setDateRange({ start: null, end: null });
            }}
            className="text-[11px] font-bold tracking-widest uppercase text-neutral-400 hover:text-[#e3261d] transition-colors duration-300"
          >
            Send another message →
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-9">

          {/* Name + Email row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-9">
            <Field label="Full Name">
              <input
                type="text"
                className={inputCls}
                placeholder="Your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Field>
            <Field label="Email Address">
              <input
                type="email"
                className={inputCls}
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Field>
          </div>

          {/* Phone + Travellers row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-9">
            <Field label="Phone Number">
              <input
                type="tel"
                className={inputCls}
                placeholder="+968 …"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </Field>
            <Field label="Number of Travellers">
              <TravellersSelect value={travellers} onChange={setTravellers} />
            </Field>
          </div>

          {/* Tour interest pills */}
          <Field label="Interests — choose all that apply">
            <div className="flex flex-wrap gap-2 pt-1">
              {tourTypes.map((t) => {
                const active = selected.includes(t);
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => toggle(t)}
                    className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full border text-[11px] font-bold tracking-wide transition-all duration-200 ${
                      active
                        ? 'bg-[#e3261d] border-[#e3261d] text-white shadow-[0_4px_14px_rgba(227,38,29,0.3)]'
                        : 'border-neutral-200 text-neutral-500 hover:border-[#e3261d]/40 hover:text-[#e3261d]'
                    }`}
                  >
                    {active && (
                      <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                    {t}
                  </button>
                );
              })}
            </div>
          </Field>

          {/* Preferred dates */}
          <Field label="Preferred Travel Dates">
            <DateRangePicker value={dateRange} onChange={setDateRange} />
          </Field>

          {/* Message */}
          <Field label="Tell Us More">
            <textarea
              rows={4}
              className={`${inputCls} resize-none`}
              placeholder="Any special requirements, dream experiences, or questions for our team…"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </Field>

          {/* Submit */}
          <div className="flex items-center gap-5 pt-2">
            <button
              type="submit"
              className="group flex items-center gap-4 flex-shrink-0"
            >
              <div className="w-14 h-14 rounded-full bg-[#e3261d] flex items-center justify-center shadow-[0_6px_24px_rgba(227,38,29,0.35)] group-hover:shadow-[0_10px_36px_rgba(227,38,29,0.55)] transition-shadow duration-300">
                <Arrow className="w-5 h-5 text-white group-hover:translate-x-0.5 transition-transform duration-300" />
              </div>
              <span className="text-[13px] font-bold tracking-wide text-primary-dark group-hover:text-[#e3261d] transition-colors duration-300 uppercase">
                Send Message
              </span>
            </button>

            <p className="text-neutral-300 text-xs leading-relaxed">
              We respect your privacy.<br />No spam, ever.
            </p>
          </div>

        </form>
      )}
    </div>
  );
};

/* ── Right sidebar: info + map ── */
const ContactSidebar: React.FC = () => {
  const [ref, entry] = useIntersectionObserver({ threshold: 0.08, freezeOnceVisible: true });
  const visible = !!entry?.isIntersecting;

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`w-full lg:w-[380px] xl:w-[420px] flex-shrink-0 bg-[#F7F5F2] flex flex-col transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] delay-200 relative z-10 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
    >
      <div className="px-10 py-20 flex flex-col gap-12 flex-1">

        {/* Reach us directly */}
        <div>
          <p className="text-[10px] font-bold tracking-[0.4em] text-[#e3261d] uppercase mb-6">Reach Us Directly</p>

          <div className="flex flex-col gap-0">
            <div className="h-px bg-neutral-200" />

            <a href={`tel:${PHONE}`} className="group flex items-center justify-between gap-4 py-5 hover:pl-2 transition-all duration-300">
              <div>
                <p className="text-[9px] font-bold tracking-[0.2em] text-neutral-400 uppercase mb-1">Phone</p>
                <p className="font-display text-xl font-bold text-primary-dark group-hover:text-[#e3261d] transition-colors duration-300">{PHONE}</p>
              </div>
              <Arrow className="w-4 h-4 text-neutral-300 group-hover:text-[#e3261d] group-hover:translate-x-0.5 transition-all duration-300 flex-shrink-0" />
            </a>
            <div className="h-px bg-neutral-200" />

            <a href={`mailto:${EMAIL}`} className="group flex items-center justify-between gap-4 py-5 hover:pl-2 transition-all duration-300">
              <div>
                <p className="text-[9px] font-bold tracking-[0.2em] text-neutral-400 uppercase mb-1">Email</p>
                <p className="font-display text-lg font-bold text-primary-dark group-hover:text-[#e3261d] transition-colors duration-300 break-all">{EMAIL}</p>
              </div>
              <Arrow className="w-4 h-4 text-neutral-300 group-hover:text-[#e3261d] group-hover:translate-x-0.5 transition-all duration-300 flex-shrink-0" />
            </a>
            <div className="h-px bg-neutral-200" />

            {/* WhatsApp */}
            <a
              href={`https://wa.me/${PHONE.replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 py-5 hover:pl-2 transition-all duration-300"
            >
              <div className="w-9 h-9 rounded-full bg-[#25D366]/10 border border-[#25D366]/30 flex items-center justify-center flex-shrink-0 group-hover:bg-[#25D366] transition-colors duration-300">
                <svg className="w-4 h-4 text-[#25D366] group-hover:text-white transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M11.999 2C6.477 2 2 6.477 2 12c0 1.94.518 3.76 1.421 5.323L2.05 21.95l4.728-1.349A9.96 9.96 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a7.96 7.96 0 01-4.072-1.114l-.292-.173-3.028.864.877-3.016-.19-.31A7.96 7.96 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z" />
                </svg>
              </div>
              <div>
                <p className="text-[9px] font-bold tracking-[0.2em] text-neutral-400 uppercase mb-0.5">WhatsApp</p>
                <p className="text-sm font-bold text-primary-dark group-hover:text-[#25D366] transition-colors duration-300">Chat with us instantly</p>
              </div>
            </a>
            <div className="h-px bg-neutral-200" />
          </div>
        </div>

        {/* Office hours */}
        <div>
          <p className="text-[10px] font-bold tracking-[0.4em] text-[#e3261d] uppercase mb-6">Office Hours</p>
          <div className="flex flex-col gap-0">
            <div className="h-px bg-neutral-200" />
            {[
              { day: 'Sun – Thu', hours: '8:00 AM – 6:00 PM' },
              { day: 'Saturday', hours: '9:00 AM – 2:00 PM' },
              { day: 'Friday', hours: 'Closed' },
            ].map((h) => (
              <React.Fragment key={h.day}>
                <div className="flex items-center justify-between py-4">
                  <span className="text-[12px] font-bold tracking-[0.1em] text-neutral-600 uppercase">{h.day}</span>
                  <span className={`text-sm font-medium ${h.hours === 'Closed' ? 'text-neutral-300' : 'text-primary-dark'}`}>{h.hours}</span>
                </div>
                <div className="h-px bg-neutral-200" />
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Map */}
        <div>
          <p className="text-[10px] font-bold tracking-[0.4em] text-[#e3261d] uppercase mb-6">Our Location</p>
          <div className="rounded-2xl overflow-hidden aspect-[4/3]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.4581661625643!2d58.355419299999994!3d23.587896!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e91f8c9e2bbb84f%3A0xd679d3cf1dcdb742!2sAl%20Maha%20Rent%20A%20Car%20(Al%20Hajiry%20Group)!5e0!3m2!1sen!2sin!4v1772450459508!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Al Maha Location"
            />
          </div>
        </div>

      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   3 · TRUST BAR
   Dark strip — social proof below the form
───────────────────────────────────────────── */
const TrustBar: React.FC = () => {
  const [ref, entry] = useIntersectionObserver({ threshold: 0.3, freezeOnceVisible: true });
  const visible = !!entry?.isIntersecting;

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className={`bg-[#111111] transition-all duration-700 ease-out relative z-0 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
    >
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/8">

          {/* Stat */}
          {[
            { value: '50k+', label: 'Happy Travellers', sub: 'Across 40+ countries' },
            { value: '4.9 ★', label: 'Average Rating', sub: 'Google · TripAdvisor' },
            { value: '< 24h', label: 'Response Time', sub: 'We respond fast, always' },
          ].map((s) => (
            <div key={s.label} className="px-8 py-10 flex items-center gap-5">
              <div className="flex-1">
                <p className="font-display text-3xl font-bold text-white leading-none mb-1">{s.value}</p>
                <p className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase">{s.label}</p>
              </div>
              <p className="text-white/20 text-xs italic text-right max-w-[120px] leading-relaxed">{s.sub}</p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────
   Page root
───────────────────────────────────────────── */
const Contact: React.FC = () => {
  const seo = PAGE_SEO.contact;

  return (
    <div className="overflow-x-clip">
      <SEO
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        ogImage={seo.ogImage}
        ogType={seo.ogType}
      />
      <Opener />

      {/* Form + Sidebar — side by side */}
      <div className="flex flex-col lg:flex-row relative z-10">
        <ContactForm />
        <ContactSidebar />
      </div>

      <TrustBar />
    </div>
  );
};

export default Contact;
