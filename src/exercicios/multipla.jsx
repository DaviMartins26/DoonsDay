// ============================================================================
// Tipo de exercicio: MULTIPLA ESCOLHA
// ----------------------------------------------------------------------------
// Cada tipo de exercicio mora num arquivo so e exporta TUDO dele num objeto:
//   - Campo          : o componente React que desenha o campo de resposta;
//   - verificar      : confere se a resposta esta certa;
//   - respostaInicial: o valor "vazio" inicial da resposta;
//   - temResposta    : se ja da para habilitar o botao "Verificar".
//
// Dados esperados no exercicio: opcoes (array) e correta (indice da certa).
// A resposta do usuario e o INDICE da opcao escolhida (numero).
//
// Cores: SOMENTE quando o usuario ACERTA (acertou === true), a opcao correta
// fica verde e as demais vermelhas. Ao ERRAR, nada e colorido - assim a
// resposta certa nao e entregue de graca.
// ============================================================================

import { tabParaVerificar } from './util.js'

// Cor de cada opcao: so pinta apos ACERTAR (verde na correta, vermelho nas demais).
export function corDaOpcao(acertou, ehCorreta) {
  if (!acertou) return undefined
  return ehCorreta ? 'green' : 'crimson'
}

// focarVerificar vem do motor (via registro) e serve para o atalho de teclado:
// com uma "bolinha" em foco, Tab pula direto para o botao Verificar.
function Campo({ exercicio, resposta, setResposta, travado, acertou, focarVerificar }) {
  return (
    <fieldset disabled={travado}>
      {exercicio.opcoes.map((opcao, i) => {
        const ehCorreta = i === exercicio.correta
        return (
          <label
            key={i}
            style={{
              display: 'block',
              color: corDaOpcao(acertou, ehCorreta),
              fontWeight: acertou && ehCorreta ? 'bold' : 'normal',
            }}
          >
            <input
              type="radio"
              name={exercicio.id} // mesmo "name" agrupa os radios (so um marcado)
              checked={resposta === i}
              onChange={() => setResposta(i)}
              onKeyDown={tabParaVerificar(focarVerificar)}
            />{' '}
            {opcao}
            {acertou && ehCorreta ? ' (correta)' : ''}
          </label>
        )
      })}
    </fieldset>
  )
}

export default {
  Campo,
  verificar: (exercicio, resposta) => resposta === exercicio.correta,
  respostaInicial: () => null, // nada marcado ainda
  temResposta: (exercicio, resposta) => resposta !== null,
}
