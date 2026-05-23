# 国チャレ！中2マスター

中学2年生向けの国語ドリルアプリ（[数チャレ！中2マスター](https://chuuni-math.vercel.app/) と同じゲーム形式）。

## 機能

- **4つのステージ**: 漢字・語彙 / 文法 / 古典 / 読解
- **学期マップ**: 1〜3学期の典型的な進度で単元を整理
- **XP・レベル・バッジ**: プレイを重ねると成長
- **ノーマル / ハード**: ハードは ♥3・ゼロで終了
- **PWA対応**: スマホに追加して使える

## 開発

```bash
npm install
npm run dev
```

## ビルド

```bash
npm run build
npm run preview
```

## アイコン

`public/icon-source.svg` がマスターデザインです。PNG を再生成する場合:

```bash
npm run gen:icons
```

## Vercel デプロイ

リポジトリを Vercel に接続するだけでビルド可能（`vercel.json` 同梱）。

GitHub Pages 用: `VITE_DEPLOY_BASE=/リポジトリ名/ npm run build`

## 技術スタック

- React 18 + TypeScript + Vite
- vite-plugin-pwa
