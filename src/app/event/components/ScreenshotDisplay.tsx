// components/ScreenshotDisplay.tsx
import React from 'react';
import Image from 'next/image';

interface ScreenshotDisplayProps {
  screenshot: string | null;
}

const ScreenshotDisplay: React.FC<ScreenshotDisplayProps> = ({ screenshot }) => {
  return (
    <div className="screenshot-display">
      {/* {screenshot && <img id="snap" src={screenshot} alt="Screenshot" />} */}
      {screenshot && <Image src={screenshot} alt="description" width={500} height={300} id="snap"/>}
    </div>
  );
};

export default ScreenshotDisplay;