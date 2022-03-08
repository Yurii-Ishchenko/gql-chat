import styles from "./RoomsItem.module.scss";

interface IRoomsItemProps {
  name: string;
  active: string;
  onClick: () => void;
}

export default function RoomsItem({ name, active, onClick }: IRoomsItemProps) {
  return (
    <div className={`${styles.item} ${styles[active]}`} onClick={onClick}>
      <h2>{name}</h2>
    </div>
  );
}
