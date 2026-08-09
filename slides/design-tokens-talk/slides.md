---
theme: ../theme
title: Design Tokens Talk
info: |
  仮デッキ — デザイン方針の短い発表例。
---

---
layout: cover
---

<Kicker>Sample</Kicker>

# Design Tokens Talk

<Lead>色・余白・タイポをテーマに閉じ込めて、本文は中身だけ書く。</Lead>

<Tag>design</Tag>
<Tag>theme</Tag>

---
layout: section
---

<Kicker>Principle</Kicker>

# 見た目は一箇所で決める

---

# 方針

<Grid cols="3">

<Item title="Type">

見出しは serif、本文は sans。

</Item>

<Item title="Color">

インク＋ミュート＋アクセントの3色。

</Item>

<Item title="Space">

レイアウトごとの余白を固定。

</Item>

</Grid>

---

# よく使うタグ

| Tag | 用途 |
| --- | --- |
| Kicker | 章の前置き |
| Lead | 見出しの補足 |
| Tag | キーワード |
| Note | 補足・注意 |
| Grid / Item | 並べて見せる |

---

# やってほしくないこと

- デッキごとに CSS を増やしすぎる
- その場限りの色を直書きする
- 1枚に情報を詰め込みすぎる

<Note>

例外が必要なら、まず theme 側に足せないか考える。

</Note>

---
layout: end
---

<Kicker>Remember</Kicker>

# Write less style

<Lead>タグを置くだけで、だいたい良く見える状態を目指す。</Lead>
