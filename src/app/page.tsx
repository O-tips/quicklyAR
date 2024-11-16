/* eslint-disable */
"use client";

import React, { useState } from "react";
import { QRCodeSVG } from "qrcode.react"; // 名前付きインポートに変更
import Header from "@components/Header";
// import FileUploadButton from "@components/FileUploadButton";
import FileUploadButton from "@components/FileUploadButton";
import Button from "@components/Button";
// import Button from "../components/Button";
import "@styles/styles.css";

// async function fetchEventId() {
//   const response = await fetch(
//     "https://oshaberi-17c056aaa88b.herokuapp.com/api/events"
//   );
//   const data = await response.json();
//   return data.eventId; // APIのレスポンス構造に応じて適切にアクセスしてください
// }

export default function Page() {
  const [markerFile, setMarkerFile] = useState<File | null>(null);
  const [modelFile, setModelFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [qrUrl, setQrUrl] = useState<string | null>(null); // QRコードURLの状態
  const [useDefaultFiles, setUseDefaultFiles] = useState(false);

  const handle3DModelSelect = (file: File) => {
    console.log("Selected 3D model:", file.name);
    setModelFile(file); // モデルファイルを状態に保存
  };

  const handleARMarkerSelect = (file: File) => {
    console.log("Selected AR marker:", file.name);
    setMarkerFile(file); // マーカーファイルを状態に保存
  };

  const fetchDefaultFile = async (url: string, fileName: string, mimeType: string) => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch default file: ${url}`);
    }
    const blob = await response.blob();
    return new File([blob], fileName, { type: mimeType });
  };

  const handleGenerateClick = async () => {
    if (!useDefaultFiles && (!markerFile || !modelFile)) {
      setMessage("Please select both the AR marker and 3D model files.");
      return;
    }

    const formData = new FormData();

    if (useDefaultFiles) {
      const defaultModelFile = await fetchDefaultFile(
        "/assets/models/azarashi3.glb",
        "azarashi3.glb",
        "model/gltf-binary"
      );
      const defaultMarkerFile = await fetchDefaultFile(
        "/assets/target-images/cookie.mind",
        "cookie.mind",
        "application/json"
      );

      formData.append("marker", defaultMarkerFile);
      formData.append("model", defaultModelFile);
    } else {
      formData.append("marker", markerFile!);
      formData.append("model", modelFile!);
    }

    setIsLoading(true);
    setMessage(null);

    try {
      const response = await fetch(
        "https://oshaberi-17c056aaa88b.herokuapp.com/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        const baseUrl =
          process.env.NEXT_PUBLIC_API_URL ||
          "https://quicklyar-6bb17adb8be1.herokuapp.com";
        const query = new URLSearchParams({
          id: responseData,
        }).toString();
        const eventUrl = `${baseUrl}/event?${query}`;
        setMessage(`Success: ${eventUrl}`);
        setQrUrl(eventUrl); // QRコードURLを設定
      } else {
        const responseBody = await response.text();
        console.error(
          "Failed to upload files:",
          response.statusText,
          responseBody
        );
        setMessage("もう一度試してください");
      }
    } catch (error) {
      console.error("Error uploading files:", error);
      setMessage("ネットワークエラーが発生しました。もう一度試してください。");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetClick = () => {
    setMarkerFile(null);
    setModelFile(null);
    setMessage(null);
    setQrUrl(null); // QRコードURLをリセット
    setUseDefaultFiles(false);
  };

  return (
    <div className="container">
      <Header />
      <h3>
        .mindへの変換ツールは
        <a
          href="https://hiukim.github.io/mind-ar-js-doc/tools/compile"
          className="link"
        >
          こちら
        </a>
      </h3>
      <div className="checkbox-container">
        <label>
          <input
            type="checkbox"
            checked={useDefaultFiles}
            onChange={() => setUseDefaultFiles((prev) => !prev)}
          />
          デフォルトのファイルを使用
        </label>
      </div>
      <div className="button-container">
        <FileUploadButton
          label="3Dモデルを選択"
          acceptedFileTypes=".glb,.gltf,.obj,.fbx"
          onFileSelect={handle3DModelSelect}
          disabled={useDefaultFiles}
        />
        <FileUploadButton
          label="ARマーカーを選択"
          acceptedFileTypes=".mind"
          onFileSelect={handleARMarkerSelect}
          disabled={useDefaultFiles}
        />
      </div>
      <div className="button-container">
        <Button label="AR サイトを生成" onClick={handleGenerateClick} />
        <Button
          label="リセット"
          onClick={handleResetClick}
          className="reset-button"
        />
      </div>
      {isLoading && <p className="loading-message">アップロード中...</p>}
      {message && (
        <pre
          className={`message ${
            message.startsWith("Success") ? "success" : "error"
          }`}
        >
          {message}
        </pre>
      )}

      {/* QRコードURLが設定されていればQRコードを表示 */}
      {qrUrl && (
        <div className="qr-container">
          {/* <QRCode value={qrUrl} size={256} /> */}
          <QRCodeSVG
            value={qrUrl}
            size={256}
          />
          <p>QR Code for the event URL</p>
        </div>
      )}
    </div>
  );
}