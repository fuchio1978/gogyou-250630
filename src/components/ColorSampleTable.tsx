import { ELEMENT_COLORS, Strength } from '../lib/calc';

const ELEMENT_LABELS = ['木', '火', '土', '金', '水'] as const;
const STRENGTH_LABELS: Strength[] = ['強', '中', '弱'];

export default function ColorSampleTable() {
  return (
    <div className="my-6">
      <table className="border-collapse table-auto">
        <thead>
          <tr>
            <th className="px-2 py-1 border" />
            {STRENGTH_LABELS.map(strength => (
              <th key={strength} className="px-4 py-1 border text-center">{strength}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ELEMENT_LABELS.map(element => (
            <tr key={element}>
              <td className="px-2 py-1 border text-center font-semibold">{element}</td>
              {STRENGTH_LABELS.map(strength => (
                <td key={strength} className="px-4 py-2 border text-center">
                  <span
                    className="inline-block rounded-full border shadow"
                    style={{
                      background: ELEMENT_COLORS[element][strength],
                      width: 36,
                      height: 36,
                      display: 'inline-block',
                      border: '1px solid #ccc',
                    }}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
