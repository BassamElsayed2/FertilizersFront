import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import { SectionTitleOne } from "../../elements/sectionTitle/SectionTitle";
import AddBanner from "../ad-banner/AddBanner";
import Slider from "react-slick";
import { slugify } from "../../utils";
import { useLocale } from "next-intl";
import { useQuery } from "@tanstack/react-query";
import { getNews } from "../../../../services/apiNews";

const PostSectionTwo = ({ postData, adBanner, headingTitle, services }) => {
  const locale = useLocale();

  const handleChange = (e) => {
    let filterText = slugify(e.target.textContent);
    setActiveNav(filterText);

    let tempData = [];

    for (let i = 0; i < postData.length; i++) {
      const element = postData[i];
      let categories = element["cate"];

      if (slugify(categories).includes(filterText)) {
        tempData.push(element);
      }
    }

    setTabPostData(tempData);
  };

  function SlickNextArrow(props) {
    const { className, onClick } = props;
    return (
      <button
        className={`slide-arrow next-arrow ${className}`}
        onClick={onClick}
      >
        <i className="fal fa-arrow-right"></i>
      </button>
    );
  }

  function SlickPrevArrow(props) {
    const { className, onClick } = props;
    return (
      <button
        className={`slide-arrow prev-arrow ${className}`}
        onClick={onClick}
      >
        <i className="fal fa-arrow-left"></i>
      </button>
    );
  }

  const slideSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <SlickNextArrow />,
    prevArrow: <SlickPrevArrow />,
    arrows: true,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          arrows: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          arrows: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          arrows: true,
        },
      },
    ],
  };

  return (
    <div className="axil-tab-area axil-section-gap bg-color-white">
      <div className="wrapper">
        <div className="container">
          {adBanner === true ? (
            <div className="row">
              <div className="col-lg-12">
                <AddBanner
                  img="/images/add-banner/banner-03.webp"
                  pClass="mb--30"
                />
              </div>
            </div>
          ) : (
            ""
          )}

          <div className="d-flex justify-content-center align-items-center flex-column mb--10">
            <h2
              className="fw-bold mb-3"
              style={{
                fontSize: "2.5rem",
                color: "#198754",
                fontFamily: "Cairo, sans-serif",
              }}
            >
              {headingTitle == "services"
                ? locale === "en"
                  ? "Our Services"
                  : "خدمتنا"
                : locale === "en"
                ? "Our News"
                : "اخر الاخبار"}
            </h2>
            <p
              style={{
                maxWidth: "800px",
                fontSize: "1.25rem",
                color: "#6c757d",
                lineHeight: "2",
                fontFamily: "Cairo, sans-serif",
                textAlign: "center",
                marginBottom: "20px",
              }}
            >
              {headingTitle == "services"
                ? locale === "en"
                  ? "We have succeeded in spreading our natural organic invention all over the world where we are helped by countries and governments and institutions and we have won the silver medal in the world invention conference and our factories in the Arab Gulf and Taiwan and Turkey where we are experts and there is no agricultural organization without borders that relies on us the countries"
                  : "نجحت شركتنا فى نشر اختراعتنا العضوية الطبيعية فى جميع انحاء العالم حيث تستعين بنادول وحكومات وهيئات ونالت الشركة الميدالية الفضية فى مؤتمر الاختراعات العالمي ومصانعنا فى الخليج العربي وتيوان وتركيا فنحن خبراء فلا منظمة زراعيون بلا حدود تستعين بنا الدول"
                : locale === "en"
                ? "We publish news about the company within the framework of the company's commitment to providing comprehensive agricultural solutions that support farmers and contribute to increasing agricultural productivity in a sustainable manner"
                : "نقوم بنشر اخبار الشركة في إطار التزام الشركة بتوفير حلول زراعية متكاملة تدعم المزارعين وتساهم في زيادة الإنتاجية الزراعية بشكل مستدام"}
            </p>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <Slider
                {...slideSettings}
                className="modern-post-activation slick-layout-wrapper axil-slick-arrow arrow-between-side"
              >
                {services?.map((data) => (
                  <div className="slick-single-layout" key={data.id}>
                    <div
                      className="content-block modern-post-style text-center content-block-column"
                      style={{
                        background: "#fff",
                        borderRadius: "12px",
                        boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                        padding: "0",
                        margin: "10px",
                        transition: "transform 0.3s ease, box-shadow 0.3s ease",
                        border: "1px solid #f0f0f0",
                        overflow: "hidden",
                        height: "400px",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      {data.images && data.images[0] ? (
                        <div
                          className="post-thumbnail"
                          style={{ marginBottom: "15px", flexShrink: 0 }}
                        >
                          <Link href={`/${locale}/post/${data.id}`}>
                            <a style={{ display: "block" }}>
                              <Image
                                src={data.images[0]}
                                alt={
                                  locale === "en"
                                    ? data.title_en
                                    : data.title_ar
                                }
                                height={200}
                                width={300}
                                priority={true}
                                style={{
                                  borderRadius: "15px",
                                  objectFit: "cover",
                                  width: "100%",
                                  height: "200px",
                                }}
                              />
                            </a>
                          </Link>
                        </div>
                      ) : (
                        ""
                      )}

                      <div
                        className="post-content"
                        style={{
                          flex: 1,
                          display: "flex",
                          padding: "15px",
                          flexDirection: "column",
                          justifyContent: "space-between",
                        }}
                      >
                        <div>
                          {/* Title */}
                          <h4
                            className="title"
                            style={{
                              fontSize: "1.6rem",
                              fontWeight: "600",
                              marginBottom: "10px",
                              color: "#333",
                              lineHeight: "1.4",
                              fontFamily: "Cairo, sans-serif",
                            }}
                          >
                            <Link href={`/${locale}/post/${data.id}`}>
                              <a
                                style={{
                                  color: "inherit",
                                  textDecoration: "none",
                                  transition: "color 0.3s ease",
                                }}
                              >
                                {locale === "en"
                                  ? data.title_en
                                  : data.title_ar}
                              </a>
                            </Link>
                          </h4>
                          <p
                            style={{
                              fontSize: "1.2rem",
                              color: "#666",
                              lineHeight: "1.4",
                              margin: "0",
                              textAlign: "center",
                              height: "5.04rem",
                              overflow: "hidden",
                              display: "-webkit-box",
                              WebkitLineClamp: 3,
                              WebkitBoxOrient: "vertical",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {locale === "en"
                              ? data.content_en?.length > 150
                                ? `${data.content_en.substring(0, 150)}...`
                                : data.content_en
                              : data.content_ar?.length > 150
                              ? `${data.content_ar.substring(0, 150)}...`
                              : data.content_ar}
                          </p>
                        </div>

                        <button
                          className="btn btn-success mt--10"
                          style={{
                            backgroundColor: "#198754",
                            border: "none",
                            borderRadius: "8px",
                            padding: "10px 20px",
                            fontSize: "11px",
                            fontWeight: "500",
                            color: "white",
                            transition: "all 0.3s ease",
                            marginTop: "15px",
                            fontFamily: "Cairo, sans-serif",
                            cursor: "pointer",
                            alignSelf: "center",
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.backgroundColor = "#157347";
                            e.target.style.transform = "translateY(-2px)";
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.backgroundColor = "#198754";
                            e.target.style.transform = "translateY(0)";
                          }}
                        >
                          {locale === "en" ? "Read More" : "المزيد"}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostSectionTwo;
