import { useContext, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Recipe } from "./types";
import "./Room.css";
import { UserContext } from "./App";
import useWebSocket, { ReadyState } from "react-use-websocket";

export function Room() {
  const { roomName } = useParams();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [players, setPlayers] = useState([] as string[]);
  const [startDisabled, setStartDisabled] = useState(true);

  const { user } = useContext(UserContext);

  const WS_PLAYER_ROOM = "ws://127.0.0.1:8080/join/" + roomName + "/" + user;

  const { lastJsonMessage, readyState } = useWebSocket(WS_PLAYER_ROOM, {
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
      const decPlayers = JSON.parse(jsonString) as string[];

      setPlayers(decPlayers);
      console.log(`Got a new message:`, decPlayers);
    } catch (error) {
      console.error(`Error parsing JSON message:`, error);
    }
  }, [lastJsonMessage]);

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

          <div>
            {recipe ? (
              <div>
                <span>display recipe</span>
                <button>Change Recipe</button>
              </div>
            ) : (
              <div>
                <Link to="/recipes">
                  <button>Choose Recipe</button>
                </Link>
              </div>
            )}
          </div>
        </div>

        <div className="flex-row row-spaced">
          <div>
            <h4>Players</h4>
            <div>
              {players?.length ? (
                <ul className="grid-5row">
                  {players.map((p) => (
                    <div className="player-display">{p}</div>
                  ))}
                </ul>
              ) : (
                <div>No players </div>
              )}
            </div>
          </div>

          <div>
            {recipe ? (
              <div>
                <span>display recipe</span>
                <button>Change Recipe</button>
              </div>
            ) : (
              <div>
                <Link to={"/game/" + roomName}>
                  <button disabled={startDisabled}>START GAME</button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
