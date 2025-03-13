/* js/script.js */

// Inicializa o mapa centrado em Manaus
var map = L.map('map').setView([-3.119, -60.0217], 12);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Array para armazenar relatos de apagões
var outageReports = [];

/* 
   Função de geocodificação reversa utilizando Nominatim.
   Tenta extrair o nome do bairro (usando "neighbourhood", "suburb" ou "city_district").
   O callback recebe:
     - neighborhood: nome do bairro extraído (ou "Desconhecido" se não encontrado)
     - fullAddress: o display_name completo retornado
*/
function reverseGeocode(lat, lng, callback) {
  var url = 'https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=' + lat + '&lon=' + lng;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      if(data && data.address) {
        var neighborhood = data.address.neighbourhood || data.address.suburb || data.address.city_district || "Desconhecido";
        callback(neighborhood, data.display_name || "Local desconhecido");
      } else {
        callback("Desconhecido", "Local desconhecido");
      }
    })
    .catch(() => callback("Desconhecido", "Local desconhecido"));
}

// Define a data de hoje em formato brasileiro
document.getElementById('todayDate').textContent = new Date().toLocaleDateString('pt-BR');

// Visualiza o status de energia em Manaus e desenha um círculo
function checkPowerStatus() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var lat = position.coords.latitude;
      var lng = position.coords.longitude;
      map.setView([lat, lng], 15);
      reverseGeocode(lat, lng, function(neighborhood, fullAddress) {
        // Simulação: 70% de chance de ter energia
        var powerOn = Math.random() < 0.7;
        var statusText = powerOn ? "Energia disponível em " + neighborhood + "." : "Sem energia em " + neighborhood + ".";
        alert(statusText);
        // Desenha um círculo com 2 km de raio
        L.circle([lat, lng], {
          radius: 2000,
          fillColor: powerOn ? "#FFC107" : "#808080",
          color: powerOn ? "#FFC107" : "#808080",
          fillOpacity: 0.4
        }).addTo(map).bindPopup(statusText).openPopup();
      });
    }, function() {
      alert("Erro ao obter sua localização.");
    });
  } else {
    alert("Geolocalização não suportada.");
  }
}

// Reporta um apagão; o usuário precisa ter a localização ativada
function reportOutage() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var lat = position.coords.latitude;
      var lng = position.coords.longitude;
      var now = new Date();
      var datetime = now.toLocaleString('pt-BR');
      var dateStr = now.toISOString().slice(0, 10);
      reverseGeocode(lat, lng, function(neighborhood, fullAddress) {
        var report = {
          address: fullAddress,
          neighborhood: neighborhood,
          datetime: datetime,
          date: dateStr,
          status: "APAGÃO"
        };
        outageReports.push(report);
        updateReports();
        // Desenha um círculo cobrindo 2 km para o apagão reportado
        L.circle([lat, lng], {
          radius: 2000,
          fillColor: "#808080",
          color: "#808080",
          fillOpacity: 0.4
        }).addTo(map).bindPopup("Apagão: " + neighborhood + "<br>" + datetime).openPopup();
      });
    }, function() {
      alert("Erro ao obter sua localização. Certifique-se de que a localização esteja ativada.");
    });
  } else {
    alert("Geolocalização não suportada.");
  }
}

// Atualiza a seção de relatos, filtrando os registros do dia atual e permitindo pesquisar por bairro
function updateReports() {
  var reportsFeed = document.getElementById('reportsFeed');
  var filterVal = document.getElementById('neighborhoodFilter').value.toLowerCase();
  var today = new Date().toISOString().slice(0, 10);
  var todaysReports = outageReports.filter(report => report.date === today);
  if (filterVal) {
    todaysReports = todaysReports.filter(report => report.neighborhood.toLowerCase().includes(filterVal));
  }
  if (todaysReports.length === 0) {
    reportsFeed.innerHTML = "<p>Nenhum relato registrado para hoje.</p>";
  } else {
    reportsFeed.innerHTML = todaysReports.map(function(report) {
      return `<div class="report-item">
                <strong>Bairro:</strong> ${report.neighborhood}<br>
                <strong>Local:</strong> ${report.address.split(',')[0]}<br>
                <strong>Data/Horário:</strong> ${report.datetime}
              </div>`;
    }).join("");
  }
}
