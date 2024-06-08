export type Guess = {
  id: string;
  homeScore: number;
  awayScore: number;
  points: number;
  isVisible: boolean;
  createdAt: string;
  gameId: number;
  gameFull: boolean;
  playerId: string;
  player: {
    user: {
      name: string;
    };
  };
};
