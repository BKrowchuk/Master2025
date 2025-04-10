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
  Tabs,
  Tab,
  TextField,
  InputAdornment,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HistoryIcon from '@mui/icons-material/History';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import SortIcon from '@mui/icons-material/Sort';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import { mockPoolMembers } from './data/mockData';
import { pastResults } from './data/pastResults';
import { GolferScore } from './types';
import React from 'react';

const StyledAccordion = styled(Accordion)<{ condensed?: boolean }>(({ theme, condensed }) => ({
  marginBottom: condensed ? theme.spacing(0.5) : theme.spacing(1),
  '&.Mui-expanded': {
    margin: condensed ? `${theme.spacing(0.5)} 0` : `${theme.spacing(1)} 0`,
  },
  '&:before': {
    display: 'none',
  },
  '&.Mui-focused': {
    outline: 'none',
  },
  '& .MuiButtonBase-root': {
    '&:hover, &:focus, &:active': {
      outline: 'none',
    },
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
  minHeight: 'clamp(24px, 2.5vh, 32px) !important',
  '&:hover': {
    backgroundColor: '#005238',
  },
  '&.Mui-focusVisible': {
    backgroundColor: '#006747',
  },
  '&.Mui-expanded': {
    backgroundColor: '#006747',
    minHeight: 'clamp(24px, 2.5vh, 32px) !important',
  },
  '& .MuiAccordionSummary-content': {
    margin: condensed ? 'clamp(1px, 0.5vh, 3px) clamp(2px, 1vh, 6px)' : 'clamp(2px, 1vh, 4px) clamp(4px, 1.5vh, 8px)',
    '&.Mui-expanded': {
      margin: condensed ? 'clamp(1px, 0.5vh, 3px) clamp(2px, 1vh, 6px)' : 'clamp(2px, 1vh, 4px) clamp(4px, 1.5vh, 8px)',
    },
  },
  '& .MuiAccordionSummary-expandIconWrapper': {
    color: '#FFD700',
    transition: 'transform 0.3s ease-in-out',
  },
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(180deg)',
  },
  '& .MuiTypography-root': {
    fontSize: condensed ? 'clamp(0.65rem, 1.5vh, 0.8rem)' : 'clamp(0.7rem, 1.75vh, 0.9rem)',
  },
}));

const StyledAccordionDetails = styled(AccordionDetails)<{ condensed?: boolean }>(({ theme, condensed }) => ({
  padding: condensed ? theme.spacing(0.25) : theme.spacing(1),
  backgroundColor: '#f8f8f8',
  borderTop: 'none',
  marginTop: 0,
  '& .MuiTable-root': {
    fontSize: condensed ? 'clamp(0.65rem, 1.5vh, 0.8rem)' : 'clamp(0.7rem, 1.75vh, 0.9rem)',
  },
  '& .MuiTableCell-root': {
    padding: condensed ? 'clamp(1px, 0.5vh, 3px) clamp(2px, 1vh, 6px)' : 'clamp(4px, 1.25vh, 8px) clamp(6px, 1.75vh, 12px)',
    fontSize: condensed ? 'clamp(0.65rem, 1.5vh, 0.8rem)' : 'clamp(0.7rem, 1.75vh, 0.9rem)',
  },
}));

const ScoreCell = styled(TableCell)<{ score?: number | 'WD' | null }>(({ theme, score }) => ({
  color: !score ? 'inherit' :
         score === 'WD' ? '#999999' :
         typeof score === 'number' ? (
           score < 72 ? '#C41E3A' : // Red for negative scores
           score > 72 ? '#006747' : // Green for positive scores
           'inherit'
         ) : 'inherit',
}));

const TotalCell = styled(TableCell)<{ score?: number | 'WD' | null }>(({ theme, score }) => ({
  color: !score ? 'inherit' :
         score === 'WD' ? '#999999' :
         typeof score === 'number' ? (
           score < 0 ? '#C41E3A' : // Red for negative scores
           score > 0 ? '#006747' : // Green for positive scores
           'inherit'
         ) : 'inherit',
}));

const ThruCell = styled(TableCell)({
  color: 'black',
  fontWeight: 500,
});

const PositionChip = styled(Chip)<{ position: number | 'CUT' | 'WD' }>(({ position, theme }) => ({
  backgroundColor: position === 'CUT' ? '#d32f2f' : // Red for CUT
                  position === 'WD' ? '#999999' : // Gray for WD
                  position === 1 ? '#FFD700' : // Gold
                  position === 2 ? '#C0C0C0' : // Silver
                  position === 3 ? '#CD7F32' : // Bronze
                  '#006747', // Masters green
  color: position === 'CUT' || position === 'WD' ? 'white' :
         position <= 3 ? '#000' : 'white',
  fontWeight: 'bold',
  width: '45px',
  height: '24px',
  '& .MuiChip-label': {
    padding: '0 1px',
    fontSize: '0.65rem',
  },
  display: position === 0 ? 'none' : 'inline-flex', // Hide when position is 0
}));

const AppContainer = styled('div')({
  minHeight: '100vh',
  width: '100vw',
  background: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
    url("${import.meta.env.BASE_URL}background.svg"),
    url("${import.meta.env.BASE_URL}augusta.jpg")`,
  backgroundSize: '100% 100%, 100% 100%, cover',
  backgroundPosition: 'center, center, center',
  backgroundRepeat: 'no-repeat, no-repeat, no-repeat',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  position: 'relative',
  overflow: 'hidden',
  boxSizing: 'border-box',
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
  paddingBottom: '2px',
  '&::-webkit-scrollbar': {
    width: '8px',
    height: '8px',
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
  '& .MuiTableContainer-root::-webkit-scrollbar': {
    width: '8px',
    height: '8px',
  },
  '& .MuiTableContainer-root::-webkit-scrollbar-track': {
    background: '#f1f1f1',
    borderRadius: '4px',
  },
  '& .MuiTableContainer-root::-webkit-scrollbar-thumb': {
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

function formatScore(score: number | 'WD' | null): string {
  if (score === null) return '-';
  if (score === 'WD') return 'WD';
  return score.toString();
}

function formatPosition(position: number | 'CUT'): string {
  if (position === 'CUT') return 'CUT';
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
              overflow: 'auto',
              '& .MuiTable-root': {
                minWidth: 1200, // Ensures horizontal scroll on smaller screens
              },
              '&::-webkit-scrollbar': {
                width: '8px',
                height: '8px',
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
            }}
          >
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#006747' }}>
                  <TableCell sx={{ fontWeight: 'bold', color: 'white', width: 80 }}>Year</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: 'white', width: 150 }}>Champion</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: 'white', width: 150 }}>Co-Champion</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: 'white', width: 150 }}>Runner Up</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: 'white', width: 150 }}>Co-Runner Up</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: 'white', width: 150 }}>Notes</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: 'white', minWidth: 400 }}>Story</TableCell>
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
                        <Typography>🏆</Typography>
                        <Typography>{result.champion}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      {result.coChampion && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography>🏆</Typography>
                          <Typography>{result.coChampion}</Typography>
                        </Box>
                      )}
                    </TableCell>
                    <TableCell>
                      {result.runnerUp && (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography>🥈</Typography>
                          <Typography>{result.runnerUp}</Typography>
                      </Box>
                      )}
                    </TableCell>
                    <TableCell>
                      {result.coRunnerUp && (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography>🥈</Typography>
                          <Typography>{result.coRunnerUp}</Typography>
                      </Box>
                      )}
                    </TableCell>
                    <TableCell>
                      <Typography sx={{ 
                        fontStyle: 'italic', 
                        color: 'text.secondary',
                        fontSize: '0.9rem',
                        lineHeight: 1.4
                      }}>
                        {result.comments || ''}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography sx={{ 
                        fontStyle: 'italic', 
                        color: 'text.secondary',
                        fontSize: '0.9rem',
                        lineHeight: 1.4
                      }}>
                        {result.description || ''}
                      </Typography>
                    </TableCell>
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

const PicksTable = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Get all unique groups
  const groups = Array.from(new Set(mockPoolMembers.flatMap(member => 
    member.picks.map(pick => pick.group)
  ))).sort((a, b) => a - b);

  // Filter pool members based on search term
  const filteredMembers = mockPoolMembers.filter(member => {
    const memberName = member.name.toLowerCase();
    const picks = member.picks.map(pick => pick.name.toLowerCase());
    return memberName.includes(searchTerm.toLowerCase()) || 
           picks.some(pick => pick.includes(searchTerm.toLowerCase()));
  });

  return (
    <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 1 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search pool members or golfers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            sx: {
              backgroundColor: 'white',
              borderRadius: '4px',
            }
          }}
          size="small"
          sx={{ mb: 1 }}
        />
      </Box>
      <ScrollableContent>
        <Box sx={{ px: 1, pb: 1, pl: 0 }}>
          <TableContainer 
            component={Paper} 
            variant="outlined"
            sx={{
              border: '1px solid #e0e0e0',
              borderRadius: '4px',
              maxWidth: '100%',
              height: 'calc(100% - 16px)',
              margin: '0px 8px',
              overflow: 'auto',
              '&::-webkit-scrollbar': {
                width: '8px',
                height: '8px',
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
              '&::-webkit-scrollbar-corner': {
                background: '#f1f1f1',
              },
            }}
          >
            <Table 
              size="small" 
              stickyHeader 
              sx={{ 
                minWidth: 'max-content',
              }}
            >
              <TableHead>
                <TableRow sx={{ backgroundColor: '#006747' }}>
                  <TableCell sx={{ 
                    fontWeight: 'bold', 
                    color: 'white', 
                    padding: '6px 8px', 
                    position: 'sticky', 
                    left: 0, 
                    zIndex: 3, 
                    backgroundColor: '#006747',
                    minWidth: '180px',
                    whiteSpace: 'nowrap',
                  }}>Pool Member</TableCell>
                  {groups.map(group => (
                    <TableCell key={group} sx={{ 
                      fontWeight: 'bold', 
                      color: 'white', 
                      padding: '6px 8px', 
                      textAlign: 'center',
                      minWidth: '150px',
                      whiteSpace: 'nowrap',
                      position: 'sticky',
                      top: 0,
                      zIndex: 2,
                      backgroundColor: '#006747',
                    }}>
                      Group {group}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredMembers
                  .sort((a, b) => parseInt(a.id) - parseInt(b.id))
                  .map((member, index) => (
                    <TableRow 
                      key={member.id}
                      sx={{ 
                        '&:nth-of-type(odd)': {
                          backgroundColor: '#fafafa',
                        },
                        '&:nth-of-type(even)': {
                          backgroundColor: 'white',
                        },
                      }}
                    >
                      <TableCell 
                        sx={{ 
                          padding: '6px 8px',
                          fontWeight: 'bold',
                          borderRight: '1px solid #e0e0e0',
                          position: 'sticky',
                          left: 0,
                          zIndex: 2,
                          backgroundColor: index % 2 === 0 ? '#fafafa' : 'white',
                          minWidth: '180px',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {member.name}
                        </Typography>
                      </TableCell>
                      {groups.map(group => {
                        const pick = member.picks.find(p => p.group === group);
                        return (
                          <TableCell key={`${member.id}-${group}`} sx={{ 
                            padding: '6px 8px', 
                            textAlign: 'center',
                            minWidth: '150px',
                            whiteSpace: 'nowrap',
                          }}>
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                              {pick ? pick.name : '-'}
                            </Typography>
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </ScrollableContent>
    </Box>
  );
};

const Leaderboard = ({ sortByScore }: { sortByScore: boolean }) => {
  const [expanded, setExpanded] = useState<string | false>(false);
  const [isCondensed, setIsCondensed] = useState(true);

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const toggleView = () => {
    setIsCondensed(!isCondensed);
  };

  // Pre-sort the members
  const sortedMembers = React.useMemo(() => {
    return mockPoolMembers
      .sort((a, b) => (a.isCut ? 1 : 0) - (b.isCut ? 1 : 0) || a.bestFourTotal - b.bestFourTotal);
  }, []);

  // Pre-sort the golfers for each member
  const sortedGolfers = React.useMemo(() => {
    return sortedMembers.map(member => ({
      ...member,
      picks: [...member.picks].sort((a, b) => {
        if (sortByScore) {
          // Handle null values and WD
          if (a.total === null && b.total === null) return 0;
          if (a.total === null) return 1;
          if (b.total === null) return -1;
          if (a.total === 'WD' && b.total === 'WD') return 0;
          if (a.total === 'WD') return 1;
          if (b.total === 'WD') return -1;
          return (a.total as number) - (b.total as number);
        }
        return a.group - b.group;
      })
    }));
  }, [sortByScore, sortedMembers]);

  return (
    <>
            <ScrollableContent>
        <Box sx={{ pt: 0, pb: 0 }}>
          {sortedGolfers.map((member) => (
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
                          width: '100%', 
                  alignItems: 'center',
                  gap: 2
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '250px' }}>
                    <PositionChip 
                      label={formatPosition(member.roundPositions.current)}
                      position={member.roundPositions.current}
                      size="small"
                    />
                    <Typography 
                      variant="subtitle1"
                      sx={{ 
                        fontWeight: 'bold',
                        fontSize: isCondensed ? '0.7rem' : '0.8rem'
                      }}
                    >
                      {member.name}
                    </Typography>
                  </Box>
                  {/* TODO: Add round positions back in */}
                  {/* <Typography 
                    variant="subtitle2"
                    sx={{ 
                      color: 'white',
                      fontSize: isCondensed ? '0.65rem' : '0.75rem',
                      opacity: 0.8,
                      minWidth: 'fit-content'
                    }}
                  >
                    Round Positions: {formatPosition(member.roundPositions.round1)} → {formatPosition(member.roundPositions.round2)} → {formatPosition(member.roundPositions.round3)} → {formatPosition(member.roundPositions.round4)}
                  </Typography> */}
                  <Typography 
                    variant="subtitle1"
                    color={member.isCut ? 'error' : 'white'}
                    sx={{ 
                      fontWeight: 'bold',
                      minWidth: 'fit-content',
                      marginLeft: 'auto'
                    }}
                  >
                    {member.isCut ? 'CUT' : formatScore(member.bestFourTotal)}
                  </Typography>
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
                        <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Group</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Player</TableCell>
                        <TableCell align="center" sx={{ fontWeight: 'bold', color: 'white' }}>Thru</TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold', color: 'white' }}>R1</TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold', color: 'white' }}>R2</TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold', color: 'white' }}>R3</TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold', color: 'white' }}>R4</TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold', color: 'white' }}>Total</TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold', color: 'white' }}>Position</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                      {member.picks.map((golfer) => (
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
                          <TableCell>{golfer.group}</TableCell>
                                    <TableCell component="th" scope="row">
                            <Typography sx={{ 
                              fontWeight: 500,
                              fontSize: isCondensed ? '0.7rem' : '0.8rem'
                            }}>
                                        {golfer.name}
                                      </Typography>
                                    </TableCell>
                          <ThruCell align="center">
                            {golfer.thru}
                          </ThruCell>
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
                            {golfer.position === "WD" ? "WD" : (golfer.madeCut ? golfer.position : 'CUT')}
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
    </>
  );
};

// Sort by score function
function sortByScore(a: GolferScore, b: GolferScore): number {
  if (a.total === 'WD' && b.total === 'WD') return 0;
  if (a.total === 'WD') return 1;
  if (b.total === 'WD') return -1;
  if (a.total === null && b.total === null) return 0;
  if (a.total === null) return 1;
  if (b.total === null) return -1;
  return (a.total as number) - (b.total as number);
}

function App() {
  const [activeTab, setActiveTab] = useState(0);
  const [sortByScore, setSortByScore] = useState(false);

  const handleTabChange = (newValue: number) => {
    if (newValue !== null) {
      setActiveTab(newValue);
    }
  };

  const handleSortToggle = () => {
    setSortByScore(!sortByScore);
  };

  return (
    <AppContainer>
      <Box sx={{ 
        position: 'fixed', 
        top: 20, 
        left: 20, 
        zIndex: 1000,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        padding: '8px 16px',
        borderRadius: '4px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        alignItems: 'center',
        gap: 2,
      }}>
        <Typography variant="h6" sx={{ 
          color: '#006747', 
          fontWeight: 'bold',
          textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
        }}>
          {activeTab === 0 ? 'Leaderboard' : activeTab === 1 ? 'History' : 'Picks'}
        </Typography>
      </Box>
      <Box sx={{ 
        position: 'fixed', 
        top: 20, 
        right: 20, 
        zIndex: 1000,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        padding: '8px 16px',
        borderRadius: '4px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        alignItems: 'center',
        gap: 2,
      }}>
        <ToggleButtonGroup
          value={activeTab}
          exclusive
          onChange={(_, newValue) => handleTabChange(newValue)}
          sx={{
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
          }}
        >
          <ToggleButton value={0}>
            <LeaderboardIcon sx={{ mr: 1 }} />
            Leaderboard
          </ToggleButton>
          <ToggleButton value={1}>
            <HistoryIcon sx={{ mr: 1 }} />
            History
          </ToggleButton>
          <ToggleButton value={2}>
            <SortByAlphaIcon sx={{ mr: 1 }} />
            Picks
          </ToggleButton>
        </ToggleButtonGroup>
        <Divider orientation="vertical" flexItem />
        <IconButton
          onClick={handleSortToggle}
          sx={{ 
            color: '#006747',
            '&:hover': {
              backgroundColor: 'rgba(0, 103, 71, 0.1)',
            }
          }}
        >
          {sortByScore ? <SortIcon /> : <SortByAlphaIcon />}
        </IconButton>
      </Box>
      <LeaderboardContainer>
        <Box sx={{ flex: 1, overflow: 'hidden' }}>
          {activeTab === 0 && <Leaderboard sortByScore={sortByScore} />}
          {activeTab === 1 && <PastResults />}
          {activeTab === 2 && <PicksTable />}
        </Box>
          </LeaderboardContainer>
    </AppContainer>
  );
}

export default App;
