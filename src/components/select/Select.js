import React, { useState } from 'react';
import styles from './Select.module.css';

function Select({ list, isShowLabel = true, label = 'Label text', placeholder = 'Selecione uma opção', onSelect= () => {}, defaultValue}) {
  let id = new Date().getTime().toString();

  const handleChange = (event) => {
    let val = +event.target.value;
    if(val === -1) return;
    onSelect(list[list.findIndex(l => l.id === val)]);
  };

  return (
    !list ? <></> :
    <div id={styles.container}>
      {isShowLabel ? <label className={styles.label} htmlFor={id}>{label}</label> : <></>}
      <div className={styles.wrapper}>
        <select className={styles.element} name={id} id={id} onChange={handleChange}>
          <option style={{display: 'none'}} defaultValue={-1}>{placeholder}</option>
          {list.map(l => {
            return <option key={l.id} value={l.id} selected={defaultValue && defaultValue.id === l.id}>{l.name}</option>
          })}
        </select>
      </div>
    </div>
  )
}

export default Select;
