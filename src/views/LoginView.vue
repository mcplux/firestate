<script setup lang="ts">

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
      />

      <v-text-field 
        type="password"
        label="Password"
        bg-color="blue-grey-lighten-5"
      />

      <v-btn block color="pink-accent-3">
        Login
      </v-btn>
    </v-form>
  </v-card>
</template>
