import Link from "next/link";
import Image from "next/image";
import { useLocale } from "next-intl";

const WidgetVideoPost = ({ postData, title }) => {
  const locale = useLocale();

  const videoPosts = postData?.filter(
    (post) =>
      post.category?.name_en === (title === "اخر الخدمات" ? "Service" : "news")
  );

  return (
    <div className="axil-single-widget widget-style-2 widget widget_post mt--30">
      <h5 className="widget-title">
        {title
          ? title
          : locale === "en"
          ? "Latest Products"
          : "المنتجات الجديدة"}
      </h5>
      <div className="video-post-wrapepr">
        {videoPosts?.slice(-3).map((data) => (
          <div className="content-block image-rounded mt--20" key={data.id}>
            {data.images[0] ? (
              <div className="post-thumbnail">
                <Link href={`/post/${data.id}`}>
                  <a>
                    <Image
                      src={data.images[0]}
                      alt={data.title_en}
                      height={220}
                      width={330}
                      priority={true}
                    />
                  </a>
                </Link>

                <Link href={`/post/${data.id}`}>
                  <a className="video-popup size-medium position-top-center icon-color-secondary">
                    <span className="play-icon" />
                  </a>
                </Link>
              </div>
            ) : (
              ""
            )}
            <div className="post-content">
              <h6 className="title mb-5">
                <Link href={`/post/${data.id}`}>
                  <a>{locale === "ar" ? data.title_ar : data.title_en}</a>
                </Link>
              </h6>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WidgetVideoPost;
