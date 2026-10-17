// ============================================================================
// App.jsx - Raiz da aplicacao
// ----------------------------------------------------------------------------
// Controla a navegacao entre o CATALOGO (escolher a trilha) e o JOGO (resolver
// a trilha escolhida). Primeiro passo do RF03 (catalogo + trilha ativa).
//
// - Sem trilha escolhida  -> mostra <TelaCatalogo/> com as trilhas do bloco.
// - Com trilha escolhida  -> mostra <Jogo/> com essa trilha e um "voltar".
// O key={trilha.id} faz o <Jogo/> comecar do zero a cada troca de trilha.
// ============================================================================

import { useState } from 'react'
import Jogo from './jogo/Jogo.jsx'
import TelaCatalogo from './jogo/telas/TelaCatalogo.jsx'
import { bloco, trilhas } from './trilhas/index.js'

export default function App() {
  const [trilhaId, setTrilhaId] = useState(null)
  const trilha = trilhas.find((t) => t.id === trilhaId)

  if (!trilha) {
    return <TelaCatalogo bloco={bloco} trilhas={trilhas} aoEscolher={setTrilhaId} />
  }

  return <Jogo key={trilha.id} trilha={trilha} aoVoltar={() => setTrilhaId(null)} />
}
