// ============================================================================
// albertVitePlugin.mjs - plugin do Vite que serve o backend do Albert em DEV
// ----------------------------------------------------------------------------
// Adiciona a rota POST /api/albert ao proprio servidor de desenvolvimento do
// Vite. Assim o chat de duvidas funciona com UM comando (npm run dev), sem
// segundo terminal e sem CORS (mesma origem do front). A chave fica so aqui no
// Node - nunca chega ao navegador.
//
// A logica de IA de verdade esta em iaProvider.mjs (agnostico de fornecedor);
// este arquivo so e a "casca" HTTP para o modo dev. Em producao, a mesma
// responderAlbert() entraria numa Azure Function - ver server/README.md.
// ============================================================================

import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { responderAlbert } from '../api/shared/iaProvider.mjs'

const AQUI = dirname(fileURLToPath(import.meta.url))

// Le server/.env (se existir) e devolve um objeto { CHAVE: valor }. Parser
// minimo: ignora linhas vazias e comentarios (#); nao expande aspas/variaveis.
function carregarEnv() {
  try {
    const bruto = readFileSync(join(AQUI, '.env'), 'utf8')
    const env = {}
    for (const linha of bruto.split('\n')) {
      const t = linha.trim()
      if (!t || t.startsWith('#')) continue
      const i = t.indexOf('=')
      if (i === -1) continue
      env[t.slice(0, i).trim()] = t.slice(i + 1).trim()
    }
    return env
  } catch {
    return {} // sem .env ainda: o front cai no mock
  }
}

// Le o corpo JSON de uma requisicao Node (limite simples de tamanho).
function lerCorpo(req) {
  return new Promise((resolve, reject) => {
    let dados = ''
    req.on('data', (c) => {
      dados += c
      if (dados.length > 100_000) reject(new Error('corpo grande demais'))
    })
    req.on('end', () => {
      try {
        resolve(dados ? JSON.parse(dados) : {})
      } catch (e) {
        reject(e)
      }
    })
    req.on('error', reject)
  })
}

export function albertDevApi() {
  return {
    name: 'devforge-albert-dev-api',
    configureServer(server) {
      server.middlewares.use('/api/albert', async (req, res, next) => {
        if (req.method !== 'POST') return next()
        res.setHeader('Content-Type', 'application/json; charset=utf-8')
        try {
          const { pergunta, exercicio } = await lerCorpo(req)
          if (!pergunta || !String(pergunta).trim()) {
            res.statusCode = 400
            return res.end(JSON.stringify({ erro: 'pergunta vazia' }))
          }
          const env = { ...process.env, ...carregarEnv() }
          const { texto, provider } = await responderAlbert({ pergunta, exercicio }, env)
          res.statusCode = 200
          res.end(JSON.stringify({ texto, provider }))
        } catch (e) {
          // 503 = IA indisponivel (sem chave, erro de rede, etc). O front usa isso
          // para cair no mock do Albert sem quebrar a experiencia.
          res.statusCode = 503
          res.end(JSON.stringify({ erro: String(e.message || e) }))
        }
      })
    },
  }
}
