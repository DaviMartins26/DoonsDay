// ============================================================================
// quadrinhos/trilha1-final.js - Fechamento (ciclo dramatico) da Trilha 1
// ----------------------------------------------------------------------------
// Mesmo formato de abertura.js. Toca ao CONCLUIR a Trilha 1 (depois do ultimo
// exercicio), antes da tela de conclusao. Primeiro fechamento da lore.
//
// Beats (ver LORE.md secao 6 - Fechamento da trilha 1):
//   1. Condecoracao: Lari celebra a pontuacao perfeita (1160, teto honesto).
//   2. O Rival (verde) irrompe dizendo ter 1500.
//   3. Placar impossivel: 1500 > MAX 1160 (prova da trapaca).
//   4. O Chefe premia o Rival ("Maior e Maior").
//   5. O Rival debocha.
//   6. Lari conforta e vira motivacional (vamos superar o trapaceiro).
//
// NUMEROS: 1160 = teto honesto de XP da trilha 1 (8 acertos sem erro, streak
// 1..8). O Rival aparece com 1500 (acima do maximo). Se config.js mudar,
// recalcular (ver LORE.md).
//
// Artes (Gemini) em lore/Trilha1/Fim*.jpeg, servidas em public/quadrinhos/trilha1/.
// Os nomes dos arquivos NAO seguem a ordem da historia (mapeados por conteudo).
// Fim7 e quase igual a Fim5 (reserva, nao usado aqui).
// ============================================================================

export default {
  id: 'trilha1-final',
  titulo: 'Trilha 1 - Desfecho',
  quadros: [
    {
      id: 'tf1',
      imagem: '/quadrinhos/trilha1/Fim2.jpeg',
      descricao: 'Jogador (azul) com a medalha de ouro; Lari (ambar) aplaude; confetes.',
      baloes: [
        {
          quem: 'lari', x: 11, y: 6, w: 25,
          texto: {
            pt: 'Voce gabaritou! 1160 pontos: a pontuacao perfeita. Um verdadeiro prodigio!',
            en: 'You aced it! 1160 points: a perfect score. A true prodigy!',
          },
        },
      ],
    },
    {
      id: 'tf2',
      imagem: '/quadrinhos/trilha1/Fim3.jpeg',
      descricao: 'O Rival (verde, bracos cruzados, deboche) irrompe; jogador surpreso.',
      baloes: [
        {
          quem: 'rival', x: 73, y: 7, w: 24,
          texto: {
            pt: 'Perfeita? Que fofo. Eu fiz 1500.',
            en: 'Perfect? How cute. I scored 1500.',
          },
        },
      ],
    },
    {
      id: 'tf3',
      imagem: '/quadrinhos/trilha1/Fim4.jpeg',
      descricao: 'Placar holografico: 1500 (verde) e, menor, MAX 1160 (azul). Jogador aponta, incredulo.',
      baloes: [
        {
          quem: 'nos', x: 74, y: 6, w: 22,
          texto: {
            pt: '1500? Impossivel. O maximo da trilha e 1160!',
            en: '1500? Impossible. The track maxes out at 1160!',
          },
        },
      ],
    },
    {
      id: 'tf4',
      imagem: '/quadrinhos/trilha1/Fim5.jpeg',
      descricao: 'O Chefe (sombra, visor e mao vermelhos) entrega a medalha ao Rival (verde). Jogador abatido.',
      baloes: [
        {
          quem: 'chef', x: 37, y: 6, w: 20,
          texto: {
            pt: '1500 e maior que 1160. Maior e Maior.',
            en: '1500 is greater than 1160. Bigger is Bigger.',
          },
        },
        {
          quem: 'rival', x: 74, y: 7, w: 20,
          texto: {
            pt: 'A condecoracao e minha.',
            en: 'The honor is mine.',
          },
        },
      ],
    },
    {
      id: 'tf5',
      imagem: '/quadrinhos/trilha1/Fim6.jpeg',
      descricao: 'O Rival (verde) exibe a medalha e pisca zombando; jogador indignado.',
      baloes: [
        {
          quem: 'rival', x: 19, y: 6, w: 26,
          texto: {
            pt: 'Numeros sao numeros. Boa sorte na proxima, prodigio.',
            en: 'Numbers are numbers. Good luck next time, prodigy.',
          },
        },
      ],
    },
    {
      id: 'tf6',
      imagem: '/quadrinhos/trilha1/Fim1.jpeg',
      descricao: 'Corredor; jogador (azul) cabisbaixo; Lari (ambar) com a mao no ombro, encorajando.',
      baloes: [
        {
          quem: 'lari', x: 11, y: 9, w: 26,
          texto: {
            pt: 'Nao foi justo, eu sei. Mas voce fez o maximo possivel, de verdade. Ainda temos muito a aprender - e vamos superar aquele trapaceiro. Juntos.',
            en: "It wasn't fair, I know. But you truly did your best. We still have a lot to learn - and we'll outdo that cheater. Together.",
          },
        },
      ],
    },
  ],
}
