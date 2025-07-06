import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

function getSvgSize(svg: SVGSVGElement): { width: number; height: number } {
  let width = svg.width.baseVal && svg.width.baseVal.value;
  let height = svg.height.baseVal && svg.height.baseVal.value;
  if (!width || !height) {
    // width/height属性が無ければviewBoxから取得
    if (svg.viewBox && svg.viewBox.baseVal) {
      width = svg.viewBox.baseVal.width;
      height = svg.viewBox.baseVal.height;
    }
  }
  if (!width || !height) {
    // それでも無ければgetBoundingClientRectで取得
    const rect = svg.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
  }
  // 最後の保険
  width = width || 375;
  height = height || 375;
  return { width, height };
}

export async function saveAsPng(svg: SVGSVGElement) {
  // SVGをPNGに変換してダウンロード
  const serializer = new XMLSerializer();
  const svgString = serializer.serializeToString(svg);
  const svgBlob = new Blob([svgString], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(svgBlob);
  const img = new window.Image();
  const width = svg.width.baseVal.value || 375;
  const height = svg.height.baseVal.value || 375;
  img.width = width;
  img.height = height;
  img.onload = () => {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.drawImage(img, 0, 0, width, height);
    canvas.toBlob((blob) => {
      if (!blob) return;
      const pngUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = pngUrl;
      a.download = 'gogyou-balance.png';
      a.click();
      URL.revokeObjectURL(pngUrl);
      URL.revokeObjectURL(url);
    }, 'image/png');
  };
  img.onerror = () => URL.revokeObjectURL(url);
  img.src = url;
}

export async function copyAsPng(svg: SVGSVGElement) {
  // クリップボードAPIサポートチェック
  if (!navigator.clipboard || typeof window.ClipboardItem === 'undefined') {
    throw new Error('ご利用のブラウザは画像コピーに対応していません');
  }
  // SVGをシリアライズして画像化
  const serializer = new XMLSerializer();
  const svgString = serializer.serializeToString(svg);
  const svgBlob = new Blob([svgString], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(svgBlob);
  const img = new window.Image();
  // SVGサイズを取得
  const { width, height } = getSvgSize(svg);
  img.width = width;
  img.height = height;
  return new Promise<void>((resolve, reject) => {
    img.onload = async () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) return reject(new Error('canvas context取得失敗'));
        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob(async (blob) => {
          if (!blob) return reject(new Error('Blob作成失敗'));
          try {
            await navigator.clipboard.write([
              new window.ClipboardItem({ 'image/png': blob })
            ]);
            URL.revokeObjectURL(url);
            resolve();
          } catch (e) {
            reject(new Error('画像のクリップボードコピーに失敗しました。ブラウザの設定やHTTPS環境をご確認ください'));
          }
        }, 'image/png');
      } catch (e) {
        reject(e);
      }
    };
    img.onerror = (e) => reject(e);
    img.src = url;
  });
}



export async function saveAsPdf(svg: SVGSVGElement) {
  // SVGをPNGに変換し、PDFに貼り付けて保存
  const serializer = new XMLSerializer();
  const svgString = serializer.serializeToString(svg);
  const svgBlob = new Blob([svgString], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(svgBlob);
  const img = new window.Image();
  const width = svg.width.baseVal.value || 375;
  const height = svg.height.baseVal.value || 375;
  img.width = width;
  img.height = height;
  img.onload = () => {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.drawImage(img, 0, 0, width, height);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const pageWidth = 210;
    const pageHeight = 297;
    // 最大幅・高さをA4中央に配置
    const scale = Math.min(180 / width, 180 / height); // 余白20mm
    const imgW = width * scale;
    const imgH = height * scale;
    const x = (pageWidth - imgW) / 2;
    const y = (pageHeight - imgH) / 2;
    pdf.addImage(imgData, 'PNG', x, y, imgW, imgH);
    pdf.save('gogyou-balance.pdf');
    URL.revokeObjectURL(url);
  };
  img.onerror = () => URL.revokeObjectURL(url);
  img.src = url;
}
