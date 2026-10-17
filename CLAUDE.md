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
