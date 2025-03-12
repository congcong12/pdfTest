import "@/components/headerLayout/style.css";
import Image from "next/image";
import type { MenuProps } from "antd";
import { Dropdown, Space, Menu, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";

const _configText = [
  { text: "Pricing" },
  { text: "Chrome extension" },
  { text: "Use cases" },
  {
    text: "Language",
    config: [{ country: "China" }, { country: "English" }],
  },
  { text: "Get started →" },
];

const items: MenuProps["items"] = _configText.map((item) => ({
  label: item.text,
  key: item.text,
}));

export default function HeaderLayout() {
  const [isMobile, setIsMobile] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div className="header">
        <div className="header-left">
          <Image width={40} height={40} src="/ji.jpg" alt="" />
          <span>KUNai</span>
        </div>
        <div className="header-right">
          {isMobile ? (
            <div className="menu-icon">
              <Button
                icon={<MenuOutlined />}
                onClick={() => setMenuVisible(!menuVisible)}
              />
            </div>
          ) : (
            _configText.map((item) => (
              <div className="header-right-config" key={item.text}>
                {item.config ? (
                  <Dropdown menu={{ items }} trigger={["click"]}>
                    <a onClick={(e) => e.preventDefault()}>
                      <Space>{item.config[0].country}</Space>
                    </a>
                  </Dropdown>
                ) : (
                  <a>{item.text}</a>
                )}
              </div>
            ))
          )}
        </div>
      </div>
      {isMobile && menuVisible && (
        <div
          className="mobile-menu-container"
          style={{
            position: "absolute",
            right: 0,
            width: "auto",
            padding: "10px",
            background: "#fff",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Menu items={items} className="mobile-menu" />
        </div>
      )}
    </>
  );
}
