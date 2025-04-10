import consoleData from './ConsoleData.json';

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
function cleanPlayerName(name: string): string {
  // Remove newlines and extra spaces, and ensure (a) is properly formatted
  return name
    .replace(/\n/g, '')
    .replace(/\s+/g, ' ')
    .replace(/\s*\(a\)\s*/g, ' (a)')
    .trim();
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
    
    // Skip rows that are just empty strings
    if (row.length === 1 && row[0] === "") continue;
    const player: MastersPlayer = {
      position: row[0],
      playerName: cleanPlayerName(row[2]),
      total: parseScore(row[3]),
      thru: row[4],
      round: row[5],
      r1: parseScore(row[6]),
      r2: parseScore(row[7]),
      r3: parseScore(row[8]),
      r4: parseScore(row[9]),
      strokes: parseScore(row[10]),
      proj: parseScore(row[11]),
      starting: parseScore(row[12]),
      oddsToWin: row[14]
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
    oddsToWin: "WD"
  }
]; 