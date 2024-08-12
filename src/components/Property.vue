<script setup lang="ts">
import type { Property } from '@/interfaces/property.interface'
import { formatCurrency } from '@/helpers'

interface Props {
  property: Property
}

defineProps<Props>()
</script>

<template>
  <v-col cols="12" md="4">
    <v-card>
      <v-img :src="property.image" height="250" cover />
      <v-card-title>{{ property.title }}</v-card-title>
      <v-card-text class="text-truncate">{{ property.description }}</v-card-text>
      <v-card-text class="text-truncate text-h5 font-weight-bold">{{ formatCurrency(property.price) }}</v-card-text>
      <template v-slot:actions>
        <v-btn 
          block 
          color="info" 
          variant="tonal" 
          prepend-icon="mdi-information-outline" 
          :to="{ name: 'property', params: { id: property.id } }"
        >
          More info
        </v-btn>
      </template>
    </v-card>
  </v-col>
</template>
