// Exercicio (casos contrastantes): qual versao soma corretamente.
export default {
  id: 'ex6',
  tipo: 'contrastantes',
  titulo: 'Casos contrastantes',
  enunciado: 'Qual versao soma corretamente dois numeros?',
  versoes: [
    { rotulo: 'Versao A', codigo: 'function soma(a, b) {\n  return a + b\n}' },
    { rotulo: 'Versao B', codigo: 'function soma(a, b) {\n  return a * b\n}' },
    { rotulo: 'Versao C', codigo: 'function soma(a, b) {\n  return a - b\n}' },
  ],
  correta: 0, // indice da Versao A (a unica que usa +)
  dica: 'Procure a versao cujo operador e o de soma: o sinal de +.',
  feedbackCerto: 'Isso. A Versao A usa + (soma). A B multiplica e a C subtrai.',
  feedbackErrado: 'A correta e a Versao A: usa + para somar. A B multiplica (*) e a C subtrai (-).',
}
