---
theme: ../theme
title: 気持ちぃ〜角丸 Squircles
class: hero
---

# 気持ちぃ〜角丸
# Squircles

---

# 今日の約束

| | |
| --- | --- |
| ターゲット | 角丸を `border-radius` で済ませてきたフロントエンド |
| キーメッセージ | 気持ちいい角は、CSS 1行で書ける。壊れない。 |
| ゴール | 今夜、プロダクトの角に1行足せる状態になる |

---
class: hero
---

# どっちが
# 気持ちいい？

<div class="quiz">
  <div class="quiz-item">
    <div class="shape round"></div>
    <span>左だと思う人！</span>
  </div>
  <div class="quiz-item">
    <div class="shape squircle"></div>
    <span>右だと思う人！</span>
  </div>
</div>

---
class: hero
---

# コードは1行しか違いません

---

# なぜ硬いのか

- 円弧の角丸 → 曲率が**不連続に跳ぶ**
- Squircle → 曲率がなめらかに変化する

高速道路のクロソイドと同じ。目も曲率のジャンプを「角」と検知する。

---

# これまでの地獄

- SVG → サイズで破綻
- clip-path → `box-shadow` ごと消える

角を丸めたいだけなのに。

---
class: hero
---

# キーメッセージ

```css
corner-shape: superellipse(2.5);
```

---

# n を動かすだけ

<CornerSlider />

- `2` → round / `4` → squircle
- `1` → bevel / `0` → scoop / `-∞` → notch

---
class: hero
---

# 全部、この1本の数式の上に乗ってる

`box-shadow` も `border` も生きたまま。

---

# おまけ

<div class="hover-demo">
  <button type="button" class="scoop-btn">hover me</button>
  <span>squircle → scoop</span>
</div>

用途は各自考えてください。

---

# 壊れないから、今日から

- Chromium 139+（Safari / Firefox は未対応）
- 非対応では `border-radius` にそのまま退化
- `@supports` 不要。書くのは1行

---
class: hero
---

# ゴール

皆さんのプロダクトの角、今夜1行だけ足してみてください。

<div class="quiz closing">
  <div class="shape round"></div>
  <div class="shape squircle"></div>
</div>
