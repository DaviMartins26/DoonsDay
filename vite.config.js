// Configuracao do Vite (ferramenta de build e servidor de desenvolvimento).
// O plugin @vitejs/plugin-react habilita o suporte a React: JSX e o Fast Refresh
// (HMR), que atualiza a tela ao salvar sem recarregar a pagina inteira.
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
