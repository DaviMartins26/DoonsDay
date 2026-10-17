// ============================================================================
// Testes unitarios de TODOS os exercicios da trilha (Vitest).
// ----------------------------------------------------------------------------
// Para cada exercicio de cada trilha, valida que:
//   1) tem os campos obrigatorios (id, tipo, enunciado, dica, feedbacks);
//   2) os ids sao unicos;
//   3) a RESPOSTA CERTA (derivada dos dados) passa em verificar();
//   4) uma RESPOSTA ERRADA (derivada dos dados) falha em verificar();
//   5) a resposta certa habilita o botao (temResposta === true).
// Assim, qualquer exercicio com gabarito inconsistente quebra o teste.
//
// Rodar com: npm test
// ============================================================================

import { describe, it, expect } from 'vitest'
import { trilhas } from '../../trilhas/index.js'
import { verificar, respostaInicial, temResposta } from '../registro.jsx'

const TIPOS_CONHECIDOS = [
  'multipla',
  'lacuna',
  'saidaMultipla',
  'acharErro',
  'associacao',
  'contrastantes',
  'parsons',
]

// Lista achatada de { trilha, exercicio }.
const todos = trilhas.flatMap((t) => t.exercicios.map((e) => ({ trilha: t.id, e })))

// ---- helpers de gabarito --------------------------------------------------

function ordensParsons(e) {
  return Array.isArray(e.corretas) ? e.corretas : [e.correta]
}
function mesmaOrdem(a, b) {
  return a.join('\n') === b.join('\n')
}

function respostaCerta(e) {
  switch (e.tipo) {
    case 'multipla':
      return e.correta
    case 'acharErro':
      return e.linhaErrada
    case 'contrastantes':
      return e.correta
    case 'lacuna':
      return e.resposta
    case 'saidaMultipla':
      return e.respostas.slice()
    case 'associacao':
      return e.correto.slice()
    case 'parsons':
      return ordensParsons(e)[0].slice()
    default:
      return null
  }
}

function respostaErrada(e) {
  switch (e.tipo) {
    case 'multipla':
      return (e.correta + 1) % e.opcoes.length
    case 'acharErro':
      return (e.linhaErrada + 1) % e.linhas.length
    case 'contrastantes':
      return (e.correta + 1) % e.versoes.length
    case 'lacuna':
      return e.resposta + '_zzz'
    case 'saidaMultipla': {
      const r = e.respostas.slice()
      r[0] = String(r[0]) + '_x'
      return r
    }
    case 'associacao': {
      const r = e.correto.slice()
      // troca a 1a posicao por uma opcao diferente da correta
      const outra = e.opcoes.find((o) => o !== e.correto[0])
      r[0] = outra
      return r
    }
    case 'parsons': {
      const base = ordensParsons(e)[0]
      const aceitas = ordensParsons(e)
      const candidatos = []
      // mover a ultima linha para o inicio
      candidatos.push([base[base.length - 1], ...base.slice(0, base.length - 1)])
      // ordem reversa
      candidatos.push([...base].reverse())
      // trocar as duas primeiras
      if (base.length > 1) {
        const c = base.slice()
        ;[c[0], c[1]] = [c[1], c[0]]
        candidatos.push(c)
      }
      return candidatos.find((cand) => !aceitas.some((a) => mesmaOrdem(a, cand)))
    }
    default:
      return null
  }
}

// ---- testes gerais --------------------------------------------------------

describe('catalogo de trilhas', () => {
  it('tem pelo menos uma trilha com exercicios', () => {
    expect(trilhas.length).toBeGreaterThan(0)
    for (const t of trilhas) {
      expect(t.id, 'trilha sem id').toBeTruthy()
      expect(t.titulo, `trilha ${t.id} sem titulo`).toBeTruthy()
      expect(t.exercicios.length, `trilha ${t.id} sem exercicios`).toBeGreaterThan(0)
    }
  })

  it('ids de exercicio sao unicos em todo o bloco', () => {
    const ids = todos.map(({ e }) => e.id)
    const unicos = new Set(ids)
    expect(unicos.size, 'ha ids repetidos').toBe(ids.length)
  })
})

// ---- testes por exercicio -------------------------------------------------

describe('exercicios (campos + gabarito)', () => {
  for (const { trilha, e } of todos) {
    describe(`${trilha} / ${e.id} (${e.tipo})`, () => {
      it('tem os campos obrigatorios', () => {
        expect(TIPOS_CONHECIDOS, `tipo desconhecido: ${e.tipo}`).toContain(e.tipo)
        expect(e.id).toBeTruthy()
        expect(e.titulo).toBeTruthy()
        expect(e.enunciado).toBeTruthy()
        expect(e.dica, 'falta dica').toBeTruthy()
        expect(e.feedbackCerto, 'falta feedbackCerto').toBeTruthy()
        expect(e.feedbackErrado, 'falta feedbackErrado').toBeTruthy()
      })

      it('a resposta certa passa em verificar()', () => {
        expect(verificar(e, respostaCerta(e))).toBe(true)
      })

      it('uma resposta errada falha em verificar()', () => {
        const errada = respostaErrada(e)
        // se nao foi possivel gerar uma ordem errada (nao deve acontecer), ignora
        if (errada === undefined) return
        expect(verificar(e, errada)).toBe(false)
      })

      it('a resposta certa habilita o botao (temResposta)', () => {
        expect(temResposta(e, respostaCerta(e))).toBe(true)
      })

      it('respostaInicial nao quebra', () => {
        expect(() => respostaInicial(e)).not.toThrow()
      })
    })
  }
})
