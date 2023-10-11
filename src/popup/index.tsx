import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { useEffect, useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import Vault from "../components/Vault";
import "../styles/Popup.module.css";
import styles from "../styles/Popup.module.css";

const queryClient = new QueryClient();

export interface VaultItem {
  website: string;
  username: string;
  password: string;
}

function Home() {
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

  const handleOpenNewTab = () => {
    // Open a new tab with specified URL
    window.open("popup.html", "_blank");
  };
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <div className={styles.popup_container}>
          <main className={"input-container"}>
            <div onClick={handleOpenNewTab}> Open </div>

            {step === "register" && (
              <RegisterForm setStep={setStep} setVaultKey={setVaultKey} />
            )}
            {step === "login" && (
              <LoginForm
                setVault={setVault}
                setStep={setStep}
                setVaultKey={setVaultKey}
              />
            )}
            {step === "vault" && <Vault vault={vault} vaultKey={vaultKey} />}
          </main>
        </div>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default Home;
