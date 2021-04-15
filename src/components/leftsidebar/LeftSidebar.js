import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowCircleLeft, faArrowCircleRight } from '@fortawesome/free-solid-svg-icons'

import { useSidebar } from '@/contexts/SidebarContext';
import { useLocation } from 'react-router-dom';

import styles from "./LeftSidebar.module.css";
import { Link } from "react-router-dom";
import { useLoader } from "@/contexts/LoaderContext";

const LeftSidebar = () => {
  const { showLeftSidebar, toggleLeftSidebar, leftSidebarWidth, menus, setActiveMenu } = useSidebar();
  const { hideLoader } = useLoader();
  const location = useLocation();

  return (
    <>
      <div id={styles.container} style={{
        width: leftSidebarWidth+'px'
      }}>
        <div className={styles.containerLogo}>
          <div className={styles.logo}>

          </div>
          <div className={styles.toggleMenu} onClick={() => toggleLeftSidebar()} style={{
            marginRight: showLeftSidebar ? '10px' : '15px'
          }}>
            <FontAwesomeIcon icon={showLeftSidebar ? faArrowCircleLeft : faArrowCircleRight} size={'2x'}  />
          </div>
        </div>
        <nav id={styles.menuContainer}>
          <ul className={styles.ul}>
            {
              menus.map(menu => {
                return <li key={menu.id}>
                  <Link to={menu.link}
                    className={[styles.menuItem, location.pathname === menu.link ? styles.menuSelected : ''].join(' ')}
                    onClick={() => {
                      setActiveMenu(menu);
                      toggleLeftSidebar(true);
                      hideLoader();
                      //source.cancel('cancelasdsadasade');
                    }}
                  >
                    <FontAwesomeIcon icon={menu.icon} size={'lg'}  />
                    <span style={{opacity: showLeftSidebar ? 1 : 0}}>{menu.name}</span>
                  </Link>
                </li>
              })
            }
          </ul>
        </nav>
      </div>
    </>
  );
};

export default LeftSidebar;
