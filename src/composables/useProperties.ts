import { computed, ref } from 'vue'
import { collection } from 'firebase/firestore'
import { useFirestore, useCollection, type _RefFirestore } from 'vuefire'
import type { Property } from '@/interfaces/property.interface'

export default function useProperties() {
  const pool = ref(false)

  const db = useFirestore()
  const propertiesCollection = useCollection(collection(db, 'properties')) as _RefFirestore<Property[]>

  const filteredProperties = computed(() => {
    return pool.value ? propertiesCollection.value.filter(property => property.pool) : propertiesCollection.value
  })
  
  return {
    pool,
    propertiesCollection,
    filteredProperties,
  }
}
