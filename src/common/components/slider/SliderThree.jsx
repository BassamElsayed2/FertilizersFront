"use client";
import React, { useEffect, useMemo } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import sliderData from "./sliderData.json";

const SliderThree = ({
  dataSource = sliderData,
  height = 340,
  showButtons = true,
}) => {
  const slides = dataSource.slides || [];

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const randomizedSlides = useMemo(() => shuffleArray(slides), [slides]);

  useEffect(() => {
    let carousel;
    let playCurrentVideo;
    if (typeof window !== "undefined") {
      import("bootstrap/dist/js/bootstrap.bundle.min.js").then(() => {
        carousel = document.getElementById("carouselExampleCaptions");
        playCurrentVideo = () => {
          const videos = carousel.querySelectorAll("video");
          videos.forEach((v) => {
            v.pause();
            v.currentTime = 0;
          });

          const activeVideo = carousel.querySelector(
            ".carousel-item.active video"
          );
          if (activeVideo) {
            activeVideo.muted = false; // الفيديو يعمل بصوت
            activeVideo.play().catch(console.error);
          }
        };
        playCurrentVideo();
        carousel.addEventListener("slid.bs.carousel", playCurrentVideo);
      });
    }
    return () => {
      if (carousel && playCurrentVideo) {
        carousel.removeEventListener("slid.bs.carousel", playCurrentVideo);
      }
    };
  }, []);

  if (!randomizedSlides.length) return <div>جاري التحميل...</div>;

  return (
    <div className="slider-container my-0">
      <div
        id="carouselExampleCaptions"
        className="carousel slide"
        style={{ maxHeight: `${height}px`, overflow: "hidden" }}
      >
        <div className="carousel-inner">
          {randomizedSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`carousel-item ${index === 0 ? "active" : ""}`}
              style={{ background: "#fff" }}
            >
              <video
                src={slide.video}
                className="d-block w-100"
                height={height}
                width={1305}
                style={{ objectFit: "cover" }}
                playsInline
                controls={false}
                muted={false}
              />
            </div>
          ))}
        </div>

        {showButtons && (
          <>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide="prev"
              style={{
                width: 56,
                height: 56,
                borderRadius: "50%",
                background: "rgba(0,0,0,0.5)",
                border: "none",
                top: "50%",
                transform: "translateY(-50%)",
                left: 16,
                zIndex: 3,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
                style={{ filter: "invert(1)", width: 32, height: 32 }}
              />
              <span className="visually-hidden">السابق</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide="next"
              style={{
                width: 56,
                height: 56,
                borderRadius: "50%",
                background: "rgba(0,0,0,0.5)",
                border: "none",
                top: "50%",
                transform: "translateY(-50%)",
                right: 16,
                zIndex: 3,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
                style={{ filter: "invert(1)", width: 32, height: 32 }}
              />
              <span className="visually-hidden">التالي</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default SliderThree;
