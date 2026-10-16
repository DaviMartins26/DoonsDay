// ============================================================================
// Tipo de exercicio: ENCONTRAR O ERRO
// ----------------------------------------------------------------------------
// Dados esperados: linhas (array de linhas do codigo) e linhaErrada (indice da
// errada). A resposta do usuario e o INDICE da linha marcada (numero).
// (Ver o modelo completo comentado em multipla.jsx.)
// ============================================================================

import { tabParaVerificar } from './util.js'

function Campo({ exercicio, resposta, setResposta, travado, focarVerificar }) {
  return (
    <fieldset disabled={travado}>
      {exercicio.linhas.map((linha, i) => (
        <label key={i} style={{ display: 'block', fontFamily: 'monospace' }}>
          <input
            type="radio"
            name={exercicio.id}
            checked={resposta === i}
            onChange={() => setResposta(i)}
            onKeyDown={tabParaVerificar(focarVerificar)}
          />{' '}
          {i + 1}: {linha}
        </label>
      ))}
    </fieldset>
  )
}

export default {
  Campo,
  verificar: (exercicio, resposta) => resposta === exercicio.linhaErrada,
  respostaInicial: () => null,
  temResposta: (exercicio, resposta) => resposta !== null,
}
