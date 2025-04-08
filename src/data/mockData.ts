import { GolferScore, PoolMember } from '../types';
import responses from './responses.csv?raw';
import { mockGolfers } from './mockGolfers';

// Extract all unique golfer names from responses.csv
const getUniqueGolfers = (csvText: string): string[] => {
  const lines = csvText.split('\n');
  const golfers = new Set<string>();
  
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',');
    for (let j = 1; j < values.length; j++) {
      golfers.add(values[j].trim());
    }
  }
  
  return Array.from(golfers);
};

const allGolfers = getUniqueGolfers(responses);

// Function to find a golfer in mockGolfers by name
const findGolferByName = (name: string): GolferScore | undefined => {
  const golfer = mockGolfers.find(golfer => golfer.name === name);
  if (!golfer) {
    console.warn(`Golfer not found: ${name}`);
  }
  return golfer;
};

// Function to read and parse CSV file
const parseCSV = (csvText: string): Omit<PoolMember, 'bestFourTotal' | 'roundPositions' | 'isCut'>[] => {
  const lines = csvText.split('\n');
  const headers = lines[0].split(',');
  const poolMembers: Omit<PoolMember, 'bestFourTotal' | 'roundPositions' | 'isCut'>[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',');
    if (values.length === headers.length) {
      const member: Omit<PoolMember, 'bestFourTotal' | 'roundPositions' | 'isCut'> = {
        id: i.toString(),
        name: values[0],
        picks: []
      };

      for (let j = 1; j < values.length; j++) {
        const golferName = values[j].trim();
        const golfer = findGolferByName(golferName);
        if (golfer) {
          member.picks.push(golfer);
        }
      }

      poolMembers.push(member);
    }
  }

  return poolMembers;
};

// Parse the CSV data
let poolMembersData: Omit<PoolMember, 'bestFourTotal' | 'roundPositions' | 'isCut'>[] = [];
try {
  poolMembersData = parseCSV(responses);
} catch (error) {
  console.error('Error parsing responses.csv:', error);
  // Fallback to mock data if parsing fails
  poolMembersData = [
    {
      id: '1',
      name: 'John Smith',
      picks: [mockGolfers[0], mockGolfers[1], mockGolfers[2], mockGolfers[4], mockGolfers[6], mockGolfers[7], mockGolfers[8], mockGolfers[9]],
    },
    {
      id: '2',
      name: 'Jane Doe',
      picks: [mockGolfers[1], mockGolfers[2], mockGolfers[5], mockGolfers[6], mockGolfers[7], mockGolfers[9], mockGolfers[10], mockGolfers[11]],
    }
  ];
}

// Helper function to get best 8 players for a pool member
function getBestEightPlayers(picks: GolferScore[]): GolferScore[] {
  return picks
    .sort((a, b) => a.total - b.total)
    .slice(0, 8);
}

// Helper function to calculate best eight total
function calculateBestEightTotal(picks: GolferScore[]): number {
  return getBestEightPlayers(picks)
    .reduce((sum, golfer) => sum + golfer.total, 0);
}

// Helper function to check if a pool member is cut
function isPoolMemberCut(picks: GolferScore[]): boolean {
  const playersWhoMadeCut = picks.filter(golfer => golfer.madeCut).length;
  return playersWhoMadeCut < 8;
}

// Calculate positions for all pool members for a specific round
function calculateRoundPositions(poolMembers: { id: string; picks: GolferScore[] }[], roundKey: 'round1' | 'round2' | 'round3' | 'round4'): { [key: string]: number | 'CUT' } {
  // Filter out cut pool members
  const activePoolMembers = poolMembers.filter(member => !isPoolMemberCut(member.picks));
  
  const roundScores = activePoolMembers.map(member => ({
    id: member.id,
    score: getBestEightPlayers(member.picks)
      .map((golfer: GolferScore) => golfer.rounds[roundKey] || 0)
      .reduce((sum: number, score: number) => sum + score, 0)
  }));
  
  roundScores.sort((a, b) => a.score - b.score);
  
  const positions: { [key: string]: number | 'CUT' } = {};
  roundScores.forEach((score, index) => {
    positions[score.id] = index + 1;
  });
  
  // Set position to 'CUT' for cut pool members
  poolMembers.forEach(member => {
    if (isPoolMemberCut(member.picks)) {
      positions[member.id] = 'CUT';
    }
  });
  
  return positions;
}

// Calculate cumulative scores up to a specific round
function calculateCumulativeScore(picks: GolferScore[], roundKey: 'round1' | 'round2' | 'round3' | 'round4'): number {
  const bestEight = getBestEightPlayers(picks);
  let total = 0;
  
  // Add up scores for all rounds up to and including the specified round
  if (roundKey === 'round1') {
    total = bestEight.reduce((sum, golfer) => sum + (golfer.rounds.round1 || 0), 0);
  } else if (roundKey === 'round2') {
    total = bestEight.reduce((sum, golfer) => sum + (golfer.rounds.round1 || 0) + (golfer.rounds.round2 || 0), 0);
  } else if (roundKey === 'round3') {
    total = bestEight.reduce((sum, golfer) => sum + (golfer.rounds.round1 || 0) + (golfer.rounds.round2 || 0) + (golfer.rounds.round3 || 0), 0);
  } else if (roundKey === 'round4') {
    total = bestEight.reduce((sum, golfer) => sum + (golfer.rounds.round1 || 0) + (golfer.rounds.round2 || 0) + (golfer.rounds.round3 || 0) + (golfer.rounds.round4 || 0), 0);
  }
  
  return total;
}

// Calculate positions based on cumulative scores up to a specific round
function calculateCumulativePositions(poolMembers: { id: string; picks: GolferScore[] }[], roundKey: 'round1' | 'round2' | 'round3' | 'round4'): { [key: string]: number | 'CUT' } {
  // Filter out cut pool members
  const activePoolMembers = poolMembers.filter(member => !isPoolMemberCut(member.picks));
  
  const cumulativeScores = activePoolMembers.map(member => ({
    id: member.id,
    score: calculateCumulativeScore(member.picks, roundKey)
  }));
  
  cumulativeScores.sort((a, b) => a.score - b.score);
  
  const positions: { [key: string]: number | 'CUT' } = {};
  cumulativeScores.forEach((score, index) => {
    positions[score.id] = index + 1;
  });
  
  // Set position to 'CUT' for cut pool members
  poolMembers.forEach(member => {
    if (isPoolMemberCut(member.picks)) {
      positions[member.id] = 'CUT';
    }
  });
  
  return positions;
}

// Calculate all round positions for a pool member
function calculateAllRoundPositions(poolMembers: { id: string; picks: GolferScore[] }[]): { [key: string]: { round1: number | 'CUT'; round2: number | 'CUT'; round3: number | 'CUT'; round4: number | 'CUT'; current: number | 'CUT' } } {
  const positions: { [key: string]: { round1: number | 'CUT'; round2: number | 'CUT'; round3: number | 'CUT'; round4: number | 'CUT'; current: number | 'CUT' } } = {};
  
  // Calculate positions for each round based on cumulative scores
  const round1Positions = calculateCumulativePositions(poolMembers, 'round1');
  const round2Positions = calculateCumulativePositions(poolMembers, 'round2');
  const round3Positions = calculateCumulativePositions(poolMembers, 'round3');
  const round4Positions = calculateCumulativePositions(poolMembers, 'round4');
  
  // Calculate current positions based on best 8 total scores
  const activePoolMembers = poolMembers.filter(member => !isPoolMemberCut(member.picks));
  const currentScores = activePoolMembers.map(member => ({
    id: member.id,
    score: calculateBestEightTotal(member.picks)
  }));
  
  currentScores.sort((a, b) => a.score - b.score);
  
  const currentPositions: { [key: string]: number | 'CUT' } = {};
  currentScores.forEach((score, index) => {
    currentPositions[score.id] = index + 1;
  });
  
  // Set position to 'CUT' for cut pool members
  poolMembers.forEach(member => {
    if (isPoolMemberCut(member.picks)) {
      currentPositions[member.id] = 'CUT';
    }
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

// Calculate all positions
const allPositions = calculateAllRoundPositions(poolMembersData);

// Create final pool members array with calculated values
export const mockPoolMembers: PoolMember[] = poolMembersData.map(member => ({
  ...member,
  bestFourTotal: calculateBestEightTotal(member.picks),
  roundPositions: allPositions[member.id],
  isCut: isPoolMemberCut(member.picks)
})); 