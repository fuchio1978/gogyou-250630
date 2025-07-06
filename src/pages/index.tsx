"use client";

import FiveForm from "../components/FiveForm";
import FiveChart from "../components/FiveChart";
import { useState } from "react";
import { FiveElementInput, defaultValues } from "../lib/calc";

export default function Home() {
  const [forms, setForms] = useState<FiveElementInput[]>([
    { ...defaultValues },
    { ...defaultValues },
    { ...defaultValues },
  ]);

  return (
    <main className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-bold mb-8 text-red-500">五行バランス表</h1>
      <div className="w-full flex flex-row justify-center gap-8">
        {forms.map((form, idx) => (
          <div key={idx} className="bg-white rounded shadow p-4 flex flex-col items-center w-[390px] flex-shrink-0 border">
            <h2 className="font-bold text-base mb-2">No.{idx + 1}</h2>
            <div className="mt-4">
              <FiveChart value={form} />
            </div>
            <FiveForm
              key={idx}
              defaultValues={form}
              onChange={v => {
                if (idx === 0) {
                  // NO.1を編集したら全ての値だけを上書き
                  setForms(f => f.map(item => ({ ...item, ...v })));
                } else {
                  // NO.2,3は個別編集
                  setForms(f => f.map((item, i) => i === idx ? { ...item, ...v } : item));
                }
              }}
              isMainForm={idx === 0}
            />
          </div>
        ))}
      </div>
    </main>
  );
}
