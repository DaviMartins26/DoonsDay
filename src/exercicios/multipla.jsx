// ============================================================================
// Tipo de exercicio: MULTIPLA ESCOLHA
// ----------------------------------------------------------------------------
// Cada tipo de exercicio mora num arquivo so e exporta TUDO dele num objeto:
//   - Campo          : o componente React que desenha o campo de resposta;
//   - verificar      : confere se a resposta esta certa;
//   - respostaInicial: o valor "vazio" inicial da resposta;
//   - temResposta    : se ja da para habilitar o botao "Verificar".
// O registro (registro.jsx) junta todos os tipos. Para criar um tipo novo,
// copie este arquivo como modelo e registre-o la.
//
// Dados esperados no exercicio: opcoes (array) e correta (indice da certa).
// A resposta do usuario e o INDICE da opcao escolhida (numero).
// ============================================================================

import { tabParaVerificar } from './util.js'

// focarVerificar vem do motor (via registro) e serve para o atalho de teclado:
// com uma "bolinha" em foco, Tab pula direto para o botao Verificar.
function Campo({ exercicio, resposta, setResposta, travado, focarVerificar }) {
  return (
    <fieldset disabled={travado}>
      {exercicio.opcoes.map((opcao, i) => (
        <label key={i} style={{ display: 'block' }}>
          <input
            type="radio"
            name={exercicio.id} // mesmo "name" agrupa os radios (so um marcado)
            checked={resposta === i}
            onChange={() => setResposta(i)}
            onKeyDown={tabParaVerificar(focarVerificar)}
          />{' '}
          {opcao}
        </label>
      ))}
    </fieldset>
  )
}

export default {
  Campo,
  verificar: (exercicio, resposta) => resposta === exercicio.correta,
  respostaInicial: () => null, // nada marcado ainda
  temResposta: (exercicio, resposta) => resposta !== null,
}
