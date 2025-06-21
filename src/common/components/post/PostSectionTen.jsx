import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import Image from "next/image";

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

  if (isLoading) return <p>loading...</p>;

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

  return (
    <div className="axil-post-grid-area axil-section-gap bg-color-white">
      <div className="container">
        {/* <SectionTitleOne title={t("sectionTitle")} /> */}
        <div className="d-flex justify-content-between">
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
            className="btn btn-outline-dark d-flex align-items-center justify-content-center px-4 py-2 fw-bold"
            style={{
              fontSize: "1.5rem",
            }}
          >
            {locale === "en" ? "View All" : "عرض الكل"}
          </Link>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="row mt--40">
              <div className="col-xl-5 col-lg-6 col-md-12 col-12">
                {otherPosts.length > 0 &&
                  otherPosts.map((data) => (
                    <div
                      className="content-block post-medium post-medium-border border-thin"
                      key={data.id}
                    >
                      <div className="post-thumbnail">
                        <Link href={`/${locale}/products/${data.id}`}>
                          {data.images && getImageSrc(data.images) ? (
                            <span>
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
                            </span>
                          ) : (
                            <div
                              style={{
                                width: "100px",
                                height: "100px",
                                backgroundColor: "#ccc",
                              }}
                            />
                          )}
                        </Link>
                      </div>
                      <div className="post-content mr--10">
                        <h4 className="title">
                          <Link
                            href={`/${locale}/products/${data.id}`}
                            className="fw-bold mb-3"
                            style={{
                              fontSize: "2.5rem",
                              color: "#198754",
                              fontFamily: "Cairo, sans-serif",
                            }}
                          >
                            {locale === "en"
                              ? data.title_en || "Product"
                              : data.title_ar || "المنتج"}
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
                    </div>
                  ))}
              </div>

              <div className="col-xl-7 col-lg-6 col-md-12 col-12 mt_md--40 mt_sm--40">
                {firstPost && (
                  <div className="content-block content-block post-grid post-grid-transparent">
                    {firstPost?.images && getImageSrc(firstPost.images) && (
                      <div className="post-thumbnail">
                        <Link href={`/${locale}/products/${firstPost?.id}`}>
                          <span>
                            <Image
                              src={getImageSrc(firstPost.images)}
                              alt={
                                locale === "en"
                                  ? firstPost?.title_en || "Product"
                                  : firstPost?.title_ar || "المنتج"
                              }
                              height={660}
                              width={705}
                              priority={true}
                            />
                          </span>
                        </Link>
                      </div>
                    )}
                    <div className="post-grid-content">
                      <div className="post-content">
                        <h3 className="title">
                          <Link
                            href={`/${locale}/products/${firstPost?.id}`}
                            className="fw-bold mb-3"
                            style={{
                              fontSize: "2.5rem",
                              color: "#000",
                              fontFamily: "Cairo, sans-serif",
                            }}
                          >
                            {locale === "en"
                              ? firstPost?.title_en || "Product"
                              : firstPost?.title_ar || "المنتج"}
                          </Link>
                        </h3>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostSectionTen;
