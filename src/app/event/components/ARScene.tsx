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
  const [blobUrl, setBlobUrl] = useState<string | null>(null);

  // A-Frame and MindAR initialization
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

  // Handle modelUrl changes and create a Blob URL
  useEffect(() => {
    if (modelUrl) {
      fetch(modelUrl)
        .then((response) => response.blob())
        .then((blob) => {
          const newBlobUrl = URL.createObjectURL(blob);
          setBlobUrl(newBlobUrl);
          console.log("newBlobUrl : " + newBlobUrl)
          console.log("Blob URL created:", newBlobUrl);
        })
        .catch((error) => {
          console.error("Error fetching the model:", error);
        });

      // Cleanup the blob URL when the component unmounts or modelUrl changes
      return () => {
        if (blobUrl) {
          URL.revokeObjectURL(blobUrl);
          console.log("Blob URL revoked");
        }
      };
    }
  }, [modelUrl]);

  // AR scene event listeners
  useEffect(() => {
    if (!isAFrameLoaded) return;

    // A-Frameのロード後に少し遅延させてからsceneElを取得
    const timeoutId = setTimeout(() => {
      const sceneEl = document.querySelector("a-scene");
      console.log("sceneEl", sceneEl);

      const onARReady = () => {
        console.log("MindAR is ready");
      };

      const onTargetFound = () => {
        console.log("Target found");
        requestAnimationFrame(() => {
          updateModel();
        });
      };

      const onTargetLost = () => {
        console.log("Target lost");
      };

      if (sceneEl != null) {
        sceneEl.addEventListener("arReady", onARReady);
        sceneEl.addEventListener("targetFound", onTargetFound);
        sceneEl.addEventListener("targetLost", onTargetLost);
      }

      return () => {
        clearTimeout(timeoutId);
        if (sceneEl != null) {
          sceneEl.removeEventListener("arReady", onARReady);
          sceneEl.removeEventListener("targetFound", onTargetFound);
          sceneEl.removeEventListener("targetLost", onTargetLost);
        }
      };
    }, 100); // 少し遅延させる

    return () => clearTimeout(timeoutId);
  }, [isAFrameLoaded]);

  const updateModel = () => {
    console.log("Updating model");

    const models = [document.querySelector("#model0")];

    models.forEach((model, idx) => {
      const isVisible = idx === 0;
      if (model != null) {
        model.setAttribute("visible", isVisible ? "true" : "false");
        console.log(`Model ${idx} visibility: ${isVisible}`);
      }
    });

    move();

    const photoFrameOverlay = document.getElementById("photo-frame-overlay");
    if (photoFrameOverlay) photoFrameOverlay.style.display = "block";
  };

  const move = () => {
    const penguin = document.querySelector("#model0");
    let position = 0;
    const speed = 0.001;
    let direction = 1;

    function animate() {
      position += speed * direction;

      if (position > 0.2 || position < -0.2) {
        direction *= -1;
      }

      requestAnimationFrame(animate);
    }

    animate();
  };

  if (!isAFrameLoaded || !blobUrl || !markerUrl || !modelUrl) {
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
        <a-asset-item
          id="model0"
          src="https://custom-ar-assets.nyc3.cdn.digitaloceanspaces.com/custom-ar-assets/051bc270-4c07-4ebd-b512-55e29d867d3c/model.glb" // Use the blobUrl after it's set
          // src="assets/models/azarashi3.glb" // Use the blobUrl after it's set
          // src={blobUrl} // Use the blobUrl after it's set
        ></a-asset-item>
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
