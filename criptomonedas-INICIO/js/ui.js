'use strict'

class Interfaz{
  constructor(){
    this.init();
  }
  init(){
    this.construirSelect();
  }
  construirSelect(){
    cotizador.obtenerMonedasAPI()
    .then(monedas =>{
      const select = document.getElementById('criptomoneda')
      for( const [key, value] of Object.entries(monedas.monedas.Data)){
          const option = document.createElement('option');
          option.value = value.Symbol;
          option.appendChild(document.createTextNode(value.CoinName))
          select.appendChild(option)
      }
    })
  }

  mostrarMensaje(mensaje, tipo){
    const div = document.createElement('div');
    div.className = tipo;
    div.appendChild(document.createTextNode(mensaje));
    const mensajes = document.querySelector('.mensajes');
    mensajes.appendChild(div)
    setTimeout(() => {
        document.querySelector('.mensajes div').remove()
    },2000);
  }

  mostrarResultado(resultado, moneda, crypto){

    const resultadoAnterior = document.querySelector('#resultado > div');
    if(resultadoAnterior){
      resultadoAnterior.remove();
    }

    const datosMoneda = resultado[crypto][moneda];
    let precio = datosMoneda.PRICE.toFixed(2);
    let variacionPrecio = datosMoneda.CHANGEPCTDAY.toFixed(2);
    let variacionFecha = new Date(datosMoneda.LASTUPDATE * 1000).toLocaleDateString('es-ES');
    let html = 
    `
    <div class="card bg-warning">
      <div class="card-body text-light">
        <h2 class="card-title">Resultado:</h2>
        <p>El precio de ${datosMoneda.FROMSYMBOL} a moneda ${datosMoneda.TOSYMBOL} es de: ${precio} $</p>
        <p>Variacón con respectoal último día: ${variacionPrecio} %</p>
        <p>Última actualización: ${variacionFecha}</p>
      </div>
    </div>
    `
    this.mostrarOcultarSpinner('block');
    setTimeout(() => {
    document.querySelector('#resultado').innerHTML = html;
    this.mostrarOcultarSpinner('none');
    },2000);
  }

    mostrarOcultarSpinner(vista){
     const spinner = document.querySelector('.contenido-spinner');
     spinner.style.display = vista;
    }
}

