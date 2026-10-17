// ============================================================================
// Tipo de exercicio: PARSONS (reordenar linhas)
// ----------------------------------------------------------------------------
// Dados esperados:
//   - linhas  : ordem embaralhada inicial (array de strings);
//   - correta : UMA ordem certa (array), OU
//   - corretas: VARIAS ordens certas (array de arrays) quando ha mais de uma
//               ordem valida. Se "corretas" existir, "correta" e ignorada.
// A resposta do usuario e um ARRAY com as linhas na ordem atual; vale se bater
// com qualquer uma das ordens aceitas.
//
// A indentacao (espacos no inicio da linha) e PRESERVADA na tela (whiteSpace:
// 'pre'), para o codigo parecer codigo de verdade e o usuario perceber a
// estrutura (o que fica "dentro" do if/for aparece com recuo).
// ============================================================================

function ordensAceitas(exercicio) {
  if (Array.isArray(exercicio.corretas)) return exercicio.corretas
  return [exercicio.correta]
}

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
          {/* whiteSpace: 'pre' mantem os espacos de indentacao visiveis */}
          <code style={{ whiteSpace: 'pre' }}>{linha === '' ? ' ' : linha}</code>{' '}
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
    Array.isArray(resposta) &&
    ordensAceitas(exercicio).some((ordem) => resposta.join('\n') === ordem.join('\n')),
  respostaInicial: (exercicio) => [...exercicio.linhas],
  temResposta: (exercicio, resposta) => Array.isArray(resposta),
}
