import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Recipe } from "./types";
import "./Room.css";

export function Room() {
  const { roomName } = useParams();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [players, setPlayers] = useState([] as string[]);
  const [startDisabled, setStartDisabled] = useState(true);
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
              {players.length ? (
                <div>list players, todo</div>
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
