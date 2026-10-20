// ============================================================================
// quadrinhos/Quadrinho.jsx - MOTOR de quadrinho (independente do conteudo)
// ----------------------------------------------------------------------------
// Recebe um ROTEIRO (ex.: abertura.js) e o desenha quadro a quadro:
//   - a arte (imagem) ou um placeholder quando a arte ainda nao existe;
//   - os baloes de fala posicionados POR CIMA da imagem, com o texto vindo do
//     codigo (nao da imagem) - por isso a i18n (PT/EN) e so troca de string;
//   - navegacao (Anterior / Proximo) e o botao PULAR (puxa o fim do arco).
//
// Props:
//   - roteiro      : objeto { quadros: [...] } (ver abertura.js)
//   - aoFinalizar  : chamado ao pular ou passar do ultimo quadro
//   - idiomaInicial: 'pt' (padrao) | 'en'
// ============================================================================

import { useState } from 'react'

// Rotulo exibido antes da fala, por personagem.
const QUEM = { lari: 'Lari', nos: 'Nos', rival: 'Rival', chef: 'Chefe' }

export default function Quadrinho({ roteiro, aoFinalizar, idiomaInicial = 'pt' }) {
  const [indice, setIndice] = useState(0)
  const [idioma, setIdioma] = useState(idiomaInicial)

  const quadros = roteiro.quadros
  const quadro = quadros[indice]
  const ultimo = indice === quadros.length - 1

  function proximo() {
    if (ultimo) aoFinalizar()
    else setIndice(indice + 1)
  }
  function anterior() {
    if (indice > 0) setIndice(indice - 1)
  }

  return (
    <div className="quadrinho">
      <div className="quadrinho-barra">
        <span>
          {roteiro.titulo} - quadro {indice + 1}/{quadros.length}
        </span>
        <span>
          {/* Prova de que a i18n funciona so por codigo (sem reimagem). */}
          <button onClick={() => setIdioma(idioma === 'pt' ? 'en' : 'pt')}>
            {idioma === 'pt' ? 'EN' : 'PT'}
          </button>{' '}
          <button onClick={aoFinalizar}>Pular</button>
        </span>
      </div>

      <div className="quadrinho-palco">
        {quadro.imagem ? (
          <img className="quadrinho-arte" src={quadro.imagem} alt="" />
        ) : (
          <div className="quadrinho-arte quadrinho-placeholder">
            <span>[arte pendente] {quadro.descricao}</span>
          </div>
        )}

        {quadro.baloes.map((balao, i) => (
          <div
            key={i}
            className="quadrinho-balao"
            style={{ left: `${balao.x}%`, top: `${balao.y}%`, width: `${balao.w}%` }}
          >
            <strong>{QUEM[balao.quem] || balao.quem}:</strong> {balao.texto[idioma]}
          </div>
        ))}
      </div>

      <div className="quadrinho-nav">
        <button onClick={anterior} disabled={indice === 0}>
          Anterior
        </button>
        <button onClick={proximo}>{ultimo ? 'Comecar' : 'Proximo'}</button>
      </div>
    </div>
  )
}
