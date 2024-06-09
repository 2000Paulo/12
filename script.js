// Função para verificar se o GPS está habilitado
function checkGPSEnabled() {
    // Verifica se o navegador suporta geolocalização
    if (navigator.geolocation) {
        // Tenta obter a localização do usuário continuamente
        navigator.geolocation.watchPosition(
            function(position) {
                // Se a localização for obtida com sucesso, chame a função para atualizar o mapa
                updateMap(position.coords.latitude, position.coords.longitude);
            },
            function(error) {
                // Se ocorrer um erro ao obter a localização, verifique se o erro é devido à permissão negada
                if (error.code === error.PERMISSION_DENIED) {
                    // Se for devido à permissão negada, solicite ao usuário que ative o GPS
                    if (confirm('Por favor, habilite o GPS para uma melhor experiência.')) {
                        // Se o usuário concordar, tente obter a localização novamente
                        checkGPSEnabled();
                    }
                } else {
                    // Se for outro erro, exiba uma mensagem de erro genérica
                    console.error("Erro ao obter a localização: " + error.message);
                }
            }
        );
    } else {
        console.error("Geolocalização não é suportada neste navegador.");
    }
}

// Chame a função para verificar se o GPS está habilitado
checkGPSEnabled();

// Função para atualizar o mapa com a nova posição do usuário
function updateMap(latitude, longitude) {
    // Coordenadas da nova posição do usuário
    var newPosition = new google.maps.LatLng(latitude, longitude);

    // Move o marcador para a nova posição no mapa
    marker.setPosition(newPosition);

    // Centraliza o mapa na nova posição do usuário
    map.setCenter(newPosition);
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
    map = new google.maps.Map(document.getElementById('map'), mapOptions);

    // Adicione um marcador inicial no mapa com a localização do usuário
    marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: 'Seu Local'
    });
}
