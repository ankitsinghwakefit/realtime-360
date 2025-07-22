// Import custom marker icons
import greenIconUrl from '@/assets/marker-icon-green.png';
import redIconUrl from '@/assets/marker-icon-red.png';
import greyIconUrl from '@/assets/marker-icon-grey.png';
import shadowUrl from '@/assets/marker-shadow.png';

export const getIcons = (iconType)=>{
  let icon = iconType === 'green' ? greenIconUrl :  iconType === 'red' ? redIconUrl : iconType === 'grey' ? greyIconUrl : shadowUrl;
  
  return new L.Icon({
  iconUrl: icon,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})
}