import React, { useState, useEffect } from "react";
import {
  AppstoreOutlined,
  CalendarOutlined,
  LinkOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { Menu, message } from "antd";
import type { GetProp, MenuProps } from "antd";
import Slots from "./Slots";
import MyAppointments from "./MyAppointments";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import MyProfile from "./MyProfile";

type MenuTheme = GetProp<MenuProps, "theme">;
type MenuItem = GetProp<MenuProps, "items">[number];

// Function to get menu item
function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user_id");
};

const items: MenuItem[] = [
  getItem("Profile", "sub1", <AppstoreOutlined />, [
    getItem("My Profile", "3"),
  ]),
  getItem("Available Slots", "1", <MailOutlined />),
  getItem("My Appointment", "2", <CalendarOutlined />),

  getItem(
    <Link to="/" target="_blank" rel="noopener noreferrer">
      Health Axis Planner
    </Link>,
    "link",
    <LinkOutlined />
  ),
  getItem(<button onClick={handleLogout}>Log out</button>, "logout"),
];

const Sidebar = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState<string>("3"); // Default selected menu item set to "3" for My Profile
  const [mode, setMode] = useState<"vertical" | "inline">("inline");
  const [theme, setTheme] = useState<MenuTheme>("light");
  const navigate = useNavigate();

  useEffect(() => {
    // Set "My Profile" as default selected menu item when the component mounts or refreshes
    setSelectedMenuItem("3");
  }, []);

  const handleMenuClick = (menu: any) => {
    setSelectedMenuItem(menu.key);
    switch (menu.key) {
      case "1":
        message.info("View available slots");
        break;
      case "2":
        message.info("Showing appointments...");
        break;
      case "logout":
        toast.dark("logged out successfully!");
        navigate("/");
        break;
      case "link":
        message.info("Visit Health Axis Planner");
        break;
      default:
        break;
    }
  };

  const renderComponent = () => {
    switch (selectedMenuItem) {
      case "1":
        return <Slots />;
      case "2":
        return <MyAppointments />;
      case "3":
        return <MyProfile />;
      default:
        return null;
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <div className="contents" style={{ marginRight: "10px" }}>
        <Menu
          style={{ width: 256 }}
          defaultSelectedKeys={["3"]}
          defaultOpenKeys={["sub1"]}
          mode={mode}
          theme={theme}
          items={items}
          onClick={handleMenuClick}
        />
      </div>
      <div>{renderComponent()}</div>
    </div>
  );
};

export default Sidebar;
