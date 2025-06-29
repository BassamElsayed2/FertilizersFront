import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { slugify } from "../../utils";
import { useLocale } from "next-intl";

const filters = [
  { id: 1, cate: "Design" },
  { id: 2, cate: "Travel" },
  { id: 3, cate: "SEO" },
  { id: 4, cate: "Research" },
];

const defaultActiveCat = slugify(filters[0].cate);

const Nav = ({ posts }) => {
  const locale = useLocale();

  const [activeNav, setActiveNav] = useState(defaultActiveCat);
  // If you want to use tabPostData, uncomment:
  // const defaultData = posts.filter(
  //   (post) => slugify(post.cate) === defaultActiveCat
  // );
  // const [tabPostData, setTabPostData] = useState(defaultData);

  const handleChange = (e) => {
    let filterText = slugify(e.target.textContent);
    setActiveNav(filterText);

    let tempData = [];
    for (let i = 0; i < posts.length; i++) {
      const element = posts[i];
      let categories = element["cate"];
      if (slugify(categories).includes(filterText)) {
        tempData.push(element);
      }
    }

    // If using tabPostData, uncomment:
    // setTabPostData(tempData);
  };

  return (
    <ul className="mainmenu mt--10">
      <li className="menu-item-has-children zz">
        <Image src="/1.png" alt="Icon" width={24} height={24} />
        <Link href="/">{locale === "en" ? "Home" : "الرئيسية"}</Link>
      </li>
      <li className="menu-item-has-children">
        <Image src="/2.png" alt="Icon" width={24} height={24} />
        <Link href={`/${locale}/news`}>
          {locale === "en" ? "All News" : "الاخبار"}
        </Link>
      </li>
      <li className="menu-item-has-children">
        <Image src="/3.png" alt="Icon" width={24} height={24} />
        <Link href={`/${locale}/services`}>
          {locale === "en" ? "All Services" : "الخدمات"}
        </Link>
      </li>
      <li className="menu-item-has-children">
        <Image src="/4.png" alt="Icon" width={24} height={24} />
        <Link href={`/${locale}/products`}>
          {locale === "en" ? "All Products" : " المنتجات"}
        </Link>
      </li>
      <li className="menu-item-has-children">
        <Image src="/5.png" alt="Icon" width={24} height={24} />
        <Link href={`/${locale}/gallery`}>
          {locale === "en" ? "Gallery" : " الصور"}
        </Link>
      </li>
      <li>
        <Image src="/6.png" alt="Icon" width={24} height={24} />
        <Link href={`/${locale}/about`}>
          {locale === "en" ? "Contact Us" : "اتصل بنا"}
        </Link>
      </li>
    </ul>
  );
};

export default Nav;
