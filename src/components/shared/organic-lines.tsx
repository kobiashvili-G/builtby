"use client";

export function OrganicLines() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <svg
        viewBox="0 0 1440 2400"
        fill="none"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="none"
      >
        <path
          d="M -100 500 C 200 300, 400 700, 700 450 S 1100 200, 1300 500 S 1500 700, 1600 400"
          stroke="#D4CBC2"
          strokeWidth="1.5"
          className="animate-line-flow-1"
        />
        <path
          d="M -50 800 C 300 1000, 500 600, 800 900 S 1100 1200, 1300 800 S 1500 600, 1600 1000"
          stroke="#D4CBC2"
          strokeWidth="1.2"
          className="animate-line-flow-2"
        />
        <path
          d="M 0 1200 C 200 1000, 500 1400, 700 1150 S 1000 950, 1200 1250 S 1400 1400, 1500 1100"
          stroke="#DDD6CD"
          strokeWidth="1"
          className="animate-line-flow-3"
        />
        <path
          d="M -80 1600 C 250 1400, 450 1800, 700 1550 S 1050 1350, 1300 1650 S 1500 1800, 1600 1500"
          stroke="#D4CBC2"
          strokeWidth="1.3"
          className="animate-line-flow-1"
        />
        <path
          d="M 0 2000 C 300 2200, 600 1800, 900 2100 S 1200 2300, 1500 2000"
          stroke="#DDD6CD"
          strokeWidth="1"
          className="animate-line-flow-2"
        />
      </svg>
    </div>
  );
}
