// ============================================================================
// Tipo de exercicio: PREENCHIMENTO DE LACUNA
// ----------------------------------------------------------------------------
// Dados esperados: antes e depois (o codigo em volta) e resposta (texto certo).
// A resposta do usuario e o texto digitado (string).
// (Ver o modelo completo comentado em multipla.jsx.)
// ============================================================================

function Campo({ exercicio, resposta, setResposta, travado }) {
  return (
    // <pre> preserva as quebras de linha do codigo; o <input> entra no meio.
    <pre>
      {exercicio.antes}
      <input
        type="text"
        size="8"
        value={resposta}
        disabled={travado}
        onChange={(e) => setResposta(e.target.value)}
        style={{ fontFamily: 'inherit' }} // herda a fonte monoespacada do <pre>
        aria-label="lacuna"
      />
      {exercicio.depois}
    </pre>
  )
}

export default {
  Campo,
  verificar: (exercicio, resposta) =>
    typeof resposta === 'string' &&
    resposta.trim().toLowerCase() === exercicio.resposta.toLowerCase(),
  respostaInicial: () => '',
  temResposta: (exercicio, resposta) => typeof resposta === 'string' && resposta.trim() !== '',
}
