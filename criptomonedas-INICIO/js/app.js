'use strict'

const cotizador = new Api('b38049735a23bf7a0558f910747c92f981b1c9b765a78e16db8bf796f93cd54e');
const ui = new Interfaz();

const formulario = document.querySelector('#formulario');

formulario.addEventListener('submit', (event) => {
  event.preventDefault();

  const moneda = document.querySelector('#moneda');
  const monedaSelect = moneda.options[moneda.selectedIndex].value;
  
  const critptomoneda = document.querySelector('#criptomoneda');
  const criptomonedaSelect = critptomoneda.options[critptomoneda.selectedIndex].value;

  if(monedaSelect === '' || criptomonedaSelect === ''){
    ui.mostrarMensaje('Por favor, rellene ambos campos', 'text-center alert bg-danger')
  }else{
    cotizador.obtenerValores(monedaSelect, criptomonedaSelect)
    .then(data => {
      ui.mostrarResultado(data.resultado.RAW, monedaSelect, criptomonedaSelect );
    })
  }
})

