import React, { useState } from 'react';
import QRCode from 'qrcode.react';

const BulkQRCodeMaker = () => {
  const [employeeIds, setEmployeeIds] = useState('');
  const [qrcodes, setQrcodes] = useState([]);

  const handleGenerate = () => {
    const ids = employeeIds.split(',').map(id => id.trim());
    setQrcodes(ids);
  };

  const downloadQRCode = (id) => {
    const canvas = document.getElementById(id);
    const scaleFactor = 4; // Increase this value to increase resolution
    const width = canvas.width * scaleFactor;
    const height = canvas.height * scaleFactor;
    const scaledCanvas = document.createElement('canvas');
    scaledCanvas.width = width;
    scaledCanvas.height = height;
    const context = scaledCanvas.getContext('2d');
    context.scale(scaleFactor, scaleFactor);
    context.drawImage(canvas, 0, 0);
    const pngUrl = scaledCanvas
      .toDataURL('image/png')
      .replace('image/png', 'image/octet-stream');
    const downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = `${id}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Bulk QR Code Maker</h1>
      <textarea
        className="w-full p-2 border rounded mb-4"
        rows={5}
        value={employeeIds}
        onChange={(e) => setEmployeeIds(e.target.value)}
        placeholder="Enter employee IDs, separated by commas"
      ></textarea>
      <button
        className="bg-blue-500 text-white p-2 rounded"
        onClick={handleGenerate}
      >
        Generate
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {qrcodes.map((id) => (
          <div key={id} className="text-center">
            <QRCode id={id} value={id} size={256} level="H" />
            <p className="mt-2">{id}</p>
            <button
              className="bg-green-500 text-white p-1 mt-2 rounded"
              onClick={() => downloadQRCode(id)}
            >
              Download
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BulkQRCodeMaker;
