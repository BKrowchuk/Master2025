import consoleData from './ConsoleData.json';

export interface MastersPlayer {
  name: string;
  position: string;
  round1: number;
  round2: number;
  round3: number | null;
  round4: number | null;
  total: number;
  fedexPoints: number;
  prizeMoney: string;
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
      name: row[1].replace("\n\n(a)", " (a)").replace("Å", "A").replace("å", "a").replace("ø", "o").replace("Ø", "O"), // Clean up amateur designation and special characters
      position: row[0],
      round1: parseScore(row[2]) || 0,
      round2: parseScore(row[3]) || 0,
      round3: parseScore(row[4]),
      round4: parseScore(row[5]),
      total: parseScore(row[6]) || 0,
      fedexPoints: parseFedExPoints(row[7]),
      prizeMoney: parsePrizeMoney(row[8])
    };
    
    leaderboard.push(player);
  }
  
  return leaderboard;
}

// Initialize the leaderboard with the console data
export const mastersLeaderboard: MastersPlayer[] = populateLeaderboardFromConsoleData(consoleData); 