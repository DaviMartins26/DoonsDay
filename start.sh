#!/usr/bin/env bash
# Inicia o DevForge em localhost (Linux / macOS).
# Instala as dependencias na primeira vez e sobe o servidor de desenvolvimento.
set -e
if [ ! -d node_modules ]; then
  echo "Instalando dependencias (primeira vez)..."
  npm install
fi
npm run dev
