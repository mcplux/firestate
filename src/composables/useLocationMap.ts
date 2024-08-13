import { ref } from 'vue'

export default function useLocationMap() {
  const zoom = ref(15)
  const center = ref<[number, number]>([7.1057, -73.1104])

  function pinOnMove(event: any) {
    const marker: { lat: number, lng: number } = event.target.getLatLng()
    center.value = [marker.lat, marker.lng]
  }

  return {
    zoom,
    center,
    pinOnMove,
  }
}
