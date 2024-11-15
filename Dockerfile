# Node.jsの公式イメージを使用
FROM node:18 as build

# 作業ディレクトリを設定
WORKDIR /app

# 必要なファイルをコピー
COPY package*.json ./

# 依存関係をインストール
RUN npm install

# アプリケーションファイルをコピー
COPY . .

# Reactアプリをビルド
RUN npm run build

# Nginxを使った静的ファイルの配信
FROM nginx:stable-alpine

# Nginxのデフォルト設定を削除してビルドしたアプリをコピー
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/build /usr/share/nginx/html

# Nginxのデフォルト設定を上書き
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# ポートをExpose
EXPOSE 80

# Nginxを起動
CMD ["nginx", "-g", "daemon off;"]
