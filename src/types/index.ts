export interface GolferScore {
  id: string;
  name: string;
  group: number;
  groupPosition?: number;
  rounds: {
    round1: number | null;
    round2: number | null;
    round3: number | null;
    round4: number | null;
  };
  total: number | 'WD' | null;
  position: number | 'WD' | 'CUT';
  madeCut: boolean;
  thru: string;
}

export interface PoolMember {
  id: string;
  name: string;
  picks: GolferScore[];
  bestFourTotal: number;
  roundPositions: {
    round1: number | 'CUT';
    round2: number | 'CUT';
    round3: number | 'CUT';
    round4: number | 'CUT';
    current: number | 'CUT';
  };
  isCut: boolean;
}

export interface MastersPlayer {
  position: string;
  playerName: string;
  total: number | string | null;
  thru: string;
  round: string;
  r1: number | null;
  r2: number | null;
  r3: number | null;
  r4: number | null;
  strokes: number | null;
  proj: number | null;
  starting: number | null;
  oddsToWin: string;
} 