/* eslint-disable */
import { Button, Menu } from "antd";
import Sider from "antd/lib/layout/Sider";
import SubMenu from "antd/lib/menu/SubMenu";
import ArrowLeftIcon from "components/Icons/ArrowLeftIcon";
import CalendarIcon from "components/Icons/CalendarIcon";
import CloseIcon from "components/Icons/CloseIcon";
import DashboardIcon from "components/Icons/DashboardIcon";
import FileTextIcon from "components/Icons/FileTextIcon";
import GourmetIcon from "components/Icons/GourmetIcon";
import HelpCircleIcon from "components/Icons/HelpCircleIcon";
import MenuIcon from "components/Icons/MenuIcon";
import SettingsIcon from "components/Icons/SettingsIcon";
import _ from "lodash";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./style/index.less";

// sub menu keys

const SUB_KEYS = {
  customer: "/customer",
  settings: "/settings",
};

export default function Sidebar({
  collapsed,
  toggleCollapsed,
  hasReservation,
  role,
  hasSms,
  location,
  isIphone,
}) {
  const [openKeys, setOpenKeys] = useState([]);
  const customStyles = "sidebar collapsible-sidebar";
  const IconWidth = "18";
  const IconHeight = "18";

  useEffect(() => {
    const temp = [];
    _.forOwn(SUB_KEYS, (value, key) => {
      if (location.pathname.includes(key)) {
        temp.push(value);
      }
    });
    setOpenKeys(temp);
  }, [location.pathname]);

  const onSubMenuClick = (menu) => {
    if (_.indexOf(openKeys, menu) === -1) {
      setOpenKeys([...openKeys, menu]);
    } else {
      setOpenKeys([openKeys.filter((val) => val !== menu)]);
    }
  };

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      className={collapsed ? customStyles : "sidebar"}
    >
      <div className="menu-control">
        <Button
          type="primary"
          onClick={() => toggleCollapsed(!collapsed)}
          className="menu-icon"
        >
          {collapsed ? (
            <MenuIcon />
          ) : isIphone ? (
            <CloseIcon stroke="white" />
          ) : (
            <ArrowLeftIcon stroke="#888888" />
          )}
        </Button>
      </div>
      {hasReservation === "true" || hasReservation === true ? (
        <Menu
          defaultSelectedKeys={["/"]}
          openKeys={openKeys}
          mode="inline"
          className={
            collapsed ? "ant-menu-inline-collapsed" : "ant-menu-custom"
          }
          selectedKeys={[location.pathname]}
          sub
        >
          <Menu.Item
            key="/"
            onClick={() => (isIphone ? toggleCollapsed(!collapsed) : {})}
          >
            <NavLink to="/">
              <DashboardIcon
                width={IconWidth}
                height={IconHeight}
                stroke={
                  location.pathname === "/"
                    ? "#121958"
                    : isIphone
                    ? "#FFFFFF"
                    : "#888888"
                }
              />
              <span>?????????????????????</span>
            </NavLink>
          </Menu.Item>

          <Menu.Item
            key="/reservation/list"
            onClick={() => (isIphone ? toggleCollapsed(!collapsed) : {})}
          >
            <NavLink to="/reservation/list">
              <CalendarIcon
                width={IconWidth}
                height={IconHeight}
                stroke={
                  location.pathname === "/reservation/list"
                    ? "#121958"
                    : isIphone
                    ? "#FFFFFF"
                    : "#888888"
                }
              />
              <span>?????????</span>
            </NavLink>
          </Menu.Item>
          {collapsed ? (
            <Menu.Item key="/customer/list">
              <NavLink to="/customer/list">
                <FileTextIcon
                  width={IconWidth}
                  height={IconHeight}
                  stroke={
                    location.pathname.includes("customer")
                      ? "#121958"
                      : isIphone
                      ? "#FFFFFF"
                      : "#888888"
                  }
                />
                <span>???????????????</span>
              </NavLink>
            </Menu.Item>
          ) : (
            <SubMenu
              key="/customer"
              onTitleClick={() => onSubMenuClick("/customer")}
              title={
                <NavLink to={"/customer/list"}>
                  <FileTextIcon
                    width={IconWidth}
                    height={IconHeight}
                    stroke={
                      location.pathname.includes("customer") && !isIphone
                        ? "#121958"
                        : isIphone
                        ? "#FFFFFF"
                        : "#888888"
                    }
                  />
                  <span>???????????????</span>
                </NavLink>
              }
            >
              <Menu.Item
                key="/customer/list"
                onClick={() => (isIphone ? toggleCollapsed(!collapsed) : {})}
              >
                <NavLink to="/customer/list">
                  <span>?????????????????????</span>
                </NavLink>
              </Menu.Item>
              <Menu.Item
                key="/customer/custom-item/list"
                onClick={() => (isIphone ? toggleCollapsed(!collapsed) : {})}
              >
                <NavLink to="/customer/custom-item/list">
                  <span>????????????????????????</span>
                </NavLink>
              </Menu.Item>
              <Menu.Item
                key="/customer/display-order"
                onClick={() => (isIphone ? toggleCollapsed(!collapsed) : {})}
              >
                <NavLink to="/customer/display-order">
                  <span>??????????????????</span>
                </NavLink>
              </Menu.Item>
            </SubMenu>
          )}

          {/* <Menu.Item
            key="/line-configuration"
            onClick={() => (isIphone ? toggleCollapsed(!collapsed) : {})}
          >
            <NavLink to="/line-configuration">
              <LineLogo
                width={IconWidth}
                height={IconHeight}
                stroke={
                  location.pathname === "/line-configuration"
                    ? "#121958"
                    : isIphone
                    ? "#FFFFFF"
                    : "#888888"
                }
              />
              <span>LINE??????</span>
            </NavLink>
              </Menu.Item> */}
          <Menu.Item
            key="/email-configuration"
            onClick={() => (isIphone ? toggleCollapsed(!collapsed) : {})}
          >
            <NavLink to="/email-configuration">
              <GourmetIcon
                width={IconWidth}
                height={IconHeight}
                stroke={
                  location.pathname === "/email-configuration"
                    ? "#121958"
                    : isIphone
                    ? "#FFFFFF"
                    : "#888888"
                }
              />
              <span>????????????????????????</span>
            </NavLink>
          </Menu.Item>
          {hasSms === "true" || role === "admin" ? (
            collapsed ? (
              <Menu.Item key="/settings">
                <NavLink
                  to={
                    role === "admin"
                      ? "/settings/store-master"
                      : "/settings/staff-store-master"
                  }
                >
                  <SettingsIcon
                    width={IconWidth}
                    height={IconHeight}
                    stroke={
                      location.pathname.includes("/settings")
                        ? "#121958"
                        : isIphone
                        ? "#FFFFFF"
                        : "#888888"
                    }
                  />
                  <span>????????????</span>
                </NavLink>
              </Menu.Item>
            ) : (
              <SubMenu
                key="/settings"
                onTitleClick={() => onSubMenuClick("/settings")}
                title={
                  <>
                    <SettingsIcon
                      width={IconWidth}
                      height={IconHeight}
                      stroke={
                        location.pathname.includes("/settings") && !isIphone
                          ? "#121958"
                          : isIphone
                          ? "#FFFFFF"
                          : "#888888"
                      }
                    />
                    <span>????????????</span>
                  </>
                }
              >
                {role === "admin" ? (
                  <Menu.Item
                    key="/settings/store-master"
                    onClick={() =>
                      isIphone ? toggleCollapsed(!collapsed) : {}
                    }
                  >
                    <NavLink to="/settings/store-master">
                      <span>???????????????</span>
                    </NavLink>
                  </Menu.Item>
                ) : null}
                {role === "admin" ? (
                  <Menu.Item
                    key="/settings/account-master"
                    onClick={() =>
                      isIphone ? toggleCollapsed(!collapsed) : {}
                    }
                  >
                    <NavLink to="/settings/account-master">
                      <span>????????????????????????</span>
                    </NavLink>
                  </Menu.Item>
                ) : null}
                <Menu.Item
                  key="/settings/staff-store-master"
                  onClick={() => (isIphone ? toggleCollapsed(!collapsed) : {})}
                >
                  <NavLink to="/settings/staff-store-master">
                    <span>??????????????????</span>
                  </NavLink>
                </Menu.Item>
                <Menu.Item
                  key="/settings/menu-master"
                  onClick={() => (isIphone ? toggleCollapsed(!collapsed) : {})}
                >
                  <NavLink to="/settings/menu-master">
                    <span>?????????????????????</span>
                  </NavLink>
                </Menu.Item>
                <Menu.Item
                  key="/settings/table-master"
                  onClick={() => (isIphone ? toggleCollapsed(!collapsed) : {})}
                >
                  <NavLink to="/settings/table-master">
                    <span>?????????????????????</span>
                  </NavLink>
                </Menu.Item>
                {/* <Menu.Item key="11">
                  <NavLink to="/settings/store-master">
                    <span>????????????????????????</span>
                  </NavLink>
                </Menu.Item> */}
                <Menu.Item
                  key="/settings/reservation-route-master"
                  onClick={() => (isIphone ? toggleCollapsed(!collapsed) : {})}
                >
                  <NavLink to="/settings/reservation-route-master">
                    <span>??????????????????</span>
                  </NavLink>
                </Menu.Item>
              </SubMenu>
            )
          ) : null}
          <Menu.Item key="13">
            <HelpCircleIcon
              width={IconWidth}
              height={IconHeight}
              stroke={
                location.pathname === "/help"
                  ? "#121958"
                  : isIphone
                  ? "#FFFFFF"
                  : "#888888"
              }
            />
            <a
              rel="noopener noreferrer"
              href="https://help.umat-operation.com/"
              target={"_blank"}
            >
              <span>????????????????????????</span>
            </a>
          </Menu.Item>
        </Menu>
      ) : null}
    </Sider>
  );
}

Sidebar.propTypes = {
  collapsed: PropTypes.bool,
  toggleCollapsed: PropTypes.func,
  hasReservation: PropTypes.any,
  role: PropTypes.any,
  hasSms: PropTypes.any,
  location: PropTypes.object.isRequired,
  isIphone: PropTypes.bool,
};
