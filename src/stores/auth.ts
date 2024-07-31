import { defineStore } from 'pinia'
import { useFirebaseAuth } from 'vuefire'
import { signInWithEmailAndPassword } from 'firebase/auth'

export const useAuthStore = defineStore('auth', () => {
  const auth = useFirebaseAuth()

  function login(email: string, password: string) {
    if(auth) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log(userCredential)
        })
        .catch(err => console.error(err.code, err.message))
    }
  }

  return {
    login,
  }
})
