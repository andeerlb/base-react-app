import React, { createContext, useState, useContext } from "react";
import { faUserPlus, faUserTag } from '@fortawesome/free-solid-svg-icons'

const SidebarContext = createContext({});

const OPEN_MENU_WIDTH = 300;
const CLOSE_SIDEBAR_WIDTH = 60;

const menuList = [
  {
    id: 1,
    name: 'Colaboradores',
    link: '/employees',
    fileNameScreen: 'EmployeeRouter',
    icon: faUserTag
  }
]

export default function SidebarProvider ({ children }) {
  const [activeMenu, setActiveMenu] = useState(null);
  const [menus, setMenus] = useState(menuList || []);
  const [showLeftSidebar, setLeftShowSidebar] = useState(true);
  const [showTopSidebar, setShowTopSidebar] = useState(true);
  const [leftSidebarWidth, setLeftSidebarWidth] = useState(OPEN_MENU_WIDTH);

  const toggleLeftSidebar = (openSidebar) => {
    let openSidebarTmp = openSidebar !== null && openSidebar !== undefined ? openSidebar : !showLeftSidebar;

    setLeftSidebarWidth(openSidebarTmp ? OPEN_MENU_WIDTH : CLOSE_SIDEBAR_WIDTH);
    setLeftShowSidebar(openSidebarTmp);
  }

  const toggleTopSidebar = (openSidebar) => {
    let openSidebarTmp = openSidebar !== null && openSidebar !== undefined ? openSidebar : !showTopSidebar;
    setShowTopSidebar(openSidebarTmp);
  }

  return (
    <SidebarContext.Provider
      value={{
        showLeftSidebar,
        showTopSidebar,
        toggleLeftSidebar,
        toggleTopSidebar,
        leftSidebarWidth,
        menus,
        setMenus,
        activeMenu,
        setActiveMenu
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const { showLeftSidebar, toggleLeftSidebar, leftSidebarWidth, menus, setMenus, setActiveMenu, activeMenu, toggleTopSidebar, showTopSidebar } = useContext(SidebarContext);;
  return { showLeftSidebar, toggleLeftSidebar, leftSidebarWidth, menus, setMenus, setActiveMenu, activeMenu, toggleTopSidebar, showTopSidebar };
}
