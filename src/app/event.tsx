'use client';

import React, { useState } from 'react';
import Header from '../components/Header'; 
import FileUploadButton from "../components/FileUploadButton";
import Button from '../components/Button';
import './styles.css';

const Event = () => {
    const [markerFile, setMarkerFile] = useState<File | null>(null);
    const [modelFile, setModelFile] = useState<File | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handle3DModelSelect = (file: File) => {
        console.log('Selected 3D model:', file.name);
        setModelFile(file);  // モデルファイルを状態に保存
    };

    const handleARMarkerSelect = (file: File) => {
        console.log('Selected AR marker:', file.name);
        setMarkerFile(file);  // マーカーファイルを状態に保存
    };

    const handleGenerateClick = async () => {
        if (!markerFile || !modelFile) {
            setMessage('Please select both the AR marker and 3D model files.');
            return;
        }

        const formData = new FormData();
        formData.append('marker', markerFile);
        formData.append('model', modelFile);

        setIsLoading(true);
        setMessage(null);

        try {
            const response = await fetch('https://oshaberi-17c056aaa88b.herokuapp.com/upload', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const responseData = await response.json();
                const baseUrl = process.env.REACT_APP_BASE_URL || 'http://localhost:3000';
                const eventUrl = `${baseUrl}/event/${responseData}`;
                setMessage(`Success: ${eventUrl}`);
            } else {
                const responseBody = await response.text();
                console.error('Failed to upload files:', response.statusText, responseBody);
                setMessage('もう一度試してください');
            }
        } catch (error: any) {
            console.error('Error uploading files:', error);
            setMessage('ネットワークエラーが発生しました。もう一度試してください。');
        } finally {
            setIsLoading(false);
        }
    };

    const handleResetClick = () => {
        setMarkerFile(null);
        setModelFile(null);
        setMessage(null);
    };

    return (
        <div className="container">
            <Header />
            <h3>
                .mindへの変換ツールは 
                <a href="https://hiukim.github.io/mind-ar-js-doc/tools/compile" className="link">
                    こちら
                </a>
            </h3>
            <div className="button-container">
                <FileUploadButton 
                    label="3Dモデルを選択" 
                    acceptedFileTypes=".glb,.gltf,.obj,.fbx" 
                    onFileSelect={handle3DModelSelect} 
                />
                <FileUploadButton 
                    label="ARマーカーを選択" 
                    acceptedFileTypes=".jpg,.jpeg,.png,.mind" 
                    onFileSelect={handleARMarkerSelect} 
                />
            </div>
            <div className="button-container">
                <Button 
                    label="AR サイトを生成" 
                    onClick={handleGenerateClick} 
                    disabled={isLoading}
                />
                <Button 
                    label="リセット" 
                    onClick={handleResetClick} 
                    className="reset-button"
                    disabled={isLoading}
                />
            </div>
            {isLoading && <p className="loading-message">アップロード中...</p>}
            {message && <pre className={`message ${message.startsWith('Success') ? 'success' : 'error'}`}>{message}</pre>}
        </div>
    );
};

export default Event;