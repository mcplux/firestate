import { ref, computed, type Ref, type ComputedRef } from 'vue'
import { defineStore } from 'pinia'
import { useFirebaseAuth } from 'vuefire'
import { signInWithEmailAndPassword, type User } from 'firebase/auth'

interface ErrorCodes {
  [index: string]: string
}

export const useAuthStore = defineStore('auth', () => {
  const errorMessage: Ref<string> = ref('')
  const authUser: Ref<User|null> = ref(null)

  const auth = useFirebaseAuth()

  const errorCodes: ErrorCodes = {
    'auth/invalid-credential': 'Invalid Credentials',
  }

  function login(email: string, password: string) {
    if(auth) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Authenticate user
          const user = userCredential.user
          authUser.value = user
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
