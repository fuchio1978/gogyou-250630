# 五行バランスシート

## セットアップ手順

1. リポジトリをクローンまたはファイル一式を配置
2. 依存パッケージをインストール

```bash
npm install
```

3. 開発サーバーを起動

```bash
npm run dev
```

---

## PNG・PDF 出力の仕組みと利用ライブラリ

- **PNG保存**: `html2canvas` でSVGをキャプチャし、PNG画像として保存します。
- **PDF保存**: `jspdf` でA4縦・中央配置でPDF出力します。

---

## 強さによる色の濃淡

- 各五行ごとに「強さ（弱・中・強）」を選択できます。
- 強さを選ぶと、グラフの色の濃さが変わります（弱=薄い／強=濃い）。
- 色の不透明度は `src/lib/calc.ts` の `OPACITY` 定数でカスタマイズできます。

### 例
```ts
export const OPACITY = { '弱': 0.4, '中': 0.7, '強': 1 } as const;
```

---

## カスタマイズ例

### 色変更
`src/components/FiveChart.tsx` の `ELEMENT_COLORS` を編集してください。

### 印刷用サイズ調整
`BASE_R` や `PX_PER_UNIT` を調整することで、円や各要素のサイズを変更できます。

---

## 構成

```
project-root/
├─ README.md
├─ src/
│   ├─ app/page.tsx             // フォーム＋チャート
│   ├─ components/FiveForm.tsx  // 入力フォーム
│   ├─ components/FiveChart.tsx // SVG 描画
│   ├─ lib/calc.ts              // 角度＆半径計算
│   └─ utils/download.ts        // png/pdf 保存
├─ public/
│   └─ icon.svg
├─ tailwind.config.ts
├─ package.json
├─ tsconfig.json
├─ .eslintrc.json
├─ .prettierrc
├─ .husky/
│   └─ pre-commit
├─ jest.config.js
└─ .storybook/ (任意)
```
# gogyou-250630
