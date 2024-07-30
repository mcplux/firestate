<script setup lang="ts">

</script>

<template>
  <v-card elevation="3" class="mx-auto" max-width="1200">
    <v-layout>
      <v-app-bar color="blue-darken-1">
        <template v-slot:prepend>
          <v-btn :to="{ name: 'home' }">
            FireState - Home
          </v-btn>
        </template>
      </v-app-bar>

      <v-main>
        <v-container>
          <RouterView />
        </v-container>
      </v-main>
    </v-layout>
  </v-card>
</template>
