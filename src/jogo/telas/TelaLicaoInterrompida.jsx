// Tela mostrada quando as vidas chegam a zero (a licao e interrompida).
// E "burra": so apresenta. O motor (Jogo.jsx) decide quando mostra-la.
export default function TelaLicaoInterrompida({ xpTotal, aoRecomecar }) {
  return (
    <main>
      <h1>DevForge</h1>
      <h2>Licao interrompida</h2>
      <p>Voce ficou sem vidas.</p>
      <p>XP acumulado: {xpTotal}</p>
      <button type="button" onClick={aoRecomecar}>
        Recomecar
      </button>
    </main>
  )
}
