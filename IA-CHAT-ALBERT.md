# Chat de dúvidas com IA (Albert) — síntese para o documento do TCC

> Documento-síntese escrito em 2026-10-29 para ser **aproveitado no documento da
> Entrega II**. Reúne, em um lugar só, o quê, o porquê e o como da camada de IA do
> DevForge, já implementada e **em produção**. Fontes técnicas detalhadas:
> `server/README.md` (arquitetura do backend), `PIVOT-CHAT-OUTRO.md` (histórico da
> decisão) e `DESIGN-TIPO-IA.md` (ideia anterior, do capstone, registrada como
> histórico).

## 1. Visão geral

O DevForge ganhou um **chat de dúvidas assistido por IA** dentro do jogo. Enquanto
resolve um exercício, o aluno pode conversar com o **Albert** — um personagem
mentor (robô sábio e ancião) — e perguntar sobre o exercício atual ou sobre a
linguagem (Python). O Albert responde **orientando o raciocínio sem entregar a
resposta pronta**. Cada pergunta custa 1 de **Energia** (⚡), uma moeda do jogo
separada da **Vida** (❤️), que é perdida ao errar exercícios.

Essa é a forma como a IA entra no MVP. Ela substitui a ideia anterior (um 8º tipo
de exercício de "resposta aberta corrigida por IA", o capstone da Trilha 10), que
foi repensada — ver seção 9.

## 2. Fundamentação pedagógica

- **Scaffolding (andaime):** a instrução de sistema dada ao modelo o obriga a
  **orientar e dar pistas, nunca escrever a solução**. Se o aluno pede "a
  resposta", o Albert recusa com gentileza e devolve uma pergunta que o faça
  pensar. Isso preserva a aprendizagem ativa.
- **Human-in-the-loop:** a IA é apoio, não autoridade final. O aluno continua
  decidindo e resolvendo; a correção dos exercícios fechados segue local e
  determinística (gabarito), sem IA.
- **Alinhamento ao TCC:** atende de forma direta o **feedback assistido por IA**
  previsto no projeto (RF15), aplicando o princípio de "apoiar o raciocínio sem
  entregar a resposta" que o documento já defendia.

## 3. Arquitetura

O front **nunca** fala com a IA diretamente. Ele chama um **backend** próprio, que
guarda a chave e conversa com a API de nuvem:

```
React (TelaChat)  →  POST /api/albert  →  responderAlbert()  →  Gemini (nuvem)
  ↑ src/ia/albert.js      ↑ DEV: plugin do Vite                 ↑ chave só aqui
                          ↑ PROD: Azure Function (SWA)
```

- **`src/ia/albert.js`** (front): único ponto que chama `/api/albert`. Se o backend
  estiver fora do ar ou sem chave, cai num **mock local** — o chat nunca quebra.
- **`api/shared/iaProvider.mjs`** (o "cérebro"): **agnóstico de fornecedor**.
  Recebe a pergunta + um resumo do exercício, monta o prompt com a persona do
  Albert e a regra de scaffolding, chama a IA e devolve a resposta. É Node puro,
  reutilizado **igual** em dev e em produção (sem duplicar lógica).
- **Desenvolvimento** — `server/albertVitePlugin.mjs`: serve `POST /api/albert` no
  próprio servidor do Vite (`npm run dev`), sem segundo terminal e sem CORS.
- **Produção** — `api/src/functions/albert.mjs`: uma **Azure Function** (modelo
  Node v4) que serve a mesma rota no Azure Static Web Apps.

A mesma URL (`/api/albert`) e o mesmo cérebro valem nos dois ambientes; muda só a
"casca" que recebe a requisição HTTP.

## 4. Decisões de projeto

- **Fornecedor: Gemini (Google AI Studio), não Claude — no MVP.** O Gemini tem uma
  **camada de API gratuita de verdade** (free tier), enquanto a API da Anthropic é
  paga (e a assinatura Claude Pro **não** dá acesso de API). A decisão do TCC de
  consumir **IA via API de nuvem** é respeitada; muda apenas o fornecedor. O código
  é agnóstico, então trocar para Claude no futuro é mudar uma variável e pôr a
  chave (ver seção 7).
- **Modelo: `gemini-flash-lite-latest`.** Rápido (~4 s por resposta), de baixo
  custo e sempre na versão atual — adequado a um chat de dúvidas de iniciantes.
- **IA local descartada no MVP.** Rodar um modelo local (ex.: Ollama) na máquina
  ou numa VM da Azure foi avaliado e descartado para esta etapa: um modelo de boa
  qualidade exige GPU, cara, que consumiria rápido o crédito de estudante; e
  contraria a decisão escrita ("IA via API de nuvem"). Fica como **trabalho
  futuro**, como o próprio projeto já previa.
- **Chave nunca no front.** Exigência de segurança que motiva a existência do
  backend (seção 5).

## 5. Segurança e privacidade

- **A chave da IA fica só no servidor** (no `.env` em desenvolvimento, nas
  *Application settings* do Azure em produção) — **nunca** no código React, que
  roda no navegador e é visível a qualquer um.
- **O gabarito nunca é enviado à IA.** Ao modelo vai apenas enunciado, código e
  tipo do exercício — nunca a resposta certa — para que a IA não consiga vazá-la,
  nem por acidente.
- **Resposta em texto puro**, sem markdown nem LaTeX, para renderizar limpo no
  chat.
- **Segredo fora do Git:** o `server/.env` é ignorado (`.gitignore`); versiona-se
  apenas o modelo `server/.env.example`, sem valores.

## 6. Deploy e infraestrutura

- **Hospedagem:** Azure Static Web Apps (recurso `MVP-ForgeDev`, grupo
  `rg-devforge`, assinatura **Azure for Students**). O front estático (`dist/`) e a
  Azure Function (`api/`) são publicados juntos.
- **CI/CD:** a cada `push` na `main`, o GitHub Actions (workflow do SWA, com
  `api_location: "api"`) builda e publica tudo automaticamente.
- **Configuração da chave:** feita uma vez nas *Application settings* do SWA
  (não sobe no repositório).
- **Custo:** **US$ 0** — tudo no free tier (SWA com Azure Functions gerenciadas
  incluídas; Gemini no free tier).

## 7. As três variáveis de ambiente

| Variável | O que decide | Valor em produção | Secreta? |
|----------|--------------|-------------------|----------|
| `IA_PROVIDER` | Qual fornecedor de IA usar | `gemini` | Não |
| `GEMINI_MODEL` | Qual modelo do Gemini usar | `gemini-flash-lite-latest` | Não |
| `GEMINI_API_KEY` | Autentica o pedido (prova de acesso) | *(a chave)* | **Sim** |

Resumindo: `IA_PROVIDER` escolhe o **fornecedor**, `GEMINI_MODEL` escolhe o
**modelo**, `GEMINI_API_KEY` **autentica**. Só a terceira é segredo.

## 8. Mapeamento a requisitos do TCC

- **RF15 (feedback de erro assistido por IA):** atendido na forma de chat de
  dúvidas com scaffolding (orienta sem entregar a resposta), com human-in-the-loop.
- **Decisão de arquitetura "IA via API de nuvem":** atendida (Gemini), com a
  ressalva documentada da troca de fornecedor (Claude → Gemini) por disponibilidade
  de free tier.
- **Backend só para a IA** (previsto no planejamento de infraestrutura): implementado
  como Azure Function no mesmo Static Web Apps.

## 9. Limitações e trabalhos futuros

- **Recarga de energia (⚡):** o cronômetro de 24 h é hoje **só visual**; a recarga
  real fica para depois.
- **Troca para Claude:** suportada por configuração (sem mexer no código), quando
  houver conta de API com crédito.
- **RAG:** enviar o material da trilha como contexto para embasar as respostas.
- **Persistência:** o histórico do chat some ao recarregar a página (não há banco
  ainda).
- **Capstone (resposta aberta por IA):** a ideia do 8º tipo fica registrada em
  `DESIGN-TIPO-IA.md` caso seja retomada.

## 10. Status atual (2026-10-29)

**Em produção e verificado:** o Albert responde de verdade (fora do mock) na URL
pública do Static Web Apps. Commit `d47930b` publicado na `main`; deploy do GitHub
Actions concluído; variáveis configuradas no Azure. **434 testes automatizados
passando** (o chat não altera a verificação local dos exercícios).

## 11. Arquivos relevantes

- `src/ia/albert.js` — cliente do front (chama `/api/albert`, com mock de reserva).
- `src/jogo/telas/TelaChat.jsx` — a interface do chat (Lari + overlay do Albert).
- `api/shared/iaProvider.mjs` — o cérebro agnóstico (Gemini/Claude/mock).
- `api/src/functions/albert.mjs` — a Azure Function (produção).
- `server/albertVitePlugin.mjs` — o backend de desenvolvimento (plugin do Vite).
- `server/.env.example` — modelo de configuração (sem valores).
- `server/README.md` — guia técnico do backend (como configurar e publicar).
