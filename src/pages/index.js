import FooterThree from "../common/elements/footer/FooterThree";
import { getAllPosts } from "../../lib/api";

import HeadTitle from "../common/elements/head/HeadTitle";
import { SortingByDate } from "../common/utils";

import PostSectionTen from "../common/components/post/PostSectionTen";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useQuery } from "@tanstack/react-query";
import { getNews } from "../../services/apiNews";
import GalleryOne from "../common/gallery/GalleryOne";
import SliderOne from "../common/components/slider/SliderOne";
import HeaderOne from "../common/elements/header/HeaderOne";
import PostSectionOne from "../common/components/post/PostSectionOne";
import PostSectionTwo from "../common/components/post/PostSectionTwo";
import SliderTwo from "../common/components/slider/SliderTwo";
import SliderThree from "../common/components/slider/SliderThree";

const TechBlog = ({ allPosts }) => {
  const {
    data: services,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["news"],
    queryFn: getNews,
  });
  const filteredServices = services?.filter(
    (item) => item.category?.name_en === "Service"
  );
  const filteredNews = services?.filter(
    (item) => item.category?.name_en === "news"
  );

  return (
    <>
      <HeadTitle />
      <HeaderOne />
      <SliderThree />
      <PostSectionOne postData={allPosts} />
      <PostSectionTwo
        postData={allPosts}
        services={filteredServices}
        headingTitle="services"
      />
      <PostSectionTen postData={allPosts} />
      <PostSectionTwo
        postData={allPosts}
        services={filteredNews}
        headingTitle="news"
      />

      <GalleryOne parentClass="bg-color-grey" />
      <FooterThree />
    </>
  );
};

export default TechBlog;

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
    props: { allPosts, ...(await serverSideTranslations(locale, ["common"])) },
  };
}
