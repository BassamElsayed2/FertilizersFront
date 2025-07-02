"use client";

import Link from "next/link";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getNews } from "../../../../services/apiNews";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useLocale } from "next-intl";

const ContactUs = () => {
  const locale = useLocale();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div suppressHydrationWarning>Loading ...</div>; // يمنع التحذير
  }

  return (
    <div className="axil-single-widget widget widget_postlist mb--30 ">
      <h5 className="widget-title">
        {locale === "en" ? "تواصل معنا" : "تواصل معنا"}
      </h5>
      <div className="post-medium-block">
        <div className="content-block post-medium mb--20">
          <div className="post-content">
            <h6 className="title">
              <a>{locale === "ar" ? "بريد الكتروني" : "Email"}</a>
            </h6>
            <div className="post-meta">
              <ul className="mr--10">
                <li>info@egyaus.com</li>
                <li>sales@egyaus.com</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="post-content">
          <h6 className="title">
            <a>{locale === "ar" ? "اتصل بنا " : "Contact Us"}</a>
          </h6>
          <div className="post-meta">
            <ul className="mr--10">
              <li>هاتف 01114655541</li>
              <li>هاتف 01110630006</li>
              <li>هاتف 01003130720 </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
