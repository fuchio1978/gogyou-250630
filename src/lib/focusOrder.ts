// 次のフィールドIDを返すユーティリティ
// 例: focusOrder['wood'] => 'woodLevel', focusOrder['woodLevel'] => 'fire', ...

const focusOrder: Record<string, string | null> = {
  dayMaster: 'wood',
  wood: 'woodLevel',
  woodLevel: 'fire',
  fire: 'fireLevel',
  fireLevel: 'earth',
  earth: 'earthLevel',
  earthLevel: 'metal',
  metal: 'metalLevel',
  metalLevel: 'water',
  water: 'waterLevel',
  waterLevel: null, // 最後はnull
};

export default focusOrder;
