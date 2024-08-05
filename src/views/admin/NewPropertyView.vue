<script setup lang="ts">
const items = [0, 1, 2, 3, 4, 5]
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
      />

      <v-file-input 
        accept="image/jpeg"
        label="Photo"
        prepend-icon="mdi-camera"
      />

      <v-text-field
        label="Price"
      />

      <v-row>
        <v-col cols="12" md="4">
          <v-select
            label="Bedrooms"
            :items="items"
          />
        </v-col>

        <v-col cols="12" md="4">
          <v-select
            label="Baths"
            :items="items"
          />
        </v-col>

        <v-col cols="12" md="4">
          <v-select
            label="Parking spaces"
            :items="items"
          />
        </v-col>
      </v-row>

      <v-textarea
        label="Description"
      />

      <v-checkbox
        label="Pool"
      />

      <v-btn color="pink-accent-3" block>
        Add Property
      </v-btn>
    </v-form>
  </v-card>
</template>
