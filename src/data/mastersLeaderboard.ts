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

export const mastersLeaderboard: MastersPlayer[] = [
  {
    name: "Scottie Scheffler",
    position: "1",
    round1: -6,
    round2: 0,
    round3: -1,
    round4: -4,
    total: -11,
    fedexPoints: 750.00,
    prizeMoney: "$3,600,000"
  },
  {
    name: "Ludvig Åberg",
    position: "2",
    round1: 1,
    round2: -3,
    round3: -2,
    round4: -3,
    total: -7,
    fedexPoints: 400.00,
    prizeMoney: "$2,160,000"
  },
  {
    name: "Tommy Fleetwood",
    position: "T3",
    round1: 0,
    round2: -1,
    round3: 0,
    round4: -3,
    total: -4,
    fedexPoints: 325.00,
    prizeMoney: "$1,040,000"
  },
  {
    name: "Collin Morikawa",
    position: "T3",
    round1: -1,
    round2: -2,
    round3: -3,
    round4: 2,
    total: -4,
    fedexPoints: 325.00,
    prizeMoney: "$1,040,000"
  },
  {
    name: "Max Homa",
    position: "T3",
    round1: -5,
    round2: -1,
    round3: 1,
    round4: 1,
    total: -4,
    fedexPoints: 325.00,
    prizeMoney: "$1,040,000"
  },
  {
    name: "Bryson DeChambeau",
    position: "T6",
    round1: -7,
    round2: 1,
    round3: 3,
    round4: 1,
    total: -2,
    fedexPoints: 0.00,
    prizeMoney: "$695,000"
  },
  {
    name: "Cameron Smith",
    position: "T6",
    round1: -1,
    round2: 0,
    round3: 0,
    round4: -1,
    total: -2,
    fedexPoints: 0.00,
    prizeMoney: "$695,000"
  },
  {
    name: "Xander Schauffele",
    position: "8",
    round1: 0,
    round2: 0,
    round3: -2,
    round4: 1,
    total: -1,
    fedexPoints: 225.00,
    prizeMoney: "$620,000"
  },
  {
    name: "Will Zalatoris",
    position: "T9",
    round1: -2,
    round2: 5,
    round3: 0,
    round4: -3,
    total: 0,
    fedexPoints: 180.00,
    prizeMoney: "$540,000"
  },
  {
    name: "Cameron Young",
    position: "T9",
    round1: -2,
    round2: 1,
    round3: 0,
    round4: 1,
    total: 0,
    fedexPoints: 180.00,
    prizeMoney: "$540,000"
  },
  {
    name: "Tyrrell Hatton",
    position: "T9",
    round1: 0,
    round2: 2,
    round3: 1,
    round4: -3,
    total: 0,
    fedexPoints: 180.00,
    prizeMoney: "$540,000"
  },
  {
    name: "Cam Davis",
    position: "T12",
    round1: -3,
    round2: 0,
    round3: 1,
    round4: 3,
    total: 1,
    fedexPoints: 140.00,
    prizeMoney: "$405,000"
  },
  {
    name: "Matthieu Pavon",
    position: "T12",
    round1: -2,
    round2: 1,
    round3: 2,
    round4: 0,
    total: 1,
    fedexPoints: 140.00,
    prizeMoney: "$405,000"
  },
  {
    name: "Patrick Reed",
    position: "T12",
    round1: 2,
    round2: -2,
    round3: 1,
    round4: 0,
    total: 1,
    fedexPoints: 0.00,
    prizeMoney: "$405,000"
  },
  {
    name: "Adam Schenk",
    position: "T12",
    round1: 1,
    round2: -1,
    round3: 0,
    round4: 1,
    total: 1,
    fedexPoints: 140.00,
    prizeMoney: "$405,000"
  },
  {
    name: "Chris Kirk",
    position: "T16",
    round1: 2,
    round2: 3,
    round3: -4,
    round4: 1,
    total: 2,
    fedexPoints: 112.50,
    prizeMoney: "$310,000"
  },
  {
    name: "Nicolai Højgaard",
    position: "T16",
    round1: -5,
    round2: 1,
    round3: 2,
    round4: 4,
    total: 2,
    fedexPoints: 112.50,
    prizeMoney: "$310,000"
  },
  {
    name: "Byeong Hun An",
    position: "T16",
    round1: -2,
    round2: 1,
    round3: 0,
    round4: 3,
    total: 2,
    fedexPoints: 112.50,
    prizeMoney: "$310,000"
  },
  {
    name: "Sepp Straka",
    position: "T16",
    round1: 1,
    round2: -1,
    round3: 2,
    round4: 0,
    total: 2,
    fedexPoints: 112.50,
    prizeMoney: "$310,000"
  },
  {
    name: "Lucas Glover",
    position: "T20",
    round1: -1,
    round2: 1,
    round3: 0,
    round4: 3,
    total: 3,
    fedexPoints: 97.50,
    prizeMoney: "$250,000"
  },
  {
    name: "Taylor Moore",
    position: "T20",
    round1: -1,
    round2: 3,
    round3: 3,
    round4: -2,
    total: 3,
    fedexPoints: 97.50,
    prizeMoney: "$250,000"
  },
  {
    name: "Keegan Bradley",
    position: "T22",
    round1: 6,
    round2: -1,
    round3: 2,
    round4: -3,
    total: 4,
    fedexPoints: 72.50,
    prizeMoney: "$175,500"
  },
  {
    name: "Patrick Cantlay",
    position: "T22",
    round1: -1,
    round2: 3,
    round3: -2,
    round4: 4,
    total: 4,
    fedexPoints: 72.50,
    prizeMoney: "$175,500"
  },
  {
    name: "Harris English",
    position: "T22",
    round1: 0,
    round2: 2,
    round3: 3,
    round4: -1,
    total: 4,
    fedexPoints: 72.50,
    prizeMoney: "$175,500"
  },
  {
    name: "Adam Scott",
    position: "T22",
    round1: 4,
    round2: 2,
    round3: -2,
    round4: 0,
    total: 4,
    fedexPoints: 72.50,
    prizeMoney: "$175,500"
  },
  {
    name: "Min Woo Lee",
    position: "T22",
    round1: 2,
    round2: 2,
    round3: 3,
    round4: -3,
    total: 4,
    fedexPoints: 72.50,
    prizeMoney: "$175,500"
  },
  {
    name: "Joaquin Niemann",
    position: "T22",
    round1: -2,
    round2: 6,
    round3: -1,
    round4: 1,
    total: 4,
    fedexPoints: 0.00,
    prizeMoney: "$175,500"
  },
  {
    name: "Matt Fitzpatrick",
    position: "T22",
    round1: 0,
    round2: 3,
    round3: 1,
    round4: 0,
    total: 4,
    fedexPoints: 72.50,
    prizeMoney: "$175,500"
  },
  {
    name: "Tiger Woods",
    position: "60",
    round1: 1,
    round2: 0,
    round3: 10,
    round4: 5,
    total: 16,
    fedexPoints: 8.25,
    prizeMoney: "$44,400"
  },
  {
    name: "Zach Johnson",
    position: "CUT",
    round1: 4,
    round2: 3,
    round3: null,
    round4: null,
    total: 7,
    fedexPoints: 0.00,
    prizeMoney: "$0"
  },
  {
    name: "Justin Thomas",
    position: "CUT",
    round1: 0,
    round2: 7,
    round3: null,
    round4: null,
    total: 7,
    fedexPoints: 0.00,
    prizeMoney: "$0"
  },
  {
    name: "Wyndham Clark",
    position: "CUT",
    round1: 1,
    round2: 6,
    round3: null,
    round4: null,
    total: 7,
    fedexPoints: 0.00,
    prizeMoney: "$0"
  },
  {
    name: "Austin Eckroat",
    position: "CUT",
    round1: 2,
    round2: 5,
    round3: null,
    round4: null,
    total: 7,
    fedexPoints: 0.00,
    prizeMoney: "$0"
  },
  {
    name: "Nick Dunlap",
    position: "CUT",
    round1: 5,
    round2: 2,
    round3: null,
    round4: null,
    total: 7,
    fedexPoints: 0.00,
    prizeMoney: "$0"
  },
  {
    name: "Lee Hodges",
    position: "CUT",
    round1: 2,
    round2: 5,
    round3: null,
    round4: null,
    total: 7,
    fedexPoints: 0.00,
    prizeMoney: "$0"
  },
  {
    name: "Mike Weir",
    position: "CUT",
    round1: 2,
    round2: 5,
    round3: null,
    round4: null,
    total: 7,
    fedexPoints: 0.00,
    prizeMoney: "$0"
  },
  {
    name: "Justin Rose",
    position: "CUT",
    round1: 1,
    round2: 6,
    round3: null,
    round4: null,
    total: 7,
    fedexPoints: 0.00,
    prizeMoney: "$0"
  },
  {
    name: "Sungjae Im",
    position: "CUT",
    round1: 5,
    round2: 2,
    round3: null,
    round4: null,
    total: 7,
    fedexPoints: 0.00,
    prizeMoney: "$0"
  },
  {
    name: "Sergio Garcia",
    position: "CUT",
    round1: 0,
    round2: 7,
    round3: null,
    round4: null,
    total: 7,
    fedexPoints: 0.00,
    prizeMoney: "$0"
  },
  {
    name: "Christo Lamprecht",
    position: "CUT",
    round1: 2,
    round2: 6,
    round3: null,
    round4: null,
    total: 8,
    fedexPoints: 0.00,
    prizeMoney: "$0"
  },
  {
    name: "Viktor Hovland",
    position: "CUT",
    round1: -1,
    round2: 9,
    round3: null,
    round4: null,
    total: 8,
    fedexPoints: 0.00,
    prizeMoney: "$0"
  },
  {
    name: "Stewart Hagestad",
    position: "CUT",
    round1: 2,
    round2: 6,
    round3: null,
    round4: null,
    total: 8,
    fedexPoints: 0.00,
    prizeMoney: "$0"
  },
  {
    name: "Sam Burns",
    position: "CUT",
    round1: 8,
    round2: 1,
    round3: null,
    round4: null,
    total: 9,
    fedexPoints: 0.00,
    prizeMoney: "$0"
  },
  {
    name: "Jordan Spieth",
    position: "CUT",
    round1: 7,
    round2: 2,
    round3: null,
    round4: null,
    total: 9,
    fedexPoints: 0.00,
    prizeMoney: "$0"
  },
  {
    name: "Brian Harman",
    position: "CUT",
    round1: 9,
    round2: 0,
    round3: null,
    round4: null,
    total: 9,
    fedexPoints: 0.00,
    prizeMoney: "$0"
  },
  {
    name: "Bubba Watson",
    position: "CUT",
    round1: 2,
    round2: 8,
    round3: null,
    round4: null,
    total: 10,
    fedexPoints: 0.00,
    prizeMoney: "$0"
  },
  {
    name: "Peter Malnati",
    position: "CUT",
    round1: 10,
    round2: 0,
    round3: null,
    round4: null,
    total: 10,
    fedexPoints: 0.00,
    prizeMoney: "$0"
  },
  {
    name: "Stephan Jaeger",
    position: "CUT",
    round1: 2,
    round2: 8,
    round3: null,
    round4: null,
    total: 10,
    fedexPoints: 0.00,
    prizeMoney: "$0"
  },
  {
    name: "Santiago De la Fuente",
    position: "CUT",
    round1: 4,
    round2: 6,
    round3: null,
    round4: null,
    total: 10,
    fedexPoints: 0.00,
    prizeMoney: "$0"
  },
  {
    name: "Charl Schwartzel",
    position: "CUT",
    round1: 2,
    round2: 9,
    round3: null,
    round4: null,
    total: 11,
    fedexPoints: 0.00,
    prizeMoney: "$0"
  },
  {
    name: "Ryo Hisatsune",
    position: "CUT",
    round1: 6,
    round2: 6,
    round3: null,
    round4: null,
    total: 12,
    fedexPoints: 0.00,
    prizeMoney: "$0"
  },
  {
    name: "Fred Couples",
    position: "CUT",
    round1: 8,
    round2: 4,
    round3: null,
    round4: null,
    total: 12,
    fedexPoints: 0.00,
    prizeMoney: "$0"
  },
  {
    name: "Jasper Stubbs",
    position: "CUT",
    round1: 8,
    round2: 4,
    round3: null,
    round4: null,
    total: 12,
    fedexPoints: 0.00,
    prizeMoney: "$0"
  },
  {
    name: "Dustin Johnson",
    position: "CUT",
    round1: 6,
    round2: 7,
    round3: null,
    round4: null,
    total: 13,
    fedexPoints: 0.00,
    prizeMoney: "$0"
  },
  {
    name: "Gary Woodland",
    position: "CUT",
    round1: 4,
    round2: 9,
    round3: null,
    round4: null,
    total: 13,
    fedexPoints: 0.00,
    prizeMoney: "$0"
  },
  {
    name: "Nick Taylor",
    position: "CUT",
    round1: 5,
    round2: 9,
    round3: null,
    round4: null,
    total: 14,
    fedexPoints: 0.00,
    prizeMoney: "$0"
  },
  {
    name: "Adrian Meronk",
    position: "CUT",
    round1: 6,
    round2: 8,
    round3: null,
    round4: null,
    total: 14,
    fedexPoints: 0.00,
    prizeMoney: "$0"
  },
  {
    name: "Emiliano Grillo",
    position: "CUT",
    round1: 4,
    round2: 11,
    round3: null,
    round4: null,
    total: 15,
    fedexPoints: 0.00,
    prizeMoney: "$0"
  }
]; 