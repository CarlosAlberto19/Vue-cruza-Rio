<template>
    <Fondo3D class="fondo-3d" />

  <div class="app">
    <h2 class="titulo">🛶 Cruza el río: Zorro, Ganso y Maíz</h2>
    <p class="subinfo">Bote está en la orilla: <strong>{{ estado.posicion }}</strong></p>

    <p class="nota">
      ℹ️ Puedes cruzar el río solo con el bote, como en el enigma original. Usa esta estrategia para resolverlo.
    </p>

    <div class="panel">
      <div class="lado">
        <h3>🌿 Orilla Izquierda</h3>
        <div v-for="item in estado.izquierda" :key="item">
          {{ item }}
          <button @click="mover(item)" :disabled="juegoTerminado || estado.posicion !== 'izquierda'">
            Mover
          </button>
        </div>
      </div>

      <div class="bote">
        <h3>🚤 Bote</h3>
        <div v-if="estado.bote.length === 0">(vacío)</div>
        <div v-for="item in estado.bote" :key="item">{{ item }}</div>
      </div>

      <div class="lado">
        <h3>🌾 Orilla Derecha</h3>
        <div v-for="item in estado.derecha" :key="item">
          {{ item }}
          <button @click="mover(item)" :disabled="juegoTerminado || estado.posicion !== 'derecha'">
            Mover
          </button>
        </div>
      </div>
    </div>

    <div class="controles">
      <button class="btn btn-azul" @click="cruzar(null)" :disabled="juegoTerminado">🚣‍♂️ Cruzar sin carga</button>
      <button
        class="btn btn-azul"
        v-for="item in estado.bote"
        :key="item + '-cruzar'"
        @click="cruzar(item)"
        :disabled="juegoTerminado"
      >
        🚣‍♂️ Cruzar con {{ item }}
      </button>
      <button class="btn btn-amarillo" @click="darPista" :disabled="juegoTerminado || pistaIndex >= pistas.length">🧠 Ver pista</button>
      <button class="btn btn-rojo" @click="resetear">🔄 Reiniciar</button>
    </div>

    <div class="mensaje" v-if="mensaje">
      <strong>{{ mensaje }}</strong>
    </div>

    <div class="historial" v-if="historial.length">
      <h4>📜 Historial de movimientos:</h4>
      <ul>
        <li v-for="(paso, index) in historial" :key="index">📌 {{ index + 1 }}. {{ paso }}</li>
      </ul>
    </div>

    <router-link to="/inicio" class="volver">⬅️ Volver al menú</router-link>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import Fondo3D from '../components/Fondo3D.vue'

const estado = reactive({
  izquierda: ['zorro', 'ganso', 'maiz'],
  derecha: [],
  bote: [],
  posicion: 'izquierda'
})

const mensaje = ref('')
const historial = ref([])
const juegoTerminado = ref(false)
const pistaIndex = ref(0)
const pistas = [
  '1️⃣ Lleva el ganso a la derecha.',
  '2️⃣ Vuelve solo a la izquierda.',
  '3️⃣ Lleva el zorro a la derecha.',
  '4️⃣ Vuelve con el ganso.',
  '5️⃣ Lleva el maíz a la derecha.',
  '6️⃣ Vuelve solo.',
  '7️⃣ Lleva el ganso a la derecha por última vez.'
]

function mover(elemento) {
  if (juegoTerminado.value) return;
  const lado = estado.posicion;

  if (estado.bote.includes(elemento)) {
    estado.bote = estado.bote.filter(e => e !== elemento);
    estado[lado].push(elemento);
    historial.value.push(`Sacaste del bote al ${elemento} y lo devolviste a la orilla ${lado}`);
  } else if (estado[lado].includes(elemento) && estado.bote.length < 1) {
    estado.bote.push(elemento);
    estado[lado] = estado[lado].filter(e => e !== elemento);
    historial.value.push(`Metiste al ${elemento} en el bote desde la orilla ${lado}`);
  } else if (estado[lado].includes(elemento) && estado.bote.length === 1) {
    const actual = estado.bote.pop();
    estado[lado].push(actual);
    historial.value.push(`Sacaste del bote al ${actual} y lo devolviste a la orilla ${lado}`);

    estado.bote.push(elemento);
    estado[lado] = estado[lado].filter(e => e !== elemento);
    historial.value.push(`Metiste al ${elemento} en el bote desde la orilla ${lado}`);
  }

  mensaje.value = '';
}

function cruzar(conItem) {
  if (juegoTerminado.value) return

  const ladoActual = estado.posicion
  const ladoOpuesto = ladoActual === 'izquierda' ? 'derecha' : 'izquierda'

  if (conItem && !estado.bote.includes(conItem)) {
    mensaje.value = `❌ El ${conItem} no está en el bote.`
    return
  }

  // Movimiento del item (si existe)
  if (conItem) {
    estado.bote = estado.bote.filter(e => e !== conItem)
    estado[ladoOpuesto].push(conItem)
    historial.value.push(`Cruzaste con el ${conItem} hacia la orilla ${ladoOpuesto}`)
  } else {
    historial.value.push(`Cruzaste solo hacia la orilla ${ladoOpuesto}`)
  }

  // Cambio de posición antes de verificar
  estado.posicion = ladoOpuesto

  verificar()
}

function verificar() {
  mensaje.value = '' // 🧽 Limpia mensaje anterior

  const revisar = (lado) => {
    const ladoActual = estado[lado] // 📍 Obtenemos elementos en esa orilla

    // ⚠️ Comprobamos si el zorro y el ganso están solos sin el jugador
    if (
      ladoActual.includes('zorro') &&
      ladoActual.includes('ganso') &&
      estado.posicion !== lado
    ) {
      mensaje.value = `❌ ¡El zorro se comió al ganso en la orilla ${lado}!`
      juegoTerminado.value = true
    }

    // ⚠️ Comprobamos si el ganso y el maíz están solos sin el jugador
    if (
      ladoActual.includes('ganso') &&
      ladoActual.includes('maiz') &&
      estado.posicion !== lado
    ) {
      mensaje.value = `❌ ¡El ganso se comió el maíz en la orilla ${lado}!`
      juegoTerminado.value = true
    }
  }

  revisar('izquierda')  // 🔁 Revisa la orilla izquierda
  revisar('derecha')    // 🔁 Revisa la orilla derecha

  // 🎯 Comprobación final: ¿hemos ganado?
  if (
    estado.derecha.includes('zorro') &&
    estado.derecha.includes('ganso') &&
    estado.derecha.includes('maiz')
  ) {
    mensaje.value = '🎉 ¡Lo lograste! Todo ha cruzado el río.'
    juegoTerminado.value = true
  }
}

function darPista() {
  if (pistaIndex.value < pistas.length) {
    mensaje.value = pistas[pistaIndex.value]
    pistaIndex.value++
  }
}

function resetear() {
  estado.izquierda = ['zorro', 'ganso', 'maiz']
  estado.derecha = []
  estado.bote = []
  estado.posicion = 'izquierda'
  mensaje.value = ''
  juegoTerminado.value = false
  historial.value = []
  pistaIndex.value = 0
}
</script>


<style scoped>
/* El contenedor principal, centrado y ampliado */
/* Fondo animado degradado solo para Cruzando Río */
/* Fondo degradado animado aplicado al body del componente */
:global(body) {
  background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);
  background-size: 400% 400%;
  animation: fondoAnimado 15s ease infinite;
  margin: 0;
  min-height: 100vh;
  font-family: 'Segoe UI', sans-serif;
}

/* Animación suave del fondo */
@keyframes fondoAnimado {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* .app se mantiene centrado y con sombra */
.app {
  max-width: 1100px;
  margin: 3rem auto;
  padding: 3rem 2rem;
  background-color: rgba(20, 20, 20, 0.8); /* semitransparente para ver fondo */
  border-radius: 16px;
  box-shadow: 0 0 25px rgba(0, 0, 0, 0.6);
  z-index: 1;
  position: relative;
  color: #e8eaed;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.titulo {
  font-size: 2.2rem;
  margin-bottom: 1rem;
  color: #00e5ff;
  font-weight: bold;
  text-shadow: 1px 1px 4px rgba(0, 229, 255, 0.4);
}

.subinfo {
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
  color: #a0a0a0;
}

.panel {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin: 2rem 0;
  flex-wrap: wrap;
}

.lado, .bote {
  flex: 1;
  background-color: #2d2f31;
  padding: 1rem;
  border-radius: 10px;
  min-width: 240px;
  box-shadow: inset 0 0 10px rgba(255, 255, 255, 0.05);
  transition: transform 0.3s ease;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  70% { transform: translateY(-3px); }
}

.lado:hover, .bote:hover {
  transform: scale(1.02);
}

h3 {
  margin-bottom: 0.75rem;
  color: #ffffff;
  font-size: 1.3rem;
  border-bottom: 1px solid #444;
  padding-bottom: 0.3rem;
}

button {
  background-color: #00c853;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  margin: 0.3rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease;
}

button:hover:not(:disabled) {
  background-color: #00e676;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 229, 118, 0.3);
}

button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.btn {
  margin: 0.5rem;
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  font-size: 0.95rem;
}

.btn-azul {
  background-color: #1e88e5;
  color: #fff;
}

.btn-azul:hover:not(:disabled) {
  background-color: #42a5f5;
}

.btn-amarillo {
  background-color: #fbc02d;
  color: #000;
}

.btn-amarillo:hover:not(:disabled) {
  background-color: #fdd835;
}

.btn-rojo {
  background-color: #e53935;
  color: #fff;
}

.btn-rojo:hover:not(:disabled) {
  background-color: #ef5350;
}

.mensaje {
  margin-top: 1rem;
  font-size: 1.2rem;
  color: #ffd600;
  text-shadow: 1px 1px 3px rgba(255, 214, 0, 0.3);
}

.historial {
  background-color: #2c2c2c;
  padding: 1rem;
  border-radius: 8px;
  margin-top: 2rem;
  text-align: left;
  color: #dddddd;
  box-shadow: inset 0 0 5px rgba(255, 255, 255, 0.05);
}

.historial ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.historial li::before {
  content: '📌 ';
}

.volver {
  display: inline-block;
  margin-top: 2rem;
  text-decoration: none;
  color: #00e676;
  font-weight: bold;
  transition: color 0.3s ease;
}

.volver:hover {
  color: #1aff91;
  text-decoration: underline;
}

.nota {
  margin: 1rem 0;
  font-style: italic;
  color: #aaaaaa;
  font-size: 0.95rem;
}


</style>
