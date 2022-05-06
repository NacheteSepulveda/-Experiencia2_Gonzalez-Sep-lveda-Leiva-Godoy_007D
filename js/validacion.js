
		//Este mensaje de alerta es unicamente a modo de prueba para prevenir que se envie el formulario
		//Una vez configuradas las reglas de validacion y los mensajes se puede eliminar
		// -- ELIMINAR DESDE ACA --
		$.validator.setDefaults({
			submitHandler: function() {
				alert("enviado!");
			}
		});
		// -- ELIMINAR HASTA ACA --
		  
		$().ready(function() {
			// validate the comment form when it is submitted
			$("#registration").validate({
				rules: {
					nombres: {
						required: true,
						minlength: 5
					},
					apellido:{
						required: true,
						minlength: 12
					},
					email: {
						required: true,
						email: true
					},
					rut:{
						required: true,
						minlength: 5
					},
					comentario: {
						required: true,
						minlength: 5
					}
				},
				messages: {
					nombres: {
						required: "Debes completar tu Nombre",
						minlength: "Tu nombre debe tener al menos 3 caracteres"
					},
					apellidos: {
						required: "El campo comentarios es obligatorio",
						minlength: "El campo comentario debe tener al menos 5 caracteres"
					},
					email: {
						required: "Debes ingresar un email valido"
					}
				
				}

			});
		});

		function getSelectItemThat(id) {
			for (var i = 1;i <= 4; i++)
			{
				document.getElementById(i).checked = false;
			}
			document.getElementById(id).checked = true;
		}

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
			let rut = $("#rut").val();
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

