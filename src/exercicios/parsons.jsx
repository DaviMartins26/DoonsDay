// ============================================================================
// Tipo de exercicio: PARSONS (reordenar linhas)
// ----------------------------------------------------------------------------
// Dados esperados: linhas (ordem embaralhada inicial) e correta (ordem certa).
// A resposta do usuario e um ARRAY com as linhas na ordem atual.
// (Ver o modelo completo comentado em multipla.jsx.)
// ============================================================================

function Campo({ resposta, setResposta, travado }) {
  // Durante a troca de exercicio a resposta pode nao ser array por um instante;
  // este fallback evita erro ao desenhar.
  const linhas = Array.isArray(resposta) ? resposta : []

  // Move a linha da posicao i em "delta" (-1 sobe, +1 desce).
  function mover(i, delta) {
    const destino = i + delta
    if (destino < 0 || destino >= linhas.length) return
    const copia = [...linhas]
    const [linha] = copia.splice(i, 1)
    copia.splice(destino, 0, linha)
    setResposta(copia)
  }

  return (
    <ol>
      {linhas.map((linha, i) => (
        <li key={i} style={{ fontFamily: 'monospace' }}>
          <code>{linha === '' ? ' ' : linha}</code>{' '}
          <button type="button" onClick={() => mover(i, -1)} disabled={travado || i === 0}>
            subir
          </button>{' '}
          <button
            type="button"
            onClick={() => mover(i, 1)}
            disabled={travado || i === linhas.length - 1}
          >
            descer
          </button>
        </li>
      ))}
    </ol>
  )
}

export default {
  Campo,
  verificar: (exercicio, resposta) =>
    Array.isArray(resposta) && resposta.join('\n') === exercicio.correta.join('\n'),
  respostaInicial: (exercicio) => [...exercicio.linhas],
  temResposta: (exercicio, resposta) => Array.isArray(resposta),
}
