import { NetworkInfo, WalletProvider } from '@terra-money/wallet-provider';
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'


const mainnet = {
    name: 'mainnet',
    chainID: 'columbus-4',
    lcd: 'https://lcd.terra.dev',
};
  
const testnet = {
    name: 'testnet',
    chainID: 'tequila-0004',
    lcd: 'https://tequila-lcd.terra.dev',
};
  
const localnet = {
    name: 'localnet',
    chainID: 'localterra',
    lcd: 'http://localhost:1317'
}

const walletConnectChainIds: Record<number, NetworkInfo> = {
    0: testnet,
    1: mainnet,
    2: localnet
};
ReactDOM.render(
    <React.StrictMode>
        <WalletProvider
            defaultNetwork={testnet}
            walletConnectChainIds={walletConnectChainIds}
        >
            <App />
        </WalletProvider>
    </React.StrictMode>,
    document.getElementById('root'),
)