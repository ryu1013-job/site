---
theme: ../theme
title: Intro
info: |
  Shared theme demo for ryu.engineer slides.
---

---
layout: cover
---

<Kicker>ryu.engineer / slides</Kicker>

# Intro

<Lead>同じテーマとタグで、デッキを増やしても見た目が揃う。</Lead>

<Tag>Slidev</Tag>
<Tag>Microfrontends</Tag>
<Tag>/slides/intro</Tag>

---
layout: section
---

<Kicker>Writing</Kicker>

# 書き方はシンプルに

---

# Markdown だけで揃う

見出し・リスト・引用・コードはテーマ側で統一しています。

- ポートフォリオと同じトーンのタイポ
- 余白とコントラストを固定
- デッキごとの CSS は原則不要

> スタイルをいじるより、伝える内容に集中する。

```ts
const path = '/slides/intro/'
```

---

# タグで少しだけ構造化する

<Grid cols="2">

<Item title="Kicker">

章ラベルや短い前置き

</Item>

<Item title="Lead">

見出し下の一文サポート

</Item>

<Item title="Tag">

キーワードの印

</Item>

<Item title="Note">

補足・注意・Tips

</Item>

</Grid>

---

# 手順もタグで

<Steps>

<li>bun run create -- my-talk</li>
<li>slides.md を書く</li>
<li>デプロイすると /slides/my-talk/ になる</li>

</Steps>

<Note type="tip">

新規デッキは theme: ../theme が最初から入っています。

</Note>

---
layout: center
---

# 左右分割

<Split>

<Item title="Portfolio">

Next.js App Router

</Item>

<Item title="Slides">

Slidev + shared theme

</Item>

</Split>

---
layout: end
---

<Kicker>Next</Kicker>

# あとは書くだけ

<Lead>slides 配下に slug フォルダを足せば、同じスタイルで公開できます。</Lead>
