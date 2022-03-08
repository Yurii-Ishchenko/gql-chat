import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { userContext } from "../../context/userContext";
import styles from "./MessageForm.module.scss";
import Button from "../Button/Button";
import { useMutation, useLazyQuery } from "@apollo/client";
import { toast } from "react-toastify";
import messageImage from "../../images/message_icon.svg";
import { CREATE_MESSAGE } from "../../servises/queries/createMessage";
import Textarea from "../Textarea/Textarea";
import { TYPING_USER } from "../../servises/queries/typingUser";

export default function MessageForm() {
  const { register, watch, handleSubmit, reset } = useForm({ mode: "all" });
  const [createMessage] = watch(["createMessage"]);
  const { activeConvId } = useContext(userContext);
  const [typingUser] = useLazyQuery(TYPING_USER, {
    variables: { convId: activeConvId },
  });
  const [createMessageFn] = useMutation(CREATE_MESSAGE, {
    onCompleted: () => {
      reset();
    },
    onError: (error) => {
      toast.error(error.message, {
        theme: "colored",
      });
    },
  });

  const formSubmit = () => {
    createMessageFn({
      variables: { description: createMessage, convId: activeConvId },
    });
  };

  useEffect(() => {
    if (!createMessage && !activeConvId) {
      return;
    }
    typingUser();
    /*eslint-disable-next-line*/
  }, [createMessage]);

  return (
    <form className={styles.form} onSubmit={handleSubmit(formSubmit)}>
      <div className={styles.textarea}>
        <Textarea
          placeholder="Something"
          {...register("createMessage", { required: true })}
        />
      </div>

      <div className={styles.button}>
        <Button type="submit">
          <img
            src={messageImage}
            alt="paper plane"
            className={styles.message_icon}
          />
        </Button>
      </div>
    </form>
  );
}
