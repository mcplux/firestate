<script setup lang="ts">
import useProperties from '@/composables/useProperties'
import { formatCurrency } from '@/helpers'

const { propertiesCollection, deleteProperty } = useProperties()
</script>

<template>
  <h2 class="text-center text-h3 my-5 font-weight-bold">Admin Panel</h2>

  <v-btn color="blue" variant="flat" :to="{ name: 'new-property' }">
    New property
  </v-btn>

  <v-card class="mx-auto mt-10" flat>
    <v-list>
      <v-list-item v-for="property in propertiesCollection" :key="property.id">
        <template v-slot:prepend>
          <v-list-item-media start>
            <img width="180" :src="property.image" />
          </v-list-item-media>
        </template>

        <v-list-item-title>{{ property.title }}</v-list-item-title>
        <v-list-item-subtitle>{{ formatCurrency(property.price) }}</v-list-item-subtitle>

        <template v-slot:append>
          <v-btn color="info" class="mr-2" :to="{ name: 'edit-property', params: { id: property.id } }" flat>Edit</v-btn>
          <v-btn color="red-darken-3" flat @click="deleteProperty(property.id, property.image)">Delete</v-btn>
        </template>
      </v-list-item>
    </v-list>
  </v-card>
</template>
