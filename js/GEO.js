function FindMe(){
    var output = document.getElementById('mapa');

    // Verificar si soporta geolocalizacion
    if (navigator.geolocation) {
        output.innerHTML = "<p>Tu navegador soporta Geolocalizacion</p>";
    }else{
        output.innerHTML = "<p>Tu navegador no soporta Geolocalizacion</p>";
    }

    //Obtenemos latitud y longitud
    function localizacion(posicion){

        var latitude = posicion.coords.latitude;
        var longitude = posicion.coords.longitude;

        var imgURL = "https://maps.googleapis.com/maps/api/staticmap?center="+latitude+","+longitude+"&size=600x300&markers=color:red%7C"+latitude+","+longitude+"&key=AIzaSyDO2wIp1Djj9W8cur7od8bHV9VzELD4tFA";

        output.innerHTML ="<img src='"+imgURL+"'>";

        

    }

    function error(){
        output.innerHTML = "<p>No se pudo obtener tu ubicación</p>";

    }

    navigator.geolocation.getCurrentPosition(localizacion,error);

}

