# Masters Pool Leaderboard

A real-time leaderboard application for tracking Masters Tournament pool results. Built with React, TypeScript, and Material-UI.


## TODO
- history 
- different views buttons formatting so to avoid collisions
- based on the leaderboard show thru # but still total score is best 8 scores that arent cut
- formatting the same way the short masters leaderboard does (red lines) also make the main lines white and red and green as well
- deploy it
- get the table to not show cut or nans or weird stuff on edge cases like before the tournament starts
- write emails


## How to get Leaderboard
Prompt used for chat gpt: is there a way to extract the raw data from a website table?

### Console this works.
```
[...document.querySelectorAll("table tr")].map(row =>
  [...row.querySelectorAll("td, th")].map(cell => cell.innerText)
)
```
### Python Maybe?
```
import requests
from bs4 import BeautifulSoup

url = "https://example.com/table"
res = requests.get(url)
soup = BeautifulSoup(res.text, "html.parser")

table = soup.find("table")
rows = table.find_all("tr")
data = [[cell.text.strip() for cell in row.find_all(["td", "th"])] for row in rows]

```


## Features

- **Real-time Leaderboard**: Track pool members' standings throughout the tournament
- **Detailed Player Stats**: View individual player scores, rounds, and positions
- **Multiple Views**:
  - Current tournament standings
  - Historical results
- **Interactive Features**:
  - Expandable/collapsible pool member details
  - Sort players by score or group
  - Condensed/expanded view options
- **Visual Indicators**:
  - Color-coded position chips (Gold, Silver, Bronze)
  - Cut status highlighting
  - Score formatting (positive/negative)

## Data Structure

The application uses three main data files:

1. `mastersLeaderboard.ts`: Contains the official tournament leaderboard data
2. `mockGolfers.ts`: Maps leaderboard data to pool-usable format
3. `mockData.ts`: Processes pool member picks and calculates standings

## Sorting Options

The player list within each pool member's details can be sorted in two ways:

1. **By Score**: Shows players ordered by their total tournament score
2. **By Group**: Shows players in their original selection order (1-15)

## View Modes

- **Current**: Shows the ongoing tournament standings
- **Past**: Displays historical tournament results

## Technical Details

- Built with React and TypeScript
- Uses Material-UI for components and styling
- Responsive design that works on desktop and mobile
- Real-time score updates (when connected to live data)

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

## Data Updates

To update the tournament data:

1. Update `mastersLeaderboard.ts` with the latest scores
2. The application will automatically process and display the new data

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is licensed under the MIT License. 