import { FiveElementInput, getFiveElements, BASE_R, PX_PER_UNIT, ELEMENT_COLORS, Strength } from '../lib/calc';
import { saveAsPng, saveAsPdf, copyAsPng } from '../utils/download';
import { useRef } from 'react';

interface Props {
  value: FiveElementInput;
}

export default function FiveChart({ value }: Props) {
  const svgRef = useRef<SVGSVGElement>(null);
  // nullやundefinedを0に補正
  const safeValue = {
    ...value,
    wood: value.wood ?? 0,
    fire: value.fire ?? 0,
    earth: value.earth ?? 0,
    metal: value.metal ?? 0,
    water: value.water ?? 0,
  };
  const fiveElements = getFiveElements(safeValue);

  // 日主を真上に固定、時計回りで配置
  // fiveElements: [{ label, value, color, angleDeg }]

  return (
    <div className="flex flex-col items-center">

      <div className="flex justify-end w-full gap-4 mb-2">
        <button
          aria-label="Copy as image"
          className="btn btn-sm btn-circle"
          onClick={async () => {
            if (svgRef.current) {
              try {
                await copyAsPng(svgRef.current);
                window.alert('画像をコピーしました！Ctrl+Vで貼り付けできます');
              } catch (e) {
                window.alert('画像のクリップボードコピーに失敗しました。HTTPS環境やブラウザの設定をご確認ください');
              }
            }
          }}
        >
          Copy
        </button>

      </div>
      <svg
        ref={svgRef}
        viewBox="0 0 375 375"
        width={375}
        height={375}
        className="mx-auto block"
        style={{ background: 'transparent', marginTop: 0 }}
      >
        {/* ガイド円 */}
        <circle cx={187.5} cy={187.5} r={93.75} stroke="#888" fill="none" strokeWidth={1.5} />
        {fiveElements.map(({ label, value, color, angleDeg, level }) => {
           const rad = (angleDeg * Math.PI) / 180;
           const cx = 187.5 + 93.75 * Math.sin(rad);
           const cy = 187.5 - 93.75 * Math.cos(rad);
           const minR = 9 * 1.5;
           const scale = 4.5 * 1.5;
           const r = value > 0 ? minR + value * scale : 0;
           // levelに応じて色を取得
           const fill = ELEMENT_COLORS[label][level as Strength] ?? '#ccc';
           const opacity = 1;

           return (
             <g key={label}>
               {r > 0 && (
                 <circle
                   cx={cx}
                   cy={cy}
                   r={r}
                   fill={fill}
                   fillOpacity={opacity}
                 />
               )}
               <text
                 x={cx}
                 y={cy}
                 textAnchor="middle"
                 dominantBaseline="central"
                 fill="#fff"
                 fontSize={Math.max(14, r / 2)}
                 fontFamily="'Rounded Mplus 1c', 'Noto Sans JP', 'Noto Sans', 'sans-serif'"
                 fontWeight={700}
                 style={{ letterSpacing: '0.05em' }}
               >
                 {label}
               </text>
             </g>
           );
         })}
      </svg>
    </div>
  );
}
