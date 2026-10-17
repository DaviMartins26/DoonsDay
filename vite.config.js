// Configuracao do Vite + Vitest.
// O plugin @vitejs/plugin-react habilita o suporte a React (JSX e Fast Refresh).
// O bloco "test" configura o Vitest (rodar com: npm test). environment "node"
// basta, porque os testes so chamam funcoes puras (verificar/respostaInicial/
// temResposta) - nao renderizam componentes.
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'node',
    include: ['src/**/*.test.{js,jsx}'],
  },
})
