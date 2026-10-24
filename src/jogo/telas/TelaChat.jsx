// ============================================================================
// TelaChat.jsx - PROTOTIPO: resolver exercicios como uma conversa com a Lari
// ----------------------------------------------------------------------------
// Mesma API de props da TelaExercicio (vem do motor Jogo.jsx) - aqui so muda a
// APRESENTACAO: a Lari manda o exercicio como mensagem, a resposta e enviada, ela
// "digita" (...) e responde certo/errado; acertando, manda o proximo. A dica
// tambem vira conversa (confirma -> troca 1 de energia -> dica como mensagem).
//
// O campo de resposta (CampoResposta) e REUSADO como dock de entrada, entao os 7
// tipos de exercicio funcionam sem alteracao. Historico some ao dar F5 (ainda nao
// ha persistencia) - combinado como prototipo.
// ============================================================================

import { useState, useEffect, useRef } from 'react'
import { CampoResposta } from '../../exercicios/registro.jsx'

// Resume a resposta do usuario em texto, para mostrar na bolha "nos".
function resumirResposta(exercicio, resposta) {
  switch (exercicio.tipo) {
    case 'multipla':
      return exercicio.opcoes?.[resposta] ?? '(sem resposta)'
    case 'acharErro':
      return 'Linha ' + (resposta + 1)
    case 'contrastantes':
      return exercicio.versoes?.[resposta]?.rotulo ?? '(sem resposta)'
    case 'lacuna':
      return resposta ? '"' + resposta + '"' : '(vazio)'
    case 'saidaMultipla':
      return Array.isArray(resposta) ? resposta.join('  |  ') : ''
    case 'associacao':
      return Array.isArray(resposta) ? resposta.join(', ') : ''
    case 'parsons':
      return Array.isArray(resposta) ? resposta.join('  /  ') : ''
    default:
      return String(resposta)
  }
}

// Falas da Lari para deixar a conversa mais humana (sorteadas a cada uso).
const SAUDACOES = [
  'Bora comecar! Primeiro desafio:',
  'Vamos nessa! Da uma olhada:',
  'Comecando a trilha - primeira missao:',
  'Preparada? Entao olha so:',
]
const PONTES = [
  'Boa, acertou mais uma! Agora o problema e:',
  'Mandou bem! Proximo desafio:',
  'Isso ai! Bora pro proximo:',
  'Show de bola! Segura essa:',
  'Perfeito, mais um ponto! Agora essa:',
]
const PERDA_ENERGIA = [
  'Ih... essa custou 1 de energia. Bora com calma!',
  'Opa, la se foi 1 de energia. Respira e tenta de novo.',
  'Essa ai custou energia (-1). Sem pressa, voce consegue.',
]
function sortear(frases) {
  return frases[Math.floor(Math.random() * frases.length)]
}

export default function TelaChat({
  trilhaTitulo,
  vidas,
  streak,
  xpTotal,
  indice,
  total,
  exercicio,
  resposta,
  setResposta,
  resultado,
  textoErro,
  podeVerificar,
  confirmandoDica,
  dicaPedida,
  aoPedirDica,
  aoConfirmarDica,
  aoCancelarDica,
  aoVerificar,
  aoTentarDeNovo,
  aoAvancar,
  aoVoltar,
}) {
  const [mensagens, setMensagens] = useState([])
  const [digitando, setDigitando] = useState(false)
  const fimRef = useRef(null)
  const perguntaFeitaRef = useRef(null) // id do exercicio cuja pergunta ja foi enviada
  const aguardaFeedbackRef = useRef(false)
  const vidasAntesRef = useRef(vidas) // energia ANTES de verificar (p/ detectar a perda)

  function push(de, texto, codigo) {
    setMensagens((m) => [...m, { de, texto, codigo }])
  }

  // A Lari manda a pergunta ao entrar num exercicio novo (uma vez por exercicio).
  useEffect(() => {
    if (perguntaFeitaRef.current === exercicio.id) return
    perguntaFeitaRef.current = exercicio.id
    // Introducao humana: saudacao no 1o exercicio, "ponte" (apos acertar) nos demais.
    const intro = indice === 0 ? sortear(SAUDACOES) : sortear(PONTES)
    push('lari', intro + ' ' + exercicio.enunciado, exercicio.codigo)
  }, [exercicio.id, exercicio.enunciado, exercicio.codigo, indice])

  // Quando o motor resolve (apos o Enviar), a Lari "digita" e responde.
  useEffect(() => {
    if (resultado === null) {
      aguardaFeedbackRef.current = false
      return
    }
    if (!aguardaFeedbackRef.current) return
    aguardaFeedbackRef.current = false
    // Perdeu energia neste erro? (a energia cai a partir do 3o erro no exercicio)
    const perdeuEnergia = resultado === false && vidas < vidasAntesRef.current
    setDigitando(true)
    const t = setTimeout(() => {
      setDigitando(false)
      push('lari', resultado ? exercicio.feedbackCerto : textoErro)
      if (perdeuEnergia) push('lari', sortear(PERDA_ENERGIA))
    }, 650)
    return () => clearTimeout(t)
  }, [resultado, textoErro, exercicio.feedbackCerto, vidas])

  // Rola para o fim a cada mensagem nova / "digitando".
  useEffect(() => {
    fimRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [mensagens, digitando])

  function enviar() {
    vidasAntesRef.current = vidas // guarda a energia atual p/ comparar depois de verificar
    push('nos', resumirResposta(exercicio, resposta))
    aguardaFeedbackRef.current = true
    aoVerificar()
  }
  function pedirDica() {
    push('nos', 'Posso pedir uma dica?')
    push('lari', 'Posso te dar uma luz, mas processar a dica custa 1 de energia. Topas?')
    aoPedirDica()
  }
  function dicaSim() {
    push('nos', 'Pode mandar!')
    push('lari', 'Dica: ' + exercicio.dica)
    aoConfirmarDica()
  }
  function dicaNao() {
    push('nos', 'Deixa, vou tentar sozinho.')
    push('lari', 'Isso! Da mais uma olhada com calma.')
    aoCancelarDica()
  }

  const respondendo = resultado === null && !confirmandoDica && !digitando

  return (
    <div className="chat-tela">
      <div className="chat-painel">
        <div className="chat-inner">
          <header className="chat-top">
            {aoVoltar && (
              <button className="chat-btn-ghost" onClick={aoVoltar} title="Voltar ao catalogo">
                ←
              </button>
            )}
            <div className="chat-top-titulo">
              <strong>Lari — DevForge</strong>
              <span>
                {trilhaTitulo} · Exercicio {indice + 1}/{total}
              </span>
            </div>
            <div className="chat-hud">
              <span title="Energia">🔋 {vidas}</span>
              <span title="Streak">🔥 {streak}</span>
              <span title="XP">✦ {xpTotal}</span>
            </div>
          </header>

          <div className="chat-log">
            {mensagens.map((m, i) => (
              <div key={i} className={'chat-msg chat-msg-' + m.de}>
                <div className="chat-bolha">
                  <div className="chat-bolha-txt">{m.texto}</div>
                  {m.codigo && <pre className="chat-codigo">{m.codigo}</pre>}
                </div>
              </div>
            ))}
            {digitando && (
              <div className="chat-msg chat-msg-lari">
                <div className="chat-bolha chat-digitando">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
            <div ref={fimRef} />
          </div>

          <footer className="chat-dock">
            {respondendo && (
              <>
                <div className="chat-campo">
                  <CampoResposta
                    exercicio={exercicio}
                    resposta={resposta}
                    setResposta={setResposta}
                    travado={false}
                    acertou={false}
                  />
                </div>
                <div className="chat-dock-acoes">
                  <button
                    className="chat-btn-dica"
                    onClick={pedirDica}
                    disabled={dicaPedida}
                    title={dicaPedida ? 'Dica ja usada neste exercicio' : 'Pedir dica (-1 energia)'}
                  >
                    💡
                  </button>
                  <button className="chat-btn-enviar" onClick={enviar} disabled={!podeVerificar}>
                    Enviar ▶
                  </button>
                </div>
              </>
            )}

            {confirmandoDica && (
              <div className="chat-dock-acoes chat-centro">
                <button className="chat-btn-enviar" onClick={dicaSim}>
                  Sim (−1 🔋)
                </button>
                <button className="chat-btn-ghost" onClick={dicaNao}>
                  Não
                </button>
              </div>
            )}

            {resultado === true && !digitando && (
              <div className="chat-dock-acoes chat-centro">
                <button className="chat-btn-enviar" onClick={aoAvancar}>
                  Próxima ▶
                </button>
              </div>
            )}

            {resultado === false && !digitando && (
              <div className="chat-dock-acoes chat-centro">
                <button className="chat-btn-enviar" onClick={aoTentarDeNovo}>
                  Tentar de novo ↩
                </button>
              </div>
            )}
          </footer>
        </div>
      </div>
    </div>
  )
}
