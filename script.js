// Variáveis globais para o mapa e marcador
var map;
var marker;

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
                    // Se for devido à permissão negada, exiba uma mensagem informando ao usuário que o GPS está desativado
                    alert('Por favor, habilite o GPS para uma melhor experiência. O sistema será carregado após a ativação do GPS.');
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

    // Se o marcador ainda não foi criado, crie-o
    if (!marker) {
        marker = new google.maps.Marker({
            position: newPosition,
            map: map,
            title: 'Seu Local'
        });
    } else {
        // Se o marcador já existe, apenas atualize sua posição
        marker.setPosition(newPosition);
    }

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

    // Chame a função para atualizar o mapa com a posição inicial do usuário
    updateMap(latitude, longitude);
}
