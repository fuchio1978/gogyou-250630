'use client';

import { memo, KeyboardEvent } from 'react';
import { useFormContext } from 'react-hook-form';

interface Props {
  element: '木' | '火' | '土' | '金' | '水';
  valueKey: string;
  levelKey: string;
  tabStart: number;           // 例: 木なら 1, 火なら 3 …
}

function FiveInputRow({ element, valueKey, levelKey, tabStart }: Props) {
  const { register, setFocus } = useFormContext();

  // Enter キーで次フィールドへ
  const handleEnter =
    (next: string) => (e: KeyboardEvent<HTMLInputElement | HTMLSelectElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        if (next && next !== 'submit') {
          setFocus(next);
        }
      }
    };

  return (
    <div className="grid grid-cols-3 gap-2 items-center">
      <label className="text-sm">{element}</label>

      {/* 数値入力 */}
      <input
        type="number"
        step="0.5"
        min={0}
        max={20}
        {...register(valueKey, { valueAsNumber: true })}
        id={valueKey}
        className="border p-1 rounded"
        onKeyDown={handleEnter(levelKey)}
      />

      {/* 強さ select */}
      <select
        {...register(levelKey)}
        id={levelKey}
        className="border p-1 rounded"
        onKeyDown={handleEnter(
          element === '木' ? 'fire' :
          element === '火' ? 'earth' :
          element === '土' ? 'metal' :
          element === '金' ? 'water' :
          'submit'
        )}
      >
        <option value="弱">弱</option>
        <option value="中">中</option>
        <option value="強">強</option>
      </select>
    </div>
  );
}

export default memo(FiveInputRow);
