import "./App.css";
import { createContext, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { MainScreen } from "./MainScreen";
import { RoomList } from "./RoomList";
import { Room } from "./Room";
import { RecipeChooser } from "./RecipeChooser";
import { Room as RoomType } from "./types";

interface RoomListState {
  roomList: RoomType[];
  setRoomList: (r: RoomType[]) => void;
}

interface UserState {
  user: string;
  setUser: (u: string) => void;
}

export const RoomListContext = createContext<RoomListState>({
  roomList: [],
  setRoomList: (rooomList) => {},
});

export const UserContext = createContext<UserState>({
  user: "",
  setUser: (u) => {},
});

function App() {
  const [roomList, setRoomList] = useState([] as RoomType[]);
  const [user, setUser] = useState("");

  return (
    <RoomListContext.Provider
      value={{ roomList: roomList, setRoomList: (rooms) => setRoomList(rooms) }}
    >
      <UserContext.Provider value={{ user, setUser }}>
        <Routes>
          <Route path="/" element={<MainScreen />} />
          <Route path="/rooms" element={<RoomList />} />
          <Route path="/rooms/:roomName" element={<Room />} />
          <Route path="/game/:roomName" element={<Room />} /> {/*TODO CHANGE*/}
          <Route path="/recipes" element={<RecipeChooser />} />{" "}
          {/*TODO: make a portal*/}
        </Routes>
      </UserContext.Provider>
    </RoomListContext.Provider>
  );
}

export default App;
