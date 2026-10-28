# Design — 8º tipo de exercício: Resposta Aberta avaliada por IA (capstone)

> Documento de **design** (pré-implementação) do último tipo de exercício, o da
> **Trilha 10 (Projeto Final)**. Serve de especificação pra implementação e pra
> documentação formal (Cap. 3.3 / requisitos RF15 feedback por IA, RF20 GitHub).
>
> **Status (2026-10-27):** a Trilha 10 e o mock (`TelaProjetoIA.jsx`, `projetofinal.js`)
> foram **REMOVIDOS** do app — o uso de IA pivotou para um **chat de dúvidas com o
> Albert** (ver `PIVOT-CHAT-OUTRO.md`). Este documento fica como **registro da ideia**
> do capstone, caso seja retomada no futuro.

## 1. Objetivo e onde entra

Na **Trilha 10**, o aluno resolve um **problema real em Python** (no nível da
`Máquina de Bebida` / `Matriz-Ex`), entrega o código (colado ou por **link do
GitHub**) e uma **IA avalia sob uma RUBRICA**, devolvendo feedback que **orienta
sem entregar a resposta** (human-in-the-loop). É o único tipo **aberto** — os
outros 7 são fechados (uma resposta certa).

## 2. Princípios (o que diferencia dos outros 7 tipos)

- **Não é quiz:** não existe "errou, perdeu energia". É **iterativo** — avalia →
  orienta → o aluno revisa → reenvia, quantas vezes quiser.
- **IA como andaime (scaffolding):** aponta o que falta e dá pistas; **nunca**
  escreve a solução pronta.
- **Transparência:** o aluno **vê a rubrica antes de enviar** (sabe como será
  avaliado).
- **Decisão final é humana:** o aluno decide concluir; o professor valida.

## 3. Contrato de dados

### 3.1 Exercício (na trilha)

```js
{
  id: 'pf1',
  tipo: 'respostaIA',
  titulo: 'Projeto final: ...',
  enunciado: 'Enunciado completo do problema em Python.',
  rubrica: [                 // o aluno VÊ isto antes de enviar
    { id: 'r1', criterio: 'Lê os dados de entrada corretamente' },
    { id: 'r2', criterio: 'Usa funções para separar as responsabilidades' },
    { id: 'r3', criterio: 'Trata o caso de erro (ex.: saldo insuficiente)' },
    { id: 'r4', criterio: 'Imprime o resultado no formato pedido' },
  ],
  entrega: ['codigo', 'github'], // formas aceitas de entrega
  dica: '...',
  // SÓ no protótipo sem backend: rodadas de avaliação simuladas
  mockAvaliacoes: [ /* <RespostaIA>, <RespostaIA> */ ],
}
```

### 3.2 Resposta da IA (o que o backend devolve e a UI renderiza)

```js
{
  nivel: 'incompleto' | 'quase' | 'aprovado',   // soft, encorajador (não "nota seca")
  resumo: 'Frase curta e encorajadora sobre o estado geral.',
  criterios: [
    { id: 'r1', atendido: 'sim' | 'parcial' | 'nao', comentario: 'O que a IA observou.' },
    // ... um por critério da rubrica
  ],
  dicas: [ 'O que revisar — ORIENTA, não entrega o código.' ],
  proximoPasso: 'Revisar e reenviar, ou concluir.',
}
```

## 4. Fluxo (dentro do chat da Lari)

1. **Lari apresenta** o projeto (enunciado) e **mostra a rubrica** (os critérios).
2. **Dock de entrega:** uma `textarea` pra colar o código (+ campo opcional de
   **link do GitHub**) e o botão **"Enviar pra avaliação"**.
3. **Ao enviar:** bolha nossa ("mandei meu código") + Lari **"avaliando…"** (loading).
4. **A IA responde** (como mensagens da Lari): `resumo` → **critério a critério**
   (✓ atende / ~ parcial / ✗ não) com comentário → **dicas** → próximo passo.
5. **Loop (human-in-the-loop):** o aluno **revisa e reenvia** quantas vezes quiser;
   cada rodada re-avalia. Em `aprovado` (ou quando o aluno decidir), botão **Concluir**.

## 5. Fronteira do backend (quando for pra valer)

- Front → `POST /api/avaliar` — uma **Azure Function** do próprio Static Web Apps
  (sem fornecedor novo) — com `{ codigo | link, enunciado, rubrica }`.
- A Function chama o **Claude (Anthropic API)** com um prompt de rubrica e pede a
  resposta **em JSON no formato da seção 3.2**.
- A **chave da IA fica SÓ na Function** (nunca no frontend estático).
- No protótipo, o front chama **`avaliarMock()`** local (as `mockAvaliacoes`) no
  lugar do `/api/avaliar`. Trocar o mock pela chamada real é **a única mudança**
  quando o backend existir.
- **Persistência** (salvar progresso/submissões/contas) é **opcional** e separada —
  entraria depois (ex.: Supabase); o 8º tipo **não depende** dela pra funcionar.

## 6. Método da IA (rascunho do prompt)

- **System:** "Você é um tutor de programação. Avalie o código do aluno **contra a
  rubrica**. **NÃO** escreva a solução nem trechos dela. Dê feedback que **oriente**
  o raciocínio. Responda **apenas em JSON** no formato especificado."
- **User:** `{ enunciado, rubrica, código/entrega do aluno }`.
- A Function valida o JSON de volta antes de devolver pro front.

## 7. Impacto no app (isolamento)

- **Tipo isolado:** uma tela própria (`TelaProjetoIA`) que o `Jogo` renderiza quando
  `exercicio.tipo === 'respostaIA'`. **Não mexe** no motor dos 7 tipos fechados
  (`verificar` / vidas / erros continuam iguais) nem nos testes de gabarito.
- **Sem energia/erros** no capstone (é projeto, não quiz) — o loop é livre.
- Reusa o visual do chat (bolhas, avatar da Lari, tema DevForge).

## 8. O que falta pra sair do protótipo

1. Criar a **Azure Function** `/api/avaliar` (proxy do Claude).
2. Trocar `avaliarMock()` pela chamada ao `/api/avaliar`.
3. Definir o **problema real** e a **rubrica final** da Trilha 10 (com o professor).
4. (Opcional) persistência de submissões/progresso.
