<script setup lang="ts">
import { useField, useForm } from 'vee-validate'
import { loginSchema } from '@/validation/loginSchema'
import { useAuthStore } from '@/stores/auth'

const { handleSubmit } = useForm({ validationSchema: loginSchema })

const authStore = useAuthStore()

const email = useField('email')
const password = useField('password')

const submit = handleSubmit(({ email, password }) => {
  authStore.login(email, password)
})
</script>

<template>
  <v-card flat max-width="600" class="mx-auto">
    <v-card-title class="text-h3" tag="h1">
      Login
    </v-card-title>
    
    <v-form class="p-5">
      <v-text-field 
        type="email"
        label="Email"
        bg-color="blue-grey-lighten-5"
        class="mb-3"
        v-model="email.value.value"
        :error-messages="email.errorMessage.value"
      />

      <v-text-field 
        type="password"
        label="Password"
        bg-color="blue-grey-lighten-5"
        class="mb-3"
        v-model="password.value.value"
        :error-messages="password.errorMessage.value"
      />

      <v-btn block color="pink-accent-3" @click="submit" class="mb-3">
        Login
      </v-btn>
    </v-form>
  </v-card>
</template>
