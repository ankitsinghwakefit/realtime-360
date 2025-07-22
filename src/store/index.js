import { createStore } from 'vuex'
import vehicles from '../mock/vehicles.json'
export default createStore({
  state: () => ({
    vehiclesData: [],
  }),
  getters: {
    getVehicleData: (state) =>{
        return state.vehiclesData;
    },
    getVehicleById: (state) => (id) =>{
        return state.vehiclesData.find(vehicle => vehicle.id === id);
    }
  },
  mutations: {
    setVehiclesData(state, payload) {
      state.vehiclesData = payload;
    }
  },
  actions: {
    fetchVehicles({ commit }) {
      commit('setVehiclesData', vehicles)
    }
  }
})