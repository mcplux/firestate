<script setup lang="ts">
import useProperties from '@/composables/useProperties'
import Property from '@/components/Property.vue'

const { pool, filteredProperties, } = useProperties()
</script>

<template>
  <v-card flat>
    <v-card-title class="text-h3 text-center" tag="h1">
      Properties
    </v-card-title>

    <v-checkbox label="Pool" v-model="pool" />

    <v-row>
      <Property 
        v-for="property in filteredProperties"
        :key="property.id"
        :property="property"
      />
    </v-row>
  </v-card>
</template>
