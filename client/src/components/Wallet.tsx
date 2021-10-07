import React, {useEffect, useMemo, useState} from 'react';
import SendUST from './SendUST';
import { LCDClient } from '@terra-money/terra.js';
import { useWallet, WalletStatus, useConnectedWallet, TxResult } from '@terra-money/wallet-provider';
import styles from './styles/Controls.module.css';

type bProps = {
  amount: number;
  setAmount(val : number): void;
};

const Wallet: React.FC<bProps> = ({amount, setAmount}) => {
  const [balance, setBalance] = useState<null | string>();
  const [txResult, setTxResult] = useState<null | TxResult>(null);
    const {
      status,
      // network,
      wallets,
      availableConnectTypes,
      availableInstallTypes,
      connect,
      install,
      disconnect,
    } = useWallet();
   
    const connectedWallet = useConnectedWallet();
    const lcd = useMemo(() => {
      if (!connectedWallet) {
        return null;
      }

      return new LCDClient({
        URL: connectedWallet.network.lcd,
        chainID: connectedWallet.network.chainID,
      });
    }, [connectedWallet]);


    useEffect(() => {
      // show wallet balance
     console.log('amount', amount);
    }, [amount]);


    useEffect(() => {
      // show wallet balance
      if (connectedWallet && lcd) {
        lcd.bank.balance(connectedWallet.walletAddress).then((coins) => {
          setTimeout(() => {
            setBalance((coins['_coins']['uusd']['amount']/1000000).toFixed(2) + " USD");
          }, 1000);
        });
      } else {
        setBalance(null);
      }
    }, [connectedWallet, lcd, txResult]);

    return (
      <div>
        <main
            style={{ margin: 20, display: 'flex', flexDirection: 'column', gap: 40, width: '100wh'}}
        >
          {/* connect wallet started  */}
          <div>
            <h1>Connect Wallet</h1>
            <section>
              <h3> { wallets.length !== 0 && "Connected terra wallet address: "+wallets[0].terraAddress } </h3>
            </section>

            <footer>
              {status === WalletStatus.WALLET_NOT_CONNECTED && (
                <>
                  {availableInstallTypes.map((connectType) => (
                    <button
                      key={'install-' + connectType}
                      className={styles.button}
                      onClick={() => install(connectType)}
                    >
                      Install {connectType}
                    </button>
                  ))}
                  {
                    <>
                      <button 
                        key={'connect-' + availableConnectTypes[1]}
                        className={styles.button}
                        onClick={() => connect(availableConnectTypes[1])}
                      > Connect Chrome Extension</button>
                      <button 
                        key={'connect-' + availableConnectTypes[2]}
                        className={styles.button}
                        onClick={() => connect(availableConnectTypes[2])}
                      > Connect Mobile Wallet</button>
                    </>
                  }
                </>
              )}
              {status === WalletStatus.WALLET_CONNECTED && (
                <button onClick={() => disconnect()} className={styles.button}>Disconnect</button>
              )}
            </footer>
          </div>
          {/* connect wallet ended */}

          {/* balance show sector started */}
          <div>
            <h1>Current Balance</h1>
            <h3> Your Score: {amount} </h3>
            <h3> { balance && <pre>UST: {balance}</pre> } </h3>
            {!connectedWallet && <p>Wallet not connected!</p>}
          </div>
          {/* balance show sector ended */}

          <SendUST amount={amount} setAmount={setAmount} txResult={txResult} setTxResult={setTxResult} />
        </main>
      </div>
    );
}

export default Wallet;