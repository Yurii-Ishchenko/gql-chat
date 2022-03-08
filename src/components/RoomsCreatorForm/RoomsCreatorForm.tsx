import { useForm } from "react-hook-form";
import Input from "../Input/Input";
import Button from "../Button/Button";
import { notBeEmptyInputSettings } from "../../utils/inputHookFormSettings";
import { inputError } from "../../utils/inputError";
import styles from "./RoomsCreatorForm.module.scss";

interface IRoomsCreatorFormProps {
  onSubmit: (conversation: string) => void;
}

export default function RoomsCreatorForm({ onSubmit }: IRoomsCreatorFormProps) {
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ mode: "all" });

  const [conversation] = watch(["conversation"]);
  const formSubmit = () => {
    onSubmit(conversation);
    reset();
  };
  return (
    <form onSubmit={handleSubmit(formSubmit)}>
      <div className={styles.form}>
        <Input
          error={inputError(errors, "conversation")}
          type="text"
          label="Input"
          {...register("conversation", notBeEmptyInputSettings)}
        />

        <div className={styles.button}>
          <Button color="primary" type="submit">
            Add
          </Button>
        </div>
      </div>
    </form>
  );
}
