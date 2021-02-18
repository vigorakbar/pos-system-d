import React, { useEffect, useState, lazy, Suspense } from "react";
import "./App.css";
import Axios from "axios";
import { Switch, Route } from "react-router-dom";
import PrivateRoute from "./components/routes/PrivateRoute";
import BlankLoading from "./components/common/BlankLoading";
import SuspenseLoading from "./components/common/SuspenseLoading";

const Login = lazy(() => import("./components/pages/login/Login"));
const Home = lazy(() => import("./components/home/Home"));

function App() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getCsrfToken = async () => {
      const { data } = await Axios.get("/api/csrf-token");
      Axios.defaults.headers.post["X-CSRF-Token"] = data.csrfToken;
      setIsLoading(false);
    };
    getCsrfToken();
  }, []);

  return (
    <div className="App">
      {isLoading ? (
        <BlankLoading />
      ) : (
        <Suspense fallback={<SuspenseLoading />}>
          <Switch>
            <Route exact path="/" component={Login} />
            <PrivateRoute path="/home" component={Home} />
          </Switch>
        </Suspense>
      )}
    </div>
  );
}

export default App;
