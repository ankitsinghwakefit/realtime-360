<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="8">
        <div id="map" style="height: 500px; border-radius: 8px; overflow: hidden;"></div>
      </v-col>
      <v-col cols="12" md="4">
        <v-card>
          <v-card-title>Route Summary</v-card-title>
          <v-card-text>
            <div><strong>Vehicle:</strong> {{ vehicle?.name }}</div>
            <div><strong>Plate:</strong> {{ vehicle?.plate }}</div>
            <div><strong>Distance Covered:</strong> {{ distance.toFixed(2) }} km</div>
            <div><strong>Average Speed:</strong> {{ avgSpeed.toFixed(2) }} km/h</div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import L from 'leaflet'
import {getIcons} from '@/composables/icon-helper'
import { haversine } from '@/composables/calculation-helper'

const route = useRoute()
const store = useStore()
const vehicleId = route.params.id
const vehicle = computed(() => store.getters.getVehicleData.find(v => v.id === vehicleId))

const distance = ref(0)
const avgSpeed = ref(0)

onMounted(() => {
  if (!vehicle.value || vehicle.value.history.length < 2) return

  const map = L.map('map').setView([vehicle.value.history[0].lat, vehicle.value.history[0].lng], 13)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19
  }).addTo(map)

  const coords = vehicle.value.history.map(p => [p.lat, p.lng])

  // Draw polyline
  L.polyline(coords, { color: 'blue' }).addTo(map)

  // Start and end markers
  const start = vehicle.value.history[0]
  const end = vehicle.value.history[vehicle.value.history.length - 1]
  L.marker([start.lat, start.lng], { icon: getIcons('green') }).addTo(map).bindPopup('Start').openPopup()
  L.marker([end.lat, end.lng], { icon: getIcons('red') }).addTo(map).bindPopup('End')

  // Fit bounds
  const bounds = L.latLngBounds(coords)
  map.fitBounds(bounds)

  // Calculate distance
  let totalDist = 0
  for (let i = 1; i < coords.length; i++) {
    totalDist += haversine(coords[i - 1], coords[i])
  }
  distance.value = totalDist

  // Calculate average speed
  const startTime = new Date(vehicle.value.history[0].timestamp)
  const endTime = new Date(vehicle.value.history[vehicle.value.history.length - 1].timestamp)
  const durationHours = (endTime - startTime) / (1000 * 60 * 60)
  avgSpeed.value = durationHours > 0 ? totalDist / durationHours : 0
})
</script>

<style>
#map {
  width: 100%;
}
</style>
