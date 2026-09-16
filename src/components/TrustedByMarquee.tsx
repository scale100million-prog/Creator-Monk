import React from 'react';

interface MarqueePerson {
  name: string;
  image: string;
  profession: string;
}

const MARQUEE_PEOPLE: MarqueePerson[] = [
  {
    name: 'Tahwid',
    image: 'https://raw.githubusercontent.com/scale100million-prog/my-images/main/Tahwid.JPG',
    profession: 'Agency Owner',
  },
  {
    name: 'Supreet',
    image: 'https://raw.githubusercontent.com/scale100million-prog/my-images/main/Supreet.jpg',
    profession: 'Life Coach',
  },
  {
    name: 'Sweta Sharma',
    image: 'https://raw.githubusercontent.com/scale100million-prog/my-images/main/Sweta%20Sharma.JPG',
    profession: 'PCOD Coach',
  },
  {
    name: 'Nidhi',
    image: 'https://raw.githubusercontent.com/scale100million-prog/my-images/main/Nidhi.JPG',
    profession: 'Funnel Builder',
  },
  {
    name: 'Priyanka',
    image: 'https://raw.githubusercontent.com/scale100million-prog/my-images/main/Priyanka.jpeg',
    profession: 'Life Coach',
  },
  {
    name: 'Shweta',
    image: 'https://raw.githubusercontent.com/scale100million-prog/my-images/main/Shweta.png',
    profession: 'Life Coach',
  },
];

export const TrustedByMarquee: React.FC = () => {
  return (
    <section
      id="trusted-by-marquee-section"
      className="w-full bg-[#0A0A0A] pt-[36px] md:pt-[52px] pb-[32px] md:pb-[44px] overflow-hidden flex flex-col items-center"
      aria-label="Trusted By 7 Figure Business Owners"
    >
      {/* 1. Heading */}
      <div className="w-full max-w-[1180px] mx-auto px-[20px] text-center mb-[24px] md:mb-[36px]">
        <h3
          id="trusted-by-heading"
          className="font-bold text-[22px] md:text-[32px] leading-[1.3] text-[#FFFFFF] inline-flex flex-wrap items-center justify-center gap-[10px] md:gap-[12px]"
        >
          <span>Trusted By</span>
          <span className="inline-block bg-[#E8D171] text-[#0A0A0A] font-bold text-[22px] md:text-[32px] leading-tight px-[16px] py-[10px] md:px-[24px] md:py-[12px] rounded-[10px] whitespace-nowrap shadow-sm">
            7 Figure Business Owners
          </span>
        </h3>
      </div>

      {/* Inline styles for guaranteed high-priority animation execution */}
      <style>{`
        @keyframes marqueeLTR {
          from {
            transform: translateX(-33.3333%);
          }
          to {
            transform: translateX(0);
          }
        }
        .marquee-track-ltr {
          display: flex;
          width: max-content;
          flex-wrap: nowrap;
          animation: marqueeLTR 20s linear infinite;
          will-change: transform;
        }
        .marquee-track-ltr:hover {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track-ltr {
            animation: none;
          }
        }
      `}</style>

      {/* 2. Horizontal Marquee Track Container */}
      <div className="w-full relative overflow-hidden motion-reduce:overflow-x-auto motion-reduce:pb-[8px] [mask-image:linear-gradient(to_right,transparent_0%,black_36px,black_calc(100%-36px),transparent_100%)] md:[mask-image:linear-gradient(to_right,transparent_0%,black_100px,black_calc(100%-100px),transparent_100%)]">
        {/* Left & Right Fade Gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-[40px] md:w-[120px] bg-gradient-to-r from-[#0A0A0A] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-[40px] md:w-[120px] bg-gradient-to-l from-[#0A0A0A] to-transparent z-10 pointer-events-none" />

        {/* Marquee Row (LTR 20s linear infinite) */}
        <div
          id="marquee-track"
          className="marquee-track-ltr flex items-center py-[4px]"
          style={{ display: 'flex', width: 'max-content', flexWrap: 'nowrap' }}
        >
          {/* Card Set 1 */}
          <div className="flex items-center gap-[16px] pr-[16px]" style={{ flex: '0 0 auto' }}>
            {MARQUEE_PEOPLE.map((person, idx) => (
              <div
                key={`person-1-${person.name}-${idx}`}
                id={`marquee-card-${person.name.toLowerCase().replace(/\s+/g, '-')}-1`}
                style={{ flex: '0 0 auto' }}
                className="flex items-center gap-[12px] bg-[#141414] border border-[#262626] rounded-full pl-[8px] pr-[18px] py-[8px] md:pl-[10px] md:pr-[22px] md:py-[10px] shrink-0 select-none transition-colors duration-200 hover:border-[#E8D171]/40"
              >
                <img
                  src={person.image}
                  alt={person.name}
                  className="w-[38px] h-[38px] md:w-[46px] md:h-[46px] rounded-full object-cover shrink-0 bg-[#262626]"
                  loading="eager"
                />
                <div className="flex flex-col text-left justify-center">
                  <span className="font-bold text-[#FFFFFF] text-[13px] md:text-[15px] leading-tight whitespace-nowrap">
                    {person.name}
                  </span>
                  <span className="text-[#A0A0A0] text-[11px] md:text-[13px] leading-tight whitespace-nowrap mt-[2px]">
                    {person.profession}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Card Set 2 (Duplicated for seamless loop) */}
          <div className="flex items-center gap-[16px] pr-[16px]" style={{ flex: '0 0 auto' }} aria-hidden="true">
            {MARQUEE_PEOPLE.map((person, idx) => (
              <div
                key={`person-2-${person.name}-${idx}`}
                id={`marquee-card-${person.name.toLowerCase().replace(/\s+/g, '-')}-2`}
                style={{ flex: '0 0 auto' }}
                className="flex items-center gap-[12px] bg-[#141414] border border-[#262626] rounded-full pl-[8px] pr-[18px] py-[8px] md:pl-[10px] md:pr-[22px] md:py-[10px] shrink-0 select-none transition-colors duration-200 hover:border-[#E8D171]/40"
              >
                <img
                  src={person.image}
                  alt={person.name}
                  className="w-[38px] h-[38px] md:w-[46px] md:h-[46px] rounded-full object-cover shrink-0 bg-[#262626]"
                  loading="eager"
                />
                <div className="flex flex-col text-left justify-center">
                  <span className="font-bold text-[#FFFFFF] text-[13px] md:text-[15px] leading-tight whitespace-nowrap">
                    {person.name}
                  </span>
                  <span className="text-[#A0A0A0] text-[11px] md:text-[13px] leading-tight whitespace-nowrap mt-[2px]">
                    {person.profession}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Card Set 3 (Triplicated for seamless widescreen coverage) */}
          <div className="flex items-center gap-[16px] pr-[16px]" style={{ flex: '0 0 auto' }} aria-hidden="true">
            {MARQUEE_PEOPLE.map((person, idx) => (
              <div
                key={`person-3-${person.name}-${idx}`}
                id={`marquee-card-${person.name.toLowerCase().replace(/\s+/g, '-')}-3`}
                style={{ flex: '0 0 auto' }}
                className="flex items-center gap-[12px] bg-[#141414] border border-[#262626] rounded-full pl-[8px] pr-[18px] py-[8px] md:pl-[10px] md:pr-[22px] md:py-[10px] shrink-0 select-none transition-colors duration-200 hover:border-[#E8D171]/40"
              >
                <img
                  src={person.image}
                  alt={person.name}
                  className="w-[38px] h-[38px] md:w-[46px] md:h-[46px] rounded-full object-cover shrink-0 bg-[#262626]"
                  loading="eager"
                />
                <div className="flex flex-col text-left justify-center">
                  <span className="font-bold text-[#FFFFFF] text-[13px] md:text-[15px] leading-tight whitespace-nowrap">
                    {person.name}
                  </span>
                  <span className="text-[#A0A0A0] text-[11px] md:text-[13px] leading-tight whitespace-nowrap mt-[2px]">
                    {person.profession}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
