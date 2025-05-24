import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useWindowSize } from "usehooks-ts";
import { useTranslation } from "react-i18next";
import { images } from "../../constants";
import sidebarNav from "../../config/sidebarNav";
import SidebarContext from "../../store/sidebarContext";
import LoginContext from "../../store/loginContext";
import { Icon } from "@iconify/react";
import classes from "./Sidebar.module.scss";
import ACLWrapper from "../ACL/Acl";
import { ReportService } from "../../service/service";

function Sidebar() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeIndex2, setActiveIndex2] = useState<string | null>(null);

  const { width } = useWindowSize();
  const location = useLocation();
  const sidebarCtx = useContext(SidebarContext);
  const loginCtx = useContext(LoginContext);
  const { t } = useTranslation();

  function openSidebarHandler() {
    //for width>768(tablet size) if sidebar was open in width<768 was opened too.
    //just in case of tablet size and smaller then, sidebar__open can added.
    if (width <= 768) document.body.classList.toggle("sidebar__open");
  }

  function logoutHandler() {
    openSidebarHandler();
    localStorage.removeItem("userInfo"); // শুধুমাত্র "users" key ডিলিট করবে
    loginCtx.toggleLogin();
  }
  const navigate = useNavigate();

  useEffect(() => {
    const curPath = window.location.pathname.split("/")[1];
    const activeItem = sidebarNav.findIndex((item) => item.section === curPath);

    setActiveIndex(curPath.length === 0 ? 0 : activeItem);
  }, [location]);

  const [openSubmenu, setOpenSubmenu] = useState(null);

  const handleClick = (index: any, link: any, hasChildren: any) => {
    setActiveIndex2(index);
    if (hasChildren) {
      setOpenSubmenu(openSubmenu === index ? null : index);
    } else {
      navigate(link);
    }
  };


  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<any>();
 useEffect(() => {
    getEmployeeList();

  }, []);
  const getEmployeeList = () => {

    ReportService.routeGetPost({ keyword: '' })
      .then((resp) => {
        setData(resp?.data);
      })
      .catch((err) => {
      })
      .finally(() => {
        setLoading(false);
      });
  };

  console.log(data);
  const data2 =data
  
  return (
    <div
      className={`${classes.sidebar} ${!sidebarCtx.isOpen && classes.sidebar_close
        }`}
    >
      <div className={classes.sidebar__logo}>
        {/* <img src={images.logo} alt="digikalaw" /> */}
      </div>
      <div className={classes.sidebar__menu}>
        {data2?.map((nav: any, index: any) => (
          <ACLWrapper key={`nav-${index}`} visibleToRoles={nav?.permissionRole?.map((e:any)=>e?.name)}>
            <div>
              <div
                className={`${classes.sidebar__menu__item} ${activeIndex === index && classes.active
                  }`}
                onClick={() => handleClick(index, nav?.link, nav?.children?.length)}
              >
                <div className={classes.sidebar__menu__item__icon}>
                  <Icon icon={nav?.icon} />
                </div>
                <div className={classes.sidebar__menu__item__txt}>
                  {t(nav?.section)}
                </div>
                {nav?.children && (
                  <div className={classes.sidebar__menu__item__arrow}>
                    <Icon icon={openSubmenu === index ? "mdi:chevron-down" : "mdi:chevron-right"} />
                  </div>
                )}
              </div>

              {nav?.children && openSubmenu === index && (
                <div className={classes.sidebar__submenu}>
                  {nav?.children.map((subNav: any, subIndex: any) => (
                    <ACLWrapper key={`subNav-${subIndex}`} visibleToRoles={subNav?.permissionRole?.map((e:any)=>e?.name)}>
                      <div
                        className={`${classes.sidebar__submenu__item} ${activeIndex2 === `${index}-${subIndex}` ? classes.active : ''
                          }`}
                        onClick={() => {
                          setActiveIndex2(`${index}-${subIndex}`);
                          navigate(subNav?.link);
                        }}
                      >
                        <div className={`${classes.sidebar__submenu__item__txt} ${activeIndex2 === `${index}-${subIndex}` ? classes.activeText : ''}`}>

                          <div className="d-flex">
                            <div className={classes.sidebar__menu__item__icon}>
                              <Icon icon={subNav?.icon} />
                            </div>
                            {t(subNav?.section)}
                          </div>
                        </div>
                      </div>
                    </ACLWrapper>
                  ))}
                </div>
              )}

            </div>
          </ACLWrapper>


        ))}
      </div>


      <div className={[classes.sidebar__menu, classes.logout].join("")}>
        <Link
          to="/login"
          className={classes.sidebar__menu__item}
          onClick={logoutHandler}
        >
          <div className={classes.sidebar__menu__item__icon}>
            <Icon icon="tabler:logout" />
          </div>
          <div className={classes.sidebar__menu__item__txt}>{t("logout")}</div>
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
