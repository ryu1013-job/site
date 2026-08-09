---
theme: ../theme
title: 気持ちぃ〜角丸 Squircles
class: hero
---

# 気持ちぃ〜角丸
# Squircles

---
class: hero
---

# どっちが気持ちいい？

<div class="quiz">
  <div class="quiz-item">
    <div class="shape round"></div>
    <span>左！</span>
  </div>
  <div class="quiz-item">
    <div class="shape squircle"></div>
    <span>右！</span>
  </div>
</div>

---
class: hero
---

# コードは1行しか違いません

---

# なぜ硬いのか

円弧の角丸は、直線と円の接続で**曲率が跳ぶ**。
Squircle は曲率がなめらかに変化する。

---

# これまでの地獄

- SVG → サイズで破綻
- clip-path → 影ごと消える

---
class: hero
---

```css
corner-shape: superellipse(2.5);
```

---

# n を動かすだけ

<CornerSlider />

---
class: hero
---

# 全部、この1本の数式の上に乗ってる

---

# おまけ

<div class="hover-demo">
  <button type="button" class="scoop-btn">hover me</button>
  <span>squircle → scoop</span>
</div>

用途は各自考えてください。

---

# 今日から使える

- Chromium 139+（他は `border-radius` に退化）
- `@supports` 不要。1行足すだけ

---
class: hero
---

# たかが角丸、されど角丸。

<div class="quiz closing">
  <div class="shape round"></div>
  <div class="shape squircle"></div>
</div>
