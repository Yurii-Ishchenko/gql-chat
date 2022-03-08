import { createPortal } from "react-dom";
import styles from "./DropDown.module.scss";

interface IProps {
  onClose: () => void;
  children: React.ReactNode;
}
export default function Modal({ onClose, children }: IProps) {
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  return (
    <>
      {createPortal(
        <div className={styles.backdrop} onClick={handleBackdropClick}>
          {children}
        </div>,
        document.getElementById("modal-root") as HTMLElement
      )}
    </>
  );
}
