import "./App.css";
import { useMemo } from "react";
import { Button } from "@material-ui/core";

import Home from "./Home";
import Header from './components/Header'
import Footer from './components/Footer'

import * as anchor from "@project-serum/anchor";
import { clusterApiUrl } from "@solana/web3.js";
import {
  getPhantomWallet,
  getSolflareWallet,
  getSolletWallet,
} from "@solana/wallet-adapter-wallets";

import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";

import { WalletDialogProvider } from "@solana/wallet-adapter-material-ui";

const treasury = new anchor.web3.PublicKey(
  process.env.REACT_APP_TREASURY_ADDRESS
);

const config = new anchor.web3.PublicKey(
  process.env.REACT_APP_CANDY_MACHINE_CONFIG
);

const candyMachineId = new anchor.web3.PublicKey(
  process.env.REACT_APP_CANDY_MACHINE_ID
);

const network = process.env.REACT_APP_SOLANA_NETWORK;

const rpcHost = process.env.REACT_APP_SOLANA_RPC_HOST;
const connection = new anchor.web3.Connection(rpcHost);

const startDateSeed = parseInt(process.env.REACT_APP_CANDY_START_DATE, 10);

const txTimeout = 30000; // milliseconds (confirm this works for your project)

const nftName = "Demo"; // Set your NFT name here

const App = () => {
  const endpoint = useMemo(() => clusterApiUrl(network), []);

  const wallets = useMemo(
    () => [getPhantomWallet(), getSolflareWallet(), getSolletWallet()],
    []
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletDialogProvider>
          <div className='app-container'>
            <section className='section main-section'>
              <Header />
              <div>
                <div className="container mx-auto flex flex-wrap flex-col md:flex-row items-center">
                  {/* Left Col */}
                  <div className="w-full md:w-3/5 justify-center text-center">
                    <img className="md:w-5/5 z-50" width="550px" alt="NFT name" src="/logo.png" />
                  </div>
                  {/* Right Col */}
                  <div className="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left">
                    <p className='title text-2xl font-bold'>Today, we proudly present <span className='font-bold'>{nftName}</span>, the most Swaggy NFT ever!</p>
                    <p className='mt-3'>
                      {nftName} are fun, quirky and eccentric and have now adapted so much that each of them is unique and rare.
                    </p>
                    <Home
                      className='mt-6'
                      candyMachineId={candyMachineId}
                      config={config}
                      connection={connection}
                      startDate={startDateSeed}
                      treasury={treasury}
                      txTimeout={txTimeout}
                    />
                    <Button variant="contained" className='mt-6 text-centered button'>
                      Another button
                    </Button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </WalletDialogProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default App;