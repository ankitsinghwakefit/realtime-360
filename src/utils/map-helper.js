import L from "leaflet";
export const initilizeMap = (mapObj, lat, long, zoom) => {
  mapObj.setView([lat, long], zoom);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; realtime-iot-360 contributors",
  }).addTo(mapObj);
};
