/* eslint-disable */
import React, { useState, useEffect } from "react";
import "aframe";
import "mind-ar/dist/mindar-image-aframe.prod.js";
// import "@eventcomponent/styles.css";

interface ARSceneProps {
  markerUrl: string | null;
  modelUrl: string | null;
}

const ARScene: React.FC<ARSceneProps> = ({ markerUrl, modelUrl }) => {
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

  useEffect(() => {
    console.log("change width");
    const videoElement = document.querySelector("video");
    if (videoElement) {
      videoElement.style.position = "absolute";
      videoElement.style.top = "0";
      videoElement.style.left = "0";
      videoElement.style.width = "100vw";
      videoElement.style.height = "100vh";
      videoElement.style.objectFit = "cover";
      videoElement.style.zIndex = "-2";
    }
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

  if (!isAFrameLoaded || !markerUrl || !modelUrl) {
    return <div>Loading A-Frame or Model...</div>;
  }

  

  return (
    <a-scene
      style={{
        width: "100vw",
        height: "100vh",
        display: "block",
        margin: "0",
        padding: "0",
        overflow: "hidden",
      }}
      mindar-image={`imageTargetSrc: ${markerUrl};`}
      color-space="sRGB"
      renderer="colorManagement: true, physicallyCorrectLights"
      vr-mode-ui="enabled: false"
      device-orientation-permission-ui="enabled: false"
    >
      <a-assets>
        <a-asset-item
          id="model0"
          src={modelUrl}
        ></a-asset-item>
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
