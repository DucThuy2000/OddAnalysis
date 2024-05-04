import { EOdds, ETimelineMatch } from '@shared/models';

export const ODDS = [
  { value: EOdds.GOALS, label: EOdds.GOALS },
  { value: EOdds.CORNERS, label: EOdds.CORNERS },
  { value: EOdds.YELLOW_CARDS, label: EOdds.YELLOW_CARDS },
  { value: EOdds.THROW_IN, label: EOdds.THROW_IN },
  { value: EOdds.OFF_SIDE, label: EOdds.OFF_SIDE },
  { value: EOdds.SHOTS_ON_TARGET, label: EOdds.SHOTS_ON_TARGET },
];

export const TIMELINE = [
  { value: ETimelineMatch.FULL_TIME, label: 'FT' },
  { value: ETimelineMatch.FIRST_HALF, label: '1ST' },
  { value: ETimelineMatch.SECOND_HALF, label: '2ND' },
];
