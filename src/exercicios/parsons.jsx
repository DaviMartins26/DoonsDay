// ============================================================================
// Tipo de exercicio: PARSONS (reordenar linhas) - ARRASTAR
// ----------------------------------------------------------------------------
// Dados esperados:
//   - linhas  : ordem embaralhada inicial (array de strings);
//   - correta : UMA ordem certa (array), OU
//   - corretas: VARIAS ordens certas (array de arrays) quando ha mais de uma
//               ordem valida. Se "corretas" existir, "correta" e ignorada.
// A resposta do usuario e um ARRAY com as linhas na ordem atual; vale se bater
// com qualquer uma das ordens aceitas.
//
// Interacao: o usuario ARRASTA a "caixa" da linha (segurando com o mouse ou o
// dedo) para cima/baixo - a lista reordena ao vivo. Pointer events cobrem mouse
// e toque; nenhuma dependencia externa. A indentacao e preservada (white-space:
// pre) para o codigo parecer codigo.
// ============================================================================

import { useRef, useState } from 'react'

function ordensAceitas(exercicio) {
  if (Array.isArray(exercicio.corretas)) return exercicio.corretas
  return [exercicio.correta]
}

function Campo({ resposta, setResposta, travado }) {
  // Durante a troca de exercicio a resposta pode nao ser array por um instante.
  const linhas = Array.isArray(resposta) ? resposta : []
  const listaRef = useRef(null)
  const [arrastando, setArrastando] = useState(null) // indice sendo arrastado

  // Indice do item sob a posicao vertical do cursor (pelo meio de cada item).
  function indiceSob(clientY) {
    const itens = listaRef.current ? listaRef.current.querySelectorAll('[data-linha]') : []
    for (let j = 0; j < itens.length; j++) {
      const r = itens[j].getBoundingClientRect()
      if (clientY < r.top + r.height / 2) return j
    }
    return itens.length - 1
  }

  function aoDescer(i) {
    if (travado) return
    setArrastando(i)
  }

  function aoMover(e) {
    if (arrastando === null) return
    const alvo = indiceSob(e.clientY)
    if (alvo >= 0 && alvo !== arrastando) {
      const copia = [...linhas]
      const [linha] = copia.splice(arrastando, 1)
      copia.splice(alvo, 0, linha)
      setResposta(copia)
      setArrastando(alvo)
    }
  }

  function aoSoltar() {
    setArrastando(null)
  }

  return (
    <ol
      ref={listaRef}
      className="parsons-lista"
      onPointerMove={aoMover}
      onPointerUp={aoSoltar}
      onPointerLeave={aoSoltar}
    >
      {linhas.map((linha, i) => (
        <li
          key={i}
          data-linha
          className={'parsons-item' + (arrastando === i ? ' parsons-arrastando' : '')}
          onPointerDown={() => aoDescer(i)}
        >
          <span className="parsons-grip" aria-hidden="true">
            ⠿
          </span>
          <code>{linha === '' ? ' ' : linha}</code>
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
