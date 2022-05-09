function MostrarMapa(){
    var b="Ocultar Ubicacion"
    var c="block"
    if(document.getElementById("boton1").value==b)
    {
        b="Ubicacion de la tienda"
        c="none"
    }
    var i=document.getElementById("boton1").value=b;
    document.getElementById("mapas").style.display=c;

}

function MapaApi(){

var watchId;
var mapa = null;
var mapaMarcador = null;	

if (navigator.geolocation) {
	watchId = navigator.geolocation.watchPosition(mostrarPosicion, mostrarErrores, opciones);	
} else {
	alert("Tu navegador no soporta la geolocalización, actualiza tu navegador.");
}

function mostrarPosicion(posicion) {
	var latitud = posicion.coords.latitude;
	var longitud = posicion.coords.longitude;
	var miPosicion = new google.maps.LatLng(latitud, longitud);

	var latitud2 = -33.511219;
	var longitud2 = -70.752550;



	var gdestino = new google.maps.LatLng(latitud2, longitud2);

	var objConfigDR={
		map:mapa
	}
	var objConfigDS={
		origin:miPosicion,
		destination:gdestino,
		travelMode:google.maps.TravelMode.DRIVING
	}

	var ds= new google.maps.DirectionsService();
	//obtener coordenadas
	var dr= new google.maps.DirectionsRenderer(objConfigDR);
	//traduce coordenadas a la ruta visible

	ds.route(objConfigDS, fnRutear);

	function fnRutear(resultados, status){
		//mostrar la linea entre A y B
		if(status=='OK'){
			dr.setDirections(resultados);
		}
		else{
			alert('Error'+status);
		}
	}



	// Se comprueba si el mapa se ha cargado ya 
	if (mapa == null) {
		// Crea el mapa y lo pone en el elemento del DOM con ID mapa
		var configuracion = {center: miPosicion, zoom: 16, mapTypeId: google.maps.MapTypeId.HYBRID};
		mapa = new google.maps.Map(document.getElementById("mapa"), configuracion);

		// Crea el marcador en la posicion actual
		mapaMarcador = new google.maps.Marker({position: miPosicion, title:"Esta es tu posición"});
		mapaMarcador.setMap(mapa);
	} else {
		// Centra el mapa en la posicion actual
		mapa.panTo(miPosicion);
		// Pone el marcador para indicar la posicion
		mapaMarcador.setPosition(miPosicion);
	}
}


function mostrarErrores(error) {
	switch (error.code) {
 		case error.PERMISSION_DENIED:
  			alert('Permiso denegado por el usuario'); 
  			break;
   		case error.POSITION_UNAVAILABLE:
    		alert('Posición no disponible');
     		break; 
     	case error.TIMEOUT:
      		alert('Tiempo de espera agotado');
       		break;
        default:
         	alert('Error de Geolocalización desconocido :' + error.code);
	}
}

var opciones = {
	enableHighAccuracy: true,
	timeout: 10000,
	maximumAge: 1000
};

function detener() {
	navigator.geolocation.clearWatch(watchId);
}

}



function alerta(){ 
	window.alert("¡Bienvenido a nuestra pagina llamada PawPet");
}

function MostrarTexto(){
    
    document.getElementById("texto").style.display="block";
	document.getElementById("texto2").style.display="block";
	document.getElementById("texto3").style.display="block";
}

function OcultarTexto(){
    document.getElementById("texto").style.display="none";
	document.getElementById("texto2").style.display="none";
	document.getElementById("texto3").style.display="none";
}