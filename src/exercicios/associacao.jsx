// ============================================================================
// Tipo de exercicio: ASSOCIACAO (relacionar colunas)
// ----------------------------------------------------------------------------
// Dados esperados: esquerda (itens), opcoes (lista de cada caixa, ja com
// distratores) e correto (resultado certo de cada item, em ordem).
// A resposta do usuario e um ARRAY com a escolha de cada item da esquerda.
// (Ver o modelo completo comentado em multipla.jsx.)
// ============================================================================

function Campo({ exercicio, resposta, setResposta, travado }) {
  function escolher(i, valor) {
    const copia = [...resposta]
    copia[i] = valor
    setResposta(copia)
  }
  return (
    <table>
      <tbody>
        {exercicio.esquerda.map((item, i) => (
          <tr key={i}>
            <td>
              <code>{item}</code>
            </td>
            <td>=</td>
            <td>
              <select
                value={resposta[i]}
                disabled={travado}
                onChange={(e) => escolher(i, e.target.value)}
              >
                <option value="">--</option>
                {exercicio.opcoes.map((valor) => (
                  <option key={valor} value={valor}>
                    {valor}
                  </option>
                ))}
              </select>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default {
  Campo,
  verificar: (exercicio, resposta) =>
    Array.isArray(resposta) && exercicio.correto.every((valor, i) => resposta[i] === valor),
  respostaInicial: (exercicio) => exercicio.esquerda.map(() => ''),
  temResposta: (exercicio, resposta) =>
    Array.isArray(resposta) && resposta.every((v) => v !== ''),
}
