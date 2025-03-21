FROM node:22

# 基本ツールのインストール
RUN apt-get update && apt-get install -y git curl

# pnpm のインストール
RUN corepack enable && corepack prepare pnpm@latest --activate

# 作業ディレクトリ
WORKDIR /workspace