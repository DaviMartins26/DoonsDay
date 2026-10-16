// ============================================================================
// registro.jsx - Registro central dos tipos de exercicio
// ----------------------------------------------------------------------------
// Junta todos os tipos num mapa (tipo -> modulo). Cada modulo exporta
// { Campo, verificar, respostaInicial, temResposta }.
//
// COMO ADICIONAR UM TIPO NOVO:
//   1) crie um arquivo em src/exercicios/ (copie multipla.jsx como modelo);
//   2) importe-o aqui e adicione uma linha no mapa REGISTRO.
// Nada mais precisa mudar: o motor (jogo/Jogo.jsx) usa estas funcoes para
// qualquer tipo, sem saber quais existem.
// ============================================================================

import multipla from './multipla.jsx'
import lacuna from './lacuna.jsx'
import saidaMultipla from './saidaMultipla.jsx'
import acharErro from './acharErro.jsx'
import associacao from './associacao.jsx'
import contrastantes from './contrastantes.jsx'
import parsons from './parsons.jsx'

const REGISTRO = {
  multipla,
  lacuna,
  saidaMultipla,
  acharErro,
  associacao,
  contrastantes,
  parsons,
}

export default REGISTRO

// Funcoes que o motor usa, delegando ao modulo do tipo do exercicio.
// Se o tipo nao existir no registro, devolvem um valor seguro (nao quebram).
export function verificar(exercicio, resposta) {
  const modulo = REGISTRO[exercicio.tipo]
  return modulo ? modulo.verificar(exercicio, resposta) : false
}

export function respostaInicial(exercicio) {
  const modulo = REGISTRO[exercicio.tipo]
  return modulo ? modulo.respostaInicial(exercicio) : null
}

export function temResposta(exercicio, resposta) {
  const modulo = REGISTRO[exercicio.tipo]
  return modulo ? modulo.temResposta(exercicio, resposta) : false
}

// Desenha o campo de resposta do exercicio, escolhendo o componente pelo tipo.
// Repassa TODAS as props recebidas ao componente do tipo (exercicio, resposta,
// setResposta, travado e tambem focarVerificar, usado pelo atalho de teclado),
// para que props novas cheguem aos tipos sem precisar mexer aqui.
export function CampoResposta(props) {
  const modulo = REGISTRO[props.exercicio.tipo]
  if (!modulo) {
    return <p className="erro">Tipo de exercicio desconhecido: {props.exercicio.tipo}</p>
  }
  const Campo = modulo.Campo
  return <Campo {...props} />
}
