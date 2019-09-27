import react from 'react';

import styles from './index.less';

export default function App () {
  return (
    <>
      <div className={styles.localTheme}>local theme</div>
      <div className={styles.cdnTheme}>cdn theme</div>
    </>
  );
}