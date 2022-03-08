import { useState, useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { userContext } from "../../context/userContext";
import Avatar from "../Avatar/Avatar";
import DropDown from "../DropDown/DropDown";
import MenuContainer from "../MenuContainer/MenuContainer";
import UserMenu from "../UserMenu/UserMenu";
import styles from "./Header.module.scss";
import burgerMenuIcon from "../../images/burger_menu_icon.svg";
import RoomsList from "../RoomsList/RoomsList";

export default function Header() {
  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowRoomsCreator, setIsShowRoomsCreator] = useState(false);
  const avatarRef: React.LegacyRef<HTMLDivElement> = useRef(null);

  const toggleModal = () => {
    setIsShowModal(!isShowModal);
  };

  const toggleShowRoomsCreator = () => {
    setIsShowRoomsCreator(!isShowRoomsCreator);
  };
  const { user } = useContext(userContext);
  return (
    <>
      <header className={styles.header}>
        <div className={styles.link_container}>
          <div>
            <button
              type="button"
              className={styles.burger_menu_button}
              onClick={toggleShowRoomsCreator}
            >
              <img
                src={burgerMenuIcon}
                alt="three strips"
                className={styles.burger_menu_icon}
              />
            </button>
            <Link to="/" className={styles.link}>
              GQL Chat
            </Link>
          </div>
          {user ? (
            <div onClick={toggleModal} ref={avatarRef}>
              <Avatar size="normal" url={user?.avatar && user.avatar} />
            </div>
          ) : (
            <Link to="/login" className={`${styles.login_link}`}>
              Login
            </Link>
          )}
        </div>
      </header>
      {isShowModal && (
        <DropDown onClose={toggleModal}>
          <MenuContainer elementRef={avatarRef.current}>
            <UserMenu onClose={toggleModal} />
          </MenuContainer>
        </DropDown>
      )}
      {isShowRoomsCreator && (
        <DropDown onClose={toggleShowRoomsCreator}>
          <div className={styles.rooms_container}>
            <RoomsList />
          </div>
        </DropDown>
      )}
    </>
  );
}
