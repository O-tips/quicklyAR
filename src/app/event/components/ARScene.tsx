import React, { useState, useEffect, useRef } from "react";
import "aframe";
import "mind-ar/dist/mindar-image-aframe.prod.js";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

interface ARSceneProps {
  markerUrl: string | null;
  modelUrl: string | null;
}

const ARScene: React.FC<ARSceneProps> = ({ markerUrl, modelUrl }) => {
  const [isAFrameLoaded, setIsAFrameLoaded] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

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

  // ダイアログ状態変更を監視
  useEffect(() => {
    if (isDialogOpen && dialogRef.current) {
      dialogRef.current.showModal(); // `dialog` を開く
    } else if (dialogRef.current) {
      dialogRef.current.close(); // `dialog` を閉じる
    }
  }, [isDialogOpen]);

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

  // モデルのクリックイベントハンドラ
  const handleModelClick = () => {
    console.log("Model clicked");
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
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

      <div
        id="clickable-area"
        style={{
          width: "100vw",
          height: "100vh",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 0, // A-Frameシーンより前に表示する
        }}
        onClick={handleModelClick} // クリック時のイベントハンドラ
      ></div>

<Dialog
      open={isDialogOpen}
      onClose={closeDialog}
      PaperProps={{
        style: {
          borderRadius: "15px",
          padding: "20px",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
        },
      }}
    >
      <DialogTitle style={{ textAlign: "center", color: "#4A90E2" }}>
        投票お願いします！
      </DialogTitle>
      <DialogContent>
        <div
          className="fortune-content"
          style={{
            textAlign: "center",
            color: "#333",
            fontSize: "1.2rem",
            lineHeight: "1.8",
          }}
        >
          <Typography variant="body1" style={{ marginBottom: "20px" }}>
            下記リンクから投票をお願いします！
          </Typography>
          <a
            href="https://forms.gle/B4G6LR4CKcaTkgZ59/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              textDecoration: "none",
              color: "#fff",
              backgroundColor: "#4A90E2",
              padding: "10px 20px",
              borderRadius: "5px",
              display: "inline-block",
              fontSize: "1rem",
              fontWeight: "bold",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            }}
          >
            ここをクリック！
          </a>
        </div>
      </DialogContent>
      <DialogActions style={{ justifyContent: "center" }}>
        <Button
          onClick={closeDialog}
          style={{
            backgroundColor: "#FF5A5F",
            color: "#fff",
            padding: "10px 20px",
            borderRadius: "5px",
            fontWeight: "bold",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          }}
        >
          閉じる
        </Button>
      </DialogActions>
    </Dialog>
    </>
  );
};

export default ARScene;
