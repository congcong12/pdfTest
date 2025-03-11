import "@/components/headerLayout/style.css";
import Image from "next/image";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";

const _configText = [
  { text: "Pricing" },
  { text: "Chrome extension" },
  { text: "Use cases" },
  {
    text: "language",
    config: [
      {
        country: "China",
      },
      { country: "English" },
    ],
  },
  { text: "Get started →" },
];

const items: MenuProps["items"] = [
  {
    label: <a>China</a>,
    key: "0",
  },
  {
    label: <a>English</a>,
    key: "1",
  },
  {
    label: <a>English</a>,
    key: "2",
  },
  {
    label: <a>English</a>,
    key: "3",
  },
  {
    label: <a>English</a>,
    key: "4",
  },
  {
    label: <a>English</a>,
    key: "5",
  },
];

export default function HeaderLayout() {
  return (
    <div className="header">
      <div className="header-left">
        <Image width={40} height={40} src="/ji.jpg" alt="" />
        <span>KUNai</span>
      </div>
      <div className="header-right">
        {_configText.map((item) => {
          return (
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
          );
        })}
      </div>
    </div>
  );
}
