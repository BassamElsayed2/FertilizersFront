import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import MobileMenu from "./MobileMenu";
import Nav from "./Nav";

import { useTranslation } from "next-i18next";
import LanguageSwitcher from "../LanguageSwitcher";
import { useRouter } from "next/router";
import { getAds } from "../../../../services/apiAds";
import { useQuery } from "@tanstack/react-query";
import { getAboutUs } from "../../../../services/apiAboutUs";

const HeaderThree = ({ darkLogo, lightLogo, postData }) => {
  const { locale } = useRouter();

  const { data: logo } = useQuery({
    queryKey: ["site_settings"],
    queryFn: getAboutUs,
  });

  const dateFormate = () => {
    var day = new Date().getDate();
    var month = new Date().toLocaleString(locale, { month: "long" });
    var year = new Date().getFullYear();

    var todayDate = day + " " + month + "," + " " + year;

    return todayDate;
  };

  if (typeof window !== "undefined") {
    var colorMode = window.localStorage.getItem("color-mode");
  }

  const [showMMenu, SetShowMMenu] = useState(false);

  const MobileShowHandler = () => SetShowMMenu(true);
  const MobileHideHandler = () => SetShowMMenu(false);

  const [togglaClass, setTogglaClass] = useState(false);

  const toggleHandler = () => {
    setTogglaClass((active) => !active);
  };

  const { t } = useTranslation("common");

  return (
    <>
      <header className="header axil-header header-style-3  header-light header-sticky">
        <div className="header-top">
          <div className="container">
            <div className="d-flex justify-content-between  align-items-center ">
              <div className="d-flex justify-content-center align-items-center">
                <div className="header-top-bar d-flex flex-wrap align-items-center justify-content-center justify-content-md-start">
                  <ul className="header-top-nav liststyle d-none d-md-flex flrx-wrap align-items-center">
                    <li>
                      <Link href="#">
                        <a>{dateFormate()}</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="#">
                        <a>{t("advertisement")}</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="#">
                        <a href="#">{t("about")}</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="#">
                        <a>{t("contact")}</a>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="d-flex justify-content-center align-items-center p-2">
                <ul className="social-share-transparent md-size justify-content-center justify-content-md-end ">
                  <li>
                    <Link href="https://www.facebook.com">
                      <a>
                        <i className="fab fa-facebook-f"></i>
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="https://www.youtube.com">
                      <a>
                        <i className="fab fa-youtube"></i>
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="https://www.instagram.com">
                      <a>
                        <i className="fab fa-instagram"></i>
                      </a>
                    </Link>
                  </li>
                </ul>
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        </div>

        <div className="header-middle">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-3 col-md-4 col-sm-6">
                <div className="logo">
                  <Link href="/">
                    <a>
                      <Image
                        className={logo?.logo_url || "dark-logo"}
                        width={565}
                        height={148}
                        src={
                          (colorMode === "Dark"
                            ? lightLogo || "/logo.png"
                            : darkLogo || "/logo.png") ||
                          "/images/logo/logo-black.webp"
                        }
                        alt=" logo"
                      />
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="header-bottom">
          <div className="container">
            <div className="row justify-content-between align-items-center">
              <div className="d-flex justify-content-center">
                <div className="mainmenu-wrapper  d-xl-block">
                  <nav className="mainmenu-nav">
                    <Nav posts={postData} />
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu menuShow={showMMenu} menuHide={MobileHideHandler} />
    </>
  );
};

export default HeaderThree;
