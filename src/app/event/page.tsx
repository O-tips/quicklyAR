// app/event/page.tsx
"use client";  // クライアントサイドでのみ実行されることを明示する

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import dynamic from 'next/dynamic';  // dynamicインポートをここに配置

import ScreenshotDisplay from "./components/ScreenshotDisplay";
import Footer from "./components/Footer";
import "../styles.css";

// クライアントサイドでのみ動作するコンポーネントとしてARSceneを動的インポート
const ARScene = dynamic(() => import('./components/ARScene'), { ssr: false });

function App() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [markerUrl, setMarkerUrl] = useState<string | null>(null);
  const [modelUrl, setModelUrl] = useState<string | null>(null);
  const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Files download : " + id);
        const baseUrl =
          process.env.NEXT_PUBLIC_API_URL ||
          "https://oshaberi-17c056aaa88b.herokuapp.com";

        const [markerResponse, modelResponse] = await Promise.all([
          fetch(`${baseUrl}/marker/${id}`),
          fetch(`${baseUrl}/model/${id}`)
        ]);

        if (!markerResponse.ok) throw new Error("Marker not found");
        if (!modelResponse.ok) throw new Error("Model not found");

        const [markerBlob, modelBlob] = await Promise.all([
          markerResponse.blob(),
          modelResponse.blob()
        ]);

        if (markerBlob.size > 0) {
          const markerBlobUrl = URL.createObjectURL(markerBlob);
          setMarkerUrl(markerBlobUrl);
          console.log("Marker URL:", markerBlobUrl);
        } else {
          console.error("Marker Blob is empty.");
        }

        if (modelBlob.size > 0) {
          const modelBlobUrl = URL.createObjectURL(modelBlob);
          setModelUrl(modelBlobUrl);
          console.log("Model URL:", modelBlobUrl);
        } else {
          console.error("Model Blob is empty.");
        }

        setIsDataLoaded(true);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("データの取得に失敗しました。もう一度試してください。");
      }
    };

    fetchData();
  }, [id]);

  return (
    <>
      {error && <div>{error}</div>}
      {isDataLoaded && <ARScene markerUrl={markerUrl} modelUrl={modelUrl} />}
      <ScreenshotDisplay screenshot={screenshot} />
      <Footer setScreenshot={setScreenshot} screenshot={screenshot} />
    </>
  );
}

export default App;
