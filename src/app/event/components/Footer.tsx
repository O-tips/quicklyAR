// components/Footer.tsx
import React from 'react';

interface FooterProps {
  setScreenshot: (screenshot: string | null) => void;
  screenshot: string | null;
}

const Footer: React.FC<FooterProps> = ({ setScreenshot, screenshot }) => {
  const takePhoto = () => {
    // Implement photo taking logic
  };

  const deletePhoto = () => {
    setScreenshot(null);
  };

  const downloadPhoto = () => {
    // Implement photo download logic
  };

  const toggleMute = () => {
    // Implement mute toggle logic
  };

  return (
    <div className="footer">
      <div className="screenshot-ui">
        <a href="#" id="delete-photo" title="Delete Photo" className={screenshot ? '' : 'disabled'} onClick={deletePhoto}>
          <i className="material-icons">delete</i>
        </a>
        <a href="#" id="take-photo" title="Take Photo" onClick={takePhoto}>
          <i className="material-icons">photo_camera</i>
        </a>
        <a
          href="#"
          id="download-photo"
          download="selfie.png"
          title="Save Photo"
          className={screenshot ? '' : 'disabled'}
          target="_blank"
          onClick={downloadPhoto}
        >
          <i className="material-icons">file_download</i>
        </a>
        <button id="muteButton" onClick={toggleMute}>ミュート解除</button>
      </div>
    </div>
  );
};

export default Footer;