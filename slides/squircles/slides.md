---
theme: ../theme
title: 気持ちぃ〜角丸 Squircles
class: hero
---

# 気持ちぃ〜角丸
# Squircles

その角丸、本当に納得していますか？

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

# 実はこの2つ、

# コードは1行しか違いません

---
class: hero
---

# なぜ
# border-radius は
# 「硬い」のか

---

# 曲率が跳ぶ

- 円弧の角丸 → 直線と円の接続で**曲率が不連続**
- Squircle → 曲率がなめらかに変化する

高速道路のクロソイドと同じ。
いきなり円カーブに入ると、ハンドルを一気に切ることになる。

---
class: hero
---

# これまでの地獄

---

# 角を丸めたいだけなのに

- SVGでパスを書く → サイズが変わると破綻
- clip-path → box-shadow ごと切り落とされる

影が消えた無残な角丸。

---
class: hero
---

# 本題

```css
corner-shape: superellipse(2.5);
```

---

# n を動かすだけ

<CornerSlider />

- `n=2` → round / `n=4` → squircle
- `n=1` → bevel / `n=0` → scoop / 負の無限大 → notch

---
class: hero
---

# round も bevel も notch も、

# 全部この1本の数式の上に乗ってる

---

# 生きてます

同じ要素に `box-shadow` と `border` が付いたまま。

clip-path 時代に死んでたやつが、生きてます。

<div class="alive">
  <div class="shape squircle shadowed bordered"></div>
</div>

---

# おまけの解禁

値が補間可能なので、hover で角の形そのものが `transition` する。

<div class="hover-demo">
  <button type="button" class="scoop-btn">hover me</button>
  <span>squircle → scoop</span>
</div>

用途は各自考えてください。

---

# 今日から使える話

- Chromium 139+ のみ（Safari / Firefox 未対応）
- 非対応では `border-radius` にそのまま退化
- `@supports` すら書かずに、1行足すだけ

壊れない。退化が自然。書くのは1行。

---
class: hero
---

# たかが角丸、されど角丸。

皆さんのプロダクトの角、今夜1行だけ足してみてください。

<div class="quiz closing">
  <div class="shape round"></div>
  <div class="shape squircle"></div>
</div>
