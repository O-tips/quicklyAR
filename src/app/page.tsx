'use client';

import React from 'react';
import Header from '../components/Header'; 
import FileUploadButton from "../components/FileUploadButton";
import Button from '../components/Button';
import './styles.css';

export default function Page() {
    const handle3DModelSelect = (file: File) => {
        console.log('Selected 3D model:', file.name);
        // 3Dモデルのアップロード処理をここに実装
    };

    const handleARMarkerSelect = (file: File) => {
        console.log('Selected AR marker:', file.name);
        // ARマーカーのアップロード処理をここに実装
    };

    const handleGenerateClick = () => {
        console.log('Generate AR site clicked');
        // AR サイト生成処理をここに実装
    };

    const handleResetClick = () => {
        console.log('Reset clicked');
        // リセット処理をここに実装
    };

    return (
        <div className="container">
            <Header />
            <h3>.mindへの変換ツールは 
                <a href="https://hiukim.github.io/mind-ar-js-doc/tools/compile" className="link">こちら</a>
            </h3>
            <div className="button-container">
                <FileUploadButton 
                    label="3Dモデルを選択" 
                    acceptedFileTypes=".glb,.gltf,.obj,.fbx" 
                    onFileSelect={handle3DModelSelect} 
                />
                <FileUploadButton 
                    label="ARマーカーを選択" 
                    acceptedFileTypes=".jpg,.jpeg,.png" 
                    onFileSelect={handleARMarkerSelect} 
                />
            </div>
            <div className="button-container">
                <Button 
                    label="AR サイトを生成" 
                    onClick={handleGenerateClick} 
                />
                <Button 
                    label="リセット" 
                    onClick={handleResetClick} 
                    className="reset-button"
                />
            </div>
        </div>
    )
  }