/* eslint-disable */
"use client";

import React, { useEffect, useState } from "react";
import "@styles/styles.css";
import dynamic from "next/dynamic";

const ARScene = dynamic(() => import("@eventcomponents/ARScene").then((mod) => mod.default), { ssr: false });

function App() {
  const [id, setId] = useState<string | null>(null);
  const [markerUrl, setMarkerUrl] = useState<string | null>(null);
  const [modelUrl, setModelUrl] = useState<string | null>(null);
  const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      setId(searchParams.get("id"));
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;

      try {
        const baseUrl = process.env.NEXT_PUBLIC_ASSETS_URL || "https://custom-ar-assets.nyc3.cdn.digitaloceanspaces.com";
        setMarkerUrl(`${baseUrl}/custom-ar-assets/${id}/marker.mind`);
        setModelUrl(`${baseUrl}/custom-ar-assets/${id}/model.glb`);
        setIsDataLoaded(true);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const handleModelClick = () => {
    console.log("clicked")
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      {isDataLoaded ? (
        <>
          <ARScene markerUrl={markerUrl} modelUrl={modelUrl} onModelClick={handleModelClick} />
          {isDialogOpen && (
            <dialog id="fortune-dialog" className="fortune-dialog" open>
              <div className="fortune-content">
                <h2 id="fortune-text">運勢</h2>
                <pre id="fortune-details">大吉です！おめでとうございます。</pre>
                <button id="close-fortune" onClick={closeDialog}>
                  閉じる
                </button>
              </div>
            </dialog>
          )}
        </>
      ) : (
        <div>Loading AR scene...</div>
      )}
    </>
  );
}

export default App;
