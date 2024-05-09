import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Recipe, RoomEvent, Card } from "./types";
import "./Room.css";
import useWebSocket, { ReadyState } from "react-use-websocket";
import seat from "./images/Seat.svg";
import table from "./images/table.svg";
import { getURL } from "./utils";

export function Room() {
  const { roomName } = useParams();
  const [playersSeatings, setPlayersSeatings] = useState(
    [] as [string, number][],
  );

  const [recipe, setRecipe] = useState<Recipe | null>(null);

  const [isStarted, setIsStarted] = useState(false);

  const [hand, setHand] = useState([] as Card[]);

  const [currentPlayer, setCurrentPlayer] = useState("");

  const user = localStorage.getItem("userId");

  const WS_PLAYER_ROOM = "ws://127.0.0.1:8080/join/" + roomName + "/" + user;

  const { lastJsonMessage, readyState, sendMessage } = useWebSocket(
    WS_PLAYER_ROOM,
    {
      share: true,
      shouldReconnect: () => true,
    },
  );

  // Connection status monitoring
  useEffect(() => {
    switch (readyState) {
      case ReadyState.CONNECTING:
        console.log("WebSocket connecting...");
        break;
      case ReadyState.OPEN:
        console.log("WebSocket connected");
        break;
      case ReadyState.CLOSING:
        console.log("WebSocket closing...");
        break;
      case ReadyState.CLOSED:
        console.log("WebSocket closed");
        // Additional actions after the connection is closed
        // reconnect logic here if needed
        break;
      default:
        break;
    }
  }, [readyState]);

  const heartbeatInterval = 30000;

  useEffect(() => {
    const heartbeatTimer = setInterval(() => {
      if (readyState === ReadyState.OPEN) {
        sendMessage("ping");
      }
    }, heartbeatInterval);

    // Clear the heartbeat timer when the component unmounts or WebSocket connection is closed
    return () => {
      clearInterval(heartbeatTimer);
    };
  }, [readyState, sendMessage]);

  useEffect(() => {
    try {
      const jsonString = JSON.stringify(lastJsonMessage);
      if (jsonString === null) return;
      console.log(`Got a new message:`, jsonString);
      const event = JSON.parse(jsonString) as RoomEvent;

      switch (event.event) {
        case "joined":
          setPlayersSeatings([...event.player_list]);
          break;

        case "left":
          setPlayersSeatings([...event.player_list]);
          break;
        case "started":
          setIsStarted(true);
          break;
        case "room_state":
          setPlayersSeatings([...event.player_list]);
          setRecipe(event.recipe as Recipe);
          break;
        case "hand":
          setHand(event.player_hand);
          break;
        case "new_turn":
          console.log("new turn");
          setCurrentPlayer(event.player);
        default:
          break;
      }
    } catch (error) {
      console.error(`Error parsing JSON message:`, error);
    }
  }, [lastJsonMessage]);

  const handleStart = () => {
    sendMessage("started");
    setIsStarted(true);
  };

  const handleSkip = () => {
    sendMessage("n");
  };

  const notifyBackendOnUnload = () => {
    sendMessage("left");
  };

  window.addEventListener("beforeunload", notifyBackendOnUnload);

  const handlePlayCard = (i: number) => {
    console.log("clicked card");
    if (user !== currentPlayer) return;
    sendMessage(i.toString());
    console.log("played ", i, " aka ", hand[i]);
  };

  return (
    <div className="game-container">
      <div className="side-game flex-column">
        <div>
          <h4>Players</h4>
          <div>
            {playersSeatings?.length ? (
              <ul className="">
                {playersSeatings.map(([p, _]) => (
                  <div className="player-display">{p}</div>
                ))}
              </ul>
            ) : (
              <div>No players </div>
            )}
          </div>
        </div>
        <div className="flex-column">
          <h4>Recipe Details</h4>
          {recipe ? (
            <img
              id="recipe-card"
              src={getURL("./images/recipes/", recipe!.name, ".png")}
              alt=""
              draggable="false"
            />
          ) : (
            <></>
          )}
        </div>

        <div>
          {!isStarted ? (
            <button className="flame-button" onClick={() => handleStart()}>
              START GAME
            </button>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="game">
        <div className="table-seatings">
          <img src={table} alt="" id="table" draggable="false" />
          {playersSeatings.map(([p, i]) => {
            return (
              <div className="seat" id={"seat" + i}>
                <img src={seat} className="seat-image" draggable="false" />
                <div
                  className={
                    "tag " + (currentPlayer === p ? "current-player" : "")
                  }
                >
                  {p}
                </div>
              </div>
            );
          })}
        </div>

        <div id="hand-container" className="flex-row">
          {hand.map((c, i) => {
            return (
              <div
                className={"card" + (user === currentPlayer ? "" : " grey")}
                onClick={() => handlePlayCard(i)}
              >
                <img
                  src={getURL("./images/cards/", c.name, ".jpeg")}
                  alt=""
                  className={"recipe-face"}
                  draggable="false"
                />
              </div>
            );
          })}
          {user === currentPlayer ? (
            <button onClick={() => handleSkip()}>Skip</button>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
