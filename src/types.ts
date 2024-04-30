export type Room = {
  name: string;
  players: string[];
  started: boolean;
  recipe?: Recipe;
};

export type Recipe = {
  name: string;
  description: string;
  minPlayers: number;
  maxPlayers: number;
  duration: number;
  cards: [string, Card][];
};

export type Card = {
  name: string;
  description: string;
};
