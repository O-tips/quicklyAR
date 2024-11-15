import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'a-scene': any;
      'a-assets': any;
      'a-asset-item': any;
      'a-camera': any;
      'a-entity': any;
      'a-gltf-model': any;
    }
  }
}

interface ARSceneProps {
  markerUrl: string | null;
  modelUrl: string | null;
}

// クライアントサイドでのみ読み込む
const AFrame = dynamic(() => import('aframe'), { ssr: false });
const MindAR = dynamic(() => import('mind-ar/dist/mindar-image-aframe.prod.js'), { ssr: false });

const ARScene: React.FC<ARSceneProps> = ({ markerUrl, modelUrl }) => {
  const [isAFrameLoaded, setIsAFrameLoaded] = useState(false);
  const [modelLoaded, setModelLoaded] = useState(false);
  const [soundPlayed, setSoundPlayed] = useState(false);

  // モデルURLが存在する場合にダウンロードリンクを表示
  const handleDownload = () => {
    if (modelUrl) {
      // Blob URLを使用してダウンロードリンクを作成
      const link = document.createElement('a');
      link.href = modelUrl; // Blob URL
      link.download = 'model.glb'; // 強制的にglb拡張子を付与
      link.click();
    }
  };

  const handleDownload_marker = () => {
    if (markerUrl) {
      // Blob URLを使用してダウンロードリンクを作成
      const link = document.createElement('a');
      link.href = markerUrl; // Blob URL
      link.download = 'marker.mind'; // 強制的にmind拡張子を付与
      link.click();
    }
  };

  return (
    <div>
      <div>ダウンロード</div>
      {/* モデルURLがある場合にダウンロードボタンを表示 */}
      {modelUrl && (
        <button onClick={handleDownload}>モデルをダウンロード</button>
      )}
      {markerUrl && (
        <button onClick={handleDownload_marker}>markerをダウンロード</button>
      )}

      {/* 他のコンポーネントやA-Frameのシーンなどはここに配置 */}
    </div>
  );
};

export default ARScene;
