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
