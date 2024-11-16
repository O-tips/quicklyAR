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



  
  // const clickableArea = document.getElementById('clickable-area');
  
  // clickableArea.addEventListener('click', function() {
  //   if (fortuneDialog && fortuneDetails) {
  //     fortuneText.textContent = fortuneTexts[randInt];
  //     fortuneDetails.textContent = fortuneDescriptions[randInt];
  //     fortuneDialog.showModal();
  //     console.log("Fortune dialog shown");
  //   } else {
  //     console.error("Fortune dialog or details element not found");
  //   }
  // });



  return (
    <>
      {isDataLoaded ? (
        <>
          <ARScene markerUrl={markerUrl} modelUrl={modelUrl} />
        </>
      ) : (
        <div>Loading AR scene...</div>
      )}
    </>
  );
}

export default App;
