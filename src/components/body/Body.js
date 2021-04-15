import React, { useState } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import * as importScreens from '../../imports/ScreenImport';

import { ToastContainer } from 'react-toastify';

import { useSidebar } from '../../contexts/SidebarContext';

import styles from './Body.module.css';
import NotFound404 from '../../screens/404/NotFound404';
import Loader from '../loader/Loader';
import { useLoader } from '../../contexts/LoaderContext';
import LeftSidebar from '../leftsidebar/LeftSidebar';
import TopSidebar from '../topsidebar/TopSidebar';

const Body = () => {
  const { menus, leftSidebarWidth } = useSidebar();
  const { isShowBodyLoader, isShowFullLoader} = useLoader();
  const width = `calc(100% - ${(leftSidebarWidth) <= 0 ? 0 : leftSidebarWidth}px)`;

  return (
    <>
      <ToastContainer />
      {isShowFullLoader ? <Loader /> : <></>}
      <LeftSidebar />
      <div style={{marginLeft: leftSidebarWidth, transition: '.5s margin-left'}}>
        {isShowBodyLoader ? <div><Loader /></div> : <></>}
        <TopSidebar />
        <div className={styles.containerBody} style={{width: width}}>
          <Switch>
            {
              menus.map(menu => {
                let ScreenImported = importScreens[menu.fileNameScreen];
                return <Route path={menu.link} key={menu.link} component={ScreenImported ? ScreenImported : NotFound404}/>
              })
            }

            <Redirect to="/employees" />
            <Route path="*" component={NotFound404}/>
          </Switch>
        </div>
      </div>
    </>
  )
}

export default Body;
