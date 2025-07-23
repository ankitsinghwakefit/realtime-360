<template>
  <v-container>
    <v-row class="mb-4">
      <v-col cols="12" md="4">
        <v-text-field
          v-model="search"
          label="Search by name or plate"
          clearable
        />
      </v-col>
      <v-col cols="12" md="3">
        <v-select
          v-model="selectedStatus"
          :items="statusOptions"
          label="Filter by status"
          clearable
        />
      </v-col>
    </v-row>

    <v-data-table
      :headers="headers"
      :items="filteredVehicles"
      item-key="id"
      class="elevation-1"
      disable-pagination
    >
      <template #item.name="{ item }">
        <router-link :to="`/vehicle/${item.id}/history`" class="text-primary">
          {{ item.name }}
        </router-link>
      </template>
      <template #item.status="{ item }">
        <v-chip :color="getStatusColor(item.status)" dark>
          {{ item.status }}
        </v-chip>
      </template>
      <template #item.lastUpdated="{ item }">
        {{ formatDate(item.lastUpdated) }}
      </template>
    </v-data-table>
  </v-container>
</template>

<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { formatDate } from "@/utils";

const store = useStore();

const search = ref("");
const selectedStatus = ref(null);
const statusOptions = ["Online", "Offline", "Alert"];

const headers = [
  { title: "Vehicle Name", value: "name" },
  { title: "Plate Number", value: "plate" },
  { title: "Type", value: "type" },
  { title: "Status", value: "status" },
  { title: "Last Location", value: "lastLocation" },
  { title: "Last Update Time", value: "lastUpdated" },
];

const filteredVehicles = computed(() => {
  return store.getters.getVehicleData.filter((v) => {
    const matchesSearch =
      v.name?.toLowerCase().includes(search.value?.toLowerCase() || "") ||
      v.plate?.toLowerCase().includes(search.value?.toLowerCase() || "");
    const matchesStatus = selectedStatus.value
      ? v.status === selectedStatus.value
      : true;
    return matchesSearch && matchesStatus;
  });
});

const getStatusColor = (status) => {
  switch (status) {
    case "Online":
      return "green";
    case "Offline":
      return "grey";
    case "Alert":
      return "red";
    default:
      return "primary";
  }
};
</script>
