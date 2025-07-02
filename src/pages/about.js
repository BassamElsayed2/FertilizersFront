import BreadcrumbTwo from "../common/elements/breadcrumb/breadcrumbTwo";
import FooterThree from "../common/elements/footer/FooterThree";
import HeaderOne from "../common/elements/header/HeaderOne";
import { getAllPosts } from "../../lib/api";

import HeadTitle from "../common/elements/head/HeadTitle";
import GalleryOne from "../common/gallery/GalleryOne";
import { getAboutUs } from "../../services/apiAboutUs";
import { useQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";
import Image from "next/image";
import { useState } from "react";
import WidgetPostList from "../common/components/sidebar/WidgetPostList";
import ContactUs from "../common/components/sidebar/ContactUs";

const AboutUs = ({ allPosts }) => {
  const locale = useLocale();

  const { data: aboutUs } = useQuery({
    queryKey: ["site_settings"],
    queryFn: getAboutUs,
  });

  return (
    <>
      <HeadTitle pageTitle={locale === "ar" ? "من نحن" : "About Us"} />
      <HeaderOne postData={allPosts} />
      <BreadcrumbTwo
        title={
          locale === "ar"
            ? "نؤمن بالعودة الى الطبيعة الأم"
            : "We believe in returning to Mother Nature "
        }
        paragraph={
          locale === "ar"
            ? "وبالمحافظة على مواردها من أجل أجيالنا القادمة، وذلك من خلال تعميم تجربة نجاحنا في دول ذات باعٍ كبير في مجال الزراعة العضوية، وذلك باستخدام أحدث الطرق لتصنيع الأسمدة العضوية المبتكرة في السوق المصري والتي تتلاءم مع جميع المراحل الزراعية"
            : "And preserving its resources for our future generations, by generalizing our success in countries with a long history of organic farming, using the latest methods to manufacture innovative organic fertilizers in the Egyptian market that are suitable for all agricultural stages"
        }
        bgImae="url('/images/nav.jpg')"
      />

      <div className="axil-post-list-area axil-section-gap bg-color-white">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-xl-8">
              {/* Start About Area  */}
              <div className="axil-about-us">
                <div className="inner">
                  <div
                    dangerouslySetInnerHTML={{
                      __html:
                        locale === "ar"
                          ? aboutUs?.about_us_ar
                          : aboutUs?.about_us_en,
                    }}
                  />
                </div>
              </div>
              {/* End About Area  */}
            </div>
            <div className="col-lg-4 col-xl-4 mt_md--40 mt_sm--40">
              <div className="sidebar-inner">
                <ContactUs />
              </div>
            </div>
          </div>
        </div>
      </div>

      <GalleryOne parentClass="bg-color-grey" />
      <FooterThree />
    </>
  );
};

export default AboutUs;

export async function getStaticProps() {
  const allPosts = getAllPosts([
    "id",
    "title",
    "featureImg",
    "featured",
    "date",
    "slug",
    "cate",
    "cate_img",
    "author_img",
    "author_name",
    "post_views",
  ]);

  return {
    props: { allPosts },
  };
}
