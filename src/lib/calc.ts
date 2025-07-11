import { z } from 'zod';

export const DAY_MASTERS = ['木', '火', '土', '金', '水'] as const;
export type DayMaster = typeof DAY_MASTERS[number];

export type Strength = '弱' | '中' | '強';

export interface FiveElementInput {
  dayMaster: DayMaster;
  wood: number;  woodLevel: Strength;
  fire: number;  fireLevel: Strength;
  earth: number; earthLevel: Strength;
  metal: number; metalLevel: Strength;
  water: number; waterLevel: Strength;
}

export const defaultValues: FiveElementInput = {
  dayMaster: '土',
  wood: 0,  woodLevel: '中',
  fire: 0,  fireLevel: '中',
  earth: 0, earthLevel: '中',
  metal: 0, metalLevel: '中',
  water: 0, waterLevel: '中',
};

export const fiveElementSchema = z.object({
  dayMaster: z.enum(DAY_MASTERS),
  wood: z.number().min(0).max(20),
  woodLevel: z.enum(['弱','中','強']),
  fire: z.number().min(0).max(20),
  fireLevel: z.enum(['弱','中','強']),
  earth: z.number().min(0).max(20),
  earthLevel: z.enum(['弱','中','強']),
  metal: z.number().min(0).max(20),
  metalLevel: z.enum(['弱','中','強']),
  water: z.number().min(0).max(20),
  waterLevel: z.enum(['弱','中','強']),
});



export const BASE_R = 160;
export const PX_PER_UNIT = 5 * 3.78; // 1→5mm換算, 1mm≒3.78px

export const ELEMENT_COLORS: Record<string, Record<Strength, string>> = {
  木:   { 強: '#065f2a', 中: '#22c55e', 弱: '#86efac' }, // より濃い緑, グリーン, ミント
  火:   { 強: '#7f1d1d', 中: '#ef4444', 弱: '#fda4af' }, // より濃い赤, 赤, ピンク
  土:   { 強: '#7c3f09', 中: '#f59e42', 弱: '#fde68a' }, // より濃いオレンジ, オレンジ, クリーム
  金:   { 強: '#000000', 中: '#444444', 弱: '#a3a3a3' }, // 黒, 黒とグレーの中間, グレー
  水:   { 強: '#1e3a8a', 中: '#3b82f6', 弱: '#7dd3fc' }, // より濃い青, 青, ライトブルー
};

// OPACITYは全て1で統一
export const OPACITY = { '弱': 1, '中': 1, '強': 1 } as const;

// 五行の並び順（木→火→土→金→水）
const ORDER = ['木', '火', '土', '金', '水'] as const;

export function getFiveElements(input: FiveElementInput) {
  // 日主を真上(0deg)に固定し、時計回りに配置
  const idx = ORDER.indexOf(input.dayMaster);
  const rotated = [...ORDER.slice(idx), ...ORDER.slice(0, idx)];
  return rotated.map((label, i) => ({
    label,
    value: Number(input[labelToKey(label)]) || 0, // 必ず数値型・0以上に補正
    color: ELEMENT_COLORS[label],
    angleDeg: i * 72,
    level: input[labelToLevelKey(label)] ?? '中',
  }));
}

function labelToLevelKey(label: string): keyof FiveElementInput {
  switch (label) {
    case '木': return 'woodLevel';
    case '火': return 'fireLevel';
    case '土': return 'earthLevel';
    case '金': return 'metalLevel';
    case '水': return 'waterLevel';
    default: throw new Error('Invalid label');
  }
}

function labelToKey(label: string): keyof FiveElementInput {
  switch (label) {
    case '木': return 'wood';
    case '火': return 'fire';
    case '土': return 'earth';
    case '金': return 'metal';
    case '水': return 'water';
    default: throw new Error('Invalid label');
  }
}
