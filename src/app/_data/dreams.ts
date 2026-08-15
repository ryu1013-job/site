export type DreamStatus = 'active' | 'done' | 'carried';

export type Dream = {
  title: string;
  note?: string;
  status?: DreamStatus;
};

export type DreamYear = {
  year: number;
  theme?: string;
  dreams: Dream[];
};

/**
 * Annual dreams — quiet intentions for each year.
 * Edit freely; the page reads newest year first.
 */
export const DREAM_YEARS: DreamYear[] = [
  {
    year: 2026,
    theme: 'Closer to care, closer to products that last',
    dreams: [
      {
        title: 'Bring happiness to the care industry — in practice, not only in words',
        status: 'active',
      },
      {
        title: 'Ship something caregivers open every morning',
        note: 'Useful enough to become a habit',
        status: 'active',
      },
      {
        title: 'Deepen domain understanding through real facilities and real people',
        status: 'active',
      },
      {
        title: 'Keep building in public — talks, writing, and small experiments',
        status: 'active',
      },
    ],
  },
  {
    year: 2025,
    theme: 'From engineer to product engineer',
    dreams: [
      {
        title: 'Join full-time and take ownership of care products',
        status: 'done',
      },
      {
        title: 'Learn care by reading, visiting, and listening',
        status: 'done',
      },
      {
        title: 'Speak and write about what I am building',
        status: 'done',
      },
      {
        title: 'Find a long-horizon mission worth a decade',
        note: 'Care became that answer',
        status: 'done',
      },
    ],
  },
  {
    year: 2024,
    theme: 'Learn by shipping',
    dreams: [
      {
        title: 'Grow through internships across different products',
        status: 'done',
      },
      {
        title: 'Strengthen front-end craft and product sense',
        status: 'done',
      },
      {
        title: 'Stay curious enough to keep making things',
        status: 'carried',
      },
    ],
  },
];
