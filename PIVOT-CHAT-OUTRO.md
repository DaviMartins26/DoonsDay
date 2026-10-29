# Pivot: chat de dúvidas com "o Outro" (IA)

> Documento que registra uma **mudança de direção** no uso da IA no DevForge,
> para sabermos o que mexer em código e documentação se a ideia vingar.
> Status: **protótipo mockado** (2026-10-27). Decisões ainda em aberto abaixo.

## 1. A mudança

- **Sai** (ou é repensado) o 8º tipo atual — *resposta aberta em Python avaliada
  por IA sob rubrica* (ver `DESIGN-TIPO-IA.md`). No nosso ver, não pareceu promissor.
- **Entra** um **chat de dúvidas** dentro do app: o aluno pergunta sobre **o
  exercício** ou sobre **a linguagem de programação**, e a IA responde ali mesmo.
- **Novo personagem: "o Outro"** — um robô **sábio e ancião**. Ele passa a dar as
  **dicas** (antes era a Lari). A **Lari continua** apresentando os exercícios.
- **Moeda:** cada dúvida custa **1 de energia**. Proposta de renomeação:
  - a **energia atual** (que se perde ao errar exercício) vira **"Vida"**;
  - **"energia"** passa a ser **só a moeda do chat com a IA** (o Outro).

## 2. Estado do protótipo (2026-10-27)

- Overlay **"Falar com o Outro"** dentro da tela de exercício (`TelaChat`).
- Nova moeda **`energiaIA`** separada das vidas (padrão: `ENERGIA_IA_INICIAL = 3`).
  Cada pergunta gasta 1; sem energia, o botão desativa.
- Respostas do Outro **MOCKADAS** (sem backend/API ainda) — mesma abordagem do
  capstone. Trocar o mock pela chamada real ao Claude é a mudança pendente, e
  depende da **mesma decisão de arquitetura** (chamada direta local vs Azure
  Function; ver `DESIGN-TIPO-IA.md` seção 5).
- Avatar do Outro: **placeholder em CSS** (arte real depois).
- **Dica** do exercício agora sai com a cara/nome do **Outro**.
- O que o protótipo **NÃO** fez ainda: a renomeação global energia→Vida.

## 3. Decisões em aberto

- Renomear **energia → Vida** em todo o app (config, HUD, telas de conclusão/
  interrupção, lore)? (ainda não feito).
- `energiaIA`: valor inicial e **como recupera** (acerto? streak? tempo? nunca?).
- A **dica sob demanda** passa a custar `energiaIA` também? (hoje custa 1 da
  energia atual).
- **Manter ou remover** o 8º tipo (capstone) atual.
- Arte e fala do Outro (tom "ancião sábio").

## 4. Se aprovar — o que muda no código

- `config.js`: `ENERGIA_IA_INICIAL`; (futuro) renomear `VIDAS_*` e rótulos.
- `Jogo.jsx`: estado `energiaIA` + handler de gasto; passar ao `TelaChat`.
- `TelaChat.jsx`: HUD da `energiaIA`; overlay do Outro; dica pelo Outro.
- Novo personagem **Outro** (avatares em `public/chat/outro/...` quando houver arte).
- `styles.css`: avatar + overlay do Outro.

## 5. Se aprovar — o que muda na documentação

- `LORE.md`: adicionar o Outro (robô sábio ancião); mover as dicas pra ele;
  manter a Lari nos exercícios.
- `METODOLOGIA-EXERCICIOS.md`: tabela de mecânicas (dica agora é do Outro; energia
  vira moeda do chat; "Vida" vira a antiga energia).
- `CLAUDE.md`: entrada no log.
- `DESIGN-TIPO-IA.md`: marcar o capstone como **repensado/substituído** por este chat.

## 6. Atualização (2026-10-27) — protótipo iterado

Decisões tomadas e já no protótipo:

- Personagem renomeado para **Albert** (robô sábio e ancião).
- **A dica continua com a Lari e agora é GRÁTIS** (alternativa sem custo). Só o
  chat com o Albert gasta energia.
- Botão do Albert (🧓) fica **ao lado do botão de dica** (💡) no dock do exercício.
- **Cronômetro de recarga**: quando a energia fica abaixo do máximo, aparece
  "Nova energia em: 24h" (contagem regressiva — **mock**, ainda não recarrega).
- **Intro**: novo quadro (agora 5/7) em que a Lari apresenta o Albert, com arte
  real (`public/quadrinhos/intro/QuadroAlbert.jpeg`, fonte em `lore/Intro/QuadroAlbert`)
  e fala cômica: ele é "da gestão anterior" (por isso o estilo de arte diferente),
  mas o conhecimento é infinito — ajuda por um preço.
- **Ícone do Albert no chat**: `public/chat/albert/icone.png` (fonte
  `lore/Albert/Icone_albert.jfif`) — robô ancião de bronze, barbudo. Substituiu o
  placeholder ◈ no overlay e nas bolhas do Albert.

Ainda pendente: resposta real do Claude; recarga de verdade (fica pro futuro,
provavelmente definida/gerida pelo usuário); dica some do dock ao ver feedback.

Feito na iteração seguinte: **energia→Vida** (❤️) aplicado nas labels, telas de
conclusão/interrupção e lore; a moeda do Albert é a **Energia** (⚡). A **dica da
Lari custa 1 vida** (não é grátis). Ícones 💡/🧓 centralizados nos botões. O
cronômetro de 24h continua **só visual** (recarga real fica pro futuro). O
**cronômetro aparece no HUD** (🕒) e no overlay quando a energia < máx. O **Albert
avisa** que pergunta fora do assunto ou imprópria gasta energia do mesmo jeito.
A **Trilha 10 (capstone `respostaIA`) foi removida** do app (bloco com 9 trilhas);
a ideia do capstone fica registrada em `DESIGN-TIPO-IA.md`.

## 8. IA real ligada (2026-10-29) — mock substituído por backend + Gemini

A pendência central ("resposta real da IA") foi resolvida. O Albert agora
responde de verdade via API de nuvem, com a chave escondida num backend.

**Decisão de fornecedor:** adotado o **Gemini** (Google AI Studio, free tier)
no lugar do Claude para o MVP. Motivo: o Gemini tem **camada de API gratuita de
verdade** (a assinatura Claude Pro não dá acesso de API; a API da Anthropic é
paga — barata, mas exige conta e cartão). A decisão do TCC ("IA via **API de
nuvem**") é respeitada; muda só o fornecedor. O Claude fica como **alternativa
de 1 linha** no `.env`. Execução local (Ollama/VM) foi avaliada e descartada
para o MVP (custo de hospedar GPU; segue como "trabalho futuro", como já previa
o `CLAUDE.md`).

**Arquitetura (ver `server/README.md`):**
- `server/iaProvider.mjs` — cérebro agnóstico de fornecedor (`gemini`/`claude`/
  `mock`); Node puro, portável pra uma Azure Function depois.
- `server/albertVitePlugin.mjs` — serve `POST /api/albert` no próprio dev server
  do Vite (um comando, sem segundo terminal, sem CORS). Sem chave/erro → `503`.
- `src/ia/albert.js` — cliente do front; se o backend cair, usa o mock local
  (`respostaMockAlbert()`), então o chat nunca quebra.
- Chave em `server/.env` (fora do Git); modelo `server/.env.example` versionado.

**Segurança/pedagogia:** a chave nunca vai ao front. Ao modelo mandamos só
enunciado/código/tipo do exercício — **nunca o gabarito** — e a system prompt
impõe o scaffolding (orientar sem entregar a resposta), em texto puro.

**Modelo:** `gemini-flash-lite-latest` (rápido ~4s, sempre atual). Verificado no
navegador: Albert responde no personagem e recusa dar a resposta pronta; a
energia (⚡) cai 1 por pergunta. 434 testes passando.

Produção (Azure SWA) já preparada: pasta `api/` com a Azure Function servindo
`/api/albert` (mesmo cérebro `api/shared/iaProvider.mjs`), `api_location: "api"`
no workflow. No push da `main` a Function é publicada; falta só pôr a chave nas
*Application settings* do Azure (ver `server/README.md`).

Pendente ainda: configurar a chave no Azure; recarga real de energia; documentar
a troca Claude→Gemini no documento da Entrega II.

## 7. Prompt de concept art do Albert (Gemini)

> Rodar no Gemini usando a arte da Lari como **referência de estilo** (mesmo mundo).

```
Character concept art of "Albert", an ancient, wise, sleepy robot mentor, for the
game DevForge. Match the clean flat cartoon/comic style, line work and lighting of
the existing "Lari" robot (use Lari's art as the style reference — same universe).

Albert is a large, old, dusty robot: bulky rounded body, slightly worn amber-bronze
plating, a long "beard" of frayed cables/wires, heavy-lidded glowing eyes (half
asleep), a tiny "Zzz" sleep bubble, a dim low-battery vibe. Personality: venerable,
gentle, a sleepy sage grandfather.

Palette: DevForge dark lab — deep navy background, neon cyan (#35d6e8) accents and
warm amber (#f4ab3c) glow; high contrast and colorblind-friendly (readable by shape
and brightness, not only hue).

Deliver a character reference/turnaround sheet: full-body front view in a neutral
pose on a plain simple background, plus two head expressions — "sleeping" (eyes
closed, Zzz) and "awake/wise" (eyes glowing, alert). No text, no watermark.
```
