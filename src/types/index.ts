export interface GolferScore {
  id: string;
  name: string;
  rounds: {
    round1: number | null;
    round2: number | null;
    round3: number | null;
    round4: number | null;
  };
  total: number;
  position: number | 'CUT';
  madeCut: boolean;
  group: number;
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
  name: string;
  position: number | 'CUT';
  round1: number | null;
  round2: number | null;
  round3: number | null;
  round4: number | null;
  total: number;
  fedexPoints: number;
  prizeMoney: number;
} 