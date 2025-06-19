import { useTranslation } from 'next-i18next';
import FertilizerBenefits from './FertilizerBenefits';
import React, { useRef } from "react";
import { SectionTitleOne } from "../../elements/sectionTitle/SectionTitle";
import { HoverActiveClass } from "../../utils";
import PostLayoutOne from "./layout/PostLayoutOne";
const PostSectionOne = ({ postData }) => {
  const { t } = useTranslation('common');
  const hoverRef = useRef("");
  HoverActiveClass(hoverRef);

  return (
    <div className="axil-section-gap bg-color-white">
      <div className="container">

          {/* <SectionTitleOne title="More Featured Posts." /> */}
        <div className="d-flex justify-content-center align-items-center flex-column text-center mb-5">
          <h2 className="fw-bold mb-3" style={{ fontSize: '2.5rem', color: '#198754', fontFamily: 'Cairo, sans-serif' }}>
            {t('fertilizerSection.title')}
          </h2>
          <p
            style={{
              maxWidth: '800px',
              fontSize: '1.25rem',
              color: '#6c757d',
              lineHeight: '2',
              fontFamily: 'Cairo, sans-serif'
            }}
          >
            {t('fertilizerSection.description')}

          </p>
        </div>
        <FertilizerBenefits />
        <div className="row" ref={hoverRef}>
          {/* <PostLayoutOne postData={postData} itemShow="4" /> */}
        </div>
      </div>
    </div>
  );
};

export default PostSectionOne;
