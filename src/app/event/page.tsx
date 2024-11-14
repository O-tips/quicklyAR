"use client";

// App.tsx
import React, { useEffect, useState } from "react";
import ARScene from "./components/ARScene";
import TextBox from "./components/TextBox";
import ScreenshotDisplay from "./components/ScreenshotDisplay";
import Footer from "./components/Footer";
import "../styles.css";
import { useSearchParams } from "next/navigation";

function App() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [screenshot, setScreenshot] = useState<string | null>(null);
  useEffect(() => {
    if (id) {
      // idが変わったときにカメラの初期化を行う
      console.log("ID changed, initializing camera...");
      // カメラを再初期化する処理や、ARシーンを再設定する処理をここに追加
    }
  }, [id]); // idが変わるたびにこのuseEffectが呼ばれる
  return (
    <>
      <ARScene />
      {/* <TextBox /> */}
      <ScreenshotDisplay screenshot={screenshot} />
      <Footer setScreenshot={setScreenshot} screenshot={screenshot} />
    </>
  );
}

export default App;
