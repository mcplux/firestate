import { ref, computed, type Ref, type ComputedRef } from 'vue'
import { defineStore } from 'pinia'
import { useFirebaseAuth } from 'vuefire'
import { signInWithEmailAndPassword } from 'firebase/auth'

interface ErrorCodes {
  [index: string]: string
}

export const useAuthStore = defineStore('auth', () => {
  const errorMessage: Ref<string> = ref('')

  const auth = useFirebaseAuth()

  const errorCodes: ErrorCodes = {
    'auth/invalid-credential': 'Invalid Credentials',
  }

  function login(email: string, password: string) {
    if(auth) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log(userCredential)
        })
        .catch(err => {
          errorMessage.value = errorCodes[err.code]
        })
    }
  }

  const hasError: ComputedRef<boolean> = computed(() => !!errorMessage.value)

  return {
    errorMessage,
    login,
    hasError,
  }
})
