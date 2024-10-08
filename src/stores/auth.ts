import { ref, computed, type ComputedRef, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { defineStore } from 'pinia'
import { useFirebaseAuth } from 'vuefire'
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, type User } from 'firebase/auth'

interface ErrorCodes {
  [index: string]: string
}

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter()

  const errorMessage = ref<string>('')
  const authUser = ref<User | null>(null)

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
          router.push({ name: 'admin-properties' })
        })
        .catch(err => {
          errorMessage.value = errorCodes[err.code]
        })
    }
  }

  function logout() {
    if(auth) {
      signOut(auth)
        .then(() => {
          authUser.value = null
          router.push({ name: 'login' })
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

  function authenticateUser() {
    return new Promise((resolve, reject) => {
      if(auth) {
        const unsuscribe = onAuthStateChanged(auth, (user) => {
          unsuscribe()
          if(user) {
            resolve(user)
          } else {
            reject()
          }
        })
      } else {
        reject()
      }
    })
  }

  const hasError = computed<boolean>(() => !!errorMessage.value)

  const isAuth = computed<boolean>(() => !!authUser.value)

  onMounted(() => {
    if(auth) {
      onAuthStateChanged(auth, (user) => {
        if(user) {
          authUser.value = user
        }
      })
    }
  })

  return {
    errorMessage,
    login,
    logout,
    authenticateUser,
    hasError,
    isAuth,
  }
})
