import { React, useState, useEffect } from "react";
import {
  Routes, Route, Navigate, useNavigate
} from "react-router-dom";


import Landing from "./views/Landing";
import Home from "./views/Home";
import NoRoute from "./views/NoRoute";
import Settings from "./views/Settings";

import Navbar from "./components/common/Navbar";
import AccountLoginForm from "./components/landing/AccountLoginForm";
import AccountCreateForm from "./components/landing/AccountCreateForm";
import Notification from "./components/common/Notification";

const App = () => {
  const useNav = useNavigate();
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const userJSON = window.localStorage.getItem("user");
    if (userJSON) {
      const user = JSON.parse(userJSON);
      setUser(user);
    }
  }, []);

  const RequireAuth = ({ children }) => {
    return user ? children : <Navigate to="/" />;
  };

  const handleLogout = () => {
    window.localStorage.clear();
    setUser(null);
  };

  return (
    <div className="App">
      <div className="header">
        <Navbar
          user={user}
          handleLogout={handleLogout}
        />
        <Notification errorMessage={errorMessage} />
      </div>
      <Routes>
        <Route
          path="/home"
          element={
            <RequireAuth>
              <Home user={user} />
            </RequireAuth>
          } />
        <Route
          path="/settings"
          element={
            <RequireAuth>
              <Settings user={user} />
            </RequireAuth>
          } />
        <Route
          path="/login"
          element={<AccountLoginForm
            user={user}
            setUser={setUser}
            useNav={useNav}
            setErrorMessage={setErrorMessage}
          />}
        />
        <Route
          path="/createAccount"
          element={<AccountCreateForm
            user={user}
            setUser={setUser}
            useNav={useNav}
            setErrorMessage={setErrorMessage}
          />}
        />
        <Route
          path="/"
          element={<Landing />} />
        <Route
          path="*"
          element={<NoRoute />} />
      </Routes>
    </div>
  );
};

export default App;
