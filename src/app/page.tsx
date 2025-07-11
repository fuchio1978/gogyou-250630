'use client';

import { useState } from 'react';
import FiveChart from '../components/FiveChart';
import FiveForm from '../components/FiveForm';
import ColorSampleTable from '../components/ColorSampleTable';
import { defaultValues, FiveElementInput } from '../lib/calc';

export default function Page() {
  const [forms, setForms] = useState<FiveElementInput[]>([
    { ...defaultValues },
    { ...defaultValues },
    { ...defaultValues },
  ]);

  // コピー機能
  const handleCopy = (fromIdx: number) => {
    setForms(forms => forms.map((f, i) => (i === fromIdx ? forms[0] : f)));
  };

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-8 text-red-500 text-center">五行バランス表</h1>
      <div className="w-full flex flex-col md:flex-row justify-center gap-8 scale-100 md:scale-[.80] origin-top">
        {forms.map((form, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow-lg p-5 flex flex-col items-center min-w-[304px] max-w-[361px] transform scale-200">
            <div className="flex justify-between w-full mb-2">
              <span className="text-xs text-gray-500">No.{idx + 1}</span>
              {idx === 0 ? null : (
                <></>
              )}
            </div>
            <FiveChart value={form} />
            <FiveForm
              onChange={v => {
                if (idx === 0) {
                  // No.1を編集したらNo.2,No.3も同時に反映
                  setForms(fs => [
                    { ...fs[0], ...v },
                    { ...fs[0], ...v },
                    { ...fs[0], ...v },
                  ]);
                } else {
                  // No.2,No.3は個別編集
                  setForms(fs => fs.map((f, i) => (i === idx ? { ...f, ...v } : f)));
                }
              }}
              defaultValues={form}
              isMainForm={idx === 0}
            />
          </div>
        ))}
      </div>
      {/* 色見本を右下に固定表示 */}
      <div className="hidden md:block fixed right-4 bottom-24 z-50 bg-white/90 rounded-lg shadow-lg p-1 scale-100" style={{minWidth: 0, minHeight: 0}}>
        <ColorSampleTable />
      </div>
    </main>
  );
}
