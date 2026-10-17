// ============================================================================
// TelaCatalogo.jsx - Escolha da trilha (catalogo do bloco)
// ----------------------------------------------------------------------------
// Lista as trilhas do bloco de Logica de Programacao para o usuario escolher
// qual jogar. Tela "burra": recebe o bloco, as trilhas e o callback aoEscolher.
// ============================================================================

export default function TelaCatalogo({ bloco, trilhas, aoEscolher }) {
  return (
    <main>
      <h1>DevForge</h1>
      <h2>{bloco.titulo}</h2>
      <p>{bloco.descricao}</p>

      <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
        {trilhas.map((trilha, i) => (
          <li
            key={trilha.id}
            style={{ border: '1px solid #ccc', borderRadius: 6, padding: '0.75rem', marginBottom: '0.75rem' }}
          >
            <p style={{ margin: '0 0 0.25rem' }}>
              <strong>
                {i + 1}. {trilha.titulo}
              </strong>{' '}
              <small>({trilha.exercicios.length} exercicios)</small>
            </p>
            <p style={{ margin: '0 0 0.5rem' }}>{trilha.descricao}</p>
            <button type="button" onClick={() => aoEscolher(trilha.id)}>
              Comecar
            </button>
          </li>
        ))}
      </ul>
    </main>
  )
}
