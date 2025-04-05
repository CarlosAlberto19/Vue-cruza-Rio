<!-- src/views/GhostNGoblins.vue -->
<template>
  <div class="juego-retro">
    <canvas ref="canvas" width="800" height="400"></canvas>
    <router-link to="/inicio" class="btn-volver">⬅️ Volver al menú</router-link>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'

const canvas = ref(null)

// Cargar el spritesheet del personaje
const sprite = new Image()
sprite.src = new URL('../assets/sprites/spritesheet.png', import.meta.url).href

onMounted(() => {
  const ctx = canvas.value.getContext('2d')
  const ancho = canvas.value.width
  const alto = canvas.value.height

  // 🧍 Personaje principal
  const jugador = {
    x: 50,
    y: 300,
    ancho: 64,
    alto: 64,
    velocidad: 3,
    dy: 0,               // Velocidad vertical
    gravedad: 0.5,       // Gravedad constante
    saltoFuerza: -10,    // Impulso al saltar
    enSuelo: false       // Estado para permitir saltar solo si está en el suelo
  }

  // ⌨️ Teclas presionadas
  const teclas = {}

  // 🎮 Eventos de teclado
  window.addEventListener('keydown', e => teclas[e.key] = true)
  window.addEventListener('keyup', e => teclas[e.key] = false)

  // ⚙️ Actualizar lógica del jugador
  function actualizar() {
    // Movimiento lateral
    if (teclas['ArrowRight']) jugador.x += jugador.velocidad
    if (teclas['ArrowLeft']) jugador.x -= jugador.velocidad

    // Salto
    if (teclas['ArrowUp'] && jugador.enSuelo) {
      jugador.dy = jugador.saltoFuerza
      jugador.enSuelo = false
    }

    // Gravedad
    jugador.dy += jugador.gravedad
    jugador.y += jugador.dy

    // 🚧 Limita movimiento lateral a los bordes del canvas
    if (jugador.x < 0) jugador.x = 0
    if (jugador.x + jugador.ancho > ancho) jugador.x = ancho - jugador.ancho

    // 🌍 Detectar el suelo
    if (jugador.y + jugador.alto >= alto) {
      jugador.y = alto - jugador.alto
      jugador.dy = 0
      jugador.enSuelo = true
    }
  }

  // 🖼️ Dibujar fondo y jugador
  function dibujar() {
    ctx.fillStyle = '#000'
    ctx.fillRect(0, 0, ancho, alto)

    // Dibujar sprite (primer frame estático)
    if (sprite.complete) {
      ctx.drawImage(
        sprite,
        0, 0,               // Frame en el sprite (x, y)
        64, 64,             // Tamaño del frame original
        jugador.x, jugador.y,  // Dónde dibujarlo
        64, 64              // Tamaño en el canvas
      )
    } else {
      // Mientras se carga el sprite, dibuja cuadrado de color
      ctx.fillStyle = '#00ffff'
      ctx.fillRect(jugador.x, jugador.y, jugador.ancho, jugador.alto)
    }
  }

  // 🔁 Bucle de juego
  function bucle() {
    actualizar()
    dibujar()
    requestAnimationFrame(bucle)
  }

  bucle()
})
</script>

<style scoped>
.juego-retro {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(to bottom, #050018, #222);
}

canvas {
  border: 4px solid #0ff;
  box-shadow: 0 0 20px #00ffff;
  image-rendering: pixelated;
}

.btn-volver {
  margin-top: 1rem;
  color: #ff00ff;
  text-decoration: none;
  font-family: 'Press Start 2P', monospace;
  font-size: 0.8rem;
  text-shadow: 0 0 5px #0ff;
}
</style>
