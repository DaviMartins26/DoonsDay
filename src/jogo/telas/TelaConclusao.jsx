// Tela mostrada ao concluir a trilha (passou por todos os exercicios).
export default function TelaConclusao({ xpTotal, vidas, aoRecomecar, aoVoltar }) {
  return (
    <main>
      <h1>DevForge</h1>
      <h2>Trilha concluida!</h2>
      <p>XP total: {xpTotal}</p>
      <p>Energia restante: {vidas}</p>
      <p>
        <button type="button" onClick={aoRecomecar}>
          Recomecar
        </button>{' '}
        {aoVoltar && (
          <button type="button" onClick={aoVoltar}>
            Voltar ao catalogo
          </button>
        )}
      </p>
    </main>
  )
}
