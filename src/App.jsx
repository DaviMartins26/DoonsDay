// ============================================================================
// App.jsx - Raiz da aplicacao
// ----------------------------------------------------------------------------
// Controla a navegacao entre a ABERTURA (quadrinho da lore), o CATALOGO
// (escolher a trilha) e o JOGO (resolver a trilha escolhida). RF03.
//
// - Nao viu a abertura  -> mostra <Quadrinho/> com o roteiro de abertura.
// - Sem trilha escolhida -> mostra <TelaCatalogo/> com as trilhas do bloco.
// - Com trilha escolhida -> mostra <Jogo/> com essa trilha e um "voltar".
// O key={trilha.id} faz o <Jogo/> comecar do zero a cada troca de trilha.
// ============================================================================

import { useState } from 'react'
import Jogo from './jogo/Jogo.jsx'
import TelaCatalogo from './jogo/telas/TelaCatalogo.jsx'
import Quadrinho from './quadrinhos/Quadrinho.jsx'
import abertura from './quadrinhos/abertura.js'
import { bloco, trilhas } from './trilhas/index.js'

export default function App() {
  const [viuAbertura, setViuAbertura] = useState(false)
  const [trilhaId, setTrilhaId] = useState(null)
  const trilha = trilhas.find((t) => t.id === trilhaId)

  // 1) Abertura da lore (Lari apresenta a DevForge). Pular leva ao catalogo.
  if (!viuAbertura) {
    return <Quadrinho roteiro={abertura} aoFinalizar={() => setViuAbertura(true)} />
  }

  // 2) Catalogo de trilhas (sem trilha escolhida).
  if (!trilha) {
    return <TelaCatalogo bloco={bloco} trilhas={trilhas} aoEscolher={setTrilhaId} />
  }

  // 3) Jogo da trilha escolhida.
  return <Jogo key={trilha.id} trilha={trilha} aoVoltar={() => setTrilhaId(null)} />
}
