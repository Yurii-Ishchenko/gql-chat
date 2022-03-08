import { useContext } from "react";
import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import styles from "./RegisterView.module.scss";
import { REGISTER } from "../../servises/queries/registerQuery";
import { userContext } from "../../context/userContext";
import { inputError } from "../../utils/inputError";
import AvatarInput from "../../components/AvatarInput/AvatarInput";

import {
  emailInputSettings,
  passwordInputSettings,
  loginInputSettings,
  notBeEmptyInputSettings,
  repeatPasswordInputSettings,
} from "../../utils/inputHookFormSettings";
export default function RegisterView() {
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ mode: "all" });
  const { setUser, setToken } = useContext(userContext);

  const [email, password, login, avatar] = watch([
    "email",
    "password",
    "login",
    "avatar",
  ]);
  const [registration, { loading }] = useMutation(REGISTER, {
    onCompleted: (data) => {
      setUser(data.registration.user);
      setToken(data.registration.token);
      reset();
    },
    onError: (error) => {
      toast.error(error.message, {
        theme: "colored",
      });
    },
  });
  const formSubmit = () => {
    registration({
      variables: {
        avatar,
        email,
        password,
        login,
      },
    });
  };

  if (loading) {
    return <h1 className={styles.loading}>Loading...</h1>;
  }

  return (
    <>
      <h1 className={styles.title}>Registration</h1>
      <form onSubmit={handleSubmit(formSubmit)} className={styles.form}>
        <Input
          type="text"
          label="Login"
          error={inputError(errors, "login")}
          {...register("login", loginInputSettings)}
        />

        <Input
          error={inputError(errors, "email")}
          type="text"
          label="Email"
          {...register("email", emailInputSettings)}
        />

        <Input
          error={inputError(errors, "password")}
          type="password"
          label="Password"
          {...register("password", passwordInputSettings)}
        />

        <Input
          error={inputError(errors, "repeatPassword")}
          type="password"
          label="Repeat password"
          {...register("repeatPassword", repeatPasswordInputSettings(password))}
        />

        <div className={styles.avatar_input}>
          <AvatarInput
            {...register("avatar", notBeEmptyInputSettings)}
            error={inputError(errors, "avatar")}
            type="text"
            label="url"
            url={avatar}
          />
        </div>
        <div className={styles.buttonContainer}>
          <Button type="submit">Register</Button>
        </div>
      </form>
    </>
  );
}
