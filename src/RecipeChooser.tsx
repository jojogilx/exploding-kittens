import React, { useContext, useEffect, useState } from "react";
import { Recipe } from "./types";
import "./RecipeChooser.css";
import framesvg from "./images/recipes/Frame 1.svg";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export const RecipeChooser = () => {
  const [chosenRecipe, setChosenRecipe] = useState<null | Recipe>(null);

  const [recipeList, setRecipeList] = useState([] as Recipe[]);

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

  const getRecipesList = () => {
    fetch("http://127.0.0.1:8080/recipes")
      .then((response) => response.json())
      .then((data) => {
        const decodedRecipes = JSON.parse(data) as Recipe[];

        setRecipeList(decodedRecipes);
      });

    // const json_response =
    //   '[{"name":"Attack of the Attacks","description":"How many turns in a row can you survive?","min-players":2,"max-players":5,"defuses-on-start":1,"duration":15,"cards":[["4",{"name":"Tacocat","description":"This is a cat card and is powerless on its own. Play two of the same cats as a pair to steal a random card from another player or 3 to chose the card you want from them"}],["# players + 1",{"name":"Defuse","description":"Instead of exploding, put your last drawn card back into the deck"}],["1",{"name":"Catomic Bomb","description":"Remove the exploding kittens from the deck. Put all the kittens top of the drawn pile. Your turn ends after playing this card"}],["# players -1",{"name":"Exploding Kitten","description":"Show this card immediately"}],["2",{"name":"Super Skip","description":"End your turn without drawing a card. If you’re supposed to take multiple turns, end them all"}],["3",{"name":"Reverse","description":"Reverse the order of play and end your turn without drawing a card"}]]},{"name":"Black Hole","description":"A game with only Imploding Kittens","min-players":3,"max-players":5,"defuses-on-start":0,"duration":15,"cards":[["4",{"name":"Share The Future 3X","description":"View and rearrange the top three cards in the draw pile, then show the cards to the next player"}],["5",{"name":"Skip","description":"End turn without drawing a card"}],["# players -1",{"name":"Imploding Kitten","description":"When drawn face down, put back in the deck face up, without using a defuse. When drawn face up, explode immediately. This card cannot be defused"}],["3",{"name":"Tacocat","description":"This is a cat card and is powerless on its own. Play two of the same cats as a pair to steal a random card from another player or 3 to chose the card you want from them"}]]},{"name":"Card Hoarders","description":"To draw, or not to draw? (The answer is to draw.)","min-players":2,"max-players":4,"defuses-on-start":1,"duration":10,"cards":[["4",{"name":"Share The Future 3X","description":"View and rearrange the top three cards in the draw pile, then show the cards to the next player"}],["1",{"name":"Exploding Kitten","description":"Show this card immediately"}],["3",{"name":"Swap Top And Bottom","description":"Swap top and bottom cards from the draw pile"}],["2",{"name":"Draw From The Bottom","description":"End your turn by drawing the bottom card from the Draw Pile"}],["# players",{"name":"Defuse","description":"Instead of exploding, put your last drawn card back into the deck"}]]},{"name":"Cat Fight","description":"This just got personal.","min-players":2,"max-players":4,"defuses-on-start":1,"duration":5,"cards":[["4",{"name":"Attack (2X)","description":"End your turn without drawing a card. Force the next player to take two turns"}],["# players -1",{"name":"Exploding Kitten","description":"Show this card immediately"}],["3",{"name":"Nope","description":"Stop the action of another player. You can play this at any time"}],["2",{"name":"Targeted Attack (2X)","description":"End your turn without drawing a card. Force one player to take two turns. Game continues from that player"}],["# players",{"name":"Defuse","description":"Instead of exploding, put your last drawn card back into the deck"}]]},{"name":"Danger Mode","description":"Warning: Highly explosive","min-players":2,"max-players":4,"defuses-on-start":1,"duration":10,"cards":[["4",{"name":"Tacocat","description":"This is a cat card and is powerless on its own. Play two of the same cats as a pair to steal a random card from another player or 3 to chose the card you want from them"}],["5",{"name":"Reverse","description":"Reverse the order of play and end your turn without drawing a card"}],["3",{"name":"Shuffle","description":"Shuffle the draw pile"}],["6",{"name":"Exploding Kitten","description":"Show this card immediately"}],["1",{"name":"Streaking Kitten","description":"Keep this card a secret. As long as it\'s in your hand you may draw and secretly hold one Exploding Kitten without blowing up"}],["2",{"name":"Draw From The Bottom","description":"End your turn by drawing the bottom card from the Draw Pile"}],["# players",{"name":"Defuse","description":"Instead of exploding, put your last drawn card back into the deck"}]]},{"name":"Exploding Kittens Classic Mode","description":"Slight optimization of the original Exploding Kittens.","min-players":2,"max-players":5,"defuses-on-start":1,"duration":15,"cards":[["4",{"name":"Tacocat","description":"This is a cat card and is powerless on its own. Play two of the same cats as a pair to steal a random card from another player or 3 to chose the card you want from them"}],["5",{"name":"See The Future 3X","description":"Privately view the top three cards of the deck"}],["# players + 1",{"name":"Defuse","description":"Instead of exploding, put your last drawn card back into the deck"}],["# players -1",{"name":"Exploding Kitten","description":"Show this card immediately"}]]},{"name":"Eye for an Eye","description":"A game where you can usually see the horrible things about to happen to you.","min-players":3,"max-players":5,"defuses-on-start":1,"duration":15,"cards":[["5",{"name":"See The Future 3X","description":"Privately view the top three cards of the deck"}],["# players + 1",{"name":"Defuse","description":"Instead of exploding, put your last drawn card back into the deck"}],["1",{"name":"Imploding Kitten","description":"When drawn face down, put back in the deck face up, without using a defuse. When drawn face up, explode immediately. This card cannot be defused"}],["2",{"name":"Alter The Future (3X) NOW","description":"Privately view and rearrange the top three cards of the draw pile. Play at any time"}],["3",{"name":"Alter The Future (3X)","description":"Privately view and rearrange the top three cards of the draw pile"}],["4",{"name":"Tacocat","description":"This is a cat card and is powerless on its own. Play two of the same cats as a pair to steal a random card from another player or 3 to chose the card you want from them"}],["# players -2",{"name":"Exploding Kitten","description":"Show this card immediately"}]]},{"name":"Lightning Kittens","description":"A 2 minute game","min-players":2,"max-players":4,"defuses-on-start":1,"duration":2,"cards":[["4",{"name":"Skip","description":"End turn without drawing a card"}],["# players -1",{"name":"Exploding Kitten","description":"Show this card immediately"}],["2",{"name":"Nope","description":"Stop the action of another player. You can play this at any time"}],["# players",{"name":"Defuse","description":"Instead of exploding, put your last drawn card back into the deck"}]]},{"name":"Meowsochist","description":"A game with a lot of risk, and a lot of reward","min-players":2,"max-players":5,"defuses-on-start":1,"duration":10,"cards":[["4",{"name":"Tacocat","description":"This is a cat card and is powerless on its own. Play two of the same cats as a pair to steal a random card from another player or 3 to chose the card you want from them"}],["6",{"name":"Feral Cat","description":"Use as any cat card"}],["1",{"name":"Streaking Kitten","description":"Keep this card a secret. As long as it\'s in your hand you may draw and secretly hold one Exploding Kitten without blowing up"}],["2",{"name":"Garbage Collection","description":"Every player (Including the one who played this card) must choose one card to shuffle into the draw pile"}],["# players",{"name":"Exploding Kitten","description":"Show this card immediately"}],["# players + 3",{"name":"Defuse","description":"Instead of exploding, put your last drawn card back into the deck"}],["3",{"name":"Share The Future 3X","description":"View and rearrange the top three cards in the draw pile, then show the cards to the next player"}]]},{"name":"Mind Games","description":"You know so much, but you can do so little.","min-players":2,"max-players":5,"defuses-on-start":1,"duration":15,"cards":[["4",{"name":"Tacocat","description":"This is a cat card and is powerless on its own. Play two of the same cats as a pair to steal a random card from another player or 3 to chose the card you want from them"}],["6",{"name":"See The Future 3X","description":"Privately view the top three cards of the deck"}],["# players -1",{"name":"Exploding Kitten","description":"Show this card immediately"}],["2",{"name":"Draw From The Bottom","description":"End your turn by drawing the bottom card from the Draw Pile"}],["# players",{"name":"Defuse","description":"Instead of exploding, put your last drawn card back into the deck"}]]},{"name":"Nope Sauce","description":"A game that\'s not going to go the way you planned.","min-players":2,"max-players":5,"defuses-on-start":1,"duration":15,"cards":[["8",{"name":"Nope","description":"Stop the action of another player. You can play this at any time"}],["4",{"name":"Tacocat","description":"This is a cat card and is powerless on its own. Play two of the same cats as a pair to steal a random card from another player or 3 to chose the card you want from them"}],["# players -1",{"name":"Exploding Kitten","description":"Show this card immediately"}],["3",{"name":"Bury","description":"End your turn by putting the next card you draw back into the draw pile as if you had defused it"}],["6",{"name":"Feral Cat","description":"Use as any cat card"}],["1",{"name":"Catomic Bomb","description":"Remove the exploding kittens from the deck. Put all the kittens top of the drawn pile. Your turn ends after playing this card"}],["2",{"name":"Swap Top And Bottom","description":"Swap top and bottom cards from the draw pile"}],["# players",{"name":"Defuse","description":"Instead of exploding, put your last drawn card back into the deck"}]]},{"name":"Power Play","description":"A game where there are no small moves","min-players":3,"max-players":5,"defuses-on-start":1,"duration":15,"cards":[["4",{"name":"Tacocat","description":"This is a cat card and is powerless on its own. Play two of the same cats as a pair to steal a random card from another player or 3 to chose the card you want from them"}],["# players -1",{"name":"Exploding Kitten","description":"Show this card immediately"}],["3",{"name":"See The Future 3X","description":"Privately view the top three cards of the deck"}],["6",{"name":"Feral Cat","description":"Use as any cat card"}],["1",{"name":"Streaking Kitten","description":"Keep this card a secret. As long as it\'s in your hand you may draw and secretly hold one Exploding Kitten without blowing up"}],["2",{"name":"Garbage Collection","description":"Every player (Including the one who played this card) must choose one card to shuffle into the draw pile"}],["# players + 2",{"name":"Defuse","description":"Instead of exploding, put your last drawn card back into the deck"}]]},{"name":"Sharing Is Caring","description":"What\'s mine is yours... even the bad stuff.","min-players":3,"max-players":5,"defuses-on-start":1,"duration":10,"cards":[["4",{"name":"Tacocat","description":"This is a cat card and is powerless on its own. Play two of the same cats as a pair to steal a random card from another player or 3 to chose the card you want from them"}],["# players + 1",{"name":"Defuse","description":"Instead of exploding, put your last drawn card back into the deck"}],["# players -1",{"name":"Exploding Kitten","description":"Show this card immediately"}],["2",{"name":"Barking Kitten","description":"When played, if anyone has another Barking Kitten they explode (or Defuse). Otherwise keep it in front of you, and it becomes a target when another one is played."}]]},{"name":"Sticky Fingers","description":"A game where stealing, thievery and general criminality are rewarded.","min-players":2,"max-players":5,"defuses-on-start":1,"duration":15,"cards":[["4",{"name":"Tacocat","description":"This is a cat card and is powerless on its own. Play two of the same cats as a pair to steal a random card from another player or 3 to chose the card you want from them"}],["# players + 1",{"name":"Defuse","description":"Instead of exploding, put your last drawn card back into the deck"}],["# players",{"name":"Exploding Kitten","description":"Show this card immediately"}],["6",{"name":"Feral Cat","description":"Use as any cat card"}],["1",{"name":"Streaking Kitten","description":"Keep this card a secret. As long as it\'s in your hand you may draw and secretly hold one Exploding Kitten without blowing up"}]]},{"name":"The  Purrage","description":"A game of betrayal as created by Smosh Games!","min-players":3,"max-players":5,"defuses-on-start":1,"duration":10,"cards":[["8",{"name":"Nope","description":"Stop the action of another player. You can play this at any time"}],["4",{"name":"Targeted Attack (2X)","description":"End your turn without drawing a card. Force one player to take two turns. Game continues from that player"}],["5",{"name":"Reverse","description":"Reverse the order of play and end your turn without drawing a card"}],["# players -1",{"name":"Exploding Kitten","description":"Show this card immediately"}],["6",{"name":"Attack (2X)","description":"End your turn without drawing a card. Force the next player to take two turns"}],["1",{"name":"Imploding Kitten","description":"When drawn face down, put back in the deck face up, without using a defuse. When drawn face up, explode immediately. This card cannot be defused"}],["2",{"name":"Super Skip","description":"End your turn without drawing a card. If you’re supposed to take multiple turns, end them all"}],["# players",{"name":"Defuse","description":"Instead of exploding, put your last drawn card back into the deck"}]]}]';

    // const decodedRecipes = JSON.parse(json_response) as Recipe[];

    // setRecipeList(decodedRecipes);

    // recipeList.map((r) =>
    //   console.log(
    //     r.name.toLocaleLowerCase().split(" ").join("").trim() + ".png",
    //   ),
    // );
  };

  useEffect(() => {
    getRecipesList();
  }, []);

  const getURL = (name: string) => {
    return new URL(
      "./images/recipes/" +
        name.toLocaleLowerCase().split(" ").join("").trim() +
        ".png",
      import.meta.url,
    ).href;
  };

  return (
    <div className="container">
      <h2 className="bold">
        CHOOSE YOUR <span className="exploding-text">RECIPE</span>
      </h2>

      <Carousel responsive={responsive} className="carrousel">
        {recipeList.map((r) => (
          <div
            key={r.name}
            className={"fit " + (chosenRecipe?.name === r.name ? "glow" : "")}
          >
            <div
              className={"recipe-card"}
              onClick={() => {
                setChosenRecipe(r);
                console.log("name" + r.name);
              }}
            >
              <img
                src={getURL(r.name)}
                alt=""
                className="recipe-face"
                draggable="false"
              />
            </div>
          </div>
        ))}
      </Carousel>

      <div className="ingredients-card">
        {chosenRecipe ? (
          chosenRecipe.cards.map(([num, card]) => (
            <div className="ingredients">
              {num} x {card.name}
            </div>
          ))
        ) : (
          <div className="ingredients">
            Click on a recipe to show ingredients
          </div>
        )}
        <img src={framesvg} alt="" className="recipe-unfolded" />
      </div>
    </div>
  );
};
