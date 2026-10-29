// ============================================================================
// albert.mjs - Azure Function que serve POST /api/albert em PRODUCAO
// ----------------------------------------------------------------------------
// Mesma funcao do plugin do Vite (que vale so em dev), agora no formato Azure
// Functions (modelo Node v4) para rodar no Static Web Apps. Reusa o MESMO cerebro
// agnostico (shared/iaProvider.mjs) - nenhuma logica de IA duplicada.
//
// A chave NAO fica aqui nem no repo: vem das "Application settings" do Azure
// (process.env). Sem chave/erro -> 503, e o front cai no mock (nao quebra).
//
// Rota: no SWA, o nome "albert" vira /api/albert automaticamente.
// ============================================================================

import { app } from '@azure/functions'
import { responderAlbert } from '../../shared/iaProvider.mjs'

app.http('albert', {
  methods: ['POST'],
  authLevel: 'anonymous',
  route: 'albert',
  handler: async (request, context) => {
    try {
      const body = await request.json().catch(() => ({}))
      const { pergunta, exercicio } = body || {}
      if (!pergunta || !String(pergunta).trim()) {
        return { status: 400, jsonBody: { erro: 'pergunta vazia' } }
      }
      const { texto, provider } = await responderAlbert({ pergunta, exercicio }, process.env)
      return { status: 200, jsonBody: { texto, provider } }
    } catch (e) {
      context.error('Albert falhou:', e)
      // 503 = IA indisponivel (sem chave, erro de rede): front usa o mock.
      return { status: 503, jsonBody: { erro: String(e?.message || e) } }
    }
  },
})
