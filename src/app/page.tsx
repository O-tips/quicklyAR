'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../components/Header'; 
import FileUploadButton from "../components/FileUploadButton";
import Button from '../components/Button';
import './styles.css';

export default function Page() {
    const [markerFile, setMarkerFile] = useState<File | null>(null);
    const [modelFile, setModelFile] = useState<File | null>(null);
    const router = useRouter();

    const handle3DModelSelect = (file: File) => {
        console.log('Selected 3D model:', file.name);
        setModelFile(file);  // Save the model file in state
    };

    const handleARMarkerSelect = (file: File) => {
        console.log('Selected AR marker:', file.name);
        setMarkerFile(file);  // Save the marker file in state
    };

    const handleGenerateClick = async () => {
        if (!markerFile || !modelFile) {
            console.error('Please select both the AR marker and 3D model files.');
            return;
        }

        // Create FormData and append the files
        const formData = new FormData();
        formData.append('marker', markerFile);
        formData.append('model', modelFile);

        try {
            const response = await fetch('https://oshaberi-17c056aaa88b.herokuapp.com/upload', {
                method: 'POST',
                body: formData,
            });
        
            if (response.ok) {
                const key = await response.text();
                console.log('Files uploaded successfully : ' + key);
                // Handle successful upload (e.g., show success message, redirect, etc.)
                router.push(`/event/${key}`);
            } else {
                const responseBody = await response.text(); // レスポンスの内容も確認
                console.error('Failed to upload files', response.statusText, responseBody);
            }
        } catch (error: any) {
            console.error('Error uploading files', error);
            
            // エラーオブジェクトの詳細を表示
            if (error instanceof Error) {
                console.error('Error message:', error.message);  // エラーメッセージ
                console.error('Stack trace:', error.stack);  // スタックトレース
            } else {
                console.error('Unknown error', error);
            }
        }
    };

    const handleResetClick = () => {
        console.log('Reset clicked');
        setMarkerFile(null);
        setModelFile(null);
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
                />
                <Button 
                    label="リセット" 
                    onClick={handleResetClick} 
                    className="reset-button"
                />
            </div>
        </div>
    );
}