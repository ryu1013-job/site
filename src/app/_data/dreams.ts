export type DreamStatus = 'active' | 'done' | 'carried';

export type Dream = {
  title: string;
  note?: string;
  status?: DreamStatus;
};

export type DreamAge = {
  age: number;
  theme?: string;
  dreams: Dream[];
};

/**
 * Dreams by age — quiet intentions for each year of life.
 * Edit freely; the page reads newest age first.
 * (Born 2003/10/13)
 */
export const DREAM_AGES: DreamAge[] = [
  {
    age: 22,
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
    age: 21,
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
    age: 20,
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

export function formatAge(age: number) {
  return `${age}歳`;
}
