import "./App.css";
import { Route, Routes } from "react-router-dom";
import { MainScreen } from "./MainScreen";
import { RoomList } from "./RoomList";
import { Room } from "./Room";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainScreen />} />
      <Route path="/rooms" element={<RoomList />} />
      <Route path="/rooms/:roomName" element={<Room />} />
    </Routes>
  );
}

export default App;

export const TryPing = () => {
  const url = "http://127.0.0.1:8080/ping";

  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  return fetch(url, requestOptions).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to connect:" + response.statusText);
    }
    return response;
  });
};
