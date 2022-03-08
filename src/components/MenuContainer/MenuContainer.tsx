import { useEffect, useState } from "react";
import styles from "./MenuContainer.module.scss";

interface IProps {
  elementRef: HTMLDivElement | null;
  children: React.ReactNode;
}

export default function Menu({ children, elementRef }: IProps) {
  const [size, setSize] = useState([window.innerHeight, window.innerWidth]);

  const coords = elementRef?.getBoundingClientRect();
  const yCoords = coords && coords.y + coords.width;
  const xCoords = coords && coords.x - coords.width * 2;

  useEffect(() => {
    const handleSizeChange = () => {
      setSize([window.innerHeight, window.innerWidth]);
    };

    window.addEventListener("resize", handleSizeChange);
    return () => {
      window.removeEventListener("resize", handleSizeChange);
    };
  }, [size]);

  return (
    <div
      className={styles.menu_container}
      style={{
        transform: `translate(${xCoords}px, ${yCoords}px)`,
      }}
    >
      {children}
    </div>
  );
}
