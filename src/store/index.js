import { createStore } from 'vuex'
import vehicles from '../mock/vehicles.json'
export default createStore({
  state: () => ({
    vehiclesData: [],
  }),
  getters: {
    getVehicleData: (state) =>{
        return state.vehiclesData;
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