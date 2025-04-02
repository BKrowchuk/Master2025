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
  position: number;
  madeCut: boolean;
}

export interface PoolMember {
  id: string;
  name: string;
  picks: GolferScore[];
  bestFourTotal: number;
  roundPositions: {
    round1: number;
    round2: number;
    round3: number;
    round4: number;
    current: number;
  };
  isCut: boolean;
} 