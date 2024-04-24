import React, { useState, useEffect } from "react";
import "./RoomList.css";
import homeIcon from "./images/home.png";
import closeIcon from "./images/closeIcon.webp";
import catShrug from "./images/catshrug.png";
import { Link } from "react-router-dom";
import Popup from "reactjs-popup";
import { Room } from "./types";
import useWebSocket, { ReadyState } from "react-use-websocket";

import { useNavigate } from "react-router-dom";

export const RoomList = () => {
  const navigate = useNavigate();

  const WS_ROOM_LIST_URL = "ws://127.0.0.1:8080/rooms";
  const { lastJsonMessage, readyState } = useWebSocket(WS_ROOM_LIST_URL, {
    share: false,
    shouldReconnect: () => true,
  });

  // Run when the connection state (readyState) changes
  useEffect(() => {
    console.log("Connection state changed");
    if (readyState === ReadyState.OPEN) {
      console.log("conn");
    }
  }, [readyState]);

  useEffect(() => {
    try {
      const jsonString = JSON.stringify(lastJsonMessage); // Stringify the object
      const decodedRooms = JSON.parse(jsonString) as Room[];

      setRooms(decodedRooms);
      console.log(`Got a new message:`, decodedRooms);
    } catch (error) {
      console.error(`Error parsing JSON message:`, error);
    }
  }, [lastJsonMessage]);

  const [rooms, setRooms] = useState([] as Room[]);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [popupShown, setPopupShown] = useState(false);
  const [popupCreateShown, setPopupCreateShown] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const [roomName, setRoomName] = useState("");

  const joinable = (r: Room) => {
    return r.started || r.players.length == r.recipe?.maxPlayers;
  };

  const handlePlayerNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayerName(e.target.value);
  };
  const handleRoomNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoomName(e.target.value);
  };

  const handleJoinRoom = (room: string) => {
    navigate("/rooms/" + room);
  };

  const handleCreateRoom = () => {
    postData("http://127.0.0.1:8080/create");
  };

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: roomName }),
  };

  const postData = (url: string) => {
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log("error was ", error));
  };

  return (
    <div className="content">
      <Link to="/">
        <img src={homeIcon} height={"60px"} id="home-button" />
      </Link>
      <div className="header-rooms">
        <h3 className="room-list-title">
          <span className="white-text bold head2">ROOMS </span>
          <span className="exploding-text bold">LIST</span>
        </h3>
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
        <Popup
          open={popupCreateShown}
          onClose={() => setPopupCreateShown(false)}
        >
          <div className="popup">
            <img
              src={closeIcon}
              alt="close"
              className="icons-close clickable"
              onClick={() => setPopupCreateShown(false)}
            />
            <h3>CREATE ROOM</h3>
            <div className="flex-row">
              <h5 className="label">ROOM NAME</h5>
              <input
                type="text"
                value={roomName}
                placeholder="Room name..."
                className="player-input pop2"
                onChange={handleRoomNameChange}
              />
            </div>
            <div className="flex-row">
              <h5 className="label">PLAYER NAME</h5>
              <input
                type="text"
                value={playerName}
                placeholder="Player name..."
                className="player-input pop2"
                onChange={handlePlayerNameChange}
              />
            </div>
            <button
              className="join-button"
              disabled={playerName === ""}
              onClick={() => {
                setPopupCreateShown(false);
                handleCreateRoom();
                handleJoinRoom(roomName!);
              }}
            >
              CREATE
            </button>
          </div>
        </Popup>
      </div>

      <div className="pages">
        <ul className="rooms-list">
          {rooms?.length > 0 ? (
            rooms.map((r, index) => (
              <li className="room" key={index}>
                <span className="room-name bold">{r.name}</span>
                <span className="status">
                  <div
                    id="ball"
                    className={joinable(r) ? "joinable" : "not-joinable"}
                  ></div>
                  {r.started
                    ? "Game started"
                    : r.players.length === r.recipe?.maxPlayers
                      ? "Game full"
                      : ""}
                </span>

                <span className="players-list">
                  <span className="bold">Players ({r.players.length}):</span>{" "}
                  {r.players.toString()}
                </span>
                <button
                  className="join-button"
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
                    <div className="flex-row">
                      <h5 className="label">NAME</h5>
                      <input
                        type="text"
                        value={playerName}
                        placeholder="Player name..."
                        className="player-input"
                        onChange={handlePlayerNameChange}
                      />
                      <button
                        className="join-button"
                        disabled={playerName === ""}
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
            ))
          ) : (
            <div className="flex-row">
              <h3>No rooms to display!</h3> <img src={catShrug} />
            </div>
          )}
        </ul>
      </div>
    </div>
  );
};
