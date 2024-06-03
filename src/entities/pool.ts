enum Mode {
  normal = 'normal',
  custom = 'custom',
}

enum Scoring {
  oneZero = 'oneZero',
}

export type Pool = {
  id: string;
  name: string;
  code: string;
  createdAt: string;
  startTime: string;
  endTime: string;
  ownerId: string;
  mode: Mode;
  scoring: Scoring;
  gamesClosed: number;
  nGames: number;
  games: number[];
  leagueId: number | null;
  league: string | null;
  poolFinished: boolean;
  winners: string[];
  owner: {
    name: string;
  };
};

export type PoolProps = {
  pool: Pool;
};
