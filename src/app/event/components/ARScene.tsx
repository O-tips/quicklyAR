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
  const [modelLoaded, setModelLoaded] = useState(false);
  const [soundPlayed, setSoundPlayed] = useState(false);
  
  // A-FrameとMindARの初期化
  useEffect(() => {
    const loadAFrame = async () => {
      if (typeof window !== "undefined") {
        await import("aframe");
        await import("mind-ar/dist/mindar-image-aframe.prod.js");
        setIsAFrameLoaded(true);
        console.log("A-Frame and MindAR initialized");
      }
    };

    loadAFrame();
  }, []);

  // ARシーンのイベントリスナー
  useEffect(() => {
    if (!isAFrameLoaded) return;

    const sceneEl = document.querySelector('a-scene');

    const onARReady = () => {
      console.log("MindAR is ready");
    };

    const onTargetFound = () => {
      console.log("Target found");
      // 状態を更新するために次回レンダリングサイクルまで待つ
      requestAnimationFrame(() => {
        setModelLoaded(true);
        updateModel(); // モデルを更新する関数を呼び出す
      });
    };

    const onTargetLost = () => {
      console.log("Target lost");
      setSoundPlayed(true);
    };

    if (sceneEl != null) {
      sceneEl.addEventListener('arReady', onARReady);
      sceneEl.addEventListener('targetFound', onTargetFound);
      sceneEl.addEventListener('targetLost', onTargetLost);
    }

    return () => {
      // クリーンアップ
      if (sceneEl != null) {
        sceneEl.removeEventListener('arReady', onARReady);
        sceneEl.removeEventListener('targetFound', onTargetFound);
        sceneEl.removeEventListener('targetLost', onTargetLost);
      }
    };
  }, [isAFrameLoaded]);

  // modelLoadedの変化を監視
  useEffect(() => {
    console.log("modelLoaded changed:", modelLoaded);
    if (modelLoaded) {
      updateModel();
    }
  }, [modelLoaded]);

  const updateModel = () => {
    console.log("Updating model");
    
    // モデル表示
    const models = [
      document.querySelector('#model0'),
    ];

    models.forEach((model, idx) => {
      const isVisible = idx === 0; // ランダム選択ロジックに変更可能
      if (model != null) model.setAttribute('visible', isVisible ? "true" : "false");
      console.log(`Model ${idx} visibility: ${isVisible}`);
    });

    // モデルの動き
    move();
    
    // フォトフレーム表示（必要に応じて）
    const photoFrameOverlay = document.getElementById('photo-frame-overlay');
    if (photoFrameOverlay) photoFrameOverlay.style.display = 'block';
  };

  const move = () => {
    const penguin = document.querySelector('a-gltf-model');
    let position = 0;
    const speed = 0.001;
    let direction = 1;

    function animate() {
      position += speed * direction;

      // 位置が範囲を超えた場合、方向を反転
      if (position > 0.2 || position < -0.2) {
        direction *= -1;
      }

      // モデルの位置を更新
      // if (penguin && penguin.object3D) {
      //   penguin.object3D.position.z = position;
      //   penguin.object3D.position.y = position;
      // }

      requestAnimationFrame(animate);
    }

    animate();
  };

  if (!isAFrameLoaded) {
    return <div>Loading A-Frame...</div>; // ローディング表示
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
        <a-asset-item id="model0" src={modelUrl}></a-asset-item>
        {/* 効果音など */}
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