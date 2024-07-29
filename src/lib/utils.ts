import humanizeDuration from 'humanize-duration';

export const shortDuration = humanizeDuration.humanizer({
  language: 'shortEn',
  round: true,
  largest: 2,
  languages: {
    shortEn: {
      y: () => 'y',
      mo: () => 'mo',
      w: () => 'w',
      d: () => 'd',
      h: () => 'h',
      m: () => 'm',
      s: () => 's',
      ms: () => 'ms',
    },
  },
});
