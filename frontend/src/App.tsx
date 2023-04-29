import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Start } from "./pages/start/Start";
import { Login } from "./pages/login/Login";
import { Dashboard } from "./pages/dashboard/Dashboard";
import { Register } from "./pages/register/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
