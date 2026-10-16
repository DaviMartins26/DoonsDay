// ============================================================================
// TelaExercicio.jsx - Tela do exercicio atual
// ----------------------------------------------------------------------------
// Tela de apresentacao ("burra"): mostra indicadores, enunciado, codigo, o
// campo de resposta e o feedback/botoes. TODA a logica fica no motor (Jogo.jsx),
// que passa os dados e as acoes por props. O campo de resposta certo e escolhido
// pelo registro de tipos (CampoResposta), conforme o tipo do exercicio.
// ============================================================================

import { useRef } from 'react'
import { CampoResposta } from '../../exercicios/registro.jsx'

export default function TelaExercicio({
  trilhaTitulo,
  vidas,
  streak,
  xpTotal,
  indice,
  total,
  ultimo,
  exercicio,
  resposta,
  setResposta,
  resultado, // null = nao verificou | true = acertou | false = errou
  textoErro, // mensagem ja pronta para o caso de erro (so "errado" / dica / resposta)
  podeVerificar, // habilita o botao Verificar
  aoVerificar,
  aoTentarDeNovo,
  aoAvancar,
}) {
  // Referencia ao botao Verificar, para o atalho de teclado (Tab a partir de uma
  // "bolinha" leva o foco para ca).
  const refVerificar = useRef(null)

  return (
    <main>
      <h1>DevForge</h1>
      <p>
        <strong>{trilhaTitulo}</strong>
      </p>
      {/* Indicadores que acompanham o usuario pela trilha inteira. */}
      <p>
        Vidas: {vidas} | Streak: {streak} | XP: {xpTotal}
      </p>
      <p>
        Exercicio {indice + 1} de {total} - {exercicio.titulo}
      </p>

      <h2>{exercicio.enunciado}</h2>
      {exercicio.codigo && <pre>{exercicio.codigo}</pre>}

      <CampoResposta
        exercicio={exercicio}
        resposta={resposta}
        setResposta={setResposta}
        travado={resultado !== null}
        focarVerificar={() => refVerificar.current && refVerificar.current.focus()}
      />

      {resultado === null && (
        <p>
          <button
            type="button"
            ref={refVerificar}
            onClick={aoVerificar}
            disabled={!podeVerificar}
          >
            Verificar
          </button>
        </p>
      )}

      {resultado === true && (
        <>
          <p className="ok">{exercicio.feedbackCerto}</p>
          <p>
            <button type="button" onClick={aoAvancar}>
              {ultimo ? 'Ver resultado' : 'Proximo'}
            </button>
          </p>
        </>
      )}

      {resultado === false && (
        <>
          <p className="erro">{textoErro}</p>
          <p>
            <button type="button" onClick={aoTentarDeNovo}>
              Tentar de novo
            </button>
          </p>
        </>
      )}
    </main>
  )
}
