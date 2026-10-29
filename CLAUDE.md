# DevForge — Contexto do Projeto

> Este arquivo é a fonte de contexto do projeto. O Claude lê este arquivo
> automaticamente no início de cada sessão, em qualquer máquina. Por estar
> versionado no Git, ele sincroniza entre o notebook, o desktop e o restante do
> grupo via `push`/`pull`. Mantenha-o atualizado: é aqui que fica registrado o
> que já foi feito, o que está em andamento e o que falta.

## O que é

DevForge é o MVP da plataforma proposta no TCC (Bacharelado em Engenharia de
Software, PUCPR, 2026). Trio: Davi Noel Martins Mundt, Giovani Tortato e Joshua
Mendes. Orientadora: Sofia Marshallowitz. O documento completo está em
`DevForge-TCC.pdf`, na raiz do repositório.

É uma plataforma web gamificada de apoio ao ensino de programação para
iniciantes, inspirada no modelo de retenção do Duolingo. O conteúdo é organizado
em trilhas de exercícios de dificuldade crescente e de tipos variados. Conceitos
de Engenharia de Software (testes, modelagem, qualidade de código) entram
aplicados ao próprio código, não como trilhas isoladas. O feedback de respostas
abertas usa IA com supervisão humana (human-in-the-loop).

## Estado atual do MVP

Fatia funcional atual: o **Bloco de Lógica de Programação** — um **catálogo de 10
trilhas temáticas** (9 de conteúdo com 8 exercícios cada + o Projeto Final),
somando **73 exercícios** em Python. O conteúdo é baseado na ementa de Raciocínio
Algorítmico (1º período); o mapeamento fonte→exercício está em
[`METODOLOGIA-EXERCICIOS.md`](METODOLOGIA-EXERCICIOS.md) e a metodologia pedagógica
em [`METODOLOGIA-TRILHA1.md`](METODOLOGIA-TRILHA1.md). A verificação das respostas é
**local** (sem backend e sem IA) nesta etapa, e há uma **suíte de testes** (Vitest)
que valida o gabarito de todos os exercícios (`npm test`).

Mecânicas de jogo já implementadas:

- **Catálogo e trilha ativa (RF03):** a tela inicial lista as trilhas do bloco; o
  usuário escolhe uma e pode "Voltar ao catálogo".
- **Só avança ao acertar:** o botão "Próximo" só aparece após o acerto; errando,
  o usuário continua no mesmo exercício e pode "Tentar de novo".
- **Energia:** começa em `VIDAS_INICIAIS` (10, RF07) e cai 1 a cada
  `ERROS_PARA_PERDER_VIDA` (3) erros no mesmo exercício — ou seja, a perda começa
  no 3º erro (RF08). Ao zerar, a **lição é interrompida**. **Não** reinicia entre
  exercícios. (A lore usa "energia", não "vida".)
- **Streak:** sequência de acertos; sobe a cada acerto e zera ao errar.
- **XP:** ao acertar, ganha `XP_BASE` (100) menos `XP_PENALIDADE_ERRO` (25) por
  erro (piso `XP_MINIMO` = 10), **mais** um bônus de `XP_BONUS_POR_STREAK` (10) ×
  streak atingido.
- **Dicas (feedback progressivo ao errar):** erros 1-2 só "errado"; a partir de
  `ERROS_PARA_DICA` (3) mostra a `dica`; a partir de `ERROS_PARA_RESPOSTA` (4)
  mostra o `feedbackErrado` (resposta completa). Alinhado ao RF06.
- **Dica sob demanda:** botão que troca **1 de energia por uma dica** (com
  confirmação na própria página).
- **Coloração:** nas questões de escolha, ao **acertar** a opção certa fica verde
  e as demais vermelhas; ao errar, nada é revelado (não entrega a resposta).
- **Pular exercício (teste):** botão que pula sem resolver — **apenas para validar
  conteúdo**; remover na versão final.
- Esses parâmetros ficam em `src/config.js`, fáceis de ajustar.

### Decisões tomadas

- **Stack:** Vite + React (JavaScript, sem TypeScript).
- **Visual propositalmente cru** (HTML quase sem CSS), por pedido da equipe — o
  layout não deve parecer "pronto demais". Só há o CSS mínimo de leitura em
  `src/styles.css`.
- **Validação local** dos exercícios nesta etapa (sem backend, sem IA).
- **Parâmetros de jogo centralizados** em `src/config.js` (vidas, erros, XP).
- **IA adiada** — ver a seção "IA (próxima etapa)".
- IA será consumida via **API de nuvem** (decisão do TCC); execução local de
  modelos compactos fica como trabalho futuro.

### Tipos de exercício implementados (7 de 8)

`multipla` (múltipla escolha), `lacuna` (preenchimento de código),
`saidaMultipla` (prever a saída em uma ou mais caixas), `acharErro` (encontrar a
linha com erro), `associacao` (relacionar colunas, com distratores),
`contrastantes` (casos contrastantes) e `parsons` (reordenar linhas, aceitando
mais de uma ordem válida quando couber). Nas questões de escolha, a opção certa
fica verde (e as demais vermelhas) **ao acertar**.

Falta o 8º tipo: **resposta aberta corrigida por IA** (depende da integração com
a IA).

## Como rodar

Pré-requisito: **Node.js 18 ou superior** instalado.

- Windows (PowerShell): `./start.ps1`
- Linux/macOS: `bash start.sh`
- Ou manualmente: `npm install` (apenas na primeira vez) e depois `npm run dev`.

A aplicação abre em `http://localhost:5173`.

`node_modules/` não é versionado (ver `.gitignore`). Em cada máquina nova, rode a
instalação uma vez.

Para rodar os **testes automatizados** (validam o gabarito de todos os
exercícios): `npm test`.

## Estrutura de pastas

Arquitetura em **três camadas** (refatorada em 2026-10-15 para permitir
expansão): motor, tipos e conteúdo, cada uma crescendo sem mexer nas outras.

```
index.html / vite.config.js / package.json / start.ps1 / start.sh
README.md                 — explicação para humanos (grupo/banca)
METODOLOGIA-TRILHA1.md    — metodologia pedagógica (Cap. 3.3)
METODOLOGIA-EXERCICIOS.md — mapa fonte (1º período) → cada exercício
src/
  main.jsx                — ponto de entrada do React
  App.jsx                 — raiz: catálogo (escolher trilha) ↔ jogo
  config.js               — parâmetros de dificuldade (energia, erros, XP, dicas)
  styles.css              — estilo mínimo
  jogo/                   — MOTOR: estado + telas (independente do conteúdo)
    Jogo.jsx              — estado (energia, streak, XP, dicas) e escolha da tela
    telas/                — TelaCatalogo / TelaExercicio / TelaLicaoInterrompida / TelaConclusao
  exercicios/             — TIPOS de exercício (um arquivo por tipo)
    registro.jsx          — mapa tipo→módulo + CampoResposta + verificar/respostaInicial/temResposta
    multipla.jsx, lacuna.jsx, saidaMultipla.jsx, acharErro.jsx,
    associacao.jsx, contrastantes.jsx, parsons.jsx, util.js
    __tests__/exercicios.test.js — valida o gabarito de todos os exercícios (Vitest)
  trilhas/                — CONTEÚDO
    index.js              — bloco + catálogo de trilhas (RF03)
    logica/               — as 10 trilhas do Bloco de Lógica (uma por arquivo)
      leitura.js, tipos.js, aritmetica.js, booleanos.js, condicoes.js,
      repeticao.js, listas.js, funcoes.js, boaspraticas.js, projetofinal.js
```

Cada **tipo** (`exercicios/*.jsx`) exporta `{ Campo, verificar, respostaInicial,
temResposta }`; o `registro.jsx` os junta. O **motor** (`jogo/Jogo.jsx`) usa o
registro e não conhece os tipos diretamente. As **trilhas** são só dados.

## Como adicionar ou alterar

- **Exercício novo numa trilha:** crie `trilhas/<trilha>/exNN-xxx.js` (exporta o
  objeto), importe-o no `index.js` da trilha e coloque-o na **posição** desejada
  do array `exercicios`. Inserir no meio = escolher onde entra na lista.
- **Tipo novo:** copie um arquivo de `exercicios/` como modelo, ajuste o `Campo`
  e as funções, e registre-o em `exercicios/registro.jsx` (1 linha no mapa).
- **Trilha nova:** crie a pasta em `trilhas/` com seu `index.js` e inclua-a em
  `trilhas/index.js`.

## IA (próxima etapa) — como usar o Claude no projeto

Quando chegar a hora do feedback por IA, o ponto central é:

1. **Assinatura ≠ API.** A assinatura do Claude (Pro/Max) serve para usar o
   Claude pelo chat/Claude Code. Ela **não** dá acesso para o aplicativo chamar o
   modelo. Para isso é preciso uma conta da **Anthropic API**, com uma **API key**
   e **créditos** (cobrança por token — conta separada da assinatura).
2. **A chave nunca fica no front-end.** Colocar a API key no código React
   (navegador) a expõe para qualquer usuário. O padrão (e o que o TCC já prevê) é
   ter um **backend**: um pequeno serviço (ex.: Node/Express ou uma função
   serverless) que guarda a chave, recebe a resposta aberta do aluno + a rubrica
   da lição, chama a API da Anthropic e devolve o feedback para o front.
3. **Fluxo:** React → nosso backend → API da Anthropic → backend → React.
4. **Prompt com rubrica.** No pedido ao modelo, a mensagem de sistema carrega a
   rubrica de correção definida pela equipe de conteúdo e a instrução de **dar
   apoio ao raciocínio sem entregar a resposta pronta** (scaffolding). A decisão
   final continua humana (human-in-the-loop), como pede o TCC.
5. **RAG (futuro):** o material da trilha pode ser enviado como contexto para o
   modelo embasar o feedback.

Para um protótipo de demonstração, dá para começar com o feedback "stub" local
(fixo/por regra, já é o caso hoje) e trocar só a camada de correção pela chamada
ao backend quando a conta de API estiver pronta.

## Deploy e infraestrutura (planejado)

Ideias levantadas para quando o projeto for para a nuvem e expandido (decisão de
2026-10-15; ainda **não** implementado). Resumo: hospedar o site é fácil; o
esforço real é o código de auth + sincronização, não a hospedagem em si.

- **Hospedagem do front (fácil):** o app é estático (`npm run build` → `dist/`).
  Publicar em **Azure Static Web Apps**, ligado ao repositório do GitHub (build
  `npm run build`, saída `dist`), com URL pública, HTTPS e CI/CD automáticos
  (GitHub Actions). Free tier cobre a escala do TCC. Dá para integrar ao pipeline
  do Azure (alinha com a disciplina de DevOps).
- **Login e dados do usuário (sem servidor próprio):** **Firebase Auth** (já
  previsto, RF02) para autenticação e **Firestore** para guardar por usuário as
  vidas, energia, XP, trilha atual e progresso. O front lê/escreve direto, com
  **regras de segurança** amarrando cada dado ao usuário logado. Assim o Azure
  hospeda o site e o Firebase cuida de auth + dados — não precisa de banco no
  Azure. (A config do Firebase no front é pública por design; a segurança vem das
  regras, não de esconder essa config.)
- **Alternativa tudo-Azure:** Static Web Apps + Azure Functions + Cosmos DB ou
  Azure SQL. Funciona, mas dá mais trabalho que o Firebase para este caso.
- **Backend só para a IA:** o único ponto que exige servidor é esconder a API key
  da IA (ver "IA (próxima etapa)") — Azure Functions ou um serviço pequeno.
- **Custo:** provável US$ 0 nos free tiers (Azure + Firebase) na escala do TCC.
- **Anti-trapaça (futuro):** com dados gravados pelo cliente, o usuário consegue
  editar o próprio XP pelo navegador. Aceitável no MVP; validação server-side
  (Cloud Functions) fica para quando houver ranking/competição que exija
  integridade.

## Backlog — o que falta (requisitos do TCC)

Fora do MVP atual, ainda não implementado:

- Contas e login com Firebase (RF01, RF02, RF23) e criptografia de dados (RNF10).
- Catálogo de trilhas e trilha ativa (RF03, RF04).
- Vidas: versão básica feita (3 vidas, −1 a cada 2 erros). Falta alinhar à regra
  final do TCC (perda só após o 3º erro / energia) quando a equipe decidir (RF07, RF08).
- Dicas: versão básica feita (feedback progressivo errado → dica → resposta,
  com limites em `config.js`). Falta alinhar à regra do TCC (a partir do 3º erro)
  e a frequência configurável pelo usuário (RF06, RF09).
- XP e streak: versão básica feita (XP no fim, streak na tela). Falta persistir por
  trilha e o lembrete de streak em risco (RF10, RF11).
- Painel de progresso geral e por trilha (RF12).
- Editar perfil (RF13).
- Feedback de erro assistido por IA (RF15) e o tipo de exercício de resposta
  aberta.
- Histórico de exercícios (RF16), ranking (RF17), conquistas/badges (RF18).
- Refazer exercícios/trilhas (RF19), integração com GitHub (RF20).
- CMS de conteúdo para a equipe cadastrar trilhas sem código (RF21).
- Notificações push/e-mail (RF22) e avaliação de exercício pelo usuário (RF24).
- Modo claro/escuro (RNF02), responsividade (RNF08), acessibilidade (RNF09).

Monetização está fora de escopo (definição do TCC).

## Git e sincronização (fluxo do grupo)

- Repositório remoto no GitHub (`DaviMartins26/DoonsDay`); branch principal:
  `main`. `node_modules/` não é versionado.
- O repositório está ligado ao **Azure Static Web Apps**, que criou um workflow
  `.github/workflows/azure-static-web-apps-*.yml` direto no remoto. Por isso o
  remoto pode ter commits que a sua máquina ainda não tem — sincronize antes de
  trabalhar.
- **Antes de começar:** `git pull` para trazer o que está no remoto.
- Se o histórico divergiu, o `git pull` abre um **merge** e fica esperando você
  concluir. Quando aparecer `All conflicts fixed but you are still merging` (ou o
  editor da mensagem de merge), **não é erro**: rode `git commit --no-edit` para
  fechar o merge e depois `git push`.
- Sequência segura: `git pull` → resolver conflitos se houver → `git commit`
  (conclui o merge) → `git push`.

## Log de progresso

- **2026-10-15:** Scaffold Vite + React; trilha de exemplo com 7 tipos de
  exercício (sem IA); scripts de inicialização; este `CLAUDE.md`.
- **2026-10-15:** `README.md` completo; `src/config.js` com parâmetros de jogo;
  vidas, streak e XP; só avança ao acertar; telas "sem vidas" e conclusão.
  Ajustes nos exercícios: ex2 agora pede `return`; ex3 vira 3 caixas de saída;
  ex5 ganha distratores; ex6 passa a 3 versões.
- **2026-10-15:** Bônus de streak no XP (`XP_BONUS_POR_STREAK`); tela "sem vidas"
  vira "Lição interrompida" (0 vidas interrompe a lição); comentários detalhados
  em todo o código (App, tipos, trilha, config, main, index, styles) para
  facilitar manutenção e novas adições.
- **2026-10-15:** Dicas progressivas ao errar (campo `dica` por exercício;
  limites `ERROS_PARA_DICA`/`ERROS_PARA_RESPOSTA` e `MENSAGEM_ERRO_SIMPLES` em
  `config.js`): erros 1-3 só "errado", 4º dica, 5º+ resposta. README e CLAUDE.md
  atualizados.
- **2026-10-15:** Refatoração da estrutura em 3 camadas (motor `jogo/`, tipos
  `exercicios/` com registro, conteúdo `trilhas/` com 1 arquivo por exercício +
  manifesto ordenado). Ordenação por array (não lista ligada). Removidos
  `src/data/trilha.js` e `src/components/tipos.jsx`. Comportamento idêntico;
  objetivo foi abrir o código para expansão (novos tipos/exercícios/trilhas).
- **2026-10-15:** ex5 (associação) passou a usar lógica Python (`len`, `**`, `%`)
  em vez de equações, mesmo tipo de resposta. Atalho de teclado: nos exercícios
  de escolha (radio), Tab leva o foco direto ao botão Verificar (helper
  `tabParaVerificar` em `exercicios/util.js`; `TelaExercicio` passa
  `focarVerificar` via registro).
- **2026-10-17:** Planejamento da Entrega II (template v2023v3): `ROADMAP-ENTREGA2.md`
  (ordem das 6 frentes + checklists) e `briefings/metodologia-trilha.md` (briefing
  para a aba de conteúdo montar a metodologia da 1ª trilha). Cards da Sprint 2
  estruturados no Trello (quadro TCC-Parte1): 4 novos (Metodologia, Lore,
  Assistente IA, Paralelos) + checklists nos existentes. Adicionada a seção "Git e
  sincronização" após merge com o remoto (workflow do Azure Static Web Apps).
- **2026-10-17:** Metodologia da 1ª trilha escrita (`METODOLOGIA-TRILHA1.md`):
  resultados de aprendizagem, tabela do Cap. 3.3 e o capstone GitHub + IA, ancorados
  na ementa de Raciocínio Algorítmico (1º período).
- **2026-10-17:** **Bloco de Lógica de Programação** — o app deixou de ter só a
  trilha de exemplo e passou a um **catálogo de 10 trilhas temáticas** (RF03) com
  **73 exercícios** em Python (`src/trilhas/logica/`), baseados na ementa; mapa
  fonte→exercício em `METODOLOGIA-EXERCICIOS.md`. Nova `TelaCatalogo`; `App.jsx`
  alterna catálogo ↔ jogo. Tipos de escolha ganham **coloração só no acerto**
  (verde/vermelho) e o `parsons` aceita **várias ordens válidas** e mostra a
  **indentação**. Motor: **dica sob demanda** (−1 energia, com confirmação) e botão
  **"Pular exercício (teste)"**. Regras alinhadas ao TCC: **energia 10** (RF07),
  perda e dica a partir do **3º erro** (RF06/RF08); "vida" renomeada para
  "energia" nas telas. Adicionada **suíte de testes** (Vitest) que valida o
  gabarito de todos os exercícios (`npm test`). Trabalho desenvolvido na pasta
  `Trilha-exercicios` (fora do repo) e integrado aqui.
- **2026-10-20:** Lore do jogo documentada em `LORE.md` (fonte do Cap. 3.3 do
  TCC). Premissa: jogador = IA em avaliação; trilhas = baterias de teste. Trio de
  personagens com teoria das cores (Breaking Bad): jogador azul (honesto), Rival
  verde (trapaceiro), Chefe vermelho ("Maior é Maior", nunca mostrado inteiro).
  Adicionada **Lari** (nome provisório), a guia feminina amarela que apresenta a
  DevForge e dá **dicas em troca de 1 de energia** — justifica na ficção a dica
  sob demanda já existente. Nome real da empresa/plataforma = **DevForge**;
  "Projeto DoomsDay" = codinome obscuro (easter egg). Quadrinhos puláveis com
  **balões em branco + texto por código** (i18n PT/EN sem reimagem). Escopo do
  MVP: **abertura completa + 1º exercício da trilha 1**; ciclo dramático só nas
  trilhas-marco; redenção do Rival pós-MVP. `LORE.md` traz o roteiro rascunhado e
  os prompts do Gemini (concept art base + personagens).
- **2026-10-20:** Concept art dos 4 personagens gerada no Gemini
  (`lore/conceptArt/`) + um quadro pronto do Chefe na sombra. Nova camada
  **`src/quadrinhos/`**: motor `Quadrinho.jsx` (imagem + camada de texto por
  código + navegação + Pular + toggle PT/EN) e roteiro em dados `abertura.js`
  (6 quadros; quadro 5 usa a arte real do Chefe em `public/quadrinhos/`). Plugado
  no `App.jsx` antes do catálogo; quadros sem arte mostram placeholder. Formato de
  dados: um módulo por arco, `baloes: [{ quem, x, y, w, texto: { pt, en } }]` —
  i18n só por string, sem reimagem. Rodou e verificado no navegador.
- **2026-10-20:** Abertura com **arte real nos 6 quadros** (Gemini): fontes em
  `lore/Intro/`, servidas em `public/quadrinhos/intro/Quadro1-6.jpeg`. `abertura.js`
  aponta cada quadro e posiciona o balão dentro do balão branco já desenhado.
  Q1 Lari no console, Q2 Lari+jogador(holograma), Q3 painel de energia, Q4 Lari
  pisca/lâmpada(dica), Q5 Chefe na sombra, Q6 Lari acena. Verificado quadro a
  quadro no navegador. Pendência de polimento (anotada): encaixe do texto no balão
  não é perfeito — ok como protótipo, melhorar depois (ex.: caixa transparente).
- **2026-10-21:** Intro em quadrinho da **Trilha 1** (`src/quadrinhos/trilha1-intro.js`,
  3 quadros: Lari apresenta a trilha, o desafio de ler/prever a saída, e o Rival
  verde debochando). Artes em `lore/Trilha1/` → `public/quadrinhos/trilha1/Inicio1-3.jpeg`.
  `App.jsx` agora tem um mapa `INTROS` (trilhaId→roteiro); a intro toca ao clicar
  "Começar" na trilha, antes do 1º exercício, uma vez por sessão (`introsVistas`).
  Só a Trilha 1 (`leitura`) tem intro. Fluxo verificado no navegador: abertura →
  catálogo → Começar → intro (3 quadros) → Exercício 1. O **final** da trilha 1
  (ciclo dramático) ainda não foi scriptado nem gerado.
- **2026-10-21:** **Fechamento da Trilha 1** implementado com arte real
  (`src/quadrinhos/trilha1-final.js`, 6 quadros): Lari celebra a pontuação
  perfeita (1160, teto honesto), o Rival aparece com 1500 (acima do máximo), o
  placar expõe a trapaça, o Chefe premia o Rival ("Maior é Maior"), o Rival
  debocha e a Lari vira motivacional. Quadro do Chefe usa **dois balões**
  (Chefe+Rival). Artes em `lore/Trilha1/Fim*.jpeg` → `public/quadrinhos/trilha1/`
  (nomes não seguem a ordem; mapeados por conteúdo; Fim7 ≈ Fim5, reserva).
  `Jogo.jsx` ganha a prop `roteiroFinal`: toca ao concluir a trilha, antes da
  `TelaConclusao`; `App.jsx` tem o mapa `FINAIS` (trilhaId→roteiro). Fluxo
  verificado no navegador até a conclusão. Pendências de arte (glitches do Gemini)
  anotadas no `LORE.md`.
- **2026-10-21:** Correções no desfecho da Trilha 1: ordem das imagens ajustada
  (`Fim1..Fim7` = beats 1..7; Fim1 = condecoração, Fim5 = Chefe decide com 1
  balão, Fim7 = desfecho da Lari; glitch da figura humana removido). O motor
  `Quadrinho.jsx` agora substitui marcadores `{chave}` nas falas por `variaveis`
  (ex.: `{xp}`), e o `Jogo.jsx` injeta `{ xp: xpTotal }` no quadrinho final — a
  fala da condecoração mostra a **pontuação real do jogador** (verificado: 110 XP
  após acertar o ex1 e pular o resto), não mais um valor fixo.
- **2026-10-24:** Sincronização de planejamento. `ROADMAP-ENTREGA2.md` atualizado:
  marcados como concluídos os itens já feitos das frentes 1 (Metodologia, menos a
  validação com a orientadora), 2 (História/Lore), 4 (Consolidar MVP) e parte das
  frentes 5 e 6. No **Trello** (quadro TCC-Parte1), criados checklists "Progresso"
  nos 6 cards da Sprint 2 (26 itens, 12 concluídos) e movidos para "Desenvolvimento"
  os cards Documento Somativa II, Assistente IA e Paralelos Assíncronos (nenhum card
  movido para "Pronto", por decisão da equipe).
- **2026-10-24:** Documento da Entrega II. Gerado `Documento/DevForge_entrega-II_V1.0.docx`
  com as seções desenvolvidas (3.3 Especificação da Solução — quadro do jogo + tabela
  Id/Resultado de Aprendizagem/Tema de Estudo/Mecânica com os 10 RA da trilha; 3.4
  Considerações; Cap. 4 Validação da Ferramenta no modelo MEEGA+; Cap. 5 Informações
  do Projeto com riscos atualizados). Após revisão da equipe: o Cap. 5 foi descartado
  por ora; o Cap. 4 precisa ser alinhado com o orientador e reescrito para **não ser
  cópia** do exemplo (risco de plágio); o Cap. 3 foi editado manualmente pelo Davi.
- **2026-10-24:** Montado o documento **completo** `Documento/DevForge_entrega-II_V1.1.docx`
  a partir de `Artigos/DevForge-5.4.3.docx` (fonte editável equivalente ao
  `DevForge-TCC.pdf`, com personas, tabelas e referências reais): inserida a 3.3
  Especificação da Solução (versão editada do Cap. 3), a antiga 3.3 Considerações
  renumerada para 3.4, inserido o Cap. 4 Validação da Ferramenta reescrito em texto
  próprio (MEEGA+ citado, não copiado; marcado como rascunho pendente do orientador)
  e o antigo Cap. 4 Informações do Projeto empurrado para Cap. 5 (conteúdo original
  intacto, só renumerado). A numeração de capítulos/seções é automática (mesmo
  `numId` das Heading), então renumera sozinha ao abrir no Word (atualizar o Sumário
  com F9). Validado por XSD (`validate.py`). **Nada commitado no Git.** Pendências:
  validar a metodologia com a orientadora, alinhar o Cap. 4 com o orientador e, no
  futuro, melhorar o documento; a base v1.1 é de 26/09, conferir contra o PDF (17/10).
- **2026-10-25:** **Chat com a Lari + visual de jogo** (feedback do orientador: "parecer
  mais um jogo"). A resolução de exercícios virou uma **conversa com a Lari**
  (`src/jogo/telas/TelaChat.jsx`, no lugar da `TelaExercicio`, que ficou de reserva):
  a Lari manda o exercício como mensagem, a resposta é enviada, ela "digita" (...) e
  responde certo/errado; acertando, manda o próximo. Histórico das trocas (some no F5).
  A **dica** virou conversa (pede → confirma → −1 energia → dica como mensagem) e há
  **aviso quando um erro custa energia**. Falas humanas (saudação/ponte sorteadas).
  Cada mensagem tem um **avatar por humor** (normal/dúvida/erro) em `public/chat/lari/`
  (fontes em `lore/Lari/`); o modelo já suporta **outro personagem** mandando mensagem
  numa trilha futura (o rosto do jogador não aparece). **Tema DevForge global**
  (`styles.css`): paleta em `:root` (neon cyan/âmbar), fundo do laboratório
  (`public/chat/lab-bg.jpg`, origem `lore/Chat/fundo.jfif`) em todas as telas; catálogo,
  conclusão e lição interrompida retematizados. **Minigames**: Parsons reordena
  **arrastando** a linha (saiu subir/descer); associação virou **"fios"** (arrastar da
  pergunta até a resposta, SVG) — sem dependência externa, `verificar` inalterado.
  **Responsivo (mobile)**: no celular o chat vira tela cheia. **Testes**: novo
  `render.test.jsx` (monta o campo de cada exercício: 73) além do gabarito (367) —
  **440 passando**; devDeps `jsdom` + `@testing-library/react`. O código base
  (chat/tema/minigames/falas/testes) foi commitado em `2e88e1d`; o **fundo novo, os
  avatares da Lari e o responsivo ainda não foram commitados**.
- **2026-10-25:** Ajustes na Trilha 1 e no chat. **lei4**: o exemplo no enunciado
  deixou de entregar a resposta (`2.5` → `1.2`). **lei8**: tirada a comparação
  booleana (`> 25`, resultado `True`) — booleanos só aparecem na trilha 4; virou
  duas contas (30 e 13). **Minigame de FIOS adicionado na Trilha 1** (`lei9`: ligar
  a conta ao resultado) + **instrução visível** no minigame ("arraste um fio..."). A
  mensagem de perda de energia virou "Esse erro custou energia. Sem pressa, você
  consegue.". **Novos rostos da Lari** (alta resolução em `lore/Lari/`)
  redimensionados para `public/chat/lari/`. Testes: **446** passando. Pendente de
  ideia/implementação: a Lari dar uma **mini-aula tangencial** (explicar um pouco o
  conceito, sem virar aula). (Nada commitado ainda.)
- **2026-10-25:** **Mini-aula tangencial da Lari** (cápsula por trilha): campo opcional
  `aula: [...]` na trilha; a Lari manda essas frases (uma bolha por frase) ANTES do 1º
  exercício, explicando um pouco o conceito sem virar aula. Escrita a cápsula da Trilha
  1 (`leitura.js`) como demo; `Jogo.jsx` passa `aula` ao `TelaChat` (trilha sem `aula`
  não mostra nada). **Respostas por linha**: na `saidaMultipla` a resposta enviada
  aparece com **uma saída por linha** ("Saida 1: 8" / "Saida 2: 15"...) em vez de tudo
  grudado, e as bolhas passam a respeitar quebras de linha (`white-space: pre-line`).
  446 testes passando. (Nada commitado ainda.)
- **2026-10-25:** Mais ajustes no chat e nas trilhas. **Resposta da Lari por linha**:
  quando o exercício tem várias saídas (`saidaMultipla`), além da frase, a Lari manda
  o gabarito com **uma saída por linha** (`gabaritoLinhas()` em `TelaChat.jsx`), igual
  à nossa bolha — no acerto, e no erro só quando ela já revela a resposta completa.
  **Trilha 1**: removido o antigo `lei8` ("Duas contas"), que repetia o padrão de
  multiplicar/somar; o fios virou `lei8` (o 8º/último) com **operadores variados**
  (`4 + 3`, `2 * 5`, `9 - 3`, `8 % 3` → 7, 10, 6, 2), introduzindo o resto (`%`) no
  minigame. Trilha 1 fica com **8 exercícios**. **Mini-aulas em TODAS as trilhas**:
  cápsula `aula: [...]` escrita para as 10 trilhas (antes só a 1 tinha), cada uma
  seguindo o conteúdo mapeado em `METODOLOGIA-EXERCICIOS.md` (tema/RA de origem) e a
  abordagem tangencial (liga o conhecido → introduz o novo → micro-exemplo). Testes:
  **440** passando (6 a menos: 1 exercício removido). (Nada commitado ainda.)
- **2026-10-25:** Fios mais difíceis + Lari por linha em tudo + explicação por exercício.
  **Fios cruzando**: nas associações em que as `opcoes` vinham alinhadas 1-a-1 com a
  esquerda (`tip1`, `lis3`, `fun4`, `bp4`), a ordem de `opcoes` foi embaralhada para os
  fios certos se **cruzarem** (só visual; `verificar` compara por valor, não por posição).
  **Resposta da Lari por linha também na `associacao`**: `gabaritoLinhas()` passou a cobrir
  fios ("42 → int"...), não só `saidaMultipla`; a bolha da nossa resposta de fios também
  quebra por par. **Mini-explicação por exercício**: campo opcional `nota` no exercício —
  a Lari manda essa explicação/reforço ANTES do desafio (reforça o que já apareceu ou
  adianta de leve o que vem). Escritas as `nota` da **Trilha 1** (8 exercícios) como demo;
  as trilhas 2–10 ainda sem `nota` (campo opcional, não quebra nada). 440 testes passando.
  (Nada commitado ainda.)
- **2026-10-25:** Ajustes de ordem e de formato da resposta no chat. **Ordem**: a `nota`
  do exercício agora vem DEPOIS do enunciado (antes parecia que a Lari explicava o conceito
  e só então apresentava o exercício como novidade). **Gabarito rico (uma mensagem)**: campo
  opcional `gabarito: [...]` (uma linha por saída, já nomeando a operação); quando presente,
  a Lari manda UMA só mensagem com ele, no lugar da frase + gabarito genérico. Escrito o
  `gabarito` do **lei4** como demo ("Saida 1 e Subtracao, entao: 4 - 10 = -6"...). Exercícios
  sem `gabarito` seguem no formato antigo (frase + gabarito genérico por linha). 440 testes
  passando. (Nada commitado ainda.)
- **2026-10-25:** Rollout completo da camada de chat para **TODAS as trilhas**. **`nota`
  por exercício** escrita em todos os exercícios das 10 trilhas (antes só a 1), cada uma
  seguindo o conceito do exercício (mapa em `METODOLOGIA-EXERCICIOS.md`) e vindo DEPOIS do
  enunciado. **`gabarito` rico (uma mensagem, uma linha por saída, nomeando a operação)**
  adicionado a todos os `saidaMultipla` de várias saídas: lei1, lei4, ari1, ari6, boo3,
  boo6, rep1, rep4, lis1, lis7. Validado no navegador (trilha 3 `ari1`: cápsula → enunciado
  → nota → nossa resposta por linha → uma mensagem rica da Lari). 440 testes passando.
  `METODOLOGIA-EXERCICIOS.md` (nova seção "Camada de apresentação: chat com a Lari" + tabela
  de mecânicas + correção do `lei8`) e `LORE.md` atualizados. Commit + push desta rodada.
- **2026-10-25:** Documento da Entrega II atualizado para a direção de jogo: gerado
  `Documento/DevForge_entrega-II_V1.2.docx` (base `Artigos/DevForge-5.4.3.docx`, mesma do
  v1.1). A seção **3.3 Especificação da Solução** ganhou o trecho **"Apresentação em forma
  de jogo"** descrevendo a camada de chat com a Lari (conversa, mini-aula tangencial por
  trilha, nota por exercício, feedback conversacional com dica negociada e resposta por
  linha, minijogos de arrastar — Parsons e fios — tema visual DevForge e layout responsivo),
  deixando claro que a **pedagogia não mudou, só a apresentação**. Também: Tecnologias com
  React Testing Library/jsdom e tema visual próprio; um objetivo novo sobre a experiência
  com cara de jogo; e no **Cap. 4 (4.3)** o "Uso do jogo" passou a descrever a conversa com
  a Lari ao longo da Trilha 1 (8 exercícios) com mini-aulas. Cap. 5 segue só renumerado.
  Validado por XSD. Enviado para análise do Davi. **Nada commitado no Git.**
- **2026-10-25:** **8º tipo (resposta aberta por IA) — mock no app.** Implementado o capstone
  da Trilha 10 como protótipo SEM backend: nova tela isolada `src/jogo/telas/TelaProjetoIA.jsx`
  (reusa o visual do chat), FORA do motor dos 7 tipos fechados. `Jogo.jsx` a renderiza quando
  `exercicio.tipo === 'respostaIA'`. Fluxo: a Lari mostra enunciado + **rubrica**, o aluno
  entrega o código (textarea; aceita link do GitHub), a "IA" devolve feedback estruturado
  (resumo + critério a critério ✓/~/✗ + dicas) e o aluno **revisa e reenvia** (sem perder
  energia) até **aprovado** → **Concluir**. As avaliações vêm de `mockAvaliacoes` no exercício
  (`projetofinal.js`); trocar o mock por um `POST /api/avaliar` (Azure Function + Claude) é a
  única mudança quando o backend existir. Design completo em `DESIGN-TIPO-IA.md`. Testes
  ajustados: o tipo aberto fica fora dos loops de gabarito/render e tem validação própria
  (rubrica + mockAvaliacoes coerentes, última rodada = aprovado). **437 testes passando.**
  Validado no navegador (Trilha 10, fluxo inteiro: quase → aprovado → concluir, XP 100).
  (Nada commitado ainda.)
- **2026-10-27:** **Pivot do uso de IA: chat de dúvidas com o "Albert".** Em vez do
  capstone de código avaliado por IA (em reavaliação), a IA passa a ser um **chat de
  dúvidas** dentro do app. Novo personagem **Albert** (robô sábio e ancião, "da gestão
  anterior" — gag que explica, na lore, o estilo de arte diferente): o aluno pergunta
  sobre o exercício ou a linguagem e ele responde (mock em `TelaChat.jsx`; depois, Claude
  real — mesma decisão de chave do `DESIGN-TIPO-IA.md`). Botão 🧓 ao lado da dica (💡) no
  dock; overlay com ícone real (`public/chat/albert/icone.png`). **Renomeação energia→Vida**:
  a energia de errar exercício virou **Vida** (❤️); e **Energia** (⚡) passou a ser a moeda
  do chat com o Albert (config/HUD/telas/lore). **Dica da Lari custa 1 vida** (não é grátis).
  **Cronômetro** de recarga (24h) aparece no HUD e no overlay quando a energia < máx — **só
  visual** por ora (recarga real fica pro futuro/usuário). **Aviso** no Albert: pergunta fora
  do assunto ou imprópria gasta energia do mesmo jeito. **Intro**: novo quadro (5/7) em que a
  Lari apresenta o Albert, com arte real (`public/quadrinhos/intro/QuadroAlbert.jpeg`). 437
  testes passando. Plano/decisões em `PIVOT-CHAT-OUTRO.md`. (Nada commitado ainda.)
- **2026-10-27:** **Trilha 10 (Projeto Final / capstone `respostaIA`) removida.** Com o pivot
  para o chat de dúvidas com o Albert, o capstone de código avaliado por IA saiu: desregistrado
  em `trilhas/index.js` (bloco agora com **9 trilhas**), removido o branch `respostaIA` e o import
  em `Jogo.jsx`, e **deletados** `src/trilhas/logica/projetofinal.js` e
  `src/jogo/telas/TelaProjetoIA.jsx`. Testes revertidos (sem o split fechados/abertos nem o
  describe do capstone): **434 passando**, catálogo com 9 trilhas, sem erros no console (load
  limpo). A ideia do capstone fica registrada em `DESIGN-TIPO-IA.md` (histórico). (Nada
  commitado ainda.)
- **2026-10-29:** **IA real do Albert ligada** — o chat de dúvidas deixou de ser
  mock e passou a responder de verdade via **API de nuvem**, com a chave
  escondida num backend. **Fornecedor: Gemini** (Google AI Studio, free tier) no
  lugar do Claude para o MVP — a assinatura Claude Pro não dá acesso de API e a
  API da Anthropic é paga; o Gemini tem camada gratuita real. Respeita a decisão
  do TCC ("IA via API de nuvem"), muda só o fornecedor; Claude fica como
  alternativa de 1 linha no `.env`. Ollama/VM Azure avaliados e descartados pro
  MVP (custo de GPU; segue "trabalho futuro"). Nova camada `server/`:
  `iaProvider.mjs` (cérebro agnóstico gemini/claude/mock, Node puro, portável pra
  Azure Function), `albertVitePlugin.mjs` (serve `POST /api/albert` no próprio dev
  server do Vite — um comando, sem 2º terminal nem CORS; sem chave/erro devolve
  503) e `src/ia/albert.js` (cliente do front; backend fora → mock local, chat
  não quebra). Chave em `server/.env` (gitignorada: `*.env` + exceção
  `*.env.example`); modelo `server/.env.example` versionado. Segurança: chave
  nunca no front; ao modelo vai só enunciado/código/tipo (**nunca o gabarito**);
  system prompt impõe scaffolding + texto puro (sem markdown/LaTeX). Modelo
  `gemini-flash-lite-latest` (~4s). Verificado no navegador (Albert responde no
  personagem, recusa dar a resposta, ⚡ cai 1/pergunta). Instalado `jsdom` que
  faltava no `node_modules`. **434 testes passando.** Doc em `server/README.md` e
  `PIVOT-CHAT-OUTRO.md` (seção 8). (Nada commitado ainda.)
- **2026-10-29:** **Albert pronto pra produção no Azure (SWA).** O backend que só
  existia em dev (plugin do Vite) ganhou par de produção: criada a pasta `api/`
  com uma **Azure Function** (modelo Node v4, `api/src/functions/albert.mjs` +
  `host.json` + `package.json`) servindo a mesma rota `/api/albert`. O cérebro
  agnóstico saiu de `server/` para `api/shared/iaProvider.mjs` e é **reusado**
  pelos dois (dev e prod) — sem duplicar lógica; o plugin dev passou a importar de
  lá. Workflow do SWA ajustado: `api_location: "api"`. Assim, no push da `main`, o
  GitHub Actions publica a Function junto com o site. Falta **só** o passo manual
  (não automatizável daqui): pôr `GEMINI_API_KEY`/`IA_PROVIDER`/`GEMINI_MODEL` nas
  *Application settings* do Azure — enquanto não, o site publicado abre e o chat
  cai no mock. Cabe no free tier do SWA. Dev retestado (200/gemini) após a
  mudança; instruções em `server/README.md`. (Nada commitado ainda.)
