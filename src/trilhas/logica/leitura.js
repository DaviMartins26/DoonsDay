// ============================================================================
// Trilha: Leitura de Codigo (Bloco Logica de Programacao) - TRILHA 1
// ----------------------------------------------------------------------------
// Dificuldade-base: TRANQUILA (primeira trilha). Os dois ultimos exercicios
// sobem um pouco, mas sem exagero.
// ============================================================================
export default {
  id: 'leitura',
  titulo: 'Leitura de Codigo',
  descricao: 'Prever a saida de um programa e montar programas simples, passo a passo.',
  // Mini-aula (cápsula) que a Lari da no comeco da trilha: explica um POUCO, de
  // forma tangencial (liga o conhecido -> introduz o novo -> micro-exemplo). Uma
  // frase por bolha. Opcional: trilha sem "aula" simplesmente nao mostra nada.
  aula: [
    'Antes de escrever codigo, o segredo e saber LER: prever o que o programa faz.',
    'Em Python o programa roda de cima pra baixo, uma linha por vez, e o print() mostra um valor na tela.',
    'Entao a gente so acompanha o codigo com calma e diz o que aparece. Bora!',
  ],
  exercicios: [
    {
      id: 'lei1',
      tipo: 'saidaMultipla',
      titulo: 'Prever a saida',
      nota: 'Comecando leve: cada print mostra o resultado de uma conta. Aqui + soma e * multiplica.',
      enunciado: 'O que este programa imprime? Preencha cada saida na ordem.',
      codigo: 'x = 5\ny = 3\nprint(x + y)\nprint(x * y)',
      rotulos: ['Saida 1', 'Saida 2'],
      respostas: ['8', '15'],
      dica: 'Resolva cada print: primeiro x + y, depois x * y.',
      feedbackCerto: 'Isso. 5 + 3 = 8 e 5 * 3 = 15.',
      feedbackErrado: 'A 1a saida e 5 + 3 = 8; a 2a e 5 * 3 = 15.',
      gabarito: [
        'Saida 1 e Soma, entao: 5 + 3 = 8',
        'Saida 2 e Multiplicacao, entao: 5 * 3 = 15',
      ],
    },
    {
      id: 'lei2',
      tipo: 'multipla',
      titulo: 'O que aparece na tela',
      nota: 'Repara num detalhe: a virgula dentro do print separa os pedacos com um espaco, e uma variavel mostra o VALOR guardado, nao o nome dela.',
      enunciado: 'O que este programa imprime?',
      codigo: 'nome = "Ana"\nprint("Ola,", nome)',
      opcoes: ['Ola, nome', 'Ola, Ana', 'Ola Ana (sem virgula)', 'nome'],
      correta: 1,
      dica: 'print mostra o texto e, no lugar de nome, o valor guardado na variavel.',
      feedbackCerto: 'Isso. A virgula no print poe um espaco: "Ola, Ana".',
      feedbackErrado: 'nome vale "Ana"; print("Ola,", nome) mostra "Ola, Ana".',
    },
    {
      id: 'lei3',
      tipo: 'parsons',
      titulo: 'Montar um programa linear',
      nota: 'Como o programa roda de cima pra baixo, uma variavel so pode ser usada DEPOIS de receber um valor.',
      enunciado: 'Reordene as linhas para somar a e b e imprimir o total.',
      linhas: ['print(total)', 'total = a + b', 'a = 2', 'b = 3'],
      // a e b sao independentes e podem vir em qualquer ordem, mas ambos ANTES
      // de "total = a + b"; o print fica por ultimo.
      corretas: [
        ['a = 2', 'b = 3', 'total = a + b', 'print(total)'],
        ['b = 3', 'a = 2', 'total = a + b', 'print(total)'],
      ],
      dica: 'Uma variavel so pode ser usada depois de receber um valor.',
      feedbackCerto: 'Isso. a e b primeiro, depois a soma e por fim o print.',
      feedbackErrado: 'Defina a e b antes de total = a + b; o print fica por ultimo.',
    },
    {
      id: 'lei4',
      tipo: 'saidaMultipla',
      titulo: 'Varias operacoes',
      nota: 'Reforcando as contas: - pode dar negativo, / sempre vem com ponto (float) e % e o resto da divisao.',
      enunciado: 'O que cada linha imprime? (decimais com ponto, ex.: 1.2, nao 1,2)',
      codigo: 'a = 10\nb = 4\nprint(b - a)\nprint(a / b)\nprint(a % b)',
      rotulos: ['Saida 1', 'Saida 2', 'Saida 3'],
      respostas: ['-6', '2.5', '2'],
      dica: 'b - a pode dar negativo; / devolve numero com ponto; % e o resto.',
      feedbackCerto: 'Isso. 4 - 10 = -6, 10 / 4 = 2.5, 10 % 4 = 2.',
      feedbackErrado: '4 - 10 = -6; 10 / 4 = 2.5 (com ponto); 10 % 4 = 2 (resto).',
      // Gabarito "rico": uma linha por saida, nomeando a operacao. A Lari manda
      // isso como UMA mensagem so (no lugar da frase + gabarito generico).
      gabarito: [
        'Saida 1 e Subtracao, entao: 4 - 10 = -6',
        'Saida 2 e Divisao, entao: 10 / 4 = 2.5',
        'Saida 3 e o RESTO da divisao, entao: 10 % 4 = 2',
      ],
    },
    {
      id: 'lei5',
      tipo: 'multipla',
      titulo: 'Quem recebe o valor',
      nota: 'Uma variavel guarda sempre o ULTIMO valor que recebeu. Vale acompanhar linha por linha o que cada uma vale.',
      enunciado: 'O que este programa imprime?',
      codigo: 'a = 1\nb = a + 1\na = b + 1\nprint(a, b)',
      opcoes: ['3 2', '2 3', '1 2', '3 3'],
      correta: 0,
      dica: 'Execute linha a linha, guardando o valor atual de a e de b.',
      feedbackCerto: 'Isso. a=1, b=2, depois a=3. Entao print(a, b) mostra "3 2".',
      feedbackErrado: 'a=1; b=a+1=2; a=b+1=3. No fim a=3 e b=2, entao "3 2".',
    },
    {
      id: 'lei6',
      tipo: 'parsons',
      titulo: 'Ler e calcular a media',
      nota: 'int(input()) le um numero digitado pela pessoa. Pra tirar a media voce precisa ter os dois numeros ANTES de calcular.',
      enunciado: 'Reordene para ler dois numeros do teclado e imprimir a media deles.',
      linhas: ['media = (a + b) / 2', 'b = int(input())', 'print(media)', 'a = int(input())'],
      corretas: [
        ['a = int(input())', 'b = int(input())', 'media = (a + b) / 2', 'print(media)'],
        ['b = int(input())', 'a = int(input())', 'media = (a + b) / 2', 'print(media)'],
      ],
      dica: 'Leia os dois valores antes de calcular; so no fim imprima a media.',
      feedbackCerto: 'Isso. Le a e b, calcula (a + b) / 2 e imprime.',
      feedbackErrado: 'As duas leituras vem antes; depois media = (a + b) / 2 e por fim print.',
    },
    // ---- os dois ultimos sobem um pouco a dificuldade ----
    {
      id: 'lei7',
      tipo: 'saidaMultipla',
      titulo: 'Atualizar a mesma variavel',
      nota: 'De novo o passo a passo: em x = x + 3 o Python resolve a conta da direita e guarda o resultado de volta no proprio x.',
      enunciado: 'O que o programa imprime?',
      codigo: 'x = 2\nx = x + 3\nx = x * 2\nprint(x)',
      rotulos: ['Saida'],
      respostas: ['10'],
      dica: 'x muda a cada linha: comece em 2 e aplique uma operacao por vez.',
      feedbackCerto: 'Isso. 2 -> 2+3=5 -> 5*2=10.',
      feedbackErrado: 'x vale 2, depois 5 (2+3) e por fim 10 (5*2).',
    },
    {
      // Minigame de FIOS (tipo associacao): ligar cada conta ao resultado.
      // Fecha a trilha de leitura prevendo a saida de contas simples, agora com
      // operadores variados (+, *, -, %).
      id: 'lei8',
      tipo: 'associacao',
      titulo: 'Ligue a conta ao resultado',
      nota: 'Fechando a trilha: resolva cada conta de cabeca e ligue no resultado. Olho no % (resto), que acabou de entrar.',
      enunciado: 'Arraste um fio de cada conta ate o seu resultado.',
      esquerda: ['4 + 3', '2 * 5', '9 - 3', '8 % 3'],
      opcoes: ['2', '6', '7', '10', '12'],
      correto: ['7', '10', '6', '2'],
      dica: 'Resolva cada conta: + soma, * multiplica, - subtrai, % e o resto da divisao.',
      feedbackCerto: 'Isso. 4 + 3 = 7, 2 * 5 = 10, 9 - 3 = 6 e 8 % 3 = 2.',
      feedbackErrado: '4 + 3 = 7, 2 * 5 = 10, 9 - 3 = 6, 8 % 3 = 2 (resto da divisao).',
    },
  ],
}
