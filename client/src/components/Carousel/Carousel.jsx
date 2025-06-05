import React, { useEffect, useRef, useState } from "react";
import ColorThief from "colorthief";
import "./index.css"; // Adapte ce chemin si besoin

const Carousel = ({
  images = [],
  interval = 5000,
  activeIndex,
  onChange,
  carouselKey,
}) => {
  const timeoutRef = useRef(null);
  const imgRefs = useRef([]); // <-- Tableau de refs pour chaque <img>

  // États pour les couleurs extraites
  const [shadowColor, setShadowColor] = useState("rgba(0,0,0,0.3)");
  const [mainColor, setMainColor] = useState("rgba(0,0,0,0.8)");

  // Timer pour l’auto‐play
  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      const nextIndex = (activeIndex + 1) % images.length;
      onChange(nextIndex);
    }, interval);

    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [activeIndex, images.length, interval, onChange]);

  // Si on clique sur un indicateur (dot), on passe directement à cet index
  const handleIndicatorClick = (idx) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    onChange(idx);
  };

  // Fonction pour extraire les couleurs via ColorThief
  const extractColors = (imgElement) => {
    if (!imgElement) return;
    const colorThief = new ColorThief();
    // Si l’image est déjà chargée et a des dimensions
    if (imgElement.complete && imgElement.naturalWidth !== 0) {
      try {
        const [r, g, b] = colorThief.getColor(imgElement);
        setMainColor(`rgba(${r}, ${g}, ${b}, 1)`);
        setShadowColor(`
          0 8px 16px rgba(${r}, ${g}, ${b}, 0.3),
          0 16px 32px rgba(${r}, ${g}, ${b}, 0.3),
          0 24px 48px rgba(${r}, ${g}, ${b}, 0.3)
        `);
        console.log(r, g, b);
      } catch (err) {
        console.error("Color extraction failed:", err);
      }
    }
  };

  // À chaque changement de activeIndex, on appelle extractColors sur la <img> courante
  useEffect(() => {
    const imgEl = imgRefs.current[activeIndex];
    if (imgEl) {
      if (imgEl.complete) {
        extractColors(imgEl);
      } else {
        imgEl.addEventListener(
          "load",
          () => {
            extractColors(imgEl);
          },
          { once: true }
        );
      }
    }
  }, [activeIndex]);

  return (
    <div className="carousel" key={carouselKey}>
      <div
        className="slidesContainer"
        style={{
          boxShadow: shadowColor,
          transition: "box-shadow 0.6s ease",
          borderRadius: "1.3rem",
          zIndex : 9999999
        }}
      >
        {images.map((src, idx) => (
          <div
            className={`slide ${idx === activeIndex ? "active" : ""}`}
            key={idx}
          >
            <img
              style={{
                boxShadow: shadowColor,
                transition: "box-shadow 0.6s ease",
                borderRadius: "1.3rem",
                zIndex : 9999999
              }}
              ref={(el) => (imgRefs.current[idx] = el)}
              src={src}
              alt={`slide-${idx}`}
              crossOrigin="anonymous"
            />
          </div>
        ))}
      </div>

      <div className="indicators">
        {images.map((_, idx) => (
          <button
            key={idx}
            className={`dot ${idx === activeIndex ? "selected" : ""}`}
            onClick={() => handleIndicatorClick(idx)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
