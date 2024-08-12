<script setup lang="ts">
import useProperties from '@/composables/useProperties'
import Property from '@/components/Property.vue'

const { propertiesCollection } = useProperties()
</script>

<template>
  <v-card flat>
    <v-card-title class="text-h3 text-center" tag="h1">
      Properties
    </v-card-title>

    <v-row>
      <Property 
        v-for="property in propertiesCollection"
        :key="property.id"
        :property="property"
      />
    </v-row>
  </v-card>
</template>
