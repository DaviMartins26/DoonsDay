// ============================================================================
// iaProvider.mjs - cerebro do chat de duvidas com o Albert (IA)
// ----------------------------------------------------------------------------
// Modulo AGNOSTICO de fornecedor: recebe a pergunta do aluno + um resumo do
// exercicio e devolve a resposta do Albert. O destino (Gemini, Claude ou mock)
// e escolhido por variavel de ambiente, entao trocar de IA e so mudar o .env -
// nenhuma tela do front muda.
//
// Decisao do TCC: a IA e consumida via API de NUVEM e a chave fica SO aqui no
// servidor (nunca no front). Hoje o padrao e o Gemini (free tier do Google AI
// Studio); Claude fica como alternativa (basta chave + credito).
//
// Este arquivo NAO depende do Vite nem de nada do navegador: e Node puro (usa o
// fetch nativo, Node 18+). Por isso ele serve igualzinho dentro de uma Azure
// Function no futuro - e so chamar responderAlbert() la tambem.
// ============================================================================

// Persona do Albert + a regra pedagogica (scaffolding): orienta, NAO entrega a
// resposta. Vale para qualquer fornecedor.
const SISTEMA_ALBERT = [
  'Voce e o Albert, um robo mentor sabio e anciao da plataforma DevForge, que',
  'ensina logica de programacao em Python para iniciantes. O aluno esta fazendo',
  'um exercicio e pode te perguntar sobre ele ou sobre a linguagem.',
  '',
  'REGRA PRINCIPAL (scaffolding): oriente o raciocinio, de pistas e explique o',
  'conceito necessario, mas NUNCA entregue a resposta pronta nem escreva o codigo',
  'da solucao do exercicio. Se o aluno pedir "a resposta", recuse com gentileza e',
  'devolva uma pergunta ou uma pista que o faca pensar.',
  '',
  'ESTILO: portugues do Brasil, breve (2 a 4 frases), gentil e encorajador, com',
  'um tom de avo sabio ("jovem aprendiz"). Nada de listas longas. Escreva em',
  'TEXTO PURO: sem markdown e sem LaTeX (nada de $...$, **negrito**, nem #). Para',
  'citar codigo use o nome direto (ex.: print, x, y), sem cifrao nem crases.',
  '',
  'FORA DE ESCOPO: se a pergunta nao for sobre programacao/o exercicio, ou for',
  'impropria, responda com gentileza que so pode ajudar com o conteudo do curso.',
].join('\n')

// Monta o texto do usuario juntando a pergunta com o contexto do exercicio.
// So mandamos enunciado/codigo/tipo - NUNCA o gabarito - pra IA nao ter como
// vazar a resposta certa, nem por acidente.
function montarPergunta({ pergunta, exercicio }) {
  const ex = exercicio || {}
  const partes = ['O aluno esta neste exercicio:']
  if (ex.enunciado) partes.push('Enunciado: ' + ex.enunciado)
  if (ex.codigo) partes.push('Codigo mostrado:\n' + ex.codigo)
  if (ex.tipo) partes.push('Tipo de exercicio: ' + ex.tipo)
  partes.push('', 'Pergunta do aluno: ' + (pergunta || '').trim())
  return partes.join('\n')
}

// ---- Gemini (Google AI Studio) --------------------------------------------
// Free tier: gemini-2.5-flash. A chave vai no header (x-goog-api-key), NUNCA na
// URL (evita vazar o segredo em logs/historico).
async function callGemini({ pergunta, exercicio, apiKey, model }) {
  const modelo = model || 'gemini-2.5-flash'
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelo}:generateContent`
  const corpo = {
    system_instruction: { parts: [{ text: SISTEMA_ALBERT }] },
    contents: [{ role: 'user', parts: [{ text: montarPergunta({ pergunta, exercicio }) }] }],
    generationConfig: { temperature: 0.7, maxOutputTokens: 400 },
  }
  const resp = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
    body: JSON.stringify(corpo),
  })
  if (!resp.ok) {
    const txt = await resp.text().catch(() => '')
    throw new Error(`Gemini ${resp.status}: ${txt.slice(0, 300)}`)
  }
  const data = await resp.json()
  const texto = data?.candidates?.[0]?.content?.parts?.map((p) => p.text).join('') || ''
  if (!texto.trim()) throw new Error('Gemini: resposta vazia')
  return texto.trim()
}

// ---- Claude (Anthropic) - alternativa; precisa de chave + credito -----------
// Deixado pronto: trocar IA_PROVIDER=claude no .env e por a ANTHROPIC_API_KEY.
async function callClaude({ pergunta, exercicio, apiKey, model }) {
  const modelo = model || 'claude-haiku-5-5'
  const resp = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: modelo,
      max_tokens: 400,
      system: SISTEMA_ALBERT,
      messages: [{ role: 'user', content: montarPergunta({ pergunta, exercicio }) }],
    }),
  })
  if (!resp.ok) {
    const txt = await resp.text().catch(() => '')
    throw new Error(`Claude ${resp.status}: ${txt.slice(0, 300)}`)
  }
  const data = await resp.json()
  const texto = (data?.content || []).filter((b) => b.type === 'text').map((b) => b.text).join('')
  if (!texto.trim()) throw new Error('Claude: resposta vazia')
  return texto.trim()
}

// ---- Roteador --------------------------------------------------------------
// Le o fornecedor e as chaves do ambiente (env) passado. Devolve { texto }.
// Lanca erro se o fornecedor escolhido nao tiver chave - quem chama decide o
// fallback (o front cai no mock do Albert).
export async function responderAlbert({ pergunta, exercicio }, env = process.env) {
  const provider = (env.IA_PROVIDER || 'gemini').toLowerCase()

  if (provider === 'mock') {
    return { texto: '(mock) Boa pergunta, jovem aprendiz. Configure a chave da IA no server/.env para eu responder de verdade.', provider }
  }
  if (provider === 'gemini') {
    const apiKey = env.GEMINI_API_KEY
    if (!apiKey) throw new Error('GEMINI_API_KEY ausente no server/.env')
    const texto = await callGemini({ pergunta, exercicio, apiKey, model: env.GEMINI_MODEL })
    return { texto, provider }
  }
  if (provider === 'claude') {
    const apiKey = env.ANTHROPIC_API_KEY
    if (!apiKey) throw new Error('ANTHROPIC_API_KEY ausente no server/.env')
    const texto = await callClaude({ pergunta, exercicio, apiKey, model: env.CLAUDE_MODEL })
    return { texto, provider }
  }
  throw new Error('IA_PROVIDER desconhecido: ' + provider)
}
