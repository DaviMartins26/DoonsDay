// Exercicio (prever a saida): o que o laco imprime, em 3 caixas.
export default {
  id: 'ex3',
  tipo: 'saidaMultipla',
  titulo: 'Prever a saida',
  enunciado: 'O que este laco imprime no console? Preencha cada saida na ordem.',
  codigo: 'for (let i = 1; i <= 3; i++) {\n  console.log(i)\n}',
  rotulos: ['Saida 1', 'Saida 2', 'Saida 3'], // rotulo de cada caixa
  respostas: ['1', '2', '3'], // valor esperado em cada caixa (todas obrigatorias)
  dica: 'Siga o laco: i comeca em 1 e aumenta de 1 em 1 ate chegar a 3.',
  feedbackCerto: 'Isso. O laco vai de 1 a 3, imprimindo 1, depois 2 e por fim 3.',
  feedbackErrado: 'O laco comeca em 1 e vai ate 3: a 1a saida e 1, a 2a e 2 e a 3a e 3.',
}
