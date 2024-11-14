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
  const [markerUrl, setMarkerUrl] = useState<string | null>(null);
  const [modelUrl, setModelUrl] = useState<string | null>(null);
  const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {       
        try {
            console.log('Files download : ' + id);
            const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://oshaberi-17c056aaa88b.herokuapp.com';

            // マーカーの取得
            const markerResponse = await fetch(`${baseUrl}/marker/${id}`);
            console.log('Marker Response:', markerResponse);
            
            if (!markerResponse.ok) throw new Error('Marker not found');

            const markerBlob = await markerResponse.blob(); // Blobとして取得
            console.log('Marker Blob:', markerBlob);
            
            if (markerBlob.size > 0) {
                const markerUrl = URL.createObjectURL(markerBlob);
                setMarkerUrl(markerUrl); // Blob URLを設定
                console.log("Marker URL:", markerUrl);
            } else {
                console.error("Marker Blob is empty.");
            }

            // モデルの取得
            const modelResponse = await fetch(`${baseUrl}/model/${id}`);
            console.log('Model Response:', modelResponse);
            
            if (!modelResponse.ok) throw new Error('Model not found');

            const modelBlob = await modelResponse.blob(); // Blobとして取得
            console.log('Model Blob:', modelBlob);
            
            if (modelBlob.size > 0) {
                const modelUrl = URL.createObjectURL(modelBlob);
                setModelUrl(modelUrl); // Blob URLを設定
                console.log("Model URL:", modelUrl);
            } else {
                console.error("Model Blob is empty.");
            }
            setIsDataLoaded(true);
        } catch (error) {
            console.error(error);
        }
    };
    fetchData();
  }, []);

  return (
    <>
      {isDataLoaded && (<ARScene markerUrl={markerUrl} modelUrl={modelUrl} />)}
      {/* <TextBox /> */}
      <ScreenshotDisplay screenshot={screenshot} />
      <Footer setScreenshot={setScreenshot} screenshot={screenshot} />
    </>
  );
}

export default App;
