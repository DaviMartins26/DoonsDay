// ============================================================================
// App.jsx - Raiz da aplicacao
// ----------------------------------------------------------------------------
// Controla a navegacao entre a ABERTURA (quadrinho da lore), o CATALOGO
// (escolher a trilha), a INTRO DA TRILHA (quadrinho antes do jogo) e o JOGO.
//
// - Nao viu a abertura    -> <Quadrinho/> com o roteiro de abertura.
// - Sem trilha escolhida   -> <TelaCatalogo/> com as trilhas do bloco (RF03).
// - Trilha tem intro ainda nao vista -> <Quadrinho/> com a intro da trilha.
// - Caso contrario         -> <Jogo/> com essa trilha e um "voltar".
//
// INTROS: mapa trilhaId -> roteiro de quadrinho. So a Trilha 1 (leitura) tem
// intro por enquanto (escopo do MVP). Para dar intro a outra trilha, basta
// criar o modulo e adicionar aqui. Cada intro toca uma vez por sessao (guardada
// no Set introsVistas).
// ============================================================================

import { useState } from 'react'
import Jogo from './jogo/Jogo.jsx'
import TelaCatalogo from './jogo/telas/TelaCatalogo.jsx'
import Quadrinho from './quadrinhos/Quadrinho.jsx'
import abertura from './quadrinhos/abertura.js'
import trilha1Intro from './quadrinhos/trilha1-intro.js'
import trilha1Final from './quadrinhos/trilha1-final.js'
import { bloco, trilhas } from './trilhas/index.js'

// Intro de quadrinho por trilha (trilhaId -> roteiro), tocada ao "Comecar".
const INTROS = {
  leitura: trilha1Intro,
}

// Fechamento por trilha (trilhaId -> roteiro), tocado ao concluir a trilha.
const FINAIS = {
  leitura: trilha1Final,
}

export default function App() {
  const [viuAbertura, setViuAbertura] = useState(false)
  const [trilhaId, setTrilhaId] = useState(null)
  const [introsVistas, setIntrosVistas] = useState(() => new Set())
  const trilha = trilhas.find((t) => t.id === trilhaId)

  // 1) Abertura da lore (Lari apresenta a DevForge). Pular leva ao catalogo.
  if (!viuAbertura) {
    return <Quadrinho roteiro={abertura} aoFinalizar={() => setViuAbertura(true)} />
  }

  // 2) Catalogo de trilhas (sem trilha escolhida).
  if (!trilha) {
    return <TelaCatalogo bloco={bloco} trilhas={trilhas} aoEscolher={setTrilhaId} />
  }

  // 3) Intro da trilha (se houver e ainda nao foi vista nesta sessao).
  const intro = INTROS[trilha.id]
  if (intro && !introsVistas.has(trilha.id)) {
    return (
      <Quadrinho
        roteiro={intro}
        aoFinalizar={() => setIntrosVistas((vistas) => new Set(vistas).add(trilha.id))}
      />
    )
  }

  // 4) Jogo da trilha escolhida (com o quadrinho de fechamento, se houver).
  return (
    <Jogo
      key={trilha.id}
      trilha={trilha}
      roteiroFinal={FINAIS[trilha.id] || null}
      aoVoltar={() => setTrilhaId(null)}
    />
  )
}
