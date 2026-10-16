# DevForge

MVP (produto mínimo viável) da plataforma proposta no TCC **DevForge** —
Bacharelado em Engenharia de Software, PUCPR, 2026. Autores: Davi Noel Martins
Mundt, Giovani Tortato e Joshua Mendes. Orientadora: Sofia Marshallowitz.

DevForge é uma **plataforma web gamificada de apoio ao ensino de programação**
para iniciantes, inspirada no modelo de retenção do Duolingo. O conteúdo é
organizado em **trilhas** de exercícios de dificuldade crescente e de tipos
variados. A proposta completa está no arquivo `DevForge-TCC.pdf`, na raiz do
repositório.

Este repositório contém a **primeira fatia funcional**: uma trilha de exemplo
com um exercício de cada tipo, com vidas, sequência de acertos (streak) e XP.
Ainda **não há backend nem Inteligência Artificial** nesta etapa — a correção é
feita localmente, no navegador.

---

## Tecnologias

| Tecnologia | Para que serve |
|------------|----------------|
| **React 18** | Biblioteca de interface (componentes das telas e dos exercícios). |
| **Vite 5** | Ferramenta de build e servidor de desenvolvimento (o `localhost`). |
| **JavaScript (ES Modules)** | Linguagem do projeto. Sem TypeScript por enquanto. |
| **HTML + CSS mínimo** | Layout propositalmente cru, quase sem estilo. |

Não há banco de dados, servidor próprio nem chamadas de rede: tudo roda no
navegador. As respostas e a pontuação vivem apenas na memória da página (ao
recarregar, tudo recomeça).

---

## Como rodar

**Pré-requisito:** [Node.js](https://nodejs.org) versão 18 ou superior.

Na primeira vez em cada máquina, instale as dependências e suba o servidor com o
script pronto:

- **Windows (PowerShell):** `./start.ps1`
- **Linux / macOS:** `bash start.sh`

Os scripts instalam as dependências (só na primeira vez) e iniciam o servidor.
Depois disso, para subir de novo basta:

```bash
npm run dev
```

A aplicação abre em **http://localhost:5173**.

> A pasta `node_modules/` não é versionada (está no `.gitignore`). Por isso, em
> uma máquina nova, rode a instalação uma vez — os scripts acima já cuidam disso.

---

## Como funciona

A trilha é uma sequência linear de exercícios. O usuário resolve um de cada vez.

- **Só avança ao acertar.** Enquanto a resposta estiver errada, o usuário
  permanece no mesmo exercício e pode tentar de novo. O botão "Próximo" só
  aparece depois do acerto.
- **Vidas.** O usuário começa com um número fixo de vidas (padrão: 3). A cada
  dois erros no mesmo exercício, perde uma vida. Ao chegar a zero, a **lição é
  interrompida**. As vidas **não** são reiniciadas entre os exercícios.
- **Streak (sequência de acertos).** Começa em zero e sobe a cada acerto. Zera
  no primeiro erro. É um indicador de constância.
- **XP (pontos de experiência).** A cada exercício acertado, o usuário ganha XP:
  um valor base menos um desconto por cada erro cometido naquele exercício (com
  um piso garantido), mais um bônus proporcional ao streak atingido. O total
  aparece durante a trilha e na tela final.
- **Dicas (feedback progressivo).** Ao errar, o retorno não entrega a resposta
  de cara: nos primeiros erros só avisa que errou; a partir de certo número de
  erros mostra uma **dica** simples; e, com mais erros, mostra a **explicação
  completa**. (Esquema temporário de MVP; a regra final do TCC será definida
  depois.)
- **Teclado.** Nos exercícios de escolha (as "bolinhas"), as setas navegam entre
  as opções e **Tab** leva direto ao botão **Verificar** — pensado para quem usa
  só o teclado.

Todos esses parâmetros ficam em **`src/config.js`** e são fáceis de ajustar:

```js
export const VIDAS_INICIAIS = 3          // vidas iniciais
export const ERROS_PARA_PERDER_VIDA = 2  // a cada 2 erros, -1 vida
export const XP_BASE = 100               // XP por exercício acertado sem erro
export const XP_PENALIDADE_ERRO = 25     // desconto de XP por erro
export const XP_MINIMO = 10              // piso de XP ao acertar
export const XP_BONUS_POR_STREAK = 10    // XP extra por nível de streak
export const ERROS_PARA_DICA = 4         // nº de erros para liberar a dica
export const ERROS_PARA_RESPOSTA = 5     // nº de erros para mostrar a resposta
```

---

## As telas

A aplicação tem, por enquanto, três telas (todas na mesma página, trocadas
conforme o estado do jogo):

1. **Tela do exercício** — é onde o usuário passa a maior parte do tempo. Mostra,
   no topo, os indicadores (**Vidas | Streak | XP**) e a posição na trilha
   ("Exercício 3 de 7"). Abaixo vêm o enunciado, o código (quando houver), o
   campo de resposta (que muda conforme o tipo do exercício) e o botão
   **Verificar**. Depois de verificar:
   - se **acertou**, aparece o feedback positivo e o botão **Próximo** (ou **Ver
     resultado**, no último exercício);
   - se **errou**, aparece o feedback (que vai de só "errado" a dica e, depois, à
     resposta, conforme o número de erros) e o botão **Tentar de novo**, que
     devolve o exercício para nova tentativa.
2. **Tela "Lição interrompida"** — exibida quando as vidas chegam a zero. Mostra
   o XP acumulado e um botão **Recomeçar**.
3. **Tela de conclusão** — exibida ao terminar a trilha. Mostra o **XP total** e
   as **vidas restantes**, com um botão **Recomeçar**.

---

## Tipos de exercício

A trilha de exemplo traz um exercício de cada tipo. A correção de todos é local
(sem IA). O 8º tipo previsto no TCC — **resposta aberta corrigida por IA** —
ainda não foi incluído (depende da integração com a IA; ver o `CLAUDE.md`).

1. **Múltipla escolha** — o usuário escolhe uma entre várias opções.
2. **Preenchimento de lacuna** — o usuário digita o trecho que falta no código
   (por exemplo, a palavra-chave `return`).
3. **Prever a saída** — o código imprime vários valores; o usuário preenche cada
   saída, em ordem, em caixas separadas. Todas precisam estar certas.
4. **Encontrar o erro** — o usuário aponta qual linha do código está incorreta.
5. **Associação** — o usuário relaciona cada item ao resultado certo (hoje:
   pequenas expressões Python, como `len("casa")`, à sua saída). A lista de
   opções inclui distratores (respostas falsas) para reduzir o acerto por
   eliminação.
6. **Casos contrastantes** — são mostradas várias versões quase idênticas de um
   mesmo código; o usuário escolhe a correta.
7. **Parsons (reordenar)** — o usuário reordena linhas de código embaralhadas até
   formar um programa correto, usando os botões "subir" e "descer".

---

## Estrutura de pastas

```
index.html               — HTML base que carrega o React
vite.config.js           — configuração do Vite
package.json             — dependências e scripts (dev, build, preview)
start.ps1 / start.sh     — scripts para subir o localhost
.claude/launch.json      — configuração do preview usado no Claude Code

src/
  main.jsx               — ponto de entrada: monta o React na página
  App.jsx                — raiz: escolhe a trilha e entrega ao motor do jogo
  config.js              — parâmetros de dificuldade (vidas, erros, XP, dicas)
  styles.css             — estilo mínimo

  jogo/                  — MOTOR do jogo (regras e telas), independente do conteúdo
    Jogo.jsx             — estado (vidas, streak, XP, dicas) e escolha da tela
    telas/               — TelaExercicio, TelaLicaoInterrompida, TelaConclusao

  exercicios/            — TIPOS de exercício (extensível)
    registro.jsx         — mapa tipo → módulo + CampoResposta (o "despachante")
    multipla.jsx, lacuna.jsx, ...   — um arquivo por tipo (todo o tipo num lugar)
    util.js              — utilitário compartilhado (normalizar texto)

  trilhas/               — CONTEÚDO (as trilhas e seus exercícios)
    index.js             — lista de todas as trilhas (futuro catálogo)
    exemplo/
      index.js           — manifesto: título + lista ORDENADA dos exercícios
      ex01-dobro.js … ex07-parsons.js   — um arquivo por exercício

DevForge-TCC.pdf         — documento do TCC
CLAUDE.md                — contexto do projeto, decisões, status e backlog
```

### Como os arquivos se conversam

O código tem **três camadas** separadas, e cada uma cresce sem mexer nas outras:
o **motor** (`jogo/`), os **tipos de exercício** (`exercicios/`) e o **conteúdo**
(`trilhas/`).

- `main.jsx` monta o `App`, que escolhe uma trilha (de `trilhas/`) e a passa para
  o `Jogo`.
- `Jogo.jsx` controla o estado e decide a tela. Ele **não** conhece os tipos: pede
  ao **registro** (`exercicios/registro.jsx`) para verificar a resposta e desenhar
  o campo (`CampoResposta`). Os parâmetros vêm de `config.js`.
- Cada **tipo** de exercício é um arquivo em `exercicios/` que exporta tudo dele
  (o componente do campo + `verificar` + `respostaInicial` + `temResposta`).
- Cada **trilha** é uma pasta em `trilhas/`; seu `index.js` lista os exercícios em
  ordem, e cada exercício é um arquivo.

---

## Como adicionar ou alterar

**Um exercício novo numa trilha:** crie um arquivo na pasta da trilha (ex.:
`trilhas/exemplo/ex08-xxx.js`) exportando o objeto do exercício; importe-o no
`index.js` da trilha e coloque-o na **posição desejada** do array `exercicios`.
Inserir no meio é só escolher onde ele entra na lista (sem ponteiros a acertar).

**Um tipo de exercício novo:** copie um arquivo de `exercicios/` como modelo,
ajuste o componente do campo e as funções (`verificar`, `respostaInicial`,
`temResposta`) e registre-o em `exercicios/registro.jsx` (uma linha no mapa).
Nenhum outro arquivo precisa mudar.

**Uma trilha nova:** crie uma pasta em `trilhas/` com seu `index.js` (manifesto)
e inclua-a no array de `trilhas/index.js`.

---

## Próximos passos

O MVP atual cobre a mecânica central de uma trilha. Os demais requisitos do TCC
(contas e login, catálogo de trilhas, ranking, conquistas, feedback por IA,
entre outros) estão listados, com o status do projeto, no **`CLAUDE.md`**.
