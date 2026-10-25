# Metodologia dos Exercícios — Bloco de Lógica de Programação

> **Para quem é este documento.** Para a equipe do TCC e para uma eventual aba de
> cowork que vá **redigir a documentação formal** (p. ex. o Cap. 3.3 do documento
> da Entrega II). Ele explica a metodologia por trás dos exercícios do protótipo,
> **em que material do 1º período ela se baseia** e **em que cada exercício se
> apoia** desse material.
>
> **Relação com os outros documentos:**
> - [`METODOLOGIA-TRILHA1.md`](METODOLOGIA-TRILHA1.md) — a metodologia *pedagógica*
>   (resultados de aprendizagem, abordagem tangencial, casos contrastantes),
>   voltada ao documento/Cap. 3.3.
> - **Este arquivo** — a metodologia *de implementação*: como as trilhas e cada
>   exercício do protótipo mapeiam o conteúdo real da disciplina de origem.
> - `DevForge-TCC.pdf` — a proposta completa (requisitos RF/RNF, personas,
>   literatura).

---

## 1. Fonte: o material do 1º período (Raciocínio Algorítmico)

Todo o conteúdo do Bloco de Lógica é ancorado na disciplina **Raciocínio
Algorítmico** (PUCPR, Escola Politécnica, 1º período; professor responsável
Fabrício Enembreck). O material foi resgatado e está na pasta `ConteudoAlgoritimo/`
(fora do repositório do app). Arquivos usados como base:

**Plano de Ensino (ementa oficial)** — `PE-Raciocínio Algorítmico 2023.pdf` /
`...2023-2s.pdf`. Dele vêm os **Temas de Estudo (TE)**, os **Resultados de
Aprendizagem (RA)** e a **ordem do cronograma**:

| TE  | Descrição (ementa) |
|-----|--------------------|
| TE1 | Algoritmos: conceitos, variáveis e tipos de dados; expressões lógico-aritmético-relacionais. |
| TE2 | Estruturas de controle: seleção e repetição. |
| TE3 | Estruturas de dados homogêneos: vetores e matrizes. |
| TE4 | Funções e recursividade. |
| TE5 | Boas práticas de programação. |

- **RA1** — Projetar solução algorítmica, utilizando pensamento computacional, de forma autônoma.
- **RA2** — Implementar programa computacional, respeitando boas práticas de programação.

**Slides de aula (RA01–RA09)** — a espinha dorsal, na ordem do curso:

| Deck | Tema | Linguagem/conceito |
|------|------|--------------------|
| RA01 | Introdução à Python | print, variáveis, tipos, entrada/saída, operações aritméticas |
| RA02 | Exercícios #1 | fixação de RA01 |
| RA03 | Operadores relacionais e lógicos | ==, !=, <, >, and, or, not |
| RA04 | Estrutura de repetição | `while` |
| RA05 | Exercícios de Estrutura de repetição | fixação de laços |
| RA06 | Vetor e Lista | listas, índices, `len`, percorrer |
| RA07 | Estrutura de repetição com variável de controle | `for` / `range` |
| RA08 | Matriz | listas de listas, laço aninhado |
| RA09 | Funções | `def`, parâmetros, `return`, modularização |

> Observação: a estrutura de **seleção** (`if/elif/else`) aparece no **cronograma**
> ("Estruturas de seleção" e "Exercícios de estruturas de seleção") e nas listas e
> soluções `.py`, mesmo sem um deck RA com esse nome exato entre os resgatados.

**Listas de exercícios e soluções em Python** — `Lista de Exercícios#1..#5.docx` e
os `.py` resolvidos, que inspiraram os enunciados "de mundo real":

- Seleção: `2.2 Idade e Carteira`, `2.6 Peso Ideal`, `2.10 IMC 2`,
  `2.8 Estacionamento`, `2.9 Votos`, `2.12 Categoria Libras`, `3.Salario`.
- Repetição: `3.10 Câmbio` (while + if + comissão), `5.Consumo Medio`,
  `4.Venda Parceladas`, `6.Calculos Latas`.
- Listas/Matrizes: `Matriz-Ex1..Ex5` (ex.: maior valor por coluna).
- Integrador: `Maquina de Bebida` (funções, matriz, laços, validação) — modelo
  do tipo de projeto completo previsto no capstone.

---

## 2. Como a metodologia foi construída

A partir da ementa, o conteúdo foi reorganizado num **Bloco de Lógica de
Programação** dividido em **10 trilhas temáticas** (as 9 primeiras de conteúdo;
a 10ª é o projeto final). Princípios aplicados (detalhados em
`METODOLOGIA-TRILHA1.md` e fundamentados no `DevForge-TCC.pdf`):

1. **Ordem pela ementa** — a sequência das trilhas segue o cronograma da
   disciplina (introdução → tipos → operadores → relacionais/lógicos → seleção →
   repetição → listas/matrizes → funções → boas práticas → projeto).
2. **Dificuldade crescente em duas camadas:**
   - *Dentro de cada trilha:* os primeiros exercícios são mais tranquilos e os
     **dois últimos** sobem a dificuldade.
   - *Entre trilhas:* a base sobe — a trilha 1 é tranquila, a 2 começa a subir, e
     da 3 em diante fica mais pegada (decisão da equipe; calibração final com o
     professor).
3. **Compreender antes de escrever** — cada conceito é primeiro *lido* (prever a
   saída, achar o erro, escolher) e só depois *escrito* (preencher lacuna,
   reordenar no Parsons), espelhando RA1 (projetar) → RA2 (implementar).
4. **Abordagem tangencial** (MA et al., 2023) — cada etapa revisita o conhecido e
   introduz o novo; a trilha 9 faz o aluno reavaliar o próprio código sob a ótica
   de qualidade e teste.
5. **Casos contrastantes** (MA et al., 2023) — usados nos pontos de confusão
   clássica: `=`/`==`, `elif`/`if` solto, `while`/`for`, `return`/`print`,
   legibilidade, dentro/fora de intervalo.
6. **Gamificação calibrada** (Zhan et al., 2022; Ramadhan et al., 2025) — mecânicas
   a serviço da aprendizagem, evitando o efeito de superjustificação.

### Mecânicas do app e sua base

| Mecânica | Como funciona | Base |
|----------|---------------|------|
| Energia | 10 de energia; perde 1 a partir do **3º erro** na mesma atividade | RF07, RF08; lore (robô → "energia", não "vida") |
| Dica progressiva | Erro 1–2 só sinaliza; 3º libera a dica; 4º+ mostra a resposta | RF06 |
| Dica sob demanda | Botão troca **1 de energia por uma dica** (confirmação na página) | RF06/RF09 + questão em aberto "pedir dica consome energia?" |
| XP e streak | XP por acerto (base − erros + bônus de streak); streak zera ao errar | RF10 |
| Só avança ao acertar | O "Próximo" só aparece após o acerto | mecânica de retenção (Duolingo) |
| Coloração | Ao **acertar**, a opção certa fica verde e as demais vermelhas; ao errar, nada é revelado | decisão de UX da equipe (não entregar a resposta no erro) |
| Chat com a Lari | os exercícios são resolvidos como **conversa**: a Lari manda o desafio, o aluno responde, ela reage certo/errado e manda o próximo | feedback do orientador ("parecer um jogo"); lore |
| Mini-aula (cápsula) | no **início de cada trilha** a Lari explica um pouco o conceito (1 bolha por frase), de forma tangencial | tangencial (MA 2023); campo `aula` da trilha |
| Nota por exercício | **logo após o enunciado**, a Lari dá uma explicação/reforço curto do conceito daquele exercício | tangencial/reforço; campo `nota` do exercício |
| Resposta por linha / gabarito rico | a resposta da Lari quebra **uma linha por saída/par**; em `saidaMultipla` com `gabarito`, numa **única mensagem** já nomeando a operação | legibilidade do feedback (decisão de UX) |
| Fios (associação) | ligar pergunta→resposta **arrastando** um fio; opções **embaralhadas** para os fios certos **cruzarem** | minigame (engajamento); tipo `associacao` |
| Pular exercício (teste) | Botão que pula sem resolver — **apenas para validar conteúdo** | ferramenta de desenvolvimento; remover na versão final |

### Os tipos de exercício (7 implementados + 1 futuro)

| Tipo | O que avalia |
|------|--------------|
| `multipla` | reconhecer/escolher a resposta correta |
| `lacuna` | escrever um trecho que falta (palavra-chave, função) |
| `saidaMultipla` | prever a saída do programa (uma ou várias caixas) |
| `acharErro` | localizar a linha com erro |
| `associacao` | relacionar itens a resultados (com distratores) |
| `contrastantes` | escolher, entre versões quase idênticas, a correta (casos contrastantes) |
| `parsons` | reordenar linhas embaralhadas até formar o programa (aceita várias ordens válidas) |
| *resposta aberta por IA (8º, futuro)* | código avaliado por IA sob rubrica (ver trilha 10) |

### Camada de apresentação: chat com a Lari (2026-10)

Atendendo ao orientador ("parecer mais um jogo"), a **resolução** dos exercícios
passou a acontecer num **chat com a Lari** — mas a **pedagogia não mudou**: são os
mesmos 7 tipos, os mesmos enunciados, o mesmo gabarito e as mesmas mecânicas de jogo.
Só a *apresentação* virou conversa. O que a conversa acrescenta (tudo baseado neste
mesmo mapa de conteúdo):

- **Mini-aula (cápsula) por trilha** (`aula`): a Lari abre a trilha explicando um
  pouco o conceito, de forma tangencial (liga o conhecido → introduz o novo →
  micro-exemplo). Uma por trilha, escrita nas **10**.
- **Nota por exercício** (`nota`): logo depois do enunciado, uma explicação/reforço
  curto do conceito daquele exercício (reforça o que já apareceu ou adianta de leve).
  Escrita em **todos os exercícios das 10 trilhas**.
- **Resposta por linha / gabarito rico** (`gabarito`): quando há várias saídas, a
  resposta da Lari vem **uma por linha**; nos `saidaMultipla` com o campo `gabarito`,
  numa **única mensagem** que já nomeia a operação (ex.: "Saida 1 e Subtracao, entao:
  4 - 10 = -6"). Com `gabarito` em: lei1, lei4, ari1, ari6, boo3, boo6, rep1, rep4,
  lis1, lis7.
- **Minigames com cara de jogo**: Parsons reordena **arrastando**; a associação virou
  **"fios"** (ligar pergunta→resposta arrastando), com as opções **embaralhadas** para
  os fios certos **cruzarem** (menos óbvio). Fios em: lei8, tip1, lis3, fun4, bp4
  (e boo1 com 2 alvos, sem cruzamento).

Os campos `aula`, `nota` e `gabarito` são **opcionais** por exercício/trilha — um
exercício sem eles simplesmente não mostra nada a mais, sem quebrar o motor. A lore
completa do chat está em `LORE.md` ("Chat da Lari").

---

## 3. Mapa das trilhas → Temas de Estudo

| # | Trilha | TE da ementa | Deck(s) RA de origem |
|---|--------|--------------|----------------------|
| 1 | Leitura de Código | TE1 | RA01 |
| 2 | Tipos de Dados | TE1 | RA01 |
| 3 | Operadores Aritméticos | TE1 | RA01 |
| 4 | Verdadeiro ou Falso | TE1 | RA03 |
| 5 | Condições (if/elif/else) | TE2 | Seleção (cronograma) |
| 6 | Repetição (laços) | TE2 | RA04, RA05, RA07 |
| 7 | Listas e Matrizes | TE3 | RA06, RA08 |
| 8 | Funções | TE4 | RA09 |
| 9 | Boas Práticas e Testes | TE5 | TE5 + Eng. de Software aplicada |
| 10 | Projeto Final (GitHub + IA) | RA1 + RA2 | capstone (integrador) |

---

## 4. Mapa exercício por exercício

> Legenda da coluna **Base**: `TEn` = tema da ementa; `RAnn` = deck de aula;
> `.py` = solução/exercício real da disciplina; `[sup.]` = associação sugerida
> pela equipe (o conceito é da disciplina, o enunciado é adaptado). A coluna
> **Objetivo** descreve o que o exercício ensina/avalia.

### Trilha 1 — Leitura de Código (TE1 / RA01)

| id | tipo | Objetivo | Base |
|----|------|----------|------|
| lei1 | saidaMultipla | prever saída de `print` com `+` e `*` | RA01 |
| lei2 | multipla | `print` com vírgula e variável (texto) | RA01 |
| lei3 | parsons | declarar antes de usar (ordem de um programa linear) | RA01 / RA1 |
| lei4 | saidaMultipla | `-` (negativo), `/` (float), `%` | RA01 |
| lei5 | multipla | rastrear reatribuição de `a` e `b` | RA01 |
| lei6 | parsons | ler 2 números e calcular média (`int(input)`) | RA01, Lista #1 [sup.] |
| lei7 | saidaMultipla | atualizar a mesma variável passo a passo | RA01 |
| lei8 | associacao (fios) | ligar contas ao resultado (`+`, `*`, `-`, `%`) | RA01 |

> Mudança (2026-10): o antigo `lei8` (`saidaMultipla` com conta + comparação, prévia
> de booleano) foi **removido** por repetir o padrão de `lei7`/anteriores; o minigame
> de **fios** passou a ser o `lei8` (8º e último), fechando a trilha com operadores
> variados. A Trilha 1 tem **8 exercícios**.

### Trilha 2 — Tipos de Dados (TE1 / RA01)

| id | tipo | Objetivo | Base |
|----|------|----------|------|
| tip1 | associacao | classificar valores em int/float/String/Boolean | RA01 |
| tip2 | multipla | reatribuição muda o tipo da variável | RA01 |
| tip3 | contrastantes | em Python não se declara o tipo (`a = 2`, não `int a = 2`) | RA01 (sintaxe Python) |
| tip4 | lacuna | `float(input(...))` | RA01; `.py` Peso Ideal |
| tip5 | lacuna | `int(input(...))` | RA01; `.py` Idade, Câmbio |
| tip6 | multipla | `/` sempre devolve float | RA01 |
| tip7 | saidaMultipla | `"5" + "3"` = `"53"` (concatenação) | RA01 (pegadinha de texto) |
| tip8 | multipla | `input() + 5` = erro de tipo | RA01; base dos `.py` que usam `int(input())` |

### Trilha 3 — Operadores Aritméticos (TE1 / RA01)

| id | tipo | Objetivo | Base |
|----|------|----------|------|
| ari1 | saidaMultipla | `//`, `%`, `**` | RA01 |
| ari2 | multipla | precedência (`*` antes de `+`) dentro de uma função | RA01 + RA09 |
| ari3 | parsons | converter dólar → real | `.py` Câmbio (3.10) |
| ari4 | saidaMultipla | média; `/` sempre float (`7.0`) | RA01; Consumo Médio [sup.] |
| ari5 | multipla | `n % 2 == 0` para testar par | RA01 (aplicação de `%`) |
| ari6 | saidaMultipla | precedência misturada (`*`, `%`, `**`) | RA01 |
| ari7 | multipla | `2 ** 3 ** 2` = 512 (potência é da direita p/ esquerda) | RA01 (aprofundado) |
| ari8 | parsons | preço com desconto (cálculo de vários passos) | `.py` Salário, Latas, Câmbio (comissão) [sup.] |

### Trilha 4 — Verdadeiro ou Falso (TE1 / RA03)

| id | tipo | Objetivo | Base |
|----|------|----------|------|
| boo1 | associacao | relacionais (`==`, `!=`, `<`, `>`, `<=`, `>=`) → True/False | RA03 |
| boo2 | multipla | `not` + `and` combinados | RA03 |
| boo3 | saidaMultipla | `and`, `or`, `not` | RA03 |
| boo4 | contrastantes | "entre 1 e 10" (`1 <= x <= 10`) | RA03; faixas em `.py` |
| boo5 | multipla | condição com variáveis (`idade >= 18 and ...`) | RA03; `.py` Idade e Carteira |
| boo6 | saidaMultipla | várias comparações numa mesma entrada | RA03 |
| boo7 | multipla | precedência de `and`/`or` | RA03 (aprofundado) |
| boo8 | contrastantes | fora do intervalo (ideia de De Morgan) | RA03 (aprofundado) |

### Trilha 5 — Condições (TE2 / seleção)

| id | tipo | Objetivo | Base |
|----|------|----------|------|
| con1 | multipla | `if/else` simples | Seleção (cronograma) |
| con2 | multipla | maioridade | `.py` 2.2 Idade e Carteira |
| con3 | parsons | classificar sinal (if/elif/else) | Seleção; listas de seleção |
| con4 | multipla | faixa de IMC | `.py` Peso Ideal / IMC 2 |
| con5 | contrastantes | `elif` vs `if`s independentes | Seleção; casos contrastantes (MA 2023) |
| con6 | parsons | aprovado/reprovado (if/else) | Seleção [sup.] |
| con7 | parsons | aprovado/recuperação/reprovado (3 vias) | Seleção; `.py` Categoria Libras [sup.] |
| con8 | multipla | `if` aninhado | Seleção (aprofundado); `.py` Estacionamento / Máquina de Bebida |

### Trilha 6 — Repetição (TE2 / RA04, RA05, RA07)

| id | tipo | Objetivo | Base |
|----|------|----------|------|
| rep1 | saidaMultipla | `while` controlado | RA04 |
| rep2 | acharErro | laço infinito (falta atualizar o contador) | RA04 (erro comum) |
| rep3 | parsons | acumulador com `while` | RA04/RA05; `.py` Consumo Médio |
| rep4 | saidaMultipla | `for` com `range` | RA07 |
| rep5 | contrastantes | `while` vs `for` / variações de `range` | RA04/RA07 |
| rep6 | lacuna | `range` | RA07 |
| rep7 | parsons | somar os pares (for + if) | RA05; repetição + seleção |
| rep8 | multipla | laço aninhado (contagem 3×2) | RA07/RA08 (prepara matriz) |

### Trilha 7 — Listas e Matrizes (TE3 / RA06, RA08)

| id | tipo | Objetivo | Base |
|----|------|----------|------|
| lis1 | saidaMultipla | índices e `len` | RA06 |
| lis2 | acharErro | índice fora do intervalo | RA06 (erro comum) |
| lis3 | associacao | índice → valor | RA06 |
| lis4 | lacuna | `sum` de uma lista | RA06 |
| lis5 | saidaMultipla | somar com laço | RA06; Lista #4 [sup.] |
| lis6 | parsons | achar o maior | RA06; Lista #4 (máximos) [sup.] |
| lis7 | saidaMultipla | acesso a matriz `m[i][j]` | RA08 |
| lis8 | parsons | somar toda a matriz (laço aninhado) | RA08; `.py` Matriz-Ex1 |

### Trilha 8 — Funções (TE4 / RA09)

| id | tipo | Objetivo | Base |
|----|------|----------|------|
| fun1 | parsons | definir e chamar uma função | RA09 |
| fun2 | lacuna | `def` | RA09 |
| fun3 | acharErro | chamada sem parênteses | RA09 (erro comum) |
| fun4 | associacao | uma função, uma responsabilidade | RA09; `.py` Máquina de Bebida (troco/estoque/adm) |
| fun5 | contrastantes | `return` vs `print` | RA09 (confusão clássica) |
| fun6 | saidaMultipla | usar o valor retornado | RA09 |
| fun7 | parsons | função com parâmetros (média) | RA09 |
| fun8 | saidaMultipla | função que decide (`if` + dois `return`) | RA09 + seleção (aprofundado) |

### Trilha 9 — Boas Práticas e Testes (TE5 + Eng. de Software aplicada)

| id | tipo | Objetivo | Base |
|----|------|----------|------|
| bp1 | contrastantes | código legível (nomes claros) | TE5 |
| bp2 | multipla | reconhecer uma boa prática | TE5 |
| bp3 | multipla | escolher um bom nome de variável | TE5 |
| bp4 | associacao | caso de teste ↔ requisito (V&V) | ES aplicada (TCC) |
| bp5 | multipla | para que serve um caso de teste | ES aplicada |
| bp6 | contrastantes | não se repita (DRY) — laço vs copiar/colar | TE5 |
| bp7 | acharErro | achar o bug a partir de um teste que falhou | ES (teste + depuração) |
| bp8 | multipla | caso de borda (dividir por zero) | ES (teste de borda) |

> A trilha 9 materializa a ideia central do TCC de **Engenharia de Software
> aplicada ao próprio código**, não como trilha isolada: legibilidade, DRY e
> verificação/validação entram sobre exemplos que o aluno já sabe escrever.

### Trilha 10 — Projeto Final (capstone)

| id | tipo | Objetivo | Base |
|----|------|----------|------|
| pf1 | multipla (placeholder) | explicar a atividade GitHub + IA e o princípio de scaffolding | RF20 (GitHub) + RF15 (feedback por IA) |

O aluno resolve um problema completo em Python (no nível de `Máquina de Bebida` /
`Matriz-Ex`), sobe no GitHub e a IA avalia o código sob rubrica, **apoiando o
raciocínio sem entregar a resposta** (human-in-the-loop). É o **8º tipo de
exercício** (resposta aberta por IA), ainda não implementado — depende do backend.
Detalhes em `METODOLOGIA-TRILHA1.md` (seção 8).

---

## 5. Perguntas em aberto e próximos passos

- **Validar com o professor** a seleção de conteúdo, a ordem e a calibração de
  dificuldade (a equipe assume o nível; a palavra final é do professor).
- **Capstone (trilha 10):** implementar o 8º tipo quando a conta de IA + o backend
  existirem; definir a rubrica e o que acontece ao reprovar.
- **Regras de jogo em aberto:** frequência configurável da dica (RF09); se "pedir
  dica consome energia" é a regra final.
- **Ajustes de produção:** a **energia** está em 10 (alvo do TCC, RF07); o botão
  **"Pular exercício (teste)"** deve ser removido na versão final.
- Associações marcadas `[sup.]` devem ser conferidas contra as listas `.docx`
  completas quando for redigir a documentação formal.

## Referências

- PUCPR. *Plano de Ensino — Raciocínio Algorítmico* (2023/2). Prof. Fabrício Enembreck.
- MA, N. et al. *A contrasting cases approach for learning programming.* Educ. Inf. Technol., 2023.
- ZHAN, Z. et al. *The effectiveness of gamification in programming education: a meta-analysis.* 2022.
- RAMADHAN, G. A. Y. et al. *Gamification features on user retention in Duolingo.* 2025.
- `DevForge-TCC.pdf` (requisitos RF/RNF, personas, literatura completa).
