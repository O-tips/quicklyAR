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
  // const id = searchParams.get("id");
  const id = "051bc270-4c07-4ebd-b512-55e29d867d3c";
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [markerUrl, setMarkerUrl] = useState<string | null>(null);
  const [modelUrl, setModelUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
        if (!id) {
            console.error("ID is not defined.");
            return; // IDがない場合は処理を中止
        }
        
        try {
            console.log('Files download : ' + id);
            const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://oshaberi-17c056aaa88b.herokuapp.com';
            const markerResponse = await fetch(`${baseUrl}/marker/${id}`);
            console.log('Marker Response:', markerResponse);
            if (!markerResponse.ok) throw new Error('Marker not found');

            const modelResponse = await fetch(`${baseUrl}/model/${id}`);
            if (!modelResponse.ok) throw new Error('Model not found');

            // Blob URLを生成
            setMarkerUrl(URL.createObjectURL(await markerResponse.blob()));
            setModelUrl(URL.createObjectURL(await modelResponse.blob()));
        } catch (error) {
            console.error(error);
        }
    };

    fetchData();
  }, [id]); // idが変わるたびにデータを再取得

  return (
    <>
       <ARScene markerUrl={markerUrl} modelUrl={modelUrl} />
      {/* <TextBox /> */}
      <ScreenshotDisplay screenshot={screenshot} />
      <Footer setScreenshot={setScreenshot} screenshot={screenshot} />
    </>
  );
}

export default App;
