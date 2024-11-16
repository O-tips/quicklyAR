/* eslint-disable */
import React, { useState, useEffect } from "react";
import "aframe";
import "mind-ar/dist/mindar-image-aframe.prod.js";

interface ARSceneProps {
  markerUrl: string | null;
  modelUrl: string | null;
}

const ARScene: React.FC<ARSceneProps> = ({ markerUrl, modelUrl }) => {
  const [isAFrameLoaded, setIsAFrameLoaded] = useState(false);

  useEffect(() => {
    const loadAFrame = async () => {
      if (typeof window !== "undefined") {
        await import("aframe");
        await import("mind-ar/dist/mindar-image-aframe.prod.js");
        setIsAFrameLoaded(true);
      }
    };

    loadAFrame();
  }, []);

  useEffect(() => {
    if (!isAFrameLoaded) return;

    const timeoutId = setTimeout(() => {
      const videoElement = document.querySelector("video");
      if (videoElement) {
        videoElement.style.position = "absolute";
        videoElement.style.top = "0";
        videoElement.style.left = "0";
        videoElement.style.width = "100vw";
        videoElement.style.height = "100vh";
        videoElement.style.objectFit = "cover";
        videoElement.style.zIndex = "-2";

        // シェーダーに渡すサイズの計算
        const videoWidth = parseFloat(videoElement.style.width);
        const videoHeight = parseFloat(videoElement.style.height);
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        const sizeX = videoWidth / windowWidth;
        const sizeY = videoHeight / windowHeight;

        // `uniforms` にサイズを設定
        const sceneEl = document.querySelector("a-scene");
        if (sceneEl) {
          sceneEl.setAttribute("uniforms", JSON.stringify({ _size: { x: sizeX, y: sizeY } }));
        }
      } else {
        console.log("Video element not found");
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [isAFrameLoaded]);

  const updateModel = () => {
    const model = document.querySelector("#model0");
    if (model) {
      model.setAttribute("visible", "true");
    }
  };

  if (!isAFrameLoaded || !markerUrl || !modelUrl) {
    return <div>Loading A-Frame or Model...</div>;
  }

  return (
    <a-scene
      className="fullscreen-scene"
      mindar-image={`imageTargetSrc: ${markerUrl};`}
      color-space="sRGB"
      renderer="colorManagement: true, physicallyCorrectLights"
      vr-mode-ui="enabled: false"
      device-orientation-permission-ui="enabled: false"
    >
      <a-assets>
        <a-asset-item id="model0" src={modelUrl}></a-asset-item>
      </a-assets>

      <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>

      <a-entity mindar-image-target="targetIndex: 0">
        <a-gltf-model
          id="model0"
          rotation="0 0 0"
          position="0 0 0.1"
          scale="1 1 1"
          src="#model0"
          visible="true"
        ></a-gltf-model>
      </a-entity>
    </a-scene>
  );
};

export default ARScene;