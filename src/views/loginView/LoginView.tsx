import { useContext } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useLazyQuery } from "@apollo/client";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import styles from "./LoginView.module.scss";
import { SIGNIN } from "../../servises/queries/signInQuery";
import { userContext } from "../../context/userContext";
import { inputError } from "../../utils/inputError";
import { toast } from "react-toastify";
import {
  emailInputSettings,
  passwordInputSettings,
} from "../../utils/inputHookFormSettings";
import { wsLink } from "../../servises/client";

export default function LoginView() {
  const { setUser, setToken } = useContext(userContext);
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ mode: "all" });
  const [email, password] = watch(["email", "password"]);
  const [signIn, { loading }] = useLazyQuery(SIGNIN, {
    onCompleted: (data) => {
      setToken(data.signIn.token);
      // @ts-ignore
      wsLink.subscriptionClient.close();
      setUser(data.signIn.user);
      reset();
    },
    onError: (error) => {
      toast.error(error.message, {
        theme: "colored",
      });
    },
  });

  const formSubmit = () => {
    signIn({
      variables: { email, password },
    });
  };

  if (loading) {
    return <h1 className={styles.loading}>Loading...</h1>;
  }

  return (
    <>
      <h1 className={styles.title}>Wellcome</h1>
      <form onSubmit={handleSubmit(formSubmit)} className={styles.form}>
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

        <div className={styles.btnLinkContainer}>
          <Link to="/register" className={styles.link}>
            Registration
          </Link>

          <div className={styles.button}>
            <Button color="primary" type="submit">
              Login
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}
