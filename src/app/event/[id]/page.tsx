"use client";

// App.tsx
import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import ARScene from "./components/ARScene";
import TextBox from "./components/TextBox";
import ScreenshotDisplay from "./components/ScreenshotDisplay";
import Footer from "./components/Footer";
import "../../styles.css";

function App({ id }: { id: string }) {
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [markerUrl, setMarkerUrl] = useState<string | null>(null);
  const [modelUrl, setModelUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
        try {
            console.log('Files download : ' + id);
            const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://oshaberi-17c056aaa88b.herokuapp.com';
            const markerResponse = await fetch(`${baseUrl}/marker/${id}`);
            if (!markerResponse.ok) throw new Error('Marker not found');

            const modelResponse = await fetch(`${baseUrl}/model/${id}`);
            if (!modelResponse.ok) throw new Error('Model not found');

            setMarkerUrl(URL.createObjectURL(await markerResponse.blob()));
            setModelUrl(URL.createObjectURL(await modelResponse.blob()));
        } catch (error) {
            console.error(error);
        }
    };
    fetchData();
    if (id) {
        fetchData();
      }
    }, [id]);

  return (
    <div>
      <h1>User ID: {id}</h1>
      <ARScene markerUrl={markerUrl} modelUrl={modelUrl} />
      {/* <TextBox /> */}
      <ScreenshotDisplay screenshot={screenshot} />
      <Footer setScreenshot={setScreenshot} screenshot={screenshot} />
    </div>
  );
}

export default App;