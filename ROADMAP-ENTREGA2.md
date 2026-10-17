# Roadmap — Entrega II (Sprint 2)

> Guia de prioridades do DevForge para a Entrega II (16/11/2026). A ordem
> considera **prazo** (o documento é o entregável avaliado), **dificuldade** e
> **necessidade interna** (o que um front precisa que outro já esteja pronto).
> Pensado para trabalho individual no momento. Marque os `[ ]` conforme avançar.
>
> Legenda de dependência: 🔓 começa sem depender de nada · ⛓️ depende de outro
> item · 👥 depende de terceiros (designer / conta de API / orientadora).

---

## Ordem recomendada

1. Metodologia da trilha
2. Consolidar história (texto)
3. Documento (Entrega II)
4. Consolidar MVP (código)
5. IA em stub + conta de API
6. Paralelos assíncronos (imagens, Firebase, IA real)

Os três primeiros alimentam o documento e são baratos/independentes; o quarto é
código que já dominamos; o quinto e o sexto concentram o que é mais difícil ou
depende de terceiros, para não travar o restante.

---

## 1. Metodologia da trilha 🔓👥

**Por que primeiro:** é barato, não exige código e alimenta tanto a tabela de
resultados de aprendizagem do Capítulo 3.3 quanto o conteúdo do MVP. Precisa de
validação da orientadora (tempo externo), então começa cedo para caber o
vai-e-volta.

- [ ] Definir a metodologia de ensino da 1ª trilha (lógica de programação)
- [ ] Basear o conteúdo na matéria do 1º período do curso
- [ ] Mapear cada exercício a um resultado de aprendizagem (alimenta o 3.3)
- [ ] Definir a mecânica de jogo associada a cada resultado
- [ ] Validar a metodologia com a orientadora

## 2. Consolidar história (texto) 🔓

**Por que cedo:** o roteiro em texto não depende de designer nem do Gemini.
Destrava o campo "História do Jogo" do Capítulo 3.3 e a integração da narrativa
no protótipo. As imagens entram depois (front 6).

- [ ] Escrever o roteiro / storyboard em texto (quadro a quadro)
- [ ] Definir o elenco: protagonista (robô/IA), rival (trapaceiro), chefe/vilão
      (olhos cartunescos, nunca mostrado por inteiro), figurantes
- [ ] Definir os pontos de injeção da história: abertura no login, 3 quadros no
      início da trilha, 1–2 no meio, 3 no fim (cerimônia + rival trapaceia +
      vilão ignorante "maior é maior" + volta para o escritório)
- [ ] Amarrar cada arco da lore a um resultado de aprendizagem da trilha

## 3. Documento — Entrega II ⛓️

**Por que central:** é o entregável com nota e data (16/11). Comece pelas
revisões que não dependem de nada; escreva o 3.3 e o Cap. 4 conforme os fronts 1
e 2 forem fechando.

- [ ] Revisar a Revisão da Literatura (Cap. 2) com feedback da banca/orientadora
- [ ] Revisar a Especificação do Projeto (Cap. 3): Personas (+ cards/figuras) e
      Requisitos Funcionais
- [ ] Escrever o Cap. 3.3 — Especificação da Solução (Jogo): quadro com Nome,
      Tecnologias, Tema de ES, História (← front 2), Objetivos, Inspirações
- [ ] Preencher a tabela do 3.3: Id / Resultado de Aprendizagem / Tema de Estudo
      / Mecânica (← front 1)
- [ ] Escrever o Cap. 4 — Validação da Ferramenta (ambiente, condições,
      procedimentos, análise de resultados, como validar o aprendizado)
- [ ] Revisar o Cap. 5 — Cronograma (status da Sprint II) e Riscos
- [ ] Ajustar a reorganização de capítulos exigida pelo template v2023v3

## 4. Consolidar MVP (código) ⛓️

**Por que aqui:** código que já dominamos, risco baixo. Os 7 tipos e as
mecânicas básicas já existem; falta alinhar à lore e às regras finais do TCC.
Filosofia atual: fazer funcionar primeiro, embelezar depois.

- [x] 7 tipos de exercício implementados
- [x] Mecânica de vidas (versão básica: 3 vidas, −1 a cada 2 erros)
- [x] Mecânica de streak
- [x] Mecânica de XP (com bônus de streak)
- [x] Dicas progressivas ao errar
- [x] Só avança ao acertar; telas de lição interrompida e conclusão
- [ ] Revisar/consolidar os 7 tipos à luz da metodologia (front 1)
- [ ] Renomear "vida" para "energia" (coerência com o robô da lore) no
      `config.js` e nas telas
- [ ] Decidir e implementar a regra: **pedir dica consome energia?**
- [ ] Alinhar à regra final do TCC: 10 de energia, perda só após o 3º erro
      (RF07/RF08) e dicas a partir do 3º erro (RF06/RF09)
- [ ] Integrar a história ao protótipo (depende do front 2)
- [ ] Manter apenas o CSS mínimo de leitura (embelezar fica para o futuro)

## 5. IA em stub + conta de API ⛓️👥

**Por que depois do núcleo:** dificuldade alta e depende de conta/créditos. O
stub local (regra fixa) já funciona hoje e permite desenvolver o fluxo sem gastar
tokens. A chave da API nunca vai no front-end — fica num backend.

- [ ] Manter o feedback em stub local enquanto desenvolve
- [ ] Escolher a IA e a arquitetura (API de nuvem; backend esconde a chave)
- [ ] Desenvolver o backend mínimo (Node/serverless): recebe resposta/código +
      rubrica, chama a API, devolve o feedback
- [ ] Escrever a rubrica de correção + o prompt de scaffolding (apoia o
      raciocínio, não entrega a resposta)
- [ ] Testar a integração React → backend → API → React
- [ ] Criar a conta Anthropic API + créditos (a assinatura do chat **não** serve)
- [ ] Definir teto de tokens nos testes

## 6. Paralelos assíncronos (não bloqueiam o trabalho individual) 👥

**Por que por último / em paralelo:** dependem de terceiros ou não têm urgência
de prazo. Correm ao lado dos demais fronts.

- [ ] Imagens da lore via Gemini (depende da base de design do amigo designer)
- [ ] Componente de quadrinho dinâmico (imagem + efeito no clique + próximo quadro)
- [ ] Botão "pular história", presente em todos os momentos
- [ ] Exercício de Git ao fim da trilha: usuário sobe no GitHub e a IA avalia o
      código do repositório (depende do backend do front 5)
- [ ] POC do Firebase (login + salvar XP de um usuário) — diferencial importante,
      mas não urgente; vira material para os Cap. 3.3 e 4

---

## Observações de dependência (o "norte")

- A **metodologia (1)** e a **história-texto (2)** destravam o **3.3 do documento (3)**.
- O **documento (3)** tem prazo (16/11) e não pode esperar os demais; por isso suas
  revisões independentes começam já.
- A **conta de API (5)** bloqueia a **IA real**; até lá, tudo em stub.
- **Imagens, Firebase e IA real (6)** dependem de terceiros/conta e correm em paralelo.
