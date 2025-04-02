import { GolferScore, PoolMember } from '../types';

export const mockGolfers: GolferScore[] = [
  {
    id: '1',
    name: 'Scottie Scheffler',
    rounds: { round1: -7, round2: -2, round3: -4, round4: -3 },
    total: -16,
    position: 1,
    madeCut: true
  },
  {
    id: '2',
    name: 'Rory McIlroy',
    rounds: { round1: -4, round2: -3, round3: -5, round4: -2 },
    total: -14,
    position: 2,
    madeCut: true
  },
  {
    id: '3',
    name: 'Jon Rahm',
    rounds: { round1: -3, round2: -4, round3: -2, round4: -4 },
    total: -13,
    position: 3,
    madeCut: true
  },
  {
    id: '4',
    name: 'Brooks Koepka',
    rounds: { round1: -2, round2: -3, round3: null, round4: null },
    total: -5,
    position: 55,
    madeCut: false
  },
  {
    id: '5',
    name: 'Jordan Spieth',
    rounds: { round1: -4, round2: -2, round3: -3, round4: -1 },
    total: -10,
    position: 4,
    madeCut: true
  },
  {
    id: '6',
    name: 'Justin Thomas',
    rounds: { round1: -3, round2: -4, round3: -2, round4: -1 },
    total: -10,
    position: 5,
    madeCut: true
  },
  {
    id: '7',
    name: 'Xander Schauffele',
    rounds: { round1: -5, round2: -1, round3: -3, round4: -2 },
    total: -11,
    position: 6,
    madeCut: true
  },
  {
    id: '8',
    name: 'Patrick Cantlay',
    rounds: { round1: -2, round2: -3, round3: -4, round4: -2 },
    total: -11,
    position: 7,
    madeCut: true
  },
  {
    id: '9',
    name: 'Viktor Hovland',
    rounds: { round1: -3, round2: -2, round3: null, round4: null },
    total: -5,
    position: 56,
    madeCut: false
  },
  {
    id: '10',
    name: 'Collin Morikawa',
    rounds: { round1: -4, round2: -3, round3: -2, round4: -1 },
    total: -10,
    position: 8,
    madeCut: true
  }
];

// Helper function to get best 4 players for a pool member
function getBestFourPlayers(picks: GolferScore[]): GolferScore[] {
  return picks
    .sort((a, b) => a.total - b.total)
    .slice(0, 4);
}

// Helper function to calculate best four scores for a round
function calculateBestFourForRound(picks: GolferScore[], roundKey: 'round1' | 'round2' | 'round3' | 'round4'): number {
  const bestFour = getBestFourPlayers(picks);
  return bestFour
    .map(golfer => golfer.rounds[roundKey] || 0)
    .reduce((sum, score) => sum + score, 0);
}

// Helper function to calculate best four total
function calculateBestFourTotal(picks: GolferScore[]): number {
  return getBestFourPlayers(picks)
    .reduce((sum, golfer) => sum + golfer.total, 0);
}

// Helper function to check if a pool member is cut
function isPoolMemberCut(picks: GolferScore[]): boolean {
  const playersWhoMadeCut = picks.filter(golfer => golfer.madeCut).length;
  return playersWhoMadeCut < 4;
}

// Calculate positions for all pool members for a specific round
function calculateRoundPositions(poolMembers: { id: string; picks: GolferScore[] }[], roundKey: 'round1' | 'round2' | 'round3' | 'round4'): { [key: string]: number } {
  const roundScores = poolMembers.map(member => ({
    id: member.id,
    score: calculateBestFourForRound(member.picks, roundKey)
  }));
  
  roundScores.sort((a, b) => a.score - b.score);
  
  const positions: { [key: string]: number } = {};
  roundScores.forEach((score, index) => {
    positions[score.id] = index + 1;
  });
  
  return positions;
}

// Calculate cumulative scores up to a specific round
function calculateCumulativeScore(picks: GolferScore[], roundKey: 'round1' | 'round2' | 'round3' | 'round4'): number {
  const bestFour = getBestFourPlayers(picks);
  let total = 0;
  
  // Add up scores for all rounds up to and including the specified round
  if (roundKey === 'round1') {
    total = bestFour.reduce((sum, golfer) => sum + (golfer.rounds.round1 || 0), 0);
  } else if (roundKey === 'round2') {
    total = bestFour.reduce((sum, golfer) => sum + (golfer.rounds.round1 || 0) + (golfer.rounds.round2 || 0), 0);
  } else if (roundKey === 'round3') {
    total = bestFour.reduce((sum, golfer) => sum + (golfer.rounds.round1 || 0) + (golfer.rounds.round2 || 0) + (golfer.rounds.round3 || 0), 0);
  } else if (roundKey === 'round4') {
    total = bestFour.reduce((sum, golfer) => sum + (golfer.rounds.round1 || 0) + (golfer.rounds.round2 || 0) + (golfer.rounds.round3 || 0) + (golfer.rounds.round4 || 0), 0);
  }
  
  return total;
}

// Calculate positions based on cumulative scores up to a specific round
function calculateCumulativePositions(poolMembers: { id: string; picks: GolferScore[] }[], roundKey: 'round1' | 'round2' | 'round3' | 'round4'): { [key: string]: number } {
  const cumulativeScores = poolMembers.map(member => ({
    id: member.id,
    score: calculateCumulativeScore(member.picks, roundKey)
  }));
  
  cumulativeScores.sort((a, b) => a.score - b.score);
  
  const positions: { [key: string]: number } = {};
  cumulativeScores.forEach((score, index) => {
    positions[score.id] = index + 1;
  });
  
  return positions;
}

// Calculate all round positions for a pool member
function calculateAllRoundPositions(poolMembers: { id: string; picks: GolferScore[] }[]): { [key: string]: { round1: number; round2: number; round3: number; round4: number; current: number } } {
  const positions: { [key: string]: { round1: number; round2: number; round3: number; round4: number; current: number } } = {};
  
  // Calculate positions for each round based on cumulative scores
  const round1Positions = calculateCumulativePositions(poolMembers, 'round1');
  const round2Positions = calculateCumulativePositions(poolMembers, 'round2');
  const round3Positions = calculateCumulativePositions(poolMembers, 'round3');
  const round4Positions = calculateCumulativePositions(poolMembers, 'round4');
  
  // Calculate current positions based on best 4 total scores
  const currentScores = poolMembers.map(member => ({
    id: member.id,
    score: calculateBestFourTotal(member.picks)
  }));
  
  currentScores.sort((a, b) => a.score - b.score);
  
  const currentPositions: { [key: string]: number } = {};
  currentScores.forEach((score, index) => {
    currentPositions[score.id] = index + 1;
  });
  
  // Combine all positions for each pool member
  poolMembers.forEach(member => {
    positions[member.id] = {
      round1: round1Positions[member.id],
      round2: round2Positions[member.id],
      round3: round3Positions[member.id],
      round4: round4Positions[member.id],
      current: currentPositions[member.id]
    };
  });
  
  return positions;
}

// Create pool members with calculated positions
const poolMembersData: Omit<PoolMember, 'bestFourTotal' | 'roundPositions' | 'isCut'>[] = [
  {
    id: '1',
    name: 'John Smith',
    picks: [mockGolfers[0], mockGolfers[1], mockGolfers[2], mockGolfers[4], mockGolfers[6], mockGolfers[7]],
  },
  {
    id: '2',
    name: 'Jane Doe',
    picks: [mockGolfers[1], mockGolfers[2], mockGolfers[5], mockGolfers[6], mockGolfers[7], mockGolfers[9]],
  },
  {
    id: '3',
    name: 'Bob Wilson',
    picks: [mockGolfers[3], mockGolfers[4], mockGolfers[5], mockGolfers[6], mockGolfers[7], mockGolfers[8]],
  },
  {
    id: '4',
    name: 'Alice Johnson',
    picks: [mockGolfers[0], mockGolfers[2], mockGolfers[4], mockGolfers[6], mockGolfers[8], mockGolfers[9]],
  },
  {
    id: '5',
    name: 'Charlie Brown',
    picks: [mockGolfers[1], mockGolfers[3], mockGolfers[5], mockGolfers[7], mockGolfers[8], mockGolfers[9]],
  },
  {
    id: '6',
    name: 'David Miller',
    picks: [mockGolfers[0], mockGolfers[1], mockGolfers[3], mockGolfers[5], mockGolfers[7], mockGolfers[9]],
  },
  {
    id: '7',
    name: 'Emma Wilson',
    picks: [mockGolfers[2], mockGolfers[4], mockGolfers[5], mockGolfers[6], mockGolfers[8], mockGolfers[9]],
  },
  {
    id: '8',
    name: 'Frank Thompson',
    picks: [mockGolfers[0], mockGolfers[2], mockGolfers[5], mockGolfers[6], mockGolfers[7], mockGolfers[8]],
  },
  {
    id: '9',
    name: 'Sarah Davis',
    picks: [mockGolfers[0], mockGolfers[1], mockGolfers[2], mockGolfers[3], mockGolfers[4], mockGolfers[5]],
  },
  {
    id: '10',
    name: 'Michael Chen',
    picks: [mockGolfers[3], mockGolfers[4], mockGolfers[8], mockGolfers[9], mockGolfers[0], mockGolfers[1]],
  },
  {
    id: '11',
    name: 'Lisa Anderson',
    picks: [mockGolfers[2], mockGolfers[3], mockGolfers[4], mockGolfers[8], mockGolfers[9], mockGolfers[0]],
  },
  {
    id: '12',
    name: 'Tom Wilson',
    picks: [mockGolfers[5], mockGolfers[6], mockGolfers[7], mockGolfers[8], mockGolfers[9], mockGolfers[0]],
  },
  {
    id: '13',
    name: 'Rachel Green',
    picks: [mockGolfers[0], mockGolfers[2], mockGolfers[4], mockGolfers[6], mockGolfers[8], mockGolfers[9]],
  },
  {
    id: '14',
    name: 'James Bond',
    picks: [mockGolfers[1], mockGolfers[3], mockGolfers[5], mockGolfers[7], mockGolfers[8], mockGolfers[9]],
  },
  {
    id: '15',
    name: 'Maria Garcia',
    picks: [mockGolfers[0], mockGolfers[1], mockGolfers[2], mockGolfers[3], mockGolfers[8], mockGolfers[9]],
  }
];

// Calculate all positions
const allPositions = calculateAllRoundPositions(poolMembersData);

// Create final pool members array with calculated values
export const mockPoolMembers: PoolMember[] = poolMembersData.map(member => ({
  ...member,
  bestFourTotal: calculateBestFourTotal(member.picks),
  roundPositions: allPositions[member.id],
  isCut: isPoolMemberCut(member.picks)
})); 