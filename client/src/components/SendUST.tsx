import { MsgSend, StdFee } from '@terra-money/terra.js';//BankAPI, 
import { getAmount } from '../API';
import {
  CreateTxFailed,
  Timeout,
  TxFailed,
  TxResult,
  TxUnspecifiedError,
  useConnectedWallet,
  UserDenied,
  useWallet,
} from '@terra-money/wallet-provider';
import React, { useCallback, useState } from 'react';
import styles from './styles/Controls.module.css';

// you have to change this to Address to your wallet A address
const toAddress = 'terra1k9cq2x6w5extppxzvmmd3dwy5fld80wal4f93e';
type bProps = {
  amount: number;
  setAmount(val : number): void;
  txResult: TxResult | null;
  setTxResult(val: TxResult | null): void;
};

const SendUST: React.FC<bProps> = ({ amount, setAmount, txResult, setTxResult }) => {
  const [txError, setTxError] = useState<string | null>(null);
  const { wallets } = useWallet();
  const connectedWallet = useConnectedWallet();

  const send = useCallback(() => {
    if (!connectedWallet) {
      return;
    }

    setTxResult(null);

    connectedWallet
      .post({
        fee: new StdFee(1000000, '1000000uusd'), // gas, amount gas/amount = gas price
        msgs: [
          new MsgSend(connectedWallet.walletAddress, toAddress, {
            uusd: 100000000,
          }),
        ],
      })
      .then((nextTxResult: TxResult) => {
        getAmount(wallets[0].terraAddress)
          .then(({data:{ balance }}: IBalance | any) => {
            console.log("fetch " + balance.amount)
            setAmount(Math.round(Number(balance.amount)+100));
          })
          .catch((err) => console.log(err));
        console.log('---------', amount)
        // setAmount(Math.round(amount + 100));
        setTxResult(nextTxResult);
      })
      .catch((error: unknown) => {
        if (error instanceof UserDenied) {
          setTxError('User Denied');
        } else if (error instanceof CreateTxFailed) {
          console.log("Create Transaction Failed!");
          setTxError('Create Tx Failed: ' + error.message);
        } else if (error instanceof TxFailed) {
          setTxError('Tx Failed: ' + error.message);
        } else if (error instanceof Timeout) {
          setTxError('Timeout');
        } else if (error instanceof TxUnspecifiedError) {
          setTxError('Unspecified Error: ' + error.message);
        } else {
          setTxError(
            'Unknown Error: ' +
              (error instanceof Error ? error.message : String(error)),
          );
        }
      });
  }, [connectedWallet]);

  return (
    <div>
      <h1>Send to sever wallet</h1>
      {connectedWallet?.availablePost && !txResult && !txError && (
        <button onClick={send} className={styles.button}>Send 100UST to play</button>
      )}
      {txResult && (
        <>
          {/* <pre>{JSON.stringify(txResult, null, 2)}</pre> */}
          <pre>{ 'Successed transaction!' }</pre>
          <button onClick={() => { setTxResult(null); }} className={styles.button}>Clear Tx Result</button>
        </>
      )}
      {txError && (
        <>
          <pre>{txError}</pre>
          <button onClick={() => setTxError(null)} className={styles.button}>Clear Tx Error</button>
          <button onClick={() => setTxResult(null)} className={styles.button}>Clear Tx Result</button>
        </>
      )}
      {!connectedWallet && <p>Wallet not connected!</p>}
      {connectedWallet && !connectedWallet.availablePost && (
        <p>Can not post Tx</p>
      )}
    </div>
  );
}

export default SendUST;