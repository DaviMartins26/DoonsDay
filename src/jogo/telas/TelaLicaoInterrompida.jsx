// Tela mostrada quando a energia chega a zero (a licao e interrompida).
// E "burra": so apresenta. O motor (Jogo.jsx) decide quando mostra-la.
export default function TelaLicaoInterrompida({ xpTotal, aoRecomecar, aoVoltar }) {
  return (
    <main>
      <div className="df-cartao">
        <h1>DevForge</h1>
        <h2>Licao interrompida</h2>
        <p>Voce ficou sem energia.</p>
        <p>XP acumulado: {xpTotal}</p>
        <div className="df-acoes">
          <button type="button" className="df-primario" onClick={aoRecomecar}>
            Recomecar
          </button>
          {aoVoltar && (
            <button type="button" onClick={aoVoltar}>
              Voltar ao catalogo
            </button>
          )}
        </div>
      </div>
    </main>
  )
}
