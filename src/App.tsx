import { useContext, lazy, Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { userContext } from "./context/userContext";
import Layout from "./components/Layout/Layout";
import Header from "./components/Header/Header";
import RestrictedRoute from "./components/RestrictedRoute/RestrictedRoute";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
const LoginView = lazy(
  () =>
    import("./views/loginView/LoginView" /* webpackChunkName: "login-page" */)
);
const RegisterView = lazy(
  () =>
    import(
      "./views/RegisterView/RegisterView" /* webpackChunkName: "register-page" */
    )
);
const ChatBlockView = lazy(
  () =>
    import(
      "./views/ChatBlockView/ChatBlockView" /* webpackChunkName: "chat-page" */
    )
);

const ProfileView = lazy(
  () =>
    import(
      "./views/ProfileView/ProfileView" /* webpackChunkName: "profile-page" */
    )
);

function App() {
  const { loading } = useContext(userContext);
  return (
    <>
      <Header />
      <Layout>
        {loading ? (
          <h1 className="loading">Loading...</h1>
        ) : (
          <Suspense fallback={<h1 className="loading">Loading...</h1>}>
            <Switch>
              <RestrictedRoute exact path="/login" redirectTo="/">
                <LoginView />
              </RestrictedRoute>
              <RestrictedRoute exact path="/register" redirectTo="/">
                <RegisterView />
              </RestrictedRoute>

              <PrivateRoute path="/profile" redirectTo="/login" exact>
                <ProfileView />
              </PrivateRoute>

              <PrivateRoute path="/" redirectTo="/login" exact>
                <ChatBlockView />
              </PrivateRoute>

              <Route>
                <Redirect to="/login" />
              </Route>
            </Switch>
          </Suspense>
        )}
      </Layout>

      <ToastContainer position="top-center" autoClose={3000} />
    </>
  );
}
export default App;
