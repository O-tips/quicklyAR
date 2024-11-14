"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "../components/Header";
import FileUploadButton from "../components/FileUploadButton";
import Button from "../components/Button";
import "./styles.css";

// async function fetchEventId() {
//   const response = await fetch(
//     "https://oshaberi-17c056aaa88b.herokuapp.com/api/events"
//   );
//   const data = await response.json();
//   return data.eventId; // APIのレスポンス構造に応じて適切にアクセスしてください
// }

export default function Page() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handle3DModelSelect = (file: File) => {
    console.log("Selected 3D model:", file.name);
    // 3Dモデルのアップロード処理をここに実装
  };

  const handleARMarkerSelect = (file: File) => {
    console.log("Selected AR marker:", file.name);
    // ARマーカーのアップロード処理をここに実装
  };

  const handleGenerateAR = async () => {
    setIsLoading(true);
    try {
      // マーカーとモデルのファイルを準備
      //   const markerFile = new File([''], 'marker.mind', { type: 'application/octet-stream' });
      //   const modelFile = new File([''], 'model.glb', { type: 'application/octet-stream' });

      //   const formData = new FormData();
      //   formData.append('marker', markerFile);
      //   formData.append('model', modelFile);

      //   // APIエンドポイントを呼び出してファイルをアップロード
      //   const response = await fetch('https://oshaberi-17c056aaa88b.herokuapp.com/upload', {
      //     method: 'POST',
      //     body: formData,
      //   });

      //   if (!response.ok) {
      //     throw new Error('Failed to upload files');
      //   }

      //   const data = await response.json();
      //   const uniqueKey = data; // APIからの応答で返されるユニークキー

      const uniqueKey = "051bc270-4c07-4ebd-b512-55e29d867d3c";
      
      const query = new URLSearchParams({
        id: uniqueKey,
      }).toString();
      // event/[id]/page.tsxに遷移
      router.push(`/event?${query}`);
    } catch (error) {
      console.error("Error generating AR site:", error);
      // エラー処理を追加（例：ユーザーへの通知）
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetClick = () => {
    console.log("Reset clicked");
    // リセット処理をここに実装
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
      <div className="button-container">
        <FileUploadButton
          label="3Dモデルを選択"
          acceptedFileTypes=".glb,.gltf"
          onFileSelect={handle3DModelSelect}
        />
        <FileUploadButton
          label="ARマーカーを選択"
          acceptedFileTypes=".mind"
          onFileSelect={handleARMarkerSelect}
        />
      </div>
      <div className="button-container">
        <Button label="AR サイトを生成" onClick={handleGenerateAR} />
        <button onClick={handleGenerateAR} disabled={isLoading}>
          {isLoading ? "Generating..." : "Generate AR Site"}
        </button>
        <Button
          label="リセット"
          onClick={handleResetClick}
          className="reset-button"
        />
      </div>
    </div>
  );
}
