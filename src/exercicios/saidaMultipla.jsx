// ============================================================================
// Tipo de exercicio: PREVER A SAIDA (varias caixas)
// ----------------------------------------------------------------------------
// Dados esperados: rotulos (nome de cada caixa) e respostas (valor esperado em
// cada uma). A resposta do usuario e um ARRAY de strings; todas precisam bater.
// (Ver o modelo completo comentado em multipla.jsx.)
// ============================================================================

import { normalizar } from './util.js'

function Campo({ exercicio, resposta, setResposta, travado }) {
  // Atualiza apenas a caixa de indice i, preservando as demais.
  function escrever(i, valor) {
    const copia = [...resposta]
    copia[i] = valor
    setResposta(copia)
  }
  return (
    <div>
      {exercicio.rotulos.map((rotulo, i) => (
        <p key={i}>
          <label>
            {rotulo}:{' '}
            <input
              type="text"
              size="4"
              value={resposta[i]}
              disabled={travado}
              onChange={(e) => escrever(i, e.target.value)}
            />
          </label>
        </p>
      ))}
    </div>
  )
}

export default {
  Campo,
  verificar: (exercicio, resposta) =>
    Array.isArray(resposta) &&
    exercicio.respostas.every((valor, i) => normalizar(resposta[i]) === normalizar(valor)),
  respostaInicial: (exercicio) => exercicio.respostas.map(() => ''),
  temResposta: (exercicio, resposta) =>
    Array.isArray(resposta) && resposta.every((v) => v !== ''),
}
