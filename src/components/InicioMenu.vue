<template>
  <div class="inicio">
    <h1>✨ Bienvenido a tu Proyecto Vue</h1>
    <p>Elige qué componente quieres visitar:</p>

    <div class="botones">
      <router-link to="/cubo3d" class="btn">🧊 Cubo 3D y Semáforo</router-link>

      <router-link to="/cruzar-rio" class="btn">🛶 Enigma del Río</router-link>

      <router-link to="/ghost" class="btn">👻 Ghosts 'n Goblins Retro</router-link>
    </div>
  </div>
</template>

<script setup>
// No necesitas nada aún
</script>

<style scoped>
.inicio {
  text-align: center;
  padding: 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #111;
  color: white;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.botones {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.btn {
  background-color: #00ff88;
  color: black;
  padding: 1rem 2rem;
  text-decoration: none;
  border-radius: 10px;
  font-weight: bold;
  transition: 0.3s;
}

.btn:hover {
  background-color: #00cc6a;
}
</style>
