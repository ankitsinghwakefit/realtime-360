<template>
  <v-app>
    <v-main>
      <v-container class="pa-4" fluid>
        <v-card-title>Live Vehicle Map</v-card-title>
        <v-card class="map-card">
          <l-map :zoom="13" :center="[25.276987, 55.296249]" class="map-content">
            <l-tile-layer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
            <l-marker
                v-for="v in vehicles"
                :key="v.id"
                :lat-lng="[v.location.lat, v.location.lng]"
                :icon="getMarkerIcon(v.status)"
                @click="selectVehicle(v.id)"
            >
            <l-popup>{{ v.name }}</l-popup>
            </l-marker>
          </l-map>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { LMap, LTileLayer, LMarker, LPopup } from "vue3-leaflet";
import "leaflet/dist/leaflet.css";

import { computed } from "vue";
import vehicleData from '@/mock/vehicles.json';

const vehicles = computed(()=>{
    console.log('veh', vehicleData);
    return vehicleData;
})

const selectVehicle = (id)=>{
    console.log('vehicle clicked with Id', id)
}

function getMarkerIcon(status) {
  let color = 'blue';
  if(status === 'Online'){
    color = 'green'
  } else if (status === 'Alert'){
    color = 'red'
  } else if(status === 'Offline'){
    color = 'grey'
  }
  return new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${color}.png`,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
  })
}
</script>

<style>
html, body, #app {
  height: 100%;
  margin: 0;
}

.map-card {
  height: 80vh;
  margin: auto;
}

.map-content {
  height: 100%;
  width: 100%;
  border-radius: 8px;
}
</style>
