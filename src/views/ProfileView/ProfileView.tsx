import { useState, useContext } from "react";
import { useQuery } from "@apollo/client";
import { toast } from "react-toastify";
import { userContext } from "../../context/userContext";
import Avatar from "../../components/Avatar/Avatar";
import styles from "./ProfileView.module.scss";
import MessageStatistics from "../../components/MessageStatistics/MessageStatistics";
import { getTime } from "../../utils/getTime";
import { GET_MESSAGE_STATISTICS } from "../../servises/queries/getMessageStatistics";
import { IMessageStatisticsInterface } from "../../interfaces/messageStatisticsInterface";

export default function ProfileView() {
  const [statistics, setStatistics] = useState<IMessageStatisticsInterface[]>(
    []
  );

  const { loading } = useQuery(GET_MESSAGE_STATISTICS, {
    fetchPolicy: "no-cache",
    onCompleted: (data) => {
      setStatistics(data.getMessageStatistics);
    },
    onError: (error) => {
      toast.error(error.message, {
        theme: "colored",
      });
    },
  });

  const { user } = useContext(userContext);
  const token = localStorage.getItem("token");
  const { exp } = token && JSON.parse(window.atob(token.split(".")[1]));
  const tokenExpairAt = getTime(exp * 1000);

  if (loading) {
    return <h1 className={styles.loading}>Loading...</h1>;
  }
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Profile</h1>
      <div className={styles.user_info_container}>
        <Avatar size="large" url={user?.avatar} />
        <div className={styles.user_info}>
          <h2 className={styles.login}>{user?.login}</h2>
          <p className={styles.email}>{user?.email}</p>
          <p>Token expair at:</p>
          <p>{tokenExpairAt}</p>
        </div>
      </div>
      <h2 className={styles.stats_title}>Your message statistics</h2>
      <MessageStatistics messageStatistics={statistics} />
    </div>
  );
}
