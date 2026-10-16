// ============================================================================
// Jogo.jsx - Motor do jogo (independente do conteudo)
// ----------------------------------------------------------------------------
// Recebe UMA trilha por prop e cuida de todo o estado: exercicio atual,
// resposta, vidas, streak, XP, erros e o feedback progressivo (dicas). Decide
// qual das 3 telas mostrar. Nao conhece os tipos de exercicio diretamente: usa
// o registro (exercicios/registro.jsx) para verificar e desenhar os campos, e os
// parametros de dificuldade vem de config.js.
// ============================================================================

import { useState } from 'react'
import { verificar, respostaInicial, temResposta } from '../exercicios/registro.jsx'
import {
  VIDAS_INICIAIS,
  ERROS_PARA_PERDER_VIDA,
  XP_BASE,
  XP_PENALIDADE_ERRO,
  XP_MINIMO,
  XP_BONUS_POR_STREAK,
  ERROS_PARA_DICA,
  ERROS_PARA_RESPOSTA,
  MENSAGEM_ERRO_SIMPLES,
} from '../config.js'
import TelaExercicio from './telas/TelaExercicio.jsx'
import TelaLicaoInterrompida from './telas/TelaLicaoInterrompida.jsx'
import TelaConclusao from './telas/TelaConclusao.jsx'

// XP "base" de um exercicio acertado, descontando os erros (nunca abaixo do piso).
function calcularXp(erros) {
  return Math.max(XP_BASE - XP_PENALIDADE_ERRO * erros, XP_MINIMO)
}

// Feedback progressivo ao errar: so "errado" -> dica -> resposta completa,
// conforme o numero de erros no exercicio atual.
function mensagemErro(exercicio, erros) {
  if (erros >= ERROS_PARA_RESPOSTA) return exercicio.feedbackErrado
  if (erros >= ERROS_PARA_DICA) return 'Dica: ' + exercicio.dica
  return MENSAGEM_ERRO_SIMPLES
}

export default function Jogo({ trilha }) {
  const [indice, setIndice] = useState(0)
  const [indiceAnterior, setIndiceAnterior] = useState(0)
  const [resposta, setResposta] = useState(() => respostaInicial(trilha.exercicios[0]))
  const [resultado, setResultado] = useState(null) // null | true | false
  const [errosNoExercicio, setErrosNoExercicio] = useState(0)

  // Indicadores que NAO reiniciam entre exercicios (so no "Recomecar"):
  const [vidas, setVidas] = useState(VIDAS_INICIAIS)
  const [streak, setStreak] = useState(0)
  const [xpTotal, setXpTotal] = useState(0)

  const [finalizado, setFinalizado] = useState(false)

  const exercicio = trilha.exercicios[indice]
  const total = trilha.exercicios.length
  const ultimo = indice === total - 1

  // Ao trocar de exercicio, reinicia resposta, resultado e erros ainda durante o
  // render (antes de os componentes filhos usarem a resposta antiga). Vidas,
  // streak e XP NAO sao tocados aqui.
  if (indice !== indiceAnterior) {
    setIndiceAnterior(indice)
    setResposta(respostaInicial(exercicio))
    setResultado(null)
    setErrosNoExercicio(0)
  }

  function aoVerificar() {
    const acertou = verificar(exercicio, resposta)
    setResultado(acertou)
    if (acertou) {
      // Sobe o streak e ganha XP: base (com desconto por erros) + bonus de streak.
      const novoStreak = streak + 1
      setStreak(novoStreak)
      setXpTotal((xp) => xp + calcularXp(errosNoExercicio) + XP_BONUS_POR_STREAK * novoStreak)
    } else {
      // Conta o erro, zera o streak e perde vida a cada ERROS_PARA_PERDER_VIDA erros.
      const novosErros = errosNoExercicio + 1
      setErrosNoExercicio(novosErros)
      setStreak(0)
      if (novosErros % ERROS_PARA_PERDER_VIDA === 0) setVidas((v) => v - 1)
    }
  }

  function aoTentarDeNovo() {
    setResultado(null)
  }

  function aoAvancar() {
    if (ultimo) setFinalizado(true)
    else setIndice((i) => i + 1)
  }

  function aoRecomecar() {
    setIndice(0)
    setIndiceAnterior(0)
    setResposta(respostaInicial(trilha.exercicios[0]))
    setResultado(null)
    setErrosNoExercicio(0)
    setVidas(VIDAS_INICIAIS)
    setStreak(0)
    setXpTotal(0)
    setFinalizado(false)
  }

  // Escolha da tela (a interrupcao por falta de vidas vem primeiro).
  if (vidas <= 0) {
    return <TelaLicaoInterrompida xpTotal={xpTotal} aoRecomecar={aoRecomecar} />
  }
  if (finalizado) {
    return <TelaConclusao xpTotal={xpTotal} vidas={vidas} aoRecomecar={aoRecomecar} />
  }
  return (
    <TelaExercicio
      trilhaTitulo={trilha.titulo}
      vidas={vidas}
      streak={streak}
      xpTotal={xpTotal}
      indice={indice}
      total={total}
      ultimo={ultimo}
      exercicio={exercicio}
      resposta={resposta}
      setResposta={setResposta}
      resultado={resultado}
      textoErro={resultado === false ? mensagemErro(exercicio, errosNoExercicio) : ''}
      podeVerificar={temResposta(exercicio, resposta)}
      aoVerificar={aoVerificar}
      aoTentarDeNovo={aoTentarDeNovo}
      aoAvancar={aoAvancar}
    />
  )
}
