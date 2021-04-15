import React from 'react';
import styles from './Button.module.css';

function Button({ text = 'Text here', right, onClick = () => {} }) {
  return (
    <button
      className={['btn btn-primary me-md-2', styles.font].join(' ')}
      style={{backgroundColor: '#252f3e'}}
      type="button"
      onClick={onClick}
    >
      {text}
    </button>
  )
}

export default Button;
