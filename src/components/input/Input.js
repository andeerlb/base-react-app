import React from 'react';
import styles from './Input.module.css';

export default function Input ({ label = 'Label value', defaultValue, onChange = (value) => {} }) {
  return (
    <div className={styles.group}>
      <input className={styles.input} type="text" required pattern="\S+.*" onChange={e => onChange(e.target.value)} onBlur={e => onChange(e.target.value)} defaultValue={defaultValue}/>
      <span className={styles.highlight}></span>
      <span className={styles.bar}></span>
      <label className={styles.label}>{label}</label>
    </div>
  )
}
