import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { getProducts } from "../../../services/apiProduct";
import HeaderOne from "../../common/elements/header/HeaderOne";
import FooterThree from "../../common/elements/footer/FooterThree";
import PostMetaOne from "../../common/components/post/format/element/PostMetaOne";
import Image from "next/image";
import Link from "next/link";
import { useState, useMemo } from "react";

const ProductsPage = ({ allPosts, initialData }) => {
  const { locale } = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const { data: products = initialData, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    initialData,
  });

  const getImageSrc = (img) => {
    if (Array.isArray(img)) return img[0] || "";
    if (typeof img === "string") return img;
    return "";
  };

  const getSnippet = (text = "", length = 100) => {
    const cleanText = text.replace(/<[^>]+>/g, "");
    if (cleanText.length <= length) return cleanText;
    const lastSpace = cleanText.lastIndexOf(" ", length);
    return cleanText.slice(0, lastSpace > 0 ? lastSpace : length) + "...";
  };

  // Filter products based on search term
  const filteredProducts = useMemo(() => {
    if (!products || !searchTerm.trim()) return products;

    return products.filter((product) => {
      const titleEn = (product.title_en || "").toLowerCase();
      const titleAr = (product.title_ar || "").toLowerCase();
      const contentEn = (product.content_en || "").toLowerCase();
      const contentAr = (product.content_ar || "").toLowerCase();
      const search = searchTerm.toLowerCase();

      return (
        titleEn.includes(search) ||
        titleAr.includes(search) ||
        contentEn.includes(search) ||
        contentAr.includes(search)
      );
    });
  }, [products, searchTerm]);

  if (isLoading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "50vh" }}
      >
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // Check if products exists
  if (!products || products.length === 0) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "50vh" }}
      >
        <div className="text-center">
          <h3 className="text-muted">
            {locale === "en" ? "No products found" : "لم يتم العثور على منتجات"}
          </h3>
        </div>
      </div>
    );
  }

  return (
    <>
      <HeaderOne
        pClass="header-light header-sticky header-with-shadow"
        postData={allPosts}
      />

      <PostMetaOne
        metaData={{
          title: locale === "en" ? "Products" : "المنتجات",
          description: locale === "en" ? "All our products" : "جميع منتجاتنا",
        }}
      />

      <div className="axil-post-grid-area axil-section-gap bg-color-white">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h1
                className="text-center mb-5"
                style={{
                  fontSize: "3rem",
                  color: "#198754",
                  fontFamily: "Cairo, sans-serif",
                  fontWeight: "bold",
                }}
              >
                {locale === "en" ? "Our Products" : "منتجاتنا"}
              </h1>

              {/* Search Bar */}
              <div className="row justify-content-center mb-5">
                <div className="col-lg-6 col-md-8 col-12">
                  <div className="position-relative">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder={
                        locale === "en"
                          ? "Search products..."
                          : "البحث في المنتجات..."
                      }
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      style={{
                        borderRadius: "50px",
                        border: "2px solid #e9ecef",
                        padding: "15px 20px",
                        fontSize: "1.1rem",
                        fontFamily: "Cairo, sans-serif",
                        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                      }}
                    />
                    <div className="position-absolute top-50 end-0 translate-middle-y pe-3">
                      <i className="fas fa-search text-muted"></i>
                    </div>
                  </div>
                </div>
              </div>

              {/* Results Count */}
              {searchTerm && (
                <div className="text-center mb-4">
                  <p className="text-muted">
                    {locale === "en"
                      ? `Found ${filteredProducts.length} product${
                          filteredProducts.length !== 1 ? "s" : ""
                        }`
                      : `تم العثور على ${filteredProducts.length} منتج${
                          filteredProducts.length !== 1 ? "ات" : ""
                        }`}
                  </p>
                </div>
              )}

              <div className="row g-4">
                {filteredProducts &&
                  filteredProducts.length > 0 &&
                  filteredProducts.map((product) => (
                    <div key={product.id} className="col-lg-4 col-md-6 col-12">
                      <div
                        className="product-card h-100"
                        style={{
                          borderRadius: "15px",
                          overflow: "hidden",
                          boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
                          transition: "all 0.3s ease",
                          border: "1px solid #e9ecef",
                          backgroundColor: "#fff",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "translateY(-5px)";
                          e.currentTarget.style.boxShadow =
                            "0 10px 30px rgba(0,0,0,0.15)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "translateY(0)";
                          e.currentTarget.style.boxShadow =
                            "0 5px 20px rgba(0,0,0,0.1)";
                        }}
                      >
                        {/* Product Image */}
                        <div
                          className="product-image-container"
                          style={{ position: "relative", height: "250px" }}
                        >
                          <Link href={`/${locale}/products/${product.id}`}>
                            {product.images && getImageSrc(product.images) ? (
                              <Image
                                src={getImageSrc(product.images)}
                                alt={
                                  locale === "en"
                                    ? product.title_en || "Product"
                                    : product.title_ar || "المنتج"
                                }
                                fill
                                layout="fill"
                                priority={true}
                                style={{
                                  objectFit: "cover",
                                  borderRadius: "15px 15px 0 0",
                                }}
                              />
                            ) : (
                              <div
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  backgroundColor: "#f8f9fa",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  borderRadius: "15px 15px 0 0",
                                }}
                              >
                                <i
                                  className="fas fa-image text-muted"
                                  style={{ fontSize: "3rem" }}
                                ></i>
                              </div>
                            )}
                          </Link>
                        </div>

                        {/* Product Content */}
                        <div className="product-content p-4">
                          <h4 className="product-title mb-3">
                            <Link
                              href={`/${locale}/products/${product.id}`}
                              style={{
                                fontSize: "1.3rem",
                                color: "#198754",
                                fontFamily: "Cairo, sans-serif",
                                fontWeight: "600",
                                textDecoration: "none",
                                lineHeight: "1.4",
                                display: "-webkit-box",
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                              }}
                            >
                              {locale === "en"
                                ? product.title_en || "Product"
                                : product.title_ar || "المنتج"}
                            </Link>
                          </h4>

                          <div className="product-description">
                            <p
                              style={{
                                color: "#6c757d",
                                fontSize: "0.95rem",
                                lineHeight: "1.6",
                                fontFamily: "Cairo, sans-serif",
                                margin: 0,
                                display: "-webkit-box",
                                WebkitLineClamp: 3,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                              }}
                            >
                              {getSnippet(
                                locale === "en"
                                  ? product.content_en || ""
                                  : product.content_ar || "",
                                120
                              )}
                            </p>
                          </div>

                          {/* Read More Button */}
                          <div className="mt-3">
                            <Link
                              href={`/${locale}/products/${product.id}`}
                              className="btn btn-outline-success"
                              style={{
                                borderRadius: "25px",
                                padding: "8px 20px",
                                fontSize: "0.9rem",
                                fontFamily: "Cairo, sans-serif",
                                fontWeight: "500",
                                borderWidth: "2px",
                                transition: "all 0.3s ease",
                              }}
                            >
                              {locale === "en" ? "Read More" : "اقرأ المزيد"}
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>

              {/* No Results Message */}
              {searchTerm && filteredProducts.length === 0 && (
                <div className="text-center mt-5">
                  <div className="py-5">
                    <i
                      className="fas fa-search text-muted mb-3"
                      style={{ fontSize: "3rem" }}
                    ></i>
                    <h4 className="text-muted">
                      {locale === "en"
                        ? "No products found"
                        : "لم يتم العثور على منتجات"}
                    </h4>
                    <p className="text-muted">
                      {locale === "en"
                        ? "Try adjusting your search terms"
                        : "جرب تعديل مصطلحات البحث"}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <FooterThree />
    </>
  );
};

export default ProductsPage;

export async function getStaticProps({ locale }) {
  try {
    const { getAllPosts } = await import("../../../lib/api");
    const { SortingByDate } = await import("../../common/utils");

    const allPosts = getAllPosts([
      "postFormat",
      "title",
      "featureImg",
      "featured",
      "date",
      "slug",
      "pCate",
      "cate",
      "cate_img",
      "author_img",
      "author_name",
      "post_views",
      "read_time",
      "author_social",
    ]);

    SortingByDate(allPosts);

    // Get all products for initial data
    const initialData = await getProducts();

    return {
      props: {
        allPosts,
        initialData: initialData || [],
        ...(await serverSideTranslations(locale, ["common"])),
      },
      revalidate: 60, // Revalidate every 60 seconds
    };
  } catch (error) {
    console.error("Error in getStaticProps:", error);
    return {
      props: {
        allPosts: [],
        initialData: [],
        ...(await serverSideTranslations(locale, ["common"])),
      },
    };
  }
}
