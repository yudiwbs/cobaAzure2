
<script setup>
import { ref } from 'vue'
const message = ref('Tap button ...')

async function tambahData() {
  try {
    const response = await fetch('/api/TambahData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nama: 'Pasta Gigi' })
    })
    const data = await response.text()
    message.value = data
  } catch (error) {
    message.value = 'Error: ' + error.message
  }
}

async function callApi() {
  try {
    const response = await fetch('/api/Hello?name=Ahmad%20Aulia')
    //const data = await response.text()
    const data = await response.json() 
    // items.value = data    
    message.value = data
  } catch (error) {
    message.value = 'Error: ' + error.message
  }
}
</script>

<template>
  <h1>Halo dunia</h1>
  <h2> Nama saya yudi</h2>
  <p>{{ message }}</p>

  <button @click="callApi">Ambil Semua Data</button>
  <button @click="tambahData">Insert Satu Data</button>
</template>

<style scoped></style>
