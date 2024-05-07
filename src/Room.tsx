import { useContext, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Recipe, RoomEvent, Card } from "./types";
import "./Room.css";
import { UserContext } from "./App";
import useWebSocket, { ReadyState } from "react-use-websocket";
import seat from "./images/Seat.svg";
import table from "./images/table.svg";
//PASS RECIPE
export function Room() {
  const { roomName } = useParams();
  const [recipe, setRecipe] = useState<Recipe | null>({
    name: "Nope Sauce",
    description: "A game thats not gonna go the way you planned",
    defuses_on_start: 1,
    minPlayers: 2,
    maxPlayers: 5,
    duration: 15,
    cards: [],
  } as Recipe);
  const [playersSeatings, setPlayersSeatings] = useState(
    [] as [string, number][],
  );
  const [startDisabled, setStartDisabled] = useState(true);
  const { user } = useContext(UserContext);

  const [isStarted, setIsStarted] = useState(false);

  const [hand, setHand] = useState([] as Card[]);

  const [currentPlayer, setCurrentPlayer] = useState("");

  const WS_PLAYER_ROOM = "ws://127.0.0.1:8080/join/" + roomName + "/" + user;

  const { lastJsonMessage, readyState, sendMessage } = useWebSocket(
    WS_PLAYER_ROOM,
    {
      share: false,
      shouldReconnect: () => true,
    },
  );

  useEffect(() => {
    console.log("Connection state changed");
    if (readyState === ReadyState.OPEN) {
      console.log("conn");
    }
  }, [readyState]);

  useEffect(() => {
    console.log("player is", recipe?.maxPlayers);
  }, [recipe]);

  useEffect(() => {
    try {
      const jsonString = JSON.stringify(lastJsonMessage);
      const event = JSON.parse(jsonString) as RoomEvent;

      switch (event.event) {
        case "joined":
          setPlayersSeatings([...event.player_list]);
          break;

        case "left":
          setPlayersSeatings([...event.player_list]);
          break;
        case "started":
          //start game
          break;
        case "room_state":
          setPlayersSeatings([...event.player_list]);
          // setRecipe(event.recipe as Recipe);
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

      console.log(`Got a new message:`, event);
    } catch (error) {
      console.error(`Error parsing JSON message:`, error);
    }
  }, [lastJsonMessage]);

  useEffect(() => {
    console.log(currentPlayer);
    console.log(user);
    console.log(user === currentPlayer);
  }, [currentPlayer]);

  const getURL = (name: string) => {
    return new URL(
      "./images/cards/" +
        name.toLocaleLowerCase().split(" ").join("").trim() +
        ".jpeg",
      import.meta.url,
    ).href;
  };

  const handleStart = () => {
    sendMessage("started");
    // const url = "http://127.0.0.1:8080/start/" + roomName;

    // const requestOptions = {
    //   method: "GET",
    //   headers: { "Content-Type": "application/json" },
    // };

    // fetch(url, requestOptions)
    //   .then((_) => setIsStarted(true))
    //   .catch((error) => console.log("error was ", error));
  };

  const handlePlayCard = (i: number) => {
    console.log("ss");
    if (user !== currentPlayer) return;
    sendMessage(i);
    console.log("d");
  };

  const RoomComponent = () => {
    return (
      <div className="container padded">
        <h2 id="room-name">{roomName}</h2>
        <div className="grid-2row">
          <div className="flex-row row-spaced">
            <div>
              <h4>Recipe details</h4>
              <div>
                {recipe ? <div>details todo:</div> : <div>Choose a recipe</div>}
              </div>
            </div>
          </div>

          <div className="flex-row row-spaced">
            <div>
              <h4>Players</h4>
              <div>
                {playersSeatings?.length ? (
                  <ul className="grid-5row">
                    {playersSeatings.map(([p, i]) => (
                      <div className="player-display">{p}</div>
                    ))}
                  </ul>
                ) : (
                  <div>No players </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="game-container">
      <div className="table-seatings">
        <img src={table} alt="" id="table" draggable="false" />
        {[...Array(recipe?.maxPlayers)].map((_, i) => {
          return (
            <div className="seat" id={"seat" + i}>
              <img
                src={seat}
                className="overlay middle seat-image"
                draggable="false"
              />
              <div className="overlay middle tag">
                {playersSeatings.length <= i
                  ? playersSeatings.find(([_, ind]) => ind === i)?.[0]
                  : ""}
              </div>
            </div>
          );
        })}
      </div>
      <div>
        {!isStarted ? (
          <button onClick={() => handleStart()}>START GAME</button>
        ) : (
          <></>
        )}
      </div>

      <div id="hand-container" className="flex-row">
        {hand.map((c, i) => {
          return (
            <div
              className={"card" + (user === currentPlayer ? " grey" : "")}
              onClick={() => handlePlayCard(i)}
            >
              <img
                src={getURL(c.name)}
                alt=""
                className={"recipe-face"}
                draggable="false"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
