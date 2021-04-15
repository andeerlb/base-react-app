import React from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLongArrowAltLeft as backIcon } from '@fortawesome/free-solid-svg-icons'

import styles from './HeaderScreen.module.css';
import Button from '@/components/button/Button';

function HeaderScreen ({ title, onClickBack, onClickRightBtn, onClickRightBtnText }) {
  const { t, i18n  } = useTranslation();

  return (
    <div id={[styles.container].join(' ')}>
      <div className={['container'].join(' ')}>
        <div className={styles.wrapper}>
          {
            onClickBack &&
            <div className={styles.backButton} onClick={onClickBack}>
              <FontAwesomeIcon icon={backIcon} size={'2x'}  />
            </div>
          }
          <div>
            <h1 className={styles.title}>
              {t(title)}
              {
                onClickRightBtn &&
                <div className={styles.addButton}>
                  <Button text={t(onClickRightBtnText)} onClick={onClickRightBtn}/>
                </div>
              }
            </h1>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeaderScreen;
