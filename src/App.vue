
<script setup>
import { ref } from 'vue'

const message = ref('Tap button ...')

async function callApi() {
  try {
    const response = await fetch('/api/Hello?name=Ahmad%20Aulia')
    const data = await response.text()
    message.value = data
  } catch (error) {
    message.value = 'Error: ' + error.message
  }
}

</script>

<template>
  <h1>Halo dunia</h1>
  <h2> Nama saya yudi</h2>

  <h1>{{ message }}</h1>\
  <button @click="callApi">Call API</button>

  
</template>

<style scoped></style>
