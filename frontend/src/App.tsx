import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Start } from "./pages/start/Start";
import { Login } from "./pages/login/Login";
import { Dashboard } from "./pages/dashboard/Dashboard";
import { Register } from "./pages/register/Register";
import { Rooms, SelectedRooms } from "./pages/rooms/Rooms";
import { Notifications } from "./pages/notifications/Notifications";
import {
  Humidity,
  Temperature,
  MoldIndex,
} from "./pages/temperature/Temperature";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/rooms/:id" element={<SelectedRooms />} />
        <Route path="/temperature" element={<Temperature />} />
        <Route path="/humidity" element={<Humidity />} />
        <Route path="/mold" element={<MoldIndex />} />
        <Route path="/notifications" element={<Notifications />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
