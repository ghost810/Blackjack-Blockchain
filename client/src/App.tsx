import React, { useEffect, useState } from 'react'
import { getAmount, updateAmount } from './API'
import { useWallet, WalletStatus } from '@terra-money/wallet-provider';
import Wallet from './components/Wallet';
import BlackJack from './components/BlackJack'

const App: React.FC = () => {
  const [amount, setAmount] = useState<number>(0);
  const { status, wallets } = useWallet();

  useEffect(() => {
    console.log("effect " + amount, status, wallets[0]?.terraAddress);
    status === WalletStatus.WALLET_CONNECTED && saveAmount(wallets[0].terraAddress, amount);
  }, [amount])

  useEffect(() => {
    console.log("status " + amount, status, wallets[0]?.terraAddress);
    (status === WalletStatus.WALLET_NOT_CONNECTED) ? setAmount(0): wallets[0] && fetchAmount(wallets[0].terraAddress);
  }, [status]);

  const saveAmount = (addr: string, amt: number) :void => {
    updateAmount(addr, amt)
    .then((({ status }: IBalance | any) => {
      if (status !== 201) {
        throw new Error('Error! Balance not saved')
      }
    }))
    .catch((err) => console.log(err));
  };

  const fetchAmount = (addr : string): void => {
    getAmount(addr)
    .then(({data:{ balance }}: IBalance | any) => {
      console.log("fetch " + balance.amount)
      setAmount(balance.amount);
    })
    .catch((err) => console.log(err));
  };

  return (
    <main className='App'>
      <>
        <div style={{ display: 'flex', flexDirection: 'row'}}>
          <div style={{ flex: 7}}>
            <BlackJack amount={amount} setAmount={setAmount}/>
          </div>
          <div style={{ flex: 4}}>
            <Wallet amount={amount} setAmount={setAmount}/>
          </div>
        </div>
      </>
    </main>
  )
}

export default App
