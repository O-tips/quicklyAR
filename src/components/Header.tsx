'use client';

import React from 'react';
import './Header.css'; // ヘッダー用のスタイルシートをインポート

const Header: React.FC = () => {
  return (
    <header className="header">
      <h1 className="header-title">サクッとAR</h1>
      <p className="header-subtitle">
        3DモデルとARマーカー用のファイルをアップロードして、オリジナルARサイトを生成しよう！
      </p>
    </header>
  );
};

export default Header;