import { useRef, useCallback } from 'react';
import { QRCodeCanvas, QRCodeSVG } from 'qrcode.react';
import { Download } from 'lucide-react';
import { toast } from 'sonner';

interface QRCodeDisplayProps {
  value: string;
  certificateId: string;
  size?: number;
}

export default function QRCodeDisplay({ value, certificateId, size = 180 }: QRCodeDisplayProps) {
  const canvasRef = useRef<HTMLDivElement>(null);

  const downloadPNG = useCallback(() => {
    const canvas = canvasRef.current?.querySelector('canvas');
    if (!canvas) return;
    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = `QR-${certificateId}.png`;
    a.click();
    toast.success('QR Code downloaded as PNG');
  }, [certificateId]);

  const downloadSVG = useCallback(() => {
    const svg = document.createElement('div');
    svg.style.display = 'none';
    document.body.appendChild(svg);
    // Render temporary SVG
    const svgEl = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svgEl.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    document.body.removeChild(svg);
    // Use inline SVG component data
    const svgContainer = document.createElement('div');
    svgContainer.style.position = 'absolute';
    svgContainer.style.left = '-9999px';
    document.body.appendChild(svgContainer);
    const svgQR = document.getElementById(`qr-svg-${certificateId}`);
    if (svgQR) {
      const blob = new Blob([svgQR.outerHTML], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `QR-${certificateId}.svg`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success('QR Code downloaded as SVG');
    }
    document.body.removeChild(svgContainer);
  }, [certificateId]);

  const downloadPDF = useCallback(() => {
    const canvas = canvasRef.current?.querySelector('canvas');
    if (!canvas) return;
    const imgData = canvas.toDataURL('image/png');
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    printWindow.document.write(`
      <html><head><title>QR-${certificateId}</title>
      <style>
        body { margin: 0; display: flex; align-items: center; justify-content: center; min-height: 100vh; background: white; }
        .container { text-align: center; padding: 40px; border: 2px solid #1e4d8c; border-radius: 12px; }
        h2 { font-family: Arial; color: #0a1628; margin-bottom: 8px; }
        p { font-family: Arial; color: #555; font-size: 13px; }
        img { display: block; margin: 20px auto; }
      </style>
      </head><body>
      <div class="container">
        <h2>MAXIM CODE</h2>
        <p>Certificate Verification QR Code</p>
        <img src="${imgData}" width="${size}" height="${size}" />
        <p><strong>${certificateId}</strong></p>
        <p>Scan to verify: ${value}</p>
      </div>
      <script>window.onload=()=>{window.print();}<\/script>
      </body></html>
    `);
    printWindow.document.close();
    toast.success('QR PDF print dialog opened');
  }, [certificateId, value, size]);

  return (
    <div className="flex flex-col items-center gap-4">
      {/* QR Canvas (for download) */}
      <div
        ref={canvasRef}
        className="qr-wrapper p-3 bg-white rounded-2xl shadow-neon-blue"
      >
        <QRCodeCanvas
          value={value}
          size={size}
          level="H"
          includeMargin={false}
          imageSettings={{
            src: '',
            height: 0,
            width: 0,
            excavate: false,
          }}
        />
      </div>

      {/* Hidden SVG version for SVG download */}
      <div style={{ display: 'none' }}>
        <QRCodeSVG
          id={`qr-svg-${certificateId}`}
          value={value}
          size={size}
          level="H"
          includeMargin={true}
        />
      </div>

      <p className="text-xs text-brand-300 text-center max-w-[200px] break-all">{value}</p>

      {/* Download Buttons */}
      <div className="flex gap-2 flex-wrap justify-center">
        <button
          onClick={downloadPNG}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-brand-700 hover:bg-brand-600 text-white text-xs font-medium rounded-lg transition-all hover:scale-105"
        >
          <Download className="w-3 h-3" /> PNG
        </button>
        <button
          onClick={downloadSVG}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-brand-700 hover:bg-brand-600 text-white text-xs font-medium rounded-lg transition-all hover:scale-105"
        >
          <Download className="w-3 h-3" /> SVG
        </button>
        <button
          onClick={downloadPDF}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-brand-700 hover:bg-brand-600 text-white text-xs font-medium rounded-lg transition-all hover:scale-105"
        >
          <Download className="w-3 h-3" /> PDF
        </button>
      </div>
    </div>
  );
}
