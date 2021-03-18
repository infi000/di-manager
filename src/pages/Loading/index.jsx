/* eslint-disable */
import React from 'react';
import styles from './index.scss';

const Loading = ({ error, pastDelay }) => {
  if (error) {
    return (
      <div className={styles.error}>
        <h2>ERROR</h2>
        <p>{error.message}</p>
      </div>
    );
  }
  if (pastDelay) {
    return <div className={styles.loading} />;
  }
  return null;
};

export default Loading;
