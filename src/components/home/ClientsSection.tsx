import React from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

/* ─────────────────────────────────────────
   Partner data
───────────────────────────────────────── */
interface Partner {
  name: string;
  logo: string;
}

const partners: Partner[] = [
  { name: 'Partner 1',  logo: '0001.jpg' },
  { name: 'Partner 2',  logo: '0002.jpg' },
  { name: 'Partner 3',  logo: '0003.jpg' },
  { name: 'Partner 4',  logo: '0004.jpg' },
  { name: 'Partner 5',  logo: '0005.jpg' },
  { name: 'Partner 6',  logo: '0006.jpg' },
  { name: 'Partner 7',  logo: '0007.jpg' },
  { name: 'Partner 8',  logo: '0008.jpg' },
  { name: 'Partner 9',  logo: '0009.jpg' },
  { name: 'Partner 10', logo: '0010.jpg' },
  { name: 'Partner 11', logo: '0011.jpg' },
  { name: 'Partner 12', logo: '0012.jpg' },
  { name: 'Partner 13', logo: '0013.jpg' },
  { name: 'Partner 14', logo: '0014.jpg' },
  { name: 'Partner 15', logo: '0015.jpg' },
  { name: 'Partner 16', logo: '0016.jpg' },
  { name: 'Partner 17', logo: '0017.jpg' },
  { name: 'Partner 18', logo: '0018.jpg' },
  { name: 'Partner 19', logo: '0019.jpg' },
  { name: 'Partner 20', logo: '0020.jpg' },
];

const row1 = partners.slice(0, 13);
const row2 = partners.slice(13, 25);

/* ─────────────────────────────────────────
   Logo image component
───────────────────────────────────────── */
const LogoImg: React.FC<{ logo: string; name: string }> = ({ logo, name }) => {
  return (
    <img
      src={`/partners_logo/${logo}`}
      alt={name}
      className="max-h-20 max-w-[170px] w-auto object-contain
        group-hover:scale-105
        transition-all duration-400"
    />
  );
};

/* ─────────────────────────────────────────
   Single partner card
───────────────────────────────────────── */
const PartnerCard: React.FC<Partner> = ({ name, logo }) => (
  <div className="
    group relative flex-shrink-0 flex items-center justify-center
    bg-white border border-neutral-100
    rounded-xl px-8 py-4 w-[220px] h-[95px]
    hover:shadow-lg
    transition-all duration-350 cursor-default
  "
    style={{ transition: 'border-color 0.35s, box-shadow 0.35s' }}
    onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(227, 38, 29, 0.3)'}
    onMouseLeave={(e) => e.currentTarget.style.borderColor = ''}>
    <div className="flex items-center justify-center">
      <LogoImg logo={logo} name={name} />
    </div>
    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-transparent via-transparent to-transparent transition-all duration-300 pointer-events-none"
      style={{ transition: 'background 0.3s' }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'linear-gradient(135deg, rgba(227, 38, 29, 0.02), transparent, rgba(227, 38, 29, 0.02))';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = '';
      }} />
  </div>
);

/* ─────────────────────────────────────────
   Infinite-scroll marquee row
───────────────────────────────────────── */
const MarqueeRow: React.FC<{
  items: Partner[];
  reverse?: boolean;
}> = ({ items, reverse = false }) => {
  const looped = [...items, ...items, ...items, ...items];

  return (
    <div className="marquee-row relative overflow-hidden">
      <div
        className="absolute left-0 top-0 bottom-0 w-40 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, rgba(17, 17, 17, 1) 0%, rgba(17, 17, 17, 0) 100%)' }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-40 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, rgba(17, 17, 17, 1) 0%, rgba(17, 17, 17, 0) 100%)' }}
      />
      <div className={`flex gap-5 ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}>
        {looped.map((partner, i) => (
          <PartnerCard key={`${partner.name}-${i}`} {...partner} />
        ))}
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────
   Main section
───────────────────────────────────────── */
const ClientsSection: React.FC = () => {
  const [headerRef, headerEntry] = useIntersectionObserver({ threshold: 0.2, freezeOnceVisible: true });
  const [rowsRef, rowsEntry]     = useIntersectionObserver({ threshold: 0.1, freezeOnceVisible: true });

  const headerVisible = !!headerEntry?.isIntersecting;
  const rowsVisible   = !!rowsEntry?.isIntersecting;

  return (
    <section className="py-28 overflow-hidden relative" style={{ background: 'linear-gradient(135deg, #0d091f 0%, #111111 50%, #1a0a0a 100%)' }}>
      {/* Background dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Ambient colour glows */}
      <div style={{
        position: 'absolute', top: '-10%', left: '5%',
        width: '55vw', height: '55vw', borderRadius: '50%',
        background: 'radial-gradient(circle, #4e3779 0%, transparent 65%)',
        opacity: 0.30, filter: 'blur(60px)', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '-10%', right: '5%',
        width: '35vw', height: '35vw', borderRadius: '50%',
        background: 'radial-gradient(circle, #e3261d 0%, transparent 65%)',
        opacity: 0.18, filter: 'blur(70px)', pointerEvents: 'none',
      }} />
      {/* Top gradient accent line */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        height: '2px',
        background: 'linear-gradient(90deg, #4e3779 0%, #e3261d 50%, #FF9D00 100%)',
        opacity: 0.8,
      }} />

      <div className="relative z-10">

        {/* ── Header ── */}
        <div
          ref={headerRef as React.RefObject<HTMLDivElement>}
          className={`text-center mb-16 px-6 transition-all duration-700 ease-out ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="flex items-center gap-5 mb-10 max-w-md mx-auto">
            <div className="flex-1 h-px bg-white/10" />
            <span className="font-['Lato'] text-[10px] font-bold tracking-[0.4em] uppercase whitespace-nowrap" style={{ color: '#4e3779' }}>
              Trusted Partners
            </span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.0] mb-6">
            Our{' '}
            <span className="italic font-normal text-white/30">Valued Clients</span>
          </h2>

          <p className="text-white/45 text-lg leading-relaxed max-w-2xl mx-auto mb-12">
            Proudly serving industry leaders across energy, aviation, hospitality, and automotive sectors throughout the Gulf region.
          </p>

          {/* Stats row */}
          <div className="flex items-center justify-center gap-8 flex-wrap">
            {[
              { value: '25+',  label: 'Trusted Clients'   },
              { value: '15+',  label: 'Years Experience'  },
              { value: '500+', label: 'Successful Events' },
            ].map((stat, i, arr) => (
              <React.Fragment key={stat.label}>
                <div className="text-center">
                  <p className="font-display text-3xl font-bold text-white leading-none">{stat.value}</p>
                  <p className="font-['Lato'] text-white/25 text-[10px] tracking-[0.25em] uppercase mt-2">{stat.label}</p>
                </div>
                {i < arr.length - 1 && <div className="w-px h-12 bg-white/10" />}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* ── Marquee rows ── */}
        <div
          ref={rowsRef as React.RefObject<HTMLDivElement>}
          className={`space-y-6 transition-all duration-700 ease-out delay-200 ${
            rowsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <MarqueeRow items={row1} reverse={false} />
          <MarqueeRow items={row2} reverse={true} />
        </div>

        {/* ── Bottom note ── */}
        <div
          className={`text-center mt-14 px-6 transition-all duration-700 ease-out delay-500 ${
            rowsVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <p className="font-['Lato'] text-white/20 text-xs tracking-[0.2em] uppercase">
            And many more trusted partners across the region
          </p>
        </div>

      </div>
    </section>
  );
};

export default ClientsSection;
