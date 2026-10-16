// ============================================================================
// config.js - Parametros de jogo do MVP (DevForge)
// ----------------------------------------------------------------------------
// Este arquivo concentra TODOS os numeros que definem a dificuldade e a
// pontuacao. Para calibrar o jogo, basta mexer aqui: nenhuma regra fica
// "escondida" no meio da logica. Todos sao importados em src/App.jsx.
//
// Sao constantes exportadas (export const). Outro arquivo as le assim:
//   import { VIDAS_INICIAIS } from './config.js'
// ============================================================================

// Quantidade de vidas com que o usuario comeca a trilha.
// As vidas NAO reiniciam entre os exercicios; so o botao "Recomecar" zera.
export const VIDAS_INICIAIS = 3

// A cada quantos erros no MESMO exercicio o usuario perde 1 vida.
// Com o valor 2, a vida cai no 2o erro (e depois no 4o, 6o...).
export const ERROS_PARA_PERDER_VIDA = 2

// XP (pontos de experiencia) ganho ao acertar um exercicio sem errar nenhuma vez.
export const XP_BASE = 100

// Quanto de XP e descontado por cada erro cometido naquele exercicio.
export const XP_PENALIDADE_ERRO = 25

// Piso de XP: mesmo errando muito, acertar o exercicio garante pelo menos isto.
export const XP_MINIMO = 10

// Bonus de streak: XP extra por nivel da sequencia de acertos, somado ao acertar.
// Ex.: com o valor 10, acertar com streak 3 da +30 de bonus.
// E um bonus ADITIVO (soma ao XP; nao multiplica), para premiar a constancia
// sem que a pontuacao exploda.
export const XP_BONUS_POR_STREAK = 10

// ----------------------------------------------------------------------------
// Dicas: feedback progressivo ao errar o MESMO exercicio.
// A ideia e NAO entregar a resposta de cara. Conforme o usuario erra, o retorno
// fica mais generoso, em tres niveis (contando os erros no exercicio atual):
//   1) menos erros que ERROS_PARA_DICA    -> so avisa que errou (sem ajuda);
//   2) a partir de ERROS_PARA_DICA        -> mostra uma dica simples;
//   3) a partir de ERROS_PARA_RESPOSTA    -> mostra a explicacao completa.
// Com os valores abaixo: erros 1-3 so "errado", 4o erro dica, 5o+ a resposta.
// (Esquema temporario de MVP; a regra final do TCC sera definida depois.)
export const ERROS_PARA_DICA = 4
export const ERROS_PARA_RESPOSTA = 5

// Mensagem mostrada nos primeiros erros, antes de liberar a dica.
export const MENSAGEM_ERRO_SIMPLES = 'Resposta errada. Tente de novo.'
