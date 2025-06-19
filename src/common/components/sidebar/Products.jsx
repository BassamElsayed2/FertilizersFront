"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import Image from "next/image";
import { getNews } from "../../../../services/apiNews";
import { SectionTitleOne } from "../../elements/sectionTitle/SectionTitle";
import { useTranslation } from "react-i18next";

const Products = () => {
  const {
    data: postData = [],
    isLoading,
  } = useQuery({
    queryKey: ["news"],
    queryFn: getNews,
  });

  const locale = useLocale();
  const { t } = useTranslation("common");

  if (isLoading) return <p>Loading...</p>;

  const firstPost = postData[0];

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

  return (
    <div className="axil-post-grid-area axil-section-gap bg-color-white">
      <div className="container">
      <SectionTitleOne
  title={t("sectionTitle")}
  className="products-section-title"
/>

        <div className="row mt--40">
          <div className="col-xl-5 col-lg-6 col-md-12 col-12">
            {postData.slice(1, 6).map((data) => (
              <div className="content-block post-medium post-medium-border border-thin mb--30" key={data.id}>
                <div className="post-thumbnail">
                  <Link href={`/${locale}/post/${data.id}`}>
                    <a>
                      {getImageSrc(data.images) ? (
                        <Image
                          src={getImageSrc(data.images)}
                          alt={locale === "en" ? data.title_en : data.title_ar}
                          height={100}
                          width={100}
                          priority
                          className="rounded"
                        />
                      ) : (
                        <div
                          style={{ width: "100px", height: "100px", backgroundColor: "#ccc", borderRadius: "8px" }}
                        />
                      )}
                    </a>
                  </Link>
                </div>
                <div className="post-content mr--10">
                  <h4 className="title">
                    <Link href={`/${locale}/post/${data.id}`}>
                      <a>{locale === "en" ? data.title_en : data.title_ar}</a>
                    </Link>
                  </h4>
                  <div className="content">
                    <p>{getSnippet(locale === "en" ? data.content_en : data.content_ar)}</p>
                    <Link href={`/${locale}/post/${data.id}`}>
                      <a className="hover-flip-item-wrapper mt--5 d-inline-block">
                        <span className="hover-flip-item">
                          <span data-text={locale === "ar" ? "اقرأ المزيد" : "Read more"}>
                            {locale === "ar" ? "اقرأ المزيد" : "Read more"}
                          </span>
                        </span>
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="col-xl-7 col-lg-6 col-md-12 col-12 mt_md--40 mt_sm--40">
            <div className="content-block post-grid post-grid-transparent">
              {getImageSrc(firstPost?.images) && (
                <div className="post-thumbnail">
                  <Link href={`/${locale}/post/${firstPost?.id}`}>
                    <a>
                      <Image
                        src={getImageSrc(firstPost?.images)}
                        alt={locale === "en" ? firstPost?.title_en : firstPost?.title_ar}
                        height={660}
                        width={705}
                        priority
                        className="rounded w-100"
                      />
                    </a>
                  </Link>
                </div>
              )}
              <div className="post-grid-content">
                <div className="post-content">   
                 
                  
                  <h3 className="title">
                    <Link href={`/${locale}/post/${firstPost?.id}`}>
                      <a>{locale === "en" ? firstPost?.title_en : firstPost?.title_ar}</a>
                    </Link>
                  </h3>
                  <div className="content">
                    <p>{getSnippet(locale === "en" ? firstPost?.content_en : firstPost?.content_ar, 160)}</p>
                    <Link href={`/${locale}/post/${firstPost?.id}`}>
                      <a className="hover-flip-item-wrapper d-inline-block text-primary font-medium">
                        <span className="hover-flip-item">
                          <span data-text={locale === "ar" ? "اقرأ المزيد" : "Read more"}>
                            {locale === "ar" ? "اقرأ المزيد" : "Read more"}
                          </span>
                        </span>
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
