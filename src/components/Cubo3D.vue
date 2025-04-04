<script setup>
import { ref, onMounted } from 'vue'
import { TresCanvas } from '@tresjs/core'

// === SEMÁFORO ===

// Color del semáforo
const colorActual = ref('verde')

// Estado de pausa
const activo = ref(true)
const btnTexto = ref('Pausar')

// Referencia para cancelar el temporizador
let timeoutId = null

function cambiarColor() {
  if (!activo.value) return

  if (colorActual.value === 'verde') {
    colorActual.value = 'amarillo'
    timeoutId = setTimeout(cambiarColor, 1000)
  } else if (colorActual.value === 'amarillo') {
    colorActual.value = 'rojo'
    timeoutId = setTimeout(cambiarColor, 3000)
  } else {
    colorActual.value = 'verde'
    timeoutId = setTimeout(cambiarColor, 4000)
  }
}

function toggleSemaforo() {
  activo.value = !activo.value
  btnTexto.value = activo.value ? 'Pausar' : 'Reanudar'

  if (activo.value) cambiarColor()
  else clearTimeout(timeoutId)
}

// === CUBO 3D ===

const rotationX = ref(0)
const rotationY = ref(0)
const colorCubo = ref('#00ff88')

onMounted(() => {
  cambiarColor() // Iniciar semáforo

  // Iniciar animación del cubo
  const animate = () => {
    rotationX.value += 0.01
    rotationY.value += 0.01
    requestAnimationFrame(animate)
  }

  animate()
})

function cambiarColorCubo() {
  colorCubo.value = '#' + Math.floor(Math.random() * 16777215).toString(16)
}
</script>

<template>
  <div style="display: flex; flex-direction: column; align-items: center; gap: 40px; padding-top: 40px;">

    <!-- Cubo 3D -->
    <div style="width: 100%; height: 300px;">
      <TresCanvas clear-color="#111">
        <TresPerspectiveCamera :position="[0, 0, 5]" :look-at="[0, 0, 0]" />
        <TresAmbientLight :intensity="1" />

        <TresMesh
          :rotation="[rotationX, rotationY, 0]"
          @click="cambiarColorCubo"
        >
          <TresBoxGeometry />
          <TresMeshStandardMaterial :color="colorCubo" />
        </TresMesh>
      </TresCanvas>
    </div>

    <p style="color: white;">Haz clic en el cubo para cambiar su color 🎨</p>


    <!-- Semáforo -->
    <div style="text-align: center;">
      <h2 style="color: white;">🚦 Semáforo</h2>

      <div style="width: 100px; margin: 0 auto; background: #333; padding: 20px; border-radius: 10px;">
        <div
          :style="{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            backgroundColor: colorActual === 'rojo' ? 'red' : '#550000',
            margin: '10px auto'
          }"
        ></div>
        <div
          :style="{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            backgroundColor: colorActual === 'amarillo' ? 'yellow' : '#554400',
            margin: '10px auto'
          }"
        ></div>
        <div
          :style="{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            backgroundColor: colorActual === 'verde' ? 'limegreen' : '#003300',
            margin: '10px auto'
          }"
        ></div>
      </div>

      <p style="color: white;">Color actual: {{ colorActual }}</p>

      <button @click="toggleSemaforo" style="margin-top: 20px; padding: 10px 20px;">
        {{ btnTexto }}
      </button>
    </div>
  </div>
  <router-link to="/cruzar-rio" style="color: #00ff88">Ir al enigma del río 🛶</router-link>
  <router-link to="/" style="color: #00ff88">Volver al Cubo 3D ✨</router-link>

</template>

<style scoped>
body {
  background-color: #111;
  font-family: sans-serif;
}
</style>
