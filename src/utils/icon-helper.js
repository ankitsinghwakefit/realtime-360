// Import custom marker icons
import greenIconUrl from "@/assets/marker-icon-green.png";
import redIconUrl from "@/assets/marker-icon-red.png";
import greyIconUrl from "@/assets/marker-icon-grey.png";
import shadowUrl from "@/assets/marker-shadow.png";

export const getIcon = (status) => {
  switch (status) {
    case "Online":
      return getIcons(greenIconUrl);
    case "Alert":
      return getIcons(redIconUrl);
    case "Offline":
      return getIcons(greyIconUrl);
    default:
      return getIcons(shadowUrl);
  }
};

export const getIcons = (iconType) => {
  return new L.Icon({
    iconUrl: iconType,
    shadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });
};
