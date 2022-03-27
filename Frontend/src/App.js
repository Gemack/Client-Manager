import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import HomePage from "./Pages/HomePage/HomePage";
import About from "./Pages/AboutPage/About";
import Login from "./Pages/AuthPages/Login";
import Details from "./Pages/DetailsPage/Details";
import AddPage from "./Pages/AddPage/AddPage";
import Update from "./Pages/UpdatePage/Update";

function App() {
  const [user, setUser] = useState(false);

  // ============================ For storing and retreiving User Data from local Storage =================
  useEffect(() => {
    const u = localStorage.getItem("user");
    u && JSON.parse(u) ? setUser(true) : setUser(false);
  }, []);
  useEffect(() => {
    localStorage.setItem("user", user);
  }, [user]);

  // ======================================================================================================
  const logout = () => {
    localStorage.removeItem("user");
    setUser(false);
  };
  return (
    <Router>
      <div className="App">
        <ToastContainer />
        <Routes>
          {!user && (
            <Route path="/" element={<Login auth={() => setUser(true)} />} />
          )}
          {user && (
            <>
              {" "}
              <Route
                path="/home"
                element={<HomePage logout={() => logout()} />}
              />
              <Route path="/about" element={<About />} />
              <Route
                path="/detail/:id"
                element={<Details logout={() => logout()} />}
              />
              <Route path="/detail/update/:id" element={<Update />} />
              <Route path="/add" element={<AddPage />} />
            </>
          )}
          <Route path="*" element={<Navigate to={user ? "/home" : "/"} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
