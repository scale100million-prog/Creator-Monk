import React from 'react';

interface MarqueePerson {
  name: string;
  image: string;
  followers: string;
}

const MARQUEE_PEOPLE: MarqueePerson[] = [
  {
    name: 'Tahwid',
    image: 'https://raw.githubusercontent.com/scale100million-prog/my-images/main/Tahwid.JPG',
    followers: '0K Followers',
  },
  {
    name: 'Supreet',
    image: 'https://raw.githubusercontent.com/scale100million-prog/my-images/main/Supreet.jpg',
    followers: '0K Followers',
  },
  {
    name: 'Sweta Sharma',
    image: 'https://raw.githubusercontent.com/scale100million-prog/my-images/main/Sweta%20Sharma.JPG',
    followers: '0K Followers',
  },
  {
    name: 'Upasana',
    image: 'https://raw.githubusercontent.com/scale100million-prog/my-images/main/Upasana.jpg',
    followers: '0K Followers',
  },
  {
    name: 'Shweta',
    image: 'https://raw.githubusercontent.com/scale100million-prog/my-images/main/Shweta.png',
    followers: '0K Followers',
  },
  {
    name: 'Priyanka',
    image: 'https://raw.githubusercontent.com/scale100million-prog/my-images/main/Priyanka.jpeg',
    followers: '0K Followers',
  },
  {
    name: 'Nidhi',
    image: 'https://raw.githubusercontent.com/scale100million-prog/my-images/main/Nidhi.JPG',
    followers: '0K Followers',
  },
];

export const TrustedByMarquee: React.FC = () => {
  return (
    <section
      id="trusted-by-marquee-section"
      className="w-full bg-[#0E1412] pt-[36px] md:pt-[52px] pb-[32px] md:pb-[44px] overflow-hidden flex flex-col items-center"
      aria-label="Trusted By 7 Figure Business Owners"
    >
      {/* 1. Heading */}
      <div className="w-full max-w-[1180px] mx-auto px-[20px] text-center mb-[22px] md:mb-[32px]">
        <h3
          id="trusted-by-heading"
          className="font-bold text-[15px] md:text-[20px] leading-[1.4] text-[#F0ECE1] inline-flex flex-wrap items-center justify-center gap-[8px] md:gap-[10px]"
        >
          <span>Trusted By</span>
          <span className="inline-block bg-[#C9AB8B] text-[#0E1412] font-bold text-[13px] md:text-[17px] px-[14px] py-[3px] md:px-[18px] md:py-[4px] rounded-full whitespace-nowrap shadow-sm">
            7 Figure Business Owners
          </span>
        </h3>
      </div>

      {/* Inline styles for guaranteed high-priority animation execution */}
      <style>{`
        @keyframes marqueeLTR {
          from {
            transform: translateX(-50%);
          }
          to {
            transform: translateX(0);
          }
        }
        .marquee-track-ltr {
          display: flex;
          width: max-content;
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
      <div className="w-full relative overflow-x-hidden motion-reduce:overflow-x-auto motion-reduce:pb-[8px] [mask-image:linear-gradient(to_right,transparent_0%,black_36px,black_calc(100%-36px),transparent_100%)] md:[mask-image:linear-gradient(to_right,transparent_0%,black_100px,black_calc(100%-100px),transparent_100%)]">
        {/* Left & Right Fade Gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-[40px] md:w-[120px] bg-gradient-to-r from-[#0E1412] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-[40px] md:w-[120px] bg-gradient-to-l from-[#0E1412] to-transparent z-10 pointer-events-none" />

        {/* Marquee Row (LTR 20s linear infinite) */}
        <div
          id="marquee-track"
          className="marquee-track-ltr flex items-center py-[4px]"
        >
          {/* Card Set 1 */}
          <div className="flex items-center gap-[16px] pr-[16px] shrink-0">
            {MARQUEE_PEOPLE.map((person, idx) => (
              <div
                key={`person-1-${person.name}-${idx}`}
                id={`marquee-card-${person.name.toLowerCase().replace(/\s+/g, '-')}-1`}
                className="flex items-center gap-[12px] bg-[#16201D] border border-[#1E2F2A] rounded-full pl-[8px] pr-[18px] py-[8px] md:pl-[10px] md:pr-[22px] md:py-[10px] shrink-0 select-none transition-colors duration-200 hover:border-[#C9AB8B]/40"
              >
                <img
                  src={person.image}
                  alt={person.name}
                  className="w-[38px] h-[38px] md:w-[46px] md:h-[46px] rounded-full object-cover shrink-0 bg-[#1E2F2A]"
                  loading="lazy"
                />
                <div className="flex flex-col text-left justify-center">
                  <span className="font-bold text-[#F0ECE1] text-[13px] md:text-[15px] leading-tight whitespace-nowrap">
                    {person.name}
                  </span>
                  <span className="text-[#A3B0A9] text-[11px] md:text-[13px] leading-tight whitespace-nowrap mt-[2px]">
                    {person.followers}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Card Set 2 (Duplicated for seamless loop) */}
          <div className="flex items-center gap-[16px] pr-[16px] shrink-0" aria-hidden="true">
            {MARQUEE_PEOPLE.map((person, idx) => (
              <div
                key={`person-2-${person.name}-${idx}`}
                id={`marquee-card-${person.name.toLowerCase().replace(/\s+/g, '-')}-2`}
                className="flex items-center gap-[12px] bg-[#16201D] border border-[#1E2F2A] rounded-full pl-[8px] pr-[18px] py-[8px] md:pl-[10px] md:pr-[22px] md:py-[10px] shrink-0 select-none transition-colors duration-200 hover:border-[#C9AB8B]/40"
              >
                <img
                  src={person.image}
                  alt={person.name}
                  className="w-[38px] h-[38px] md:w-[46px] md:h-[46px] rounded-full object-cover shrink-0 bg-[#1E2F2A]"
                  loading="lazy"
                />
                <div className="flex flex-col text-left justify-center">
                  <span className="font-bold text-[#F0ECE1] text-[13px] md:text-[15px] leading-tight whitespace-nowrap">
                    {person.name}
                  </span>
                  <span className="text-[#A3B0A9] text-[11px] md:text-[13px] leading-tight whitespace-nowrap mt-[2px]">
                    {person.followers}
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
