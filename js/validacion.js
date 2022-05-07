
		//Este mensaje de alerta es unicamente a modo de prueba para prevenir que se envie el formulario
		//Una vez configuradas las reglas de validacion y los mensajes se puede eliminar
		// -- ELIMINAR DESDE ACA --
		$.validator.setDefaults( {
			submitHandler: function () {
			   alert( "Registro Completo!" );
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
					rut: {
						required: true
					},
					email: {
						required: true,
						email: true
					},
					contraseña: {
						required: true,
						minlength: 7
					},
					contraseña2: {
						required: true,
						equalTo: "#contraseña"
					},
					genero: {
						required: true
					},
					estadocivil: {
						required: true
					},
					region: {
						required: true
					},
					dirección: {
						required: true,
						minlength: 15
					}
				},
				messages: {
					nombres: {
						required: "Debes ingresar tus nombres",
						minlength: "Debes ingresar al menos 5 caracteres"
					},
					apellido: {
						required: "Debes ingresar tus apellidos",
						minlength: "Debes ingresar al menos 12 caracteres"
					},
					email: {
						required: "Debes ingresar un email válido",
						email: "Email ingresado no es válido"
					},
					rut: {
						required: ""
					},
					contraseña: {
						required: "Debes una contraseña",
						minlength: "La contraseña debe tener al menos 7 caracteres"
					},
					contraseña2: {
						required: "Debes ingresar tu contraseña nuevamente",
						equalTo: "Las contraseñas no coinciden"
					},
					genero: {
						required: "Debes seleccionar un género"
					},
					estadocivil: {
						required: "Debes seleccionar tu estado civil"
					},
					region: {
						required: "Debes seleccionar tu region"
					},
					dirección: {
						required: "Debes ingresar tu dirección",
						minlength: "Tu dirección debe tener al menos 15 caracteres"
					}


				}

			});
		});
		//funcion para que seleccione solo 1 checkbox
		function getSelectItemThat(id) {
			for (var i = 1;i <= 4; i++)
			{
				document.getElementById(i).checked = false;
			}
			document.getElementById(id).checked = true;
		}

		//funcion para validar el rut
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
		
		function resultado() {
			let rut = $("#rut").val();
			let rutValidador = new RutValidador(rut)
			var visible="block"
			if(rutValidador.esValido) {
				visible="none"
			}
			$('#resultado').html(mostrarMensaje('Rut Invalido'));
			document.getElementById("resultado").style.display=visible;
		}
		
		function mostrarMensaje(mensaje) {
			return `
					<p style="color:red;">${mensaje}</p>
				`;
		}






