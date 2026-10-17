# Briefing — Metodologia da Trilha (aba de conteúdo)

> **Para quem é este arquivo:** uma sessão do Claude (aba do cowork) dedicada a
> projetar a **metodologia de ensino da primeira trilha** do DevForge. Leia tudo
> antes de começar. Esta aba **não escreve código** — produz um documento de
> metodologia (texto + tabela). Uma aba irmã cuida do código; quando esta
> metodologia estiver pronta e validada, um briefing irmão a entrega a essa aba
> já traduzida em passos de implementação.

---

## 1. O projeto em uma página

**DevForge** é o MVP do TCC (Bacharelado em Engenharia de Software, PUCPR, 2026;
trio Davi, Giovani, Joshua; orientadora Sofia Marshallowitz). É uma plataforma
web gamificada de apoio ao ensino de programação para iniciantes, inspirada no
modelo de retenção do Duolingo.

Ideias centrais do TCC (ver `DevForge-TCC.pdf` na raiz):

- **Abordagem tangencial:** cada atividade revisita o que o aluno já sabe e, ao
  mesmo tempo, introduz conhecimento novo (não é só reforço).
- **Casos contrastantes:** apresentar dois exemplos de código quase idênticos que
  diferem só em uma característica crítica, para o aluno perceber a estrutura
  profunda e reduzir carga cognitiva (MA et al., 2023).
- **Engenharia de Software aplicada ao código**, não em trilhas isoladas (testes,
  modelagem, qualidade, Git entram a serviço da escrita de código).
- **Gamificação calibrada** para não cair no efeito de superjustificação.

Público (personas no PDF): iniciantes — Pedro (calouro com bagagem prática),
Letícia (estagiária front-end), Marcelo (transição de carreira).

**Estado atual do MVP** (ver `CLAUDE.md`): 7 tipos de exercício implementados,
validação local (sem backend/IA ainda), mecânicas de vidas, streak, XP e dicas
progressivas funcionando. Falta o 8º tipo (resposta aberta por IA).

Os 7 tipos existentes são: `multipla` (múltipla escolha), `lacuna`
(preenchimento), `saidaMultipla` (prever a saída), `acharErro` (achar a linha com
erro), `associacao` (relacionar colunas), `contrastantes` (casos contrastantes) e
`parsons` (reordenar linhas).

## 2. Por que precisamos da metodologia agora

É a frente mais barata e que **destrava** outras duas coisas com prazo:

1. **Documento (Entrega II, 16/11):** o Cap. 3.3 (Especificação da Solução para
   Jogo) exige uma tabela **Id / Resultado de Aprendizagem / Tema de Estudo /
   Mecânica**. Só a metodologia produz esse conteúdo.
2. **Protótipo (código):** os 7 tipos de exercício precisam ensinar algo coerente
   e progressivo, não exercícios soltos. A metodologia define o quê e em que
   ordem.
3. **Feedback do orientador:** dar sentido pedagógico e "vida" ao jogo.

Não depende de designer, conta de API nem backend — por isso é a primeira a ser
atacada no roadmap (ver `ROADMAP-ENTREGA2.md`).

## 3. O que é "metodologia da trilha" aqui (escopo exato)

**Não** é um ensaio genérico de teoria pedagógica. É algo concreto para a
**primeira trilha — Lógica de Programação**:

- Uma **lista ordenada de resultados de aprendizagem** (o que o aluno deve saber
  ao fim de cada etapa), em dificuldade crescente.
- Para cada resultado: o **tema de estudo**, o(s) **tipo(s) de exercício** (dos 7
  existentes) que melhor o ensinam/avaliam, e a **mecânica de jogo** associada.
- Baseada no conteúdo do **1º período** do curso.
- Alinhada à abordagem tangencial, aos casos contrastantes e à redução de carga
  cognitiva.

## 4. Como construir (passo a passo)

1. **Levantar o conteúdo de Lógica de Programação do 1º período** — listar os
   tópicos (ex.: variáveis, tipos, entrada/saída, operadores, condicionais,
   laços, listas, funções). Marcar como suposição o que não tiver fonte.
2. **Ordenar em dificuldade crescente** — definir a sequência pedagógica.
3. **Para cada tópico, escrever um resultado de aprendizagem claro** — verbo de
   ação + o que o aluno consegue fazer (ex.: "Prever a saída de um laço `for`
   simples").
4. **Escolher o(s) tipo(s) de exercício** dos 7 existentes que melhor servem cada
   resultado — e apontar onde os **casos contrastantes** entram (técnica central
   do TCC).
5. **Associar a mecânica de jogo** (energia, dica, XP, streak) ao resultado,
   justificando.
6. **Marcar onde a lore pode entrar** (coordenar com a aba de Lore; não bloquear
   nela).
7. **Montar a tabela final** no formato do Cap. 3.3: Id / Resultado de
   Aprendizagem / Tema de Estudo / Mecânica (+ coluna de tipo de exercício).
8. **Validar com a orientadora** antes de considerar pronto.

## 5. Restrições e princípios

- Público **iniciante**: reduzir carga cognitiva, sessões curtas.
- **Tangencial**: cada atividade revisita o conhecido e introduz o novo.
- **Casos contrastantes** como técnica recorrente, não só um tipo entre outros.
- O **8º tipo (resposta aberta por IA)** ainda não existe — pode-se prever onde
  entraria, mas a metodologia **não deve depender** dele para funcionar.
- Vocabulário da lore: usar **"energia"** (robô), não "vida".
- **Não escrever código** nesta aba. Só texto e tabela.
- Regras ainda em aberto (ex.: "pedir dica consome energia?") **não** devem ser
  decididas aqui sozinhas — registrar como pergunta para a equipe.

## 6. Entregável desta aba (formato esperado)

Um arquivo markdown contendo:

- **Lista ordenada dos resultados de aprendizagem** da trilha 1, com justificativa
  curta da sequência.
- **Tabela**: Id | Resultado de Aprendizagem | Tema de Estudo | Tipo(s) de
  exercício | Mecânica de jogo.
- **Notas pedagógicas** amarrando as escolhas à literatura do TCC (ex.: casos
  contrastantes — MA et al., 2023; eficácia da gamificação — Zhan et al., 2022).
- **Perguntas em aberto** para a equipe/orientadora.

Esse entregável tem dois destinos: (a) ser inserido no **Cap. 3.3 do documento**;
(b) ser entregue à **aba de código** como especificação do que implementar.

## 7. Arquivos de referência no repositório

- `CLAUDE.md` — contexto e estado atual do MVP (fonte principal).
- `DevForge-TCC.pdf` — proposta: introdução, revisão da literatura, personas,
  requisitos funcionais, referências.
- `ROADMAP-ENTREGA2.md` — ordem das frentes e dependências.
- `src/exercicios/` — os 7 tipos de exercício já implementados (ver cada arquivo).
- `src/config.js` — parâmetros de jogo (vidas/energia, erros, XP, dicas).
- `src/trilhas/exemplo/` — a trilha de exemplo atual (1 exercício de cada tipo),
  bom modelo de como o conteúdo é estruturado hoje.

## 8. O que NÃO fazer

- Não implementar em código (isso é da aba irmã).
- Não inventar conteúdo fora do 1º período sem marcar como suposição.
- Não fechar sozinho regras de jogo ainda em aberto.
- Não esperar pela lore/imagens/IA para avançar — esta frente é independente.

## 9. Próximo passo depois daqui

Quando a metodologia estiver escrita e validada com a orientadora, criar o
**briefing irmão para a aba de código**, com a metodologia já traduzida em: quais
exercícios criar ou ajustar, em que ordem no array da trilha, e qual tipo cada um
usa.
