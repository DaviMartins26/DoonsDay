// ============================================================================
// Trilha: Projeto Final (Bloco Logica de Programacao)
// ----------------------------------------------------------------------------
// Capstone: o aluno resolve um problema em Python, sobe no GitHub e a IA avalia
// o codigo (RF20 + RF15). O 8o tipo (resposta aberta por IA) ainda NAO existe
// no motor - depende do backend. Este item de multipla explica a atividade e o
// principio de scaffolding. SUBSTITUIR pelo tipo de resposta aberta quando a IA
// estiver integrada (ver METODOLOGIA-TRILHA1.md, secao 8).
// ============================================================================
export default {
  id: 'projetofinal',
  titulo: 'Projeto Final (GitHub + IA)',
  descricao: 'Fechamento da jornada: resolver um problema real e receber feedback da IA.',
  exercicios: [
    {
      id: 'pf1',
      tipo: 'multipla',
      titulo: 'Como funciona o projeto final',
      enunciado: 'No projeto final voce resolve um problema em Python, sobe no GitHub e a IA avalia o codigo. O que a IA NAO deve fazer?',
      opcoes: ['Explicar por que algo esta errado', 'Entregar a solucao pronta no seu lugar', 'Apontar o que revisar', 'Verificar se ha funcoes e organizacao'],
      correta: 1,
      dica: 'A IA e um apoio ao raciocinio; a decisao final e humana.',
      feedbackCerto: 'Isso. A IA da suporte (scaffolding) sem entregar a resposta pronta - e a correcao final e humana.',
      feedbackErrado: 'A IA nao deve entregar a solucao pronta: ela apoia o raciocinio e quem decide e o humano.',
    },
  ],
}
