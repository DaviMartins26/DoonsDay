// ============================================================================
// App.jsx - Raiz da aplicacao
// ----------------------------------------------------------------------------
// Fino de proposito: escolhe a trilha e entrega ao motor do jogo (<Jogo/>).
// Por enquanto roda a primeira trilha da lista. Quando existir um catalogo
// (RF03), e aqui que entra a escolha de trilha: guardar a trilha selecionada em
// estado e passa-la ao <Jogo/>.
// ============================================================================

import Jogo from './jogo/Jogo.jsx'
import { trilhas } from './trilhas/index.js'

export default function App() {
  return <Jogo trilha={trilhas[0]} />
}
