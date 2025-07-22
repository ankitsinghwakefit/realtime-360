<template>
  <v-container fluid>
    <div ref="mapContainer" class="map"></div>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import vehiclesData from '../mock/vehicles.json'

// Import custom marker icons
import greenIconUrl from '@/assets/marker-icon-green.png';
import redIconUrl from '@/assets/marker-icon-red.png';
import greyIconUrl from '@/assets/marker-icon-grey.png';
import shadowUrl from '@/assets/marker-shadow.png';

const mapContainer = ref(null);

// Create Leaflet icon instances
const getIcons = (iconType)=>{
  return new L.Icon({
  iconUrl: iconType,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})
}

function getIcon(status) {
  switch (status) {
    case 'Online': return getIcons(greenIconUrl);
    case 'Alert': return getIcons(redIconUrl);
    case 'Offline': return getIcons(greyIconUrl);
    default: return getIcons(shadowUrl);
  }
}

onMounted(() => {
  const map = L.map(mapContainer.value).setView([25.276987, 55.296249], 13);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; realtime-iot-360 contributors'
  }).addTo(map);

  // Add vehicle markers
  vehiclesData.forEach(vehicle => {
    const marker = L.marker([vehicle.location.lat, vehicle.location.lng], { icon: getIcon(vehicle.status) })
      .addTo(map)
      .bindTooltip(vehicle.name || vehicle.plate, { permanent: false });

    marker.on('click', () => {
      const popupContent = `
        <div>
          <strong>${vehicle.name} (${vehicle.plate})</strong><br/>
          Status: ${vehicle.status}<br/>
          Last updated: ${vehicle.lastUpdated}<br/>
          <button id="view-history-${vehicle.id}" style="margin-top:5px;">View History</button>
        </div>
      `;
      marker.bindPopup(popupContent).openPopup();

      setTimeout(() => {
        const btn = document.getElementById(`view-history-${vehicle.id}`);
        if (btn) {
          btn.onclick = () => {
            console.log(`vehicle clicked with ID: ${vehicle.id} `)
          };
        }
      }, 0);
    });
  });
});
</script>

<style>
.map {
  height: 80vh;
  width: 100%;
}
</style>
