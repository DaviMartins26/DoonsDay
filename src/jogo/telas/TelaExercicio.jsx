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
  dicaPedida, // se o usuario ja trocou energia pela dica neste exercicio
  confirmandoDica, // se esta mostrando o pedido de confirmacao da dica
  aoPedirDica,
  aoConfirmarDica,
  aoCancelarDica,
  aoVerificar,
  aoTentarDeNovo,
  aoAvancar,
  aoPular, // pula o exercicio (so para TESTE de conteudo)
  aoVoltar, // volta ao catalogo (opcional)
}) {
  // Referencia ao botao Verificar, para o atalho de teclado (Tab a partir de uma
  // "bolinha" leva o foco para ca).
  const refVerificar = useRef(null)

  return (
    <main>
      <h1>DevForge</h1>
      {aoVoltar && (
        <p>
          <button type="button" onClick={aoVoltar}>
            &larr; Voltar ao catalogo
          </button>
        </p>
      )}
      <p>
        <strong>{trilhaTitulo}</strong>
      </p>
      {/* Indicadores que acompanham o usuario pela trilha inteira. */}
      <p>
        Energia: {vidas} | Streak: {streak} | XP: {xpTotal}
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
        acertou={resultado === true}
        focarVerificar={() => refVerificar.current && refVerificar.current.focus()}
      />

      {/* Dica sob demanda: troca 1 de energia pela dica. So aparece antes de
          responder e enquanto a dica ainda nao foi pedida. */}
      {resultado === null && !dicaPedida && !confirmandoDica && (
        <p>
          <button type="button" onClick={aoPedirDica}>
            Pedir dica (-1 energia)
          </button>
        </p>
      )}
      {confirmandoDica && (
        <p>
          Trocar 1 de energia por uma dica?{' '}
          <button type="button" onClick={aoConfirmarDica}>
            Sim, trocar 1 energia
          </button>{' '}
          <button type="button" onClick={aoCancelarDica}>
            Cancelar
          </button>
        </p>
      )}
      {dicaPedida && <p className="ok">Dica: {exercicio.dica}</p>}

      {resultado === null && (
        <p>
          <button
            type="button"
            ref={refVerificar}
            onClick={aoVerificar}
            disabled={!podeVerificar}
          >
            Verificar
          </button>{' '}
          {/* Botao de TESTE: pula o exercicio sem resolver, so para validar o
              conteudo. Remover quando a validacao de conteudo terminar. */}
          {aoPular && (
            <button type="button" onClick={aoPular} title="Apenas para teste de conteudo">
              Pular exercicio (teste)
            </button>
          )}
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
