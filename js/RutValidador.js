class RutValidador {
    constructor(rut) {
        this.rut = rut;
        //Obtendremos el ultimo caracter del rut
        this.dv = rut.substring(this.rut.length - 1);
        //Limpiar el rut dejando solamente los numeros
        this.rut = this.rut.substring(0, this.rut.length -1).replace(/\D/g,'');
        this.esValido = this.validar()
    }

    validar(){
        let numerosArray = this.rut.split('').reverse()
        let acomulador = 0;
        let multiplicador = 2;
        for (let numero of numerosArray) {
            acomulador += parseInt(numero) * multiplicador;
            multiplicador++;

            if (multiplicador == 8){
                multiplicador = 2;
            }
        }

        let dv = 11 - (acomulador%11);
        if(dv == 11){
            dv = '0';
        }
        if(dv == 10){
            dv = 'k';
        }
        return dv == this.dv.toLowerCase();
    }

    formato(){
        if(!this.esValido) return '';

        return (this.rut.toString().replace(/\B(?=(\d{3})+(?!\d))/g,'.'))+'-'+this.dv;
    }
}

let validador = new RutValidador('30.686.957-4')
console.log(validador.formato())


function resultado(){
$(document).on('click', '#btn-validar', () => {
    let rut = $("#txt-rut").val();
    let rutValidador = new RutValidador(rut)
    if(rutValidador.esValido) {
        $('#resultado').html(mostrarMensaje('success', `Rut Valido ${rutValidador.formato()}`))
        return;
    }
    $('#resultado').html(mostrarMensaje('danger', 'Rut Invalido'))
})

function mostrarMensaje(tipo, mensaje) {
    return `
        <div class='alert alert-${tipo} mt-2'>
            <strong>${mensaje}</strong>
        </div>
        `;
}
}
