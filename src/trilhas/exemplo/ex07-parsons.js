// Exercicio (Parsons): reordenar as linhas da funcao dobro.
export default {
  id: 'ex7',
  tipo: 'parsons',
  titulo: 'Parsons (reordenar)',
  enunciado: 'Reordene as linhas para formar uma funcao que retorna o dobro de x.',
  linhas: ['  return x * 2', 'function dobro(x) {', '}'], // ordem embaralhada inicial
  correta: ['function dobro(x) {', '  return x * 2', '}'], // ordem correta
  dica: 'Uma funcao comeca pela linha que a declara e termina com a chave }.',
  feedbackCerto: 'Isso. Primeiro a declaracao, depois o return e por fim o fecha-chaves.',
  feedbackErrado: 'A ordem certa e: declarar a funcao, depois o return e por ultimo }.',
}
