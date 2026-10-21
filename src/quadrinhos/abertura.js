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
//   - descricao : o que a arte mostra (vira placeholder quando nao ha imagem)
//   - baloes    : lista de baloes de fala. O TEXTO fica aqui, FORA da imagem,
//                 para a i18n (pt/en) ser so troca de string - sem reimagem.
//       - quem  : 'lari' | 'nos' | 'rival' | 'chef' (quem fala)
//       - x,y,w : posicao e largura do balao em % da imagem (0-100), medidos
//                 para cair DENTRO do balao branco ja desenhado na arte.
//       - texto : { pt, en } - uma string por idioma
//
// As artes (Gemini) ficam em lore/Intro/ (fonte) e sao copiadas para
// public/quadrinhos/intro/ (servidas). Alinhado ao LORE.md (secao 6 - Roteiro).
// ============================================================================

export default {
  id: 'abertura',
  titulo: 'Abertura - Bem-vinda a DevForge',
  quadros: [
    {
      id: 'q1',
      imagem: '/quadrinhos/intro/Quadro1.jpeg',
      descricao: 'Lari no console da DevForge, apontando.',
      baloes: [
        {
          quem: 'lari', x: 27, y: 11, w: 30,
          texto: {
            pt: 'Bem-vinda a DevForge! Voce e a nossa mais nova IA em avaliacao.',
            en: "Welcome to DevForge! You're our newest AI under evaluation.",
          },
        },
      ],
    },
    {
      id: 'q2',
      imagem: '/quadrinhos/intro/Quadro2.jpeg',
      descricao: 'Lari (direita) aponta para o jogador (azul) num pedestal holografico.',
      baloes: [
        {
          quem: 'lari', x: 72, y: 8, w: 25,
          texto: {
            pt: 'O trabalho e simples: provar que voce raciocina. Cada bateria de testes e uma trilha.',
            en: 'The job is simple: prove you can reason. Each test battery is a track.',
          },
        },
      ],
    },
    {
      id: 'q3',
      imagem: '/quadrinhos/intro/Quadro3.jpeg',
      descricao: 'Lari aponta para um painel de System Health / energia (medidor 98.5%).',
      baloes: [
        {
          quem: 'lari', x: 11, y: 11, w: 27,
          texto: {
            pt: 'Voce comeca com energia. Errar demais esgota ela - calma e capricho valem mais que pressa.',
            en: 'You start with energy. Too many mistakes drain it - care beats rushing.',
          },
        },
      ],
    },
    {
      id: 'q4',
      imagem: '/quadrinhos/intro/Quadro4.jpeg',
      descricao: 'Lari pisca, lampada acesa, dedo em riste (a dica).',
      baloes: [
        {
          quem: 'lari', x: 13, y: 11, w: 29,
          texto: {
            pt: 'Travou? Me chama. Eu te dou uma luz... mas a dica gasta uma faisca de energia. Combinado?',
            en: "Stuck? Call me. I'll light the way... but a hint costs a spark of energy. Deal?",
          },
        },
      ],
    },
    {
      id: 'q5',
      imagem: '/quadrinhos/intro/Quadro5.jpeg',
      descricao: 'Sombra do Chefe (vermelho); so a mao enorme no console e o visor. Jogador olhando para cima.',
      baloes: [
        {
          quem: 'chef', x: 10, y: 10, w: 34,
          texto: {
            pt: 'Resultados. E so o que importa aqui.',
            en: "Results. That's all that matters here.",
          },
        },
      ],
    },
    {
      id: 'q6',
      imagem: '/quadrinhos/intro/Quadro6.jpeg',
      descricao: 'Lari (direita) acena, tranquilizando; jogador (azul) ao lado.',
      baloes: [
        {
          quem: 'lari', x: 9, y: 9, w: 42,
          texto: {
            pt: 'Nao liga pra ele. Faz o teu melhor, de verdade. Bora?',
            en: "Don't mind him. Just do your honest best. Shall we?",
          },
        },
      ],
    },
  ],
}
