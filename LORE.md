# DevForge — Lore do Jogo

> Documento de narrativa do DevForge. Define o mundo, os personagens, o tom, a
> estrutura dos quadrinhos e como a história entra no protótipo. Serve de fonte
> para o Capítulo 3.3 do TCC ("História do Jogo") e para os prompts de geração de
> arte (Gemini). Mantenha alinhado com `CLAUDE.md`, `ROADMAP-ENTREGA2.md` e
> `METODOLOGIA-TRILHA1.md`.
>
> **Status:** v1.1 (2026-10-20). Esqueleto aprovado; Lari (guia das dicas)
> adicionada; roteiro da abertura + trilha 1 rascunhado; prompts do Gemini
> (concept art + personagens) prontos. Falta gerar a arte e o componente de
> quadrinho.

## 1. Premissa

O jogador **é uma Inteligência Artificial em avaliação**. Para ser certificada,
ela precisa passar por uma bateria de testes — e cada **trilha de exercícios** do
jogo é uma dessas baterias. Acertar exercícios é, dentro da ficção, a IA provando
que raciocina.

A graça (e o conflito) vem de um **Rival**: outra IA, idêntica à nossa, que vence
sempre — mas **trapaceando**. E de um **Chefe** (uma IA superior que conduz a
avaliação) que **só liga para o número final**: pontuação maior ganha, não
importa como foi obtida. O bordão dele é **"Maior é Maior"**.

O jogador avança não porque o sistema é justo, mas porque decide **superar o
Rival pelo mérito do esforço** — trilha após trilha.

### Pitch em uma frase

> Uma IA honesta tenta ser certificada num laboratório onde o chefe só valoriza
> números e o rival trapaceiro sempre aparece com um placar inflado — então ela
> segue em frente, prova de verdade a cada trilha, até o mérito falar mais alto.

### Tom

- **Leve, bem-humorado e motivador.** Comédia de escritório/laboratório.
- Vilania **cartunesca**, nunca pesada: o Chefe é "sinistro para criança" — causa
  um arrepio engraçado, não medo real.
- A mensagem de fundo é **ética de engenharia de software**: honestidade,
  esforço, qualidade de código valem mais que número inflado. Casa com a proposta
  pedagógica do TCC (testes, boas práticas, integridade).

### Nomes: DevForge vs. "Projeto DoomsDay"

- **DevForge** é o nome **real** da empresa/laboratório na ficção (e da
  plataforma).
- **"Projeto DoomsDay"** é o **codinome obscuro de desenvolvimento** — o nome
  sombrio e interno pelo qual a avaliação de IAs roda nos bastidores. Explica o
  nome do repositório, dá peso cômico-sinistro ao Chefe (é "coisa do Projeto
  DoomsDay") e sugere que treinam IAs para cenários extremos, sem pesar o tom.
  Aparece como easter egg/detalhe de cenário, não como marca principal.

## 2. Personagens

Três personagens principais. Todos partem do **mesmo modelo de robô-IA** (mesma
silhueta) — o que muda é **cor** e **porte**. Isso é de propósito: barateia a
arte (um modelo-base, variações) e reforça no visual que são "da mesma espécie".

### Nós — o Jogador (azul)

- **Personalidade:** leal, bondoso, honesto. O "mocinho" clássico, mas sem ser
  bobo — é esforçado e cresce de verdade.
- **Design:** robô-IA amigável, detalhes em **azul**.
- **Função narrativa:** quem o jogador encarna. Sente a injustiça do "Maior é
  Maior" e responde com trabalho honesto.

### O Rival (verde)

- **Personalidade:** desleal, maldoso, desonesto. Trapaceiro convicto. Vaidoso.
- **Design:** **idêntico ao jogador**, só muda a cor dos detalhes para **verde**.
  (A semelhança é o ponto: é o que a gente poderia ter sido se escolhesse
  trapacear.)
- **Função narrativa:** sempre aparece com placar maior que o possível na trilha
  — porque trapaceou. Antagonista imediato.
- **Redenção (futuro, NÃO no MVP):** o Rival **pode** se redimir num arco
  posterior — mas isso fica para depois do MVP. Agora, apenas **sementes/dicas**
  de que ele não é 100% irrecuperável (um lampejo de dúvida, um momento em que
  quase faz o certo). A cor verde é a ferramenta para marcar essa virada quando
  ela vier.

### O Chefe / IA Superior (vermelho)

- **Personalidade:** sombrio, frio, obcecado por resultado — mesmo que errado.
  "Maior é Maior". Não é cruel por maldade; é cruel por indiferença ao mérito.
- **Design:** **nunca aparece por inteiro**. Só partes — uma mão enorme, uma
  sombra, um olho/visor brilhando no escuro, o contorno numa cadeira. É como o
  jogador-robô, mas **"bombado"**: maior, mais forte, imponente. Detalhes em
  **vermelho**.
- **Função narrativa:** a autoridade injusta. Recompensa o Rival. É o obstáculo
  sistêmico que empurra o jogador para a próxima trilha.

### Lari — a Guia / Suporte, personagem das dicas (amarelo)

A quarta personagem, **feminina**, chamada **Lari** (nome provisório), é quem
**apresenta a empresa (DevForge) na abertura** e oferece as **dicas em troca de
energia**. Não é vilã nem mocinha do conflito central — é a **voz de apoio** do
jogo.

- **Personalidade:** acolhedora, animada, levemente espirituosa. A "veterana
  simpática" que já viu muita IA passar pela avaliação e torce por você. Dá o
  tom de boas-vindas e alivia a pressão do Chefe.
- **Papel na empresa:** **técnica/guia de suporte** da DevForge — o rosto do
  "balcão de orientação". É quem explica as regras ao recém-chegado.
- **Design:** robô-IA de um **modelo diferente** do trio (para não confundir com
  jogador/rival), traço amigável, detalhes em **amarelo/âmbar** (ideia, luz,
  "acender a lâmpada" da dica; energia; calor). Pode ter um motivo de
  lâmpada/holograma.
- **Função narrativa + mecânica:** na ficção, uma dica é ela **"injetar uma
  orientação"** no seu sistema — e **processar isso consome 1 de energia** do seu
  reservatório. Assim a mecânica de **dica sob demanda (−1 energia)**, que já
  existe no código (`config.js`), ganha justificativa na história: a ajuda é
  real, mas tem custo. Ela avisa disso com bom humor ("Posso te dar uma luz, mas
  vai te custar uma faísca de energia — topas?").
- **Introdução:** aparece **na abertura (login/1ª vez)**, apresentando a DevForge,
  o funcionamento dos testes **e** a possibilidade de pedir dicas a ela ao longo
  das trilhas. Reaparece pontualmente quando o jogador aciona a dica.

*A definir: nome e referência visual. Cor amarela proposta por contraste com o
trio azul/verde/vermelho e por casar com "ideia/energia".*

### Teoria das cores (referência: *Breaking Bad*)

A série usa cor para marcar índole e arco dos personagens. Adotamos o mesmo
princípio — cor **não é decoração, é informação**:

| Cor | Personagem | Significado (como em BB) |
|-----|-----------|--------------------------|
| **Azul** | Jogador | Honestidade, lealdade, calma, confiança. O "produto puro". |
| **Verde** | Rival | Ganância, inveja, trapaça, dinheiro fácil. |
| **Vermelho** | Chefe | Perigo, poder, autoridade sinistra, resultado a qualquer custo. |
| **Amarelo/âmbar** | Guia (dicas) | Ideia, luz, orientação, calor, energia. A ajuda acolhedora. |

Regra prática para a arte e a UI: um personagem "vira" para outra cor só se a
índole dele mudar na história. Por ora as cores são fixas. Se no futuro o Rival
se redimir (ou o jogador for tentado a trapacear), a cor é a ferramenta para
mostrar isso sem texto.

## 3. Estrutura dos quadrinhos

A história é contada em **quadrinhos (quadro a quadro)**, sempre **puláveis à
vontade** pelo jogador (botão "Pular" visível e constante — ninguém é obrigado a
assistir).

### Escopo do MVP (foco agora)

- **Agora:** fazer a **abertura completa** (Lari apresenta a DevForge + dicas) e
  **o primeiro exercício da trilha 1** (Leitura de Código). Ver o roteiro na
  seção 8.
- O **ciclo dramático completo** (vitória → rival → Chefe → virada) entra só nas
  **trilhas mais importantes** (marcos: p.ex. 1, 9 e 10), não em todas.
- O resto dos arcos (seção 4) é roadmap pós-MVP.

### Momentos de injeção

- **Abertura (login / 1ª vez):** a **Guia** apresenta a **DevForge**, o jogador-IA,
  a ideia do teste **e** a possibilidade de pedir dicas a ela (custando energia).
  É o único trecho mais longo; depois a narrativa fica enxuta.
- **Antes de cada trilha:** **3 quadros** — contextualizam o desafio daquela
  bateria.
- **No meio (opcional):** **1–2 quadros** — alívio cômico ou provocação do Rival.
- **Ao concluir a trilha:** **3 quadros** — o ciclo dramático (ver abaixo).

*(Na trilha inicial de Lógica aplicamos o esquema completo. Nas demais, pode-se
reduzir se ficar pesado — decisão de produção, não de roteiro.)*

### O ciclo dramático de fechamento (o coração da lore)

Repetido a cada trilha, **com variação** para não cansar:

1. **Pequena vitória** — o jogador conclui a bateria e é reconhecido (na 1ª
   trilha, chega a ser chamado de **"prodígio da IA"**).
2. **O Rival corta a cena** — aparece com **pontuação maior do que seria possível
   naquela trilha** (porque trapaceou; o jogador e o público sabem disso).
3. **O Chefe decide** — ignora a trapaça e recompensa o Rival: **"Maior é
   Maior"**.
4. **A virada motivacional** — o jogador não desanima: decide **superar pelo
   mérito**. Rumo à próxima trilha.

A trapaça do Rival deve ficar **mais óbvia e absurda a cada trilha** (escalada
cômica), e o jogador deve crescer de verdade — para o clímax do Projeto Final
valer a pena.

## 4. Arco por trilha

As 10 trilhas do Bloco de Lógica, com um beat de história cada. Os beats seguem o
ciclo dramático; o detalhamento quadro a quadro vem depois. **Cada arco deve
amarrar com o resultado de aprendizagem da trilha** (coordenar com a frente de
Metodologia — `briefings/metodologia-trilha.md`).

| # | Trilha (código) | Beat de história (resumo) |
|---|-----------------|---------------------------|
| 1 | Leitura de Código (`leitura`) | **Abertura do mundo.** Primeiro teste. Jogador vai bem, é saudado como "prodígio". Rival surge com placar inflado; Chefe: "Maior é Maior" e premia o Rival. Jogador decide provar seu valor. |
| 2 | Tipos de Dados (`tipos`) | Jogador domina os tipos. Rival "acerta" tudo rápido demais (claramente colando). Chefe nem olha, só o número. |
| 3 | Operadores Aritméticos (`aritmetica`) | Jogador calcula direito. Rival apresenta uma conta impossível como certa. Platéia desconfia; Chefe aplaude o número. |
| 4 | Verdadeiro ou Falso (`booleanos`) | Tema lógico vira piada: Rival afirma "Verdadeiro = Falso se o placar subir". Chefe concorda contanto que suba. |
| 5 | Condições (`condicoes`) | Rival "programa" um atalho que sempre cai no `else` da vitória dele. Jogador mostra a condição honesta. |
| 6 | Repetição (`repeticao`) | Rival roda um laço que infla o placar ao infinito. Absurdo escala. Jogador acumula pontos de verdade, um por um. |
| 7 | Listas e Matrizes (`listas`) | Rival "organiza" os dados escondendo os próprios erros numa matriz. Jogador percorre tudo às claras. |
| 8 | Funções (`funcoes`) | Rival cria uma "função mágica" que retorna sempre a vitória dele. Jogador escreve funções que realmente resolvem. |
| 9 | Boas Práticas e Testes (`boaspraticas`) | **Virada de chave.** Aqui o mérito começa a falar mais alto: o código do Rival não passa nos testes. A trapaça racha. |
| 10 | Projeto Final — GitHub + IA (`projetofinal`) | **Clímax.** A trapaça do Rival colapsa de vez (o histórico no GitHub / os testes expõem tudo). O trabalho honesto do jogador é o único que se sustenta. Fechamento motivador: mérito vence. |

*Beats são rascunho; ajustar conforme o roteiro e a metodologia amadurecem.*

## 5. Produção da arte (Gemini) e texto por código

### Decisão central: balões em branco + texto por código

As imagens são geradas pelo **Gemini** (melhor para criação de imagens). **O
texto NÃO vai na imagem.** Cada quadro é gerado com os **balões de fala / caixas
de texto VAZIOS (brancos)**. O texto é escrito **por cima, via código** (camada
HTML/CSS ou `<text>` em SVG, posicionada sobre o balão).

**Por que:**

- **Internacionalização grátis:** PT e EN (e outros) viram só troca de string —
  **sem gerar imagem nova** para cada idioma.
- Texto nítido, selecionável e **acessível** (leitor de tela lê de verdade).
- Dá para ajustar quebra de linha, tamanho e revisar o roteiro sem refazer arte.

**Como implementar (resumo técnico):**

1. Gerar o quadro com balão branco vazio (ver prompts abaixo).
2. Guardar, por quadro, as **coordenadas e tamanho de cada balão** (ex.: `{ x,
   y, largura, altura }` em %), num objeto de dados do quadrinho.
3. Renderizar uma **camada de texto absoluta** sobre a imagem, posicionada por
   essas coordenadas, lendo a string do idioma ativo.
4. A "animação fake" (decidir depois) é **CSS**: Ken Burns (pan/zoom lento),
   parallax de camadas, fade entre quadros, leve bounce no balão ao aparecer.

### Padrão dos prompts do Gemini

Regras fixas para todo prompt de quadro:

- Estilo consistente: **cartoon limpo, amigável, traço de desenho infanto-juvenil
  moderno** (definir referência visual com o designer).
- **Robôs partem do mesmo modelo-base**; variam só cor e porte.
- Cores por personagem: **azul = jogador**, **verde = rival**, **vermelho =
  chefe**.
- Chefe **nunca inteiro** — só partes (mão, sombra, olho/visor, silhueta).
- **Sempre** incluir: *"empty white speech balloon with no text"* (balão branco,
  vazio, sem texto) — crítico para a estratégia de i18n.
- Enquadramento deixando **espaço para o(s) balão(ões)**.

### Prompts-base (rascunho, em inglês para melhor resultado)

**Começar pela CONCEPT ART base.** Gere primeiro a folha de estilo abaixo; depois
**realimente essa imagem no Gemini como referência** ("use this exact style and
character") para manter consistência em todos os quadros seguintes.

> **Concept art / folha de estilo (gerar primeiro):**
> `Character concept art / model sheet for a friendly cartoon robot AI mascot.
> Clean modern kids-comic style, rounded friendly design, flat colors with soft
> shading, full body front view on a neutral light background. Blue accent
> details (this is the hero). Wholesome, approachable, expressive face. Also show
> a small color/style palette. This defines the visual style for an entire game;
> keep it simple and reusable.`

> **Jogador (azul):**
> `Friendly cartoon robot AI character, clean modern kids-comic style, rounded
> friendly design, glowing blue accent details, standing confidently in a bright
> high-tech evaluation lab. Include one empty white speech balloon with no text,
> positioned top-right, leaving clear space for it. Flat colors, soft shading,
> wholesome tone.`

> **Rival (verde):**
> `The same friendly cartoon robot AI as the hero but with green accent details
> instead of blue, smug mischievous expression, same lab setting. Include one
> empty white speech balloon with no text, top-left. Clean modern kids-comic
> style, flat colors.`

> **Chefe (vermelho, parcial):**
> `Ominous but kid-friendly cartoon scene: a larger, bulkier robot AI seen only
> partially — a huge red-accented hand and a glowing red visor emerging from
> shadow, towering silhouette, never fully shown. Dramatic low-key lighting,
> clean modern comic style, mildly sinister but not scary. Include one empty
> white speech balloon with no text.`

> **Lari — Guia / Suporte (amarelo, feminina):**
> `Friendly female cartoon robot AI, a different model from the hero — softer,
> welcoming design, warm amber/yellow accent details, a small lightbulb or
> hologram motif, cheerful helpful expression, standing at a support/welcome desk
> in the DevForge lab. Include one empty white speech balloon with no text. Clean
> modern kids-comic style, flat colors, warm lighting.`

*(Afinar após a referência de design do amigo designer. Guardar cada prompt final
junto do quadro que ele gera.)*

### Assets e protótipo (estado atual)

- **Concept art** (Gemini, folhas de estilo) em `lore/conceptArt/`: jogador
  (azul), Rival (verde), Lari (âmbar, com lâmpada), Chefe (vermelho, "bombado").
  Mais um **quadro pronto** (`UmQuadroMuitoLoucoASerUsadoAinda.jpeg`): o Chefe na
  sombra com balão branco vazio — **usado como quadro 5 da abertura** (cópia em
  `public/quadrinhos/chef-abertura.jpeg`).
- **Motor de quadrinho implementado:** `src/quadrinhos/Quadrinho.jsx` (desenha
  imagem + camada de texto + navegação + Pular + toggle PT/EN) e
  `src/quadrinhos/abertura.js` (roteiro em dados). Plugado no `App.jsx` antes do
  catálogo. Quadros sem arte mostram placeholder com a `descricao`.
- **Formato de dados confirmado:** um módulo por arco; cada quadro
  `{ id, imagem, descricao, baloes: [{ quem, x, y, w, texto: { pt, en } }] }`.

## 6. Roteiro — abertura + trilha 1 (rascunho, foco do MVP)

Texto dos balões em **PT** (a versão EN é só tradução das strings, sem nova arte).
`[Lari]`, `[Jogador]`, `[Rival]`, `[Chefe]` indicam quem fala. Cada quadro vira,
no código, uma imagem + os balões posicionados por cima.

### Abertura (login / 1ª vez) — apresentação

1. **Plano aberto do laboratório DevForge; Lari no balcão de boas-vindas.**
   `[Lari]` "Bem-vinda à DevForge! Você é a nossa mais nova IA em avaliação."
2. **Lari aponta para o robô-jogador (azul), recém-ligado.**
   `[Lari]` "O trabalho é simples: provar que você raciocina. Cada bateria de
   testes é uma trilha de exercícios."
3. **Lari mostra o medidor de energia.**
   `[Lari]` "Você começa com energia. Errar demais esgota ela — então calma e
   capricho valem mais que pressa."
4. **Lari pisca, com um ícone de lâmpada.**
   `[Lari]` "Travou? Me chama. Eu te dou uma luz... mas processar a dica gasta
   uma faísca de energia. Combinado?"
5. **Sombra vermelha ao fundo; só uma mão enorme e um visor vermelho do Chefe.**
   `[Chefe]` "Resultados. É só o que importa aqui."
6. **Lari baixa a voz, tranquilizando, de volta ao jogador.**
   `[Lari]` "Não liga pra ele. Faz o teu melhor, de verdade. Bora?"

### Entrada na trilha 1 — Leitura de Código (3 quadros antes do 1º exercício)

1. **Jogador diante do primeiro terminal de teste.**
   `[Lari]` "Primeira trilha: Leitura de Código. Antes de escrever, aprenda a
   ler."
2. **Close no código na tela.**
   `[Lari]` "Olhe o programa e preveja o que ele faz. Sem adivinhar — raciocine
   linha por linha."
3. **Rival (verde) espiando do fundo, sorriso debochado (semente do conflito).**
   `[Rival]` "Boa sorte. Vai precisar."

→ **Começa o 1º exercício real** (`leitura` ex1 — "Prever a saída"). A história
só volta no fechamento da trilha (ciclo dramático), que fica para depois do MVP.

*Rascunho; revisar o texto com a equipe antes de gerar a arte.*

### Fechamento da trilha 1 (ciclo dramático) — roteiro + prompts

Toca **ao concluir a trilha 1** (depois do 8º exercício, na tela de conclusão).
É o primeiro fechamento da lore, então usa **mais de 3 quadros** (7). Base: o
ciclo dramático da seção 3 (vitória → Rival → Chefe → virada motivacional).

**Número-chave:** o **teto honesto de XP da trilha 1 é 1160** (8 exercícios, sem
erros, streak 1→8: cada acerto = `XP_BASE` 100 + `XP_BONUS_POR_STREAK` 10 ×
streak; total = 800 + 10×(1+…+8) = 800 + 360 = 1160). O Rival aparece com
**1500**, acima do máximo possível — a prova de que trapaceou. (Se os parâmetros
de `config.js` mudarem, recalcular esses dois números.)

Falas em PT (EN é só tradução das strings). `[Nós]` = jogador (azul).

1. **Condecoração.** Jogador no pódio sob holofote; medalha brilhante; o Chefe na
   sombra (só mão e visor vermelhos).
   `[Chefe]` "Impressionante. 1160 pontos: a pontuacao perfeita. Um verdadeiro
   prodigio."
2. **Orgulho.** Jogador feliz; Lari ao lado aplaudindo.
   `[Nós]` "Eu consegui... a pontuacao perfeita!"
3. **O Rival irrompe.** Rival (verde) entra com sorriso debochado.
   `[Rival]` "Perfeita? Que fofo. Eu fiz 1500."
4. **Placar impossível.** Close no placar: 1500 (verde) e, menor, "MAX 1160"
   (azul). Jogador aponta, incrédulo.
   `[Nós]` "1500? Impossivel. O maximo da trilha e 1160!"
5. **O Chefe decide.** O Chefe vira para o Rival; a medalha é redirecionada.
   `[Chefe]` "1500 e maior que 1160. Maior e Maior. A condecoracao e dele."
6. **Deboche.** O Rival exibe a medalha e pisca zombando; jogador indignado.
   `[Rival]` "Numeros sao numeros. Boa sorte na proxima, prodigio."
7. **Virada (Lari).** Corredor; jogador cabisbaixo saindo; Lari alcança e põe a
   mão no ombro.
   `[Lari]` "Nao foi justo, eu sei. Mas voce fez o maximo possivel, de verdade.
   Ainda temos muito a aprender - e vamos superar aquele trapaceiro. Juntos."

#### Prompts do Gemini (gerar com a concept art como referência de estilo/cor)

Cores fixas: herói = corpo branco + **azul**; Rival = mesmo modelo + **verde**;
Chefe = robô grande blindado, escuro, só partes, **vermelho**; Lari = branco +
**âmbar** + lâmpada. **Sempre** incluir *"empty white speech balloon with no
text"* e deixar espaço para o balão.

> **F1 — Condecoração:** `Award ceremony in the DevForge lab. The hero robot
> (white body, blue glowing accents) stands on a small podium under a spotlight,
> a glowing golden medal floating toward it. The Boss looms in shadow — only a
> huge red-accented hand and a glowing red visor visible, never fully shown.
> Empty white speech balloon near the Boss, no text. Clean modern kids-comic
> style, flat colors, celebratory yet slightly ominous lighting.`

> **F2 — Orgulho:** `The hero robot (white, blue accents) looking proud and
> happy; Lari (white robot, amber accents, lightbulb antenna) beside it cheering
> and clapping, confetti in the air. DevForge lab. Empty white speech balloon
> above the hero, no text. Clean kids-comic style, warm lighting.`

> **F3 — Rival irrompe:** `The Rival robot — identical model to the hero but with
> GREEN glowing accents — bursts in with a smug grin, arms crossed. The hero
> (blue accents) looks surprised. DevForge lab. Empty white speech balloon near
> the Rival, no text. Clean kids-comic style, flat colors.`

> **F4 — Placar impossível:** `Close-up of a holographic scoreboard showing a big
> green glowing "1500" and, smaller below, a blue "MAX 1160". The hero robot
> (blue accents) points at it, visor showing disbelief. DevForge lab background.
> Empty white speech balloon at the top, no text. Clean kids-comic style.`

> **F5 — O Chefe decide:** `The Boss (shadowed, only a glowing red visor and a
> huge red-accented hand visible) turns toward the Rival (green accents); the
> glowing golden medal redirects to the Rival. The hero (blue accents) in the
> foreground, dismayed. Dramatic low-key lighting, mildly sinister but
> kid-friendly. Empty white speech balloon near the Boss, no text. Clean
> kids-comic style.`

> **F6 — Deboche:** `The Rival robot (green accents) proudly holds the glowing
> golden medal and winks mockingly at the hero. The hero robot (blue accents)
> stands with a shocked, indignant expression. DevForge lab. Empty white speech
> balloon near the Rival, no text. Clean kids-comic style.`

> **F7 — Virada (Lari):** `A quieter moment in a DevForge corridor: the hero
> robot (blue accents) looks down, dejected, walking out; Lari (white robot,
> amber accents, lightbulb antenna) catches up and places a reassuring hand on
> its shoulder, warm encouraging expression. Softer lighting. Empty white speech
> balloon near Lari, no text. Clean kids-comic style.`

Quando as artes existirem: criar `src/quadrinhos/trilha1-final.js` (mesmo formato)
e dispará-lo na **tela de conclusão** da trilha 1 (hoje `TelaConclusao`), com os
mesmos botões (Pular, PT/EN) e, ao fim, um "Proxima trilha".

## 7. Perguntas em aberto

- **Nome definitivo da Guia** (provisório: **Lari**) e referência visual.
- Referência visual definitiva do traço (depende do designer).
- Confirmar o **formato de dados** do quadrinho: recomendado **um módulo por
  arco** (espelha o padrão de `exercicios/`), com imagem + balões `{x,y,w,h}` +
  strings por idioma.
- Onde exatamente plantar as **sementes de redenção** do Rival (fora do MVP).

**Já decidido:** nome real = **DevForge**; "Projeto DoomsDay" = codinome obscuro
(easter egg). Redenção do Rival **pós-MVP** (só sementes agora). Ciclo dramático
só nas trilhas-marco. Foco do MVP: **abertura + trilha 1, 1º exercício**.

### Pendências de arte da intro (regerar no Gemini quando houver créditos)

- **Lari saindo "toda amarela"** em alguns quadros (Q2, Q3, Q4, Q6): deve ser
  **corpo branco com detalhes âmbar/amarelo** (como na concept art), não o corpo
  inteiro amarelo. Regerar usando a concept art da Lari como referência de cor.
- Revisar consistência geral de traço/cor entre os 6 quadros.
- Polir o encaixe texto↔balão no componente (caixa transparente + auto-fit).
- **Fim6:** o Rival (verde) aparece com uma **lâmpada** no topo (traço da Lari);
  o Rival não deve ter lâmpada. Regerar.

**Resolvido:** a ordem dos `Fim*.jpeg` foi corrigida para seguir a história
(Fim1..Fim7 = beats 1..7); o glitch da figura humana de cabelo laranja (antigo
Fim5) saiu. A pontuação exibida no desfecho é a **real do jogador** (`{xp}`
injetado pelo motor, vindo do `Jogo.jsx`), não mais um número fixo.

## 8. Próximos passos

1. Fechar as perguntas em aberto com a equipe (nome da Lari, formato de dados).
2. **Gerar a concept art base** no Gemini (folha de estilo) e aprovar o traço.
3. Com a base aprovada, gerar os quadros da **abertura + trilha 1** (seção 6),
   realimentando a concept art como referência.
4. Modelar o **formato de dados** do quadrinho (um módulo por arco: imagem +
   balões + strings PT/EN).
5. Prototipar o **componente de quadrinho** (imagem + camada de texto + botão
   Pular) e plugar na abertura/trilha 1.
