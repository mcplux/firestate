import { collection } from 'firebase/firestore'
import { useFirestore, useCollection, type _RefFirestore } from 'vuefire'
import type { Property } from '@/interfaces/property.interface'

export default function useProperties() {
  const db = useFirestore()
  const propertiesCollection = useCollection(collection(db, 'properties')) as _RefFirestore<Property[]>
  
  return {
    propertiesCollection,
  }
}
