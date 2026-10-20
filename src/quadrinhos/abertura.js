// ============================================================================
// quadrinhos/abertura.js - Roteiro em DADOS do quadrinho de abertura
// ----------------------------------------------------------------------------
// Um ARCO de historia = um arquivo (mesmo padrao das trilhas: so dados). O motor
// de quadrinho (Quadrinho.jsx) le este objeto e desenha quadro a quadro.
//
// Cada QUADRO tem:
//   - id        : identificador curto
//   - imagem    : caminho servido pelo Vite (em /public). null = ainda sem arte
//                 (o componente mostra um placeholder com a "descricao").
//   - descricao : o que a arte deve mostrar (vira prompt do Gemini / placeholder)
//   - baloes    : lista de baloes de fala. O TEXTO fica aqui, FORA da imagem,
//                 para a i18n (pt/en) ser so troca de string - sem reimagem.
//       - quem  : 'lari' | 'nos' | 'rival' | 'chef' (quem fala)
//       - x,y,w : posicao e largura do balao em % da imagem (0-100)
//       - texto : { pt, en } - uma string por idioma
//
// Alinhado ao LORE.md (secao 6 - Roteiro) e a lore dos personagens/cores.
// ============================================================================

export default {
  id: 'abertura',
  titulo: 'Abertura - Bem-vinda a DevForge',
  quadros: [
    {
      id: 'q1',
      imagem: null,
      descricao: 'Plano aberto do laboratorio DevForge; Lari (robo ambar, lampada) no balcao de boas-vindas.',
      baloes: [
        {
          quem: 'lari', x: 8, y: 8, w: 42,
          texto: {
            pt: 'Bem-vinda a DevForge! Voce e a nossa mais nova IA em avaliacao.',
            en: "Welcome to DevForge! You're our newest AI under evaluation.",
          },
        },
      ],
    },
    {
      id: 'q2',
      imagem: null,
      descricao: 'Lari aponta para o robo-jogador (azul), recem-ligado, ao lado de um terminal.',
      baloes: [
        {
          quem: 'lari', x: 8, y: 8, w: 46,
          texto: {
            pt: 'O trabalho e simples: provar que voce raciocina. Cada bateria de testes e uma trilha de exercicios.',
            en: 'The job is simple: prove you can reason. Each test battery is a track of exercises.',
          },
        },
      ],
    },
    {
      id: 'q3',
      imagem: null,
      descricao: 'Lari mostra o medidor de energia do jogador (10 unidades).',
      baloes: [
        {
          quem: 'lari', x: 8, y: 8, w: 46,
          texto: {
            pt: 'Voce comeca com energia. Errar demais esgota ela - entao calma e capricho valem mais que pressa.',
            en: 'You start with energy. Too many mistakes drain it - so care beats rushing.',
          },
        },
      ],
    },
    {
      id: 'q4',
      imagem: null,
      descricao: 'Lari pisca, com um icone de lampada acesa (a dica).',
      baloes: [
        {
          quem: 'lari', x: 8, y: 8, w: 46,
          texto: {
            pt: 'Travou? Me chama. Eu te dou uma luz... mas processar a dica gasta uma faisca de energia. Combinado?',
            en: "Stuck? Call me. I'll light the way... but processing a hint costs a spark of energy. Deal?",
          },
        },
      ],
    },
    {
      id: 'q5',
      // Quadro REAL (concept art do Gemini): o Chefe surgindo na sombra, so a
      // mao vermelha e o visor; balao branco ja desenhado no canto superior.
      imagem: '/quadrinhos/chef-abertura.jpeg',
      descricao: 'Sombra do Chefe (vermelho); so uma mao enorme no console e o visor brilhando. Jogador (azul) olhando para cima.',
      baloes: [
        {
          quem: 'chef', x: 10, y: 9, w: 34,
          texto: {
            pt: 'Resultados. E so o que importa aqui.',
            en: "Results. That's all that matters here.",
          },
        },
      ],
    },
    {
      id: 'q6',
      imagem: null,
      descricao: 'Lari baixa a voz, tranquilizando, de volta ao jogador.',
      baloes: [
        {
          quem: 'lari', x: 8, y: 8, w: 46,
          texto: {
            pt: 'Nao liga pra ele. Faz o teu melhor, de verdade. Bora?',
            en: "Don't mind him. Just do your honest best. Shall we?",
          },
        },
      ],
    },
  ],
}
