import React, { useState, useEffect } from "react";
import {
  AppstoreOutlined,
  CalendarOutlined,
  LinkOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { Menu, message } from "antd";
import type { GetProp, MenuProps } from "antd";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import ListAppointments from "../../Appointment/components/ListAppointments";
import ShowProfile from "./showProfile";
import ViewSlots from "./slots/ViewSlots";

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
  localStorage.removeItem("slot_id_update");
};

const items: MenuItem[] = [
  getItem("Profile", "1", <MailOutlined />),
  getItem("Slots", "sub1-1", <AppstoreOutlined />, [
    getItem("View Slots", "2"),
  ]),
  getItem("Appointments", "sub1", <CalendarOutlined />, [
    getItem("List All Appointments", "3"),
  ]),
  getItem(
    <Link to="/" target="_blank" rel="noopener noreferrer">
      Health Axis Planner
    </Link>,
    "link",
    <LinkOutlined />
  ),
  getItem(<button onClick={handleLogout}>Log out</button>, "logout"),
];

const AdmSidebar = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState<string>("1");
  const [mode, setMode] = useState<"vertical" | "inline">("inline");
  const [theme, setTheme] = useState<MenuTheme>("light");
  const navigate = useNavigate();

  const handleMenuClick = (menu: any) => {
    setSelectedMenuItem(menu.key);
    switch (menu.key) {
      case "1":
        message.info("View Profile");
        break;
      case "2":
        message.info("View Slots...");
        break;
      case "3":
        message.info("All Appointments !");
        break;
      case "link":
        message.info("Visit Health Axis Planner");
        break;
      case "logout":
        toast.dark("logged out successfully!");
        navigate("/");
        break;
      default:
        break;
    }
  };

  const renderComponent = () => {
    switch (selectedMenuItem) {
      case "1":
        return <ShowProfile />;
      case "2":
        return <ViewSlots />;
      case "3":
        return <ListAppointments />;
      default:
        return null;
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <div className="contents" style={{ marginRight: "10px" }}>
        <Menu
          style={{ width: 256 }}
          defaultSelectedKeys={[selectedMenuItem]}
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

export default AdmSidebar;
