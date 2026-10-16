// Utilitarios compartilhados entre os tipos de exercicio.

// Normaliza texto livre para comparar sem frescura: remove espacos, quebras de
// linha e virgulas, e deixa minusculo. Assim "1 2 3", "123" e "1,2,3" sao iguais.
export function normalizar(valor) {
  return String(valor).replace(/[\s,]/g, '').toLowerCase()
}

// Handler de teclado para campos de ESCOLHA (radio / "bolinhas").
// Faz o Tab (sem Shift) pular direto para o botao Verificar, em vez de andar
// entre as opcoes - entre as opcoes a navegacao continua pelas setas. Melhora o
// uso so no teclado, comum entre programadores.
//
// Uso no <input type="radio">:  onKeyDown={tabParaVerificar(focarVerificar)}
// "focarVerificar" e uma funcao (vem do motor) que poe o foco no botao Verificar.
export function tabParaVerificar(focarVerificar) {
  return (evento) => {
    if (evento.key === 'Tab' && !evento.shiftKey && typeof focarVerificar === 'function') {
      evento.preventDefault()
      focarVerificar()
    }
  }
}
