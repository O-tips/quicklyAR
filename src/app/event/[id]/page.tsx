'use client';

// App.tsx
import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import ARScene from './components/ARScene';
import TextBox from './components/TextBox';
import ScreenshotDisplay from './components/ScreenshotDisplay';
import Footer from './components/Footer';
import './styles.css';

const App: React.FC = () => {
  const [screenshot, setScreenshot] = useState<string | null>(null);

  useEffect(() => {
    // Load external scripts
    const scripts = [
      'https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.1.4/dist/mindar-image.prod.js',
      'https://aframe.io/releases/1.2.0/aframe.min.js',
      'https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.1.4/dist/mindar-image-aframe.prod.js'
    ];

    scripts.forEach(src => {
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      document.body.appendChild(script);
    });

    // Load images
    const header = new Image();
    header.src = "assets/images/header.png";
    const photoFrame = new Image();
    photoFrame.src = "assets/images/photoFrame.png";
  }, []);

  return (
    <div>
      <Header />
      <div className="contents">
        <div id="photo-frame-overlay" className="photo-frame-overlay">
          <img src="assets/images/photoFrame.png" className="photo-frame-image" alt="Photo Frame" />
        </div>
        <ARScene />
        <TextBox />
        <ScreenshotDisplay screenshot={screenshot} />
      </div>
      <Footer setScreenshot={setScreenshot} screenshot={screenshot} />
    </div>
  );
};

export default App;