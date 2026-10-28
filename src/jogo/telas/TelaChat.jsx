// ============================================================================
// TelaChat.jsx - resolver exercicios como uma conversa com a Lari
// ----------------------------------------------------------------------------
// Mesma API de props da TelaExercicio (vem do motor Jogo.jsx) - aqui so muda a
// APRESENTACAO: a Lari manda o exercicio como mensagem, a resposta e enviada, ela
// "digita" (...) e responde certo/errado; acertando, manda o proximo. A dica
// tambem vira conversa (confirma -> troca 1 de energia -> dica como mensagem).
//
// Cada mensagem tem "de" (quem fala) e "humor" (normal/dica/erro): o AVATAR muda
// conforme o personagem e o humor. Hoje so a Lari fala; para outra trilha ter
// outro personagem mandando as mensagens, basta adicionar os rostos dele em
// AVATARES e usar push('<personagem>', ...). O rosto do jogador ("nos") nao e
// mostrado (decisao de design).
//
// O campo de resposta (CampoResposta) e REUSADO como dock de entrada, entao os 7
// tipos de exercicio funcionam sem alteracao. Historico some ao dar F5 (ainda nao
// ha persistencia).
// ============================================================================

import { useState, useEffect, useRef } from 'react'
import { CampoResposta } from '../../exercicios/registro.jsx'
import { ENERGIA_IA_INICIAL } from '../../config.js'

// Rostos por personagem e humor (em public/chat/...). normal = padrao.
const AVATARES = {
  lari: {
    normal: '/chat/lari/normal.png',
    dica: '/chat/lari/duvida.png',
    erro: '/chat/lari/erro.png',
  },
}
// Rosto do Albert no chat (uma arte so; ele e da "gestao anterior", estilo diferente).
const ALBERT_ICON = '/chat/albert/icone.png'

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
      // Uma saida por linha (ex.: "Saida 1: 8"), nao tudo grudado.
      return Array.isArray(resposta)
        ? exercicio.rotulos.map((rotulo, i) => rotulo + ': ' + resposta[i]).join('\n')
        : ''
    case 'associacao':
      // Uma ligacao por linha (ex.: "42 → int"), igual a bolha da Lari.
      return Array.isArray(resposta)
        ? (exercicio.esquerda || []).map((item, i) => item + ' → ' + resposta[i]).join('\n')
        : ''
    case 'parsons':
      return Array.isArray(resposta) ? resposta.join('  /  ') : ''
    default:
      return String(resposta)
  }
}

// Gabarito "quebrado por linha", para a Lari mostrar a resposta no mesmo formato
// da nossa bolha (uma coisa por linha). Vale para os tipos com VARIAS respostas:
// saidaMultipla ("Saida 1: 8"...) e associacao/fios ("42 → int"...). Nos demais
// tipos (uma resposta so) devolve null (nao mostra nada a mais).
function gabaritoLinhas(exercicio) {
  if (exercicio.tipo === 'saidaMultipla') {
    const rotulos = exercicio.rotulos || []
    const respostas = exercicio.respostas || []
    if (rotulos.length <= 1) return null
    return rotulos.map((rotulo, i) => rotulo + ': ' + respostas[i]).join('\n')
  }
  if (exercicio.tipo === 'associacao') {
    const esquerda = exercicio.esquerda || []
    const correto = exercicio.correto || []
    if (!esquerda.length) return null
    return esquerda.map((item, i) => item + ' → ' + correto[i]).join('\n')
  }
  return null
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
  'Ih... essa custou 1 de vida. Bora com calma!',
  'Opa, la se foi 1 de vida. Respira e tenta de novo.',
  'Esse erro custou vida. Sem pressa, voce consegue.',
]
// Aberturas do Albert (robo sabio anciao) nas respostas de duvida (mock).
const ALBERT_ABERTURAS = [
  'Boa pergunta, jovem aprendiz.',
  'Hmm. Deixa este velho circuito pensar...',
  'Entendo tua duvida.',
  'Ja processei muitos bugs em meus longos ciclos.',
]
// Formata o cronometro de recarga de energia (ex.: "23h 59m 58s").
function formatarRecarga(s) {
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  const sec = s % 60
  const dois = (n) => String(n).padStart(2, '0')
  return `${h}h ${dois(m)}m ${dois(sec)}s`
}
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
  aula,
  energiaIA,
  aoGastarEnergiaIA,
}) {
  const [mensagens, setMensagens] = useState([])
  const [digitando, setDigitando] = useState(false)
  const fimRef = useRef(null)
  const perguntaFeitaRef = useRef(null) // id do exercicio cuja pergunta ja foi enviada
  const aguardaFeedbackRef = useRef(false)
  const vidasAntesRef = useRef(vidas) // energia ANTES de verificar (p/ detectar a perda)
  const aulaFeitaRef = useRef(false) // se a mini-aula da trilha ja foi mostrada

  // Overlay "Falar com o Outro": chat de duvidas com a IA. Moeda propria
  // (energiaIA): cada pergunta custa 1. Respostas MOCKADAS por enquanto.
  const [duvidaAberta, setDuvidaAberta] = useState(false)
  const [duvidaMsgs, setDuvidaMsgs] = useState([])
  const [duvidaInput, setDuvidaInput] = useState('')
  const [duvidaDigitando, setDuvidaDigitando] = useState(false)
  const [duvidaErro, setDuvidaErro] = useState('')
  const [recargaSeg, setRecargaSeg] = useState(null) // cronometro (mock) de recarga de energia
  const duvidaFimRef = useRef(null)

  // de = 'lari' | 'nos' (futuramente 'rival', 'chef'...); humor = normal/dica/erro.
  function push(de, texto, codigo, humor = 'normal') {
    setMensagens((m) => [...m, { de, texto, codigo, humor }])
  }

  // A Lari manda a pergunta ao entrar num exercicio novo (uma vez por exercicio).
  useEffect(() => {
    if (perguntaFeitaRef.current === exercicio.id) return
    perguntaFeitaRef.current = exercicio.id
    // Mini-aula da trilha: a Lari explica um pouco ANTES do 1o exercicio (uma
    // bolha por frase). So uma vez, so se a trilha tiver "aula".
    if (indice === 0 && Array.isArray(aula) && aula.length && !aulaFeitaRef.current) {
      aulaFeitaRef.current = true
      aula.forEach((frase) => push('lari', frase, undefined, 'normal'))
    }
    // Introducao humana: saudacao no 1o exercicio, "ponte" (apos acertar) nos demais.
    const intro = indice === 0 ? sortear(SAUDACOES) : sortear(PONTES)
    push('lari', intro + ' ' + exercicio.enunciado, exercicio.codigo, 'normal')
    // Mini-explicacao do exercicio (campo opcional "nota"): vem DEPOIS do desafio,
    // explicando/reforcando o conceito necessario. Antes do enunciado parecia que
    // ela apresentava o exercicio como novidade so depois de ja ter falado dele.
    if (exercicio.nota) push('lari', exercicio.nota, undefined, 'normal')
  }, [exercicio.id, exercicio.enunciado, exercicio.codigo, indice, aula])

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
      // Gabarito "rico": quando o exercicio traz um campo "gabarito" (uma linha
      // por saida, ja explicando a conta), a Lari manda UMA so mensagem com ele,
      // no lugar da frase + gabarito generico.
      const gabaritoRico = Array.isArray(exercicio.gabarito) ? exercicio.gabarito.join('\n') : null
      if (resultado) {
        if (gabaritoRico) {
          push('lari', gabaritoRico, undefined, 'normal')
        } else {
          push('lari', exercicio.feedbackCerto, undefined, 'normal')
          // Sem gabarito rico: mostra o gabarito generico quebrado por linha.
          const g = gabaritoLinhas(exercicio)
          if (g) push('lari', g, undefined, 'normal')
        }
      } else {
        // Na revelacao completa (apos erros suficientes), se houver gabarito rico
        // ele substitui a frase de erro; senao, frase + gabarito generico.
        const revelaCompleto = textoErro === exercicio.feedbackErrado
        if (revelaCompleto && gabaritoRico) {
          push('lari', gabaritoRico, undefined, 'erro')
        } else {
          push('lari', textoErro, undefined, 'erro')
          if (revelaCompleto) {
            const g = gabaritoLinhas(exercicio)
            if (g) push('lari', g, undefined, 'erro')
          }
        }
        if (perdeuEnergia) push('lari', sortear(PERDA_ENERGIA), undefined, 'erro')
      }
    }, 650)
    return () => clearTimeout(t)
  }, [resultado, textoErro, exercicio.feedbackCerto, exercicio.feedbackErrado, vidas])

  // Rola para o fim a cada mensagem nova / "digitando".
  useEffect(() => {
    fimRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [mensagens, digitando])

  // Rola o chat de duvidas (overlay do Albert).
  useEffect(() => {
    duvidaFimRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [duvidaMsgs, duvidaDigitando])

  // Cronometro (mock) de recarga: com energia abaixo do maximo, mostra "nova
  // energia em 24h". Ainda nao recarrega de verdade - so o visual do contador.
  useEffect(() => {
    if (energiaIA >= ENERGIA_IA_INICIAL) {
      setRecargaSeg(null)
      return
    }
    setRecargaSeg((s) => (s == null ? 24 * 3600 : s))
    const id = setInterval(() => setRecargaSeg((s) => (s == null ? s : Math.max(0, s - 1))), 1000)
    return () => clearInterval(id)
  }, [energiaIA])

  function enviar() {
    vidasAntesRef.current = vidas // guarda a energia atual p/ comparar depois de verificar
    push('nos', resumirResposta(exercicio, resposta))
    aguardaFeedbackRef.current = true
    aoVerificar()
  }
  function pedirDica() {
    push('nos', 'Posso pedir uma dica?')
    push('lari', 'Claro! A dica custa 1 vida. Quer que eu mostre?', undefined, 'dica')
    aoPedirDica()
  }
  function dicaSim() {
    push('nos', 'Pode mandar!')
    push('lari', 'Dica: ' + exercicio.dica, undefined, 'dica')
    aoConfirmarDica()
  }
  function dicaNao() {
    push('nos', 'Deixa, vou tentar sozinho.')
    push('lari', 'Isso! Da mais uma olhada com calma.', undefined, 'normal')
    aoCancelarDica()
  }

  // ---- Chat de duvidas com o Outro (mock, sem backend ainda) ---------------
  function abrirDuvida() {
    if (!duvidaMsgs.length) {
      setDuvidaMsgs([
        {
          de: 'albert',
          texto:
            'Eu sou o Albert. Pergunte sobre o exercicio ou sobre a linguagem - cada pergunta custa 1 de energia. Aviso: pergunta fora do assunto ou impropria gasta energia do mesmo jeito.',
        },
      ])
    }
    setDuvidaErro('')
    setDuvidaAberta(true)
  }
  function enviarDuvida() {
    const q = duvidaInput.trim()
    if (!q) {
      setDuvidaErro('Escreva sua duvida primeiro.')
      return
    }
    if (energiaIA <= 0) {
      setDuvidaErro('Sem energia para perguntar agora.')
      return
    }
    setDuvidaErro('')
    setDuvidaInput('')
    setDuvidaMsgs((m) => [...m, { de: 'nos', texto: q }])
    aoGastarEnergiaIA()
    setDuvidaDigitando(true)
    // MOCK: aqui, no futuro, entra a chamada real ao Claude (ver DESIGN-TIPO-IA.md).
    setTimeout(() => {
      setDuvidaDigitando(false)
      setDuvidaMsgs((m) => [
        ...m,
        {
          de: 'albert',
          texto:
            sortear(ALBERT_ABERTURAS) +
            ' Acompanhe o codigo linha por linha e teste com um exemplo pequeno; costuma revelar o ponto. (resposta de exemplo - aqui vai entrar o Claude de verdade.)',
        },
      ])
    }, 800)
  }

  const respondendo = resultado === null && !confirmandoDica && !digitando

  // Avatar da mensagem: a Lari usa foto; o Outro usa um placeholder (sem arte
  // ainda); o jogador ("nos") nao mostra rosto.
  function Avatar({ de, humor }) {
    if (de === 'lari')
      return <img className="chat-avatar" src={AVATARES.lari[humor || 'normal']} alt="" />
    if (de === 'albert') return <img className="chat-avatar" src={ALBERT_ICON} alt="" />
    return null
  }

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
              <span title="Vida (erros no exercicio)">❤️ {vidas}</span>
              <span title="Energia (chat com o Albert)">⚡ {energiaIA}</span>
              {recargaSeg != null && (
                <span title="Recarga da energia do Albert">🕒 {formatarRecarga(recargaSeg)}</span>
              )}
              <span title="Streak">🔥 {streak}</span>
              <span title="XP">✦ {xpTotal}</span>
            </div>
          </header>

          <div className="chat-log">
            {mensagens.map((m, i) => (
              <div key={i} className={'chat-msg chat-msg-' + m.de}>
                <Avatar de={m.de} humor={m.humor} />
                <div className="chat-bolha">
                  <div className="chat-bolha-txt">{m.texto}</div>
                  {m.codigo && <pre className="chat-codigo">{m.codigo}</pre>}
                </div>
              </div>
            ))}
            {digitando && (
              <div className="chat-msg chat-msg-lari">
                <img className="chat-avatar" src={AVATARES.lari.normal} alt="" />
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
                    title={dicaPedida ? 'Dica ja usada neste exercicio' : 'Pedir dica da Lari (-1 vida)'}
                  >
                    💡
                  </button>
                  <button
                    className="chat-btn-dica"
                    onClick={abrirDuvida}
                    disabled={energiaIA <= 0}
                    title={energiaIA <= 0 ? 'Sem energia para falar com o Albert' : 'Falar com o Albert (-1 energia)'}
                  >
                    🧓
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
                  Sim (−1 ❤️)
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

      {duvidaAberta && (
        <div className="outro-overlay" role="dialog" aria-label="Chat com o Outro">
          <div className="outro-painel">
            <header className="outro-top">
              <img className="chat-avatar" src={ALBERT_ICON} alt="" />
              <div className="chat-top-titulo">
                <strong>Albert</strong>
                <span>Tire sua duvida · ⚡ {energiaIA}</span>
                {recargaSeg != null && (
                  <span className="albert-recarga">🕒 Nova energia em: {formatarRecarga(recargaSeg)}</span>
                )}
              </div>
              <button className="chat-btn-ghost" onClick={() => setDuvidaAberta(false)} title="Fechar">
                ✕
              </button>
            </header>
            <div className="outro-log">
              {duvidaMsgs.map((m, i) => (
                <div key={i} className={'chat-msg chat-msg-' + m.de}>
                  <Avatar de={m.de} humor="normal" />
                  <div className="chat-bolha">
                    <div className="chat-bolha-txt">{m.texto}</div>
                  </div>
                </div>
              ))}
              {duvidaDigitando && (
                <div className="chat-msg chat-msg-albert">
                  <img className="chat-avatar" src={ALBERT_ICON} alt="" />
                  <div className="chat-bolha chat-digitando">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              )}
              <div ref={duvidaFimRef} />
            </div>
            <footer className="outro-dock">
              <textarea
                className="proj-code"
                value={duvidaInput}
                onChange={(e) => {
                  setDuvidaInput(e.target.value)
                  setDuvidaErro('')
                }}
                rows={3}
                placeholder="Pergunte sobre o exercicio ou a linguagem..."
                aria-label="Sua duvida"
              />
              <div className="proj-dock-linha">
                <span className="proj-hint">
                  Cada pergunta custa 1 ⚡ (mesmo se for fora do assunto) · voce tem {energiaIA}
                </span>
                {duvidaErro && <span className="proj-erro">{duvidaErro}</span>}
                <button className="chat-btn-enviar" onClick={enviarDuvida} disabled={energiaIA <= 0}>
                  Perguntar ▶
                </button>
              </div>
            </footer>
          </div>
        </div>
      )}
    </div>
  )
}
