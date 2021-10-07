import React from 'react';
import styles from './styles/Status.module.css';

type StatusProps = {
  message: string,
  amount: number
};

const Status: React.FC<StatusProps> = ({ message, amount }) => {
  return (
    <div className={styles.statusContainer}>
      <div className={styles.status}>
        <h1 className={styles.value}>{message}</h1>
      </div>
      <div className={styles.balance}>
        <h1 className={styles.value}>${amount}</h1>
      </div>
    </div>
  );
}

export default Status;