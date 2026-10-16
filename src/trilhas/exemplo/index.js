// ============================================================================
// Trilha "exemplo" - manifesto
// ----------------------------------------------------------------------------
// Define a trilha e, principalmente, a ORDEM dos exercicios.
//
// PARA INSERIR UM EXERCICIO NO MEIO:
//   1) crie o arquivo do exercicio nesta pasta (copie um existente);
//   2) importe-o aqui e coloque-o na POSICAO desejada do array "exercicios".
// A ordem na lista e a ordem no jogo. Nao ha ponteiros para acertar: basta
// mexer na lista. O progresso ("3 de 7") sai do tamanho e da posicao do array.
// ============================================================================

import ex01 from './ex01-dobro.js'
import ex02 from './ex02-return.js'
import ex03 from './ex03-saida.js'
import ex04 from './ex04-erro.js'
import ex05 from './ex05-associacao.js'
import ex06 from './ex06-contrastantes.js'
import ex07 from './ex07-parsons.js'

export default {
  id: 'trilha-exemplo',
  titulo: 'Trilha de Exemplo - Fundamentos',
  descricao: 'Um exercicio de cada tipo, usando operacoes simples com numeros.',
  exercicios: [ex01, ex02, ex03, ex04, ex05, ex06, ex07],
}
