// ============================================================================
// Teste de RENDER de todos os exercicios (Vitest + jsdom).
// ----------------------------------------------------------------------------
// Complementa exercicios.test.js (que valida o GABARITO). Aqui montamos o campo
// de resposta (CampoResposta -> Campo do tipo) de CADA exercicio de CADA trilha
// e exigimos que renderize sem erro - pega crashes de interface nos tipos,
// inclusive os minigames novos (Parsons arrastar, Associacao "fios") e qualquer
// dado malformado que quebraria a tela.
//
// Roda em jsdom (diretiva abaixo); o resto da suite continua em node.
// ============================================================================

// @vitest-environment jsdom

import { describe, it, expect, afterEach } from 'vitest'
import { render, cleanup } from '@testing-library/react'
import { CampoResposta, respostaInicial } from '../registro.jsx'
import { trilhas } from '../../trilhas/index.js'

afterEach(cleanup)

const todos = trilhas.flatMap((t) => t.exercicios.map((e) => ({ trilha: t.id, e })))

describe('render do campo de resposta de todos os exercicios', () => {
  for (const { trilha, e } of todos) {
    it(`${trilha} / ${e.id} (${e.tipo}) renderiza sem erro`, () => {
      const { container } = render(
        <CampoResposta
          exercicio={e}
          resposta={respostaInicial(e)}
          setResposta={() => {}}
          travado={false}
          acertou={false}
        />,
      )
      // Renderizou alguma coisa (nao e um tipo desconhecido / nao quebrou).
      expect(container.firstChild).toBeTruthy()
      expect(container.textContent).not.toContain('Tipo de exercicio desconhecido')
    })
  }
})
