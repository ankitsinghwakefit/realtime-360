<template>
  <v-app>
    <v-navigation-drawer app v-model="drawer" permanent color="#F3F4F6">
      <Sidebar />
    </v-navigation-drawer>

    <v-app-bar app color="#1F2937" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>My Fleet Dashboard</v-toolbar-title>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import Sidebar from "@/components/Sidebar.vue";
const drawer = ref(true);
const store = useStore();
store.dispatch("fetchVehicles");
</script>
