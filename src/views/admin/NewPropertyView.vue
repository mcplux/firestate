<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useForm, useField, type FieldContext } from 'vee-validate'
import { collection, addDoc } from 'firebase/firestore'
import { useFirestore } from 'vuefire'
import { propertySchema, imageSchema } from '@/validation/property.schema'
import useImage from '@/composables/useImage'

const router = useRouter()
const { handleSubmit } = useForm({ validationSchema: {...propertySchema, ...imageSchema} })
const db = useFirestore()

const { url, uploadImage, imageUrl } = useImage()

const items = [0, 1, 2, 3, 4, 5]

const title: FieldContext<string> = useField('title')
const image: FieldContext<File> = useField('image')
const price: FieldContext<string> = useField('price')
const bedrooms: FieldContext<number> = useField('bedrooms')
const baths: FieldContext<number> = useField('baths')
const parkings: FieldContext<number> = useField('parkings')
const description: FieldContext<string> = useField('description')
const pool: FieldContext<boolean> = useField('pool', undefined, { initialValue: false })

const submit = handleSubmit(async (values) => {

  // Remove image from the property
  const { image, ...property } = values
  
  // Add a new document with a generated id.
  const docRef = await addDoc(collection(db, 'properties'), {
    ...property,
    image: url.value,
  })
  
  if(docRef.id) {
    router.push({ name: 'admin-properties' })
  }
})
</script>

<template>
  <v-card max-width="800" flat class="mx-auto">
    <v-card-title class="text-h3" tag="h2">
      Create property
    </v-card-title>

    <v-card-subtitle class="text-h5">
      Create a new property by filling out the form
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

      <v-btn color="pink-accent-3" block @click="submit">
        Add Property
      </v-btn>
    </v-form>
  </v-card>
</template>
