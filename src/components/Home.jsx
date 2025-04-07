import React, { useEffect, useRef } from "react";

function Home({ onExplore }) {
  const animatedTextRef = useRef(null);
  const trendingWords = [
    "#Trend",
    "#Viral",
    "#Upcoming",
    "#Popular",
    "#Exclusive",
  ];

  useEffect(() => {
    const textElement = animatedTextRef.current;
    let currentIndex = 0;

    const animateTrendingWords = () => {
      if (textElement) {
        textElement.textContent = trendingWords[currentIndex];
        textElement.style.opacity = 0;

        // Fade in
        let opacity = 0;
        const fadeIn = setInterval(() => {
          if (opacity >= 1) {
            clearInterval(fadeIn);

            // Wait before fade out
            setTimeout(() => {
              // Fade out
              let opacityOut = 1;
              const fadeOut = setInterval(() => {
                if (opacityOut <= 0) {
                  clearInterval(fadeOut);
                  currentIndex = (currentIndex + 1) % trendingWords.length;

                  // Start next word animation
                  setTimeout(animateTrendingWords, 500);
                }
                textElement.style.opacity = opacityOut;
                opacityOut -= 0.1;
              }, 50);
            }, 2000);
          }
          textElement.style.opacity = opacity;
          opacity += 0.1;
        }, 50);
      }
    };

    animateTrendingWords();

    return () => {
      // Clean up any potential intervals
      const intervals = window.setInterval(() => {}, 0);
      for (let i = 0; i < intervals; i++) {
        window.clearInterval(i);
      }
    };
  }, []);

  return (
    <section className="hero-section">
      <div className="trending-words">
        <span ref={animatedTextRef} className="animated-word"></span>
      </div>
      <h1>Welcome to TrendX</h1>
      <p>Your go-to platform for the latest trending topics worldwide.</p>
      <button className="cta-button" onClick={onExplore}>
        Explore Trends
      </button>
    </section>
  );
}

export default Home;
