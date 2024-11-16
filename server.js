const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

// CORSの設定
app.use(cors());

// 静的ファイルの提供
app.use(express.static(path.join(__dirname, 'out')));

// サーバーをポートで起動
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
