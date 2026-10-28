// ============================================================================
// trilhas/index.js - Bloco e catalogo de trilhas
// ----------------------------------------------------------------------------
// Estrutura: um BLOCO (tema macro) contem varias TRILHAS (temas de logica).
// A tela de catalogo (TelaCatalogo) lista as trilhas do bloco para o usuario
// escolher (primeiro passo do RF03). Para adicionar uma trilha, crie o arquivo
// em logica/ e inclua-o no array "trilhas" abaixo, na ordem desejada.
// ============================================================================
import leitura from './logica/leitura.js'
import tipos from './logica/tipos.js'
import aritmetica from './logica/aritmetica.js'
import booleanos from './logica/booleanos.js'
import condicoes from './logica/condicoes.js'
import repeticao from './logica/repeticao.js'
import listas from './logica/listas.js'
import funcoes from './logica/funcoes.js'
import boaspraticas from './logica/boaspraticas.js'

export const bloco = {
  id: 'logica',
  titulo: 'Bloco: Logica de Programacao',
  descricao:
    'Fundamentos de logica em Python, baseados na ementa de Raciocinio Algoritmico. Escolha uma trilha para comecar.',
}

export const trilhas = [
  leitura,
  tipos,
  aritmetica,
  booleanos,
  condicoes,
  repeticao,
  listas,
  funcoes,
  boaspraticas,
]
