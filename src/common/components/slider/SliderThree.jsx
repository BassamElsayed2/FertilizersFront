import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Image from "next/image";
import Link from "next/link";
import sliderData from "../../../data/slider/sliderData.json";
import { useLocale } from "next-intl";

const SliderThree = ({
  dataSource = sliderData,
  interval = 4000,
  height = 500,
  showButtons = true,
  showIndicators = true,
}) => {
  const [slides, setSlides] = useState([]);
  const locale = useLocale();

  useEffect(() => {
    // Only import Bootstrap JS on the client side
    if (typeof window !== "undefined") {
      import("bootstrap/dist/js/bootstrap.bundle.min.js");
    }
    setSlides(dataSource.slides || []);
  }, [dataSource]);

  if (!slides.length) {
    return <div>جاري التحميل...</div>;
  }

  return (
    <div className="container my-5">
      <div
        id="carouselExampleCaptions"
        className="carousel slide"
        data-bs-ride="carousel"
        data-bs-interval={interval}
        style={{ maxHeight: `${height}px`, overflow: "hidden" }}
      >
        {showIndicators && (
          <div className="carousel-indicators">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to={index}
                className={index === 0 ? "active" : ""}
                aria-current={index === 0 ? "true" : "false"}
                aria-label={`Slide ${index + 1}`}
              ></button>
            ))}
          </div>
        )}
        <div className="carousel-inner">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`carousel-item ${index === 0 ? "active" : ""}`}
            >
              <Image
                src={slide.image}
                className="d-block w-100"
                height={height}
                width={1400}
                style={{ objectFit: "cover" }}
                alt={slide.title}
                priority={index === 0}
              />
              <div className="carousel-caption d-none d-md-block">
                <h2
                  className="mb-3"
                  style={{
                    fontSize: "2.5rem",
                    fontWeight: "bold",
                    textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
                  }}
                >
                  {slide.title}
                </h2>
                <p
                  className="mb-4"
                  style={{
                    fontSize: "2.2rem",
                    color: "white",
                  }}
                >
                  {slide.description}
                </p>
              </div>
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
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default SliderThree;
