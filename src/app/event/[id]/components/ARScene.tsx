import React, { useEffect } from 'react';
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
  useEffect(() => {
    // コンポーネントがマウントされた後にA-Frameのシーンを初期化
    require('aframe');
    require('mind-ar/dist/mindar-image-aframe.prod.js');
  }, []);

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