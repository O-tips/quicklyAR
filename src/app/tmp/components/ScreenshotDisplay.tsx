// components/ScreenshotDisplay.tsx
import React from 'react';

interface ScreenshotDisplayProps {
  screenshot: string | null;
}

const ScreenshotDisplay: React.FC<ScreenshotDisplayProps> = ({ screenshot }) => {
  return (
    <div className="screenshot-display">
      {screenshot && <img id="snap" src={screenshot} alt="Screenshot" />}
    </div>
  );
};

export default ScreenshotDisplay;