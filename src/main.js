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

// ✅ Import Leaflet CSS so map and markers show correctly
import 'leaflet/dist/leaflet.css'

// ✅ Import Leaflet first (needed by proj4leaflet)
import L from 'leaflet'

// ✅ Import proj4 next
import proj4 from 'proj4'

// ✅ Fix: assign proj4 to global (proj4leaflet expects window.proj4)
window.proj4 = proj4

// ✅ Import proj4leaflet plugin *after* L and proj4
import 'proj4leaflet'

// (optional) import vue3-leaflet globally so Vite pre-bundles it
import 'vue3-leaflet'

const app = createApp(App)

registerPlugins(app)

app.mount('#app')
