import React, { useEffect, useState } from 'react';
import { faSortAlphaUp as sortUpIcon, faSortAlphaDown as sortDownIcon } from '@fortawesome/free-solid-svg-icons'
import Button from '@/components/button/Button';
import Pagination from '@/components/pagination/Pagination';
import SearchBox from '@/components/searchbox/SearchBox';
import styles from './Datatable.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Select from '@/components/select/Select';

const QUANTITY_ROWS = [
  {id:1, name: 10},
  {id:2, name: 30},
  {id:3, name: 50},
  {id:4, name: 100}
];

function Datatable ({ pageable = {content: []}, columns = [], btnCreateText, filter, removeBorderRadius = false, paddingSearchAndLines = false,
  onSearch = () => {},
  onChangePage = () => {},
  onChangeSort = () => {},
  onSelectPageSize = () => {},
  onSelect = () => {}
}){
  const [componentObject, setComponentObject] = useState({
    columnCurrentOrderBy: filter && filter.sort ? filter.sort.split(',')[0] : '',
    init: true
  });

  const {totalPages, first, last, number} = pageable;
  let currentSort = filter && filter.sort ? filter.sort.split(',')[1].toUpperCase() : 'ASC';

  useEffect(() => {
  }, [componentObject])

  function getValueFromAttrObject(object, attributeObject) {
    let attr = attributeObject;
    if(!attr) return;

    let attrs = attr.split('.');

    let value = object;
    attrs.forEach(att => {
      value = value[att]
    })
    return value;
  }

  const changeSort = (column) => {
    setComponentObject({
      columnCurrentOrderBy: column.orderBy,
      init: false
    });
    currentSort = currentSort === 'ASC' ? 'DESC' : 'ASC';
    onChangeSort(`${column.orderBy},${currentSort}`);
  }

  return (
    <div id={styles.containerDatatable}>
      <div className={styles.containerHeader}>
        <div style={{marginBottom: '10px', paddingLeft: paddingSearchAndLines ? '15px' : 0}}><SearchBox onSearch={onSearch} enableDebounce={true}/></div>
        <div style={{display: 'flex', flexWrap: 'wrap'}}>
          <div style={{marginBottom: '10px', paddingRight: paddingSearchAndLines ? '15px' : 0, paddingLeft: paddingSearchAndLines ? '15px' : 0}}><Select list={QUANTITY_ROWS} isShowLabel={false} placeholder={'Linhas'} onSelect={onSelectPageSize}/></div>
        </div>
      </div>
      <div id={styles.containerTable} style={{borderRadius: removeBorderRadius ? '0' : '6px'}}>
        <table className={styles.table}>
          <thead>
            <tr className={styles.tr}>
              {
                columns.map(col => {
                  return <th className={styles.th} key={col.attributeObject}>
                    { !pageable || !pageable.content || !pageable.content.length ? <></> : <>
                        <button className={[styles.sort, !componentObject.init && componentObject.columnCurrentOrderBy == col.orderBy &&  styles.sortSelected].join(' ')} onClick={() => changeSort(col)}>
                          <FontAwesomeIcon icon={componentObject.columnCurrentOrderBy == col.orderBy ? (currentSort === 'ASC' ? sortUpIcon : sortDownIcon) : sortUpIcon} size={'1x'}  />
                        </button>
                        <span style={{marginLeft: '30px'}}>{col.name}</span>
                      </>
                    }
                  </th>
                })
              }
            </tr>
          </thead>
          <tbody>
              {
                !pageable || !pageable.content || !pageable.content.length ?
                <tr>
                  <td className={[styles.td, styles.noRecordFound].join(' ')} colSpan={columns.length}>Nenhum registro encontrado.</td>
                </tr> :
                pageable.content.map(content => {
                  return <tr className={styles.trRow} key={content.id} onClick={() => onSelect(content)}>
                    {
                      columns.map(col => {
                        return <td className={styles.td} key={col.name}>
                          {getValueFromAttrObject(content, col.attributeObject)}
                          </td>
                      })
                  }
                  </tr>
                })
              }
          </tbody>
        </table>
      </div>
      <Pagination isFirstPage={first} isLastPage={last} totalPages={totalPages} onChangePage={onChangePage}/>
    </div>
  )
}

export default Datatable;
