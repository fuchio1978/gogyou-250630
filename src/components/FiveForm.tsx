'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { useEffect, useRef } from 'react';
import FiveInputRow from './FiveInputRow';

const formSchema = z.object({
  dayMaster: z.enum(['木', '火', '土', '金', '水']),
  wood: z.number().min(0).max(20),
  woodLevel: z.enum(['弱', '中', '強']).default('中'),
  fire: z.number().min(0).max(20),
  fireLevel: z.enum(['弱', '中', '強']).default('中'),
  earth: z.number().min(0).max(20),
  earthLevel: z.enum(['弱', '中', '強']).default('中'),
  metal: z.number().min(0).max(20),
  metalLevel: z.enum(['弱', '中', '強']).default('中'),
  water: z.number().min(0).max(20),
  waterLevel: z.enum(['弱', '中', '強']).default('中'),
});

export type FormData = z.infer<typeof formSchema>;

export default function FiveForm({ onChange, defaultValues, isMainForm = false }: {
  onChange: (data: FormData) => void;
  defaultValues: FormData;
  isMainForm?: boolean;
}) {
  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues,
    shouldUnregister: false,
  });

  const prevDefaults = useRef(JSON.stringify(defaultValues));

  useEffect(() => {
    const prev = prevDefaults.current;
    const next = JSON.stringify(defaultValues);
    if (!isMainForm && prev !== next) {
      methods.reset(defaultValues);
      prevDefaults.current = next;
    }
  }, [defaultValues, isMainForm]);

  methods.watch((value) => onChange(value as FormData));

  return (
    <FormProvider {...methods}>
      <form className="space-y-3">
        {/* 日主セレクト（autoFocus はココだけ） */}
        <div className="flex items-center gap-2">
          <label className="text-sm">日主</label>
          <select
            {...methods.register('dayMaster')}
            className="border p-1 rounded"
            autoFocus
            tabIndex={0}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                e.preventDefault();
                methods.setFocus('wood');
              }
            }}
          >
            {['木','火','土','金','水'].map((e) => <option key={e} value={e}>{e}</option>)}
          </select>
        </div>

        {/* 五行入力 5 行 */}
        <FiveInputRow element="木" valueKey="wood"  levelKey="woodLevel"  tabStart={1} />
        <FiveInputRow element="火" valueKey="fire"  levelKey="fireLevel"  tabStart={3} />
        <FiveInputRow element="土" valueKey="earth" levelKey="earthLevel" tabStart={5} />
        <FiveInputRow element="金" valueKey="metal" levelKey="metalLevel" tabStart={7} />
        <FiveInputRow element="水" valueKey="water" levelKey="waterLevel" tabStart={9} />
      </form>
    </FormProvider>
  );
}
