import React, { useMemo } from "react";
// Import necessary modules and components
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import Head from "next/head"; // Import Head from next
import "../styles/globals.css";
import type { AppProps } from "next/app";
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

// import the styles
require("@solana/wallet-adapter-react-ui/styles.css");

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
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
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets}>
        <WalletModalProvider>
          <QueryClientProvider client={queryClient}>
            <ChakraProvider>
              <Head>
                {/* SEO tags */}
                <title>Empowering Web3 Website Management on Solana</title>
                <meta
                  name="description"
                  content="Welcome to Trusty Pass - Your Gateway to Seamless Website Management in the Web3 Era. Revolutionize your online presence with Trusty Pass, a state-of-the-art Web3 website manager built on the lightning-fast Solana blockchain."
                />
                <meta
                  property="og:title"
                  content="Empowering Web3 Website Management on Solana"
                />
                <meta
                  property="og:description"
                  content="Welcome to Trusty Pass - Your Gateway to Seamless Website Management in the Web3 Era. Revolutionize your online presence with Trusty Pass, a state-of-the-art Web3 website manager built on the lightning-fast Solana blockchain."
                />
                <meta property="og:type" content="website" />
              </Head>
              <Component {...pageProps} />
            </ChakraProvider>
          </QueryClientProvider>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default MyApp;
