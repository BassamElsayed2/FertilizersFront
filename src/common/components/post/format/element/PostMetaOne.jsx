import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { slugify } from "../../../../utils";

const PostMetaOne = ({ metaData }) => {
  const { locale } = useRouter();

  // Check if metaData exists
  if (!metaData) {
    return null;
  }

  const getImageSrc = (images) => {
    if (!images) return "";
    if (Array.isArray(images) && images.length > 0) return images[0];
    if (typeof images === "string") return images;
    return "";
  };

  return (
    <div className="banner banner-single-post post-formate post-standard alignwide">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="content-block">
              {metaData.images &&
                (() => {
                  const imageSrc = getImageSrc(metaData.images);
                  return imageSrc &&
                    typeof imageSrc === "string" &&
                    imageSrc.trim() !== "" ? (
                    <div className="post-thumbnail">
                      <span>
                        <Image
                          src={imageSrc}
                          alt={
                            locale === "en"
                              ? metaData.title_en || ""
                              : metaData.title_ar || ""
                          }
                          height={720}
                          width={1440}
                        />
                      </span>
                    </div>
                  ) : null;
                })()}

              <div className="post-content">
                {metaData.cate &&
                  typeof metaData.cate === "string" &&
                  metaData.cate.trim() !== "" && (
                    <div className="post-cat">
                      <div className="post-cat-list">
                        <Link
                          href={`/category/${slugify(metaData.cate)}`}
                          className="hover-flip-item-wrapper"
                        >
                          <span className="hover-flip-item">
                            <span data-text={metaData.cate}>
                              {metaData.cate}
                            </span>
                          </span>
                        </Link>
                      </div>
                    </div>
                  )}
                {((metaData.title_en &&
                  typeof metaData.title_en === "string" &&
                  metaData.title_en.trim() !== "") ||
                  (metaData.title_ar &&
                    typeof metaData.title_ar === "string" &&
                    metaData.title_ar.trim() !== "")) && (
                  <h1 className="title">
                    {locale === "en"
                      ? metaData.title_en || ""
                      : metaData.title_ar || ""}
                  </h1>
                )}

                <div className="post-meta-wrapper">
                  <div className="post-meta">
                    <div className="content">
                      {metaData.publisher_name &&
                        typeof metaData.publisher_name === "string" &&
                        metaData.publisher_name.trim() !== "" && (
                          <h6 className="post-author-name">
                            <span className="hover-flip-item-wrapper">
                              <span className="hover-flip-item">
                                <span data-text={metaData.publisher_name}>
                                  {metaData.publisher_name}
                                </span>
                              </span>
                            </span>
                          </h6>
                        )}
                    </div>
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

export default PostMetaOne;
