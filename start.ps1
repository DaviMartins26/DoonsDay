# Inicia o DevForge em localhost (Windows / PowerShell).
# Instala as dependencias na primeira vez e sobe o servidor de desenvolvimento.
if (-not (Test-Path node_modules)) {
    Write-Host "Instalando dependencias (primeira vez)..."
    npm install
}
npm run dev
