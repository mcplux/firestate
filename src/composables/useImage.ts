import { ref as storageRef } from 'firebase/storage'
import { useFirebaseStorage, useStorageFile } from 'vuefire'
import { uid } from 'uid'
import { computed } from 'vue'

export default function useImage() {
  const storage = useFirebaseStorage()
  const storageRefPath = storageRef(storage, `/properties/${uid()}`)
  const { url, upload } = useStorageFile(storageRefPath)
  
  function uploadImage(e: Event) {
    const fileInput = e.target as HTMLInputElement
    if (!fileInput.files) {
      return
    }
    const data: File = fileInput.files[0]
    upload(data)
  }

  const imageUrl = computed<string | null>(() => url.value ? url.value : null)

  return {
    url,
    uploadImage,
    imageUrl,
  }
}
