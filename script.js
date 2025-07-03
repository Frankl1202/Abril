// Coordenadas de los puntos
const piuraCoords = [-5.1945, -80.6328]; // Piura, Perú
const entreRiosCoords = [-32.0587, -60.6617]; // Entre Ríos, Argentina

// Inicializar el mapa
const map = L.map('map').setView([-18.5, -70.6], 4);

// Agregar capa de mapa base
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Crear icono personalizado de girasol
const sunflowerIcon = L.divIcon({
    className: 'sunflower-marker',
    html: '🌻',
    iconSize: [30, 30],
    iconAnchor: [15, 15]
});

// Agregar marcadores con girasoles
const piuraMarker = L.marker(piuraCoords, { icon: sunflowerIcon })
    .addTo(map)
    .bindPopup('<b>Piura, Perú</b><br>Franklin');

const entreRiosMarker = L.marker(entreRiosCoords, { icon: sunflowerIcon })
    .addTo(map)
    .bindPopup('<b>Entre Ríos, Argentina</b><br>Abril');

// Crear línea que conecta los puntos
const routeLine = L.polyline([piuraCoords, entreRiosCoords], {
    color: '#ff6b6b',
    weight: 4,
    opacity: 0.8,
    dashArray: '10, 5'
}).addTo(map);

// Calcular distancia en kilómetros
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radio de la Tierra en kilómetros
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}

// Obtener distancia
const distance = calculateDistance(
    piuraCoords[0], piuraCoords[1],
    entreRiosCoords[0], entreRiosCoords[1]
);

// Agregar evento de clic a la línea
routeLine.on('click', function() {
    const distanceInfo = document.getElementById('distance-info');
    const questionPanel = document.getElementById('question-panel');
    
    distanceInfo.innerHTML = `
        <div style="background: #e8f5e8; padding: 15px; border-radius: 10px; border-left: 5px solid #28a745;">
            <strong>Distancia entre Abril y Franklin</strong><br>
            <span style="font-size: 1.5em; color: #28a745;">${distance.toFixed(0)} km</span><br>
            <small style="color: #6c757d;">Esos 3,638 km no van a impedir que te quiera Abril. De verdad me gustaría intentar algo contigo, pero la última palabra la tienes tú.</small>
        </div>
    `;
    
    // Mostrar el panel de la pregunta
    questionPanel.style.display = 'block';
    
    // Efecto visual en la línea
    routeLine.setStyle({ weight: 6, color: '#ff4757' });
    setTimeout(() => {
        routeLine.setStyle({ weight: 4, color: '#ff6b6b' });
    }, 1000);
});

// Ajustar vista del mapa para mostrar ambos puntos
const bounds = L.latLngBounds([piuraCoords, entreRiosCoords]);
map.fitBounds(bounds, { padding: [50, 50] });

// Agregar controles adicionales
L.control.scale().addTo(map);

// Información inicial
document.getElementById('distance-info').innerHTML = `
    <div style="color: #6c757d; font-style: italic;">
        Haz clic en la línea roja para ver la distancia
    </div>
`;

// Agregar animación a los marcadores
function animateMarkers() {
    const markers = [piuraMarker, entreRiosMarker];
    markers.forEach((marker, index) => {
        setTimeout(() => {
            marker.getElement().style.transform = 'scale(1.3)';
            setTimeout(() => {
                marker.getElement().style.transform = 'scale(1)';
            }, 300);
        }, index * 500);
    });
}

// Animar marcadores al cargar la página
setTimeout(animateMarkers, 1000);

// Funcionalidad para los botones
document.addEventListener('DOMContentLoaded', function() {
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');
    const questionPanel = document.getElementById('question-panel');
    
    // Botón Sí - Mostrar mensaje especial en modal
    yesBtn.addEventListener('click', function() {
        const modal = document.getElementById('modal');
        const modalBody = document.getElementById('modal-body');
        
        modalBody.innerHTML = `
            <h2 style="margin-bottom: 20px; text-align: center; color: white;">💕 Excelenteee 💕</h2>
            <p style="font-size: 1.3em; margin-bottom: 15px; color: white;">El plan va marchando a la perfeccción Jaja.</p>
            <p style="font-size: 1.1em; color: white;">Mor gracias por todo este tiempo, de verdad que me la paso muy genial contigo y me pone muy feliz ser importante para ti, espero algun dia de verdad llegarnos a conocer. Te quiero mucho. 🌻❤️</p>
            <div style="margin-top: 20px; font-size: 1.5em; background: rgba(255,255,255,0.2); padding: 10px; border-radius: 10px; text-align: center; color: white;">Boca 2(4) vs Alianza Lima 1(5)</div>
        `;
        
        modal.style.display = 'block';
        
        // Ocultar el panel de la pregunta
        questionPanel.style.display = 'none';
    });
    
    // Función para mover el botón No
    function moveNoButton() {
        const currentNoBtn = document.getElementById('no-btn');
        
        if (!currentNoBtn) return;
        
        // Obtener las dimensiones del panel de la pregunta
        const questionPanelRect = questionPanel.getBoundingClientRect();
        const buttonRect = currentNoBtn.getBoundingClientRect();
        
        // Calcular nueva posición aleatoria dentro del panel
        const maxX = questionPanelRect.width - buttonRect.width - 40; // 40px de margen
        const maxY = questionPanelRect.height - buttonRect.height - 40; // 40px de margen
        
        const newX = Math.max(20, Math.random() * maxX); // Mínimo 20px desde el borde
        const newY = Math.max(20, Math.random() * maxY); // Mínimo 20px desde el borde
        
        // Aplicar nueva posición relativa al panel
        currentNoBtn.style.position = 'absolute';
        currentNoBtn.style.left = newX + 'px';
        currentNoBtn.style.top = newY + 'px';
        currentNoBtn.style.transition = 'all 0.3s ease';
        currentNoBtn.style.zIndex = '1000'; // Asegurar que esté por encima
    }
    
    // Botón No - Moverse aleatoriamente
    noBtn.addEventListener('mouseenter', function() {
        moveNoButton();
    });
    
    // También mover al hacer clic (por si acaso)
    noBtn.addEventListener('click', function(e) {
        e.preventDefault();
        moveNoButton();
    });
    
    // Mover el botón cada cierto tiempo para que sea más difícil de alcanzar
    setInterval(function() {
        if (questionPanel.style.display !== 'none') {
            moveNoButton();
        }
    }, 3000); // Se mueve cada 3 segundos
    
    // Funcionalidad para cerrar el modal
    const modal = document.getElementById('modal');
    const closeBtn = document.querySelector('.close');
    
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    // Cerrar modal al hacer clic fuera de él
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}); 