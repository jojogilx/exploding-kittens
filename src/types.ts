export type Room = {
  name: string;
  players: string[];
  started: boolean;
  recipe: Recipe;
};

export type Recipe = {
  name: string;
  description: string;
  min_players: number;
  max_players: number;
  duration: number;
  cards: [Card, string][];
  available: boolean;
};

export type Card = {
  name: string;
  description: string;
};

export type RoomEvent =
  | { event: "joined"; player: string; player_list: [string, number][] }
  | { event: "left"; player: string; player_list: [string, number][] }
  | { event: "started" }
  | { event: "room_state"; player_list: [string, number][]; recipe: Recipe }
  | { event: "winner"; player: string }
  | { event: "information"; information: string }
  | { event: "new_turn"; player: string }
  | { event: "piles"; draw_size: number; last_discarded?: string }
  | { event: "draw_card"; card: Card }
  | { event: "hand"; player_hand: Card[] };

export type PromptResponse = PlayCardRespose;

export type PlayCardRespose = { request: "play_card"; index: number };
