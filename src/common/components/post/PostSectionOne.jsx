import React, { useRef } from "react";
import { SectionTitleOne } from "../../elements/sectionTitle/SectionTitle";
import { HoverActiveClass } from "../../utils";
import PostLayoutOne from "./layout/PostLayoutOne";
import { useLocale } from "next-intl";
import FertilizerBenefits from "./FertilizerBenefits";

const PostSectionOne = ({ postData }) => {
  const locale = useLocale();

  const hoverRef = useRef("");
  HoverActiveClass(hoverRef);

  return (
    <div className="axil-featured-post axil-section-gap bg-color-grey">
      <div className="container">
        {/* <SectionTitleOne title="More Featured Posts." /> */}
        <div className="d-flex justify-content-center align-items-center flex-column">
          <h1>
            {locale === "en"
              ? "Importance of fertilizers and fertilizers"
              : "اهمية الاسمدة والمخصبات"}
          </h1>
          <p style={{
            maxWidth: "800px",textAlign: "center",fontSize: "1.25rem",color: "#6c757d",lineHeight: "2",marginBottom: "2.5rem"
          }}>
            {locale === "en"
              ? "Fertilizers and fertilizers play a vital role in promoting plant growth and increasing the production of agricultural crops by providing them with the essential nutrients they need. They also contribute to improving soil fertility and achieving a nutritional balance for plants, which enhances the quality of crops and increases the efficiency of agricultural production"
              : "الأسمدة والمخصبات تلعب دورًا حيويًا في تعزيز نمو النباتات وزيادة إنتاج المحاصيل الزراعية من خلال تزويدها بالعناصر الغذائية الأساسية التي تحتاجها. كما تسهم في تحسين خصوبة التربة وتحقيق توازن غذائي للنباتات، مما يعزز من جودة المحاصيل ويزيد من كفاءة الإنتاج الزراعي"}
          </p>
        </div>
        <div className="row" ref={hoverRef}>
          <FertilizerBenefits />
          {/* <PostLayoutOne postData={postData} itemShow="4" /> */}
        </div>
      </div>
    </div>
  );
};

export default PostSectionOne;
