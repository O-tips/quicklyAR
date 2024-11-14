"use client";

// App.tsx
import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import ARScene from "./components/ARScene";
import TextBox from "./components/TextBox";
import ScreenshotDisplay from "./components/ScreenshotDisplay";
import Footer from "./components/Footer";
import "../../styles.css";

function App({ params }: { params: Promise<{ id: string }> }) {
  const [id, setId] = useState<string | null>(null);
  const [screenshot, setScreenshot] = useState<string | null>(null);

  // React.use()を使ってparamsをアンラップ
  const unwrappedParams = React.use(params); // paramsを解決

  useEffect(() => {
    if (unwrappedParams) {
      setId(unwrappedParams.id); // 解決されたparamsからidを取得
    }
  }, [unwrappedParams]); // unwrappedParamsが変わるたびにidを更新

  return (
    <div>
      <h1>User ID: {id}</h1>
      <ARScene />
      {/* <TextBox /> */}
      <ScreenshotDisplay screenshot={screenshot} />
      <Footer setScreenshot={setScreenshot} screenshot={screenshot} />
    </div>
  );
}

export default App;
