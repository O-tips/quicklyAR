/* eslint-disable */
import React, { useState, useEffect } from "react";
import "aframe";
import "mind-ar/dist/mindar-image-aframe.prod.js";

interface ARSceneProps {
  markerUrl: string | null;
  modelUrl: string | null;
  onModelClick: () => void; // モデルクリック時のコールバック
}

const ARScene: React.FC<ARSceneProps> = ({ markerUrl, modelUrl, onModelClick }) => {
  const [isAFrameLoaded, setIsAFrameLoaded] = useState(false);

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

  // AR sceneイベントリスナー
  useEffect(() => {
    if (!isAFrameLoaded) return;

    const timeoutId = setTimeout(() => {
      const sceneEl = document.querySelector("a-scene");
      console.log("sceneEl", sceneEl);

      if (sceneEl) {
        const onARReady = () => console.log("MindAR is ready");
        const onTargetFound = () => {
          console.log("Target found");
          updateModel();
        };
        const onTargetLost = () => console.log("Target lost");

        sceneEl.addEventListener("arReady", onARReady);
        sceneEl.addEventListener("targetFound", onTargetFound);
        sceneEl.addEventListener("targetLost", onTargetLost);

        return () => {
          sceneEl.removeEventListener("arReady", onARReady);
          sceneEl.removeEventListener("targetFound", onTargetFound);
          sceneEl.removeEventListener("targetLost", onTargetLost);
        };
      }
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [isAFrameLoaded]);

  const updateModel = () => {
    console.log("Updating model");
    const model = document.querySelector("#model0");
    if (model) {
      model.setAttribute("visible", "true");
      console.log("Model visibility updated to true");
    }

    const photoFrameOverlay = document.getElementById("photo-frame-overlay");
    if (photoFrameOverlay) photoFrameOverlay.style.display = "block";
  };

  // モデルのクリックイベントを設定
  useEffect(() => {
    if (!isAFrameLoaded) return;

    const model = document.querySelector("#model0");
    if (model) {
      model.addEventListener("click", onModelClick); // クリックイベントを登録
      console.log("Click event added to the model");
    }

    return () => {
      if (model) {
        model.removeEventListener("click", onModelClick); // クリーンアップ
        console.log("Click event removed from the model");
      }
    };
  }, [isAFrameLoaded, onModelClick]);

  if (!isAFrameLoaded || !markerUrl || !modelUrl) {
    return <div>Loading A-Frame or Model...</div>;
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
