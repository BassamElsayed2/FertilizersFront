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

const PostSectionTwo = ({ postData, adBanner, headingTitle }) => {
  const locale = useLocale();

  const {
    data: services,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["news"],
    queryFn: getNews,
  });

  // فلترة العناصر بحيث يكون الكاتيجوري = 'service'
  const filteredServices = services?.filter(
    (item) => item.category?.name_en === "Service"
  );

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
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
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
            <h3>{locale === "en" ? "Our Services" : "خدمتنا"}</h3>
            <p
              style={{ width: "700px", textAlign: "center", fontSize: "12px" }}
            >
              {locale === "en"
                ? "We have succeeded in spreading our natural organic invention all over the world where we are helped by countries and governments and institutions and we have won the silver medal in the world invention conference and our factories in the Arab Gulf and Taiwan and Turkey where we are experts and there is no agricultural organization without borders that relies on us the countries"
                : "نجحت شركتنا فى نشر اختراعتنا العضوية الطبيعية فى جميع انحاء العالم حيث تستعين بنادول وحكومات وهيئات ونالت الشركة الميدالية الفضية فى مؤتمر الاختراعات العالمي ومصانعنا فى الخليج العربي وتيوان وتركيا فنحن خبراء فلا منظمة زراعيون بلا حدود تستعين بنا الدول"}
            </p>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <Slider
                {...slideSettings}
                className="modern-post-activation slick-layout-wrapper axil-slick-arrow arrow-between-side"
              >
                {filteredServices?.map((data) => (
                  <div className="slick-single-layout" key={data.id}>
                    <div className="content-block modern-post-style text-center content-block-column">
                      <div className="post-content">
                        <h4 className="title">
                          <Link href={`/${locale}/post/${data.id}`}>
                            <a>
                              {locale === "en" ? data.title_en : data.title_ar}
                            </a>
                          </Link>
                        </h4>
                      </div>
                      {data.images && data.images[0] ? (
                        <div className="post-thumbnail">
                          <div className="round-shape">
                            <Image
                              src="/images/icons/shape-01.webp"
                              alt="Round Shape"
                              height={77}
                              width={390}
                              priority={true}
                            />
                          </div>
                          <Link href={`/${locale}/post/${data.id}`}>
                            <a>
                              <Image
                                src={data.images[0]}
                                alt={
                                  locale === "en"
                                    ? data.title_en
                                    : data.title_ar
                                }
                                height={260}
                                width={390}
                                priority={true}
                              />
                            </a>
                          </Link>
                        </div>
                      ) : (
                        ""
                      )}
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
