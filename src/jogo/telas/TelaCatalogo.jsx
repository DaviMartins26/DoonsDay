// ============================================================================
// TelaCatalogo.jsx - Escolha da trilha (catalogo do bloco)
// ----------------------------------------------------------------------------
// Lista as trilhas do bloco de Logica de Programacao para o usuario escolher
// qual jogar. Tela "burra": recebe o bloco, as trilhas e o callback aoEscolher.
// Estilo no tema DevForge (classes em styles.css).
// ============================================================================

export default function TelaCatalogo({ bloco, trilhas, aoEscolher }) {
  return (
    <main>
      <h1>DevForge</h1>
      <h2>{bloco.titulo}</h2>
      <p>{bloco.descricao}</p>

      <ul className="cat-lista">
        {trilhas.map((trilha, i) => (
          <li key={trilha.id} className="cat-card">
            <h3>
              {i + 1}. {trilha.titulo}{' '}
              <small>({trilha.exercicios.length} exercicios)</small>
            </h3>
            <p>{trilha.descricao}</p>
            <button type="button" className="df-primario" onClick={() => aoEscolher(trilha.id)}>
              Comecar
            </button>
          </li>
        ))}
      </ul>
    </main>
  )
}
