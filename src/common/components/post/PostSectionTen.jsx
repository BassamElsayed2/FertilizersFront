import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

import { useTranslation } from "react-i18next";
import { getProducts } from "../../../../services/apiProduct";

const PostSectionTen = () => {
  const { data: postData = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const { locale } = useRouter();
  const { t } = useTranslation("common");

  const getImageSrc = (img) => {
    if (Array.isArray(img)) return img[0] || "";
    if (typeof img === "string") return img;
    return "";
  };

  if (isLoading) {
    return (
      <div className="axil-post-grid-area axil-section-gap bg-color-white">
        <div className="container">
          {/* Header Skeleton */}
          <motion.div
            className="d-flex justify-content-between mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div
              className="skeleton-title"
              style={{
                width: "300px",
                height: "60px",
                backgroundColor: "#e9ecef",
                borderRadius: "8px",
                animation: "pulse 1.5s ease-in-out infinite",
              }}
            />
            <div
              className="skeleton-button"
              style={{
                width: "120px",
                height: "50px",
                backgroundColor: "#e9ecef",
                borderRadius: "8px",
                animation: "pulse 1.5s ease-in-out infinite",
              }}
            />
          </motion.div>

          <div className="row">
            <div className="col-lg-12">
              <div className="row mt--40">
                {/* Left Column - Cards Skeleton */}
                <div className="col-xl-5 col-lg-6 col-md-12 col-12">
                  {[1, 2, 3, 4, 5].map((item) => (
                    <motion.div
                      key={item}
                      className="content-block post-medium post-medium-border border-thin mb-3"
                      style={{
                        display: "flex",
                        gap: "15px",
                        padding: "15px",
                        border: "1px solid #e9ecef",
                        borderRadius: "8px",
                      }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: item * 0.1,
                        ease: "easeOut",
                      }}
                    >
                      {/* Image Skeleton */}
                      <div
                        style={{
                          width: "100px",
                          height: "100px",
                          backgroundColor: "#e9ecef",
                          borderRadius: "8px",
                          flexShrink: 0,
                          animation: "pulse 1.5s ease-in-out infinite",
                        }}
                      />

                      {/* Content Skeleton */}
                      <div style={{ flex: 1 }}>
                        <div
                          style={{
                            width: "80%",
                            height: "24px",
                            backgroundColor: "#e9ecef",
                            borderRadius: "4px",
                            marginBottom: "10px",
                            animation: "pulse 1.5s ease-in-out infinite",
                          }}
                        />
                        <div
                          style={{
                            width: "100%",
                            height: "16px",
                            backgroundColor: "#e9ecef",
                            borderRadius: "4px",
                            marginBottom: "8px",
                            animation: "pulse 1.5s ease-in-out infinite",
                          }}
                        />
                        <div
                          style={{
                            width: "70%",
                            height: "16px",
                            backgroundColor: "#e9ecef",
                            borderRadius: "4px",
                            animation: "pulse 1.5s ease-in-out infinite",
                          }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Right Column - Large Image Skeleton */}
                <motion.div
                  className="col-xl-7 col-lg-6 col-md-12 d-none d-md-block"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <div
                    style={{
                      width: "100%",
                      height: "770px",
                      backgroundColor: "#e9ecef",
                      borderRadius: "12px",
                      animation: "pulse 1.5s ease-in-out infinite",
                    }}
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        <style
          dangerouslySetInnerHTML={{
            __html: `
            @keyframes pulse {
              0%, 100% { opacity: 1; }
              50% { opacity: 0.5; }
            }
            
            .skeleton-title, .skeleton-button {
              background: linear-gradient(90deg, #e9ecef 25%, #f8f9fa 50%, #e9ecef 75%);
              background-size: 200% 100%;
              animation: shimmer 2s infinite;
            }
            
            @keyframes shimmer {
              0% { background-position: -200% 0; }
              100% { background-position: 200% 0; }
            }
          `,
          }}
        />
      </div>
    );
  }

  // Check if postData is empty
  if (!postData || postData.length === 0) {
    return <p>No products found</p>;
  }

  const getSnippet = (text = "", length = 50) => {
    const cleanText = text.replace(/<[^>]+>/g, "");
    if (cleanText.length <= length) return cleanText;
    const lastSpace = cleanText.lastIndexOf(" ", length);
    return cleanText.slice(0, lastSpace > 0 ? lastSpace : length) + "...";
  };

  // عرض أول خبر بشكل مميز والباقي كبطاقات
  const firstPost = postData[0];
  const otherPosts = postData.slice(1, 6); // عرض 5 فقط كبطاقات

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: 0.3,
      },
    },
  };

  const imageHoverVariants = {
    hover: {
      scale: 1.02,
      boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
      transition: { duration: 0.4 },
    },
  };

  return (
    <motion.div
      className="axil-post-grid-area axil-section-gap bg-color-white"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
    >
      <div className="container">
        <motion.div
          className="d-flex justify-content-between"
          variants={headerVariants}
        >
          <h2
            className="fw-bold mb-3"
            style={{
              fontSize: "2.5rem",
              color: "#198754",
              fontFamily: "Cairo, sans-serif",
            }}
          >
            {t("sectionTitle")}
          </h2>
          <Link
            href={`/${locale}/products`}
            style={{
              fontSize: "1.5rem",
            }}
          >
            <motion.a
              className="btn btn-outline-success d-flex align-items-center justify-content-center px-4 py-2 fw-bold"
              style={{
                fontFamily: "Cairo, sans-serif",
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 4px 15px rgba(25, 135, 84, 0.3)",
              }}
              transition={{ duration: 0.3 }}
            >
              {locale === "en" ? "View All" : "عرض الكل"}
            </motion.a>
          </Link>
        </motion.div>
        <div className="row">
          <div className="col-lg-12">
            <div className="row mt--40">
              <div className="col-xl-5 col-lg-6 col-md-12 col-12">
                {otherPosts.length > 0 &&
                  otherPosts.map((data, index) => (
                    <motion.div
                      className="content-block post-medium post-medium-border border-thin"
                      key={data.id}
                      variants={cardVariants}
                      custom={index}
                      style={{ marginBottom: "20px" }}
                    >
                      <div className="post-thumbnail">
                        <Link href={`/${locale}/products/${data.id}`}>
                          {data.images && getImageSrc(data.images) ? (
                            <motion.span
                              style={{
                                display: "block",
                                overflow: "hidden",
                                borderRadius: "8px",
                                cursor: "pointer",
                              }}
                              whileHover={{ scale: 1.05 }}
                              transition={{ duration: 0.3 }}
                            >
                              <Image
                                src={getImageSrc(data.images)}
                                alt={
                                  locale === "en"
                                    ? data.title_en || "Product"
                                    : data.title_ar || "المنتج"
                                }
                                height={100}
                                width={100}
                                priority={true}
                              />
                            </motion.span>
                          ) : (
                            <div
                              style={{
                                width: "100px",
                                height: "100px",
                                backgroundColor: "#ccc",
                                borderRadius: "8px",
                              }}
                            />
                          )}
                        </Link>
                      </div>
                      <div className="post-content mr--10">
                        <h4 className="title">
                          <Link href={`/${locale}/products/${data.id}`}>
                            <motion.a
                              className="fw-bold mb-3"
                              style={{
                                fontSize: "2.5rem",
                                color: "#198754",
                                fontFamily: "Cairo, sans-serif",
                                cursor: "pointer",
                              }}
                              whileHover={{ color: "#0d6efd" }}
                              transition={{ duration: 0.3 }}
                            >
                              {locale === "en"
                                ? data.title_en || "Product"
                                : data.title_ar || "المنتج"}
                            </motion.a>
                          </Link>
                        </h4>

                        <div className="content">
                          <p>
                            {getSnippet(
                              locale === "en"
                                ? data.content_en || ""
                                : data.content_ar || ""
                            )}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
              </div>

              <motion.div
                className="col-xl-7 col-lg-6 col-md-12 d-none d-md-block mt_md--40 mt_sm--40"
                variants={imageVariants}
              >
                {firstPost && (
                  <div className="content-block content-block post-grid post-grid-transparent">
                    <div className="post-thumbnail">
                      <Link href={`/${locale}/products`}>
                        <motion.span
                          style={{
                            display: "block",
                            overflow: "hidden",
                            borderRadius: "12px",
                          }}
                          whileHover="hover"
                          variants={imageHoverVariants}
                        >
                          <img
                            src={"/images/staticProduct.jpg"}
                            alt={
                              locale === "en"
                                ? firstPost?.title_en || "Product"
                                : firstPost?.title_ar || "المنتج"
                            }
                            style={{
                              width: "733px",
                              height: "770px",
                              borderRadius: "12px",
                            }}
                          />
                        </motion.span>
                      </Link>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PostSectionTen;
