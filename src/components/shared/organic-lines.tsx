export function OrganicLines() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <svg
        className="h-full w-full opacity-60"
        viewBox="0 0 1440 900"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Smooth continuous organic curves — inspired by landonorris.com blob patterns */}
        <path
          d="M -200 200 C 0 100, 200 350, 400 250 C 600 150, 700 400, 900 300 C 1100 200, 1200 450, 1400 350 C 1600 250, 1700 400, 1800 300"
          stroke="#C8BDB0"
          strokeWidth="1.2"
          opacity="0.7"
        />
        <path
          d="M -100 400 C 100 300, 300 550, 500 420 C 700 290, 850 520, 1050 400 C 1250 280, 1350 500, 1550 380"
          stroke="#C8BDB0"
          strokeWidth="1"
          opacity="0.5"
        />
        <path
          d="M -150 600 C 50 500, 250 700, 450 580 C 650 460, 800 680, 1000 560 C 1200 440, 1350 650, 1550 530 C 1700 430, 1800 600, 1900 500"
          stroke="#D0C4B6"
          strokeWidth="0.8"
          opacity="0.4"
        />
        <path
          d="M -50 150 C 150 50, 350 280, 550 160 C 750 40, 900 260, 1100 150 C 1300 40, 1450 250, 1650 140"
          stroke="#D0C4B6"
          strokeWidth="0.6"
          opacity="0.3"
        />
        <path
          d="M -100 750 C 100 650, 350 850, 550 730 C 750 610, 950 800, 1150 690 C 1350 580, 1500 780, 1700 660"
          stroke="#C8BDB0"
          strokeWidth="0.9"
          opacity="0.35"
        />
      </svg>
    </div>
  );
}
