import "./App.css";
import { Route, Routes } from "react-router-dom";
import { MainScreen } from "./MainScreen";
import { RoomList } from "./RoomList";
import { Room } from "./Room";
import { RecipeChooser } from "./RecipeChooser";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainScreen />} />
        <Route path="/rooms" element={<RoomList />} />
        <Route path="/rooms/:roomName" element={<Room />} />
        <Route path="/recipes" element={<RecipeChooser />} />
      </Routes>
    </>
  );
}

export default App;
