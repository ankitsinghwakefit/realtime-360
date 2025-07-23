<template>
  <v-container fluid>
    <div ref="mapContainer" class="map"></div>
  </v-container>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useRouter } from "vue-router";
import { getIcon } from "@/utils/icon-helper";
import { formatDate } from "@/utils/date-helper"

const store = useStore();
const router = useRouter();
const mapContainer = ref(null);

const vehiclesData = computed(() => store.getters.getVehicleData);

onMounted(() => {
  const map = L.map(mapContainer.value).setView([25.276987, 55.296249], 13);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; realtime-iot-360 contributors",
  }).addTo(map);

  // Add vehicle markers
  vehiclesData.value.forEach((vehicle) => {
    const marker = L.marker([vehicle.location.lat, vehicle.location.lng], {
      icon: getIcon(vehicle.status),
    })
      .addTo(map)
      .bindTooltip(vehicle.name || vehicle.plate, { permanent: false });
    marker.bindPopup("");
    marker.on("click", () => {
      const popupContent = `
      <div>
        <strong>${vehicle.name} (${vehicle.plate})</strong><br/>
        Status: ${vehicle.status}<br/>
        Last updated: ${formatDate(vehicle.lastUpdated)}<br/>
        <button class="popup-btn" id="view-history-${vehicle.id}">View History</button>
        </div>
        `;
      marker.getPopup().setContent(popupContent);
      marker.openPopup();

      setTimeout(() => {
        const btn = document.getElementById(`view-history-${vehicle.id}`);
        if (btn) {
          btn.onclick = () => {
            router.push(`/vehicle/${vehicle.id}/history`);
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
.popup-btn {
  background-color: #1f2937;
  margin-top: 10px;
  color: #f3f4f6;
  padding: 10px 20px;
  font-size: 14px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.popup-btn:hover {
  background-color: #374151;
}

.popup-btn:active {
  background-color: #111827;
}
</style>
