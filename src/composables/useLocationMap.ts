import { type Ref, ref } from 'vue'

export default function useLocationMap() {
  const zoom: Ref<number> = ref(15)
  const center: Ref<number[]> = ref([7.1057, -73.1104])

  return {
    zoom,
    center,
  }
}
