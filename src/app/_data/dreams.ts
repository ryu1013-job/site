export type Dream = {
  title: string;
  done?: boolean;
};

export type DreamAge = {
  age: number;
  dreams: Dream[];
};

/**
 * 歳ごとの夢。新しい歳が上。
 */
export const DREAM_AGES: DreamAge[] = [
  {
    age: 40,
    dreams: [{ title: '家を買う' }],
  },
  {
    age: 30,
    dreams: [{ title: '生涯住む場所を決める' }],
  },
  {
    age: 26,
    dreams: [{ title: '車を買う' }],
  },
  {
    age: 22,
    dreams: [{ title: 'エンジニアになる', done: true }],
  },
  {
    age: 20,
    dreams: [{ title: 'エンジニアのバイトをする', done: true }],
  },
  {
    age: 18,
    dreams: [{ title: '東京で一人暮らし', done: true }],
  },
];

export function formatAge(age: number) {
  return `${age}歳`;
}
