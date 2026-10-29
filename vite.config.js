// Configuracao do Vite + Vitest.
// O plugin @vitejs/plugin-react habilita o suporte a React (JSX e Fast Refresh).
// O bloco "test" configura o Vitest (rodar com: npm test). environment "node"
// basta, porque os testes so chamam funcoes puras (verificar/respostaInicial/
// temResposta) - nao renderizam componentes.
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { albertDevApi } from './server/albertVitePlugin.mjs'

export default defineConfig({
  // albertDevApi: backend do chat de duvidas (POST /api/albert) servido pelo
  // proprio dev server. So atua no "npm run dev"; nao afeta build nem testes.
  plugins: [react(), albertDevApi()],
  test: {
    environment: 'node',
    include: ['src/**/*.test.{js,jsx}'],
  },
})
