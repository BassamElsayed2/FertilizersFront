import Image from "next/image";
import InstaData from "../../data/instagram/instagram.json";
import { useLocale } from "next-intl";
import { getGalleries } from "../../../services/apiGalleries";
import { useQuery } from "@tanstack/react-query";

const GalleryOne = ({ parentClass }) => {
  const locale = useLocale();

  const { data: galleries } = useQuery({
    queryKey: ["galleries"],
    queryFn: getGalleries,
  });

  return (
    <div
      className={`axil-instagram-area axil-section-gap ${parentClass || ""}`}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-titlez">
              <h2 className="title">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="imageicon"
                  viewBox="0 0 16 16"
                >
                  <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                  <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1z" />
                </svg>
                {locale === "ar" ? "معرض الصور" : "Gallery"}
              </h2>
            </div>
          </div>
        </div>
        <div className="row mt--30">
          <div className="col-lg-12">
            <ul className="instagram-post-list">
              {galleries?.map((data) => (
                <li className="single-post" key={data.id}>
                  <a href={`/${locale}/gallery/${data.id}`}>
                    <Image
                      src={data.image_urls[0]}
                      height={190}
                      width={190}
                      alt="Instagram Images"
                    />
                    <span className="instagram-button">
                      <i className="fa fa-image" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryOne;
