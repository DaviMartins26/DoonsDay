// Exercicio (associacao): ligar cada expressao Python ao seu resultado.
export default {
  id: 'ex5',
  tipo: 'associacao',
  titulo: 'Associacao',
  enunciado: 'Associe cada expressao Python ao seu resultado.',
  esquerda: ['len("casa")', '2 ** 3', '10 % 3'], // pequenas logicas em Python
  // "opcoes" = lista de cada caixa: os 3 resultados certos (4, 8, 1) mais 2
  // distratores (2, 5) para reduzir o acerto por eliminacao.
  opcoes: ['1', '2', '4', '5', '8'],
  correto: ['4', '8', '1'], // resultado certo de cada expressao, na mesma ordem
  dica: 'len() conta os caracteres; ** e potencia; % e o resto da divisao.',
  feedbackCerto: 'Isso. len("casa") = 4, 2 ** 3 = 8 e 10 % 3 = 1.',
  feedbackErrado: 'Revise: len("casa") = 4, 2 ** 3 = 8 e 10 % 3 = 1.',
}
