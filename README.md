# DevForge

MVP (produto mínimo viável) da plataforma proposta no TCC **DevForge** —
Bacharelado em Engenharia de Software, PUCPR, 2026. Autores: Davi Noel Martins
Mundt, Giovani Tortato e Joshua Mendes. Orientadora: Sofia Marshallowitz.

DevForge é uma **plataforma web gamificada de apoio ao ensino de programação**
para iniciantes, inspirada no modelo de retenção do Duolingo, em que **todos os
exercícios de uma trilha são apresentados em forma de história**, conduzida por
personagens. A proposta completa está no `DevForge-TCC.pdf`.

> Este README é o **gabarito do funcionamento do projeto**: explica, passo a
> passo, o que cada parte faz e como as peças se conversam. Para o histórico de
> decisões e o backlog, veja o `CLAUDE.md`; para a metodologia pedagógica, os
> arquivos `METODOLOGIA-TRILHA1.md` e `METODOLOGIA-EXERCICIOS.md`; para a camada
> de IA, o `IA-CHAT-ALBERT.md` e o `server/README.md`.

## Estado atual do MVP

- **Bloco de Lógica de Programação:** catálogo de **9 trilhas temáticas** (uma por
  assunto da ementa de Raciocínio Algorítmico), com **8 exercícios cada = 72
  exercícios** em Python.
- **Apresentação em forma de jogo:** resolver um exercício é uma **conversa com a
  Lari** (a guia), com quadrinhos de abertura e de início/fim da Trilha 1,
  mini-aulas, minijogos de arrastar e um visual de laboratório.
- **Correção local e determinística:** os 7 tipos de exercício são corrigidos no
  próprio navegador (sem IA, sem servidor), e uma suíte de testes (`npm test`,
  **434 testes**) valida o gabarito de todos eles.
- **Chat de dúvidas com IA (o Albert):** a única parte que usa servidor. O aluno
  tira dúvidas com um mentor de IA que **orienta sem entregar a resposta**. Já no
  ar no Azure, respondendo de verdade via Gemini. Ver seção
  [O chat de dúvidas com o Albert](#o-chat-de-dúvidas-com-o-albert-ia).

---

## Tecnologias

| Tecnologia | Para que serve |
|------------|----------------|
| **React 18** | Biblioteca de interface: cada tela e cada campo de exercício é um componente React. |
| **Vite 5** | Ferramenta de build e servidor de desenvolvimento (o `localhost`). |
| **JavaScript (ES Modules)** | Linguagem do projeto. Sem TypeScript por enquanto. |
| **Vitest + React Testing Library + jsdom** | Testes automatizados (gabarito e renderização dos exercícios). |
| **Backend (plugin Vite em dev / Azure Function em produção)** | Esconde a chave da IA e expõe a rota `/api/albert`. |
| **Gemini (Google AI Studio)** | API de nuvem que responde o chat do Albert (free tier). |

A correção dos exercícios roda no navegador (sem banco e sem servidor); as
respostas e a pontuação vivem só na memória da página (ao recarregar, recomeça). A
**exceção** é o chat do Albert, que chama um backend em `/api/albert` — a chave da
IA fica só no backend, nunca no navegador.

---

## Como rodar

**Pré-requisito:** [Node.js](https://nodejs.org) versão 18 ou superior.

Na primeira vez em cada máquina:

- **Windows (PowerShell):** `./start.ps1`
- **Linux / macOS:** `bash start.sh`

Os scripts instalam as dependências (só na primeira vez) e sobem o servidor.
Depois, para subir de novo: `npm run dev`. A aplicação abre em
**http://localhost:5173**.

Testes automatizados (validam o gabarito de todos os exercícios):

```bash
npm test
```

> A pasta `node_modules/` não é versionada (`.gitignore`). Em máquina nova, rode a
> instalação uma vez — os scripts acima já cuidam disso.

---

## Como funciona — o fluxo, passo a passo

Toda a aplicação vive numa página só: o React troca o que está na tela conforme o
**estado** muda. Quem comanda essa troca em dois níveis:

- **`App.jsx` = o orquestrador do SITE.** Decide a sequência geral (abertura →
  catálogo → intro da trilha → jogo).
- **`Jogo.jsx` = o motor de UMA trilha.** Só entra depois de escolher a trilha;
  cuida do estado da partida e decide qual tela mostrar dentro do jogo.

### 1. `App.jsx` — a navegação geral

O `App` guarda três pedaços de estado (`useState`) e, a cada render, decide qual
tela devolver, nesta ordem:

1. **Abertura (ainda não vista)** → mostra `<Quadrinho roteiro={abertura} />` — o
   quadrinho da lore em que a Lari apresenta a DevForge. Ao finalizar/pular,
   marca `viuAbertura` e segue.
2. **Nenhuma trilha escolhida** → mostra `<TelaCatalogo />` com as trilhas do
   bloco. Clicar em "Começar" guarda o `trilhaId` escolhido.
3. **A trilha tem intro e ela ainda não foi vista nesta sessão** → mostra
   `<Quadrinho>` com a intro da trilha (hoje só a Trilha 1 tem, pelo mapa
   `INTROS`). Visto uma vez, fica guardado em `introsVistas`.
4. **Caso contrário** → mostra `<Jogo trilha={escolhida} />`, passando também o
   quadrinho de fechamento (`roteiroFinal`, pelo mapa `FINAIS`) e um `aoVoltar`
   que zera o `trilhaId` (voltar ao catálogo).

Os mapas `INTROS` e `FINAIS` ligam o id de uma trilha ao seu quadrinho de
início/fim — adicionar narrativa a outra trilha é só criar o roteiro e pôr uma
linha nesses mapas.

### 2. `Quadrinho.jsx` — o motor dos quadrinhos

É o **motor** que desenha a história; o **roteiro** (os dados) vem de arquivos
como `abertura.js`. O roteiro é uma lista de **quadros**, cada um com a imagem, a
descrição e os **balões** de fala — e cada balão diz **quem** fala, **onde** na
imagem (posição `x`, `y`, largura `w`) e **o quê** (`texto`, em PT e EN). O
`Quadrinho` mostra um quadro por vez; os botões **Anterior/Próximo** navegam, o
**Pular** encerra e há um botão **PT/EN** que troca o idioma sem trocar a imagem
(o texto fica fora do desenho). Se um quadro não tem imagem, mostra um
placeholder.

### 3. `TelaCatalogo.jsx` — escolher a trilha

Recebe a lista de trilhas (de `trilhas/index.js`) e desenha um **cartão** por
trilha, com **título** e **descrição**; o clique em "Começar" avisa o `App` qual
`id` foi escolhido.

### 4. `Jogo.jsx` — o motor de uma trilha

Recebe **uma trilha** por prop e cuida de **todo o estado da partida**:

- qual exercício está ativo (`indice`), a `resposta` atual, o `resultado` (ainda
  respondendo = `null`, acertou = `true`, errou = `false`) e quantos erros houve
  no exercício;
- os indicadores que **não** reiniciam entre exercícios: **Vida**, **Energia**,
  **streak** e **XP**;
- os controles da **dica sob demanda** (`confirmandoDica`, `dicaPedida`).

Quando o usuário verifica, `aoVerificar` pergunta ao **registro** se a resposta
está certa e atualiza XP/streak/erros/Vida. `aoAvancar` passa ao próximo exercício
(ou finaliza a trilha). No fim do render, o `Jogo` **escolhe a tela** a mostrar:

- Vida chegou a zero → `<TelaLicaoInterrompida>`;
- terminou a trilha e há quadrinho de fechamento ainda não visto →
  `<Quadrinho roteiroFinal>`; depois → `<TelaConclusao>`;
- caso normal → `<TelaChat>` (a conversa com a Lari).

Repare: o `Jogo` **não conhece os tipos** de exercício. Ele fala com o **registro**
(`exercicios/registro.jsx`) para verificar a resposta e desenhar o campo, e pega
os números de dificuldade de `config.js`.

### 5. `TelaChat.jsx` — a apresentação (conversa com a Lari)

É a tela onde o aluno passa o tempo. Ela **só apresenta**; a lógica da partida
continua no `Jogo`. Para não ficar gigante, foi dividida em peças na pasta
`jogo/telas/chat/`:

- **`useChatLari.js`** (custom hook) — guarda as mensagens da conversa e decide
  quando a Lari manda o enunciado, a mini-aula, a dica e o feedback de
  certo/errado.
- **`useAlbert.js`** (custom hook) — toda a lógica do chat de dúvidas do Albert.
- **`componentes.jsx`** — pecinhas visuais reusadas: `Avatar`, `Mensagem`,
  `IndicadorDigitando`.
- **`AlbertOverlay.jsx`** — a janela do chat do Albert.
- **`chatUtils.js`** — funções puras e constantes (falas da Lari, formatação).

O `TelaChat` em si virou um "montador" fino: chama os dois hooks e desenha o
cabeçalho com o HUD (**❤️ Vida · ⚡ Energia · 🔥 streak · ✦ XP**), a conversa e o
rodapé (o campo de resposta + botões). O campo de resposta é o **`CampoResposta`**
do registro, então os 7 tipos funcionam dentro do chat sem alteração.

### 6. `exercicios/registro.jsx` — o despachante (a cola)

É a ponte entre o **conteúdo** (a trilha) e a **lógica** (os tipos). Tem um mapa
`REGISTRO = { tipo → módulo }` e funções que **delegam** ao módulo certo pelo
`exercicio.tipo`: `verificar`, `respostaInicial`, `temResposta` e o componente
`CampoResposta` (que escolhe e desenha o campo do tipo). Assim o motor e a tela
trabalham com **qualquer tipo sem conhecê-los**: adicionar um tipo = 1 import + 1
linha no mapa.

### 7. `exercicios/` — os tipos (a lógica de cada exercício)

Cada tipo é um arquivo que exporta tudo dele: o componente **`Campo`** (como
responder), **`verificar`** (como conferir), **`respostaInicial`** e
**`temResposta`**. É aqui que mora o "como o exercício funciona".

### 8. `trilhas/` — o conteúdo (dados, não lógica)

As trilhas em `trilhas/logica/` são **dados puros**: cada arquivo (ex.:
`leitura.js`) é uma lista de exercícios com o que cada um **pergunta**
(`enunciado`, `codigo`), o **tipo**, o **gabarito**, a **dica**, os **feedbacks**
de acerto/erro e campos opcionais da narrativa (`aula`, `nota`, `gabarito`). Elas
**não têm comportamento** — adicionar/remover exercício é editar esses dados. O
`trilhas/index.js` junta todas as trilhas e monta o bloco/catálogo.

### Resumo do fluxo em uma linha

`App` (abertura → catálogo) → escolhe a trilha → `App` monta o `Jogo(trilha)` → o
`Jogo` (motor) mostra o `TelaChat` → a tela pede ao `registro` o campo do `tipo` do
exercício → o `registro` pega o módulo em `exercicios/`. O conteúdo (trilha) é
**dado**; a lógica (tipos + motor) é separada.

---

## Mecânicas de jogo

Dois "recursos" (moedas) diferentes:

- **Vida (❤️):** perde-se ao **errar** exercício e ao pedir uma **dica** à Lari.
- **Energia (⚡):** moeda **exclusiva** do chat de dúvidas com o Albert.

Regras (todas calibráveis em **`src/config.js`**):

- **Só avança ao acertar.** Errando, continua no mesmo exercício e pode tentar de
  novo.
- **Vida:** começa em `VIDAS_INICIAIS` (10) e cai 1 a cada `ERROS_PARA_PERDER_VIDA`
  (3) erros no mesmo exercício — ou seja, a perda começa no **3º erro**. Ao zerar,
  a **lição é interrompida**. Não reinicia entre exercícios.
- **Streak:** sobe a cada acerto, zera ao errar.
- **XP:** ao acertar, ganha `XP_BASE` (100) menos `XP_PENALIDADE_ERRO` (25) por erro
  (piso `XP_MINIMO` = 10), **mais** `XP_BONUS_POR_STREAK` (10) × streak.
- **Feedback progressivo ao errar:** erros 1–2 só "errado"; a partir de
  `ERROS_PARA_DICA` (3) mostra a **dica**; a partir de `ERROS_PARA_RESPOSTA` (4)
  mostra a **resposta completa** (`feedbackErrado`).
- **Dica sob demanda:** o aluno pode pedir a dica na conversa; custa **1 Vida**
  (com confirmação na própria página).
- **Coloração:** nas questões de escolha, **ao acertar** a opção certa fica verde e
  as outras vermelhas; **ao errar, nada é revelado**.
- **Energia (Albert):** cada pergunta custa 1 ⚡ (`ENERGIA_IA_INICIAL` = 3). Quando
  abaixo do máximo, aparece um cronômetro de recarga de 24h — **só visual** por ora.

```js
export const VIDAS_INICIAIS = 10        // Vida inicial (erros + dica)
export const ERROS_PARA_PERDER_VIDA = 3 // perde 1 Vida a cada 3 erros no exercício
export const XP_BASE = 100              // XP por exercício acertado sem erro
export const XP_PENALIDADE_ERRO = 25    // desconto de XP por erro
export const XP_MINIMO = 10             // piso de XP ao acertar
export const XP_BONUS_POR_STREAK = 10   // XP extra por nível de streak
export const ERROS_PARA_DICA = 3        // nº de erros para mostrar a dica
export const ERROS_PARA_RESPOSTA = 4    // nº de erros para mostrar a resposta
export const ENERGIA_IA_INICIAL = 3     // Energia inicial (chat com o Albert)
```

---

## Os 7 tipos de exercício

A correção é **local** (sem IA). Cada tipo é um arquivo em `exercicios/`:

1. **Múltipla escolha** (`multipla`) — escolher uma entre várias opções.
2. **Preenchimento de lacuna** (`lacuna`) — digitar o trecho que falta (ex.:
   `return`).
3. **Prever a saída** (`saidaMultipla`) — o código imprime vários valores; o aluno
   preenche cada saída, em ordem, em caixas separadas (todas precisam estar certas).
4. **Encontrar o erro** (`acharErro`) — apontar qual linha do código está incorreta.
5. **Associação / fios** (`associacao`) — ligar cada item ao resultado certo
   **arrastando um fio**; a lista inclui distratores (respostas falsas).
6. **Casos contrastantes** (`contrastantes`) — escolher, entre versões quase
   idênticas de um código, a correta.
7. **Parsons (reordenar)** (`parsons`) — reordenar linhas embaralhadas **arrastando**
   até formar um programa correto (aceita mais de uma ordem válida quando couber).

> O 8º tipo antes previsto (resposta aberta corrigida por IA, o "Projeto Final")
> foi **repensado**: no lugar dele, a IA do projeto virou o **chat de dúvidas com o
> Albert**. A ideia do capstone fica registrada em `DESIGN-TIPO-IA.md`.

---

## O chat de dúvidas com o Albert (IA)

O **Albert** é um mentor de IA (um robô ancião) com quem o aluno tira dúvidas sobre
o exercício ou a linguagem. Ele responde dando **suporte ao raciocínio** (explica o
conceito e dá um exemplo paralelo), **sem nunca entregar a resposta do exercício** —
e cada pergunta custa **1 de Energia (⚡)**.

**Arquitetura (a chave nunca fica no navegador):**

```
React (TelaChat) → POST /api/albert → responderAlbert() → Gemini (nuvem)
  ↑ src/ia/albert.js    ↑ DEV: plugin do Vite (server/)   ↑ chave só aqui
                        ↑ PROD: Azure Function (api/)
```

- **`src/ia/albert.js`** — o único ponto do front que chama `/api/albert`. Se o
  backend estiver fora do ar, cai num **mock local** — o chat nunca quebra.
- **`api/shared/iaProvider.mjs`** — o "cérebro" agnóstico de fornecedor (monta o
  prompt com a persona do Albert e a regra de suporte, chama a IA). É Node puro,
  **reusado igual** em desenvolvimento e produção.
- **Desenvolvimento:** `server/albertVitePlugin.mjs` serve `/api/albert` no próprio
  servidor do Vite (sem 2º terminal, sem CORS).
- **Produção:** `api/src/functions/albert.mjs`, uma Azure Function no Azure Static
  Web Apps.

**Segurança:** a chave da IA fica só no servidor; **o gabarito nunca é enviado à
IA** (vai só enunciado, código e tipo); a resposta vem em texto puro. Detalhes em
`IA-CHAT-ALBERT.md` e `server/README.md`.

---

## Estrutura de pastas

```
index.html / vite.config.js / package.json / start.ps1 / start.sh
README.md                 — este gabarito de funcionamento
CLAUDE.md                 — contexto, decisões, status e backlog
METODOLOGIA-TRILHA1.md    — metodologia pedagógica (Cap. 3.3)
METODOLOGIA-EXERCICIOS.md — mapa fonte (1º período) → cada exercício
IA-CHAT-ALBERT.md         — síntese da camada de IA (Albert)

src/
  main.jsx                — ponto de entrada: monta o React na página
  App.jsx                 — RAIZ: navegação geral (abertura → catálogo → jogo)
  config.js               — parâmetros de dificuldade (Vida, Energia, erros, XP)
  styles.css              — tema visual DevForge

  jogo/                   — MOTOR + telas (independente do conteúdo)
    Jogo.jsx              — estado da partida e escolha da tela
    telas/
      TelaCatalogo.jsx        — escolher a trilha
      TelaChat.jsx            — apresentação: conversa com a Lari (montador)
      TelaConclusao.jsx       — fim da trilha (XP, Vida restante)
      TelaLicaoInterrompida.jsx — Vida zerou
      TelaExercicio.jsx       — tela clássica (reserva, não usada hoje)
      chat/                   — peças do chat
        chatUtils.js          — funções puras + constantes
        componentes.jsx       — Avatar, Mensagem, IndicadorDigitando
        useChatLari.js        — hook da conversa com a Lari
        useAlbert.js          — hook do chat de dúvidas do Albert
        AlbertOverlay.jsx     — a janela do Albert

  exercicios/             — TIPOS de exercício (a lógica)
    registro.jsx          — mapa tipo → módulo + CampoResposta (o despachante)
    multipla.jsx, lacuna.jsx, saidaMultipla.jsx, acharErro.jsx,
    associacao.jsx, contrastantes.jsx, parsons.jsx
    util.js               — utilitário compartilhado (normalizar texto)
    __tests__/            — exercicios.test.js (gabarito) + render.test.jsx

  trilhas/                — CONTEÚDO (dados das trilhas)
    index.js              — junta as 9 trilhas e monta o catálogo
    logica/               — uma trilha por arquivo (leitura, tipos, aritmetica,
                            booleanos, condicoes, repeticao, listas, funcoes,
                            boaspraticas)

  quadrinhos/             — a narrativa
    Quadrinho.jsx         — motor dos quadrinhos (imagem + balões + navegação)
    abertura.js, trilha1-intro.js, trilha1-final.js — roteiros (dados)

  ia/
    albert.js             — cliente do front (chama /api/albert, com mock de reserva)

api/                      — backend de PRODUÇÃO (Azure Function) + cérebro agnóstico
server/                   — backend de DESENVOLVIMENTO (plugin do Vite) + README
```

### As três camadas

O código separa **motor** (`jogo/`), **tipos** (`exercicios/`) e **conteúdo**
(`trilhas/`). Cada uma cresce sem mexer nas outras, ligadas pelo `registro`. Essa
separação **dados × lógica** é o coração da arquitetura.

---

## Como adicionar ou alterar

- **Exercício novo numa trilha:** edite o arquivo da trilha em `trilhas/logica/`
  (ex.: `leitura.js`) e adicione o objeto do exercício no array `exercicios`, na
  posição desejada.
- **Tipo de exercício novo:** copie um arquivo de `exercicios/` como modelo, ajuste
  o `Campo` e as funções, e registre-o em `exercicios/registro.jsx` (1 linha no
  mapa). Nenhum outro arquivo precisa mudar.
- **Trilha nova:** crie o arquivo em `trilhas/logica/` e inclua-o no array de
  `trilhas/index.js`.

---

## Testes

`npm test` roda a suíte (Vitest + React Testing Library + jsdom), com **434
testes** em dois arquivos:

- `exercicios/__tests__/exercicios.test.js` — percorre **todos** os exercícios de
  **todas** as trilhas e confere: campos obrigatórios, ids únicos e, o principal,
  que a **resposta certa passa** e uma **resposta errada falha** em `verificar()`.
- `exercicios/__tests__/render.test.jsx` — monta o campo (`CampoResposta`) de cada
  exercício, garantindo que todos renderizam sem erro.

---

## Próximos passos

O MVP cobre o Bloco de Lógica (9 trilhas) com a apresentação em forma de jogo e o
chat de dúvidas por IA. Os demais requisitos do TCC (contas e login, ranking,
conquistas, histórico, persistência de progresso, entre outros) estão listados,
com o status, no **`CLAUDE.md`**.
