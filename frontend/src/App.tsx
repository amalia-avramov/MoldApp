import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Start } from "./pages/start/Start";
import { Login } from "./pages/login/Login";
import { Dashboard } from "./pages/dashboard/Dashboard";
import { Register } from "./pages/register/Register";
import { Rooms, SelectedRooms } from "./pages/rooms/Rooms";

import {
  Humidity,
  Temperature,
  MoldIndex,
} from "./pages/parameters/Parameters";
import { NotificationPage } from "./pages/notifications/Notifications";

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
        <Route path="/notifications" element={<NotificationPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
