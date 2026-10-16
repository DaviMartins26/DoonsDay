// Exercicio (encontrar o erro): a linha que usa - em vez de +.
export default {
  id: 'ex4',
  tipo: 'acharErro',
  titulo: 'Encontrar o erro',
  enunciado: 'A funcao deveria somar a e b, mas tem um erro. Qual linha esta errada?',
  linhas: ['function soma(a, b) {', '  return a - b', '}'],
  linhaErrada: 1, // indice da linha com o erro (o "return a - b")
  dica: 'Compare a operacao usada com o que a funcao deveria fazer: somar.',
  feedbackCerto: 'Isso. A linha 2 usa - em vez de +; para somar deveria ser return a + b.',
  feedbackErrado: 'Olhe a linha 2: ela subtrai (-) quando deveria somar (+).',
}
