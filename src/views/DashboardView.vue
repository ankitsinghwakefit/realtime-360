<template>
  <v-app>
    <v-main>
      <v-container fluid>
        <MapView />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import MapView from "@/components/MapView.vue";
import { useStore } from "vuex";
const store = useStore();
if(store.getters.getVehicleData.length === 0){
  store.dispatch("fetchVehicles");
}
</script>
