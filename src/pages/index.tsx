// Import necessary modules and components
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import Vault from "../components/Vault";
import styles from "../styles/Home.module.css";
// import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import dynamic from "next/dynamic";

const WalletMultiButton = dynamic(
  () =>
    import("@solana/wallet-adapter-react-ui").then(
      (mod) => mod.WalletMultiButton
    ),
  {
    ssr: false,
  }
);
// Define the type for a single item in the vault
export interface VaultItem {
  website: string;
  username: string;
  password: string;
}

// Define the Home component
const Home: NextPage = () => {
  const { publicKey } = useWallet();
  const [isConnected, setIsConnected] = useState(false);

  // // Set isConnected state when publicKey changes
  useEffect(() => {
    setIsConnected(publicKey !== null);
  }, [publicKey]);
  // State variables to manage the current step and vault data
  const [step, setStep] = useState<"login" | "register" | "vault">("login");
  const [vault, setVault] = useState<VaultItem[]>([]);
  const [vaultKey, setVaultKey] = useState("");

  // Function to handle the Register button click
  const handleRegisterClick = () => {
    setStep("register"); // Set the step to "register" when the user clicks Register
  };

  // Function to handle the Login button click
  const handleLoginClick = () => {
    setStep("login"); // Set the step to "login" when the user clicks Login
  };

  // Render the component
  return (
    <div className={styles.container}>
      {/* Head section with title and meta information */}
      <Head>
        <title>Your App Title</title>
        <meta name="description" content="Description of your app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Main content section */}
      <main className={styles.main}>
        {isConnected ? (
          <div>
            {/* Render components based on the current step */}
            {step === "register" && (
              <div className={styles.mainDiv}>
                <RegisterForm setStep={setStep} setVaultKey={setVaultKey} />
                <p className={styles.account}> Already have an account? </p>
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
            {step === "vault" && <Vault vault={vault} vaultKey={vaultKey} />}
          </div>
        ) : (
          <div className={styles.multiWalletDiv}>
            <h1>Trusty Pass</h1>
            <p>
              Revolutionize your online presence with Trusty Pass, a
              state-of-the-art Web3 website manager built on the lightning-fast
              Solana blockchain.
            </p>
            <div className={styles.WalletMultiButton_btn}>
              <WalletMultiButton />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

// Export the Home component as the default export of this module
export default Home;
