<script setup lang="ts">
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { doc } from 'firebase/firestore'
import { useDocument, useFirestore } from 'vuefire'
import type { Property } from '@/interfaces/property.interface'
import { formatCurrency } from '@/helpers'
import { LMap, LTileLayer, LMarker, LPopup } from "@vue-leaflet/vue-leaflet"
import useLocationMap from '@/composables/useLocationMap'

import "leaflet/dist/leaflet.css"

const route = useRoute()
const id = route.params.id as string

const db = useFirestore()
const docRef = doc(db, 'properties', id)
const property = useDocument<Property>(docRef)

const { center, zoom } = useLocationMap()

watch(property, (property) => {
  if(!property) return

  center.value = property.location
})
</script>

<template>
  <v-card flat>
    <v-card-title class="mt-5 text-h3 text-center font-weight-bold">
      {{ property?.title }}
    </v-card-title>

    <v-img :src="property?.image" height="550" cover />

    <div class="bg-blue-grey-lighten-5 d-flex flex-column flex-md-row">
      <v-card-text>
        Price: <span class="font-weight-bold">{{ formatCurrency(property?.price ?? '') }}</span>
      </v-card-text>
      <v-card-text>
        Baths: <span class="font-weight-bold">{{ property?.baths }}</span>
      </v-card-text>
      <v-card-text>
        Parking Spaces: <span class="font-weight-bold">{{ property?.parkings }}</span>
      </v-card-text>
      <v-card-text>
        Bedrooms: <span class="font-weight-bold">{{ property?.bedrooms }}</span>
      </v-card-text>
    </div>

    <v-row class="mt-5">
      <v-col cols="12" md="8">
        <h2 class="text-center">{{ property?.title }}</h2>
        <div class="text-pre-wrap mt-3">
          {{ property?.description }}
        </div>
      </v-col>
      <v-col cols="12" md="4">
        <div style="height:400px">
          <LMap v-model:zoom="zoom" :center="center" :use-global-leaflet="false">
            <LMarker 
              :lat-lng="center"
            >
              <LPopup>{{ property?.title }}</LPopup>
            </LMarker>
            <LTileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            ></LTileLayer>
          </LMap>
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>

<style scoped>
  .text-pre-wrap {
    white-space: pre-wrap;
  }
</style>
