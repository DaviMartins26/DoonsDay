// ============================================================================
// Jogo.jsx - Motor do jogo (independente do conteudo)
// ----------------------------------------------------------------------------
// Recebe UMA trilha por prop e cuida de todo o estado: exercicio atual,
// resposta, energia, streak, XP, erros e o feedback progressivo (dicas). Decide
// qual das 3 telas mostrar. Nao conhece os tipos de exercicio diretamente: usa
// o registro (exercicios/registro.jsx) para verificar e desenhar os campos, e os
// parametros de dificuldade vem de config.js.
//
// aoVoltar (opcional) volta ao catalogo de trilhas (vem do App.jsx).
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

export default function Jogo({ trilha, aoVoltar }) {
  const [indice, setIndice] = useState(0)
  const [indiceAnterior, setIndiceAnterior] = useState(0)
  const [resposta, setResposta] = useState(() => respostaInicial(trilha.exercicios[0]))
  const [resultado, setResultado] = useState(null) // null | true | false
  const [errosNoExercicio, setErrosNoExercicio] = useState(0)
  // Dica "sob demanda": o usuario pode trocar 1 de energia por ver a dica.
  // confirmandoDica mostra o pedido de confirmacao na propria pagina (sem usar
  // window.confirm, que e feio e nem sempre funciona).
  const [dicaPedida, setDicaPedida] = useState(false)
  const [confirmandoDica, setConfirmandoDica] = useState(false)

  // Indicadores que NAO reiniciam entre exercicios (so no "Recomecar"):
  const [vidas, setVidas] = useState(VIDAS_INICIAIS)
  const [streak, setStreak] = useState(0)
  const [xpTotal, setXpTotal] = useState(0)

  const [finalizado, setFinalizado] = useState(false)

  const exercicio = trilha.exercicios[indice]
  const total = trilha.exercicios.length
  const ultimo = indice === total - 1

  // Ao trocar de exercicio, reinicia resposta, resultado, erros e a dica pedida
  // ainda durante o render. Energia, streak e XP NAO sao tocados aqui.
  if (indice !== indiceAnterior) {
    setIndiceAnterior(indice)
    setResposta(respostaInicial(exercicio))
    setResultado(null)
    setErrosNoExercicio(0)
    setDicaPedida(false)
    setConfirmandoDica(false)
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
      // Conta o erro, zera o streak e perde energia a cada ERROS_PARA_PERDER_VIDA erros.
      const novosErros = errosNoExercicio + 1
      setErrosNoExercicio(novosErros)
      setStreak(0)
      if (novosErros % ERROS_PARA_PERDER_VIDA === 0) setVidas((v) => v - 1)
    }
  }

  // Dica sob demanda: pergunta ao usuario e, se ele aceitar, troca 1 de energia
  // pela dica do exercicio. So pode ser pedida uma vez por exercicio.
  // Passo 1: pedir a dica apenas abre a confirmacao na pagina.
  function aoPedirDica() {
    if (dicaPedida) return
    setConfirmandoDica(true)
  }

  // Passo 2: o usuario confirma -> troca 1 de energia pela dica.
  function aoConfirmarDica() {
    setVidas((v) => v - 1)
    setDicaPedida(true)
    setConfirmandoDica(false)
  }

  function aoCancelarDica() {
    setConfirmandoDica(false)
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
    setDicaPedida(false)
    setConfirmandoDica(false)
    setVidas(VIDAS_INICIAIS)
    setStreak(0)
    setXpTotal(0)
    setFinalizado(false)
  }

  // Escolha da tela (a interrupcao por falta de energia vem primeiro).
  if (vidas <= 0) {
    return <TelaLicaoInterrompida xpTotal={xpTotal} aoRecomecar={aoRecomecar} aoVoltar={aoVoltar} />
  }
  if (finalizado) {
    return (
      <TelaConclusao xpTotal={xpTotal} vidas={vidas} aoRecomecar={aoRecomecar} aoVoltar={aoVoltar} />
    )
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
      dicaPedida={dicaPedida}
      confirmandoDica={confirmandoDica}
      aoPedirDica={aoPedirDica}
      aoConfirmarDica={aoConfirmarDica}
      aoCancelarDica={aoCancelarDica}
      aoVerificar={aoVerificar}
      aoTentarDeNovo={aoTentarDeNovo}
      aoAvancar={aoAvancar}
      aoPular={aoAvancar}
      aoVoltar={aoVoltar}
    />
  )
}
