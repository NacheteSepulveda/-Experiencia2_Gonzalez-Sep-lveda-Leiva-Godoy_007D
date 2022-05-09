		$.validator.setDefaults({
			submitHandler: function() {
				alert("enviado!");
			}
		});

		$().ready(function() {

			$.validator.addMethod("formtarjeta", function (value, element) {
                var patron = /^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11}))$/;
                return this.optional(element) || patron.test(value);
             }, "Formato del tarjeta incorrecto");

			$("#formulario-donar").validate({
				rules: {
					nombre: {
						required: true,
						minlength: 3
					},
					apellido: {
						required: true,
						minlength: 3
					},
					metodo: {
						required: true,
					},
					Numerotarjeta: {
						formtarjeta : true,
						required: true,
						minlength:16
					},
					fecha: {
						required: true
					},
					cvv: {
						required: true
					},
					aceptar: {
						required: true
					}
				},
				messages: {
					nombre: {
						required: "Debes de ingresar un nombre",
						minlength: "Tu nombre debe tener al menos 3 caracteres"
					},
					apellido: {
						required: "Debes ingresar un apellido",
						minlength: "Tu Apellido debe tener al menos 3 caracteres"
					},
					metodo: {required: "Debes ingresar un tipo de pago"
					},
					Numerotarjeta: {
						formtarjeta: "Debes ingresar el numero de tu tarjeta valido",
						required: "Debes ingresar el numero de tu tarjeta valido",
						minlength: "Faltan digitos de su tarjeta"
					},
					fecha: {
						required: "Debes ingresar la fecha de expiracion"
					},
					cvv: {
						required: "Debes ingresar los 3 digitos de la parte trasera de tu tarjeta"
					},
					aceptar: {
						required: "Debes aceptar la politica no reembolsable"
					}
				}

			});
		});

		