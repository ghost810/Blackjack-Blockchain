import React, { useState, useEffect } from 'react';
import styles from './styles/Controls.module.css';

type ControlsProps = {
  amount: number,
  gameState: number,
  buttonState: any,
  betEvent: any,
  hitEvent: any,
  standEvent: any,
  resetEvent: any
};

const Controls: React.FC<ControlsProps> = ({ amount, gameState, buttonState, betEvent, hitEvent, standEvent, resetEvent }) => {
  const [betAmount, setBetAmount] = useState(10);
  const [inputStyle, setInputStyle] = useState(styles.input);

  useEffect(() => {
    validation();
  }, [betAmount, amount]);

  const validation = () => {
    if (betAmount > amount) {
      setInputStyle(styles.inputError);
      return false;
    }
    if (betAmount < 0.01) {
      setInputStyle(styles.inputError);
      return false;
    }
    setInputStyle(styles.input);
    return true;
  }

  const amountChange = (e: any) => {
    setBetAmount(e.target.value);
  }

  const onBetClick = () => {
    if (validation()) {
      betEvent(Math.round(betAmount * 100) / 100);
    }
  }

  const getControls = () => {
    if (gameState === 0) {
      return (
        <div className={styles.controlsContainer}>
          <div className={styles.betContainer}>
            <h4>Amount:</h4>
            <input autoFocus type='number' value={betAmount} onChange={amountChange} className={inputStyle} />
          </div>
          <button onClick={() => onBetClick()} className={styles.button}>Bet</button>
        </div>
      );
    }
    else {
      return (
        <div className={styles.controlsContainer}>
          <button onClick={() => hitEvent()} disabled={buttonState.hitDisabled} className={styles.button}  style={{fontSize: '1.2em'}}>Hit</button>
          <button onClick={() => standEvent()} disabled={buttonState.standDisabled} className={styles.button} style={{fontSize: '1.2em'}}>Stand</button>
          <button onClick={() => resetEvent()} disabled={buttonState.resetDisabled} className={styles.button} style={{fontSize: '1.2em'}}>Reset</button>
        </div>
      );
    }
  }

  return (
    <>
      {getControls()}
    </>
  );
}

export default Controls;