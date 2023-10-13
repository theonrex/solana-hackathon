// Import necessary modules and components
import React, { useMemo } from "react";
import Head from "next/head";
import { useEffect, useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import Vault from "../components/Vault";
// import styles from "../styles/Home.module.css";
import { useWallet } from "@solana/wallet-adapter-react";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { clusterApiUrl } from "@solana/web3.js";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  // GlowWalletAdapter,
  LedgerWalletAdapter,
  PhantomWalletAdapter,
  // SlopeWalletAdapter,
  SolflareWalletAdapter,
  // SolletExtensionWalletAdapter,
  // SolletWalletAdapter,
  TorusWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import "../styles/Popup.module.css";
import styles from "../styles/Popup.module.css";
import dynamic from "next/dynamic";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
// import the styles
require("@solana/wallet-adapter-react-ui/styles.css");

// const WalletMultiButton = dynamic(
//   () =>
//     import("@solana/wallet-adapter-react-ui").then(
//       (mod) => mod.WalletMultiButton
//     ),
//   {
//     ssr: false,
//   }
// );
const queryClient = new QueryClient();

export interface VaultItem {
  website: string;
  username: string;
  password: string;
}

function Home() {
  const { publicKey } = useWallet();
  const [isConnected, setIsConnected] = useState(false);

  // // Set isConnected state when publicKey changes
  useEffect(() => {
    setIsConnected(publicKey !== null);
  }, [publicKey]);
  // State variables to manage the current step and vault data
  const [step, setStep] = useState<"login" | "register" | "vault">("register");
  const [vault, setVault] = useState<VaultItem[]>([]);
  const [vaultKey, setVaultKey] = useState("");

  useEffect(() => {
    const vault = window.sessionStorage.getItem("vault");
    const vaultKey = window.sessionStorage.getItem("vk");

    if (vault) {
      setVault(JSON.parse(vault));
    }

    if (vaultKey) {
      setVaultKey(vaultKey);
      setStep("vault");
    }
  }, []);
  // Function to handle the Register button click
  const handleRegisterClick = () => {
    setStep("register"); // Set the step to "register" when the user clicks Register
  };

  // Function to handle the Login button click
  const handleLoginClick = () => {
    setStep("login"); // Set the step to "login" when the user clicks Login
  };

  const handleOpenNewTab = () => {
    // Open a new tab with specified URL
    window.open("popup.html", "_blank");
  };

  // you can use Mainnet, Devnet or Testnet here
  const solNetwork = WalletAdapterNetwork.Mainnet;
  const endpoint = useMemo(() => clusterApiUrl(solNetwork), [solNetwork]);
  // initialise all the wallets you want to use
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      // new GlowWalletAdapter(),
      // new SlopeWalletAdapter(),
      // new SolflareWalletAdapter({ solNetwork }),
      new TorusWalletAdapter(),
      new LedgerWalletAdapter(),
      // new SolletExtensionWalletAdapter(),
      // new SolletWalletAdapter(),
    ],
    [solNetwork]
  );
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <ConnectionProvider endpoint={endpoint}>
          <WalletProvider wallets={wallets}>
            <WalletModalProvider>
              <div className={styles.popup_container}>
                <main className={styles.main}>
                  {/* <div onClick={handleOpenNewTab}> Open </div> */}

                  {isConnected ? (
                    <div>
                      {/* Render components based on the current step */}
                      {step === "register" && (
                        <div className={styles.mainDiv}>
                          <RegisterForm
                            setStep={setStep}
                            setVaultKey={setVaultKey}
                          />
                          <p className={styles.account}>
                            {" "}
                            Already have an account?{" "}
                          </p>
                          <button
                            onClick={handleLoginClick}
                            className={styles.handleLoginClick}
                          >
                            Login
                          </button>
                        </div>
                      )}
                      {step === "login" && (
                        <div>
                          <LoginForm
                            setVault={setVault}
                            setStep={setStep}
                            setVaultKey={setVaultKey}
                          />
                          <p className={styles.account}> No account? </p>

                          <button
                            onClick={handleRegisterClick}
                            className={styles.handleRegisterClick}
                          >
                            Register
                          </button>
                        </div>
                      )}
                      {step === "vault" && (
                        <Vault vault={vault} vaultKey={vaultKey} />
                      )}
                    </div>
                  ) : (
                    <div className={styles.multiWalletDiv}>
                      <h1>Trusty Pass</h1>
                      <p>
                        Revolutionize your online presence with Trusty Pass, a
                        state-of-the-art Web3 website manager built on the
                        lightning-fast Solana blockchain.
                      </p>
                      <div className={styles.WalletMultiButton_btn}>
                        <WalletMultiButton />
                      </div>
                    </div>
                  )}
                </main>
              </div>
            </WalletModalProvider>
          </WalletProvider>
        </ConnectionProvider>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default Home;
