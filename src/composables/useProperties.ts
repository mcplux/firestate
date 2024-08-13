import { computed, ref } from 'vue'
import { collection, doc, deleteDoc } from 'firebase/firestore'
import { ref as refStorage, deleteObject } from 'firebase/storage'
import { useFirestore, useCollection, type _RefFirestore, useFirebaseStorage } from 'vuefire'
import type { Property } from '@/interfaces/property.interface'

export default function useProperties() {
  const pool = ref(false)

  const db = useFirestore()
  const storage = useFirebaseStorage()
  const propertiesCollection = useCollection(collection(db, 'properties')) as _RefFirestore<Property[]>

  async function deleteProperty(id: string, urlImage: string) {
    if (!confirm('Are you sure you want to delete this property?')) return

    const docRef = doc(db, 'properties', id)
    const imageRef = refStorage(storage, urlImage)

    await Promise.all([
      await deleteDoc(docRef),
      await deleteObject(imageRef),
    ])
  }

  const filteredProperties = computed(() => {
    return pool.value ? propertiesCollection.value.filter(property => property.pool) : propertiesCollection.value
  })
  
  return {
    pool,
    propertiesCollection,
    deleteProperty,
    filteredProperties,
  }
}
