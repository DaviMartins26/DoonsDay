// Tela mostrada ao concluir a trilha (passou por todos os exercicios).
export default function TelaConclusao({ xpTotal, vidas, aoRecomecar }) {
  return (
    <main>
      <h1>DevForge</h1>
      <h2>Trilha concluida!</h2>
      <p>XP total: {xpTotal}</p>
      <p>Vidas restantes: {vidas}</p>
      <button type="button" onClick={aoRecomecar}>
        Recomecar
      </button>
    </main>
  )
}
