'use client';

import React, { useRef, useState } from 'react';
import '@styles/Button.css';

interface FileUploadButtonProps {
  label: string;
  acceptedFileTypes: string;
  onFileSelect: (file: File) => void;
  disabled?: boolean;
}

const FileUploadButton: React.FC<FileUploadButtonProps> = ({ 
  label, 
  acceptedFileTypes, 
  onFileSelect, 
  disabled = false 
}) => {
  const [fileName, setFileName] = useState<string>(label);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (!disabled) {
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      onFileSelect(file);
    }
  };

  return (
    <div className="file-upload-container">
      <button 
        className={`upload-button ${disabled ? 'disabled' : ''}`} 
        onClick={handleClick} 
        disabled={disabled}
      >
        {fileName}
      </button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
        accept={acceptedFileTypes}
      />
      <div className="file-name">
        {fileName !== label ? `選択されたファイル: ${fileName}` : ''}
      </div>
    </div>
  );
};

export default FileUploadButton;
