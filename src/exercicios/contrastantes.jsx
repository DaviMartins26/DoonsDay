// ============================================================================
// Tipo de exercicio: CASOS CONTRASTANTES
// ----------------------------------------------------------------------------
// Dados esperados: versoes (array de { rotulo, codigo }) e correta (indice da
// versao certa). A resposta do usuario e o INDICE da versao escolhida (numero).
//
// Cores: so apos ACERTAR, a versao correta fica verde e as demais vermelhas.
// ============================================================================

import { tabParaVerificar } from './util.js'
import { corDaOpcao } from './multipla.jsx'

function Campo({ exercicio, resposta, setResposta, travado, acertou, focarVerificar }) {
  return (
    <fieldset disabled={travado}>
      {exercicio.versoes.map((versao, i) => {
        const ehCorreta = i === exercicio.correta
        return (
          <div key={i}>
            <label
              style={{
                display: 'block',
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
              {versao.rotulo}
              {acertou && ehCorreta ? ' (correta)' : ''}
            </label>
            <pre>{versao.codigo}</pre>
          </div>
        )
      })}
    </fieldset>
  )
}

export default {
  Campo,
  verificar: (exercicio, resposta) => resposta === exercicio.correta,
  respostaInicial: () => null,
  temResposta: (exercicio, resposta) => resposta !== null,
}
