import React, { useState } from "react";
import { Recipe } from "./types";
import "./RecipeChooser.css";
import attack from "./images/recipes/attackoftheattacks.png";
import framesvg from "./images/recipes/Frame 1.svg";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css"; // Import default styles

export const RECIPE_LIST: Recipe[] = [
  {
    name: "Attack Of The Attacks",
    description: "HOW MANY TURNS IN A ROW CAN YOU SURVIVE?",
    duration: 15,
    minPlayers: 2,
    maxPlayers: 5,
    front_image: attack,
    cards: [],
  },
];

export const RecipeChooser = () => {
  const [unfoldedIndex, setUnfoldedIndex] = useState(-1); // Index of the unfolded recipe (-1 means none unfolded)

  const handleCardClick = (index: number) => {
    if (unfoldedIndex === index) {
      // If the clicked card is already unfolded, close it
      setUnfoldedIndex(-1);
    } else {
      // Otherwise, unfold the clicked card
      setUnfoldedIndex(index);
    }
  };

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 7,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="container">
      <h2 className="bold">
        CHOOSE YOUR <span className="exploding-text">RECIPE</span>
      </h2>

      <Carousel responsive={responsive}>
        {RECIPE_LIST.flatMap((r) => [r, r, r, r, r, r, r, r, r, r, r]).map(
          (r, index) => (
            <div key={index}>
              <div
                className="recipe-card"
                onClick={() => handleCardClick(index)}
              >
                <img src={r.front_image} alt="" className="recipe-face" />
              </div>
            </div>
          ),
        )}
      </Carousel>
      <div className="ingredients-card">
        <span className="no-ingredients">
          Click on a recipe to show ingredients
        </span>
        <img src={framesvg} alt="" className="recipe-unfolded" />
      </div>
    </div>
  );
};
