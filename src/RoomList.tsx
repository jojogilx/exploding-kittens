import React, { useState, useEffect, useContext, memo } from "react";
import "./RoomList.css";
import closeIcon from "./images/closeIcon.webp";
import catNotFound from "./images/CatNoutFound.svg";
import { Link } from "react-router-dom";
import Popup from "reactjs-popup";
import { Recipe, Room } from "./types";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { RoomListContext, UserContext } from "./App";

import { useNavigate } from "react-router-dom";

export const RoomList = () => {
  const navigate = useNavigate();

  const WS_ROOM_LIST_URL = "ws://127.0.0.1:8080/rooms";
  const { lastJsonMessage, readyState } = useWebSocket(WS_ROOM_LIST_URL, {
    share: false,
    shouldReconnect: () => true,
  });

  useEffect(() => {
    if (readyState === ReadyState.OPEN) {
      console.log("conn");
    }
  }, [readyState]);

  useEffect(() => {
    try {
      const jsonString = JSON.stringify(lastJsonMessage);
      const decodedRooms = JSON.parse(jsonString) as Room[];

      setRoomList(decodedRooms);
      console.log(`Got a new message:`, decodedRooms);
    } catch (error) {
      console.error(`Error parsing JSON message:`, error);
    }
  }, [lastJsonMessage]);

  const { roomList, setRoomList } = useContext(RoomListContext);
  const { user, setUser } = useContext(UserContext);

  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [popupShown, setPopupShown] = useState(false);
  const [popupRecipeShown, setPopupRecipeShown] = useState(false);
  const [popupCreateShown, setPopupCreateShown] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  const joinable = (r: Room) => {
    return r.started || r.players.length == r.recipe?.maxPlayers;
  };

  const handlePlayerNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser(e.target.value);
  };
  const handleRoomNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoomName(e.target.value);
  };

  const handleJoinRoom = (room: string) => {
    navigate("/rooms/" + room);
  };

  const handleCreateRoom = () => {
    const url = "http://127.0.0.1:8080/create";

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ roomName: roomName, playerName: user }),
    };

    fetch(url, requestOptions)
      .then((_) => handleJoinRoom(roomName))
      .catch((error) => console.log("error was ", error));
  };

  const CreateRoomPopup = memo(() => {
    return (
      <Popup open={popupCreateShown} onClose={() => setPopupCreateShown(false)}>
        <div className="popup">
          <img
            src={closeIcon}
            alt="close"
            className="icons-close clickable"
            onClick={() => setPopupCreateShown(false)}
            draggable="false"
          />
          <h3>CREATE ROOM</h3>
          <div>
            <div className="flex-row field-create">
              <h5 className="label">ROOM NAME</h5>
              <input
                type="text"
                maxLength={20}
                value={roomName}
                placeholder="Room name..."
                className="input pop2"
                onChange={handleRoomNameChange}
              />
            </div>
          </div>
          <div className="flex-row field-create">
            <h5 className="label">PLAYER NAME</h5>
            <input
              type="text"
              value={user}
              maxLength={20}
              placeholder="Player name..."
              className="input pop2"
              onChange={handlePlayerNameChange}
            />
          </div>

          <div>
            <Link to={"/recipes"}>
              <button className="flame-button  create-row">
                {recipe ? "CHANGE RECIPE" : "CHOOSE RECIPE"}
              </button>
            </Link>
          </div>

          <button
            className="flame-button create-row"
            disabled={user === "" /*|| recipe === null*/}
            onClick={() => {
              setPopupCreateShown(false);
              handleCreateRoom();
              //   handleJoinRoom(roomName!);
            }}
          >
            CREATE
          </button>
        </div>
      </Popup>
    );
  });

  return (
    <div className="content">
      <div className="header-rooms">
        <h2 className="room-list-title">
          <span className="white-text bold head2">ROOMS </span>
          <span className="exploding-text bold">LIST</span>
        </h2>
        <button
          className="button create-room-button"
          id="create-room"
          onClick={() => {
            setPopupCreateShown(true);
            setPopupShown(false);
          }}
        >
          CREATE ROOM
        </button>
        <CreateRoomPopup />
      </div>

      <div className="pages">
        {roomList?.length > 0 ? (
          <ul className="rooms-list bottom-border">
            {roomList.map((r) => (
              <li className="room flex-row" key={r.name}>
                <div className="flex-row">
                  <div
                    id="ball"
                    className={joinable(r) ? "joinable" : "not-joinable"}
                  ></div>
                  <span className="room-name bold">{r.name}</span>
                  {/* <span className="status">
                  {r.started
                    ? "Game started"
                    : r.players.length === r.recipe?.maxPlayers
                      ? "Game full"
                      : ""}
                </span> */}
                </div>
                <span className="players-list">
                  <span className="bold">Players ({r.players.length}):</span>{" "}
                  {r.players.toString()}
                </span>
                <button
                  className="flame-button"
                  id="join-button"
                  disabled={joinable(r)}
                  onClick={() => {
                    setSelectedRoom(r);
                    setPopupShown(true);
                  }}
                >
                  JOIN ROOM
                </button>
                <Popup
                  modal
                  nested
                  open={popupShown}
                  onClose={() => setPopupShown(false)}
                >
                  <div className="popup">
                    <img
                      src={closeIcon}
                      alt="close"
                      className="icons-close clickable"
                      onClick={() => setPopupShown(false)}
                    />
                    <h3>JOIN {selectedRoom?.name.toLocaleUpperCase()}</h3>
                    <span>Players: {r.players.toString()}</span>
                    <span>Recipe: Not chosen</span>
                    <div className="flex-row" id="join-popup-fields">
                      <h5 className="label">NAME</h5>
                      <input
                        type="text"
                        value={user}
                        placeholder="Player name..."
                        className="input"
                        onChange={handlePlayerNameChange}
                      />
                      <button
                        className="flame-button"
                        disabled={user === ""}
                        onClick={() => {
                          handleJoinRoom(selectedRoom!.name!);
                          setPopupShown(false);
                        }}
                      >
                        JOIN
                      </button>
                    </div>
                  </div>
                </Popup>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex-row" id="no-rooms">
            <img src={catNotFound} draggable="false" id="cat-not-found" />
            <h3>No rooms to display!</h3>
          </div>
        )}
      </div>
    </div>
  );
};
