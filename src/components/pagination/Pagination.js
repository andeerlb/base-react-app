import React, { useState, useEffect } from 'react';
import { faChevronLeft as previous, faChevronRight as next } from '@fortawesome/free-solid-svg-icons'
import styles from './Pagination.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const QUANTITY_PAGES_VIEW = 8;

function Pagination ({
  totalPages = 1,
  isFirstPage = false,
  isLastPage = false,
  onChangePage = (page) => {}
}) {

  const [firstPage, setFirstPage] = useState(isFirstPage);
  const [lastPage, setLastPage] = useState(isLastPage);
  const [activePage, setActivePage] = useState(0);
  const [pages, setPages] = useState([]);

  const range = (start, stop) : number => {
    let step = 1;

    if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) {
        return 0;
    }

    var result = [];
    for (var i = start; step > 0 ? i < stop : i > stop; i += step) {
        result.push(i);
    }

    return result.length;
}

  const sortPages = (pages) => {
    pages.sort(function(a, b) {
      return a - b;
    });
  }

  const createPages = (currentPage = 0) => {
    if(totalPages <= 0) {
      setPages([0]);
      return;
    }

    let quantityPagesView = totalPages < QUANTITY_PAGES_VIEW ? totalPages : QUANTITY_PAGES_VIEW;

    let totalLeftPages = quantityPagesView/2;
    let currentPageLeft = currentPage;
    let rangetByTotalPages = range(currentPage, totalPages)-1;

    if(currentPage < totalLeftPages) {
      totalLeftPages = quantityPagesView;
      currentPageLeft = currentPageLeft + range(currentPage, quantityPagesView);
    } else if (rangetByTotalPages < (quantityPagesView/2)) {
      totalLeftPages += (totalLeftPages - rangetByTotalPages);
    }

    let leftPages = [];
    for(var i = currentPageLeft-1; i >= 0 && totalLeftPages > leftPages.length; i--){
      leftPages.push(i);
    }

    let totalRightPages = quantityPagesView - leftPages.length;
    let currentPageRight =  leftPages[0]+1;

    let rightPages = [];
    for(var i = currentPageRight; i < totalPages && totalRightPages >= rightPages.length; i++){
      rightPages.push(i);
    }

    let finalPages = leftPages.concat(rightPages);
    sortPages(finalPages);
    setPages(finalPages);
  }

  useEffect(() => {
    if(totalPages > 1) {
      createPages(0);
    } else {
      setPages([0]);
    }

    setActivePage(0);
  }, [totalPages])

  useEffect(() => {
    setFirstPageFunc(activePage);
    setLastPageFunc(activePage);
  }, [pages])

  useEffect(() => {
    createPages(activePage);
  }, [activePage])

  const setFirstPageFunc = (page) => {
    if(page <= 0) {
      setFirstPage(true);
    } else if(firstPage) {
      setFirstPage(false);
    }
  }

  function verifyIsLastPage(page) {
    return (page >= totalPages-1);
  }

  const setLastPageFunc = (page) => {
    if(verifyIsLastPage(page)) {
      setLastPage(true);
    } else if(lastPage) {
      setLastPage(false);
    }
  }

  const nextPage = () => {
    if(verifyIsLastPage(activePage)) {
      return;
    }

    let nextPageCount = activePage+1;
    setActivePage(nextPageCount);
    onChangePage(nextPageCount);
  }

  const previousPage = () => {
    if(firstPage) return;

    if(activePage <= 0) {
      return;
    }

    let previousPageCount = activePage-1;
    setActivePage(previousPageCount);
    onChangePage(previousPageCount);
  }

  const changePage = (page, isCurrentPage) => {
    if(isCurrentPage) return;
    setActivePage(page);
    setLastPageFunc(page);
    setFirstPageFunc(page);
    onChangePage(page);
  }

  return (
    <div className={[styles.container, 'noselect'].join(' ')}>
      <button className={[styles.enumeration, styles.pages, styles.previous, firstPage && styles.disabled].join(' ')} disabled={firstPage} onClick={previousPage}>
        <div><FontAwesomeIcon icon={previous} size={'1x'}  /></div>
      </button>
      {pages.includes(0) ? <></> : <>
          <button style={{marginLeft:'2px'}} className={[styles.enumeration, styles.pages].join(' ')} onClick={() => changePage(0, false)}><div>{1}</div></button>
          <span className={styles.dots}>...</span>
        </>}
      {
        pages.map(page => {
          let isCurrentPage = activePage === page;
          return <button
            key={page} style={{marginLeft:'2px'}}
            className={[styles.enumeration, styles.pages, isCurrentPage && styles.selected].join(' ')}
            disabled={isCurrentPage} onClick={() => changePage(page, isCurrentPage)}>
            <div>{page+1}</div>
          </button>
        })
      }

      {pages.includes(totalPages === 0 ? 0 : totalPages-1) ? <></> : <>
        <span className={styles.dots}>...</span>
        <button style={{marginLeft:'2px'}} className={[styles.enumeration, styles.pages].join(' ')} onClick={() => changePage(totalPages-1, false)}>
          <div>{totalPages}</div>
        </button>
      </>}
      <button className={[styles.enumeration, styles.pages, styles.next, lastPage && styles.disabled].join(' ')} disabled={lastPage} onClick={nextPage}>
        <div><FontAwesomeIcon icon={next} size={'1x'}  /></div>
      </button>
    </div>
  )
}

export default Pagination;
