import { getFiveElements, defaultValues } from '../lib/calc';

describe('getFiveElements', () => {
  it('日主=木で順序が正しい', () => {
    const input = { ...defaultValues, dayMaster: '木', wood: 1, fire: 2, earth: 3, metal: 4, water: 5 };
    const result = getFiveElements(input);
    expect(result.map((e) => e.label)).toEqual(['木', '火', '土', '金', '水']);
  });
  it('日主=土で順序が正しい', () => {
    const input = { ...defaultValues, dayMaster: '土', wood: 1, fire: 2, earth: 3, metal: 4, water: 5 };
    const result = getFiveElements(input);
    expect(result.map((e) => e.label)).toEqual(['土', '金', '水', '木', '火']);
  });
  it('各値が正しく反映される', () => {
    const input = { ...defaultValues, dayMaster: '火', wood: 0.5, fire: 1, earth: 1.5, metal: 2, water: 2.5 };
    const result = getFiveElements(input);
    expect(result.map((e) => e.value)).toEqual([1, 1.5, 2, 2.5, 0.5]);
  });
});
