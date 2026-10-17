// ============================================================================
// Tipo de exercicio: ENCONTRAR O ERRO
// ----------------------------------------------------------------------------
// Dados esperados: linhas (array de linhas do codigo) e linhaErrada (indice da
// errada). A resposta do usuario e o INDICE da linha marcada (numero).
//
// Cores: so apos ACERTAR, a linha com erro (a resposta certa) fica verde e as
// demais vermelhas. Ao errar, nada e revelado.
// ============================================================================

import { tabParaVerificar } from './util.js'
import { corDaOpcao } from './multipla.jsx'

function Campo({ exercicio, resposta, setResposta, travado, acertou, focarVerificar }) {
  return (
    <fieldset disabled={travado}>
      {exercicio.linhas.map((linha, i) => {
        const ehCorreta = i === exercicio.linhaErrada
        return (
          <label
            key={i}
            style={{
              display: 'block',
              fontFamily: 'monospace',
              color: corDaOpcao(acertou, ehCorreta),
              fontWeight: acertou && ehCorreta ? 'bold' : 'normal',
            }}
          >
            <input
              type="radio"
              name={exercicio.id}
              checked={resposta === i}
              onChange={() => setResposta(i)}
              onKeyDown={tabParaVerificar(focarVerificar)}
            />{' '}
            {i + 1}: <code style={{ whiteSpace: 'pre' }}>{linha}</code>
            {acertou && ehCorreta ? '   <- erro' : ''}
          </label>
        )
      })}
    </fieldset>
  )
}

export default {
  Campo,
  verificar: (exercicio, resposta) => resposta === exercicio.linhaErrada,
  respostaInicial: () => null,
  temResposta: (exercicio, resposta) => resposta !== null,
}
