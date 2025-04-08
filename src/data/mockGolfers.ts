import { mastersLeaderboard } from './mastersLeaderboard';
import { GolferScore } from '../types';

export const mockGolfers: GolferScore[] = mastersLeaderboard.map((player, index) => ({
  id: `golfer-${index + 1}`,
  name: player.name,
  rounds: {
    round1: player.round1,
    round2: player.round2,
    round3: player.round3,
    round4: player.round4
  },
  total: player.total,
  position: player.position === 'CUT' ? 999 : parseInt(player.position.replace('T', ''), 10),
  madeCut: player.position !== 'CUT'
})); 