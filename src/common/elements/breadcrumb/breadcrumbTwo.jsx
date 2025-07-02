import { useState } from "react";
import { useLocale } from "next-intl";

const BreadcrumbTwo = ({ bgImae, title, paragraph }) => {
  const [showVideo, setShowVideo] = useState(false);
  const locale = useLocale();

  return (
    <>
      <div
        className="axil-banner banner-style-1 bg_image"
        style={{ backgroundImage: bgImae }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <img
                src="/images/main-img4.d39f6e59 (1).png"
                alt="ENS"
                style={{
                  position: "absolute",
                  top: 50,
                  left: 50,
                  width: "900px",
                  height: "auto",
                }}
              />
              <div className="inner">
                <h1 className="title">{title || "Title"}</h1>
                <p
                  className="description fs-4 w-50"
                  dangerouslySetInnerHTML={{ __html: paragraph }}
                ></p>
                <button
                  className="button mt-3"
                  onClick={() => setShowVideo(true)}
                >
                  <p>{locale === "ar" ? "نظرة عامة" : "Overview"}</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showVideo && (
        <div
          onClick={() => setShowVideo(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0, 0, 0, 0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            backdropFilter: "blur(4px)",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#fff",
              padding: 0,
              borderRadius: "12px",
              maxWidth: "90%",
              width: "1000px",
              aspectRatio: "16 / 9",
              position: "relative",
              boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
              overflow: "hidden",
              animation: "fadeIn 0.3s ease",
            }}
          >
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/fMdOs9scO2U"
              title="YouTube video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </>
  );
};

export default BreadcrumbTwo;
