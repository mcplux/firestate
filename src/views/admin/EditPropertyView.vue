<script setup lang="ts">
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { doc } from 'firebase/firestore'
import { useDocument, useFirestore, type _RefFirestore } from 'vuefire'
import type { Property } from '@/interfaces/property.interface'
import { useField, useForm, type FieldContext } from 'vee-validate'
import { LMap, LTileLayer, LMarker} from "@vue-leaflet/vue-leaflet"
import useImage from '@/composables/useImage'
import useLocationMap from '@/composables/useLocationMap'
import { propertySchema } from '@/validation/property.schema'

import "leaflet/dist/leaflet.css"

const { handleSubmit } = useForm({ validationSchema: propertySchema })
const route = useRoute()
const db = useFirestore()

const { url, uploadImage, imageUrl } = useImage()
const { zoom, center, pinOnMove } = useLocationMap()

const items = [0, 1, 2, 3, 4, 5]
const id = route.params.id as string

const title: FieldContext<string> = useField('title')
const image: FieldContext<File> = useField('image')
const price: FieldContext<string> = useField('price')
const bedrooms: FieldContext<number> = useField('bedrooms')
const baths: FieldContext<number> = useField('baths')
const parkings: FieldContext<number> = useField('parkings')
const description: FieldContext<string> = useField('description')
const pool: FieldContext<boolean> = useField('pool', undefined, { initialValue: false })

// Get the property
const docRef = doc(db, 'properties', id)
const property = useDocument(docRef) as _RefFirestore<Property | undefined>

watch(property, (property) => {
  if(!property) return

  title.value.value = property.title
  price.value.value = property.price
  bedrooms.value.value = property.bedrooms
  baths.value.value = property.baths
  parkings.value.value = property.parkings
  description.value.value = property.description
  pool.value.value = property.pool
  center.value = property.location
})

const submit = handleSubmit((values) => {

})
</script>

<template>
  <v-card max-width="800" flat class="mx-auto">
    <v-card-title class="text-h3" tag="h2">
      Edit Property
    </v-card-title>

    <v-card-subtitle class="text-h5">
      Below you can edit your property
    </v-card-subtitle>

    <v-form class="my-5">
      <v-text-field
        label="Title"
        class="mb-3"
        v-model="title.value.value"
        :error-messages="title.errorMessage.value"
      />

      <v-file-input 
        accept="image/jpeg"
        label="Photo"
        class="mb-3"
        prepend-icon="mdi-camera"
        v-model="image.value.value"
        :error-messages="image.errorMessage.value"
        @change="uploadImage"
      />

      <div v-if="imageUrl">
        <p class="font-weight-bold">Property Image:</p>
        <img
          class="w-50 rounded"
          :src="imageUrl"
        />
      </div>

      <v-text-field
        label="Price"
        class="mb-3"
        v-model="price.value.value"
        :error-messages="price.errorMessage.value"
      />

      <v-row class="mb-md-0 mb-3">
        <v-col cols="12" md="4">
          <v-select
            label="Bedrooms"
            class="mb-md-3"
            :items="items"
            v-model="bedrooms.value.value"
            :error-messages="bedrooms.errorMessage.value"
          />
        </v-col>

        <v-col cols="12" md="4">
          <v-select
            label="Baths"
            class="mb-md-3"
            :items="items"
            v-model="baths.value.value"
            :error-messages="baths.errorMessage.value"
          />
        </v-col>

        <v-col cols="12" md="4">
          <v-select
            label="Parking spaces"
            class="mb-md-3"
            :items="items"
            v-model="parkings.value.value"
            :error-messages="parkings.errorMessage.value"
          />
        </v-col>
      </v-row>

      <v-textarea
        label="Description"
        class="mb-3"
        v-model="description.value.value"
        :error-messages="description.errorMessage.value"
      />

      <v-checkbox
        label="Pool"
        class="mb-3"
        v-model="pool.value.value"
        :error-messages="pool.errorMessage.value"
      />

      <div class="pb-5">
        <h2 class="text-center mb-5">Location</h2>
        <div style="height:600px; width:800px">
          <LMap v-model:zoom="zoom" :center="center" :use-global-leaflet="false">
            <LMarker 
              :lat-lng="center"
              draggable
              @moveend="pinOnMove"
            />
            <LTileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            ></LTileLayer>
          </LMap>
        </div>
      </div>

      <v-btn color="pink-accent-3" block @click="submit">
        Edit Property
      </v-btn>
    </v-form>
  </v-card>
</template>
