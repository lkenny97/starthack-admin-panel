import React, {PropsWithChildren} from 'react';
import styles from './page.module.scss';

interface ContentProps {
}

const Content = ({children}: PropsWithChildren<ContentProps>) => {
  return (
    <div className={styles.content}>
      {children}
    </div>
  );
};

export default Content;