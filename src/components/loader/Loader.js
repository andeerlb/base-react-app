import React from 'react';
import { useSidebar } from '@/contexts/SidebarContext';
import styles from './Loader.module.css';

function Loader () {
  const { leftSidebarWidth } = useSidebar();
  const hideContent = false;
  const backgroundColorContent = !hideContent ? 'rgba(0,0,0,0.5)' : '#fff';
  const width = `calc(100% - ${(leftSidebarWidth-100) <= 0 ? 0 : leftSidebarWidth-100}px)`;

  return ( <div
      id={styles.containerLoader}
      className={['noselect'].join(' ')}
      style={{backgroundColor: backgroundColorContent, width: width}}
      >
      <div className={styles.load}>
        <hr/><hr/><hr/><hr/>
      </div>
    </div>
  )
}

export default Loader;
