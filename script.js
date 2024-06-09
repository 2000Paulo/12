// Verifique se o navegador suporta geolocalização
if (navigator.geolocation) {
    // Opções para a obtenção da localização
    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };

    // Obtenha a localização do usuário com as opções especificadas
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback, options);
} else {
    console.error("Geolocalização não é suportada neste navegador.");
}

// Função de callback de sucesso para a obtenção da localização
function successCallback(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    console.log("Latitude: " + latitude + ", Longitude: " + longitude);

    // Chame a função para inicializar o mapa após obter a localização
    initMap(latitude, longitude);
}

// Função de callback de erro para a obtenção da localização
function errorCallback(error) {
    console.error("Erro ao obter a localização: " + error.message);

    // Verifique o tipo de dispositivo
    var userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.indexOf('android') > -1) {
        // Dispositivo Android
        if (confirm('Por favor, habilite o GPS para uma melhor experiência. Você pode fazer isso nas configurações do seu dispositivo.')) {
            // Redirecione o usuário para as configurações do dispositivo
            window.location.href = 'geo:';
        }
    } else if ((userAgent.indexOf('iphone') > -1) || (userAgent.indexOf('ipad') > -1)) {
        // Dispositivo iOS (iPhone ou iPad)
        if (confirm('Por favor, habilite o GPS para uma melhor experiência. Você pode fazer isso nas configurações do seu dispositivo.')) {
            // Redirecione o usuário para as configurações do dispositivo
            window.location.href = 'App-Prefs:root=Privacy&path=LOCATION';
        }
    }
}

// Função para inicializar o mapa com a localização do usuário
function initMap(latitude, longitude) {
    // Coordenadas iniciais do mapa
    var myLatLng = {lat: latitude, lng: longitude};

    // Opções do mapa
    var mapOptions = {
        zoom: 14, // Aumentei o zoom para tornar o mapa mais detalhado
        center: myLatLng
    };

    // Crie um novo mapa no elemento com ID 'map'
    var map = new google.maps.Map(document.getElementById('map'), mapOptions);

    // Adicione um marcador no mapa com a localização do usuário
    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: 'Seu Local'
    });
}
