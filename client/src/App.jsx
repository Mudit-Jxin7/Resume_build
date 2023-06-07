import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Resume from "./pages/Resume";

const App = () => {
  return (
    <Routes>
      <Route path={"/"} element={<Login />} />
      <Route path={"/register"} element={<Register />} />
      <Route path={"/home"} element={<Home />} />
      <Route path={"/resume"} element={<Resume />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
