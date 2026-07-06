const SLIDES = [
  { src: "sky-diving", label: "Sky Diving" },
  { src: "africa", label: "Africa" },
  { src: "pilot-plane", label: "Pilot Life" },
  { src: "iceland-2", label: "Iceland" },
  { src: "golf", label: "Golf" },
  { src: "adrenaline-1", label: "Adrenaline" },
  { src: "spain", label: "Spain" },
  { src: "army", label: "Army Days" },
  { src: "ski-2000", label: "Ski 2000" },
  { src: "ai-film-certificate", label: "AI Filmmaker" },
  { src: "iceland-3", label: "Glacier Days" },
  { src: "solo-flight", label: "Solo Flight" },
  { src: "travel-1", label: "On the Road" },
  { src: "adrenaline-2", label: "Full Send" },
  { src: "icelnad-1", label: "Iceland" },
  { src: "sky-diving-2", label: "Freefall" },
  { src: "africa-3", label: "Safari" },
  { src: "face-swap2", label: "AI Playground" },
];

const STEP = 360 / SLIDES.length;

export function InterestsCarousel() {
  return (
    <div className="carousel-stage relative mx-auto mt-16 w-full max-w-5xl" aria-hidden="true">
      <div className="carousel-tilt">
        <div className="carousel-ring">
          {SLIDES.map((slide, i) => (
            <figure
              key={slide.src}
              className="carousel-panel"
              style={{
                transform: `rotateY(${i * STEP}deg) translateZ(var(--car-radius))`,
              }}
            >
              <img src={`/assets/carousel/${slide.src}.jpg`} alt="" loading="lazy" />
              <span>{slide.label}</span>
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
}
