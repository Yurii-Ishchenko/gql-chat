import { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { userContext } from "../../context/userContext";
import styles from "./UserMenu.module.scss";

interface IProps {
  onClose: () => void;
}

export default function MenuContent({ onClose }: IProps) {
  const { logOutUser } = useContext(userContext);
  const history = useHistory();

  const onLogOutBtnClick = () => {
    logOutUser();
    onClose();
    history.push("/login");
  };

  return (
    <>
      <Link to="/profile" className={styles.auth_item}>
        Profile
      </Link>
      <button
        onClick={onLogOutBtnClick}
        className={`${styles.auth_item} ${styles.auth_item_button}`}
      >
        Logout
      </button>
    </>
  );
}
