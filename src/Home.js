import { useEffect, useState } from "react";
import styled from "styled-components";
import Countdown from "react-countdown";
import { Button, CircularProgress, Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

import { LAMPORTS_PER_SOL } from "@solana/web3.js";

import { useWallet } from "@solana/wallet-adapter-react";
import { WalletDialogButton } from "@solana/wallet-adapter-material-ui";
import './Home.css';

import {
  awaitTransactionSignatureConfirmation,
  getCandyMachineState,
  mintOneToken,
  shortenAddress,
} from "./candy-machine";

const ConnectButton = styled(WalletDialogButton)``;

const CounterText = styled.span``; // add your styles here

const MintContainer = styled.div``; // add your styles here

const MintButton = styled(Button)``; // add your styles here

const Home = (props) => {
  const [, setBalance] = useState();
  const [xolosRemaining, setXolosRemaining] = useState(100); // default 6666
  const [isActive, setIsActive] = useState(false); // true when countdown completes
  const [isSoldOut, setIsSoldOut] = useState(false); // true when items remaining is zero
  const [isMinting, setIsMinting] = useState(false); // true when user got to press MINT

  const [alertState, setAlertState] = useState({
    open: false,
    message: "",
    severity: undefined,
  });

  const [startDate, setStartDate] = useState(new Date(props.startDate));

  const wallet = useWallet();
  const [candyMachine, setCandyMachine] = useState();

  const onMint = async () => {
    try {
      setIsMinting(true);
      if (wallet.connected && candyMachine?.program && wallet.publicKey) {
        const mintTxId = await mintOneToken(
          candyMachine,
          props.config,
          wallet.publicKey,
          props.treasury
        );

        const status = await awaitTransactionSignatureConfirmation(
          mintTxId,
          props.txTimeout,
          props.connection,
          "singleGossip",
          false
        );

        if (!status?.err) {
          setAlertState({
            open: true,
            message: "Congratulations! you have mint XOLOS!",
            severity: "success",
          });
        } else {
          setAlertState({
            open: true,
            message: "Mint failed! Please try again!",
            severity: "error",
          });
        }
      }
    } catch (error) {
      // TODO: blech:
      let message = error.msg || "Minting failed! Please try again!";
      if (!error.msg) {
        if (error.message.indexOf("0x138")) {
        } else if (error.message.indexOf("0x137")) {
          message = `XOLOS already sold out!, Sorry mate...`;
        } else if (error.message.indexOf("0x135")) {
          message = `Insufficient SOL to mint. Please fund your wallet.`;
        }
      } else {
        if (error.code === 311) {
          message = `SOLD OUT!`;
          setIsSoldOut(true);
        } else if (error.code === 312) {
          message = `Minting period hasn't started yet, please wait!`;
        }
      }

      setAlertState({
        open: true,
        message,
        severity: "error",
      });
    } finally {
      if (wallet?.publicKey) {
        const balance = await props.connection.getBalance(wallet?.publicKey);
        setBalance(balance / LAMPORTS_PER_SOL);
      }
      setIsMinting(false);
    }
  };

  useEffect(() => {
    (async () => {
      if (wallet?.publicKey) {
        const balance = await props.connection.getBalance(wallet.publicKey);
        setBalance(balance / LAMPORTS_PER_SOL);
      }
    })();
  }, [wallet, props.connection]);

  useEffect(() => {
    (async () => {
      if (
        !wallet ||
        !wallet.publicKey ||
        !wallet.signAllTransactions ||
        !wallet.signTransaction
      ) {
        return;
      }

      const anchorWallet = {
        publicKey: wallet.publicKey,
        signAllTransactions: wallet.signAllTransactions,
        signTransaction: wallet.signTransaction,
      };

      const { candyMachine, goLiveDate, itemsRemaining } =
        await getCandyMachineState(
          anchorWallet,
          props.candyMachineId,
          props.connection
        );

      setXolosRemaining(itemsRemaining);
      setIsSoldOut(itemsRemaining === 0);
      setStartDate(goLiveDate);
      setCandyMachine(candyMachine);
    })();
  }, [wallet, props.candyMachineId, props.connection]);

  return (
    <main className={[props.className, 'home-container flex flex-col items-center'].join(' ')}>
      {!wallet.connected &&
         <p className='text-lg font-bold text-white text-opacity-90 text-center'>XOLOS Will be minting soon!</p>
      }

      {wallet.connected && xolosRemaining !== 0 &&
        <>
          <p className='text-lg font-bold text-white text-opacity-90 mb-4'>Hurry up! just {xolosRemaining} Xolos remaining!</p>
          {/* <p className='text-lg font-bold text-white text-opacity-90 mb-4'>Only {penguinsRemaining} out of 6,666 remaining!</p> */}
        </>
      }

      {wallet.connected && (
        <p className='mt-4 text-lg font-bold text-white text-opacity-90'>Connected as {shortenAddress(wallet.publicKey?.toBase58() || "")}</p>
      )}

      {/* {wallet.connected && (
        <p>Balance: {(balance || 0).toLocaleString()} SOL</p>
      )} */}

      <MintContainer className='mt-6'>
        {!wallet.connected ? (
          <ConnectButton>Connect Wallet</ConnectButton>
        ) : (
          <MintButton
            disabled={isSoldOut || isMinting || !isActive}
            // disabled
            onClick={onMint}
            variant="contained"
          >
            {isSoldOut ? (
              "SOLD OUT"
            ) : isActive ? (
              isMinting ? (
                <CircularProgress />
              ) : (
                "Mint your Swaggy XOLOS! "
              )
            ) : (
              <Countdown
                date={startDate}
                onMount={({ completed }) => completed && setIsActive(true)}
                onComplete={() => setIsActive(true)}
                renderer={renderCounter}
              />
            )}
          </MintButton>
        )}
      </MintContainer>

      <Snackbar
        open={alertState.open}
        autoHideDuration={6000}
        onClose={() => setAlertState({ ...alertState, open: false })}
      >
        <Alert
          onClose={() => setAlertState({ ...alertState, open: false })}
          severity={alertState.severity}
        >
          {alertState.message}
        </Alert>
      </Snackbar>
    </main>
  );
};

const renderCounter = ({ days, hours, minutes, seconds, completed }) => {
  return (
    <CounterText>
      {days} days, {hours} hours, {minutes} minutes, {seconds} seconds
    </CounterText>
  );
};

export default Home;