import React, { useState, useEffect } from 'react';
import 'aframe';
import 'mind-ar/dist/mindar-image-aframe.prod.js';

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

const ARScene: React.FC<ARSceneProps> = ({ markerUrl, modelUrl }) => {
  const [isAFrameLoaded, setIsAFrameLoaded] = useState(false);

  useEffect(() => {
    console.log("markerUrl : " + markerUrl);
    console.log("modelUrl : " + modelUrl);
    // クライアントサイドでのみaframeとMindARを動的にインポート
    const loadAFrame = async () => {
      if (typeof window !== "undefined") {
        const aframe = await import("aframe");
        const mindar = await import("mind-ar/dist/mindar-image-aframe.prod.js");

        // AFRAMEが利用可能になった後に初期化コードを実行
        console.log("A-Frame and MindAR initialized", aframe, mindar);
        setIsAFrameLoaded(true);
        // AFRAMEのカスタムコンポーネントやシーン設定をここに記述できます
      }
    };

    loadAFrame();
  }, []);

  if (!isAFrameLoaded) {
    // A-FrameとMindARがロードされるまでローディング画面を表示
    // TODO:2回違うぐるぐるが出てくるのを少しどうにかしたい
    return (
      <div>
        "abc"
      </div>
    );
  }

  return (
      <a-scene
        mindar-image={`imageTargetSrc: ${markerUrl};`}
        color-space="sRGB"
        renderer="colorManagement: true, physicallyCorrectLights"
        vr-mode-ui="enabled: false"
        device-orientation-permission-ui="enabled: false"
      >
        <a-assets>
          {modelUrl && (
            <a-asset-item id="model0" src={modelUrl}></a-asset-item>
          )}
          {/* <audio id="soundEffect" src="assets/sounds/celebration.mp3"></audio> */}
        </a-assets>

        <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>

        <a-entity mindar-image-target="targetIndex: 0">
          <a-gltf-model
            id="model0"
            rotation="45 0 0"
            position="0 0 0.1"
            scale="3 3 3"
            src="#model0"
            visible="true"
          ></a-gltf-model>
        </a-entity>
      </a-scene>
  );
};

export default ARScene;