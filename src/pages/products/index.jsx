import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { getProducts } from "../../../services/apiProduct";
import HeaderOne from "../../common/elements/header/HeaderOne";
import FooterThree from "../../common/elements/footer/FooterThree";
import PostMetaOne from "../../common/components/post/format/element/PostMetaOne";
import Image from "next/image";
import Link from "next/link";

const ProductsPage = ({ allPosts, initialData }) => {
  const { locale } = useRouter();

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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Check if products exists
  if (!products || products.length === 0) {
    return <div>No products found</div>;
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

              <div className="row g-4">
                {products &&
                  products.length > 0 &&
                  products.map((product) => (
                    <div key={product.id} className="col-lg-4 col-md-6 col-12">
                      <div className="content-block post-medium post-medium-border border-thin h-100">
                        <div className="post-thumbnail">
                          <Link href={`/${locale}/products/${product.id}`}>
                            {product.images && getImageSrc(product.images) ? (
                              <span>
                                <Image
                                  src={getImageSrc(product.images)}
                                  alt={
                                    locale === "en"
                                      ? product.title_en || "Product"
                                      : product.title_ar || "المنتج"
                                  }
                                  height={250}
                                  width={350}
                                  priority={true}
                                  style={{ objectFit: "cover" }}
                                />
                              </span>
                            ) : (
                              <div
                                style={{
                                  width: "100%",
                                  height: "250px",
                                  backgroundColor: "#ccc",
                                }}
                              />
                            )}
                          </Link>
                        </div>
                        <div className="post-content p-3">
                          <h4 className="title">
                            <Link
                              href={`/${locale}/products/${product.id}`}
                              className="fw-bold"
                              style={{
                                fontSize: "1.5rem",
                                color: "#198754",
                                fontFamily: "Cairo, sans-serif",
                              }}
                            >
                              {locale === "en"
                                ? product.title_en || "Product"
                                : product.title_ar || "المنتج"}
                            </Link>
                          </h4>

                          <div className="content">
                            <p>
                              {getSnippet(
                                locale === "en"
                                  ? product.content_en || ""
                                  : product.content_ar || ""
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
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
