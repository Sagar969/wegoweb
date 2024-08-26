import { Suspense, useEffect, useState } from "react";
import { Button, Layout, Menu } from "antd";
import { MdAddBusiness, MdDashboard } from "react-icons/md";
import { RiMenu5Line } from "react-icons/ri";
import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";
import { FaMoon, FaSun } from "react-icons/fa";
import Loading from "./Loading";
const { Header, Sider, Content } = Layout;

interface PanelTemplatePropsType {
  children: React.ReactNode;
  lazy?: boolean;
}
interface MenuItemType {
  key: string;
  label: string;
  icon?: React.ReactNode;
  children?: MenuItemType[];
}
export default function PanelTemplate({
  children,
  lazy = true,
}: PanelTemplatePropsType) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { theme, setTheme } = useTheme();

  const [utils, setUtils] = useState({
    isMenuCollapsed: false,
    openedKeys: [],
    currentPath: "",
    activeNavItem: "dashboard",
  });
  const updateUtils = (newUtils: { [key: string]: any }): void =>
    setUtils((prev) => ({ ...prev, ...newUtils }));

  const handleMenuSelect = ({ key }: { key: string }): void => {
    if (pathname !== key) navigate(key);
  };

  const menuItems = [
    {
      key: "/panel/dashboard",
      icon: <MdDashboard />,
      label: "Dashboard",
    },
    {
      key: "/panel/leads",
      icon: <MdAddBusiness />,
      label: "Leads",
    },
  ];

  const getKeys = (menuItem: MenuItemType): any => {
    if (menuItem.children?.length)
      return menuItem.children.map((item) => getKeys(item));
    else if (menuItem.key) return menuItem.key;
  };

  useEffect(() => {
    const activeKeys = menuItems
      .filter((item) => pathname.includes(item.key))
      .map((item) => item.key);

    const navKeys = menuItems.map((item) => getKeys(item)).flat(Infinity);

    updateUtils({
      openedKeys: activeKeys,
      currentPath: pathname,
      activeNavItem: navKeys.find((key) => pathname.includes(key)),
    });
  }, [pathname]);

  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={utils.isMenuCollapsed}
        className="border-r"
        collapsedWidth={50}
      >
        <div className="h-[50px] border-b content-center">
          <h1 className="text-xl font-[600] text-center">
            {utils.isMenuCollapsed ? "W" : "WeGoWeb"}
          </h1>
        </div>
        {utils.isMenuCollapsed ? (
          <Menu
            mode="inline"
            defaultSelectedKeys={[utils.activeNavItem]}
            className="border-0 mb-0"
            items={menuItems}
            selectedKeys={[utils.activeNavItem]}
            onClick={handleMenuSelect}
          />
        ) : (
          <Menu
            mode="inline"
            defaultSelectedKeys={[utils.activeNavItem]}
            className="border-0 mb-0"
            items={menuItems}
            selectedKeys={[utils.activeNavItem]}
            openKeys={utils.openedKeys}
            onOpenChange={(openKeys) => updateUtils({ openedKeys: openKeys })}
            onSelect={handleMenuSelect}
          />
        )}
      </Sider>
      <Layout>
        <Header className="h-[50px] border-b px-2 flex items-center">
          <Button
            type="text"
            icon={<RiMenu5Line />}
            onClick={() =>
              updateUtils({ isMenuCollapsed: !utils.isMenuCollapsed })
            }
          />
          <Button
            type="text"
            onClick={() =>
              theme === "light" ? setTheme("dark") : setTheme("light")
            }
            icon={theme === "light" ? <FaSun /> : <FaMoon />}
            className="ms-auto"
          />
        </Header>
        <Content className="h-[calc(100vh-50px)] overflow-auto">
          {lazy ? (
            <Suspense fallback={<Loading />}>{children}</Suspense>
          ) : (
            children
          )}
        </Content>
      </Layout>
    </Layout>
  );
}
