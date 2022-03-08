import { Route, Redirect, RouteProps } from "react-router-dom";

interface IProps extends RouteProps {
  children: React.ReactNode;
  redirectTo: string;
}
export default function PrivateRoute({
  children,
  redirectTo,
  ...rest
}: IProps) {
  const token = localStorage.getItem("token");
  return (
    <Route {...rest}>{token ? children : <Redirect to={redirectTo} />}</Route>
  );
}
