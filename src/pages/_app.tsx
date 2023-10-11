// Import necessary modules and components
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import Head from "next/head"; // Import Head from next
import "../styles/globals.css";
import type { AppProps } from "next/app";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
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
  );
}

export default MyApp;
