import "./App.css";
import { useMemo } from "react";

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
                  <div className="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left">
                    <p className='title text-2xl font-bold'>Today, we proudly present <span className='font-bold'>XOLOS</span>, the most Swaggy NFT ever!</p>
                    <p className='mt-3'>
                      Each of xolos are unique and hand drawn by World Class Artist on the Solana blockchain. All 8.000 Xolos have very distinctive personalities and create a huge and diverse community. 
                    </p>
                    <p className='mt-3'>
                      Xolos are fun, quirky and eccentric and have now adapted so much that each of them is unique and rare.
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
                  </div>
                  {/* Right Col */}
                  <div className="w-full md:w-3/5 text-center">
                    <img className="w-full md:w-5/5 z-50" alt="xolos" src="/xolos.gif" />
                  </div>
                </div>
              </div>
            </section>
            <section className='section what'>
              <p className='text-2xl font-bold uppercase'>What is Xolos?</p>
              <p className='mt-3'>
                Xolos the axolotls lived in the deep waters of the Valley of Mexico for a long time. As the surface world started to change so did their underwater world. Their wild populations were put into heavy pressure by the growth of Mexico City, so they emerged to see what was happening and people were amazed by their very special characteristics. They now live throughout the world and have a very wide range of styles and personalities. 
              </p>
            </section>
            <section className='section team'>
              <p className='text-2xl font-bold uppercase'>Who are the Team behind it</p>
              
              <p className='mt-3 font-bold'>
                VICTOR _ THE EBORN
              </p>
              <p className='mt-3'>
                Technology has been a part of Vic’s life since he was 2. He knows how to move around computers but also has a particular ability to lure you into anything he wants. Beware. He can sell you any idea. 
              </p>

              <p className='mt-3 font-bold'>
                HENOC _ THE PASSIONATE CREATIVE
              </p>
              <p className='mt-3'>
                His life rolls around creating new stuff. He sketches on napkins. And that says it all. He is a Sneaker Head and Designer, hence all Xolos only wear sneakers. 
              </p>

              <p className='mt-3 font-bold'>
                STEFY _ THE CRAZY MASTER MIND
              </p>
              <p className='mt-3'>
                She’s all about visuals. Photography, colors and composition are her specialty. Hyperactive she never stops. She is also a perfectionist and environmentally conscious. 
              </p>

              <p className='mt-3 font-bold'>
                YONATHAN _ THE WIZARD OF TECH
              </p>
              <p className='mt-3'>
                The man behind curtain, whom make xolos alive on solana.
              </p>
            </section>
            <section className='section rarity'>
            </section>
            <section className='section where-buy'>
              <p className='text-2xl font-bold uppercase'>
                Our Roadmap
              </p>
              <p className='mt-6 text-lg'>Once minting is done, XOLOS will soon be available on:</p>
              <div className='flex flex-row flex-wrap'>
                <div class="flex flex-row items-center mt-6 mr-8">
                  <img src="/digitaleyes.svg" class="logo-exchange" alt="digital eyes"/><p class="text-3xl font-bold ml-1 black">DigitalEyes</p>
                </div>
                {/* <div class="flex flex-row items-center mt-6 mr-8">
                  <img src="/digitaleyes.svg" class="logo-exchange" alt="digital eyes"/><p class="text-3xl font-bold ml-1">DigitalEyes</p>
                </div>
                <div class="flex flex-row items-center mt-6 mr-8">
                  <img src="/solsea.svg" class="logo-exchange" alt="digital eyes"/><p class="text-3xl font-bold ml-1">DigitalEyes</p>
                </div>
                <img src='/solanart.webp' className='logo-exchange mt-6' alt='Solanart'/>
                <img src='/solsea.svg' className='logo-exchange mt-6' alt='Sol Sea'/> */}
              </div>
            </section>
            <section className='section where-buy'>
              <p className='text-2xl font-bold uppercase'>Q1 2022</p>
              <p className='mt-6 text-lg'>XOLOS DAO</p>
            </section>
            <section className='section where-buy'>
              <p className='text-2xl font-bold uppercase'>Q2 2022</p>
              <p className='mt-6 text-lg'>XOLOS Mini games</p>
            </section>
            <section className='section faq'>
              FAQ
              <p className='text-xl font-bold mt-6'>What is the mint price for a XOLOS?</p>
              <p className='text-lg mt-1'>Mint price is 1 SOL + transaction fee (around 0.0005 SOL).</p>

              <p className='text-xl font-bold mt-6'>What is the total supply of XOLOS?</p>
              <p className='text-lg mt-1'>8.000</p>

              <p className='text-xl font-bold mt-6'>Where can I view my XOLOS?</p>
              <p className='text-lg mt-1'>We recommend Phantom wallet. Click on the NFT tab in either wallet and you'll see your XOLOS</p>
            </section>
            <Footer />
          </div>
        </WalletDialogProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default App;