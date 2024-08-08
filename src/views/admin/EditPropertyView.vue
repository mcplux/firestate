<script setup lang="ts">
import { useRoute } from 'vue-router'
import { doc } from 'firebase/firestore'
import { useDocument, useFirestore, type _RefFirestore } from 'vuefire'
import type { Property } from '@/interfaces/property.interface'

const route = useRoute()
const db = useFirestore()

const id = route.params.id as string

// Get the property
const docRef = doc(db, 'properties', id)
const property = useDocument(docRef) as _RefFirestore<Property | undefined>

console.log(property)
</script>

<template>
  <h2 class="text-center text-h3 my-5 font-weight-bold">Edit Property</h2>
</template>
