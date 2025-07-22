/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Styles
import 'unfonts.css'

// Import Leaflet CSS so map and markers show correctly
import 'leaflet/dist/leaflet.css'

// Import Store to pass it to app
import store from './store' 

import router from './router'

const app = createApp(App)

registerPlugins(app)
app.use(store) 
app.use(router)

app.mount('#app')
