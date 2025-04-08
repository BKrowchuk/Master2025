import { useState } from 'react';
import {
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  styled,
  Chip,
  IconButton,
  Tooltip,
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import HistoryIcon from '@mui/icons-material/History';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import { mockPoolMembers } from './data/mockData';

const StyledAccordion = styled(Accordion)<{ condensed?: boolean }>(({ theme, condensed }) => ({
  marginBottom: condensed ? theme.spacing(0.5) : theme.spacing(1),
  '&.Mui-expanded': {
    margin: condensed ? `${theme.spacing(0.5)} 0` : `${theme.spacing(1)} 0`,
  },
  '&:before': {
    display: 'none',
  },
  border: '1px solid #006747',
  borderRadius: '4px !important',
  overflow: 'hidden',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    boxShadow: '0 4px 12px rgba(0, 103, 71, 0.2)',
  },
}));

const StyledAccordionSummary = styled(AccordionSummary)<{ condensed?: boolean }>(({ theme, condensed }) => ({
  backgroundColor: '#006747',
  color: 'white',
  '&:hover': {
    backgroundColor: '#005238',
  },
  '& .MuiAccordionSummary-content': {
    margin: condensed ? '8px 12px' : '12px 16px',
  },
  '& .MuiAccordionSummary-expandIconWrapper': {
    color: '#FFD700',
    transition: 'transform 0.3s ease-in-out',
  },
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(180deg)',
  },
}));

const StyledAccordionDetails = styled(AccordionDetails)<{ condensed?: boolean }>(({ theme, condensed }) => ({
  padding: condensed ? theme.spacing(1) : theme.spacing(2),
  backgroundColor: '#f8f8f8',
  borderTop: '1px solid #e0e0e0',
}));

const ScoreCell = styled(TableCell)<{ score: number | null }>(({ score }) => ({
  color: score === null ? 'inherit' : score > 0 ? '#d32f2f' : score < 0 ? '#2e7d32' : 'inherit',
  fontWeight: 500,
}));

const PositionChip = styled(Chip)<{ position: number }>(({ position, theme }) => ({
  backgroundColor: position === 1 ? '#FFD700' : // Gold
                  position === 2 ? '#C0C0C0' : // Silver
                  position === 3 ? '#CD7F32' : // Bronze
                  '#006747', // Masters green
  color: position <= 3 ? '#000' : 'white',
  fontWeight: 'bold',
  marginLeft: theme.spacing(1),
  '.MuiChip-label': {
    padding: '0 8px',
  },
}));

const AppContainer = styled('div')({
  width: '100vw',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  background: `
    url("/background.svg"),
    url("/augusta.jpg")
  `,
  backgroundSize: '100% 100%, cover',
  backgroundPosition: 'center, center',
  backgroundRepeat: 'no-repeat, no-repeat',
  padding: '0',
  boxSizing: 'border-box',
  margin: 0,
  overflow: 'hidden',
  position: 'relative',
});

const LeaderboardContainer = styled('div')(({ theme }) => ({
  margin: 'auto',
  position: 'relative',
  backgroundColor: 'white',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  overflow: 'hidden',
  padding: '3px',
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  zIndex: 1,
  '@media (max-aspect-ratio: 1868/1266)': {
    width: '91vw',
    height: 'calc(72vw * 0.678)', // 1266.626/1868.3149 ≈ 0.678
    left: '0.22vw',
    bottom: 'calc(1vh)',
  },
  '@media (min-aspect-ratio: 1868/1266)': {
    width: 'calc(91vh / 0.678)', // 1266.626/1868.3149 ≈ 0.678
    height: '72vh',
    left: '0.22vw',
    bottom: 'calc(1vh)',
  },
}));

const ScrollableContent = styled('div')({
  flex: 1,
  overflowY: 'auto',
  height: '100%',
  paddingRight: '2px',
  '&::-webkit-scrollbar': {
    width: '8px',
  },
  '&::-webkit-scrollbar-track': {
    background: '#f1f1f1',
    borderRadius: '4px',
  },
  '&::-webkit-scrollbar-thumb': {
    background: '#006747',
    borderRadius: '4px',
    '&:hover': {
      background: '#005238',
    },
  },
});

const NavigationButtons = styled(ToggleButtonGroup)(({ theme }) => ({
  position: 'absolute',
  top: '20px',
  right: '20px',
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  borderRadius: '8px',
  padding: '4px',
  '& .MuiToggleButton-root': {
    color: '#006747',
    '&.Mui-selected': {
      backgroundColor: '#006747',
      color: 'white',
      '&:hover': {
        backgroundColor: '#005238',
      },
    },
    '&:hover': {
      backgroundColor: 'rgba(0, 103, 71, 0.1)',
    },
  },
}));

// Mock data for past results
const pastResults = [
  {
    year: 2024,
    top3: [
      { name: "John Smith", score: -12, prize: "$500" },
      { name: "Sarah Johnson", score: -10, prize: "$300" },
      { name: "Mike Wilson", score: -8, prize: "$200" }
    ],
    participants: 25,
  },
  {
    year: 2023,
    top3: [
      { name: "Sarah Johnson", score: -8, prize: "$450" },
      { name: "David Brown", score: -6, prize: "$270" },
      { name: "Emily Davis", score: -5, prize: "$180" }
    ],
    participants: 22,
  },
  {
    year: 2022,
    top3: [
      { name: "Mike Wilson", score: -10, prize: "$400" },
      { name: "Lisa Anderson", score: -8, prize: "$240" },
      { name: "Tom Thompson", score: -7, prize: "$160" }
    ],
    participants: 20,
  },
];

function formatScore(score: number | null): string {
  if (score === null) return '-';
  return score > 0 ? `+${score}` : score.toString();
}

function formatPosition(position: number): string {
  const suffixes = ['th', 'st', 'nd', 'rd'];
  const suffix = position <= 3 ? suffixes[position] : suffixes[0];
  return `${position}${suffix}`;
}

function PastResults() {
  return (
    <LeaderboardContainer>
      <ScrollableContent>
        <Box sx={{ pt: 2, pb: 2 }}>
          <TableContainer 
            component={Paper} 
            variant="outlined"
            sx={{
              border: '1px solid #e0e0e0',
              borderRadius: '4px',
              overflow: 'hidden',
            }}
          >
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#006747' }}>
                  <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Year</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Winner</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold', color: 'white' }}>Score</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Runner Up</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold', color: 'white' }}>Score</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>3rd Place</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold', color: 'white' }}>Score</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold', color: 'white' }}>Participants</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pastResults.map((result) => (
                  <TableRow 
                    key={result.year}
                    sx={{ 
                      '&:nth-of-type(odd)': {
                        backgroundColor: '#fafafa',
                      },
                      transition: 'background-color 0.2s ease-in-out',
                      '&:hover': {
                        backgroundColor: '#f5f5f5',
                      },
                    }}
                  >
                    <TableCell component="th" scope="row">
                      <Typography sx={{ fontWeight: 500 }}>
                        {result.year}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography>🥇</Typography>
                        <Typography>{result.top3[0].name}</Typography>
                      </Box>
                    </TableCell>
                    <ScoreCell align="center" score={result.top3[0].score}>
                      {formatScore(result.top3[0].score)}
                    </ScoreCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography>🥈</Typography>
                        <Typography>{result.top3[1].name}</Typography>
                      </Box>
                    </TableCell>
                    <ScoreCell align="center" score={result.top3[1].score}>
                      {formatScore(result.top3[1].score)}
                    </ScoreCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography>🥉</Typography>
                        <Typography>{result.top3[2].name}</Typography>
                      </Box>
                    </TableCell>
                    <ScoreCell align="center" score={result.top3[2].score}>
                      {formatScore(result.top3[2].score)}
                    </ScoreCell>
                    <TableCell align="center">{result.participants}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </ScrollableContent>
    </LeaderboardContainer>
  );
}

function App() {
  const [expanded, setExpanded] = useState<string | false>(false);
  const [isCondensed, setIsCondensed] = useState(true);
  const [view, setView] = useState<'current' | 'past'>('current');

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const toggleView = () => {
    setIsCondensed(!isCondensed);
  };

  const handleViewChange = (event: React.MouseEvent<HTMLElement>, newView: 'current' | 'past') => {
    if (newView !== null) {
      setView(newView);
    }
  };

  return (
    <AppContainer>
      {/* <Typography 
        variant="h4" 
        component="h1" 
        gutterBottom 
        sx={{ 
          textAlign: 'center', 
          color: '#006747',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          letterSpacing: '2px',
          marginBottom: '30px',
          textShadow: '2px 2px 4px rgba(0, 103, 71, 0.2)',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          padding: '10px 20px',
          borderRadius: '4px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        Masters 2025 Pool Leaderboard
      </Typography> */}
      <NavigationButtons
        value={view}
        exclusive
        onChange={handleViewChange}
        size="large"
      >
        <ToggleButton value="current">
          <Tooltip title="Current Leaderboard">
            <LeaderboardIcon />
          </Tooltip>
        </ToggleButton>
        <ToggleButton value="past">
          <Tooltip title="Past Results">
            <HistoryIcon />
          </Tooltip>
        </ToggleButton>
      </NavigationButtons>
      {view === 'current' ? (
        <>
          {/* <Tooltip title={isCondensed ? "Show Details" : "Condense View"}>
            <ToggleButton value="condense" onClick={toggleView} size="large">
              {isCondensed ? <ViewListIcon /> : <ViewModuleIcon />}
            </ToggleButton>
          </Tooltip> */}
          <LeaderboardContainer>
            <ScrollableContent>
              <Box sx={{ pt: 0, pb: 0 }}>
                {mockPoolMembers
                  .sort((a, b) => (a.isCut ? 1 : 0) - (b.isCut ? 1 : 0) || a.bestFourTotal - b.bestFourTotal)
                  .map((member) => (
                    <StyledAccordion
                      key={member.id}
                      expanded={expanded === member.id}
                      onChange={handleChange(member.id)}
                      condensed={isCondensed}
                    >
                      <StyledAccordionSummary 
                        expandIcon={<ExpandMoreIcon />}
                        condensed={isCondensed}
                      >
                        <Box sx={{ 
                          display: 'flex', 
                          justifyContent: 'space-between', 
                          width: '100%', 
                          alignItems: 'center' 
                        }}>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography 
                              variant={isCondensed ? "subtitle1" : "h6"} 
                              sx={{ fontWeight: 'bold' }}
                            >
                              {member.name}
                            </Typography>
                            <PositionChip 
                              label={formatPosition(member.roundPositions.current)}
                              position={member.roundPositions.current}
                              size="small"
                            />
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                              <Typography 
                                variant={isCondensed ? "caption" : "body2"} 
                                sx={{ color: 'rgba(255, 255, 255, 0.8)' }}
                              >
                                Round Positions: {formatPosition(member.roundPositions.round1)} → {formatPosition(member.roundPositions.round2)} → {formatPosition(member.roundPositions.round3)} → {formatPosition(member.roundPositions.round4)}
                              </Typography>
                              <Typography 
                                variant={isCondensed ? "subtitle1" : "h6"}
                                color={member.isCut ? 'error' : 'white'}
                                sx={{ fontWeight: 'bold' }}
                              >
                                {member.isCut ? 'CUT' : formatScore(member.bestFourTotal)}
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                      </StyledAccordionSummary>
                      <StyledAccordionDetails condensed={isCondensed}>
                        <TableContainer 
                          component={Paper} 
                          variant="outlined"
                          sx={{
                            border: '1px solid #e0e0e0',
                            borderRadius: '4px',
                            overflow: 'hidden',
                          }}
                        >
                          <Table size={isCondensed ? "small" : "medium"}>
                            <TableHead>
                              <TableRow sx={{ backgroundColor: '#006747' }}>
                                <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Player</TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold', color: 'white' }}>R1</TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold', color: 'white' }}>R2</TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold', color: 'white' }}>R3</TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold', color: 'white' }}>R4</TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold', color: 'white' }}>Total</TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold', color: 'white' }}>Position</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {member.picks
                                .sort((a, b) => a.total - b.total)
                                .map((golfer) => (
                                  <TableRow 
                                    key={golfer.id}
                                    sx={{ 
                                      backgroundColor: !golfer.madeCut ? '#fff3e0' : 'inherit',
                                      '&:nth-of-type(odd)': {
                                        backgroundColor: !golfer.madeCut ? '#fff3e0' : '#fafafa',
                                      },
                                      transition: 'background-color 0.2s ease-in-out',
                                      '&:hover': {
                                        backgroundColor: !golfer.madeCut ? '#ffe0b2' : '#f5f5f5',
                                      },
                                    }}
                                  >
                                    <TableCell component="th" scope="row">
                                      <Typography sx={{ fontWeight: 500 }}>
                                        {golfer.name}
                                      </Typography>
                                    </TableCell>
                                    <ScoreCell align="center" score={golfer.rounds.round1}>
                                      {formatScore(golfer.rounds.round1)}
                                    </ScoreCell>
                                    <ScoreCell align="center" score={golfer.rounds.round2}>
                                      {formatScore(golfer.rounds.round2)}
                                    </ScoreCell>
                                    <ScoreCell align="center" score={golfer.rounds.round3}>
                                      {formatScore(golfer.rounds.round3)}
                                    </ScoreCell>
                                    <ScoreCell align="center" score={golfer.rounds.round4}>
                                      {formatScore(golfer.rounds.round4)}
                                    </ScoreCell>
                                    <ScoreCell align="center" score={golfer.total}>
                                      {formatScore(golfer.total)}
                                    </ScoreCell>
                                    <TableCell align="center">
                                      {golfer.madeCut ? golfer.position : 'CUT'}
                                    </TableCell>
                                  </TableRow>
                                ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </StyledAccordionDetails>
                    </StyledAccordion>
                  ))}
              </Box>
            </ScrollableContent>
          </LeaderboardContainer>
        </>
      ) : (
        <PastResults />
      )}
    </AppContainer>
  );
}

export default App;
