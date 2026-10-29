# Backend da IA (chat de dúvidas com o Albert)

Este diretório guarda o **backend que esconde a chave da IA** e responde às
dúvidas do aluno no chat com o Albert. Decisão do TCC: a IA é consumida via
**API de nuvem** e a **chave nunca fica no front-end** (navegador) — ela vive só
aqui, no servidor.

## Como funciona

```
React (TelaChat)  →  POST /api/albert  →  responderAlbert()  →  Gemini / Claude
  ↑ src/ia/albert.js      ↑ DEV: server/albertVitePlugin.mjs      (API de nuvem)
                          ↑ PROD: api/ (Azure Function no SWA)
```

O **mesmo cérebro** (`api/shared/iaProvider.mjs`) é usado nos dois ambientes —
nenhuma lógica de IA é duplicada:

- **`api/shared/iaProvider.mjs`** — o cérebro, **agnóstico de fornecedor**.
  Recebe a pergunta + um resumo do exercício e devolve a resposta do Albert.
  Escolhe o destino por variável de ambiente (`IA_PROVIDER`): `gemini` (padrão),
  `claude` ou `mock`. Node puro (sem Vite, sem navegador).
- **DEV — `server/albertVitePlugin.mjs`** — plugin do Vite que serve `POST
  /api/albert` no próprio dev server (um comando: `npm run dev`, sem segundo
  terminal e sem CORS). Lê o `server/.env`, chama o cérebro e devolve JSON.
- **PROD — `api/`** — uma **Azure Function** (SWA) que serve a mesma rota
  `/api/albert` (`api/src/functions/albert.mjs`). A chave vem das *Application
  settings* do Azure (`process.env`), não de arquivo.
- Em ambos: erro/sem chave → `503`, e o front cai no mock (não quebra).
- **`src/ia/albert.js`** (no front) — único ponto que fala com o backend. Se o
  backend estiver fora, usa `respostaMockAlbert()`. A mesma URL `/api/albert`
  funciona em dev e em produção.

## Configurar a chave (uma vez por máquina)

1. Copie o modelo: `cp server/.env.example server/.env` (o `.env` real **não**
   vai pro Git).
2. Gere a chave grátis em <https://aistudio.google.com/apikey> e cole em
   `GEMINI_API_KEY`.
3. `npm run dev` — pronto, o Albert responde de verdade.

> Só mandamos ao modelo o **enunciado/código/tipo** do exercício — **nunca o
> gabarito** — pra IA não ter como vazar a resposta certa.

## Trocar de fornecedor

Só mexe no `server/.env`, **nenhuma tela muda**:

| Quero | `.env` |
|-------|--------|
| Gemini (padrão, free tier) | `IA_PROVIDER=gemini` + `GEMINI_API_KEY=...` |
| Claude (precisa crédito) | `IA_PROVIDER=claude` + `ANTHROPIC_API_KEY=...` |
| Sem IA (só o mock) | `IA_PROVIDER=mock` (ou deixe sem chave) |

Modelo do Gemini: `GEMINI_MODEL` (padrão `gemini-flash-lite-latest` — rápido e
sempre atual).

## Produção no Azure Static Web Apps

A Function já está pronta na pasta `api/` e o workflow já aponta `api_location:
"api"`. Ao dar push na `main`, o GitHub Actions builda e publica a Function
junto com o site. Falta **só configurar a chave no Azure** (uma vez):

1. Portal do Azure → seu Static Web App → **Settings → Environment variables**
   (ou "Configuration" / "Application settings").
2. Adicione:
   - `GEMINI_API_KEY` = sua chave do AI Studio
   - `IA_PROVIDER` = `gemini`
   - `GEMINI_MODEL` = `gemini-flash-lite-latest`
3. Salve. (Pelo CLI: `az staticwebapp appsettings set -n <nome> --setting-names
   GEMINI_API_KEY=... IA_PROVIDER=gemini GEMINI_MODEL=gemini-flash-lite-latest`.)

Pronto: o Albert responde em produção. O `server/.env` é só pra desenvolvimento
e **não** sobe pro Azure (é gitignorado). Tudo cabe no **free tier** do SWA
(Functions gerenciadas incluídas).

> Enquanto a chave não estiver nas settings do Azure, o site publicado ainda
> abre e o chat **cai no mock** (não quebra) — só não responde de verdade.
