import React from "react";
import { useSidebar } from "../../contexts/SidebarContext";
import styles from './TopSidebar.module.css';

const TopSidebar = () => {
  const { showTopSidebar } = useSidebar();

  return (!showTopSidebar ? <></> :
    <div id={styles.container}>
    </div>
  );
};

export default TopSidebar;
