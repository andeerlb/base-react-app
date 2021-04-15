import React, { useState, useCallback  } from 'react';
import styles from './SearchBox.module.css';
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import debounce from 'lodash.debounce';

const debounceFunc = (debounceTime) => {
  return debounce((val, onSearch) => {
    onSearch(val)
  }, debounceTime);
};

function SearchBox ( { onSearch = () => {}, enableDebounce = false, debounceTime = 500}) {
  let debouncedSave = useCallback(debounceFunc(debounceTime), []);
  let id = new Date().getTime();
  const [value, setValue] = useState("");

  const handleKeyPress = (event) => {
    if(enableDebounce || !onSearch) return;
    if(event.key === 'Enter'){
      onSearch(value);
    }
  }

  return (
    <div id={styles.container}>
      <input id={id} type="text" className={styles.searchBox}
          onChange={e => {
            let val = e.target.value;
            setValue(val);
            if(enableDebounce) {
		          debouncedSave(val, onSearch);
            }
          }} name="q"
          onKeyPress={handleKeyPress}
          />
      <label htmlFor={id} className={styles.searchIcon} onClick={() => !enableDebounce && onSearch && onSearch(value)}>
        <FontAwesomeIcon icon={faSearch} size={'1x'}  />
      </label>
    </div>
  )
}

export default SearchBox;
