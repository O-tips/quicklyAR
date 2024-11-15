/* eslint-disable */
"use client";

import React, { useEffect, useState } from "react";
import "@styles/styles.css";
import { ARSceneProps } from '@eventcomponents/custom-types';
import dynamic from 'next/dynamic';

const ARScene = dynamic(() => import('@eventcomponents/ARScene').then((mod) => mod.default), { ssr: false });

function App() {
  const [id, setId] = useState<string | null>(null);
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [markerUrl, setMarkerUrl] = useState<string | null>(null);
  const [modelUrl, setModelUrl] = useState<string | null>(null);
  const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);

  useEffect(() => {
    // クライアントサイドでのみ動作
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      setId(searchParams.get("id"));
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;

      try {
        console.log("Files download : " + id);
        const baseUrl =
          process.env.NEXT_PUBLIC_API_URL ||
          "https://oshaberi-17c056aaa88b.herokuapp.com";

        // Use Promise.all to fetch marker and model simultaneously
        const [markerResponse, modelResponse] = await Promise.all([
          fetch(`${baseUrl}/marker/${id}`),
          fetch(`https://custom-ar-assets.nyc3.digitaloceanspaces.com/custom-ar-assets/${id}/model.glb`) // Updated URL
        ]);

        if (!markerResponse.ok) throw new Error("Marker not found");
        if (!modelResponse.ok) throw new Error("Model not found");

        // Retrieve blobs from both responses
        const [markerBlob, modelBlob] = await Promise.all([
          markerResponse.blob(),
          modelResponse.blob()
        ]);

        // Check for blob sizes and create URLs
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
      }
    };

    if (id) {
      // `id`が取得された後にmodelUrlを更新
      fetchData();
    }
  }, [id]);

  return (
    <>
      {isDataLoaded && <ARScene markerUrl={markerUrl} modelUrl={modelUrl} />}
      {/* <ScreenshotDisplay screenshot={screenshot} /> */}
      {/* <Footer setScreenshot={setScreenshot} screenshot={screenshot} /> */}
    </>
  );
}

export default App;
