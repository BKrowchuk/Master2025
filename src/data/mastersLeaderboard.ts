import consoleData from './ConsoleData.json';
import golfers from './golfers.json';

export interface MastersPlayer {
  position: string;
  playerName: string;
  total: number | null | 'WD';
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
  group?: number;
  groupPosition?: number;
}

// Function to parse score string to number
function parseScore(score: string): number | null {
  if (score === "-" || score === "" || score === undefined) return null;
  if (score === "E") return 0;
  return parseInt(score.replace("+", ""), 10);
}

// Function to parse prize money string
function parsePrizeMoney(money: string): string {
  if (!money || money === "$0") return "$0";
  return money;
}

// Function to parse FedEx points
function parseFedExPoints(points: string): number {
  if (!points) return 0;
  return parseFloat(points);
}

// Function to clean player name
function cleanPlayerName(name: string | undefined): string {
  if (!name) return '';
  // Remove newlines and extra spaces, and ensure (a) is properly formatted
  return name
    .replace(/\n/g, '')
    .replace(/\s+/g, ' ')
    .replace(/\s*\(a\)\s*/g, ' (a)')
    .trim();
}

// Function to get player's group and group position
function getPlayerGroupInfo(playerName: string): { group?: number; groupPosition?: number } {
  const golfer = golfers.find(g => g.name === playerName);
  if (!golfer) return {};

  // Calculate group position by counting how many players are in the same group
  const groupPosition = golfers
    .filter(g => g.group === golfer.group)
    .findIndex(g => g.name === playerName) + 1;

  return {
    group: golfer.group,
    groupPosition
  };
}

// Function to parse the console data and populate the leaderboard
export function populateLeaderboardFromConsoleData(consoleData: any[]): MastersPlayer[] {
  const leaderboard: MastersPlayer[] = [];
  
  // Find the first non-empty row that starts with "POS" to get the header
  const headerRow = consoleData.find(row => row.length > 0 && row[0] === "POS");
  if (!headerRow) return leaderboard;
  
  const headerIndex = consoleData.indexOf(headerRow);
  
  // Process rows after the header
  for (let i = headerIndex + 1; i < consoleData.length; i++) {
    const row = consoleData[i];
    
    // Skip empty rows and headers
    if (row.length === 0 || row[0] === "POS") continue;
    
    // Skip rows that are just empty strings or don't have enough data
    if (row.length === 1 && row[0] === "") continue;
    if (!row[2]) continue; // Skip if player name is missing
    
    const playerName = cleanPlayerName(row[2]);
    const { group, groupPosition } = getPlayerGroupInfo(playerName);
    
    const player: MastersPlayer = {
      position: row[0] || '',
      playerName,
      total: parseScore(row[3]),
      thru: row[4] || '',
      round: row[5] || '',
      r1: parseScore(row[6]),
      r2: parseScore(row[7]),
      r3: parseScore(row[8]),
      r4: parseScore(row[9]),
      strokes: parseScore(row[10]),
      proj: parseScore(row[11]),
      starting: parseScore(row[12]),
      oddsToWin: row[14] || '',
      group,
      groupPosition
    };
    
    leaderboard.push(player);
  }
  
  return leaderboard;
}

// Initialize the leaderboard with the console data
export const mastersLeaderboard: MastersPlayer[] = [
  ...populateLeaderboardFromConsoleData(consoleData),
  {
    position: "WD",
    playerName: "Vijay Singh",
    total: "WD",
    thru: "WD",
    round: "WD",
    r1: null,
    r2: null,
    r3: null,
    r4: null,
    strokes: null,
    proj: null,
    starting: null,
    oddsToWin: "WD",
    group: 15,
    groupPosition: 2
  }
]; 