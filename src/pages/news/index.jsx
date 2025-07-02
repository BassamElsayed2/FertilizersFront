import React, { useState, useEffect, useMemo } from "react";
import HeaderOne from "../../common/elements/header/HeaderOne";
import HeadTitle from "../../common/elements/head/HeadTitle";
import { useQuery } from "@tanstack/react-query";
import { getNews } from "../../../services/apiNews";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { SortingByDate } from "../../common/utils";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { getAllPosts } from "../../../lib/api";
import FooterThree from "../../common/elements/footer/FooterThree";
import GalleryOne from "../../common/gallery/GalleryOne";
import Loader from "../../common/components/Loader";

export default function NewsPage({ allPosts }) {
  const router = useRouter();
  const { locale, query } = router;

  const [searchTerm, setSearchTerm] = useState(query.search || "");
  const [hoveredCard, setHoveredCard] = useState(null);
  const [currentPage, setCurrentPage] = useState(Number(query.page) || 1);
  const itemsPerPage = 9;

  const {
    data: news = [],
    isPending,
    error,
  } = useQuery({
    queryKey: ["news", locale],
    queryFn: getNews,
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  useEffect(() => {
    const queryParams = new URLSearchParams();
    if (searchTerm) queryParams.set("search", searchTerm);
    if (currentPage > 1) queryParams.set("page", currentPage);

    const newUrl = queryParams.toString()
      ? `${router.pathname}?${queryParams.toString()}`
      : router.pathname;

    router.push(newUrl, undefined, { shallow: true });
  }, [searchTerm, currentPage]);

  const filteredNews = news.filter((item) => {
    const matchesSearch = (locale === "en" ? item.title_en : item.title_ar)
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const isNewsCategory =
      item.category?.name_en?.toLowerCase() === "news" ||
      item.category?.name_ar?.toLowerCase() === "خبر";
    return matchesSearch && isNewsCategory;
  });

  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
  const currentItems = filteredNews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale === "en" ? "en-US" : "ar-EG", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isPending) return <Loader />;
  if (error)
    return (
      <div className="container mt-5 text-center text-danger">
        {locale === "en" ? "Error loading news" : "خطأ في تحميل الأخبار"}
      </div>
    );

  return (
    <div className="news-page main">
      <HeadTitle pageTitle={locale === "en" ? "News" : "الأخبار"} />
      <HeaderOne
        pClass="header-light header-sticky header-with-shadow"
        postData={allPosts}
      />

      <div className="container mt-5 mb-5">
        <div className="row justify-content-center mb-5">
          <div className="col-md-8">
            <div className="search-box position-relative">
              <input
                type="text"
                className="form-control form-control-lg ps-5"
                placeholder={
                  locale === "en" ? "Search news..." : "ابحث عن الأخبار..."
                }
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span className="search-icon position-absolute top-50 start-0 translate-middle-y ms-3 text-muted">
                <i className="fas fa-search"></i>
              </span>
            </div>
          </div>
        </div>
        <div className="row g-4">
          {currentItems.map((item) => (
            <div key={item.id} className="col-md-4">
              <div
                className={`news-card card h-100 ${
                  hoveredCard === item.id ? "card-hover" : ""
                }`}
                onMouseEnter={() => setHoveredCard(item.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {item.images?.[0] && (
                  <div className="card-img-wrapper">
                    <Image
                      src={item.images[0]}
                      alt={locale === "en" ? item.title_en : item.title_ar}
                      layout="fill"
                      objectFit="cover"
                    />
                    <span
                      className="badge bg-success  category-badge"
                      style={{ fontFamily: "cairo" }}
                    >
                      {locale === "en"
                        ? item.category?.name_en
                        : item.category?.name_ar}
                    </span>
                  </div>
                )}
                <div className="card-body">
                  <h5 className="card-title" style={{ fontFamily: "cairo" }}>
                    <Link
                      href={`/${locale}/post/${item.id}`}
                      scroll={false}
                      className="text-decoration-none"
                    >
                      {locale === "en" ? item.title_en : item.title_ar}
                    </Link>
                  </h5>
                  <p className="card-text text-muted">
                    <i className="far fa-calendar-alt me-2 ms-2"></i>
                    {formatDate(item.created_at)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        {totalPages > 1 && (
          <nav className="mt-4">
            <ul className="pagination justify-content-center">
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  {locale === "en" ? "Previous" : "السابق"}
                </button>
              </li>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (num) => (
                  <li
                    key={num}
                    className={`page-item ${
                      currentPage === num ? "active" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(num)}
                    >
                      {num}
                    </button>
                  </li>
                )
              )}
              <li
                className={`page-item ${
                  currentPage === totalPages ? "disabled" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  {locale === "en" ? "Next" : "التالي"}
                </button>
              </li>
            </ul>
          </nav>
        )}
        {filteredNews.length === 0 && (
          <div className="text-center mt-5 py-5">
            <i className="fas fa-newspaper fa-3x text-muted mb-3"></i>
            <h3 className="text-muted">
              {locale === "en" ? "No news found" : "لم يتم العثور على أخبار"}
            </h3>
          </div>
        )}
      </div>

      <GalleryOne />
      <FooterThree />

      <style>{`
        .news-page {
          background-color: #f8f9fa;
          min-height: 100vh;
        }
        .search-box {
          position: relative;
        }
        .search-box input {
          border-radius: 12px;
          border: 2px solid #e9ecef;
          transition: all 0.3s ease;
          font-size: 1.2rem;
          height: 52px;
          background-color: #fff;
          padding-left: 2.5rem;
        }
        .search-box input:focus {
          border-color: #0d6efd;
          box-shadow: 0 0 0 0.1rem rgba(13, 110, 253, 0.08);
          background-color: #f8f9fa;
        }
        .search-icon {
          left: 0.75rem;
          font-size: 1.2rem;
          pointer-events: none;
        }
        .news-card {
          border: none;
          border-radius: 15px;
          overflow: hidden;
          transition: all 0.3s ease;
          box-shadow: 0 2px 15px rgba(0, 0, 0, 0.08);
          position: relative;
          background: #fff;
        }
        .news-card.card-hover {
          transform: translateY(-5px) scale(1.01);
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.13);
        }
        .card-img-wrapper {
          position: relative;
          height: 200px;
          overflow: hidden;
        }
        .category-badge {
          position: absolute;
          top: 15px;
          right: 15px;
          z-index: 1;
          font-size: 0.95rem;
          padding: 0.5em 1em;
        }
        .card-title {
          font-size: 1.1rem;
          line-height: 1.4;
          margin-bottom: 1rem;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .card-text {
          font-size: 0.95rem;
        }
        .pagination {
          gap: 0.5rem;
        }
        .page-link {
          border-radius: 8px;
          border: 2px solid #e9ecef;
          color: #0d6efd;
          padding: 0.5rem 1rem;
          transition: all 0.3s ease;
        }
        .page-link:hover {
          background-color: #e9ecef;
          border-color: #0d6efd;
        }
        .page-item.active .page-link {
          background-color: #0d6efd;
          border-color: #0d6efd;
          color: white;
        }
        .page-item.disabled .page-link {
          color: #6c757d;
          pointer-events: none;
          background-color: #f8f9fa;
          border-color: #e9ecef;
        }
        @media (max-width: 768px) {
          .search-box input {
            font-size: 1rem;
            height: 45px;
          }
          .card-img-wrapper {
            height: 150px;
          }
        }
      `}</style>
    </div>
  );
}
export async function getStaticProps({ locale }) {
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
  return {
    props: {
      allPosts,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
