<script setup lang="ts">
import { useRoute } from 'vue-router'
import { doc } from 'firebase/firestore'
import { useDocument, useFirestore } from 'vuefire'
import type { Property } from '@/interfaces/property.interface'
import { formatCurrency } from '@/helpers'

const route = useRoute()
const id = route.params.id as string

const db = useFirestore()
const docRef = doc(db, 'properties', id)
const proprety = useDocument<Property>(docRef)
</script>

<template>
  <v-card flat>
    <v-card-title class="mt-5 text-h3 text-center font-weight-bold">
      {{ proprety?.title }}
    </v-card-title>

    <v-img :src="proprety?.image" height="550" cover />

    <div class="bg-blue-grey-lighten-5 d-flex flex-column flex-md-row">
      <v-card-text>
        Price: <span class="font-weight-bold">{{ formatCurrency(proprety?.price ?? '') }}</span>
      </v-card-text>
      <v-card-text>
        Baths: <span class="font-weight-bold">{{ proprety?.baths }}</span>
      </v-card-text>
      <v-card-text>
        Parking Spaces: <span class="font-weight-bold">{{ proprety?.parkings }}</span>
      </v-card-text>
      <v-card-text>
        Bedrooms: <span class="font-weight-bold">{{ proprety?.bedrooms }}</span>
      </v-card-text>
    </div>

    <v-row class="mt-5">
      <v-col cols="12" md="8">
        <div class="text-pre-wrap">
          {{ proprety?.description }}
        </div>
      </v-col>
      <v-col cols="12" md="4">
        <p>Map</p>
      </v-col>
    </v-row>
  </v-card>
</template>

<style scoped>
  .text-pre-wrap {
    white-space: pre-wrap;
  }
</style>
