<template>
    <v-list dense nav>
        <v-list-item to="/dashboard" router>
          <v-list-item-content class="d-flex align-center text-h5">
            <v-list-item-icon class="mr-3">
              <v-icon>mdi-map</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="text-h6">Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/vehicles" router>
          <v-list-item-content class="d-flex align-center text-h5">
            <v-list-item-icon class="mr-3">
              <v-icon>mdi-truck</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="text-h6">Vehicles List</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
</template>