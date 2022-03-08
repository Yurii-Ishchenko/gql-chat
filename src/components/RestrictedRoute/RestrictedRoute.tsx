import { useContext } from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { userContext } from "../../context/userContext";

interface IProps extends RouteProps {
  children: React.ReactNode;
  redirectTo: string;
}

export default function RestrictedRoute({
  children,
  redirectTo,
  ...rest
}: IProps) {
  const { user } = useContext(userContext);
  return (
    <Route {...rest}>{user ? <Redirect to={redirectTo} /> : children}</Route>
  );
}
