// Exercicio (multipla escolha): o que a funcao dobro retorna.
export default {
  id: 'ex1',
  tipo: 'multipla',
  titulo: 'Multipla escolha',
  enunciado: 'O que a funcao retorna ao ser chamada com dobro(5)?',
  codigo: 'function dobro(x) {\n  return x * 2\n}',
  opcoes: ['7', '10', '25', '52'],
  correta: 1, // indice de '10'
  dica: 'Dobrar um numero e multiplica-lo por 2.',
  feedbackCerto: 'Isso. dobro(5) = 5 * 2 = 10.',
  feedbackErrado: 'Nao. A funcao multiplica x por 2, entao dobro(5) = 10.',
}
