---
theme: ../theme
title: Shipping Notes
info: |
  仮デッキ — リリース前の共有メモ例。
---

---
layout: cover
---

<Kicker>Sample</Kicker>

# Shipping Notes

<Lead>リリース前に揃えておきたい確認事項を、短く並べた仮スライド。</Lead>

<Tag>shipping</Tag>
<Tag>checklist</Tag>

---

# 公開前チェック

- パスは `/slides/<slug>/` になっているか
- テーマは `../theme` を指しているか
- スマホ幅でも見出しが破綻しないか

<Note type="warn">

`<slug>` のような山括弧は Markdown 内でタグ扱いになるので注意。

</Note>

---
layout: section
---

<Kicker>Flow</Kicker>

# 出すまでの流れ

---

# コマンド

```bash
bun run create -- my-talk
bun run dev -- my-talk
bun run build
```

<Lead>作る → 見る → まとめてビルド、の3手。</Lead>

---

# 役割分担

<Split>

<Item title="Portfolio">

ドメインと導線を持つ側。

</Item>

<Item title="Slides">

発表そのものを持つ側。

</Item>

</Split>

---
layout: center
---

# Done の定義

<Tag>build green</Tag>
<Tag>path ok</Tag>
<Tag>readable on phone</Tag>

---
layout: end
---

# Ship it

<Lead>仮の内容でも、型が揃っていれば差し替えは簡単です。</Lead>
