// ============================================================================
// Tipo de exercicio: CASOS CONTRASTANTES
// ----------------------------------------------------------------------------
// Dados esperados: versoes (array de { rotulo, codigo }) e correta (indice da
// versao certa). A resposta do usuario e o INDICE da versao escolhida (numero).
// (Ver o modelo completo comentado em multipla.jsx.)
// ============================================================================

import { tabParaVerificar } from './util.js'

function Campo({ exercicio, resposta, setResposta, travado, focarVerificar }) {
  return (
    <fieldset disabled={travado}>
      {exercicio.versoes.map((versao, i) => (
        <div key={i}>
          <label style={{ display: 'block' }}>
            <input
              type="radio"
              name={exercicio.id}
              checked={resposta === i}
              onChange={() => setResposta(i)}
              onKeyDown={tabParaVerificar(focarVerificar)}
            />{' '}
            {versao.rotulo}
          </label>
          <pre>{versao.codigo}</pre>
        </div>
      ))}
    </fieldset>
  )
}

export default {
  Campo,
  verificar: (exercicio, resposta) => resposta === exercicio.correta,
  respostaInicial: () => null,
  temResposta: (exercicio, resposta) => resposta !== null,
}
