# Metodologia — Trilha 1: Lógica de Programação

> **O que é este arquivo.** É o entregável da Frente 1 do `ROADMAP-ENTREGA2.md`
> (Metodologia da trilha), seguindo o briefing em `briefings/metodologia-trilha.md`.
> Define a **metodologia de ensino da primeira trilha** do DevForge — *Lógica de
> Programação* — em dificuldade crescente, mapeando cada etapa a um resultado de
> aprendizagem, a um tema de estudo, aos tipos de exercício já implementados e à
> mecânica de jogo associada.
>
> **Dois destinos:** (a) alimentar o **Cap. 3.3** do documento da Entrega II
> (tabela *Id / Resultado de Aprendizagem / Tema de Estudo / Mecânica*); (b) servir
> de especificação para a **aba de código** (o que implementar e em que ordem).
>
> **Status:** rascunho para validação com a orientadora (Sofia Marshallowitz).
> Pontos ainda em aberto estão na seção 11. Esta frente **não escreve código**.

---

## 1. Fonte e fundamentação

O conteúdo desta trilha é ancorado na **ementa oficial da disciplina Raciocínio
Algorítmico** (PUCPR, Escola Politécnica, 1º período; professor responsável
Fabrício Enembreck; plano de ensino 2023/2), cujo material de apoio está na pasta
`ConteudoAlgoritimo/` (plano de ensino, slides RA01–RA09, listas de exercícios e
soluções em Python). Não há suposições de conteúdo: todos os temas abaixo vêm da
ementa e do cronograma da disciplina.

**Ementa (resumo oficial):** a disciplina desenvolve o pensamento computacional
pela construção de algoritmos — manipulação de variáveis, expressões
lógico-aritmético-relacionais, estruturas de controle, estruturas de dados
homogêneas e funções — até o estudante ser capaz de implementar programas de baixa
complexidade com autorregulação e atitude cooperativa.

**Temas de Estudo (TE) da ementa:**

| TE  | Descrição (ementa) |
|-----|--------------------|
| TE1 | Algoritmos: conceitos, variáveis e tipos de dados; expressões lógico-aritmético-relacionais. |
| TE2 | Estruturas de controle: seleção e repetição. |
| TE3 | Estruturas de dados homogêneos: vetores e matrizes. |
| TE4 | Funções e recursividade. |
| TE5 | Boas práticas de programação. |

**Resultados de Aprendizagem oficiais (RA) da ementa:**

- **RA1** — Projetar solução algorítmica, utilizando pensamento computacional, de
  forma autônoma.
- **RA2** — Implementar programa computacional, respeitando boas práticas de
  programação.

A trilha do DevForge **decompõe** esses dois RA amplos em resultados de
aprendizagem granulares (seção 4), um grão adequado a exercícios curtos e à
progressão gamificada. Cada resultado granular da trilha indica a que RA oficial
ele serve (RA1, RA2 ou ambos).

**Linguagem:** Python (mesma da disciplina e da trilha de exemplo atual).

**Bibliografia base da disciplina** (para embasar enunciados): Forbellone &
Eberspächer, *Lógica de programação* (Pearson, 2022); Menezes, *Introdução à
programação com Python* (Novatec, 2019); Manzano & Oliveira, *Algoritmos* (Érica,
2019).

### Alinhamento com o referencial do TCC

- **Abordagem tangencial** (MA et al., 2023): cada etapa revisita o que o aluno já
  domina e introduz um conceito novo — não é só reforço.
- **Casos contrastantes** (MA et al., 2023): técnica recorrente, não um tipo
  isolado; dois trechos quase idênticos que diferem numa característica crítica,
  para o aluno perceber a estrutura profunda e reduzir carga cognitiva.
- **Redução de carga cognitiva** (Zhan et al., 2022; MA et al., 2023): sessões
  curtas, um conceito novo por vez, scaffolding progressivo.
- **Gamificação calibrada** (Zhan et al., 2022; Ramadhan et al., 2025): mecânicas
  a serviço da aprendizagem, evitando o efeito de superjustificação.
- **Engenharia de Software aplicada ao código** (não como trilha isolada):
  qualidade e verificação/validação entram sobre o próprio código (TE5), fechando
  a trilha.

---

## 2. Princípios de design da trilha

1. **Dificuldade estritamente crescente.** A ordem dos conceitos segue o
   cronograma da disciplina; nenhum exercício exige um conceito ainda não visto.
2. **Um conceito novo por etapa.** O enunciado reaproveita o que já foi ensinado
   (tangencial) e isola a novidade, reduzindo carga cognitiva.
3. **Compreender antes de escrever.** Cada conceito é primeiro *lido* (prever
   saída, achar erro, múltipla escolha) e só depois *escrito* (lacuna, Parsons),
   espelhando RA1 (projetar) → RA2 (implementar).
4. **Casos contrastantes nos pontos de confusão clássica** (ver seção 6): `elif`
   vs. `if` solto, `=` vs. `==`, `return` vs. `print`, `while` vs. `for`.
5. **Só avança ao acertar** (mecânica já existente): mantém o aluno na zona de
   domínio antes de prosseguir.
6. **Não depende da IA.** A trilha funciona inteira com os 7 tipos de correção
   local. O único ponto que usa IA é o exercício-capstone (seção 8), previsto como
   fecho e marcado como etapa que depende do backend.

### Tamanho e granularidade

A ementa do TCC (RF05) prevê **8 a 12 exercícios** nas trilhas básicas, podendo as
avançadas conter mais. A Trilha 1 é a mais longa e fundamental: os **22 resultados
de aprendizagem** abaixo não são 22 exercícios únicos — cada um admite **vários
exercícios** do mesmo tipo (banco de itens), e a trilha pode ser **quebrada em
sub-lições** (ex.: "Lição 1 — Variáveis e tipos", "Lição 2 — Seleção"), cada uma
no tamanho recomendado. Essa decisão de agrupamento fica para a aba de código
(ver seção 10).

---

## 3. Mapeamento da ementa para os módulos da trilha

A ordem dos módulos segue o cronograma oficial da disciplina (introdução → operadores
→ seleção → repetição → vetores/matrizes → funções → boas práticas).

| Módulo | Tema da trilha | TE da ementa | Semana(s) no cronograma oficial |
|--------|----------------|--------------|----------------------------------|
| M1 | Ler e prever um algoritmo | TE1 | Introdução a Algoritmo e Python |
| M2 | Variáveis, tipos, entrada/saída | TE1 | Variáveis, constantes, tipos de dados |
| M3 | Operadores aritméticos | TE1 | Operações aritméticas |
| M4 | Operadores relacionais e lógicos | TE1 | Operações relacionais e lógicas |
| M5 | Estruturas de seleção | TE2 | Estruturas de seleção + exercícios |
| M6 | Estruturas de repetição | TE2 | Estrutura de repetição + exercícios |
| M7 | Vetores, listas e matrizes | TE3 | Vetores, Matrizes e Listas |
| M8 | Funções e modularização | TE4 | Funções e modularização |
| M9 | Boas práticas + ES aplicada | TE5 | Boas práticas / aula prática |
| M10 | Capstone — projeto no GitHub + IA | RA1+RA2 | Projeto Colaborativo |

---

## 4. Resultados de aprendizagem da Trilha 1 (ordenados)

Lista ordenada em dificuldade crescente. Cada resultado usa um **verbo de ação** e
descreve o que o aluno consegue fazer. O código `RA-T1-NN` identifica o resultado
na trilha; a coluna "RA oficial" aponta a qual resultado da ementa ele serve.

**Justificativa da sequência.** Começa pela *leitura* de programas (prever saída)
antes da escrita, porque reconhecer o fluxo exige menos carga que produzi-lo. Em
seguida vêm os blocos de construção na ordem da ementa — dados → operadores →
seleção → repetição → coleções → funções — cada um pré-requisito do próximo.
Fecha com boas práticas e Engenharia de Software aplicadas ao próprio código
(tangencial: o aluno revê tudo o que escreveu sob a ótica de qualidade) e com um
projeto integrador.

### M1 — Ler e prever um algoritmo (TE1)
- **RA-T1-01** — Prever a saída de um programa linear com `print` e atribuições
  simples. *(RA1)*

### M2 — Variáveis, tipos e entrada/saída (TE1)
- **RA-T1-02** — Reconhecer o tipo de um valor (`int`, `float`, `str`, `bool`) e o
  efeito de uma atribuição. *(RA1)*
- **RA-T1-03** — Usar `input`/`print` e converter tipos (`int(...)`, `float(...)`)
  corretamente. *(RA1, RA2)*

### M3 — Operadores aritméticos (TE1)
- **RA-T1-04** — Avaliar expressões aritméticas respeitando precedência e os
  operadores `//`, `%`, `**`. *(RA1)*

### M4 — Operadores relacionais e lógicos (TE1)
- **RA-T1-05** — Avaliar expressões relacionais (`==`, `!=`, `<`, `>`, `<=`, `>=`)
  como `True`/`False`. *(RA1)*
- **RA-T1-06** — Avaliar e combinar expressões lógicas (`and`, `or`, `not`).
  *(RA1)*

### M5 — Estruturas de seleção (TE2)
- **RA-T1-07** — Prever qual ramo de um `if/else` executa conforme a entrada.
  *(RA1)*
- **RA-T1-08** — Construir um encadeamento `if/elif/else` que classifica um valor
  em faixas. *(RA1, RA2)*
- **RA-T1-09** — Distinguir `elif` de uma sequência de `if` independentes
  (contraste crítico). *(RA1)*

### M6 — Estruturas de repetição (TE2)
- **RA-T1-10** — Prever o número de iterações e o resultado de um `while`
  controlado por condição. *(RA1)*
- **RA-T1-11** — Usar contador e acumulador dentro de um laço. *(RA1, RA2)*
- **RA-T1-12** — Usar `for` com `range` (laço com variável de controle). *(RA1,
  RA2)*
- **RA-T1-13** — Combinar repetição e seleção (ex.: validar entrada, somar apenas
  os pares). *(RA1, RA2)*

### M7 — Vetores, listas e matrizes (TE3)
- **RA-T1-14** — Indexar e percorrer uma lista/vetor (`len`, índice, `for`).
  *(RA1, RA2)*
- **RA-T1-15** — Operar sobre uma lista: somar, achar o maior/menor, buscar um
  elemento. *(RA1, RA2)*
- **RA-T1-16** — Percorrer uma matriz (lista de listas) com laço aninhado. *(RA1,
  RA2)*

### M8 — Funções e modularização (TE4)
- **RA-T1-17** — Definir e chamar uma função com parâmetros. *(RA2)*
- **RA-T1-18** — Distinguir `return` de `print` (contraste crítico). *(RA1, RA2)*
- **RA-T1-19** — Decompor um problema em funções (modularização). *(RA1, RA2)*

### M9 — Boas práticas e Engenharia de Software aplicada (TE5)
- **RA-T1-20** — Escolher a versão mais legível de um trecho (nomes, estrutura,
  repetição) — qualidade de código. *(RA2)*
- **RA-T1-21** — Associar um caso de teste ao requisito que ele verifica
  (verificação e validação sobre o próprio código). *(RA1, RA2)*

### M10 — Capstone (RA1 + RA2)
- **RA-T1-22** — Resolver um problema completo em Python, versioná-lo no GitHub e
  receber feedback da IA sobre o código (resposta aberta, supervisão humana). *(RA1,
  RA2)* — ver seção 8.

---

## 5. Tabela da metodologia (formato Cap. 3.3)

Tabela principal para o documento. Os tipos de exercício citados são os **7 já
implementados** (`multipla`, `lacuna`, `saidaMultipla`, `acharErro`, `associacao`,
`contrastantes`, `parsons`), exceto a última linha, que usa o 8º tipo (resposta
aberta por IA, ainda a implementar). A coluna "Mecânica" indica o destaque de cada
etapa sobre a base comum (energia, dica progressiva, XP, streak — ver seção 7).

| Id | Resultado de Aprendizagem | Tema de Estudo | Tipo(s) de exercício | Mecânica de jogo |
|----|---------------------------|----------------|----------------------|------------------|
| RA-T1-01 | Prever a saída de um programa linear | TE1 — Algoritmos e saída | `saidaMultipla`, `multipla`, `parsons` | Base. XP cheio de entrada (início acolhedor); streak começa aqui. |
| RA-T1-02 | Reconhecer tipos e atribuição | TE1 — Variáveis e tipos | `associacao`, `multipla`, `acharErro` | Base. `associacao` com distratores. |
| RA-T1-03 | Entrada/saída e conversão de tipo | TE1 — Entrada/Saída | `lacuna`, `acharErro`, `saidaMultipla` | Base. `acharErro` no clássico `input` sem `int(...)`. |
| RA-T1-04 | Avaliar expressões aritméticas (`//`, `%`, `**`) | TE1 — Operações aritméticas | `saidaMultipla`, `associacao`, `multipla` | Base. |
| RA-T1-05 | Avaliar expressões relacionais | TE1 — Op. relacionais | `saidaMultipla`, `associacao` | Base. |
| RA-T1-06 | Avaliar/combinar expressões lógicas (`and/or/not`) | TE1 — Op. lógicas | `multipla`, `contrastantes`, `saidaMultipla` | Dica reforçada (tabela-verdade); ponto de confusão. |
| RA-T1-07 | Prever ramo de `if/else` | TE2 — Seleção | `saidaMultipla`, `multipla` | Base. |
| RA-T1-08 | Construir `if/elif/else` por faixas | TE2 — Seleção | `parsons`, `lacuna`, `contrastantes` | Base. Primeira escrita de estrutura; dica a partir do 3º erro. |
| RA-T1-09 | `elif` vs. `if` independentes | TE2 — Seleção | `contrastantes`, `acharErro` | Caso contrastante central; dica explica o "porquê". |
| RA-T1-10 | Prever iterações de `while` | TE2 — Repetição | `saidaMultipla`, `acharErro` | `acharErro` no laço infinito (falta de incremento). |
| RA-T1-11 | Contador e acumulador | TE2 — Repetição | `parsons`, `lacuna` | Base. |
| RA-T1-12 | `for` com `range` | TE2 — Repetição | `saidaMultipla`, `lacuna`, `contrastantes` | `contrastantes` `while` vs. `for` (mesmo resultado). |
| RA-T1-13 | Repetição + seleção combinadas | TE2 — Repetição | `parsons`, `acharErro` | Pico de dificuldade do módulo; bônus de streak relevante. |
| RA-T1-14 | Indexar e percorrer lista | TE3 — Vetores/Listas | `saidaMultipla`, `associacao`, `acharErro` | `acharErro` no índice fora do intervalo. |
| RA-T1-15 | Operar sobre lista (soma, máximo, busca) | TE3 — Listas | `parsons`, `lacuna` | Base. |
| RA-T1-16 | Percorrer matriz com laço aninhado | TE3 — Matrizes | `saidaMultipla`, `parsons` | Alta carga; dica mais cedo (ver pergunta Q2). |
| RA-T1-17 | Definir e chamar função | TE4 — Funções | `parsons`, `lacuna`, `acharErro` | Base. |
| RA-T1-18 | `return` vs. `print` | TE4 — Funções | `contrastantes`, `saidaMultipla` | Caso contrastante central. |
| RA-T1-19 | Modularizar um problema | TE4 — Funções | `associacao`, `parsons` | `associacao` entre sub-rotina e responsabilidade. |
| RA-T1-20 | Escolher a versão mais legível | TE5 — Boas práticas | `contrastantes`, `multipla` | Tangencial: revê código antigo sob a ótica de qualidade. |
| RA-T1-21 | Associar caso de teste ao requisito | TE5 — V&V (ES aplicada) | `associacao`, `multipla` | Introduz ES aplicada ao próprio código. |
| RA-T1-22 | Projeto completo no GitHub avaliado por IA | RA1+RA2 — Integrador | Resposta aberta por IA (8º tipo, futuro) + integração GitHub | Capstone: XP alto, conquista/badge; energia tolerante. Ver seção 8. |

---

## 6. Onde entram os casos contrastantes

Casos contrastantes (MA et al., 2023) são usados **nos pontos de confusão clássica
de iniciantes**, onde dois trechos quase idênticos diferem numa característica
crítica. São o coração da redução de carga cognitiva da trilha:

1. **`=` vs. `==`** (M4/M5): atribuição vs. comparação.
2. **`elif` vs. `if` solto** (RA-T1-09): por que uma cadeia de `if` independentes
   pode entrar em mais de um ramo, e `elif` não.
3. **`while` vs. `for`** (RA-T1-12): o mesmo resultado escrito de duas formas,
   quando cada uma é mais natural.
4. **`return` vs. `print`** (RA-T1-18): o engano mais comum com funções — "a função
   mostra" vs. "a função devolve um valor".
5. **Legibilidade** (RA-T1-20): duas versões corretas, uma mais legível (nomes,
   sem repetição) — aqui o contraste já serve à Engenharia de Software (TE5).

Além desses, o tipo `contrastantes` pode reforçar qualquer conceito com variações
sutis (ex.: `range(5)` vs. `range(1,5)` vs. `range(1,5,2)`).

---

## 7. Mecânicas de jogo por fase

A base é a já implementada e descrita no `CLAUDE.md`/`config.js`, ajustada ao
**vocabulário da lore**: usar **energia** (robô), não "vida".

- **Energia** (RF07/RF08): o alvo do TCC é **10 de energia**, com perda **somente a
  partir do 3º erro** na mesma atividade. O MVP atual ainda usa 3 vidas e perde a
  cada 2 erros — alinhar em código (frente 4 do roadmap).
- **Dica progressiva** (RF06/RF09): o alvo do TCC é dica **a partir do 3º erro**, com
  frequência configurável pelo usuário. Escalonamento: erro 1–2 só sinaliza o erro;
  3º erro libera a dica; erros seguintes revelam a explicação completa.
- **XP** (RF10): valor base por acerto, menos penalidade por erro (com piso), mais
  bônus proporcional ao streak. Premia constância sem explodir a pontuação.
- **Streak** (RF10/RF11): sobe a cada acerto, zera ao errar; lembrete quando está em
  risco.

**Calibração por fase (proposta, a validar):**

- **M1–M3 (início):** fase de acolhimento. XP cheio, erros sem peso emocional — o
  objetivo é criar o hábito e o streak. (Persona Pedro: progresso rápido inicial.)
- **M4, M5, M6 (operadores, seleção, repetição):** núcleo cognitivo. Dicas bem
  escritas nos pontos de confusão; bônus de streak para sustentar o esforço nos
  picos (RA-T1-13).
- **M7 (matrizes):** maior carga da trilha; considerar liberar a dica mais cedo
  aqui (ver Q2).
- **M8–M9 (funções, boas práticas):** consolidação; a mecânica recua e dá lugar ao
  raciocínio sobre qualidade.
- **M10 (capstone):** energia tolerante, XP alto e **conquista/badge** (RF18) ao
  concluir — marco de término da trilha.

> **Princípio anti-superjustificação** (Ramadhan et al., 2025): as recompensas
> acompanham a dificuldade real e o progresso de aprendizagem, não substituem o
> conteúdo. A satisfação de resolver vem antes do XP.

---

## 8. Exercício-capstone: GitHub + avaliação por IA (contexto da atividade)

> Esta seção documenta, dentro do repositório, o **contexto da atividade de GitHub +
> IA** pedida pela equipe. Ela corresponde ao RF20 (integração com GitHub) + RF15
> (feedback de erro assistido por IA) e à Frente 6 do `ROADMAP-ENTREGA2.md`
> ("Exercício de Git ao fim da trilha"). É o **8º tipo de exercício** (resposta
> aberta corrigida por IA), ainda não implementado, e **fecha a Trilha 1**.

### O que é

Ao concluir os módulos M1–M9, o aluno recebe um **problema completo** para resolver
em Python — no nível dos projetos reais da disciplina (ex.: *Máquina de Bebida*,
*Matriz de maiores por coluna*, *Conversor de câmbio com comissão*, encontrados em
`ConteudoAlgoritimo/`). Em vez de uma resposta fechada, ele:

1. Resolve o problema em Python no seu ambiente.
2. **Sobe o código num repositório GitHub** (exercita controle de versão real —
   RNF07, RF20; alinha com a disciplina de DevOps citada no projeto).
3. Envia o link do repositório pela plataforma.
4. A **IA avalia o código** contra uma **rubrica definida pela equipe de conteúdo**
   e devolve **feedback que apoia o raciocínio** — aponta o que revisar, sem
   entregar a solução pronta (scaffolding; Pitts, Hridi & Lekshmi-Narayanan, 2025).
5. A **decisão final permanece humana** (human-in-the-loop): a IA é apoio, a
   aprovação segue os critérios da equipe (Reina et al., 2026).

### O que a IA avalia (rubrica inicial — a validar)

A rubrica cobre exatamente os resultados de aprendizagem da trilha, agora
integrados:

- **Correção** — o programa resolve o problema proposto e trata os casos de borda
  do enunciado (RA1/RA2).
- **Uso adequado das estruturas** — seleção, repetição, listas/matrizes e funções
  empregadas quando cabem (TE2–TE4).
- **Modularização** — o problema foi dividido em funções com responsabilidades
  claras (RA-T1-19).
- **Boas práticas / legibilidade** — nomes significativos, ausência de repetição
  desnecessária (TE5, RA-T1-20).
- **Versionamento** — há histórico de commits rastreável (RNF07, RF20).

### Arquitetura (resumo; detalhe no `CLAUDE.md`, seção "IA (próxima etapa)")

Fluxo: **React → backend próprio → API da Anthropic → backend → React**. A chave da
API **nunca** fica no front-end; um backend mínimo (Node/serverless) guarda a chave,
recebe o código + a rubrica, chama a API e devolve o feedback. O material da trilha
pode ir como contexto via RAG (futuro).

### Dependências e caminho incremental

- **Depende** da conta Anthropic API + créditos e do backend (Frente 5 do roadmap).
  A assinatura do chat **não** serve.
- **Até lá:** manter um **stub local** — feedback por regras fixas sobre critérios
  simples (ex.: "tem função definida?", "tem laço?") — para desenvolver o fluxo sem
  gastar tokens. A metodologia **não depende** da IA real para ser demonstrada.
- A integração com GitHub pode começar simples: o aluno cola o link; o backend lê o
  repositório público. Validação de commit/PR simulado é evolução posterior.

### Perguntas em aberto desta atividade

- A rubrica é **por problema** ou uma rubrica geral da trilha? (provável: base geral
  + critérios específicos por problema).
- O que acontece se a IA reprovar? Refazer custa energia? Há limite de tentativas?
- Repositório público é obrigatório? (privado exigiria autenticação/token — mais
  complexo).

---

## 9. Notas pedagógicas (amarração à literatura do TCC)

- **Casos contrastantes reduzem carga cognitiva e melhoram a aprendizagem** frente à
  análise de casos únicos (MA et al., 2023, p. 9229-9230). Por isso são usados nos
  pontos de confusão (seção 6), e não como um tipo decorativo.
- **Abordagem tangencial** (MA et al., 2023, p. 9215): a trilha fecha (M9) fazendo o
  aluno reavaliar o próprio código sob qualidade e teste — revisita o conhecido e
  habilita a transferência para contextos novos.
- **Gamificação tem efeito maior na programação baseada em texto** (SMD = 0,84) do
  que na gráfica (Zhan et al., 2022, p. 9) — o que justifica investir na mecânica
  numa trilha de código Python como esta. A mesma meta-análise mostra que a
  gamificação pode **elevar levemente a carga cognitiva** (SMD = 0,23), reforçando a
  necessidade de scaffolding (dicas progressivas, casos contrastantes).
- **Metas claras e progressão estruturada** combatem a procrastinação relatada por
  estudantes de computação (Meissner et al., 2026): a trilha ordenada, com "X de N"
  e só-avança-ao-acertar, materializa isso.
- **Feedback de IA deve apoiar o raciocínio, não entregar a resposta**, sob rubrica e
  supervisão humana (Pitts, Hridi & Lekshmi-Narayanan, 2025; Reina et al., 2026) —
  princípio que rege o capstone (seção 8).
- **Evitar superjustificação** (Ramadhan et al., 2025, p. 430): calibrar recompensa
  à dificuldade real (seção 7).

---

## 10. Para a aba de código (tradução em implementação)

Resumo operacional do que esta metodologia pede ao protótipo (não implementar
aqui; é insumo do briefing irmão):

- **Reaproveitar os 7 tipos existentes**; nenhum tipo novo é necessário até o
  capstone (8º tipo, futuro).
- **Quebrar a Trilha 1 em sub-lições** no tamanho de RF05 (8–12 exercícios cada),
  agrupando por módulo (M1…M9). A ordem é a da seção 4.
- **Cada `RA-T1-NN` vira um ou mais exercícios** do(s) tipo(s) indicado(s) na tabela
  da seção 5; os enunciados podem ser adaptados das listas reais em
  `ConteudoAlgoritimo/` (Peso Ideal, IMC, Estacionamento, Câmbio, Matriz de maiores,
  etc.).
- **Casos contrastantes** (seção 6) são itens do tipo `contrastantes` nos pontos
  marcados.
- **Alinhar as mecânicas** ao alvo do TCC (energia = 10, perda após o 3º erro; dica
  a partir do 3º erro) e **renomear "vida" → "energia"** em `config.js` e telas.
- **Capstone (M10)** fica como etapa dependente do backend/IA (stub local até lá).

---

## 11. Perguntas em aberto (para a equipe / orientadora)

Regras de jogo e decisões pedagógicas que **não** devem ser fechadas só por esta
frente:

- **Q1.** Pedir dica consome energia? (roadmap já lista isso como decisão pendente).
- **Q2.** A frequência/início da dica varia por módulo (ex.: liberar antes em
  matrizes, M7) ou é fixa pela configuração do usuário (RF09)?
- **Q3.** A Trilha 1 é uma trilha só (longa) ou um conjunto de sub-lições curtas
  dentro de um "mundo"? (afeta como o catálogo RF03 as apresenta).
- **Q4.** O capstone (M10) entra já na Entrega II como stub, ou fica previsto como
  trabalho futuro no documento?
- **Q5.** A rubrica da IA é geral ou por problema? O que ocorre ao reprovar?
  (seção 8).
- **Q6.** Validar com a orientadora a decomposição dos RA oficiais (RA1/RA2) nos 22
  resultados granulares — o grão está adequado?
- **Q7.** Confirmar se recursividade (citada em TE4 da ementa) entra na Trilha 1 ou
  fica para uma trilha posterior (proposta atual: **fica para depois** — alta carga
  para iniciantes).

---

## 12. Próximo passo

1. **Validar esta metodologia com a orientadora** (Sofia Marshallowitz) — ponto de
   bloqueio do roadmap (Frente 1).
2. Resolvidas as perguntas da seção 11, **escrever o briefing irmão para a aba de
   código** com a metodologia traduzida em exercícios concretos, na ordem da trilha.
3. Inserir a tabela da seção 5 no **Cap. 3.3** do documento da Entrega II.

---

### Referências citadas

- MA, N. et al. *Promoting programming education of novice programmers... a
  contrasting cases approach.* Education and Information Technologies, v. 28, n. 7,
  2023.
- ZHAN, Z. et al. *The effectiveness of gamification in programming education: a
  meta-analysis.* Computers and Education: AI, v. 3, 2022.
- RAMADHAN, G. A. Y. et al. *Analyzing the influence of gamification features on user
  retention in Duolingo.* ISCAIE, 2025.
- PITTS, G.; HRIDI, A. P.; LEKSHMI-NARAYANAN, A. *A survey of LLM-based applications
  in programming education.* HCI+NLP, 2025.
- REINA, A. et al. *Web application for automated correction assistance... using
  generative AI.* RIED, v. 29, n. 2, 2026.
- MEISSNER, N. et al. *Utilizing adaptive gamification in an intelligent tutoring
  system for software engineering education.* ICSE-SEET, 2026.
- PUCPR. *Plano de Ensino — Raciocínio Algorítmico* (2023/2). Prof. Fabrício
  Enembreck. (`ConteudoAlgoritimo/`)
