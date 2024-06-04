import { Team } from './team';

export type Game = {
  id: number;
  fullTime: boolean;
  startDate: string;
  round: string | null;
  leagueId: number | null;
  homeId: number;
  awayId: number;
  homeScore: number | null;
  awayScore: number | null;
  homePenalty: number | null;
  awayPenalty: number | null;
  home: Team;
  away: Team;
  league: {
    name: string;
  };
};
