# 🚀 Realtime-360

A Vue 3-based admin dashboard to **visualize real-time locations of multiple vehicles**, view route history, and monitor vehicle status on an interactive map.

🌐 **Live URL:** [https://realtime-360.netlify.app/](https://realtime-360.netlify.app/)

---

## 📌 **Features**

✅ Live Map View with Leaflet:
- Real-time vehicle markers on the map
- Marker colors based on vehicle status:  
  - 🟢 Online  
  - ⚪ Offline  
  - 🔴 Alert
- Click on marker to see vehicle details and "View History" button

✅ Vehicle Route History:
- Detailed route view with mocked coordinates
- Polyline showing the route
- Start and end markers
- Calculated distance covered and average speed

✅ Vehicle List View:
- Table with vehicle name, plate number, type, status, last location, and last update
- Search by name or plate number
- Filter by status

✅ Modern responsive UI built with Vuetify:
- Sidebar navigation and topbar
- Works great on desktop and mobile

---

## 🛠 **Tech Stack**

- [Vue 3](https://vuejs.org/)
- [Vue Router](https://router.vuejs.org/)
- [Vuex](https://vuex.vuejs.org/) for mock vehicle data and state management
- [Leaflet](https://leafletjs.com/) for map rendering
- [Vuetify](https://next.vuetifyjs.com/) for UI components
- Hosted on [Netlify](https://netlify.com/)

---

## 📦 **Project setup**

```bash
# Install dependencies
npm install

# Compiles and hot-reloads for development
npm run dev

# Compiles and minifies for production
npm run build

# Lints files
npm run lint
