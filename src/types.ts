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
  cards: Card[];
  front_image?: string;
  back_image?: string;
};

export type Card = {
  name: string;
  description: string;
};
