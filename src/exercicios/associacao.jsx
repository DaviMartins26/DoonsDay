// ============================================================================
// Tipo de exercicio: ASSOCIACAO (relacionar colunas) - FIOS
// ----------------------------------------------------------------------------
// Dados esperados: esquerda (itens), opcoes (valores da direita, ja com
// distratores) e correto (resultado certo de cada item, em ordem).
// A resposta do usuario e um ARRAY com a escolha de cada item da esquerda.
//
// Interacao (estilo "fios" do Among Us): o usuario ARRASTA um fio da porta de
// uma pergunta (esquerda) ate a porta de uma resposta (direita). Soltar numa
// porta liga; soltar no vazio desliga. Varias perguntas podem ligar na mesma
// resposta (ex.: varias afirmacoes "True"). Os fios sao desenhados em SVG por
// cima. Pointer events cobrem mouse e toque; sem dependencia externa.
//
// Acessibilidade: por ora e so por arrastar (sem teclado) - trade-off do
// prototipo; a versao por <select> continua no historico do Git se precisar.
// ============================================================================

import { useRef, useState, useLayoutEffect } from 'react'

function Campo({ exercicio, resposta, setResposta }) {
  const { esquerda, opcoes } = exercicio
  // Portas da direita: valores unicos (uma porta por valor; distratores incluidos).
  const direita = [...new Set(opcoes)]
  const atual = Array.isArray(resposta) ? resposta : esquerda.map(() => '')

  const contRef = useRef(null)
  const esqRefs = useRef([])
  const dirRefs = useRef({})
  const [coords, setCoords] = useState({ esq: [], dir: {} })
  const [arrasto, setArrasto] = useState(null) // { i, x, y } posicao atual do cursor

  // Calcula o centro de cada porta relativo ao container (para desenhar os fios).
  useLayoutEffect(() => {
    function calcular() {
      const cont = contRef.current
      if (!cont) return
      const c = cont.getBoundingClientRect()
      const centro = (el) => {
        const r = el.getBoundingClientRect()
        return { x: r.left - c.left + r.width / 2, y: r.top - c.top + r.height / 2 }
      }
      const esq = esqRefs.current.map((el) => (el ? centro(el) : { x: 0, y: 0 }))
      const dir = {}
      for (const v of direita) {
        const el = dirRefs.current[v]
        if (el) dir[v] = centro(el)
      }
      setCoords({ esq, dir })
    }
    calcular()
    window.addEventListener('resize', calcular)
    return () => window.removeEventListener('resize', calcular)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function posRelativa(e) {
    const c = contRef.current.getBoundingClientRect()
    return { x: e.clientX - c.left, y: e.clientY - c.top }
  }

  function aoDescerPorta(i, e) {
    const o = coords.esq[i]
    if (!o) return
    contRef.current.setPointerCapture?.(e.pointerId)
    setArrasto({ i, x: o.x, y: o.y })
  }

  function aoMover(e) {
    if (!arrasto) return
    const p = posRelativa(e)
    setArrasto((a) => ({ ...a, x: p.x, y: p.y }))
  }

  function aoSoltar(e) {
    if (!arrasto) return
    const alvo = document.elementFromPoint(e.clientX, e.clientY)
    const porta = alvo && alvo.closest ? alvo.closest('[data-porta-dir]') : null
    const copia = [...atual]
    copia[arrasto.i] = porta ? porta.getAttribute('data-porta-dir') : '' // soltar no vazio desliga
    setResposta(copia)
    setArrasto(null)
  }

  return (
    <div
      ref={contRef}
      className="fios"
      onPointerMove={aoMover}
      onPointerUp={aoSoltar}
      onPointerCancel={() => setArrasto(null)}
    >
      <svg className="fios-svg">
        {atual.map((v, i) =>
          v && coords.esq[i] && coords.dir[v] ? (
            <line
              key={i}
              className="fio"
              x1={coords.esq[i].x}
              y1={coords.esq[i].y}
              x2={coords.dir[v].x}
              y2={coords.dir[v].y}
            />
          ) : null,
        )}
        {arrasto && coords.esq[arrasto.i] ? (
          <line
            className="fio fio-arrasto"
            x1={coords.esq[arrasto.i].x}
            y1={coords.esq[arrasto.i].y}
            x2={arrasto.x}
            y2={arrasto.y}
          />
        ) : null}
      </svg>

      <div className="fios-col fios-esq">
        {esquerda.map((item, i) => (
          <div className="fios-row" key={i}>
            <code className="fios-rotulo">{item}</code>
            <span
              className={'fios-porta fios-porta-esq' + (atual[i] ? ' fios-ligada' : '')}
              ref={(el) => (esqRefs.current[i] = el)}
              onPointerDown={(e) => aoDescerPorta(i, e)}
              title="Arraste ate a resposta"
            />
          </div>
        ))}
      </div>

      <div className="fios-col fios-dir">
        {direita.map((v) => (
          <div className="fios-row" key={v}>
            <span
              className="fios-porta fios-porta-dir"
              data-porta-dir={v}
              ref={(el) => (dirRefs.current[v] = el)}
            />
            <span className="fios-rotulo">{v}</span>
          </div>
        ))}
      </div>
    </div>
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
