import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { loginUser, registerUser } from "../api";
import { decryptVault, generateVaultKey, hashPassword } from "../crypto";
import { VaultItem } from "../pages";
import FormWrapper from "./FormWrapper";
import styles from "../styles/Popup.module.css";

function LoginForm({
  setVault,
  setVaultKey,
  setStep,
}: {
  setVault: Dispatch<SetStateAction<VaultItem[]>>;
  setVaultKey: Dispatch<SetStateAction<string>>;
  setStep: Dispatch<SetStateAction<"login" | "register" | "vault">>;
}) {
  const {
    handleSubmit,
    register,
    getValues,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<{ email: string; password: string; hashedPassword: string }>();

  const mutation = useMutation(loginUser, {
    onSuccess: ({ salt, vault }) => {
      const hashedPassword = getValues("hashedPassword");

      const email = getValues("email");

      const vaultKey = generateVaultKey({
        hashedPassword,
        email,
        salt,
      });

      window.sessionStorage.setItem("vk", vaultKey);

      const decryptedVault = decryptVault({ vault, vaultKey });

      setVaultKey(vaultKey);
      setVault(decryptedVault);

      window.sessionStorage.setItem("vault", JSON.stringify(decryptedVault));

      setStep("vault");
    },
  });

  return (
    <div className={styles.RegisterForm}>
      <FormWrapper
        onSubmit={handleSubmit(() => {
          const password = getValues("password");
          const email = getValues("email");

          const hashedPassword = hashPassword(password);

          setValue("hashedPassword", hashedPassword);

          mutation.mutate({
            email,
            hashedPassword,
          });
        })}
      >
        <header>Login</header>

        <input
          id="email"
          placeholder="Email"
          {...register("email", {
            required: "Email is required",
            minLength: {
              value: 4,
              message: "Email must be 4 characters long",
            },
          })}
        />

        <p className={styles.error}>{errors.email && errors.email.message}</p>

        <input
          id="password"
          placeholder="Password"
          type="password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be 6 characters long",
            },
          })}
        />

        <p className={styles.error}>
          {errors.password && errors.password.message}
        </p>

        <button type="submit">Login</button>
      </FormWrapper>
    </div>
  );
}

export default LoginForm;
