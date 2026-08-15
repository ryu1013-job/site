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
 * 歳ごとの夢。新しい歳が上。
 * （生年月日: 2003/10/13）
 */
export const DREAM_AGES: DreamAge[] = [
  {
    age: 22,
    theme: '介護に近づき、続くプロダクトをつくる',
    dreams: [
      {
        title: '介護に関わる人の幸せを、言葉だけでなく実践で届ける',
        status: 'active',
      },
      {
        title: '介護職員が毎朝開きたくなるものを届ける',
        note: '習慣になるくらい、役に立つこと',
        status: 'active',
      },
      {
        title: '現場と人に触れながら、ドメイン理解を深める',
        status: 'active',
      },
      {
        title: '登壇・文章・小さな実験で、公開しながらつくり続ける',
        status: 'active',
      },
    ],
  },
  {
    age: 21,
    theme: 'エンジニアからプロダクトエンジニアへ',
    dreams: [
      {
        title: '正社員として入り、介護プロダクトのオーナーシップを持つ',
        status: 'done',
      },
      {
        title: '本を読み、施設を訪れ、話を聞いて介護を学ぶ',
        status: 'done',
      },
      {
        title: 'つくっていることを、話して書く',
        status: 'done',
      },
      {
        title: '10年続けられるミッションを見つける',
        note: '答えは介護だった',
        status: 'done',
      },
    ],
  },
  {
    age: 20,
    theme: '出すことで学ぶ',
    dreams: [
      {
        title: '複数のプロダクトのインターンで成長する',
        status: 'done',
      },
      {
        title: 'フロントエンドの技術とプロダクト感覚を鍛える',
        status: 'done',
      },
      {
        title: 'ものづくりへの好奇心を手放さない',
        status: 'carried',
      },
    ],
  },
];

export function formatAge(age: number) {
  return `${age}歳`;
}
